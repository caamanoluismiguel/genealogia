"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/tree", label: "Árbol" },
  { href: "/timeline", label: "Línea del Tiempo" },
  { href: "/map", label: "Mapa" },
  { href: "/historia", label: "Historia" },
  { href: "/research", label: "Investigar" },
  { href: "/add", label: "Contribuir" },
] as const;

// ARIA: Family crest — a shield outline with "C" monogram.
// Inline SVG keeps zero-dependency; shield shape signals heritage and permanence.
function FamilyCrest() {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Shield outline */}
      <path
        d="M14 1.5L2.5 6V17C2.5 23.5 7.5 29 14 30.5C20.5 29 25.5 23.5 25.5 17V6L14 1.5Z"
        stroke="#92400e"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="#fef3c7"
      />
      {/* Inner shield detail line */}
      <path
        d="M14 4.5L5 8.5V17C5 22.5 9 27.5 14 28.5C19 27.5 23 22.5 23 17V8.5L14 4.5Z"
        stroke="#d97706"
        strokeWidth="0.75"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      {/* "C" monogram centered in shield */}
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

export function NavHeader() {
  const pathname = usePathname();

  return (
    // ARIA: Warm parchment background establishes the heritage tone immediately.
    // The amber-200 bottom border acts as a subtle divider without hard contrast.
    // shadow-sm adds just enough lift to separate nav from content without heaviness.
    <header className="sticky top-0 z-50 h-14 border-b border-slate-300 bg-slate-50 shadow-sm">
      <nav className="flex h-full items-center gap-4 px-6">
        {/* ARIA: Crest + serif title together form the identity mark */}
        <Link
          href="/tree"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <FamilyCrest />
          {/* NOVA: Slight letter-spacing on the serif title mimics engraved text */}
          <span className="font-serif text-base font-semibold tracking-wide text-slate-950">
            Genealogía Caamaño
          </span>
        </Link>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200" aria-hidden="true" />

        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                // KAI: Active state uses warm amber pill — consistent with parchment palette.
                // Hover uses amber-100 for tactile pre-selection feedback at 150ms.
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-slate-200 text-slate-800"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Donate — pushed to right */}
        <a
          href="https://www.paypal.com/donate/?business=caamano.luismiguel%40gmail.com&currency_code=USD&item_name=Apoyo+al+%C3%81rbol+Geneal%C3%B3gico+Caama%C3%B1o"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 active:scale-95"
        >
          ☕ Apoyar
        </a>
      </nav>
    </header>
  );
}
