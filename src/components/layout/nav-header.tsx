"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/tree", label: "Árbol", icon: "🌳" },
  {
    href: "/timeline",
    label: "Línea del Tiempo",
    icon: "📅",
    mobileLabel: "Tiempo",
  },
  { href: "/map", label: "Mapa", icon: "🗺️" },
  { href: "/historia", label: "Historia", icon: "📖" },
  { href: "/research", label: "Investigar", icon: "🔬", mobileHide: true },
  { href: "/add", label: "Contribuir", icon: "✏️" },
] as const;

// Mobile bottom tab items (subset for bottom bar)
const MOBILE_TABS = [
  { href: "/tree", label: "Árbol", icon: "🌳" },
  { href: "/timeline", label: "Tiempo", icon: "📅" },
  { href: "/map", label: "Mapa", icon: "🗺️" },
  { href: "/historia", label: "Historia", icon: "📖" },
  { href: "/add", label: "Contribuir", icon: "✏️" },
] as const;

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

export function NavHeader() {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop top bar ── */}
      <header className="sticky top-0 z-50 h-14 border-b border-slate-300 bg-slate-50 shadow-sm max-md:h-12">
        <nav className="flex h-full items-center gap-4 px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/tree"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <FamilyCrest />
            <span className="font-serif text-sm font-semibold tracking-wide text-slate-950 md:text-base">
              <span className="hidden sm:inline">Genealogía</span> Caamaño
            </span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
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

          {/* Donate — always visible, pushed right */}
          <a
            href="https://www.paypal.com/donate/?business=caamano.luismiguel%40gmail.com&currency_code=USD&item_name=Apoyo+al+%C3%81rbol+Geneal%C3%B3gico+Caama%C3%B1o"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 active:scale-95 md:rounded-xl md:px-4 md:py-2 md:text-sm"
            title="Tu donación financia la búsqueda de registros históricos"
          >
            <span className="hidden md:inline">
              🔍 Ayúdanos a encontrar más registros
            </span>
            <span className="md:hidden">🔍 Apoyar</span>
          </a>
        </nav>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm md:hidden safe-bottom">
        <div className="flex items-stretch">
          {MOBILE_TABS.map(({ href, label, icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-center transition-colors ${
                  isActive ? "text-teal-600" : "text-slate-500"
                }`}
              >
                <span className="text-lg leading-none">{icon}</span>
                <span className="text-[10px] font-medium leading-none">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
