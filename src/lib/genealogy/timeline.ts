/**
 * Extract timeline events from family data.
 * Scans all persons, families, and events to build a chronological list.
 */
import type { GenealogyData } from "./types";
import { detectCountry } from "@/data/migration-routes";

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
}

/** Extract a numeric year from partial date string */
function parseYear(date?: string): number | null {
  if (!date) return null;
  // Handle "~1815" approximate dates
  const cleaned = date.replace(/[~≈]/g, "");
  const match = cleaned.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

/** Build timeline events from genealogy data */
export function buildTimeline(data: GenealogyData): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let eventId = 0;

  // Key historical milestones (hardcoded — these aren't in the JSON as dated events)
  const milestones: Omit<TimelineEvent, "id">[] = [
    {
      year: 1129,
      yearLabel: "1129",
      title: "Fundación del Monasterio de Toxosoutos",
      description:
        "Pedro y Fruela Alonso de Caamaño fundan el Monasterio de Toxosoutos en Noia, Galicia.",
      country: "españa",
      type: "event",
      icon: "⛪",
    },
    {
      year: 1177,
      yearLabel: "1177",
      title: "Castro Caamaño — la fortaleza ancestral",
      description:
        '"Fizo Juan de Caamaño, Año de Mill Ciento Setenta et Siete." Fundación del castillo en Santa María de Caamaño, Porto do Son.',
      country: "españa",
      type: "event",
      icon: "🏰",
    },
    {
      year: 1441,
      yearLabel: "12 Mayo 1441",
      title: "García de Caamaño funda Villagarcía de Arousa",
      description:
        'García "El Hermoso" funda "o meu lugar e porto de VILA-GARCÍA." Construyó el Pazo de Rubianes.',
      country: "españa",
      type: "event",
      icon: "🏘️",
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
    },
  ];

  for (const m of milestones) {
    events.push({ ...m, id: `te-${eventId++}` });
  }

  // Extract from persons
  for (const person of data.persons) {
    const name = `${person.firstName} ${person.lastName}`;
    const birthYear = parseYear(person.birthDate);
    const deathYear = parseYear(person.deathDate);
    const country = detectCountry(person.birthPlace);

    // Birth
    if (birthYear) {
      events.push({
        id: `te-${eventId++}`,
        year: birthYear,
        yearLabel: person.birthDate ?? String(birthYear),
        title: `Nace ${name}`,
        description: person.birthPlace
          ? `En ${person.birthPlace}.${person.notes ? " " + person.notes : ""}`
          : person.notes ?? "",
        personId: person.id,
        personName: name,
        country,
        type: "birth",
        icon: person.gender === "female" ? "👶🏻" : "👶🏻",
      });
    }

    // Death
    if (deathYear) {
      events.push({
        id: `te-${eventId++}`,
        year: deathYear,
        yearLabel: person.deathDate ?? String(deathYear),
        title: `Fallece ${name}`,
        description: person.deathPlace
          ? `En ${person.deathPlace}.`
          : "",
        personId: person.id,
        personName: name,
        country: detectCountry(person.deathPlace) ?? country,
        type: "death",
        icon: "✝️",
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
              evt.description ??
              (evt.place ? `Llega a ${evt.place}.` : ""),
            personId: person.id,
            personName: name,
            country: detectCountry(evt.place) ?? country,
            type: "migration",
            icon: "🚢",
          });
        }
      }
    }
  }

  // Marriages
  for (const family of data.families) {
    const marriageYear = parseYear(family.marriageDate);
    if (marriageYear && family.parents.length >= 2) {
      const p1 = data.persons.find((p) => p.id === family.parents[0]);
      const p2 = data.persons.find((p) => p.id === family.parents[1]);
      if (p1 && p2) {
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
        });
      }
    }
  }

  // Add the gap marker
  events.push({
    id: "te-gap",
    year: 1650,
    yearLabel: "~1540–1770",
    title: "La Brecha — 200 años sin documentar",
    description:
      "Entre la línea noble (Marqueses de Villagarcía, ~1540) y los registros parroquiales (Pablo Caamaño Villa, 1802). La conexión aún no está probada. Se espera respuesta del Archivo Diocesano de Santiago.",
    country: null,
    type: "gap",
    icon: "❓",
  });

  // Sort by year
  events.sort((a, b) => a.year - b.year);

  return events;
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
