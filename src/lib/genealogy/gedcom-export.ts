/**
 * GEDCOM 5.5.1 serializer.
 * Pure function: GenealogyData in, GEDCOM text out. No DOM, no React.
 *
 * Mapping:
 *   Person → INDI (NAME /surname/, SEX, BIRT/DEAT, other events, NOTE, SOUR+QUAY)
 *   Family → FAM  (HUSB/WIFE/CHIL, MARR, DIV)
 * Documentary certainty (proven/circumstantial/hypothetical) is preserved both
 * as a human-readable NOTE and as a SOUR citation with QUAY (3/2/1).
 */
import type {
  Certainty,
  EventType,
  Family,
  GenealogyData,
  LifeEvent,
  Person,
} from "./types";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

/** Max characters of text per physical line before splitting with CONC. */
const MAX_TEXT_CHUNK = 200;

const CERTAINTY_LABEL: Record<Certainty, string> = {
  proven: "PROVEN (probado, documento primario)",
  circumstantial: "CIRCUMSTANTIAL (circunstancial)",
  hypothetical: "HYPOTHETICAL (hipotético)",
};

/** GEDCOM QUAY: 3 = direct/primary, 2 = secondary, 1 = questionable. */
const CERTAINTY_QUAY: Record<Certainty, number> = {
  proven: 3,
  circumstantial: 2,
  hypothetical: 1,
};

/** Event types with a dedicated GEDCOM individual event tag. */
const EVENT_TAGS: Partial<Record<EventType | string, string>> = {
  birth: "BIRT",
  death: "DEAT",
  baptism: "BAPM",
  burial: "BURI",
  immigration: "IMMI",
  emigration: "EMIG",
  graduation: "GRAD",
  testament: "WILL",
};

/** Spanish labels for generic EVEN records (2 TYPE ...). */
const EVENT_TYPE_LABEL: Record<string, string> = {
  marriage: "Matrimonio",
  divorce: "Divorcio",
  custom: "Evento",
  nobility: "Nobleza",
  title: "Título",
  lawsuit: "Pleito",
  residence: "Residencia",
  occupation: "Oficio",
  correspondence: "Correspondencia",
  refugee: "Refugiado",
  inquisition: "Inquisición",
};

export interface GedcomOptions {
  /** Export timestamp, injectable for deterministic tests. */
  now?: Date;
  /** Line terminator. GEDCOM 5.5.1 accepts CR, LF or CRLF. */
  lineEnding?: "\r\n" | "\n";
}

// ─── Dates ────────────────────────────────────────────────────────────────

/** Exact ISO partial date ("1952", "1952-03", "1952-03-15") → GEDCOM, or null. */
function exactDate(raw: string): string | null {
  const m = /^(\d{1,4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?$/.exec(raw.trim());
  if (!m) return null;
  const [, y, mo, d] = m;
  const year = String(Number(y));
  if (!mo) return year;
  const month = Number(mo);
  if (month < 1 || month > 12) return null;
  if (!d) return `${MONTHS[month - 1]} ${year}`;
  const day = Number(d);
  if (day < 1 || day > 31) return null;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/**
 * Convert the app's date strings to a GEDCOM 5.5.1 date value.
 *   "1952-03-15" → "15 MAR 1952"     "~1815" / "c.1600" → "ABT 1815"
 *   "<1815" → "BEF 1815"             ">1815" → "AFT 1815"
 *   "1763-1780" / "1763/1780" → "BET 1763 AND 1780"
 *   anything else → date phrase "(siglo XIX)"
 */
export function toGedcomDate(raw: string | undefined | null): string | null {
  if (raw == null) return null;
  const s = raw.trim();
  if (!s) return null;

  const exact = exactDate(s);
  if (exact) return exact;

  const approx = /^(?:~|c\.|ca\.?|circa|aprox\.?|abt\.?)\s*(.+)$/i.exec(s);
  if (approx) {
    const inner = exactDate(approx[1]);
    if (inner) return `ABT ${inner}`;
  }

  const before = /^(?:<|antes de)\s*(.+)$/i.exec(s);
  if (before) {
    const inner = exactDate(before[1].replace(/^~/, ""));
    if (inner) return `BEF ${inner}`;
  }

  const after = /^(?:>|después de)\s*(.+)$/i.exec(s);
  if (after) {
    const inner = exactDate(after[1].replace(/^~/, ""));
    if (inner) return `AFT ${inner}`;
  }

  // Ranges: year-year (only 4-digit years so "1952-03" never lands here),
  // or any two partial dates joined by "/", "..", en/em dash, or " a ".
  const range =
    /^~?(\d{4})\s*-\s*~?(\d{4})$/.exec(s) ??
    /^~?(.+?)\s*(?:\/|\.\.|–|—|\s+a\s+)\s*~?(.+)$/.exec(s);
  if (range) {
    const from = exactDate(range[1]);
    const to = exactDate(range[2]);
    if (from && to) return `BET ${from} AND ${to}`;
  }

  // Free text: GEDCOM date phrase in parentheses.
  return `(${s.replace(/[()]/g, "")})`;
}

// ─── Text helpers ─────────────────────────────────────────────────────────

/** GEDCOM 5.5.1: a literal "@" in a line value must be written as "@@". */
function escapeText(text: string): string {
  return text.replace(/@/g, "@@");
}

/** Single-line value: collapse newlines/tabs, trim, escape. */
function cleanValue(text: string): string {
  return escapeText(text.replace(/[\r\n\t]+/g, " ").trim());
}

/**
 * Emit a possibly long, multi-line text as "<level> <tag> ..." followed by
 * CONT (new line) and CONC (continuation) children.
 */
function textLines(level: number, tag: string, text: string): string[] {
  const out: string[] = [];
  const paragraphs = text.replace(/\r\n?/g, "\n").split("\n");
  paragraphs.forEach((para, pi) => {
    const chunks = splitChunks(escapeText(para));
    chunks.forEach((chunk, ci) => {
      if (pi === 0 && ci === 0) {
        out.push(chunk ? `${level} ${tag} ${chunk}` : `${level} ${tag}`);
      } else if (ci === 0) {
        out.push(chunk ? `${level + 1} CONT ${chunk}` : `${level + 1} CONT`);
      } else {
        out.push(`${level + 1} CONC ${chunk}`);
      }
    });
  });
  return out;
}

/**
 * Split by code points (never inside a surrogate pair), avoiding split points
 * next to a space, because many readers trim CONC values.
 */
function splitChunks(text: string): string[] {
  const chars = Array.from(text);
  if (chars.length <= MAX_TEXT_CHUNK) return [text];
  const chunks: string[] = [];
  let start = 0;
  while (start < chars.length) {
    let end = Math.min(start + MAX_TEXT_CHUNK, chars.length);
    if (end < chars.length) {
      let probe = end;
      while (
        probe > start + 1 &&
        (chars[probe] === " " || chars[probe - 1] === " ")
      ) {
        probe--;
      }
      if (probe > start + 1) end = probe;
    }
    chunks.push(chars.slice(start, end).join(""));
    start = end;
  }
  return chunks;
}

/** App ids ("p151", "gnf01") → GEDCOM xref ("@Ip151@"). */
function xref(prefix: "I" | "F", id: string): string {
  return `@${prefix}${id.replace(/[^A-Za-z0-9_]/g, "_")}@`;
}

/** Strip slashes so they never break the /surname/ delimiters. */
function namePart(text: string | undefined): string {
  return (text ?? "").replace(/\//g, " ").replace(/\s+/g, " ").trim();
}

/** "Luis Miguel" + "Caamaño Morales" → "Luis Miguel /Caamaño Morales/" */
export function formatGedcomName(given: string, surname: string): string {
  const g = namePart(given);
  const s = namePart(surname);
  return escapeText(g ? `${g} /${s}/` : `/${s}/`);
}

function eventLines(
  level: number,
  tag: string,
  date: string | undefined,
  place: string | undefined,
  value?: string,
): string[] {
  const lines = [value ? `${level} ${tag} ${value}` : `${level} ${tag}`];
  const d = toGedcomDate(date);
  if (d) lines.push(`${level + 1} DATE ${d}`);
  if (place?.trim()) lines.push(`${level + 1} PLAC ${cleanValue(place)}`);
  return lines;
}

function sexOf(p: Person): "M" | "F" | "U" {
  if (p.gender === "male") return "M";
  if (p.gender === "female") return "F";
  return "U";
}

// ─── Records ──────────────────────────────────────────────────────────────

function individualLines(
  p: Person,
  famc: string[],
  fams: string[],
): string[] {
  const lines: string[] = [`0 ${xref("I", p.id)} INDI`];

  lines.push(`1 NAME ${formatGedcomName(p.firstName, p.lastName)}`);
  if (namePart(p.firstName)) lines.push(`2 GIVN ${escapeText(namePart(p.firstName))}`);
  if (namePart(p.lastName)) lines.push(`2 SURN ${escapeText(namePart(p.lastName))}`);
  if (p.maidenName?.trim() && p.maidenName.trim() !== p.lastName.trim()) {
    lines.push(`1 NAME ${formatGedcomName(p.firstName, p.maidenName)}`);
    lines.push("2 TYPE maiden");
  }

  lines.push(`1 SEX ${sexOf(p)}`);

  const hasBirth = Boolean(p.birthDate?.trim() || p.birthPlace?.trim());
  const hasDeath = Boolean(p.deathDate?.trim() || p.deathPlace?.trim());
  if (hasBirth) lines.push(...eventLines(1, "BIRT", p.birthDate, p.birthPlace));
  if (hasDeath) lines.push(...eventLines(1, "DEAT", p.deathDate, p.deathPlace));

  for (const ev of p.events ?? []) {
    lines.push(...personEventLines(p, ev));
  }

  for (const f of famc) lines.push(`1 FAMC ${f}`);
  for (const f of fams) lines.push(`1 FAMS ${f}`);

  if (p.notes?.trim()) lines.push(...textLines(1, "NOTE", p.notes.trim()));

  if (p.certainty) {
    const reason = p.certaintyReason?.trim();
    lines.push(
      ...textLines(
        1,
        "NOTE",
        `Certeza documental: ${CERTAINTY_LABEL[p.certainty]}` +
          (reason ? `. Motivo: ${reason}` : ""),
      ),
    );
  }

  if (p.source || p.certainty) {
    const desc = p.source
      ? `Genealogía Caamaño, fuente del registro: ${p.source}`
      : "Genealogía Caamaño";
    lines.push(`1 SOUR ${escapeText(desc)}`);
    if (p.certainty) lines.push(`2 QUAY ${CERTAINTY_QUAY[p.certainty]}`);
  }

  lines.push(`1 REFN ${escapeText(p.id)}`);
  return lines;
}

function personEventLines(p: Person, ev: LifeEvent): string[] {
  // Birth/death already come from the person fields; skip duplicates.
  if (ev.type === "birth" && p.birthDate && (!ev.date || ev.date === p.birthDate)) return [];
  if (ev.type === "death" && p.deathDate && (!ev.date || ev.date === p.deathDate)) return [];

  const tag = EVENT_TAGS[ev.type];
  const lines = tag
    ? eventLines(1, tag, ev.date, ev.place)
    : [
        ...eventLines(1, "EVEN", ev.date, ev.place),
        `2 TYPE ${escapeText(EVENT_TYPE_LABEL[ev.type] ?? ev.type)}`,
      ];
  if (ev.description?.trim()) lines.push(...textLines(2, "NOTE", ev.description.trim()));
  return lines;
}

function familyLines(
  f: Family,
  persons: Map<string, Person>,
): string[] {
  const lines: string[] = [`0 ${xref("F", f.id)} FAM`];
  const parents = f.parents.filter((id) => persons.has(id));

  let husb: string | undefined;
  let wife: string | undefined;
  for (const id of parents) {
    const g = persons.get(id)?.gender;
    if (g === "male" && !husb) husb = id;
    else if (g === "female" && !wife) wife = id;
  }
  // Unknown or same-gender parents: fill whichever slot is still free.
  for (const id of parents) {
    if (id === husb || id === wife) continue;
    if (!husb) husb = id;
    else if (!wife) wife = id;
  }

  if (husb) lines.push(`1 HUSB ${xref("I", husb)}`);
  if (wife) lines.push(`1 WIFE ${xref("I", wife)}`);
  for (const c of f.children) {
    if (persons.has(c)) lines.push(`1 CHIL ${xref("I", c)}`);
  }
  if (f.marriageDate?.trim() || f.marriagePlace?.trim()) {
    lines.push(...eventLines(1, "MARR", f.marriageDate, f.marriagePlace));
  }
  if (f.divorceDate?.trim()) lines.push(...eventLines(1, "DIV", f.divorceDate, undefined));
  lines.push(`1 REFN ${escapeText(f.id)}`);
  return lines;
}

function headerDate(now: Date): string {
  return `${now.getUTCDate()} ${MONTHS[now.getUTCMonth()]} ${now.getUTCFullYear()}`;
}

/** Serialize the whole tree to a GEDCOM 5.5.1 (UTF-8) document. */
export function serializeGedcom(
  data: GenealogyData,
  options: GedcomOptions = {},
): string {
  const now = options.now ?? new Date();
  const eol = options.lineEnding ?? "\r\n";

  const persons = new Map(data.persons.map((p) => [p.id, p]));
  const famc = new Map<string, string[]>();
  const fams = new Map<string, string[]>();
  const push = (m: Map<string, string[]>, k: string, v: string) => {
    const arr = m.get(k);
    if (arr) {
      if (!arr.includes(v)) arr.push(v);
    } else m.set(k, [v]);
  };

  // Families that end up empty (all members missing) are dropped so no
  // FAMC/FAMS pointer ever targets a record we did not write.
  const families = data.families.filter(
    (f) =>
      f.parents.some((id) => persons.has(id)) ||
      f.children.some((id) => persons.has(id)),
  );
  for (const f of families) {
    const ref = xref("F", f.id);
    for (const id of f.parents) if (persons.has(id)) push(fams, id, ref);
    for (const id of f.children) if (persons.has(id)) push(famc, id, ref);
  }

  const lines: string[] = [
    "0 HEAD",
    "1 SOUR GENEALOGIA_CAAMANO",
    "2 NAME Genealogía Caamaño",
    `2 VERS ${data.meta?.version ?? 0}`,
    `1 DATE ${headerDate(now)}`,
    "1 SUBM @SUBM1@",
    "1 FILE caamano-family.ged",
    "1 GEDC",
    "2 VERS 5.5.1",
    "2 FORM LINEAGE-LINKED",
    "1 CHAR UTF-8",
    "1 LANG Spanish",
    "0 @SUBM1@ SUBM",
    "1 NAME Familia Caamaño",
  ];

  for (const p of data.persons) {
    lines.push(...individualLines(p, famc.get(p.id) ?? [], fams.get(p.id) ?? []));
  }
  for (const f of families) {
    lines.push(...familyLines(f, persons));
  }
  lines.push("0 TRLR");

  return lines.join(eol) + eol;
}
