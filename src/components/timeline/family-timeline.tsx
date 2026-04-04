"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  buildTimeline,
  getCenturies,
  centuryLabel,
  getEraContext,
  getContributingSources,
  SOURCE_META,
  type TimelineEvent,
  type DateConfidence,
} from "@/lib/genealogy/timeline";
import { COUNTRY_COLORS } from "@/data/migration-routes";
import familyData from "@/data/caamano-family.json";
import type { GenealogyData } from "@/lib/genealogy/types";

// ── Visual helpers ────────────────────────────────────────────────────────────

/** Country color for the card border */
function getCardBorder(country: string | null): string {
  if (!country) return "border-l-slate-300";
  return COUNTRY_COLORS[country]?.border ?? "border-l-slate-300";
}

function getCardBg(type: TimelineEvent["type"]): string {
  switch (type) {
    case "gap":
      return "bg-slate-50";
    case "death":
      return "bg-slate-50/80";
    case "migration":
      return "bg-teal-50/40";
    default:
      return "bg-white";
  }
}

/** Event type label in Spanish */
function eventTypeLabel(type: TimelineEvent["type"]): string {
  switch (type) {
    case "birth":
      return "Nacimiento";
    case "death":
      return "Fallecimiento";
    case "marriage":
      return "Matrimonio";
    case "migration":
      return "Migración";
    case "gap":
      return "Brecha documental";
    default:
      return "Evento histórico";
  }
}

// ── Date confidence badge ─────────────────────────────────────────────────────

/**
 * ARIA: Visual confidence signal inline with the year.
 * Approximate dates get a tilde prefix and a muted "circa" pill.
 * Exact dates get a subtle green dot — confirming they're verified.
 */
function DateConfidenceBadge({
  confidence,
  label,
}: {
  confidence: DateConfidence;
  label: string;
}) {
  if (confidence === "exact") {
    return (
      <span className="flex items-baseline gap-2">
        <span className="font-serif text-3xl font-bold tabular-nums text-slate-950 leading-none">
          {label}
        </span>
        {/* ARIA: Green dot = verified exact date. Deliberate small size — it's a signal, not a label. */}
        <span
          className="mb-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-teal-500"
          title="Fecha exacta verificada"
          aria-label="Fecha exacta verificada"
        />
      </span>
    );
  }

  if (confidence === "approximate") {
    return (
      <span className="flex items-baseline gap-2 flex-wrap">
        <span className="font-serif text-3xl font-bold tabular-nums text-slate-700 leading-none">
          {label}
        </span>
        {/* ARIA: Amber pill = approximate date. "circa" is universally understood. */}
        <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 leading-none">
          aproximada
        </span>
      </span>
    );
  }

  // partial — year only
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-serif text-3xl font-bold tabular-nums text-slate-900 leading-none">
        {label}
      </span>
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 leading-none">
        solo año
      </span>
    </span>
  );
}

// ── Source attribution badge ──────────────────────────────────────────────────

/**
 * KAI + ARIA: Each card shows exactly where this data came from.
 * Pill style with icon + label. Click copies the source note to clipboard.
 * Tooltip on hover shows the full archive description.
 */
function SourceBadge({
  source,
  sourceNote,
}: {
  source: string;
  sourceNote?: string;
}) {
  const meta = SOURCE_META[source] ?? SOURCE_META.modern;
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!sourceNote) return;
    navigator.clipboard?.writeText(sourceNote).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`${meta.description}${sourceNote ? `\n\nReferencia: ${sourceNote}` : ""}`}
      aria-label={`Fuente: ${meta.label}. ${meta.description}`}
      className={`
        inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1
        text-xs font-semibold leading-none transition-colors
        ${meta.bgClass} ${meta.textClass} ${meta.borderClass}
        hover:brightness-95 active:scale-95
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500
      `}
    >
      <span aria-hidden="true">{meta.icon}</span>
      {copied ? "¡Copiado!" : meta.label}
    </button>
  );
}

// ── Gap card ──────────────────────────────────────────────────────────────────

/**
 * NOVA: The gap should feel like a puzzle, not a broken timeline.
 * Dashed border, mystery icon, call to action. Animated subtle pulse
 * draws the eye — there's something here to solve.
 */
function GapCard({ event }: { event: TimelineEvent }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-dashed border-slate-200 bg-slate-100/60 px-5 py-4">
        {/* NOVA: Pulse animation on the mystery icon draws attention without disrupting layout */}
        <span
          className="text-3xl motion-safe:animate-pulse"
          style={{ animationDuration: "2.5s" }}
          aria-hidden="true"
        >
          🔍
        </span>
        <div>
          <p className="font-serif text-2xl font-bold tabular-nums text-slate-600">
            ~1540 – 1770
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Misterio sin resolver · 230 años
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {/* ARIA: Large bold headline — the gap is the most important story on this card */}
        <h2 className="font-serif text-xl font-bold text-slate-800">
          Ayúdanos a resolver este misterio
        </h2>
        <p className="mt-2 text-base leading-relaxed text-slate-600">
          Los registros de los nobles de Villagarcía (~1540) y los primeros
          pescadores de Palmeira (1802) no están conectados aún. El email al
          Arquivo Diocesano de Santiago de Compostela fue enviado en abril 2026.
        </p>

        {/* Research threads */}
        <div className="mt-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Pistas activas
          </p>
          <ul className="space-y-1.5 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-teal-500">→</span>
              <span>
                <strong>AHDS:</strong> Registros bautismales de Sta María de
                Caamaño (1780–1860) — en espera de respuesta
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-teal-500">→</span>
              <span>
                <strong>Simancas:</strong> Catastro de Ensenada 1752 — "Santa
                María de Caamaño, Noia" — solicitado
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-teal-500">→</span>
              <span>
                <strong>FamilySearch:</strong> Archivo pre-matrimonial de Juan
                Bezerra Camaño (~1745, Noya) nombraría a sus padres
              </span>
            </li>
          </ul>
        </div>

        {/* Source badge */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">Investigación activa:</span>
          <SourceBadge source="familysearch" sourceNote={event.sourceNote} />
          <SourceBadge
            source="milestone_pares"
            sourceNote="PARES — Portal de Archivos Españoles"
          />
        </div>
      </div>
    </div>
  );
}

// ── Event card ────────────────────────────────────────────────────────────────

/**
 * ARIA: Strong year hierarchy. Source badge at bottom — it's supporting info,
 * not lead content. Date confidence badge inline with year for immediate
 * scan-ability.
 *
 * ZERO: No layout-triggering properties on transition. The card swap is
 * handled by opacity/transform at the parent level, not here.
 */
function EventCard({ event }: { event: TimelineEvent }) {
  if (event.type === "gap") return <GapCard event={event} />;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-l-4 shadow-lg ${getCardBorder(event.country)} ${getCardBg(event.type)}`}
    >
      {/* Year header */}
      <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4">
        <span className="mt-0.5 shrink-0 text-3xl" aria-hidden="true">
          {event.icon}
        </span>
        <div className="min-w-0 flex-1">
          {/* ARIA: Year is the dominant visual — largest text, serif, heavy weight */}
          <DateConfidenceBadge
            confidence={event.dateConfidence}
            label={event.yearLabel}
          />
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
            {eventTypeLabel(event.type)}
            {event.country && (
              <span className="ml-2 normal-case font-medium not-italic text-slate-400">
                · {event.country}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4">
        <h2 className="font-serif text-lg font-semibold leading-snug text-slate-900">
          {event.title}
        </h2>
        {event.description && (
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            {event.description}
          </p>
        )}
        {event.personId && (
          <a
            href={`/genealogia/person/${event.personId}`}
            className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-base font-semibold text-teal-600 hover:text-teal-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          >
            Ver perfil →
          </a>
        )}

        {/* Source attribution — always visible, never hidden */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
          {/* ARIA: "Fuente:" label anchors the badge visually */}
          <span className="text-xs font-medium text-slate-400">Fuente:</span>
          <SourceBadge source={event.source} sourceNote={event.sourceNote} />
          {/* Date confidence explanation for approximate dates */}
          {event.dateConfidence === "approximate" && (
            <span className="text-xs text-slate-400 italic">
              · Fecha estimada por contexto familiar
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Progress arc ──────────────────────────────────────────────────────────────

/**
 * NOVA: A thin progress line across the top of the main area shows where
 * you are in the 900-year story. GPU-composited (width via transform scaleX)
 * so it never causes layout reflow.
 *
 * ZERO: scaleX on transform — compositor only, no layout thrash.
 */
function StoryProgress({ current, total }: { current: number; total: number }) {
  const pct = total > 1 ? current / (total - 1) : 0;
  return (
    <div
      className="h-1 w-full overflow-hidden bg-slate-200"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Evento ${current + 1} de ${total}`}
    >
      <div
        className="h-full origin-left bg-teal-500 transition-transform duration-500 ease-out"
        style={{ transform: `scaleX(${pct})` }}
      />
    </div>
  );
}

// ── Sources footer ────────────────────────────────────────────────────────────

/**
 * ARIA + KAI: Credits all sources that contributed data.
 * Collapsed by default to save vertical space on mobile — toggle opens it.
 */
function SourcesFooter({ sources }: { sources: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shrink-0 border-t border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full min-h-[44px] items-center justify-between gap-2 px-4 py-2.5 text-left"
      >
        <span className="flex items-center gap-2">
          {/* Collaboration icon */}
          <span className="text-base" aria-hidden="true">
            🤝
          </span>
          <span className="text-sm font-semibold text-slate-700">
            Construido con datos de {sources.length} fuentes
          </span>
        </span>
        {/* ARIA: Chevron direction indicates expand/collapse */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expanded source list */}
      {open && (
        <div className="px-4 pb-4 pt-1">
          <p className="mb-3 text-xs text-slate-500 leading-relaxed">
            Esta investigación es el resultado de cruzar múltiples archivos y
            bases de datos. Cada evento en el timeline indica su fuente.
          </p>
          <div className="flex flex-wrap gap-2">
            {sources.map((src) => {
              const meta = SOURCE_META[src] ?? SOURCE_META.modern;
              return (
                <span
                  key={src}
                  title={meta.description}
                  className={`
                    inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1
                    text-xs font-semibold leading-none
                    ${meta.bgClass} ${meta.textClass} ${meta.borderClass}
                  `}
                >
                  <span aria-hidden="true">{meta.icon}</span>
                  {meta.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function FamilyTimeline() {
  const events = useMemo(
    () => buildTimeline(familyData as unknown as GenealogyData),
    [],
  );
  const centuries = useMemo(() => getCenturies(events), [events]);
  const allSources = useMemo(() => getContributingSources(events), [events]);

  const [currentIndex, setCurrentIndex] = useState(0);
  // NOVA: Track previous index so we know direction for the slide transition
  const [, setPrevIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const current = events[currentIndex];
  const total = events.length;

  /**
   * NOVA: Directional card transition.
   * When navigating forward the card slides in from the right.
   * When navigating backward it slides in from the left.
   * Uses opacity + translateX — compositor only (ZERO approved).
   */
  const [slideDir, setSlideDir] = useState<"forward" | "backward">("forward");
  const [visible, setVisible] = useState(true);

  const navigate = useCallback(
    (newIndex: number) => {
      if (newIndex === currentIndex || animating) return;
      const dir = newIndex > currentIndex ? "forward" : "backward";
      setSlideDir(dir);
      setVisible(false);
      setAnimating(true);
      setTimeout(() => {
        setPrevIndex(currentIndex);
        setCurrentIndex(newIndex);
        setVisible(true);
        setAnimating(false);
      }, 160); // matches CSS transition duration
    },
    [currentIndex, animating],
  );

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        navigate(Math.min(currentIndex + 1, total - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        navigate(Math.max(currentIndex - 1, 0));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, total, navigate]);

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
        if (diff > 0) navigate(Math.min(currentIndex + 1, total - 1));
        else navigate(Math.max(currentIndex - 1, 0));
      }
      touchStart.current = null;
    },
    [currentIndex, total, navigate],
  );

  // Jump to century
  function jumpToCentury(centuryStart: number) {
    const idx = events.findIndex((e) => e.year >= centuryStart);
    if (idx >= 0) navigate(idx);
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
  const era = getEraContext(current.year);

  // NOVA: translate direction for card entrance
  // Forward: exits left, enters from right. Backward: exits right, enters from left.
  const translateIn =
    slideDir === "forward" ? "translate-x-4" : "-translate-x-4";

  return (
    <div
      className="flex h-full flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Story progress bar — full width, GPU-composited */}
      <StoryProgress current={currentIndex} total={total} />

      {/* Century jump bar */}
      {/* KAI: 44px min-height on buttons. Horizontal scroll on small screens. */}
      <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 py-2">
        {centuries.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => jumpToCentury(c)}
            aria-label={`Ir al siglo ${centuryLabel(c)}`}
            aria-pressed={c === currentCentury}
            className={`
              shrink-0 rounded-lg px-3 font-bold transition-colors
              min-h-[44px] min-w-[44px] text-sm
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500
              ${
                c === currentCentury
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }
            `}
          >
            {centuryLabel(c)}
          </button>
        ))}
        {/* Counter — right-aligned, never wraps */}
        <span className="ml-auto shrink-0 text-sm font-medium text-slate-500 tabular-nums">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Era context strip — narrative subtitle */}
      {/* ARIA: Hierarchy: Era label (smallest) → year (largest) → title. Creates story rhythm. */}
      <div className="shrink-0 border-b border-slate-100 bg-white px-5 py-2">
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600">
          {era.label}
        </p>
        <p className="text-sm text-slate-500 leading-snug">{era.subtitle}</p>
        {era.quote && (
          <p className="mt-1 text-xs italic text-slate-400">{era.quote}</p>
        )}
      </div>

      {/* Main card area */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-4 py-5">
        <div className="flex w-full max-w-lg items-center gap-3">
          {/* Previous arrow — 48px touch target, always present */}
          <button
            type="button"
            onClick={() => navigate(Math.max(currentIndex - 1, 0))}
            disabled={currentIndex === 0 || animating}
            aria-label="Evento anterior"
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-full bg-white text-slate-600 shadow-md
              transition-colors hover:bg-slate-50
              disabled:opacity-30 disabled:shadow-none
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500
            "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Event card — directional slide transition */}
          {/* ZERO: opacity + translateX only. No height/width/margin animation. */}
          <div
            className={`
              flex-1 transition-all duration-[160ms] ease-out
              ${
                visible
                  ? "opacity-100 translate-x-0"
                  : `opacity-0 ${translateIn}`
              }
              motion-reduce:transition-none
            `}
            aria-live="polite"
            aria-atomic="true"
          >
            <EventCard event={current} />
          </div>

          {/* Next arrow */}
          <button
            type="button"
            onClick={() => navigate(Math.min(currentIndex + 1, total - 1))}
            disabled={currentIndex === total - 1 || animating}
            aria-label="Evento siguiente"
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-full bg-white text-slate-600 shadow-md
              transition-colors hover:bg-slate-50
              disabled:opacity-30 disabled:shadow-none
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500
            "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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

      {/* Timeline dot strip */}
      <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-4 py-3">
        <div
          ref={dotsRef}
          className="flex items-center gap-0.5 overflow-x-auto"
          role="list"
          aria-label="Eventos del timeline"
        >
          {events.map((evt, i) => {
            const isActive = i === currentIndex;
            const isBefore = i < currentIndex;
            const dotColor =
              evt.type === "gap"
                ? "bg-slate-300"
                : evt.country
                  ? ({
                      colombia: "bg-emerald-500",
                      "república dominicana": "bg-amber-500",
                      ecuador: "bg-sky-500",
                      argentina: "bg-violet-500",
                      uruguay: "bg-pink-500",
                      "estados unidos": "bg-red-500",
                      españa: "bg-slate-500",
                    }[evt.country] ?? "bg-slate-400")
                  : "bg-slate-400";

            return (
              <button
                key={evt.id}
                type="button"
                role="listitem"
                onClick={() => navigate(i)}
                title={`${evt.yearLabel}: ${evt.title}`}
                aria-label={`${evt.yearLabel}: ${evt.title}`}
                aria-current={isActive ? "true" : undefined}
                // KAI: Minimum 10px target padding to make dots more tappable on mobile
                className={`
                  shrink-0 rounded-full transition-all duration-200 p-1 -m-1
                  focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-1
                  ${
                    isActive
                      ? `h-4 w-4 ring-2 ring-teal-400 ring-offset-1 ${dotColor}`
                      : isBefore
                        ? `h-2 w-2 ${dotColor} opacity-60`
                        : `h-2 w-2 ${dotColor} opacity-30`
                  }
                `}
              />
            );
          })}
        </div>
        {/* Swipe hint — only on mobile, only on first event */}
        {currentIndex === 0 && (
          <p className="mt-1 text-center text-xs text-slate-400 sm:hidden">
            Desliza para navegar · {total} eventos
          </p>
        )}
      </div>

      {/* Sources footer — collapsible collaborative attribution */}
      <SourcesFooter sources={allSources} />
    </div>
  );
}
