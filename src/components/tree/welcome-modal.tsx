/**
 * Welcome modal — shown on first visit when no "yo" identity is set.
 * Lets the user pick who they are, or skip to explore freely.
 */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Person } from "@/lib/genealogy/types";
import { searchPersons } from "@/lib/genealogy/search";

interface WelcomeModalProps {
  persons: Person[];
  onSelect: (personId: string) => void;
  onSkip: () => void;
}

function GenderDot({ gender }: { gender: Person["gender"] }) {
  const color =
    gender === "male"
      ? "bg-blue-400"
      : gender === "female"
        ? "bg-pink-400"
        : "bg-slate-300";
  return <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${color}`} />;
}

function FamilyCrest() {
  return (
    <svg
      width="48"
      height="54"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto shrink-0"
    >
      <path
        d="M14 1.5L2.5 6V17C2.5 23.5 7.5 29 14 30.5C20.5 29 25.5 23.5 25.5 17V6L14 1.5Z"
        stroke="#92400e"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="#fef3c7"
      />
      <path
        d="M14 4.5L5 8.5V17C5 22.5 9 27.5 14 28.5C19 27.5 23 22.5 23 17V8.5L14 4.5Z"
        stroke="#d97706"
        strokeWidth="0.75"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      <text
        x="14"
        y="19.5"
        textAnchor="middle"
        fontSize="12"
        fontFamily="Georgia, serif"
        fontWeight="600"
        fill="#92400e"
      >
        C
      </text>
    </svg>
  );
}

export function WelcomeModal({ persons, onSelect, onSkip }: WelcomeModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const results = query.length >= 1 ? searchPersons(query, persons, 15) : [];

  const handleSelect = useCallback(
    (personId: string) => {
      onSelect(personId);
    },
    [onSelect],
  );

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Trap focus inside modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-heading"
        className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      >
        <FamilyCrest />

        <h2
          id="welcome-heading"
          className="mt-4 text-center font-serif text-xl font-semibold text-amber-950"
        >
          Bienvenido al Arbol Familiar Caamano!
        </h2>

        <p className="mt-2 text-center text-sm text-amber-800">
          Quien eres? Selecciona tu nombre para ver tus relaciones familiares.
        </p>

        {/* Search input */}
        <div className="mt-6">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tu nombre..."
            className="w-full rounded-xl border border-amber-200 px-4 py-3 text-sm text-amber-950 outline-none placeholder:text-amber-500/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-amber-100">
            {results.map(({ person }) => (
              <li key={person.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors duration-100 hover:bg-amber-50"
                  onClick={() => handleSelect(person.id)}
                >
                  <GenderDot gender={person.gender} />
                  <span className="min-w-0 flex-1 truncate">
                    <span className="font-serif font-medium text-amber-950">
                      {person.firstName}
                    </span>{" "}
                    <span className="text-amber-800">{person.lastName}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query.length >= 1 && results.length === 0 && (
          <p className="mt-2 text-center text-sm italic text-amber-600">
            Sin resultados
          </p>
        )}

        {/* Skip link */}
        <button
          type="button"
          onClick={onSkip}
          className="mt-6 block w-full text-center text-sm font-medium text-amber-600 transition-colors duration-150 hover:text-amber-800"
        >
          Solo quiero explorar &rarr;
        </button>
      </div>
    </div>
  );
}
