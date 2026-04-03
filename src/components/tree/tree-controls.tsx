/**
 * Zoom, reset, and fit-all controls for the tree view.
 * Floating overlay panel in the bottom-right corner.
 */
"use client";

interface TreeControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFitAll: () => void;
  zoomLevel: number;
  onExport?: () => void;
  onCompare?: () => void;
  compareActive?: boolean;
}

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

// Shared button style — KAI: 36px touch target, 150ms hover feedback.
// bg-white/90 + backdrop-blur keeps the panel legible over the warm dot pattern.
const btnClass =
  "flex h-9 w-9 items-center justify-center rounded-lg text-amber-800 transition-colors duration-150 hover:bg-amber-100 hover:text-amber-950 active:scale-95 active:bg-amber-200";

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

export function TreeControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onFitAll,
  zoomLevel,
  onExport,
  onCompare,
  compareActive = false,
}: TreeControlsProps) {
  return (
    // ARIA: Floating glass panel — white/90 + backdrop-blur reads over any background.
    // rounded-xl + shadow-lg gives the panel its own elevation layer (z-axis depth).
    <div className="absolute right-4 bottom-4 flex flex-col items-center gap-0.5 rounded-xl border border-amber-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-sm">
      <button
        type="button"
        onClick={onZoomIn}
        aria-label="Acercar"
        className={btnClass}
      >
        <IconPlus />
      </button>

      {/* ARIA: Zoom % acts as a subtle state indicator between the zoom buttons */}
      <span className="py-0.5 text-xs font-medium tabular-nums text-amber-700">
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
      <div className="my-1 h-px w-6 bg-amber-200" aria-hidden="true" />

      <button
        type="button"
        onClick={onReset}
        aria-label="Restablecer zoom"
        className={btnClass}
      >
        <IconRotateCcw />
      </button>

      <button
        type="button"
        onClick={onFitAll}
        aria-label="Ajustar todo"
        className={btnClass}
      >
        <IconMaximize />
      </button>

      {onCompare && (
        <>
          {/* Divider between action group and compare */}
          <div className="my-1 h-px w-6 bg-amber-200" aria-hidden="true" />

          <button
            type="button"
            onClick={onCompare}
            aria-label="Comparar dos personas"
            className={
              compareActive
                ? "flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white transition-colors duration-150 hover:bg-teal-700 active:scale-95"
                : btnClass
            }
          >
            <IconCompare />
          </button>
        </>
      )}

      {onExport && (
        <>
          {/* Divider between compare/action group and export */}
          <div className="my-1 h-px w-6 bg-amber-200" aria-hidden="true" />

          <button
            type="button"
            onClick={onExport}
            aria-label="Exportar datos"
            className={btnClass}
          >
            <IconDownload />
          </button>
        </>
      )}
    </div>
  );
}
