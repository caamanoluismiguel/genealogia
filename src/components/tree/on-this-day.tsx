/**
 * "Hoy en la familia" widget: births, deaths and marriages that fall on
 * today's day and month, or the next ones coming up.
 *
 * Static export note: the page is prerendered at build time, so "today" is
 * read only on the client through useSyncExternalStore. The server snapshot
 * is null, which renders nothing and keeps hydration identical.
 */
"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  formatDayMonthEs,
  getOnThisDay,
  type Anniversary,
  type AnniversaryKind,
  type CalendarDay,
} from "@/lib/genealogy/on-this-day";
import type { Family, Person } from "@/lib/genealogy/types";

const WINDOW_DAYS = 30;
const MAX_VISIBLE = 4;

// ─── Client clock ─────────────────────────────────────────────────────────

function localDayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/** Re-check once a minute so the widget rolls over at midnight. */
function subscribeToDay(onChange: () => void): () => void {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

function useClientDayKey(): string | null {
  return useSyncExternalStore(subscribeToDay, localDayKey, () => null);
}

function parseDayKey(key: string): CalendarDay {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day };
}

// ─── Copy ─────────────────────────────────────────────────────────────────

const KIND_LABEL: Record<AnniversaryKind, string> = {
  birth: "Nacimiento",
  death: "Fallecimiento",
  marriage: "Matrimonio",
};

const KIND_BADGE: Record<AnniversaryKind, string> = {
  birth: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  death: "bg-slate-100 text-slate-700 ring-slate-300",
  marriage: "bg-rose-50 text-rose-800 ring-rose-200",
};

function whenLabel(a: Anniversary): string {
  if (a.daysUntil === 0) return "hoy";
  if (a.daysUntil === 1) return "mañana";
  return `en ${a.daysUntil} días`;
}

/** "2 de enero de 1901, hace 125 años" / "..., se cumplen 228 años" */
function detailLabel(a: Anniversary): string {
  const date = `${formatDayMonthEs(a.month, a.day)} de ${a.year}`;
  if (a.yearsAgo === 0) return date;
  const years = a.yearsAgo === 1 ? "1 año" : `${a.yearsAgo} años`;
  return `${date}, ${a.daysUntil === 0 ? "hace" : "se cumplen"} ${years}`;
}

// ─── Icons ────────────────────────────────────────────────────────────────

function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────

interface OnThisDayProps {
  persons: Person[];
  families: Family[];
  onSelectPerson: (personId: string) => void;
}

export function OnThisDay({ persons, families, onSelectPerson }: OnThisDayProps) {
  const dayKey = useClientDayKey();
  // null = responsive default (open on desktop, closed on phones).
  const [open, setOpen] = useState<boolean | null>(null);
  const [showAll, setShowAll] = useState(false);

  const result = useMemo(
    () =>
      dayKey
        ? getOnThisDay({ persons, families }, parseDayKey(dayKey), WINDOW_DAYS)
        : null,
    [dayKey, persons, families],
  );

  const names = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of persons) {
      m.set(p.id, [p.firstName, p.lastName].filter(Boolean).join(" "));
    }
    return m;
  }, [persons]);

  if (!dayKey || !result || result.mode === "none") return null;

  const today = parseDayKey(dayKey);
  const items = showAll ? result.items : result.items.slice(0, MAX_VISIBLE);
  const hidden = result.items.length - items.length;

  const intro =
    result.mode === "today"
      ? `Un día como hoy, ${formatDayMonthEs(today.month, today.day)}:`
      : result.mode === "upcoming"
        ? "Hoy no hay fechas para recordar. Mira lo que viene este mes:"
        : "Hoy no hay fechas para recordar. La próxima es:";

  const toggle = () => {
    if (open === null) {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      setOpen(!isDesktop);
    } else {
      setOpen(!open);
    }
  };

  // Responsive default via CSS so the first client render needs no media query.
  const bodyVisibility =
    open === null ? "hidden md:block" : open ? "block" : "hidden";
  const chevronOpen = open ?? false;

  return (
    <section
      aria-labelledby="on-this-day-title"
      className="absolute bottom-14 left-2 z-20 w-[calc(100vw-8.5rem)] max-w-xs md:bottom-4 md:left-4 md:w-80 md:max-w-none"
    >
      <div className="rounded-xl border border-amber-200 bg-white/95 shadow-lg backdrop-blur-sm">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open ?? undefined}
          aria-controls="on-this-day-body"
          className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition-colors hover:bg-amber-50"
        >
          <span className="text-amber-800">
            <IconCalendar />
          </span>
          <h2
            id="on-this-day-title"
            className="flex-1 font-serif text-sm font-bold text-amber-950"
          >
            Hoy en la familia
          </h2>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-amber-900">
            {result.items.length}
          </span>
          <span className={open === null ? "text-slate-600 md:rotate-180" : "text-slate-600"}>
            <IconChevron open={chevronOpen} />
          </span>
        </button>

        <div
          id="on-this-day-body"
          className={`${bodyVisibility} border-t border-amber-100 px-3 pt-2 pb-3`}
        >
          <p className="text-xs leading-snug text-slate-700">{intro}</p>
          <ul className="mt-2 max-h-[40vh] space-y-1 overflow-y-auto">
            {items.map((a) => {
              const label = a.personIds
                .map((id) => names.get(id) ?? id)
                .join(" y ");
              return (
                <li key={`${a.kind}-${a.personIds.join("-")}-${a.date}`}>
                  <button
                    type="button"
                    onClick={() => onSelectPerson(a.personIds[0])}
                    className="flex min-h-11 w-full flex-col items-start gap-0.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-amber-50 active:bg-amber-100"
                  >
                    <span className="flex w-full items-center gap-2">
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ring-1 ${KIND_BADGE[a.kind]}`}
                      >
                        {KIND_LABEL[a.kind]}
                      </span>
                      {a.daysUntil > 0 && (
                        <span className="text-[11px] font-medium text-teal-800">
                          {whenLabel(a)}
                        </span>
                      )}
                    </span>
                    <span className="text-sm font-semibold leading-tight text-slate-900">
                      {label}
                    </span>
                    <span className="text-xs text-slate-600">
                      {detailLabel(a)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {hidden > 0 && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="mt-1 min-h-11 w-full rounded-lg px-2 text-xs font-semibold text-teal-800 hover:bg-teal-50"
            >
              Ver {hidden} más
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
