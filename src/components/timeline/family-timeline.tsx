"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  buildTimeline,
  getCenturies,
  centuryLabel,
  type TimelineEvent,
} from "@/lib/genealogy/timeline";
import { COUNTRY_COLORS } from "@/data/migration-routes";
import familyData from "@/data/caamano-family.json";
import type { GenealogyData } from "@/lib/genealogy/types";

/** Country color for the card border */
function getCardBorder(country: string | null): string {
  if (!country) return "border-l-slate-400";
  return COUNTRY_COLORS[country]?.border ?? "border-l-slate-400";
}

function getCardBg(type: TimelineEvent["type"]): string {
  switch (type) {
    case "gap":
      return "bg-slate-100 border-dashed";
    case "death":
      return "bg-slate-50";
    case "migration":
      return "bg-teal-50/50";
    default:
      return "bg-white";
  }
}

export function FamilyTimeline() {
  const events = useMemo(
    () => buildTimeline(familyData as unknown as GenealogyData),
    [],
  );
  const centuries = useMemo(() => getCenturies(events), [events]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const current = events[currentIndex];
  const total = events.length;

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentIndex((i) => Math.min(i + 1, total - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  // Swipe support for mobile
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) setCurrentIndex((i) => Math.min(i + 1, total - 1));
        else setCurrentIndex((i) => Math.max(i - 1, 0));
      }
      touchStart.current = null;
    },
    [total],
  );

  // Jump to century
  function jumpToCentury(centuryStart: number) {
    const idx = events.findIndex((e) => e.year >= centuryStart);
    if (idx >= 0) setCurrentIndex(idx);
  }

  // Scroll timeline dots to keep current visible
  const dotsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dotsRef.current) {
      const dot = dotsRef.current.children[currentIndex] as HTMLElement;
      if (dot) {
        dot.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIndex]);

  if (!current) return null;

  const currentCentury = Math.floor(current.year / 100) * 100;

  return (
    <div
      className="flex h-full flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Century jump bar */}
      <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 py-2">
        {centuries.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => jumpToCentury(c)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              c === currentCentury
                ? "bg-teal-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {centuryLabel(c)}
          </button>
        ))}
        <span className="ml-auto shrink-0 text-xs text-slate-400">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Main card area */}
      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <div className="flex w-full max-w-lg items-center gap-3">
          {/* Previous arrow */}
          <button
            type="button"
            onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
            aria-label="Evento anterior"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-50 disabled:opacity-30 disabled:shadow-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Event card */}
          <div
            ref={cardRef}
            className={`flex-1 overflow-hidden rounded-2xl border border-l-4 shadow-lg transition-all duration-300 ${getCardBorder(current.country)} ${getCardBg(current.type)}`}
          >
            {/* Year header */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3">
              <span className="text-2xl">{current.icon}</span>
              <div>
                <p className="font-serif text-2xl font-bold tabular-nums text-slate-950">
                  {current.yearLabel}
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {current.type === "birth"
                    ? "Nacimiento"
                    : current.type === "death"
                      ? "Fallecimiento"
                      : current.type === "marriage"
                        ? "Matrimonio"
                        : current.type === "migration"
                          ? "Migración"
                          : current.type === "gap"
                            ? "Brecha documental"
                            : "Evento histórico"}
                </p>
              </div>
            </div>

            {/* Card body */}
            <div className="px-5 py-4">
              <h2 className="font-serif text-lg font-semibold text-slate-900">
                {current.title}
              </h2>
              {current.description && (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {current.description}
                </p>
              )}
              {current.personId && (
                <a
                  href={`/genealogia/person/${current.personId}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-800 hover:underline"
                >
                  Ver perfil →
                </a>
              )}
            </div>
          </div>

          {/* Next arrow */}
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((i) => Math.min(i + 1, total - 1))
            }
            disabled={currentIndex === total - 1}
            aria-label="Evento siguiente"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-50 disabled:opacity-30 disabled:shadow-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Timeline strip at bottom */}
      <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-4 py-3">
        <div
          ref={dotsRef}
          className="flex items-center gap-0.5 overflow-x-auto"
        >
          {events.map((evt, i) => {
            const isActive = i === currentIndex;
            const isBefore = i < currentIndex;
            const dotColor =
              evt.type === "gap"
                ? "bg-slate-300"
                : evt.country
                  ? {
                      colombia: "bg-emerald-500",
                      "república dominicana": "bg-amber-500",
                      ecuador: "bg-sky-500",
                      argentina: "bg-violet-500",
                      uruguay: "bg-pink-500",
                      "estados unidos": "bg-red-500",
                      españa: "bg-slate-500",
                    }[evt.country] ?? "bg-slate-400"
                  : "bg-slate-400";

            return (
              <button
                key={evt.id}
                type="button"
                onClick={() => setCurrentIndex(i)}
                title={`${evt.yearLabel}: ${evt.title}`}
                className={`shrink-0 rounded-full transition-all ${
                  isActive
                    ? `h-4 w-4 ring-2 ring-teal-400 ring-offset-1 ${dotColor}`
                    : isBefore
                      ? `h-2 w-2 ${dotColor} opacity-60`
                      : `h-2 w-2 ${dotColor} opacity-30`
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
