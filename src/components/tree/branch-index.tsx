"use client";

import { useState } from "react";

interface Branch {
  id: string;
  label: string;
  flag: string;
  personId: string;
  description: string;
}

const BRANCHES: Branch[] = [
  {
    id: "main",
    label: "José Tomás → Colombia",
    flag: "🇨🇴",
    personId: "p001",
    description: "Rama principal. Patriarca ~1815, El Banco, Magdalena.",
  },
  {
    id: "dr",
    label: "Álvaro y Ramiro → RD",
    flag: "🇩🇴",
    personId: "p200",
    description:
      "Ramón Caamaño García (Santiago de Compostela) → Rep. Dominicana.",
  },
  {
    id: "ecuador",
    label: "Jacinto → Ecuador",
    flag: "🇪🇨",
    personId: "gc011",
    description: "Explorador naval. Nieto: Presidente de Ecuador.",
  },
  {
    id: "medieval",
    label: "Línea Medieval",
    flag: "🏰",
    personId: "h001",
    description: "Rodrigo García de Caamaño (1100s). García Carraffa, Tomo XX.",
  },
  {
    id: "muros",
    label: "Muros → Antioquia (1744)",
    flag: "🇨🇴",
    personId: "gc001",
    description:
      "Juan de Caamaño → Bernardo Martínez y Perrúa. Genealogías de Colombia.",
  },
  {
    id: "palmeira",
    label: "Palmeira (FamilySearch)",
    flag: "🇪🇸",
    personId: "fs001",
    description: "Pablo Caamaño Villa (1802). Censos de Ribeira.",
  },
  {
    id: "licerio",
    label: "Rama Licerio",
    flag: "🇨🇴",
    personId: "p171",
    description: "Licerio Caamaño Rangel + Ana María Benavides. El Banco.",
  },
  {
    id: "jacob",
    label: "Rama Jacob",
    flag: "🇨🇴",
    personId: "p178",
    description: "Miguel → Jacob Caamaño + Salvadora Blanquicet. El Banco.",
  },
];

interface BranchIndexProps {
  onJumpToPerson: (personId: string) => void;
}

export function BranchIndex({ onJumpToPerson }: BranchIndexProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute left-2 top-2 z-30 md:left-4 md:top-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white/95 px-3 py-2 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-50"
      >
        <span className="text-base">🌿</span>
        <span className="max-md:sr-only">
          {open ? "Cerrar" : "Ramas familiares"}
        </span>
        <span className="md:hidden">{open ? "✕" : "Ramas"}</span>
      </button>

      {open && (
        <div className="mt-2 max-h-[70vh] w-[calc(100vw-1rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-sm md:w-72">
          <p className="px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-400">
            Ir a una rama
          </p>
          <div className="mt-1 space-y-0.5">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  onJumpToPerson(b.personId);
                  setOpen(false);
                }}
                className="flex w-full min-h-[44px] items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-teal-50 active:bg-teal-100"
              >
                <span className="mt-0.5 text-lg">{b.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {b.label}
                  </p>
                  <p className="text-[11px] leading-tight text-slate-500">
                    {b.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
