"use client";

import { useState } from "react";

// --- Inline SVG Icons ---

function IconBook() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7v6M9 10h6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChart() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 17V13M12 17V8M17 17V11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconArchive() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 13h6M9 17h4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShip() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M2 20c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 17l2-10h12l2 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 7V3M9 7h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M9 6.5v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1h3M7.5 1.5H11v3.5M5.5 6.5L11 1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// --- Bar chart data for INE ---

const INE_DATA = [
  { province: "A Coruña", width: "w-full", label: "Mayor concentración" },
  { province: "Pontevedra", width: "w-3/5", label: "" },
  { province: "Madrid", width: "w-2/5", label: "" },
  { province: "Otros", width: "w-1/5", label: "" },
];

// --- Research Card Component ---

function ResearchCard({
  accent,
  icon,
  title,
  description,
  children,
}: {
  accent: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border border-amber-200 bg-white shadow-sm overflow-hidden`}
    >
      <div className={`h-1.5 ${accent}`} />
      <div className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent} bg-opacity-10`}
          >
            {icon}
          </div>
          <h3 className="font-serif text-lg font-semibold text-amber-950">
            {title}
          </h3>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-amber-800">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
}

// --- External link button ---

function ExtLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150";
  const styles =
    variant === "primary"
      ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
      : "border border-amber-200 text-amber-700 hover:bg-amber-50";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles}`}
    >
      {children}
      <IconExternalLink />
    </a>
  );
}

// --- FamilySearch Card ---

function FamilySearchCard() {
  const [name, setName] = useState("Caamaño");
  const [place, setPlace] = useState("A Coruña, Spain");

  const searchUrl = `https://www.familysearch.org/search/record/results?q.surname=${encodeURIComponent(name)}${place ? `&q.birthLikePlace=${encodeURIComponent(place)}` : ""}`;

  return (
    <ResearchCard
      accent="bg-blue-500"
      icon={<IconBook />}
      title="FamilySearch"
      description="Registros parroquiales, civiles e inmigración. La base de datos genealógica más grande del mundo."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-amber-700">
              Apellido
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-sm text-amber-950 shadow-xs transition-colors duration-150 placeholder:text-amber-600/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              placeholder="Apellido"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-amber-700">
              Lugar
            </label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-sm text-amber-950 shadow-xs transition-colors duration-150 placeholder:text-amber-600/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              placeholder="Lugar de origen"
            />
          </div>
        </div>

        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-blue-700 active:scale-[0.98]"
        >
          Buscar registros
          <IconExternalLink />
        </a>

        <div className="flex flex-wrap gap-2 pt-1">
          <ExtLink
            href="https://www.familysearch.org/search/collection/list?page=1&region=Spain&place=A+Coru%C3%B1a"
            variant="secondary"
          >
            Registros parroquiales de A Coruña
          </ExtLink>
          <ExtLink
            href="https://www.familysearch.org/search/record/results?q.surname=CAAMANO&q.deathLikePlace=Colombia"
            variant="secondary"
          >
            Inmigración a Colombia
          </ExtLink>
        </div>
      </div>
    </ResearchCard>
  );
}

// --- INE Card ---

function INECard() {
  return (
    <ResearchCard
      accent="bg-amber-500"
      icon={<IconChart />}
      title="INE — Distribución en España"
      description="Frecuencia y distribución geográfica del apellido Caamaño en España según el Instituto Nacional de Estadística."
    >
      <div className="space-y-4">
        {/* Hardcoded bar chart */}
        <div className="space-y-2.5">
          {INE_DATA.map(({ province, width, label }) => (
            <div key={province} className="space-y-1">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-medium text-amber-900">{province}</span>
                {label && <span className="text-amber-600">{label}</span>}
              </div>
              <div className="h-3 w-full rounded-full bg-amber-100">
                <div className={`h-3 rounded-full bg-amber-400 ${width}`} />
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-amber-600 italic">
          Datos: INE, Padrón Continuo 2024
        </p>

        <div className="flex flex-wrap gap-2">
          <ExtLink href="https://www.ine.es/apellidos/formGeneralresult.do?vista=1&orig=ine&cmb6=CAAMANO&L=0">
            Ver distribución del apellido Caamaño
          </ExtLink>
          <ExtLink
            href="https://www.ine.es/apellidos/formGeneralresult.do?vista=3&orig=ine&cmb3=99&cmb6=Caamano&L=0"
            variant="secondary"
          >
            Ver mapa de distribución
          </ExtLink>
        </div>
      </div>
    </ResearchCard>
  );
}

// --- PARES Card ---

function PARESCard() {
  const [query, setQuery] = useState("Caamaño");

  const searchUrl = `https://pares.mcu.es/ParesBusquedas20/catalogo/search?texto=${encodeURIComponent(query)}`;

  return (
    <ResearchCard
      accent="bg-red-700"
      icon={<IconArchive />}
      title="PARES — Archivos Españoles"
      description="Portal de Archivos Españoles. Documentos coloniales, emigración, registros de Indias."
    >
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-amber-700">
            Buscar en archivos
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex h-9 w-full rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-sm text-amber-950 shadow-xs transition-colors duration-150 placeholder:text-amber-600/40 focus:border-red-400 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
            placeholder="Nombre o apellido"
          />
        </div>

        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-red-800 active:scale-[0.98]"
        >
          Buscar en archivos
          <IconExternalLink />
        </a>

        <div className="flex flex-wrap gap-2 pt-1">
          <ExtLink
            href="https://pares.mcu.es/MovimientosMigratorios/viewer/staticContent.form?viewName=inicio"
            variant="secondary"
          >
            Movimientos Migratorios
          </ExtLink>
          <ExtLink
            href="https://pares.mcu.es/ParesBusquedas20/catalogo/search?texto=CAAMANO&archFondo=ARCHIVO+GENERAL+DE+INDIAS"
            variant="secondary"
          >
            Archivo de Indias
          </ExtLink>
        </div>

        <p className="text-xs text-amber-600 italic">
          PARES contiene más de 20 millones de documentos digitalizados de los
          archivos españoles.
        </p>
      </div>
    </ResearchCard>
  );
}

// --- CEMLA Card ---

function CEMLACard() {
  const [query, setQuery] = useState("Caamaño");

  return (
    <ResearchCard
      accent="bg-green-600"
      icon={<IconShip />}
      title="CEMLA — Pasajeros a Buenos Aires"
      description="Centro de Estudios Migratorios Latinoamericanos. Listas de pasajeros de barcos que llegaron a Buenos Aires 1882-1960."
    >
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-amber-700">
            Apellido del pasajero
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex h-9 w-full rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-sm text-amber-950 shadow-xs transition-colors duration-150 placeholder:text-amber-600/40 focus:border-green-400 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
            placeholder="Apellido"
          />
        </div>

        <a
          href="https://cemla.com/buscador/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-green-700 active:scale-[0.98]"
        >
          Buscar pasajeros
          <IconExternalLink />
        </a>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="rounded-lg bg-green-50 px-3 py-2 text-center">
            <p className="font-serif text-lg font-bold text-green-800">4.4M</p>
            <p className="text-xs text-green-700">registros</p>
          </div>
          <div className="rounded-lg bg-green-50 px-3 py-2 text-center">
            <p className="font-serif text-lg font-bold text-green-800">
              3,500+
            </p>
            <p className="text-xs text-green-700">barcos</p>
          </div>
          <div className="rounded-lg bg-green-50 px-3 py-2 text-center">
            <p className="font-serif text-lg font-bold text-green-800">200</p>
            <p className="text-xs text-green-700">países</p>
          </div>
        </div>

        <p className="text-xs text-amber-600 italic">
          Busca los Caamaño que llegaron de Galicia al puerto de Buenos Aires.
          Incluye nombre del barco, fecha de llegada y profesión.
        </p>
      </div>
    </ResearchCard>
  );
}

// --- Main Dashboard ---

export function ResearchDashboard() {
  return (
    <div className="min-h-screen bg-amber-50/50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-amber-950 sm:text-4xl">
            Investigación Genealógica
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-amber-800 sm:text-base">
            Busca registros históricos de la familia Caamaño en archivos de
            España y América
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          <FamilySearchCard />
          <INECard />
          <PARESCard />
          <CEMLACard />
        </div>
      </div>
    </div>
  );
}
