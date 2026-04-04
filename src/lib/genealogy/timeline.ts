/**
 * Extract timeline events from family data.
 * Scans all persons, families, and events to build a chronological list.
 */
import type { GenealogyData, PersonSource } from "./types";
import { detectCountry } from "@/data/migration-routes";

// ── Source metadata ─────────────────────────────────────────────────────────

/**
 * Human-readable label + color coding for each research source.
 * Colors are Tailwind CSS class fragments (bg/text/border).
 */
export interface SourceMeta {
  /** Short label shown in the badge, e.g. "FamilySearch" */
  label: string;
  /** Single character abbreviation for tight spaces */
  abbr: string;
  /** Tailwind bg class for the badge chip */
  bgClass: string;
  /** Tailwind text class for the badge chip */
  textClass: string;
  /** Tailwind border class for the badge chip */
  borderClass: string;
  /** Full description for tooltip / aria-label */
  description: string;
  /** Icon shown alongside the badge */
  icon: string;
}

export const SOURCE_META: Record<string, SourceMeta> = {
  historical: {
    label: "García Carraffa",
    abbr: "GC",
    bgClass: "bg-amber-50",
    textClass: "text-amber-800",
    borderClass: "border-amber-300",
    description:
      "Enciclopedia Heráldica y Genealógica — García Carraffa Tomo XX. Nobleza medieval documentada.",
    icon: "📜",
  },
  familysearch: {
    label: "FamilySearch",
    abbr: "FS",
    bgClass: "bg-blue-50",
    textClass: "text-blue-800",
    borderClass: "border-blue-300",
    description:
      "FamilySearch.org — Censos parroquiales, registros civiles y padrones municipales de Galicia.",
    icon: "🔍",
  },
  cemla: {
    label: "CEMLA",
    abbr: "CEMLA",
    bgClass: "bg-violet-50",
    textClass: "text-violet-800",
    borderClass: "border-violet-300",
    description:
      "Centro de Estudios Migratorios Latinoamericanos — manifiestos de pasajeros, Buenos Aires 1882-1960.",
    icon: "🚢",
  },
  genco: {
    label: "Genealogías de Colombia",
    abbr: "GenCo",
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-300",
    description:
      "Genealogías de Colombia — archivo genealógico de familias colombianas (583.000 registros).",
    icon: "🇨🇴",
  },
  geneanet: {
    label: "Geneanet",
    abbr: "Genet",
    bgClass: "bg-teal-50",
    textClass: "text-teal-800",
    borderClass: "border-teal-300",
    description:
      "Geneanet.org — árbol colaborativo. Perfiles Caamaño de Porto do Son, Noia y Boiro.",
    icon: "🌐",
  },
  pares: {
    label: "PARES",
    abbr: "PARES",
    bgClass: "bg-slate-100",
    textClass: "text-slate-700",
    borderClass: "border-slate-300",
    description:
      "Portal de Archivos Españoles — Casa de Contratación, expedientes coloniales, Archivo de Simancas.",
    icon: "🏛️",
  },
  modern: {
    label: "Tradición familiar",
    abbr: "Fam",
    bgClass: "bg-rose-50",
    textClass: "text-rose-800",
    borderClass: "border-rose-300",
    description:
      "Tradición oral familiar y documentos personales — fotografías, cartas y recuerdos.",
    icon: "👨‍👩‍👧‍👦",
  },
  uruguay: {
    label: "Uruguay (passenger)",
    abbr: "UY",
    bgClass: "bg-sky-50",
    textClass: "text-sky-800",
    borderClass: "border-sky-300",
    description:
      "Registro de pasajeros de Uruguay — José Caamaño Soto, confirma rama Caamaño+Soto.",
    icon: "⚓",
  },
  ellisisland: {
    label: "Ellis Island",
    abbr: "EI",
    bgClass: "bg-indigo-50",
    textClass: "text-indigo-800",
    borderClass: "border-indigo-300",
    description:
      "Ellis Island Foundation — registros de inmigración a Estados Unidos.",
    icon: "🗽",
  },
  oral: {
    label: "Tradición oral",
    abbr: "Oral",
    bgClass: "bg-orange-50",
    textClass: "text-orange-800",
    borderClass: "border-orange-300",
    description:
      "Historia transmitida de generación en generación dentro de la familia Caamaño.",
    icon: "🗣️",
  },
  /** Milestone: hardcoded historical fact from a named source */
  milestone_carraffa: {
    label: "García Carraffa Tomo XX",
    abbr: "GC",
    bgClass: "bg-amber-50",
    textClass: "text-amber-800",
    borderClass: "border-amber-300",
    description:
      "Enciclopedia Heráldica y Genealógica — García Carraffa Tomo XX. Nobleza medieval.",
    icon: "📜",
  },
  milestone_pares: {
    label: "PARES / AGI",
    abbr: "PARES",
    bgClass: "bg-slate-100",
    textClass: "text-slate-700",
    borderClass: "border-slate-300",
    description:
      "Portal de Archivos Españoles — Casa de Contratación, Archivo General de Indias.",
    icon: "🏛️",
  },
};

// ── Date confidence ──────────────────────────────────────────────────────────

/**
 * Whether a date is exact (full ISO date), partial (year only), or approximate
 * (prefixed with ~ or ≈ in the source data).
 */
export type DateConfidence = "exact" | "partial" | "approximate";

export function getDateConfidence(date?: string): DateConfidence {
  if (!date) return "approximate";
  if (/[~≈]/.test(date)) return "approximate";
  // Full ISO date: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return "exact";
  // Year only or partial
  return "partial";
}

// ── Era context ──────────────────────────────────────────────────────────────

export interface EraContext {
  label: string;
  subtitle: string;
  quote?: string;
}

/** Narrative era labels that appear as a subtitle above each event card */
export function getEraContext(year: number): EraContext {
  if (year < 1200)
    return {
      label: "Orígenes Medievales",
      subtitle: "Los primeros Caamaño del Reino de Galicia",
      quote:
        "\u201cLos Caamaño derivan de los más ilustres linajes de Galicia.\u201d",
    };
  if (year < 1400)
    return {
      label: "Reconquista y Señoríos",
      subtitle: "Caballeros y señores de tierras en A Coruña",
    };
  if (year < 1550)
    return {
      label: "Fundaciones y Esplendor",
      subtitle: "Los Caamaño fundan villas y construyen pazos",
    };
  if (year < 1700)
    return {
      label: "La Brecha Documental",
      subtitle: "El rastro se pierde — archivos parroquiales incompletos",
      quote:
        "Los registros de esta época aguardan en el Arquivo Diocesano de Santiago.",
    };
  if (year < 1800)
    return {
      label: "Renacimiento de los Registros",
      subtitle: "Los primeros censos y padrones de Porto do Son",
    };
  if (year < 1850)
    return {
      label: "Los Caamaño de Palmeira",
      subtitle: "Marineros y labradores en la ría de Muros-Noia",
    };
  if (year < 1900)
    return {
      label: "La Gran Emigración",
      subtitle: "Galicia → Colombia, Argentina, República Dominicana",
    };
  if (year < 1950)
    return {
      label: "Raíces Colombianas",
      subtitle: "La familia Caamaño se establece en Colombia",
    };
  if (year < 1990)
    return {
      label: "Generaciones Contemporáneas",
      subtitle: "Tres generaciones en Colombia — Néstor, Luis, Luis Miguel",
    };
  return {
    label: "Hoy",
    subtitle: "Donde empieza esta investigación",
  };
}

// ── Main types ───────────────────────────────────────────────────────────────

export interface TimelineEvent {
  id: string;
  year: number;
  yearLabel: string;
  title: string;
  description: string;
  personId?: string;
  personName?: string;
  country: string | null;
  type: "birth" | "death" | "marriage" | "migration" | "event" | "gap";
  icon: string;
  /** Which archive / database sourced this record */
  source: string;
  /** How reliable is the date */
  dateConfidence: DateConfidence;
  /** Short explanation of where this data came from */
  sourceNote?: string;
}

/** Extract a numeric year from partial date string */
function parseYear(date?: string): number | null {
  if (!date) return null;
  // Handle "~1815" approximate dates
  const cleaned = date.replace(/[~≈]/g, "");
  const match = cleaned.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

/** Map PersonSource to a timeline source key */
function sourceFromPerson(source?: PersonSource): string {
  if (!source) return "modern";
  return source;
}

/** Build timeline events from genealogy data */
export function buildTimeline(data: GenealogyData): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let eventId = 0;

  // ── Key historical milestones ──────────────────────────────────────────────
  // These are hardcoded — they are not in the JSON as dated events.
  // Each carries its specific source attribution.

  interface MilestoneInput extends Omit<TimelineEvent, "id"> {}

  const milestones: MilestoneInput[] = [
    {
      year: 1129,
      yearLabel: "1129",
      title: "Fundación del Monasterio de Toxosoutos",
      description:
        "Pedro y Fruela Alonso de Caamaño fundan el Monasterio de Toxosoutos en Noia, Galicia. Primera mención del apellido en un documento fundacional.",
      country: "españa",
      type: "event",
      icon: "⛪",
      source: "milestone_carraffa",
      dateConfidence: "exact",
      sourceNote: "García Carraffa, Diccionario Heráldico, Tomo XX (1920-1963)",
    },
    {
      year: 1177,
      yearLabel: "1177",
      title: "Castro Caamaño — la fortaleza ancestral",
      description:
        '"Fizo Juan de Caamaño, Año de Mill Ciento Setenta et Siete." Fundación del castillo en Santa María de Caamaño, Porto do Son. El topónimo que da origen al apellido.',
      country: "españa",
      type: "event",
      icon: "🏰",
      source: "milestone_carraffa",
      dateConfidence: "exact",
      sourceNote: "Inscripción en el castro, citada en García Carraffa Tomo XX",
    },
    {
      year: 1441,
      yearLabel: "12 Mayo 1441",
      title: "García de Caamaño funda Villagarcía de Arousa",
      description:
        'García "El Hermoso" funda "o meu lugar e porto de VILA-GARCÍA." Construyó el Pazo de Rubianes. Sus descendientes serían Marqueses de Villagarcía.',
      country: "españa",
      type: "event",
      icon: "🏘️",
      source: "milestone_carraffa",
      dateConfidence: "exact",
      sourceNote: "Crónicas municipales de Villagarcía de Arousa",
    },
    {
      year: 1687,
      yearLabel: "1687",
      title: "Primer emigrante Caamaño a las Américas",
      description:
        "Salvador Varela Caamaño obtiene licencia de la Casa de Contratación para viajar a las Américas. El Caamaño más antiguo documentado cruzando el Atlántico.",
      country: null,
      type: "migration",
      icon: "⚓",
      source: "milestone_pares",
      dateConfidence: "exact",
      sourceNote:
        "PARES — Casa de Contratación, legajo CONTRATACION,5449,N.16. Archivo General de Indias.",
    },
  ];

  for (const m of milestones) {
    events.push({ ...m, id: `te-${eventId++}` });
  }

  // ── Extract from persons ───────────────────────────────────────────────────
  for (const person of data.persons) {
    const name = `${person.firstName} ${person.lastName}`;
    const birthYear = parseYear(person.birthDate);
    const deathYear = parseYear(person.deathDate);
    const country = detectCountry(person.birthPlace);
    const src = sourceFromPerson(person.source);

    // Birth
    if (birthYear) {
      events.push({
        id: `te-${eventId++}`,
        year: birthYear,
        yearLabel: person.birthDate ?? String(birthYear),
        title: `Nace ${name}`,
        description: person.birthPlace
          ? `En ${person.birthPlace}.${person.notes ? " " + person.notes : ""}`
          : (person.notes ?? ""),
        personId: person.id,
        personName: name,
        country,
        type: "birth",
        icon: "👶🏻",
        source: src,
        dateConfidence: getDateConfidence(person.birthDate),
        sourceNote: buildSourceNote(src, person.id),
      });
    }

    // Death
    if (deathYear) {
      events.push({
        id: `te-${eventId++}`,
        year: deathYear,
        yearLabel: person.deathDate ?? String(deathYear),
        title: `Fallece ${name}`,
        description: person.deathPlace ? `En ${person.deathPlace}.` : "",
        personId: person.id,
        personName: name,
        country: detectCountry(person.deathPlace) ?? country,
        type: "death",
        icon: "✝️",
        source: src,
        dateConfidence: getDateConfidence(person.deathDate),
        sourceNote: buildSourceNote(src, person.id),
      });
    }

    // Migration events
    if (person.events) {
      for (const evt of person.events) {
        const evtYear = parseYear(evt.date);
        if (evtYear && evt.type === "immigration") {
          events.push({
            id: `te-${eventId++}`,
            year: evtYear,
            yearLabel: evt.date ?? String(evtYear),
            title: `${name} emigra`,
            description:
              evt.description ?? (evt.place ? `Llega a ${evt.place}.` : ""),
            personId: person.id,
            personName: name,
            country: detectCountry(evt.place) ?? country,
            type: "migration",
            icon: "🚢",
            source: src,
            dateConfidence: getDateConfidence(evt.date),
            sourceNote: buildSourceNote(src, person.id),
          });
        }
      }
    }
  }

  // ── Marriages ──────────────────────────────────────────────────────────────
  for (const family of data.families) {
    const marriageYear = parseYear(family.marriageDate);
    if (marriageYear && family.parents.length >= 2) {
      const p1 = data.persons.find((p) => p.id === family.parents[0]);
      const p2 = data.persons.find((p) => p.id === family.parents[1]);
      if (p1 && p2) {
        // Use the richer source of the two parents
        const src =
          p1.source && p1.source !== "modern"
            ? p1.source
            : (p2.source ?? "modern");
        events.push({
          id: `te-${eventId++}`,
          year: marriageYear,
          yearLabel: family.marriageDate ?? String(marriageYear),
          title: `Matrimonio: ${p1.firstName} y ${p2.firstName}`,
          description: family.marriagePlace
            ? `En ${family.marriagePlace}.`
            : "",
          country: detectCountry(family.marriagePlace),
          type: "marriage",
          icon: "💒",
          source: sourceFromPerson(src as PersonSource),
          dateConfidence: getDateConfidence(family.marriageDate),
          sourceNote: buildSourceNote(sourceFromPerson(src as PersonSource)),
        });
      }
    }
  }

  // ── Gap marker ─────────────────────────────────────────────────────────────
  events.push({
    id: "te-gap",
    year: 1650,
    yearLabel: "~1540–1770",
    title: "La Brecha — 200 años sin documentar",
    description:
      "Entre los nobles de Villagarcía (~1540) y los primeros registros parroquiales de Palmeira (Pablo Caamaño Villa, 1802). La conexión aún no está probada. Se espera respuesta del Arquivo Diocesano de Santiago de Compostela (AHDS).",
    country: null,
    type: "gap",
    icon: "❓",
    source: "gap",
    dateConfidence: "approximate",
    sourceNote:
      "Brecha activa en investigación. Email enviado al AHDS (arquivo@archicompostela.es) en abril 2026.",
  });

  // Sort by year
  events.sort((a, b) => a.year - b.year);

  return events;
}

/** Build a source note from a source key */
function buildSourceNote(source: string, personId?: string): string {
  switch (source) {
    case "historical":
      return "García Carraffa, Diccionario Heráldico y Genealógico, Tomo XX";
    case "familysearch":
      return `FamilySearch.org — Censos parroquiales de Galicia${personId ? ` (ID: ${personId})` : ""}`;
    case "cemla":
      return `CEMLA — Manifiestos de pasajeros, Buenos Aires${personId ? ` (ID: ${personId})` : ""}`;
    case "genco":
      return "Genealogías de Colombia — archivo genealógico (583.000 registros)";
    case "geneanet":
      return `Geneanet.org — Árbol colaborativo, Porto do Son/Noia${personId ? ` (ID: ${personId})` : ""}`;
    case "pares":
      return "PARES — Portal de Archivos Españoles";
    case "uruguay":
      return "Registro de pasajeros de Uruguay — José Caamaño Soto";
    default:
      return "Tradición familiar y documentos personales";
  }
}

/** All distinct sources that appear in a set of events */
export function getContributingSources(events: TimelineEvent[]): string[] {
  const seen = new Set<string>();
  for (const e of events) {
    if (e.source && e.source !== "gap") seen.add(e.source);
  }
  return [...seen];
}

/** Group events by century for jump navigation */
export function getCenturies(events: TimelineEvent[]): number[] {
  const centuries = new Set<number>();
  for (const e of events) {
    centuries.add(Math.floor(e.year / 100) * 100);
  }
  return [...centuries].sort((a, b) => a - b);
}

/** Roman numeral for century */
export function centuryLabel(year: number): string {
  const century = Math.floor(year / 100) + 1;
  const numerals: Record<number, string> = {
    12: "XII",
    13: "XIII",
    14: "XIV",
    15: "XV",
    16: "XVI",
    17: "XVII",
    18: "XVIII",
    19: "XIX",
    20: "XX",
    21: "XXI",
  };
  return numerals[century] ?? `S.${century}`;
}
