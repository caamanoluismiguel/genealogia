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

import familyData from "@/data/caamano-family.json";
import type { GenealogyData } from "@/lib/genealogy/types";

// ── Era visual system ─────────────────────────────────────────────────────────
//
// ARIA: Each era gets a full personality — background gradient, text palette,
// accent color, and watermark opacity. This is the "emotional temperature"
// of each period in the 900-year saga.

interface EraTheme {
  /** CSS gradient for the full-bleed background */
  bg: string;
  /** Background color for the card surface */
  cardBg: string;
  /** Border color for the card */
  cardBorder: string;
  /** Color for the huge watermark year */
  yearWatermark: string;
  /** Color for the era label pill */
  labelColor: string;
  /** Text color for the era label */
  labelText: string;
  /** Color used for accent lines / dots */
  accentLine: string;
  /** Arrow button background */
  arrowBg: string;
  /** Arrow button text */
  arrowText: string;
  /** Century pill active state */
  centuryActiveBg: string;
  /** Century pill active text */
  centuryActiveText: string;
  /** Progress bar fill color */
  progressFill: string;
}

function getEraTheme(year: number): EraTheme {
  // Medieval era (< 1400) — dark stone, gold accents, parchment tones
  if (year < 1400) {
    return {
      bg: "linear-gradient(160deg, #1c1917 0%, #292524 40%, #1c1a15 100%)",
      cardBg: "rgba(41, 37, 36, 0.92)",
      cardBorder: "rgba(180, 140, 60, 0.35)",
      yearWatermark: "rgba(180, 140, 60, 0.08)",
      labelColor: "rgba(180, 140, 60, 0.18)",
      labelText: "#ca8a04",
      accentLine: "#ca8a04",
      arrowBg: "rgba(180,140,60,0.12)",
      arrowText: "#fde68a",
      centuryActiveBg: "#ca8a04",
      centuryActiveText: "#1c1917",
      progressFill: "#ca8a04",
    };
  }
  // Renaissance / Founding era (1400–1550) — rich burgundy, heraldic gold
  if (year < 1550) {
    return {
      bg: "linear-gradient(160deg, #1e0a0a 0%, #3b0f0f 40%, #1a0e0e 100%)",
      cardBg: "rgba(45, 18, 18, 0.93)",
      cardBorder: "rgba(185, 120, 50, 0.35)",
      yearWatermark: "rgba(185, 120, 50, 0.08)",
      labelColor: "rgba(185, 120, 50, 0.18)",
      labelText: "#d97706",
      accentLine: "#d97706",
      arrowBg: "rgba(185,120,50,0.12)",
      arrowText: "#fcd34d",
      centuryActiveBg: "#b45309",
      centuryActiveText: "#fff7ed",
      progressFill: "#d97706",
    };
  }
  // The Gap era (1550–1770) — deep indigo, mystery, near black
  if (year < 1780) {
    return {
      bg: "linear-gradient(160deg, #0f0f1a 0%, #1a1a2e 40%, #0d0d18 100%)",
      cardBg: "rgba(22, 22, 42, 0.95)",
      cardBorder: "rgba(99, 90, 220, 0.25)",
      yearWatermark: "rgba(99, 90, 220, 0.07)",
      labelColor: "rgba(99, 90, 220, 0.18)",
      labelText: "#818cf8",
      accentLine: "#6366f1",
      arrowBg: "rgba(99,90,220,0.12)",
      arrowText: "#c7d2fe",
      centuryActiveBg: "#4338ca",
      centuryActiveText: "#eef2ff",
      progressFill: "#6366f1",
    };
  }
  // Parish records / Galicia (1780–1850) — warm parchment, sepia
  if (year < 1850) {
    return {
      bg: "linear-gradient(160deg, #2c1a0a 0%, #3d2410 40%, #241508 100%)",
      cardBg: "rgba(50, 33, 14, 0.92)",
      cardBorder: "rgba(180, 130, 70, 0.30)",
      yearWatermark: "rgba(180, 130, 70, 0.09)",
      labelColor: "rgba(180, 130, 70, 0.18)",
      labelText: "#d97706",
      accentLine: "#b45309",
      arrowBg: "rgba(180,130,70,0.12)",
      arrowText: "#fde68a",
      centuryActiveBg: "#92400e",
      centuryActiveText: "#fffbeb",
      progressFill: "#b45309",
    };
  }
  // Great Emigration (1850–1920) — deep ocean blue, crossing the Atlantic
  if (year < 1920) {
    return {
      bg: "linear-gradient(160deg, #050d18 0%, #0c1a2e 40%, #071020 100%)",
      cardBg: "rgba(8, 20, 42, 0.93)",
      cardBorder: "rgba(14, 116, 144, 0.35)",
      yearWatermark: "rgba(14, 116, 144, 0.09)",
      labelColor: "rgba(14, 116, 144, 0.20)",
      labelText: "#22d3ee",
      accentLine: "#0891b2",
      arrowBg: "rgba(14,116,144,0.12)",
      arrowText: "#a5f3fc",
      centuryActiveBg: "#0e7490",
      centuryActiveText: "#ecfeff",
      progressFill: "#0891b2",
    };
  }
  // Colombian roots (1920–1980) — warm emerald, tierra firme
  if (year < 1980) {
    return {
      bg: "linear-gradient(160deg, #051a10 0%, #0a2e1a 40%, #041208 100%)",
      cardBg: "rgba(8, 32, 18, 0.93)",
      cardBorder: "rgba(16, 185, 129, 0.28)",
      yearWatermark: "rgba(16, 185, 129, 0.08)",
      labelColor: "rgba(16, 185, 129, 0.18)",
      labelText: "#34d399",
      accentLine: "#10b981",
      arrowBg: "rgba(16,185,129,0.10)",
      arrowText: "#a7f3d0",
      centuryActiveBg: "#065f46",
      centuryActiveText: "#ecfdf5",
      progressFill: "#10b981",
    };
  }
  // Modern (1980+) — clean off-white, minimal, present day
  return {
    bg: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)",
    cardBg: "rgba(255, 255, 255, 0.97)",
    cardBorder: "rgba(51, 65, 85, 0.14)",
    yearWatermark: "rgba(51, 65, 85, 0.05)",
    labelColor: "rgba(20, 184, 166, 0.14)",
    labelText: "#0d9488",
    accentLine: "#14b8a6",
    arrowBg: "rgba(20, 184, 166, 0.10)",
    arrowText: "#0f766e",
    centuryActiveBg: "#0d9488",
    centuryActiveText: "#f0fdfa",
    progressFill: "#14b8a6",
  };
}

/** True if the era uses a dark background (affects text colors) */
function isDarkEra(year: number): boolean {
  return year < 1980;
}

// ── Country accent for migration events ──────────────────────────────────────

function getCountryAccent(country: string | null): string {
  if (!country) return "#94a3b8";
  const map: Record<string, string> = {
    colombia: "#10b981",
    "república dominicana": "#f59e0b",
    ecuador: "#0ea5e9",
    argentina: "#8b5cf6",
    uruguay: "#ec4899",
    "estados unidos": "#ef4444",
    españa: "#94a3b8",
  };
  return map[country] ?? "#94a3b8";
}

// ── Event type label ──────────────────────────────────────────────────────────

function eventTypeLabel(type: TimelineEvent["type"]): string {
  switch (type) {
    case "birth":
      return "Nacimiento";
    case "death":
      return "Fallecimiento";
    case "marriage":
      return "Matrimonio";
    case "migration":
      return "Emigración";
    case "gap":
      return "Brecha documental";
    default:
      return "Hecho histórico";
  }
}

// ── Date confidence badge ─────────────────────────────────────────────────────
//
// ARIA: The confidence signal lives inside the year display, not competing with it.

function DateConfidenceBadge({
  confidence,
  label,
  dark,
}: {
  confidence: DateConfidence;
  label: string;
  dark: boolean;
}) {
  const baseText = dark ? "text-white/90" : "text-slate-900";
  const dimText = dark ? "text-white/60" : "text-slate-500";

  if (confidence === "exact") {
    return (
      <span className="flex items-baseline gap-2">
        <span
          className={`font-serif text-2xl font-bold tabular-nums leading-none ${baseText}`}
        >
          {label}
        </span>
        <span
          className="mb-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-teal-400"
          title="Fecha exacta verificada"
          aria-label="Fecha exacta verificada"
        />
      </span>
    );
  }
  if (confidence === "approximate") {
    return (
      <span className="flex items-baseline gap-2 flex-wrap">
        <span
          className={`font-serif text-2xl font-bold tabular-nums leading-none ${dark ? "text-white/75" : "text-slate-600"}`}
        >
          {label}
        </span>
        <span
          className={`text-xs font-semibold leading-none px-2 py-0.5 rounded-full border ${dark ? "border-white/15 text-white/50 bg-white/5" : "border-amber-300 text-amber-700 bg-amber-50"}`}
        >
          aprox.
        </span>
      </span>
    );
  }
  return (
    <span className="flex items-baseline gap-2">
      <span
        className={`font-serif text-2xl font-bold tabular-nums leading-none ${baseText}`}
      >
        {label}
      </span>
      <span className={`text-xs leading-none ${dimText}`}>año</span>
    </span>
  );
}

// ── Source badge ──────────────────────────────────────────────────────────────

function SourceBadge({
  source,
  sourceNote,
  dark,
}: {
  source: string;
  sourceNote?: string;
  dark: boolean;
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

  // ARIA: On dark era cards, use a subtle translucent style; on light cards use the normal pill
  const pillClass = dark
    ? "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-xs font-semibold leading-none text-white/60 hover:bg-white/12 transition-colors cursor-pointer active:scale-95"
    : `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none transition-colors hover:brightness-95 active:scale-95 cursor-pointer ${meta.bgClass} ${meta.textClass} ${meta.borderClass}`;

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`${meta.description}${sourceNote ? `\n\nReferencia: ${sourceNote}` : ""}`}
      aria-label={`Fuente: ${meta.label}. ${meta.description}`}
      className={pillClass}
    >
      <span aria-hidden="true">{meta.icon}</span>
      {copied ? "¡Copiado!" : meta.label}
    </button>
  );
}

// ── Gap card — THE DRAMATIC MYSTERY MOMENT ────────────────────────────────────
//
// NOVA: This is the emotional climax of the timeline — the mystery gap.
// Dark background, animated question dots, documentary tone, call to action.
// ARIA: Giant year watermark creates spatial context even here.

function GapCard() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl w-full"
      style={{
        background:
          "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 60%, #0d0d18 100%)",
        border: "1px solid rgba(99,90,220,0.25)",
        boxShadow: "0 0 60px rgba(99,90,220,0.12), 0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* NOVA: Animated floating dots — visual metaphor for the missing link */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Three pulsing orbs suggesting the missing connections */}
        <div
          className="absolute rounded-full motion-safe:animate-pulse"
          style={{
            width: 120,
            height: 120,
            top: "15%",
            left: "10%",
            background:
              "radial-gradient(circle, rgba(99,90,220,0.15) 0%, transparent 70%)",
            animationDuration: "3s",
          }}
        />
        <div
          className="absolute rounded-full motion-safe:animate-pulse"
          style={{
            width: 80,
            height: 80,
            top: "55%",
            right: "12%",
            background:
              "radial-gradient(circle, rgba(99,90,220,0.12) 0%, transparent 70%)",
            animationDuration: "4s",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute rounded-full motion-safe:animate-pulse"
          style={{
            width: 60,
            height: 60,
            bottom: "20%",
            left: "45%",
            background:
              "radial-gradient(circle, rgba(99,90,220,0.10) 0%, transparent 70%)",
            animationDuration: "3.5s",
            animationDelay: "0.5s",
          }}
        />
      </div>

      {/* ARIA: Giant watermark year — anchors the period even in mystery */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-end px-6 pt-4 select-none"
        aria-hidden="true"
      >
        <span
          className="font-serif font-black tabular-nums leading-none"
          style={{
            fontSize: "clamp(5rem, 20vw, 9rem)",
            color: "rgba(99,90,220,0.07)",
            letterSpacing: "-0.04em",
          }}
        >
          ?
        </span>
      </div>

      {/* Gap header strip */}
      <div className="relative z-10 px-6 pt-6 pb-4 border-b border-white/8">
        <div className="flex items-center gap-3 mb-3">
          {/* NOVA: Pulsing mystery icon */}
          <span
            className="text-4xl motion-safe:animate-pulse shrink-0"
            style={{ animationDuration: "2.5s" }}
            aria-hidden="true"
          >
            🔍
          </span>
          <div>
            <p className="font-serif text-3xl font-bold text-white/90 tabular-nums leading-none">
              ~1540 – 1770
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400/80">
              La Brecha · 230 años sin documentar
            </p>
          </div>
        </div>

        {/* Three animated connecting dots */}
        <div className="flex items-center gap-1.5 mt-3" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="rounded-full motion-safe:animate-pulse"
              style={{
                width: i === 0 || i === 8 ? 8 : 5,
                height: i === 0 || i === 8 ? 8 : 5,
                background:
                  i === 0 || i === 8
                    ? "rgba(129,140,248,0.7)"
                    : `rgba(129,140,248,${0.15 + i * 0.05})`,
                animationDuration: `${2 + i * 0.2}s`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Gap body */}
      <div className="relative z-10 px-6 py-5">
        <h2 className="font-serif text-xl font-bold text-white/90 leading-snug">
          Ayúdanos a resolver este misterio
        </h2>
        <p className="mt-2 text-base leading-relaxed text-white/60">
          Los nobles de Villagarcía (~1540) y los primeros pescadores de
          Palmeira (1802) no están conectados aún. El email al Arquivo Diocesano
          de Santiago fue enviado en abril 2026.
        </p>

        {/* Research threads */}
        <div className="mt-4 space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-400/70">
            Pistas activas
          </p>
          {[
            {
              label: "AHDS",
              text: "Registros bautismales de Sta María de Caamaño (1780–1860) — en espera",
            },
            {
              label: "Simancas",
              text: 'Catastro de Ensenada 1752 — "Santa María de Caamaño, Noia"',
            },
            {
              label: "FamilySearch",
              text: "Archivo pre-matrimonial Juan Bezerra Camaño (~1745, Noya)",
            },
          ].map(({ label, text }) => (
            <div key={label} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-indigo-400 text-sm">→</span>
              <p className="text-sm text-white/55 leading-relaxed">
                <strong className="text-white/70 font-semibold">
                  {label}:
                </strong>{" "}
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Sources */}
        <div className="mt-5 pt-4 border-t border-white/8 flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/35">Investigación activa:</span>
          <SourceBadge source="familysearch" dark />
          <SourceBadge
            source="milestone_pares"
            dark
            sourceNote="PARES — Portal de Archivos Españoles"
          />
        </div>
      </div>
    </div>
  );
}

// ── Event card ────────────────────────────────────────────────────────────────
//
// ARIA: The card is a magazine spread. The huge watermark year sits behind
// content as a typographic anchor. Left edge gets a colored country line.
// KAI: Profile link gets a full-width tap zone on mobile.

function EventCard({
  event,
  theme,
  dark,
}: {
  event: TimelineEvent;
  theme: EraTheme;
  dark: boolean;
}) {
  if (event.type === "gap") return <GapCard />;

  const countryAccent = getCountryAccent(event.country);
  const typeLabel = eventTypeLabel(event.type);

  return (
    <div
      className="relative overflow-hidden rounded-3xl w-full"
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        boxShadow: dark
          ? "0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)"
          : "0 20px 50px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)",
      }}
    >
      {/* ARIA: Giant semi-transparent year watermark — behind content, sets spatial anchor */}
      {/* ZERO: position:absolute + opacity — compositor only, zero layout impact */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-end px-5 pt-3 select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-serif font-black tabular-nums leading-none"
          style={{
            fontSize: "clamp(4.5rem, 18vw, 8.5rem)",
            color: theme.yearWatermark,
            letterSpacing: "-0.04em",
            // ZERO: Clip to prevent overflow affecting scroll
            maxWidth: "100%",
            display: "block",
          }}
        >
          {/* Show just the year number (not ~ or ≈ prefix) */}
          {event.yearLabel.replace(/[~≈]/g, "").match(/\d{4}/)?.[0] ??
            event.year}
        </span>
      </div>

      {/* Left accent line — country color */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
        style={{ background: countryAccent }}
        aria-hidden="true"
      />

      {/* Card header */}
      <div className="relative z-10 px-6 pt-5 pb-4 pl-7">
        {/* Type + country label row */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold uppercase tracking-[0.15em]"
            style={{ color: theme.labelText }}
          >
            {typeLabel}
          </span>
          {event.country && (
            <>
              <span
                className="text-xs"
                style={{ color: theme.labelText, opacity: 0.5 }}
              >
                ·
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: theme.labelText, opacity: 0.7 }}
              >
                {event.country.charAt(0).toUpperCase() + event.country.slice(1)}
              </span>
            </>
          )}
          <span
            className="ml-1 text-2xl shrink-0"
            aria-hidden="true"
            style={{ lineHeight: 1 }}
          >
            {event.icon}
          </span>
        </div>

        {/* Date with confidence signal */}
        <DateConfidenceBadge
          confidence={event.dateConfidence}
          label={event.yearLabel}
          dark={dark}
        />
      </div>

      {/* Thin divider */}
      <div
        className="relative z-10 mx-6 h-px"
        style={{
          background: dark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.08)",
        }}
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="relative z-10 px-6 pt-4 pb-5 pl-7">
        <h2
          className="font-serif text-lg font-bold leading-snug"
          style={{ color: dark ? "rgba(255,255,255,0.92)" : "rgb(15,23,42)" }}
        >
          {event.title}
        </h2>
        {event.description && (
          <p
            className="mt-2 text-base leading-relaxed"
            style={{
              color: dark ? "rgba(255,255,255,0.55)" : "rgb(71,85,105)",
            }}
          >
            {event.description}
          </p>
        )}

        {/* Profile link — full-width tap zone, 44px min height */}
        {event.personId && (
          <a
            href={`/genealogia/person/${event.personId}`}
            className="mt-4 flex min-h-[44px] items-center gap-2 text-base font-semibold transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            style={{ color: theme.labelText }}
          >
            Ver perfil completo
            <svg
              width="16"
              height="16"
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
          </a>
        )}

        {/* Source — quiet, bottom, out of the way */}
        <div
          className="mt-4 pt-3 flex flex-wrap items-center gap-2"
          style={{
            borderTop: dark
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid rgba(15,23,42,0.07)",
          }}
        >
          <span
            className="text-xs"
            style={{
              color: dark ? "rgba(255,255,255,0.30)" : "rgba(15,23,42,0.35)",
            }}
          >
            Fuente:
          </span>
          <SourceBadge
            source={event.source}
            sourceNote={event.sourceNote}
            dark={dark}
          />
          {event.dateConfidence === "approximate" && (
            <span
              className="text-xs italic"
              style={{
                color: dark ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.30)",
              }}
            >
              · Fecha estimada por contexto
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Era context strip ─────────────────────────────────────────────────────────
//
// ARIA: The era strip is editorial — era name as eyebrow, subtitle as
// supporting text, quote as pull-quote. Shifts color with the era theme.
// NOVA: Subtle fade-in when the era changes.

function EraStrip({
  year,
  theme,
  dark,
}: {
  year: number;
  theme: EraTheme;
  dark: boolean;
}) {
  const era = getEraContext(year);
  return (
    <div
      className="shrink-0 px-5 py-3"
      style={{
        borderBottom: dark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(15,23,42,0.08)",
      }}
    >
      {/* Era label pill */}
      <span
        className="inline-block text-xs font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-1.5"
        style={{
          background: theme.labelColor,
          color: theme.labelText,
        }}
      >
        {era.label}
      </span>
      <p
        className="text-sm leading-snug"
        style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgb(100,116,139)" }}
      >
        {era.subtitle}
      </p>
      {era.quote && (
        <p
          className="mt-1 text-xs italic leading-relaxed"
          style={{
            color: dark ? "rgba(255,255,255,0.30)" : "rgba(15,23,42,0.35)",
            borderLeft: `2px solid ${theme.accentLine}`,
            paddingLeft: "0.625rem",
            marginTop: "0.5rem",
          }}
        >
          {era.quote}
        </p>
      )}
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
//
// ZERO: scaleX transition on the fill — GPU-composited, zero layout reflow.

function StoryProgress({
  current,
  total,
  theme,
}: {
  current: number;
  total: number;
  theme: EraTheme;
}) {
  const pct = total > 1 ? current / (total - 1) : 0;
  return (
    <div
      className="h-0.5 w-full shrink-0 overflow-hidden"
      style={{ background: "rgba(0,0,0,0.15)" }}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Evento ${current + 1} de ${total}`}
    >
      <div
        className="h-full origin-left transition-transform duration-500 ease-out"
        style={{
          transform: `scaleX(${pct})`,
          background: theme.progressFill,
        }}
      />
    </div>
  );
}

// ── Century jump bar ──────────────────────────────────────────────────────────
//
// KAI: Bigger buttons, bolder active state, overflow scroll hint via gradient fade.

function CenturyBar({
  centuries,
  currentCentury,
  theme,
  dark,
  onJump,
  currentIndex,
  total,
}: {
  centuries: number[];
  currentCentury: number;
  theme: EraTheme;
  dark: boolean;
  onJump: (century: number) => void;
  currentIndex: number;
  total: number;
}) {
  return (
    <div
      className="shrink-0 flex items-center gap-1.5 overflow-x-auto px-4 py-2.5"
      style={{
        borderBottom: dark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(15,23,42,0.08)",
        // ARIA: subtle background tint for the nav bar
        background: dark ? "rgba(0,0,0,0.20)" : "rgba(15,23,42,0.03)",
      }}
    >
      {centuries.map((c) => {
        const isActive = c === currentCentury;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onJump(c)}
            aria-label={`Ir al siglo ${centuryLabel(c)}`}
            aria-pressed={isActive}
            className="shrink-0 rounded-xl px-3.5 font-bold transition-all duration-200 min-h-[44px] min-w-[44px] text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            style={
              isActive
                ? {
                    background: theme.centuryActiveBg,
                    color: theme.centuryActiveText,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                  }
                : {
                    background: dark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(15,23,42,0.05)",
                    color: dark ? "rgba(255,255,255,0.50)" : "rgb(100,116,139)",
                    border: dark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(15,23,42,0.08)",
                  }
            }
          >
            {centuryLabel(c)}
          </button>
        );
      })}
      {/* Counter — never wraps, right-aligned */}
      <span
        className="ml-auto shrink-0 text-sm font-semibold tabular-nums"
        style={{
          color: dark ? "rgba(255,255,255,0.30)" : "rgba(15,23,42,0.35)",
        }}
      >
        {currentIndex + 1}/{total}
      </span>
    </div>
  );
}

// ── Navigation arrows ─────────────────────────────────────────────────────────
//
// KAI: Large, dramatic arrows. Visible at all times. Clear press state.
// On dark eras: ghost style. On light eras: elevated card style.

function NavArrow({
  direction,
  disabled,
  onClick,
  theme,
  dark,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  theme: EraTheme;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Evento anterior" : "Evento siguiente"}
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-150 disabled:opacity-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:scale-95"
      style={{
        background: theme.arrowBg,
        color: theme.arrowText,
        border: dark
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid rgba(15,23,42,0.10)",
        boxShadow: disabled
          ? "none"
          : dark
            ? "0 4px 16px rgba(0,0,0,0.30)"
            : "0 4px 16px rgba(15,23,42,0.10)",
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {direction === "prev" ? (
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

// ── Timeline dot strip ────────────────────────────────────────────────────────
//
// ARIA: The strip is a mini data viz — past events dimmed, future faded.
// Active dot is larger with a ring. Country colors give geographic context at a glance.

function DotStrip({
  events,
  currentIndex,
  dark,
  onNavigate,
}: {
  events: TimelineEvent[];
  currentIndex: number;
  dark: boolean;
  onNavigate: (index: number) => void;
}) {
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dotsRef.current) {
      const dot = dotsRef.current.children[currentIndex] as HTMLElement;
      if (dot)
        dot.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
    }
  }, [currentIndex]);

  function getDotColor(evt: TimelineEvent): string {
    if (evt.type === "gap") return dark ? "rgba(99,90,220,0.6)" : "#6366f1";
    return evt.country
      ? getCountryAccent(evt.country)
      : dark
        ? "rgba(255,255,255,0.35)"
        : "#94a3b8";
  }

  return (
    <div
      className="shrink-0 px-4 py-3"
      style={{
        borderTop: dark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(15,23,42,0.08)",
        background: dark ? "rgba(0,0,0,0.15)" : "rgba(15,23,42,0.02)",
      }}
    >
      <div
        ref={dotsRef}
        className="flex items-center gap-0.5 overflow-x-auto"
        role="list"
        aria-label="Eventos del timeline"
        // ZERO: hide scrollbar but keep scroll functionality
        style={{ scrollbarWidth: "none" }}
      >
        {events.map((evt, i) => {
          const isActive = i === currentIndex;
          const isBefore = i < currentIndex;
          const color = getDotColor(evt);

          return (
            <button
              key={evt.id}
              type="button"
              role="listitem"
              onClick={() => onNavigate(i)}
              title={`${evt.yearLabel}: ${evt.title}`}
              aria-label={`${evt.yearLabel}: ${evt.title}`}
              aria-current={isActive ? "true" : undefined}
              className="shrink-0 rounded-full transition-all duration-200 p-1.5 -m-1.5 focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-1"
            >
              <div
                className="rounded-full transition-all duration-200"
                style={{
                  width: isActive ? 12 : 6,
                  height: isActive ? 12 : 6,
                  background: color,
                  opacity: isActive ? 1 : isBefore ? 0.65 : 0.25,
                  boxShadow: isActive
                    ? `0 0 0 2px rgba(0,0,0,0.3), 0 0 0 4px ${color}40`
                    : "none",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Swipe hint — mobile only, first event only */}
      {currentIndex === 0 && (
        <p
          className="mt-1.5 text-center text-xs sm:hidden"
          style={{
            color: dark ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.30)",
          }}
        >
          Desliza para navegar · {events.length} eventos
        </p>
      )}
    </div>
  );
}

// ── Sources footer ────────────────────────────────────────────────────────────

function SourcesFooter({
  sources,
  dark,
}: {
  sources: string[];
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="shrink-0"
      style={{
        borderTop: dark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(15,23,42,0.08)",
        background: dark ? "rgba(0,0,0,0.20)" : "rgba(15,23,42,0.02)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full min-h-[44px] items-center justify-between gap-2 px-5 py-3 text-left transition-opacity hover:opacity-80"
      >
        <span className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">
            🤝
          </span>
          <span
            className="text-sm font-semibold"
            style={{
              color: dark ? "rgba(255,255,255,0.55)" : "rgb(71,85,105)",
            }}
          >
            {sources.length} fuentes de investigación
          </span>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{
            color: dark ? "rgba(255,255,255,0.30)" : "rgb(148,163,184)",
          }}
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

      {open && (
        <div className="px-5 pb-4 pt-1">
          <p
            className="mb-3 text-xs leading-relaxed"
            style={{
              color: dark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.40)",
            }}
          >
            Cada evento indica su fuente documental. Construido cruzando
            múltiples archivos.
          </p>
          <div className="flex flex-wrap gap-2">
            {sources.map((src) => {
              const meta = SOURCE_META[src] ?? SOURCE_META.modern;
              return (
                <span
                  key={src}
                  title={meta.description}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none ${
                    dark
                      ? "border-white/12 bg-white/6 text-white/50"
                      : `${meta.bgClass} ${meta.textClass} ${meta.borderClass}`
                  }`}
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
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"forward" | "backward">("forward");
  const [visible, setVisible] = useState(true);

  const current = events[currentIndex];
  const total = events.length;

  // NOVA: Directional card transition — forward drops from above, backward from below.
  // translateY + opacity — GPU-composited only (ZERO approved).
  const navigate = useCallback(
    (newIndex: number) => {
      if (newIndex === currentIndex || animating) return;
      const dir = newIndex > currentIndex ? "forward" : "backward";
      setSlideDir(dir);
      setVisible(false);
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setVisible(true);
        setAnimating(false);
      }, 180);
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

  // Swipe support
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

  function jumpToCentury(centuryStart: number) {
    const idx = events.findIndex((e) => e.year >= centuryStart);
    if (idx >= 0) navigate(idx);
  }

  if (!current) return null;

  const theme = getEraTheme(current.year);
  const dark = isDarkEra(current.year);
  const currentCentury = Math.floor(current.year / 100) * 100;

  // NOVA: card exit direction — forward exits up, backward exits down
  const exitTranslate = slideDir === "forward" ? "-8px" : "8px";

  return (
    // ZERO: background-color transition on the wrapper — single compositor property,
    // no layout reflow. The full-bleed era shift happens here.
    <div
      className="flex h-full flex-col transition-colors duration-700"
      style={{ background: dark ? theme.bg : undefined }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Story progress bar — 2px, GPU scaleX */}
      <StoryProgress current={currentIndex} total={total} theme={theme} />

      {/* Century jump bar */}
      <CenturyBar
        centuries={centuries}
        currentCentury={currentCentury}
        theme={theme}
        dark={dark}
        onJump={jumpToCentury}
        currentIndex={currentIndex}
        total={total}
      />

      {/* Era context strip */}
      <EraStrip year={current.year} theme={theme} dark={dark} />

      {/* Main card area */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-3 py-4 sm:px-5">
        <div className="flex w-full max-w-lg items-center gap-2 sm:gap-3">
          {/* Previous arrow */}
          <NavArrow
            direction="prev"
            disabled={currentIndex === 0 || animating}
            onClick={() => navigate(Math.max(currentIndex - 1, 0))}
            theme={theme}
            dark={dark}
          />

          {/* Event card — NOVA: translateY + opacity for cinematic reveal */}
          {/* ZERO: only transform + opacity animated — compositor only */}
          <div
            className="flex-1 transition-all ease-out motion-reduce:transition-none"
            style={{
              transitionDuration: "180ms",
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0)"
                : `translateY(${exitTranslate})`,
              // On enter (post-state-update), comes from the opposite direction
              // This is achieved by the brief invisible window + re-mount from offset
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            <EventCard event={current} theme={theme} dark={dark} />
          </div>

          {/* Next arrow */}
          <NavArrow
            direction="next"
            disabled={currentIndex === total - 1 || animating}
            onClick={() => navigate(Math.min(currentIndex + 1, total - 1))}
            theme={theme}
            dark={dark}
          />
        </div>
      </div>

      {/* Dot strip */}
      <DotStrip
        events={events}
        currentIndex={currentIndex}
        dark={dark}
        onNavigate={navigate}
      />

      {/* Sources footer */}
      <SourcesFooter sources={allSources} dark={dark} />
    </div>
  );
}
