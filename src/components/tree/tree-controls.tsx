/**
 * Zoom, reset, and fit-all controls for the tree view.
 * Floating overlay panel in the bottom-right corner.
 */
"use client";

import { useState } from "react";
import type { Certainty, PersonSource } from "@/lib/genealogy/types";

interface TreeControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFitAll: () => void;
  zoomLevel: number;
  onExport?: () => void;
  onCompare?: () => void;
  compareActive?: boolean;
  activeCountry?: string | null;
  onSetCountry?: (country: string | null) => void;
  visibleSources?: Set<PersonSource>;
  onToggleSource?: (source: PersonSource) => void;
  /** Minimum certainty level to show. Default null = show all. */
  minCertainty?: Certainty | null;
  onSetMinCertainty?: (c: Certainty | null) => void;
}

const SOURCE_TOGGLES: {
  key: PersonSource;
  label: string;
  activeClass: string;
  inactiveClass: string;
}[] = [
  {
    key: "modern",
    label: "Familia",
    activeClass: "bg-slate-700 text-white ring-1 ring-slate-800",
    inactiveClass: "bg-slate-50 text-slate-800 ring-1 ring-slate-300",
  },
  {
    key: "historical",
    label: "Medieval",
    activeClass: "bg-purple-700 text-white ring-1 ring-purple-800",
    inactiveClass: "bg-purple-50 text-purple-900 ring-1 ring-purple-300",
  },
  {
    key: "familysearch",
    label: "Censos",
    activeClass: "bg-green-700 text-white ring-1 ring-green-800",
    inactiveClass: "bg-green-50 text-green-900 ring-1 ring-green-300",
  },
  {
    key: "pares",
    label: "PARES",
    activeClass: "bg-indigo-700 text-white ring-1 ring-indigo-800",
    inactiveClass: "bg-indigo-50 text-indigo-900 ring-1 ring-indigo-300",
  },
  {
    key: "galiciana",
    label: "Galiciana",
    activeClass: "bg-amber-700 text-white ring-1 ring-amber-800",
    inactiveClass: "bg-amber-50 text-amber-900 ring-1 ring-amber-300",
  },
  {
    key: "cemla",
    label: "Emigrantes",
    activeClass: "bg-blue-700 text-white ring-1 ring-blue-800",
    inactiveClass: "bg-blue-50 text-blue-900 ring-1 ring-blue-300",
  },
  {
    key: "genco",
    label: "Colombia",
    activeClass: "bg-teal-700 text-white ring-1 ring-teal-800",
    inactiveClass: "bg-teal-50 text-teal-900 ring-1 ring-teal-300",
  },
  {
    key: "geneanet",
    label: "Archivos",
    activeClass: "bg-rose-700 text-white ring-1 ring-rose-800",
    inactiveClass: "bg-rose-50 text-rose-900 ring-1 ring-rose-300",
  },
];

// ZERO: Inline SVG icons — no icon library, zero bundle cost.
// All paths are simple geometric shapes that render crisply at 16px.

function IconPlus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMinus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// NOVA: RotateCcw icon — counter-clockwise arrow conveys "reset" universally.
function IconRotateCcw() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8a5.5 5.5 0 1 0 1.1-3.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 4v4h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// NOVA: Maximize2 — four corner arrows signal "fit all" universally.
function IconMaximize() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.5 2H14v4.5M6.5 14H2V9.5M14 2l-4 4M2 14l4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Shared button style — 44px touch target, 150ms hover feedback.
const btnClass =
  "flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-lg px-2 text-slate-700 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-950 active:scale-95 active:bg-slate-200";
const btnLabelClass = "text-[10px] font-medium leading-none";

// PATH FINDER: Two-person link icon — signals "compare two people".
function IconCompare() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      {/* Left person circle */}
      <circle cx="4" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Right person circle */}
      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Connecting line */}
      <path
        d="M6 5h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 1.5"
      />
      {/* Left person body */}
      <path
        d="M1 12a3 3 0 0 1 6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right person body */}
      <path
        d="M9 12a3 3 0 0 1 6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// NOVA: Download icon — arrow-down-to-bar signals "export/download".
function IconDownload() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 2v8M5 7l3 3 3-3M3 12h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// NOVA: Filter icon — funnel shape signals "filter" universally at 16px.
function IconFilter() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3h12l-4.5 5.5V13l-3-1.5V8.5L2 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// KAI: Chevron for collapsible sections — rotates 180° when open.
function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 200ms ease-out",
      }}
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TreeControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onFitAll,
  zoomLevel,
  onExport,
  onCompare,
  compareActive = false,
  visibleSources,
  onToggleSource,
  activeCountry,
  onSetCountry,
  minCertainty,
  onSetMinCertainty,
}: TreeControlsProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Count active non-default filters to show a badge on the filter button
  const activeFilterCount =
    (visibleSources
      ? [...visibleSources].filter((s) => s !== "modern").length
      : 0) +
    (activeCountry ? 1 : 0) +
    (minCertainty ? 1 : 0);

  return (
    // ARIA: Floating glass panel — white/90 + backdrop-blur reads over any background.
    // rounded-xl + shadow-lg gives the panel its own elevation layer (z-axis depth).
    // ZERO: Removed max-h overflow on the wrapper — overflow is now inside the
    // collapsible filter panel only, so the zoom controls are always reachable.
    <div className="absolute right-2 bottom-2 flex flex-col items-center gap-0.5 rounded-xl border border-slate-300 bg-white/90 p-1.5 shadow-lg backdrop-blur-sm md:right-4 md:bottom-4">
      <button
        type="button"
        onClick={onZoomIn}
        aria-label="Acercar"
        className={btnClass}
      >
        <IconPlus />
      </button>

      {/* ARIA: Zoom % acts as a subtle state indicator between the zoom buttons */}
      <span className="py-0.5 text-xs font-medium tabular-nums text-slate-600">
        {Math.round(zoomLevel * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomOut}
        aria-label="Alejar"
        className={btnClass}
      >
        <IconMinus />
      </button>

      {/* Divider between zoom group and action group */}
      <div className="my-1 h-px w-6 bg-slate-200" aria-hidden="true" />

      <button
        type="button"
        onClick={onReset}
        aria-label="Restablecer zoom"
        title="Restablecer zoom"
        className={btnClass}
      >
        <IconRotateCcw />
        <span className={btnLabelClass}>Reset</span>
      </button>

      <button
        type="button"
        onClick={onFitAll}
        aria-label="Ver todo el árbol"
        title="Ver todo el árbol"
        className={btnClass}
      >
        <IconMaximize />
        <span className={btnLabelClass}>Ver todo</span>
      </button>

      {onCompare && (
        <>
          {/* Divider between action group and compare */}
          <div className="my-1 h-px w-6 bg-slate-200" aria-hidden="true" />

          <button
            type="button"
            onClick={onCompare}
            aria-label="Comparar parentesco entre dos personas"
            title="Comparar parentesco"
            className={
              compareActive
                ? "flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-2 text-white transition-colors duration-150 hover:bg-teal-700 active:scale-95"
                : btnClass
            }
          >
            <IconCompare />
            <span className={btnLabelClass}>
              {compareActive ? "Cancelar" : "Parentesco"}
            </span>
          </button>
        </>
      )}

      {onExport && (
        <>
          {/* Divider between compare/action group and export */}
          <div className="my-1 h-px w-6 bg-slate-200" aria-hidden="true" />

          <button
            type="button"
            onClick={onExport}
            aria-label="Descargar datos JSON"
            title="Descargar datos JSON"
            className={btnClass}
          >
            <IconDownload />
            <span className={btnLabelClass}>Exportar</span>
          </button>
        </>
      )}

      {/* NOVA: Collapsible filter panel — source toggles + country filter live here.
          The toggle button shows a badge with count of active non-default filters.
          On mobile this prevents the controls from overflowing off-screen. */}
      {(onToggleSource || onSetCountry) && (
        <>
          <div className="my-1 h-px w-6 bg-slate-200" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-label={filtersOpen ? "Cerrar filtros" : "Abrir filtros"}
            title="Filtros"
            className={`relative flex h-9 min-w-9 items-center justify-center gap-1 rounded-lg px-2 transition-colors duration-150 ${filtersOpen ? "bg-slate-100 text-slate-950" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"} active:scale-95 active:bg-slate-200`}
          >
            <IconFilter />
            <span className={btnLabelClass}>Filtros</span>
            <IconChevron open={filtersOpen} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[8px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {filtersOpen && (
            <div className="mt-0.5 flex w-full flex-col items-center gap-0.5 max-h-[50vh] overflow-y-auto">
              {onToggleSource && visibleSources && (
                <>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-wide text-slate-400">
                    Fuente
                  </p>
                  {SOURCE_TOGGLES.map((src) => {
                    const isActive = visibleSources.has(src.key);
                    return (
                      <button
                        key={src.key}
                        type="button"
                        onClick={() => onToggleSource(src.key)}
                        aria-label={`${isActive ? "Ocultar" : "Mostrar"} ${src.label}`}
                        aria-pressed={isActive}
                        title={src.label}
                        className={`flex h-7 w-full items-center justify-center rounded-lg px-2 text-[9px] font-bold whitespace-nowrap transition-all duration-150 ${
                          isActive ? src.activeClass : src.inactiveClass
                        }`}
                      >
                        {src.label}
                      </button>
                    );
                  })}
                </>
              )}

              {onSetCountry && (
                <>
                  <p className="mt-2 text-[8px] font-bold uppercase tracking-wide text-slate-400">
                    País
                  </p>
                  <button
                    type="button"
                    onClick={() => onSetCountry(null)}
                    className={`flex h-7 w-full items-center justify-center rounded-lg px-2 text-[9px] font-bold whitespace-nowrap transition-all duration-150 ${
                      !activeCountry
                        ? "bg-slate-700 text-white ring-1 ring-slate-800"
                        : "bg-slate-50 text-slate-600 ring-1 ring-slate-300"
                    }`}
                  >
                    Todos
                  </button>
                  {[
                    { key: "colombia", flag: "🇨🇴", label: "Colombia" },
                    { key: "república dominicana", flag: "🇩🇴", label: "RD" },
                    { key: "ecuador", flag: "🇪🇨", label: "Ecuador" },
                    { key: "argentina", flag: "🇦🇷", label: "Argentina" },
                    { key: "españa", flag: "🇪🇸", label: "España" },
                  ].map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => onSetCountry(c.key)}
                      title={c.label}
                      className={`flex h-7 w-full items-center justify-center gap-1 rounded-lg px-2 text-[9px] font-bold whitespace-nowrap transition-all duration-150 ${
                        activeCountry === c.key
                          ? "bg-teal-600 text-white ring-1 ring-teal-700"
                          : "bg-slate-50 text-slate-600 ring-1 ring-slate-300"
                      }`}
                    >
                      <span className="text-sm">{c.flag}</span>
                      {c.label}
                    </button>
                  ))}
                </>
              )}

              {onSetMinCertainty && (
                <>
                  <p className="mt-2 text-[8px] font-bold uppercase tracking-wide text-slate-400">
                    Certeza
                  </p>
                  <button
                    type="button"
                    onClick={() => onSetMinCertainty(null)}
                    title="Mostrar todo (probados + circunstanciales + hipotéticos)"
                    className={`flex h-7 w-full items-center justify-center rounded-lg px-2 text-[9px] font-bold whitespace-nowrap transition-all duration-150 ${
                      !minCertainty
                        ? "bg-slate-700 text-white ring-1 ring-slate-800"
                        : "bg-slate-50 text-slate-600 ring-1 ring-slate-300"
                    }`}
                  >
                    Todo
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetMinCertainty("circumstantial")}
                    title="Probados + circunstanciales (oculta hipotéticos)"
                    className={`flex h-7 w-full items-center justify-center gap-1 rounded-lg px-2 text-[9px] font-bold whitespace-nowrap transition-all duration-150 ${
                      minCertainty === "circumstantial"
                        ? "bg-amber-600 text-white ring-1 ring-amber-700"
                        : "bg-amber-50 text-amber-900 ring-1 ring-amber-300"
                    }`}
                  >
                    🟡 ≥ Circunstancial
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetMinCertainty("proven")}
                    title="Solo personas con documento primario (fuente archivística directa)"
                    className={`flex h-7 w-full items-center justify-center gap-1 rounded-lg px-2 text-[9px] font-bold whitespace-nowrap transition-all duration-150 ${
                      minCertainty === "proven"
                        ? "bg-emerald-600 text-white ring-1 ring-emerald-700"
                        : "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-300"
                    }`}
                  >
                    ✅ Solo probados
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
