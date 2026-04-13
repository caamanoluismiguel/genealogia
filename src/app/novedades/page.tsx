/**
 * Changelog / "What's new" page — tracks research milestones version by version.
 * Server component, zero client JS. Archival tone: scholarly, concise.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novedades — Árbol Caamaño",
  description:
    "Historial de versiones del árbol genealógico Caamaño — qué se descubrió, qué se añadió y de qué fuentes.",
};

type ChangeType = "descubrimiento" | "datos" | "fuente" | "corrección" | "ui";

interface ChangeEntry {
  version: number;
  date: string; // YYYY-MM-DD
  title: string;
  type: ChangeType;
  persons?: number; // total persons at this version
  families?: number;
  highlights: string[];
  source?: string; // archive/source cited
}

// ARIA: Reverse-chronological — most recent first.
// Each entry is a research milestone, not a software release.
const CHANGELOG: ChangeEntry[] = [
  {
    version: 32,
    date: "2026-04-13",
    title: "PARES Catastro finalizado + integración Galiciana",
    type: "descubrimiento",
    persons: 415,
    families: 111,
    highlights: [
      "13 Caamaños identificados en el Catastro de Ensenada (1752), feligresía de Sta. María de Caamaño — 3 clústeres: de los Santos, canteros, hacendado.",
      "Francisco de los Santos Thomás de Caamaño: nombre compuesto coincide con el patriarca p001 (José Tomás). Hipótesis de conexión generacional.",
      "Incorporados 13 registros de Galiciana — nueva fuente documental añadida al árbol.",
      "Pedro Caamaño y Andrés Caamaño identificados como canteros activos en la parroquia (f.174v). Próximo paso: protocolos notariales AHPA Noia 1740–1780.",
      "Simancas confirmó que las imágenes originales ya estaban en PARES 6092354. Cerrado.",
      "Nuevo: Carlos Infantes Buil (Jefe Referencias Simancas) confirmó que las Respuestas Particulares originales están en el ARG (Arquivo do Reino de Galicia).",
    ],
    source: "PARES 6092354 · Galiciana · ARG (pendiente)",
  },
  {
    version: 21,
    date: "2026-04-10",
    title: "Integración masiva: PARES, Geneanet larapat, Depo FE10",
    type: "datos",
    persons: 341,
    families: 91,
    highlights: [
      "+78 personas en una sesión: datos del Catastro 1752, árbol larapat (Patrice Lara, Geneanet) y Depo fondo FE10 Familia Caamaño.",
      "Pedro Bazarra Caamaño (1712–1767): matching triple confirmado — PARES Catastro + Depo fondo + Geneanet. Brecha 2 (1760–1815) ~95% cerrada cronológicamente.",
      "Bernarda de Luces Bazarra identificada como madre de Pedro Bazarra Caamaño (1712), vinculando la línea con la línea hidalga 'de Luces Caamaño y Sotomayor'.",
      "Confirmados padres de h019 García 'El Alto' vía Depo sig. 1.195/15.",
      "6 fuentes primarias citables en este punto: García Carraffa · PARES 6092354 · Depo FE10 · Geneanet larapat · AHDS fol.113 · CEMLA.",
    ],
    source:
      "PARES 6092354 · Geneanet larapat · Depo FE10 (Arquivo do Reino de Galicia)",
  },
  {
    version: 13,
    date: "2026-04-05",
    title: "El Banco confirmado + Rama RD + FamilySearch masivo",
    type: "descubrimiento",
    persons: 263,
    families: 76,
    highlights: [
      "El Banco, Magdalena confirmado como residencia familiar por registros de bautismo: Emilio (1891), Justina Lucía (1893), Camilo Antonio (1898), Néstor Daniel (1901). FamilySearch Film #004001320.",
      "Néstor Daniel Caamaño Castro (p023): partida de bautismo #1055, 2 de enero de 1901 — primer documento primario de la línea directa.",
      "Línea dominicana añadida: Diego José Caamaño y Posé → Ramón → Álvaro y Ramiro → RD. Fuente: marielacaamano.blogspot.com.",
      "Cluster de Granada (FamilySearch): Juan Becerra Camaño (~1745, nacido en Noya, Coruña). Su expediente pre-matrimonial nombraría a sus padres — alta prioridad.",
      "Mariana Camano (†1730, Granada, nacida en Galicia) — Caamaño gallego en Granada anterior al cluster Juan Becerra.",
    ],
    source: "FamilySearch Film #004001320 · FamilySearch Granada cluster",
  },
  {
    version: 9,
    date: "2026-04-04",
    title: "Cluster Ribeira/Palmeira + CEMLA 100 pasajeros",
    type: "fuente",
    persons: 217,
    families: 60,
    highlights: [
      "Pablo Caamaño Villa (fs003, 1802, Palmeira/Muros) — marinero viudo, el Caamaño más antiguo documentado en la zona portuaria.",
      "José Caamaño González (fs005, 1833, Lomba, Palmeira) — probable hijo de Pablo, familia completamente documentada.",
      "CEMLA: 100 pasajeros Caamaño a Buenos Aires 1884–1907. Tomás Caamaño (1905, Villagarcía) llega con hijos Amalia y Manuel — mismo nombre que el patriarca p001.",
      "Combinación de apellidos 'Caamaño Soto' confirmada en Uruguay: José Caamaño Soto (uy001) — refuerza la tradición oral de la madre Soto.",
      "BRECHA 2 reanalizada: Pablo (1802) y José Tomás (p001, ~1815) son contemporáneos — la brecha es documental, no temporal.",
    ],
    source: "FamilySearch · CEMLA Buenos Aires · Geneanet gn001–gn006",
  },
  {
    version: 7,
    date: "2026-04-03",
    title: "Línea medieval documentada + García Carraffa Tomo XX",
    type: "fuente",
    persons: 217,
    families: 60,
    highlights: [
      "20 generaciones documentadas desde Rodrigo García de Caamaño (h001, s. XII, conquista de Baeza) hasta Luis Miguel (p151, 1983).",
      "García de Caamaño 'El Hermoso' (h017, ~1400s): fundó Villagarcía de Arousa (1441), construyó el Pazo de Rubianes.",
      "José Antonio de Mendoza Caamaño (h021, 1667–1746): 3.er Marqués de Villagarcía, Virrey del Perú (1736–1746).",
      "Jacinto Caamaño Moraleja (gc010, 1759): explorador naval, Camano Island (WA) y Caamaño Sound (BC) llevan su nombre.",
      "José María Plácido Caamaño (gc011, 1838): Presidente de Ecuador (1884–1888).",
      "Sistema 'Yo soy': URLs compartibles con ?yo=slug para identificación personalizada en WhatsApp.",
    ],
    source:
      "García Carraffa Diccionario Heráldico y Genealógico, Tomo XX · Genealogías de Colombia",
  },
  {
    version: 1,
    date: "2026-03-28",
    title: "Árbol inicial — rama Colombia directa",
    type: "datos",
    persons: 50,
    families: 15,
    highlights: [
      "Árbol fundacional: José Tomás Caamaño (p001, ~1815, Sta. María de Caamaño, Porto do Son) → Colombia.",
      "Tradición oral documentada: tres hermanos (José María → RD, Salvador → Ecuador, Desconocido → Argentina).",
      "Línea directa confirmada por registros civiles hasta Luis Miguel Caamaño (p151, 1983).",
      "Esposa Soto: apellido confirmado indirectamente por la combinación Caamaño+Soto en otros registros.",
    ],
    source: "Tradición oral familiar · Registros civiles Colombia",
  },
];

const TYPE_META: Record<
  ChangeType,
  { label: string; bgClass: string; textClass: string; borderClass: string }
> = {
  descubrimiento: {
    label: "Descubrimiento",
    bgClass: "bg-teal-50",
    textClass: "text-teal-700",
    borderClass: "border-teal-200",
  },
  datos: {
    label: "Nuevos datos",
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    borderClass: "border-blue-200",
  },
  fuente: {
    label: "Nueva fuente",
    bgClass: "bg-purple-50",
    textClass: "text-purple-700",
    borderClass: "border-purple-200",
  },
  corrección: {
    label: "Corrección",
    bgClass: "bg-amber-50",
    textClass: "text-amber-700",
    borderClass: "border-amber-200",
  },
  ui: {
    label: "Mejora UI",
    bgClass: "bg-slate-50",
    textClass: "text-slate-600",
    borderClass: "border-slate-200",
  },
};

export default function NovedadesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-300 bg-gradient-to-b from-slate-50 to-white">
        <div className="h-0.5 w-full bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300" />
        <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
          <h1 className="font-serif text-2xl font-semibold text-slate-950 md:text-3xl">
            Novedades
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 italic md:text-base">
            Historial de descubrimientos e incorporaciones al árbol genealógico
            — versión a versión.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
        {/* Timeline list */}
        <ol className="relative space-y-8 border-l-2 border-slate-200 pl-6">
          {CHANGELOG.map((entry, i) => {
            const typeMeta = TYPE_META[entry.type];
            const isLatest = i === 0;
            return (
              <li key={entry.version} className="relative">
                {/* Timeline dot */}
                <span
                  className={`absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white ${isLatest ? "bg-teal-500" : "bg-slate-300"}`}
                  aria-hidden="true"
                />

                <article>
                  {/* Version + date + type badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      v{entry.version}
                    </span>
                    <time
                      dateTime={entry.date}
                      className="text-xs text-slate-500"
                    >
                      {new Date(entry.date).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${typeMeta.bgClass} ${typeMeta.textClass} ${typeMeta.borderClass}`}
                    >
                      {typeMeta.label}
                    </span>
                    {isLatest && (
                      <span className="rounded-full bg-teal-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        Actual
                      </span>
                    )}
                  </div>

                  {/* Title + person count */}
                  <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-serif text-base font-semibold text-slate-950 md:text-lg">
                      {entry.title}
                    </h2>
                    {entry.persons && (
                      <span className="shrink-0 text-xs tabular-nums text-slate-500">
                        {entry.persons} personas · {entry.families} familias
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  <ul className="mt-2 space-y-1.5">
                    {entry.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm leading-relaxed text-slate-700"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Source citation */}
                  {entry.source && (
                    <p className="mt-2 text-[11px] text-slate-400 italic">
                      Fuentes: {entry.source}
                    </p>
                  )}
                </article>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-center text-xs text-slate-400 italic">
          El árbol crece con cada carta enviada, cada microfilm revisado y cada
          respuesta de archivo.
        </p>
      </div>
    </div>
  );
}
