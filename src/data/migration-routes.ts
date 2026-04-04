/**
 * Migration route data for the map view.
 * All coordinates verified against actual locations.
 */

/** Geographic coordinate with label */
export interface RoutePoint {
  lat: number;
  lng: number;
  label: string;
}

/** A migration route for the map */
export interface MigrationRoute {
  id: string;
  from: RoutePoint;
  to: RoutePoint;
  color: string;
  label: string;
  decade?: string;
  year?: number;
  passengers?: number;
  description?: string;
  source?: string;
  sourceNote?: string;
}

// ── ORIGIN POINTS (Galicia, Spain) ──────────────────────────

export const ORIGINS: Record<string, RoutePoint> = {
  caamano: {
    lat: 42.6556,
    lng: -9.025,
    label: "Sta María de Caamaño, Porto do Son",
  },
  villagarcia: {
    lat: 42.5955,
    lng: -8.7644,
    label: "Villagarcía de Arousa",
  },
  muros: {
    lat: 42.7751,
    lng: -9.0567,
    label: "Muros",
  },
  coruna: {
    lat: 43.3623,
    lng: -8.4115,
    label: "A Coruña",
  },
  vigo: {
    lat: 42.2406,
    lng: -8.7207,
    label: "Vigo",
  },
  carril: {
    lat: 42.6097,
    lng: -8.78,
    label: "Carril",
  },
};

// ── DESTINATION POINTS ──────────────────────────────────────

export const DESTINATIONS: Record<string, RoutePoint> = {
  colombia: {
    lat: 4.711,
    lng: -74.0721,
    label: "Colombia",
  },
  antioquia: {
    lat: 6.2442,
    lng: -75.5812,
    label: "Antioquia, Colombia",
  },
  bogota: {
    lat: 4.711,
    lng: -74.0721,
    label: "Bogotá, Colombia",
  },
  dominicana: {
    lat: 18.7357,
    lng: -69.9891,
    label: "República Dominicana",
  },
  ecuador: {
    lat: -1.8312,
    lng: -78.1834,
    label: "Ecuador",
  },
  buenosaires: {
    lat: -34.6037,
    lng: -58.3816,
    label: "Buenos Aires, Argentina",
  },
  newyork: {
    lat: 40.6892,
    lng: -74.0445,
    label: "Nueva York (Ellis Island)",
  },
  montevideo: {
    lat: -34.9011,
    lng: -56.1645,
    label: "Montevideo, Uruguay",
  },
};

// ── MIGRATION ROUTES ────────────────────────────────────────

export const MIGRATION_ROUTES: MigrationRoute[] = [
  // Family oral tradition: José Tomás → Colombia
  {
    id: "r01",
    from: ORIGINS.caamano,
    to: DESTINATIONS.colombia,
    color: "#10B981",
    label: "José Tomás Caamaño → Colombia",
    year: 1845,
    description:
      "Patriarca. Emigró ~1845 desde Sta María de Caamaño con esposa de apellido Soto. Fundó la rama colombiana.",
    source: "Tradición oral familiar",
    sourceNote:
      "Relato transmitido por generaciones. José Tomás nació ~1815 en la parroquia de Sta María de Caamaño, Porto do Son. Confirmado por email a AHDS (archivo diocesano) en abril 2026.",
  },
  {
    id: "r02",
    from: ORIGINS.caamano,
    to: DESTINATIONS.dominicana,
    color: "#F59E0B",
    label: "José María Caamaño → Rep. Dominicana",
    year: 1845,
    description: "Hermano del patriarca. Emigró a República Dominicana.",
    source: "Tradición oral familiar",
    sourceNote:
      "Según tradición familiar, uno de los hermanos de José Tomás emigró a RD. Nombre coincide con registros CEMLA (José María Caamaño, 15 años, barco Nile, 1897, puerto de Vigo).",
  },
  {
    id: "r03",
    from: ORIGINS.caamano,
    to: DESTINATIONS.ecuador,
    color: "#0EA5E9",
    label: "Salvador Caamaño → Ecuador",
    year: 1845,
    description: "Hermano del patriarca. Emigró a Ecuador.",
    source: "Tradición oral familiar",
    sourceNote:
      "Según tradición familiar. Un Salvador Caamaño (6 años) aparece en CEMLA 1906 viajando a Buenos Aires con Víctor Caamaño — posible coincidencia de nombre.",
  },
  {
    id: "r04",
    from: ORIGINS.caamano,
    to: DESTINATIONS.buenosaires,
    color: "#8B5CF6",
    label: "Hermano Caamaño → Argentina",
    year: 1845,
    description:
      "Hermano del patriarca. Nombre desconocido. Emigró a Argentina.",
    source: "Tradición oral familiar",
    sourceNote:
      "Según tradición familiar. 100 pasajeros Caamaño documentados en CEMLA (Buenos Aires 1884-1907) confirman fuerte emigración gallega a Argentina.",
  },

  // Colonial: Bernardo Martínez y Perrúa (1744)
  {
    id: "r05",
    from: ORIGINS.muros,
    to: DESTINATIONS.antioquia,
    color: "#10B981",
    label: "Bernardo Martínez y Perrúa → Antioquia (1744)",
    year: 1744,
    description:
      "Nacido en Villa de Muros, 1720. Llegó a Santa Fe de Antioquia en 1744. Murió en Bogotá, 1788. 8 hijos. Línea Caamaño documentada más antigua en Colombia.",
    source: "Genealogías de Colombia",
    sourceNote:
      "Fidel Botero Arango, «Genealogías de Colombia», fascículo Caamaño, versión 11, 2025. Base de datos de 583.000 individuos. www.genealogiasdecolombia.co",
  },

  // Colonial: Juana María Caamaño (Bogotá ~1680s)
  {
    id: "r06",
    from: ORIGINS.caamano,
    to: DESTINATIONS.bogota,
    color: "#10B981",
    label: "Caamaños en Bogotá (~1689)",
    year: 1689,
    description:
      "Juana María Caamaño Y Vega, casada con Francisco Prieto Pasarón. 5 hijos nacidos en Santa Fe de Bogotá entre 1689 y 1705.",
    source: "Genealogías de Colombia",
    sourceNote:
      "Fidel Botero Arango, «Genealogías de Colombia». Hijos documentados: Francisco Prieto Ortiz (1689), Juan Dionisio (1690), Alejandro (1693), María Josefa (1695), María Teresa (1705).",
  },

  // CEMLA: Villagarcía → Buenos Aires
  {
    id: "r07",
    from: ORIGINS.villagarcia,
    to: DESTINATIONS.buenosaires,
    color: "#8B5CF6",
    label: "Villagarcía → Buenos Aires (33 pasajeros)",
    decade: "1900s",
    passengers: 33,
    description:
      "33 pasajeros Caamaño embarcaron desde Villagarcía de Arousa. Incluye a Tomás Caamaño (42 años, casado, jornalero) con hijos Amalia (6) y Manuel (5), barco P. de Satrústegui, 25 enero 1905.",
    source: "CEMLA",
    sourceNote:
      "Centro de Estudios Migratorios Latinoamericanos (CEMLA). Listas de pasajeros del puerto de Buenos Aires, 1882-1960. 100 registros Caamaño extraídos. cemla.com/buscador",
  },
  {
    id: "r08",
    from: ORIGINS.coruna,
    to: DESTINATIONS.buenosaires,
    color: "#8B5CF6",
    label: "A Coruña → Buenos Aires (35 pasajeros)",
    decade: "1900s",
    passengers: 35,
    description:
      "35 pasajeros Caamaño embarcaron desde A Coruña, la capital provincial. Puerto más utilizado por los emigrantes gallegos.",
    source: "CEMLA",
    sourceNote:
      "CEMLA — 100 registros totales de apellido Caamaño en listas de pasajeros de Buenos Aires (1884-1907).",
  },
  {
    id: "r09",
    from: ORIGINS.vigo,
    to: DESTINATIONS.buenosaires,
    color: "#8B5CF6",
    label: "Vigo → Buenos Aires (20 pasajeros)",
    decade: "1890s",
    passengers: 20,
    description:
      "20 pasajeros Caamaño embarcaron desde Vigo, principal puerto del sur de Galicia.",
    source: "CEMLA",
    sourceNote:
      "CEMLA — Incluye a José María Caamaño (15 años, barco Nile, 1897).",
  },

  // Ellis Island: Muros → New York
  {
    id: "r10",
    from: ORIGINS.muros,
    to: DESTINATIONS.newyork,
    color: "#EF4444",
    label: "Muros → Nueva York (Ellis Island)",
    decade: "1890s",
    passengers: 47,
    description:
      "47 Caamaños llegaron a Nueva York vía Ellis Island entre 1892 y 1925. Incluye a Juan Caamaño Lago (Muros, 1890), José Antonio Caamaño (Muros, 1889), y otros.",
    source: "FamilySearch",
    sourceNote:
      "FamilySearch — New York Passenger Arrival Lists (Ellis Island), 1892-1925. 47 registros con apellido Caamaño/Caamano.",
  },

  // Uruguay: José Caamano Soto
  {
    id: "r11",
    from: ORIGINS.caamano,
    to: DESTINATIONS.montevideo,
    color: "#EC4899",
    label: "Caamaño Soto → Montevideo",
    year: 1889,
    description:
      "José Caamano Soto (nacido 1889). La combinación de apellidos Caamaño + Soto confirma la existencia de la familia del patriarca José Tomás (casado con una Soto).",
    source: "FamilySearch",
    sourceNote:
      "FamilySearch — Uruguay, Passenger Lists, 1888-1980. 28 registros Caamaño totales en listas de pasajeros a Uruguay.",
  },
];

/** Primary origin for the family */
export const PRIMARY_ORIGIN = ORIGINS.caamano;

/** Country color map for person cards */
export const COUNTRY_COLORS: Record<
  string,
  { bg: string; border: string; text: string; label: string }
> = {
  españa: {
    bg: "bg-slate-100",
    border: "border-l-slate-500",
    text: "text-slate-700",
    label: "España",
  },
  spain: {
    bg: "bg-slate-100",
    border: "border-l-slate-500",
    text: "text-slate-700",
    label: "España",
  },
  galicia: {
    bg: "bg-slate-100",
    border: "border-l-slate-500",
    text: "text-slate-700",
    label: "España",
  },
  colombia: {
    bg: "bg-emerald-50",
    border: "border-l-emerald-500",
    text: "text-emerald-700",
    label: "Colombia",
  },
  "república dominicana": {
    bg: "bg-amber-50",
    border: "border-l-amber-500",
    text: "text-amber-700",
    label: "Rep. Dominicana",
  },
  dominicana: {
    bg: "bg-amber-50",
    border: "border-l-amber-500",
    text: "text-amber-700",
    label: "Rep. Dominicana",
  },
  ecuador: {
    bg: "bg-sky-50",
    border: "border-l-sky-500",
    text: "text-sky-700",
    label: "Ecuador",
  },
  argentina: {
    bg: "bg-violet-50",
    border: "border-l-violet-500",
    text: "text-violet-700",
    label: "Argentina",
  },
  uruguay: {
    bg: "bg-pink-50",
    border: "border-l-pink-500",
    text: "text-pink-700",
    label: "Uruguay",
  },
  "estados unidos": {
    bg: "bg-red-50",
    border: "border-l-red-500",
    text: "text-red-700",
    label: "EEUU",
  },
};

/** Detect country from a birthPlace or migration destination string */
export function detectCountry(place?: string): string | null {
  if (!place) return null;
  const lower = place.toLowerCase();
  if (
    lower.includes("colombia") ||
    lower.includes("bogotá") ||
    lower.includes("antioquia") ||
    lower.includes("barranquilla") ||
    lower.includes("medellín")
  )
    return "colombia";
  if (lower.includes("dominicana") || lower.includes("santo domingo"))
    return "república dominicana";
  if (
    lower.includes("ecuador") ||
    lower.includes("guayaquil") ||
    lower.includes("quito")
  )
    return "ecuador";
  if (lower.includes("argentina") || lower.includes("buenos aires"))
    return "argentina";
  if (lower.includes("uruguay") || lower.includes("montevideo"))
    return "uruguay";
  if (
    lower.includes("estados unidos") ||
    lower.includes("new york") ||
    lower.includes("ellis island")
  )
    return "estados unidos";
  if (
    lower.includes("españa") ||
    lower.includes("spain") ||
    lower.includes("galicia") ||
    lower.includes("coruña") ||
    lower.includes("muros") ||
    lower.includes("noia") ||
    lower.includes("palmeira") ||
    lower.includes("ribeira") ||
    lower.includes("madrid")
  )
    return "españa";
  return null;
}
