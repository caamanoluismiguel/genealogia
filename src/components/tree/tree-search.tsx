/**
 * Search autocomplete for finding persons in the tree.
 * Triggers zoom-to-person on selection.
 */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Person } from "@/lib/genealogy/types";
import { searchPersons } from "@/lib/genealogy/search";

interface TreeSearchProps {
  persons: Person[];
  onSelect: (personId: string) => void;
}

function extractYear(date?: string): string | null {
  if (!date) return null;
  const match = date.match(/\d{4}/);
  return match ? match[0] : null;
}

// ARIA: Gender dot in dropdown results — matches the PersonNode gender indicator
// so users build a consistent mental model across search and tree.
function GenderDot({ gender }: { gender: Person["gender"] }) {
  const color =
    gender === "male"
      ? "bg-blue-400"
      : gender === "female"
        ? "bg-pink-400"
        : "bg-slate-300";
  return <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${color}`} />;
}

// ZERO: Inline SVG magnifying glass — no icon library, no bundle cost.
function IconSearch() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-amber-600"
    >
      <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 10l3 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TreeSearch({ persons, onSelect }: TreeSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 2 ? searchPersons(query, persons) : [];

  const handleSelect = useCallback(
    (personId: string) => {
      setQuery("");
      setIsOpen(false);
      onSelect(personId);
    },
    [onSelect],
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // ARIA: top-4 left-4 positions search in the natural scan path (top-left).
    // Width 72 gives enough room for full names without crowding the tree.
    <div ref={containerRef} className="absolute top-4 left-4 w-72">
      {/* KAI: Icon inside input left-side — 4px padding-left leaves room for icon.
          The icon anchors the interaction affordance without redundant placeholder. */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <IconSearch />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Buscar familiar..."
          // ARIA: bg-white/90 + backdrop-blur matches the controls panel glass style.
          // border-amber-200 ties into the warm palette; focus shifts to teal (action color).
          className="w-full rounded-xl border border-amber-200 bg-white/90 py-2 pr-3 pl-9 text-sm text-amber-950 shadow-lg backdrop-blur-sm outline-none placeholder:text-amber-600/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
        />
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        // NOVA: mt-1 gap creates clear separation between input and results.
        // rounded-xl + shadow-lg matches the search input's elevation.
        <ul className="mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-amber-100 bg-white/95 shadow-lg backdrop-blur-sm">
          {results.map(({ person }) => (
            <li key={person.id}>
              <button
                type="button"
                // ARIA: Each result has a left border accent by gender — same visual
                // language as PersonNode. Users instantly know what they're selecting.
                className="flex w-full items-center gap-2.5 border-l-2 px-3 py-2.5 text-left text-sm transition-colors duration-100 hover:bg-amber-50"
                style={{
                  borderLeftColor:
                    person.gender === "male"
                      ? "#60a5fa"
                      : person.gender === "female"
                        ? "#f472b6"
                        : "#94a3b8",
                }}
                onClick={() => handleSelect(person.id)}
              >
                <GenderDot gender={person.gender} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-serif font-medium text-amber-950">
                    {person.firstName}{" "}
                    <span className="font-sans font-normal text-amber-800">
                      {person.lastName}
                    </span>
                  </span>
                </span>
                {extractYear(person.birthDate) && (
                  <span className="shrink-0 text-xs tabular-nums text-amber-600">
                    {extractYear(person.birthDate)}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="mt-1.5 rounded-xl border border-amber-100 bg-white/95 px-3 py-2.5 text-sm italic text-amber-600 shadow-lg backdrop-blur-sm">
          Sin resultados
        </div>
      )}
    </div>
  );
}
