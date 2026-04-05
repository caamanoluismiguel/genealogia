/**
 * "Yo soy" floating chip — shows current reference person with
 * a searchable combobox and a share button for shareable tree links.
 */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Person } from "@/lib/genealogy/types";
import { searchPersons } from "@/lib/genealogy/search";

interface ReferenceChipProps {
  persons: Person[];
  currentPersonId: string | null;
  currentPersonName: string | null;
  shareUrl: string;
  onSelect: (personId: string) => void;
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

function IconChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-slate-500"
    >
      <path
        d="M3 4.5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShare() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 1.5v8M3.5 5L7 1.5 10.5 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 9v2.5h9V9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReferenceChip({
  persons,
  currentPersonId,
  currentPersonName,
  shareUrl,
  onSelect,
}: ReferenceChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 1 ? searchPersons(query, persons, 15) : [];

  const handleSelect = useCallback(
    (personId: string) => {
      setQuery("");
      setIsOpen(false);
      onSelect(personId);
    },
    [onSelect],
  );

  const handleShare = useCallback(async () => {
    const text = `Explora nuestro arbol familiar Caamano! Tu enlace personal: ${shareUrl}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Arbol Familiar Caamano",
          url: shareUrl,
          text,
        });
        return;
      } catch {
        // User cancelled or share not supported — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  }, [shareUrl]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!currentPersonId) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-28 left-2 z-20 md:top-4 md:left-1/2 md:-translate-x-1/2"
    >
      <div className="flex items-center gap-1.5">
        {/* Main chip */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm transition-colors duration-150 hover:border-slate-300"
        >
          <span className="text-xs font-medium text-slate-500">Yo soy:</span>
          <span className="max-w-40 truncate font-serif text-sm font-bold text-slate-950">
            {currentPersonName}
          </span>
          <IconChevronDown />
        </button>

        {/* Share button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg transition-colors duration-150 hover:bg-teal-700 active:scale-95"
          aria-label="Compartir enlace"
        >
          <IconShare />
        </button>

        {/* Toast */}
        {copied && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal-700 px-3 py-1 text-xs font-medium text-white shadow-lg">
            Enlace copiado!
          </div>
        )}
      </div>

      {/* Combobox dropdown */}
      {isOpen && (
        <div className="mt-2 w-72 rounded-xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur-sm">
          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar tu nombre..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          {results.length > 0 && (
            <ul className="max-h-52 overflow-y-auto pb-1">
              {results.map(({ person }) => (
                <li key={person.id}>
                  <button
                    type="button"
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors duration-100 hover:bg-slate-50 ${person.id === currentPersonId ? "bg-teal-50" : ""}`}
                    onClick={() => handleSelect(person.id)}
                  >
                    <GenderDot gender={person.gender} />
                    <span className="min-w-0 flex-1 truncate">
                      <span className="font-serif font-medium text-slate-950">
                        {person.firstName}
                      </span>{" "}
                      <span className="text-slate-700">{person.lastName}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {query.length >= 1 && results.length === 0 && (
            <p className="px-3 pb-3 text-sm italic text-slate-500">
              Sin resultados
            </p>
          )}
        </div>
      )}
    </div>
  );
}
