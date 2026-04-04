/**
 * Individual person card rendered as an SVG foreignObject.
 * Shows name, dates, and gender-coded border.
 */
"use client";

import type { Person, LayoutNode } from "@/lib/genealogy/types";
import { detectCountry } from "@/data/migration-routes";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;

interface PersonNodeProps {
  person: Person;
  layout: LayoutNode;
  isSelected: boolean;
  isHighlighted: boolean;
  isReference?: boolean;
  isCompareA?: boolean;
  isCompareB?: boolean;
  relationshipLabel?: string | null;
  onSelect: (id: string) => void;
}

function extractYear(date?: string): string | null {
  if (!date) return null;
  const match = date.match(/\d{4}/);
  return match ? match[0] : null;
}

// ARIA: Left border accent creates a clear gender signal without icon clutter.
// The 4px left border is a classic genealogy software pattern — familiar to users.
/** Country → left border color + card background */
const COUNTRY_ACCENT: Record<string, { border: string; bg: string }> = {
  colombia: { border: "#10b981", bg: "#f0fdf4" }, // emerald
  "república dominicana": { border: "#f59e0b", bg: "#fffbeb" }, // amber
  ecuador: { border: "#0ea5e9", bg: "#f0f9ff" }, // sky
  argentina: { border: "#8b5cf6", bg: "#f5f3ff" }, // violet
  uruguay: { border: "#ec4899", bg: "#fdf2f8" }, // pink
  "estados unidos": { border: "#ef4444", bg: "#fef2f2" }, // red
  españa: { border: "#475569", bg: "#f8fafc" }, // slate
};

function getAccentStyle(
  person: Person,
  isSelected: boolean,
  isHighlighted: boolean,
): { borderColor: string; bgColor: string } {
  if (isSelected) {
    return { borderColor: "#0d9488", bgColor: "#f0fdfa" };
  }
  if (isHighlighted) {
    return { borderColor: "#0d9488", bgColor: "#f0fdfa" };
  }

  // Country-based coloring from birthPlace or migration destination
  const country =
    detectCountry(person.birthPlace) ??
    (person.migrations?.[0]
      ? detectCountry(
          typeof person.migrations[0].to === "string"
            ? person.migrations[0].to
            : person.migrations[0].to.label,
        )
      : null);

  if (country && COUNTRY_ACCENT[country]) {
    return {
      borderColor: COUNTRY_ACCENT[country].border,
      bgColor: COUNTRY_ACCENT[country].bg,
    };
  }

  // Fallback: neutral
  return { borderColor: "#94a3b8", bgColor: "#f8fafc" };
}

// ARIA: Subtle person silhouette icon by gender.
// Inline SVG keeps bundle zero — no icon library needed.
function GenderIcon({ gender }: { gender: Person["gender"] }) {
  if (gender === "male") {
    return (
      // KAI: Small colored dot acts as a fast visual scan target — users learn the
      // blue=male, pink=female pattern within seconds
      <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
    );
  }
  if (gender === "female") {
    return <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-pink-400" />;
  }
  return <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-slate-300" />;
}

export function PersonNode({
  person,
  layout,
  isSelected,
  isHighlighted,
  isReference = false,
  isCompareA = false,
  isCompareB = false,
  relationshipLabel,
  onSelect,
}: PersonNodeProps) {
  const birthYear = extractYear(person.birthDate);
  const deathYear = extractYear(person.deathDate);

  const { borderColor, bgColor } = getAccentStyle(
    person,
    isSelected,
    isHighlighted,
  );

  // NOVA: ring transitions on selected/highlighted create a clear state change
  // without layout shift (ring is an outline, doesn't affect box model)
  // Compare A/B rings take priority when in compare mode
  const ringStyle = isCompareA
    ? "ring-2 ring-teal-500 ring-offset-1 shadow-slate-200"
    : isCompareB
      ? "ring-2 ring-teal-500 ring-offset-1 shadow-teal-100"
      : isSelected
        ? "ring-2 ring-teal-500 ring-offset-1 shadow-teal-100"
        : isReference
          ? "ring-2 ring-emerald-400 ring-offset-1 shadow-emerald-100"
          : isHighlighted
            ? "ring-2 ring-teal-400 ring-offset-1 shadow-slate-200"
            : "";

  // Extra height for the relationship label badge below the card
  const hasLabel = !!relationshipLabel;
  const totalHeight = hasLabel ? NODE_HEIGHT + 24 : NODE_HEIGHT;

  return (
    <foreignObject
      x={layout.x}
      y={layout.y}
      width={NODE_WIDTH}
      height={totalHeight}
    >
      <div className="flex flex-col items-center">
        <div
          className={`relative flex w-full cursor-pointer flex-col justify-center rounded-lg border border-slate-200 border-l-[3px] px-3 py-2 transition-shadow duration-200 hover:shadow-lg ${ringStyle}`}
          style={{
            backgroundColor: bgColor,
            borderLeftColor: borderColor,
            borderLeftStyle:
              person.source && person.source !== "modern" ? "dashed" : "solid",
            height: NODE_HEIGHT,
          }}
          onClick={() => onSelect(person.id)}
        >
          {/* "Yo" indicator for the reference person */}
          {isReference && !isCompareA && !isCompareB && (
            <div className="absolute -top-2 -right-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold leading-none text-white shadow-sm">
              YO
            </div>
          )}

          {/* Compare mode A/B badges */}
          {isCompareA && (
            <div className="absolute -top-2 -left-2 rounded-full bg-slate-500 px-1.5 py-0.5 text-[8px] font-bold leading-none text-white shadow-sm">
              A
            </div>
          )}
          {isCompareB && (
            <div className="absolute -top-2 -left-2 rounded-full bg-teal-500 px-1.5 py-0.5 text-[8px] font-bold leading-none text-white shadow-sm">
              B
            </div>
          )}

          {/* Source badge for non-modern persons */}
          {person.source &&
            person.source !== "modern" &&
            person.source !== "gap" && (
              <div
                className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase leading-none text-white shadow-sm ${
                  {
                    historical: "bg-purple-700",
                    familysearch: "bg-green-700",
                    cemla: "bg-blue-700",
                    geneanet: "bg-rose-700",
                    genco: "bg-teal-700",
                    ellisisland: "bg-red-700",
                    uruguay: "bg-pink-700",
                    pares: "bg-indigo-700",
                  }[person.source] ?? "bg-slate-500"
                }`}
              >
                {{
                  historical: "Medieval",
                  familysearch: "Censo",
                  cemla: "Emigrante",
                  geneanet: "Archivo",
                  genco: "Colombia",
                  ellisisland: "Ellis Is.",
                  uruguay: "Uruguay",
                  pares: "PARES",
                }[person.source] ?? "?"}
              </div>
            )}

          {/* Name row with gender indicator */}
          <div className="flex min-w-0 items-start gap-1.5">
            <GenderIcon gender={person.gender} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-sm font-semibold leading-tight text-slate-950">
                {person.firstName}
              </p>
              {/* ARIA: Removed /70 opacity — amber-800 on cream bg meets WCAG AA */}
              <p className="truncate text-xs text-slate-700">
                {person.lastName}
              </p>
            </div>
          </div>

          {/* Year span — bottom right, de-emphasized */}
          {(birthYear || deathYear) && (
            <div className="mt-1 flex items-center justify-end gap-0.5">
              {/* ARIA: amber-700 without opacity — years are data, must be legible */}
              <span className="text-[10px] tabular-nums text-slate-600">
                {birthYear ?? "?"}
                {deathYear ? `–${deathYear}` : ""}
              </span>
            </div>
          )}
        </div>

        {/* Relationship label badge */}
        {hasLabel && (
          <div className="mt-1 max-w-[180px] truncate rounded-full bg-teal-600 px-2 py-0.5 text-center text-[10px] font-medium text-white">
            tu {relationshipLabel}
          </div>
        )}
      </div>
    </foreignObject>
  );
}
