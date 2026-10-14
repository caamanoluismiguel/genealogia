/**
 * "Hoy en la familia": match births, deaths and marriages to a calendar day.
 * Pure functions. Only full ISO dates (YYYY-MM-DD) take part, since a
 * year-only or approximate date has no day to celebrate.
 */
import type { GenealogyData } from "./types";

export type AnniversaryKind = "birth" | "death" | "marriage";

export interface CalendarDay {
  year: number;
  /** 1-12 */
  month: number;
  /** 1-31 */
  day: number;
}

export interface Anniversary {
  kind: AnniversaryKind;
  /** Person ids involved (one for birth/death, the couple for a marriage) */
  personIds: string[];
  /** Original ISO date of the event */
  date: string;
  /** Year the event happened */
  year: number;
  month: number;
  day: number;
  /** Days from the reference day to the next occurrence (0 = today) */
  daysUntil: number;
  /** Years completed on that next occurrence */
  yearsAgo: number;
}

export interface OnThisDayResult {
  /**
   * today: at least one match today.
   * upcoming: nothing today, matches within the window.
   * next: nothing in the window, the nearest dates after it.
   * none: the tree has no full dates at all.
   */
  mode: "today" | "upcoming" | "next" | "none";
  items: Anniversary[];
}

const FULL_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 86_400_000;

/** Parse a strict YYYY-MM-DD date; anything partial or approximate → null. */
export function parseFullDate(raw: string | undefined | null): CalendarDay | null {
  if (!raw) return null;
  const m = FULL_DATE.exec(raw.trim());
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1) return null;
  if (day > daysInMonth(year, month)) return null;
  return { year, month, day };
}

function isLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  return [31, isLeap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
    month - 1
  ];
}

/** Feb 29 anniversaries fall on Feb 28 in common years. */
function occurrenceIn(year: number, month: number, day: number): number {
  const d = month === 2 && day === 29 && !isLeap(year) ? 28 : day;
  return Date.UTC(year, month - 1, d);
}

/** Days from `today` to the next occurrence of month/day, and that year. */
export function daysUntilNext(
  today: CalendarDay,
  month: number,
  day: number,
): { days: number; year: number } {
  const ref = Date.UTC(today.year, today.month - 1, today.day);
  let year = today.year;
  let at = occurrenceIn(year, month, day);
  if (at < ref) {
    year += 1;
    at = occurrenceIn(year, month, day);
  }
  return { days: Math.round((at - ref) / DAY_MS), year };
}

/** Every full-date anniversary in the tree, measured from `today`. */
export function collectAnniversaries(
  data: Pick<GenealogyData, "persons" | "families">,
  today: CalendarDay,
): Anniversary[] {
  const out: Anniversary[] = [];
  const add = (kind: AnniversaryKind, personIds: string[], raw?: string) => {
    const d = parseFullDate(raw);
    if (!d) return;
    const next = daysUntilNext(today, d.month, d.day);
    // Skip events in the future relative to the reference day.
    if (next.year < d.year || (next.year === d.year && next.days > 0)) return;
    out.push({
      kind,
      personIds,
      date: raw!.trim(),
      year: d.year,
      month: d.month,
      day: d.day,
      daysUntil: next.days,
      yearsAgo: next.year - d.year,
    });
  };

  for (const p of data.persons) {
    add("birth", [p.id], p.birthDate);
    add("death", [p.id], p.deathDate);
  }
  const known = new Set(data.persons.map((p) => p.id));
  for (const f of data.families) {
    const couple = f.parents.filter((id) => known.has(id));
    if (couple.length > 0) add("marriage", couple, f.marriageDate);
  }

  const order: Record<AnniversaryKind, number> = { birth: 0, marriage: 1, death: 2 };
  return out.sort(
    (a, b) =>
      a.daysUntil - b.daysUntil ||
      order[a.kind] - order[b.kind] ||
      a.year - b.year,
  );
}

/**
 * Today's matches; if none, the ones in the next `windowDays` days; if still
 * none, the nearest date after the window so the widget is never empty.
 */
export function getOnThisDay(
  data: Pick<GenealogyData, "persons" | "families">,
  today: CalendarDay,
  windowDays = 30,
): OnThisDayResult {
  const all = collectAnniversaries(data, today);
  if (all.length === 0) return { mode: "none", items: [] };

  const todays = all.filter((a) => a.daysUntil === 0);
  if (todays.length > 0) return { mode: "today", items: todays };

  const soon = all.filter((a) => a.daysUntil <= windowDays);
  if (soon.length > 0) return { mode: "upcoming", items: soon };

  const nearest = all[0].daysUntil;
  return { mode: "next", items: all.filter((a) => a.daysUntil === nearest) };
}

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/** "4 de noviembre" */
export function formatDayMonthEs(month: number, day: number): string {
  return `${day} de ${MONTHS_ES[month - 1]}`;
}
