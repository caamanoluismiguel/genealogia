/**
 * Floating banner for Path Finder (compare two people) mode.
 * Shows selection prompts and computed kinship result.
 */
"use client";

import type { Person } from "@/lib/genealogy/types";

interface PathFinderBannerProps {
  personA: Person | null;
  personB: Person | null;
  kinshipLabel: string | null;
  onReset: () => void;
  onClose: () => void;
}

function personName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

export function PathFinderBanner({
  personA,
  personB,
  kinshipLabel,
  onReset,
  onClose,
}: PathFinderBannerProps) {
  const hasA = !!personA;
  const hasB = !!personB;
  const hasResult = hasA && hasB;

  return (
    <div className="absolute top-28 left-1/2 z-30 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-xl border border-slate-300 border-l-4 border-l-teal-500 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-sm">
        {/* State: no selections */}
        {!hasA && (
          <>
            <span className="text-sm text-slate-700">
              <span className="mr-1.5">🔍</span>
              Selecciona la primera persona en el árbol
            </span>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              <span aria-hidden="true">✕</span> Cancelar
            </button>
          </>
        )}

        {/* State: person A selected, waiting for B */}
        {hasA && !hasB && (
          <>
            <span className="text-sm text-slate-700">
              <span className="mr-1.5">🔍</span>
              <span className="font-serif font-bold text-slate-950">
                {personName(personA)}
              </span>
              <span className="mx-2 text-slate-400">→</span>
              Selecciona la segunda persona
            </span>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              <span aria-hidden="true">✕</span> Cancelar
            </button>
          </>
        )}

        {/* State: both selected, show result */}
        {hasResult && (
          <>
            <span className="font-serif text-sm font-bold text-slate-950">
              {personName(personA)}
            </span>
            <span className="text-slate-400" aria-hidden="true">
              ←→
            </span>
            <span className="font-serif text-sm font-bold text-slate-950">
              {personName(personB)}
            </span>

            {kinshipLabel ? (
              <span className="rounded-full bg-teal-600 px-2.5 py-0.5 text-xs font-medium text-white">
                {kinshipLabel}
              </span>
            ) : (
              <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                sin relacion directa
              </span>
            )}

            <button
              type="button"
              onClick={onReset}
              className="ml-2 flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-50"
            >
              <span aria-hidden="true">🔄</span> Otra comparacion
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              <span aria-hidden="true">✕</span> Cerrar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
