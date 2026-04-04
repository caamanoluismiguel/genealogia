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
    lat: 7.1195,
    lng: -73.1198,
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
    color: "#10B981", // emerald
    label: "José Tomás Caamaño → Colombia",
    year: 1845,
    description: "Patriarca. Emigró ~1845 con esposa Soto.",
  },
  // Brothers
  {
    id: "r02",
    from: ORIGINS.caamano,
    to: DESTINATIONS.dominicana,
    color: "#F59E0B", // amber
    label: "José María Caamaño → Rep. Dominicana",
    year: 1845,
    description: "Hermano del patriarca.",
  },
  {
    id: "r03",
    from: ORIGINS.caamano,
    to: DESTINATIONS.ecuador,
    color: "#0EA5E9", // sky
    label: "Salvador Caamaño → Ecuador",
    year: 1845,
    description: "Hermano del patriarca.",
  },
  {
    id: "r04",
    from: ORIGINS.caamano,
    to: DESTINATIONS.buenosaires,
    color: "#8B5CF6", // purple
    label: "Hermano Caamaño → Argentina",
    year: 1845,
    description: "Hermano del patriarca. Nombre desconocido.",
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
      "Línea Caamaño documentada más antigua en Colombia. Muros → Santa Fe de Antioquia.",
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
      "Juana María Caamaño Y Vega. 5 hijos nacidos en Bogotá 1689-1705.",
  },

  // CEMLA: Villagarcía → Buenos Aires (38% of passengers)
  {
    id: "r07",
    from: ORIGINS.villagarcia,
    to: DESTINATIONS.buenosaires,
    color: "#8B5CF6",
    label: "Villagarcía → Buenos Aires (33 pasajeros)",
    decade: "1900s",
    passengers: 33,
    description:
      "Incluye Tomás Caamaño (1905) con hijos Amalia y Manuel. Puerto principal de emigración.",
  },
  // CEMLA: Coruña → Buenos Aires
  {
    id: "r08",
    from: ORIGINS.coruna,
    to: DESTINATIONS.buenosaires,
    color: "#8B5CF6",
    label: "A Coruña → Buenos Aires (35 pasajeros)",
    decade: "1900s",
    passengers: 35,
    description: "Puerto más usado. Capital provincial.",
  },
  // CEMLA: Vigo → Buenos Aires
  {
    id: "r09",
    from: ORIGINS.vigo,
    to: DESTINATIONS.buenosaires,
    color: "#8B5CF6",
    label: "Vigo → Buenos Aires (20 pasajeros)",
    decade: "1890s",
    passengers: 20,
  },

  // Ellis Island: Muros → New York
  {
    id: "r10",
    from: ORIGINS.muros,
    to: DESTINATIONS.newyork,
    color: "#EF4444", // red
    label: "Muros → Nueva York (Ellis Island)",
    decade: "1890s",
    passengers: 10,
    description: "Emigrantes gallegos a EEUU. Juan Caamaño Lago y otros.",
  },

  // Uruguay: José Caamano Soto
  {
    id: "r11",
    from: ORIGINS.caamano,
    to: DESTINATIONS.montevideo,
    color: "#EC4899", // pink
    label: "Caamaño Soto → Montevideo",
    year: 1889,
    description:
      "José Caamano Soto (1889). Combinación Caamaño+Soto confirma familia del patriarca.",
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
