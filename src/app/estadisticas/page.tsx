/**
 * Research progress dashboard — statistics about the family tree data.
 * Server component: reads JSON at build time, zero client JS.
 * Shows totals by source, century, and region so researchers can track progress.
 */
import { loadFamilyData } from "@/lib/data/loader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estadísticas — Árbol Caamaño",
  description:
    "Progreso de investigación del árbol genealógico Caamaño: 415 personas, 111 familias, 9 archivos internacionales.",
};

// Source definitions — label, color class, description
const SOURCE_META: Record<
  string,
  { label: string; color: string; description: string }
> = {
  modern: {
    label: "Familia directa",
    color: "bg-slate-600",
    description:
      "Registros familiares confirmados (FamilySearch, registros civiles)",
  },
  historical: {
    label: "Línea medieval",
    color: "bg-purple-600",
    description: "García Carraffa Tomo XX — Casa de Noya, s. XII–XVI",
  },
  familysearch: {
    label: "FamilySearch / Censos",
    color: "bg-green-600",
    description: "Padrones y registros parroquiales de Ribeira/Palmeira",
  },
  pares: {
    label: "PARES (Catastro 1752)",
    color: "bg-indigo-600",
    description: "Catastro de Ensenada, Feligresía de Sta. María de Caamaño",
  },
  galiciana: {
    label: "Galiciana",
    color: "bg-amber-600",
    description:
      "Archivo del Reino de Galicia — documentos históricos digitalizados",
  },
  geneanet: {
    label: "Geneanet / Archivos",
    color: "bg-rose-600",
    description: "Árbol larapat (Patrice Lara) y otros árboles colaborativos",
  },
  genco: {
    label: "Genealogías de Colombia",
    color: "bg-teal-600",
    description: "Juan de Caamaño → Antioquia 1744, Ecuador presidencial",
  },
  cemla: {
    label: "CEMLA (Buenos Aires)",
    color: "bg-blue-600",
    description: "Manifiestos de pasajeros, puerto de Buenos Aires 1884–1907",
  },
  uruguay: {
    label: "Uruguay",
    color: "bg-pink-600",
    description: "José Caamaño Soto — combinación de apellidos confirmatoria",
  },
  gap: {
    label: "Brecha documental",
    color: "bg-slate-400",
    description: "Marcador de conexión probable sin fuente sacramental directa",
  },
};

// Country detection from birthPlace string
function detectCountry(place?: string): string {
  if (!place) return "Desconocido";
  const lc = place.toLowerCase();
  if (lc.includes("colombia")) return "Colombia";
  if (
    lc.includes("españa") ||
    lc.includes("spain") ||
    lc.includes("galicia") ||
    lc.includes("coruña") ||
    lc.includes("pontevedra") ||
    lc.includes("ferrol") ||
    lc.includes("noia") ||
    lc.includes("muros")
  )
    return "España";
  if (lc.includes("mexico") || lc.includes("méxico")) return "México";
  if (lc.includes("ecuador")) return "Ecuador";
  if (lc.includes("argentina")) return "Argentina";
  if (lc.includes("dominicana") || lc.includes("rd")) return "Rep. Dominicana";
  if (lc.includes("uruguay")) return "Uruguay";
  if (lc.includes("cuba")) return "Cuba";
  if (lc.includes("estados unidos") || lc.includes("usa")) return "EE.UU.";
  return "Otro";
}

const COUNTRY_COLORS: Record<string, string> = {
  Colombia: "bg-emerald-500",
  España: "bg-slate-500",
  México: "bg-orange-500",
  Ecuador: "bg-sky-500",
  Argentina: "bg-violet-500",
  "Rep. Dominicana": "bg-amber-500",
  Uruguay: "bg-pink-500",
  Cuba: "bg-red-500",
  "EE.UU.": "bg-blue-500",
  Desconocido: "bg-slate-300",
  Otro: "bg-slate-300",
};

export default function EstadisticasPage() {
  const data = loadFamilyData();
  const { persons, families, meta } = data;

  // --- Source counts ---
  const sourceCounts: Record<string, number> = {};
  for (const p of persons) {
    const src = p.source ?? "modern";
    sourceCounts[src] = (sourceCounts[src] ?? 0) + 1;
  }
  const totalPersons = persons.length;
  const maxSourceCount = Math.max(...Object.values(sourceCounts));

  // --- Century distribution ---
  const centuryCounts: Record<number, number> = {};
  for (const p of persons) {
    const match = p.birthDate?.match(/\d{4}/);
    if (match) {
      const century = Math.floor(parseInt(match[0]) / 100) + 1;
      centuryCounts[century] = (centuryCounts[century] ?? 0) + 1;
    }
  }
  const sortedCenturies = Object.entries(centuryCounts)
    .map(([c, count]) => ({ century: parseInt(c), count }))
    .sort((a, b) => a.century - b.century);
  const maxCenturyCount = Math.max(...sortedCenturies.map((c) => c.count));

  // Roman numeral helper for centuries
  function toRoman(n: number): string {
    const map: [number, string][] = [
      [20, "XX"],
      [19, "XIX"],
      [18, "XVIII"],
      [17, "XVII"],
      [16, "XVI"],
      [15, "XV"],
      [14, "XIV"],
      [13, "XIII"],
      [12, "XII"],
      [11, "XI"],
    ];
    return map.find(([v]) => v === n)?.[1] ?? `s.${n}`;
  }

  // --- Regional distribution ---
  const regionCounts: Record<string, number> = {};
  for (const p of persons) {
    const country = detectCountry(p.birthPlace);
    regionCounts[country] = (regionCounts[country] ?? 0) + 1;
  }
  const sortedRegions = Object.entries(regionCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);
  const maxRegionCount = Math.max(...sortedRegions.map((r) => r.count));

  // --- Persons without birthDate (data gaps) ---
  const noBirthDate = persons.filter((p) => !p.birthDate).length;
  const noBirthPlace = persons.filter((p) => !p.birthPlace).length;
  const withNotes = persons.filter(
    (p) => p.notes && p.notes.length > 20,
  ).length;
  const withMigrations = persons.filter(
    (p) => p.migrations && p.migrations.length > 0,
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b border-slate-300 bg-gradient-to-b from-slate-50 to-white">
        <div className="h-0.5 w-full bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300" />
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-8">
          <h1 className="font-serif text-2xl font-semibold text-slate-950 md:text-3xl">
            Progreso de Investigación
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 italic md:text-base">
            Estadísticas del árbol genealógico Caamaño — actualizado
            continuamente.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 md:px-6 md:py-8">
        {/* Key stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              value: totalPersons,
              label: "Personas",
              sub: `versión ${meta.version}`,
              color: "text-teal-600",
            },
            {
              value: families.length,
              label: "Familias",
              sub: "unidades familiares",
              color: "text-teal-600",
            },
            {
              value: Object.keys(sourceCounts).length,
              label: "Fuentes",
              sub: "archivos consultados",
              color: "text-teal-600",
            },
            {
              value:
                sortedCenturies.length > 0
                  ? `${toRoman(sortedCenturies[0].century)}–${toRoman(sortedCenturies[sortedCenturies.length - 1].century)}`
                  : "—",
              label: "Siglos",
              sub: "cobertura temporal",
              color: "text-slate-700",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
            >
              <p
                className={`font-serif text-2xl font-bold tabular-nums md:text-3xl ${stat.color}`}
              >
                {stat.value}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-slate-800">
                {stat.label}
              </p>
              <p className="text-xs text-slate-500">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* By source */}
        <section
          aria-labelledby="fuentes-heading"
          className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="border-b border-slate-100 px-5 py-4">
            <h2
              id="fuentes-heading"
              className="font-serif text-lg font-semibold text-slate-950"
            >
              Por fuente documental
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Cada fuente representa un archivo o base de datos distinto. La
              barra indica el porcentaje del total.
            </p>
          </div>
          <div className="divide-y divide-slate-50">
            {Object.entries(sourceCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([src, count]) => {
                const meta2 = SOURCE_META[src] ?? {
                  label: src,
                  color: "bg-slate-400",
                  description: "",
                };
                const pct = Math.round((count / totalPersons) * 100);
                const barWidth = Math.round((count / maxSourceCount) * 100);
                return (
                  <div key={src} className="px-5 py-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800">
                        {meta2.label}
                      </span>
                      <span className="shrink-0 font-mono text-sm font-bold tabular-nums text-slate-700">
                        {count}{" "}
                        <span className="text-xs font-normal text-slate-400">
                          ({pct}%)
                        </span>
                      </span>
                    </div>
                    {meta2.description && (
                      <p className="mt-0.5 text-xs text-slate-500">
                        {meta2.description}
                      </p>
                    )}
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className={`h-1.5 rounded-full ${meta2.color}`}
                        style={{ width: `${barWidth}%` }}
                        aria-label={`${count} personas`}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* By century */}
        <section
          aria-labelledby="siglos-heading"
          className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="border-b border-slate-100 px-5 py-4">
            <h2
              id="siglos-heading"
              className="font-serif text-lg font-semibold text-slate-950"
            >
              Por siglo de nacimiento
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Solo personas con fecha de nacimiento conocida (
              {totalPersons - noBirthDate} de {totalPersons}).
            </p>
          </div>
          <div className="px-5 py-4">
            {/* Vertical bar chart */}
            <div
              className="flex items-end gap-1.5 sm:gap-2"
              style={{ height: "120px" }}
            >
              {sortedCenturies.map(({ century, count }) => {
                const heightPct = Math.round((count / maxCenturyCount) * 100);
                return (
                  <div
                    key={century}
                    className="group relative flex flex-1 flex-col items-center justify-end"
                    style={{ height: "100%" }}
                  >
                    <span className="mb-1 hidden text-[9px] tabular-nums text-slate-600 group-hover:block sm:block">
                      {count}
                    </span>
                    <div
                      className="w-full rounded-t-sm bg-teal-500 transition-all duration-300"
                      style={{ height: `${heightPct}%` }}
                      title={`Siglo ${toRoman(century)}: ${count} personas`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-1.5 flex gap-1.5 sm:gap-2">
              {sortedCenturies.map(({ century }) => (
                <div
                  key={century}
                  className="flex-1 text-center text-[9px] font-medium text-slate-500 sm:text-[10px]"
                >
                  {toRoman(century)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* By region */}
        <section
          aria-labelledby="regiones-heading"
          className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="border-b border-slate-100 px-5 py-4">
            <h2
              id="regiones-heading"
              className="font-serif text-lg font-semibold text-slate-950"
            >
              Por región de nacimiento
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Detectado por lugar de nacimiento registrado.
            </p>
          </div>
          <div className="divide-y divide-slate-50">
            {sortedRegions.map(({ country, count }) => {
              const barWidth = Math.round((count / maxRegionCount) * 100);
              const pct = Math.round((count / totalPersons) * 100);
              const colorClass = COUNTRY_COLORS[country] ?? "bg-slate-300";
              return (
                <div key={country} className="px-5 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-800">
                      {country}
                    </span>
                    <span className="shrink-0 font-mono text-sm font-bold tabular-nums text-slate-700">
                      {count}{" "}
                      <span className="text-xs font-normal text-slate-400">
                        ({pct}%)
                      </span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className={`h-1.5 rounded-full ${colorClass}`}
                      style={{ width: `${barWidth}%` }}
                      aria-label={`${count} personas`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Data quality */}
        <section
          aria-labelledby="calidad-heading"
          className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="border-b border-slate-100 px-5 py-4">
            <h2
              id="calidad-heading"
              className="font-serif text-lg font-semibold text-slate-950"
            >
              Calidad de datos
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Qué tan completos están los registros actuales.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-4">
            {[
              {
                value: totalPersons - noBirthDate,
                total: totalPersons,
                label: "Con fecha de nacimiento",
                color: "text-teal-600",
              },
              {
                value: totalPersons - noBirthPlace,
                total: totalPersons,
                label: "Con lugar de nacimiento",
                color: "text-teal-600",
              },
              {
                value: withNotes,
                total: totalPersons,
                label: "Con notas de investigación",
                color: "text-slate-700",
              },
              {
                value: withMigrations,
                total: totalPersons,
                label: "Con migraciones documentadas",
                color: "text-slate-700",
              },
            ].map((item) => {
              const pct = Math.round((item.value / item.total) * 100);
              return (
                <div key={item.label} className="bg-white px-4 py-4">
                  <p
                    className={`font-serif text-xl font-bold tabular-nums md:text-2xl ${item.color}`}
                  >
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <div className="mt-2 h-1 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1 rounded-full bg-teal-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-[10px] tabular-nums text-slate-400">
                    {pct}% completado
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 italic">
          Árbol v{meta.version} · Última actualización:{" "}
          {new Date(meta.lastUpdated).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · Datos de 9 archivos internacionales
        </p>
      </div>
    </div>
  );
}
