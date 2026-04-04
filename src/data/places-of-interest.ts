/**
 * Places of interest for the migration map.
 * Real historical locations with photos from Wikimedia Commons.
 * All photos are CC BY-SA licensed.
 */

export interface PlaceOfInterest {
  id: string;
  lat: number;
  lng: number;
  name: string;
  description: string;
  year?: number;
  photo: string; // Wikimedia Commons thumbnail URL
  photoCredit: string;
  type: "church" | "castle" | "city" | "port" | "landmark";
}

/** Wikimedia Commons thumbnail helper — converts filename to 400px thumb URL */
function wikiThumb(filename: string, width = 400): string {
  const encoded = encodeURIComponent(filename.replace(/ /g, "_"));
  return `https://commons.wikimedia.org/w/thumb.php?f=${encoded}&w=${width}`;
}

export const PLACES_OF_INTEREST: PlaceOfInterest[] = [
  {
    id: "poi-church",
    lat: 42.6556,
    lng: -9.025,
    name: "Iglesia de Santa María de Caamaño",
    description:
      "Iglesia románica del siglo XII en la parroquia ancestral. Aquí se bautizaron generaciones de Caamaños, incluyendo el patriarca José Tomás (~1815). Los registros parroquiales están en el Archivo Diocesano de Santiago.",
    year: 1100,
    photo: wikiThumb("Iglesia de Santa María de Caamaño (8187571099).jpg"),
    photoCredit: "Wikimedia Commons, CC BY-SA",
    type: "church",
  },
  {
    id: "poi-church2",
    lat: 42.6561,
    lng: -9.0242,
    name: "Vista lateral — Sta María de Caamaño",
    description:
      "Vista del campanario y la fachada lateral de la iglesia. Estructura románica con reformas barrocas del siglo XVIII. La inscripción del Castro Caamaño (1177) se encontraba en una fortaleza cercana.",
    year: 1100,
    photo: wikiThumb("2014 Igrexa de Caamaño. Porto do Son. Galiza-8.jpg"),
    photoCredit: "Lmbuga, CC BY-SA 4.0",
    type: "church",
  },
  {
    id: "poi-castro",
    lat: 42.658,
    lng: -9.028,
    name: "Castro Caamaño (fortaleza, 1177)",
    description:
      '"Fizo Juan de Caamaño, Año de Mill Ciento Setenta et Siete." La fortaleza ancestral donde se estableció la familia. Hoy en ruinas, pero la piedra con la inscripción se conservó hasta tiempos modernos.',
    year: 1177,
    photo: wikiThumb("Caamaño, Porto do Son.jpg"),
    photoCredit: "Wikimedia Commons, CC BY-SA",
    type: "castle",
  },
  {
    id: "poi-pazo",
    lat: 42.5981,
    lng: -8.7722,
    name: "Pazo de Rubianes (Villagarcía de Arousa)",
    description:
      'Construido por García de Caamaño "El Hermoso" en 1411. Torre del siglo XII → palacio del XV → reformado en el XVIII. Hoy es un pazo visitable con jardín de camelias y bodega de albariño. La inscripción original dice "Fizo Fernández de Caamaño anno de 1411".',
    year: 1411,
    photo: wikiThumb("Pazo de Rubianes, Vilagarcía de Arousa.jpg", 400),
    photoCredit: "Wikimedia Commons, CC BY-SA",
    type: "landmark",
  },
  {
    id: "poi-villagarcia",
    lat: 42.5955,
    lng: -8.7644,
    name: "Villagarcía de Arousa — fundada por un Caamaño",
    description:
      'García de Caamaño "El Hermoso" fundó "o meu lugar e porto de VILA-GARCÍA" el 12 de mayo de 1441. Hoy es una ciudad de 38.000 habitantes. El 38% de los emigrantes Caamaño a Buenos Aires embarcaron desde aquí.',
    year: 1441,
    photo: wikiThumb("Vista de Vilagarcía de Arousa, Galiza.jpg", 400),
    photoCredit: "Wikimedia Commons, CC BY-SA",
    type: "city",
  },
  {
    id: "poi-portodoson",
    lat: 42.6587,
    lng: -9.0093,
    name: "Porto do Son — municipio ancestral",
    description:
      "Puerto pesquero en la Ría de Muros y Noia. La parroquia de Santa María de Caamaño pertenece a este municipio. Aquí nació el patriarca José Tomás Caamaño (~1815).",
    photo: wikiThumb("Porto do Son. Galiza.jpg", 400),
    photoCredit: "Wikimedia Commons, CC BY-SA",
    type: "port",
  },
  {
    id: "poi-noia",
    lat: 42.7883,
    lng: -8.8863,
    name: "Noia — jurisdicción histórica",
    description:
      "Villa medieval y puerto de Compostela. La parroquia de Caamaño estaba bajo la jurisdicción de Noia. Los Caamaño fundaron el Monasterio de Toxosoutos aquí en 1129.",
    year: 1129,
    photo: wikiThumb("Noia. Galiza.jpg", 400),
    photoCredit: "Wikimedia Commons, CC BY-SA",
    type: "city",
  },
  {
    id: "poi-ellisisland",
    lat: 40.6992,
    lng: -74.0396,
    name: "Ellis Island — puerta de entrada a EEUU",
    description:
      "47 Caamaños llegaron a Nueva York vía Ellis Island entre 1892 y 1925. La mayoría procedían de Muros, Carnota y Noia. Fuente: FamilySearch, New York Passenger Arrival Lists.",
    photo: wikiThumb("Ellis Island arrivals.jpg", 400),
    photoCredit: "Public domain, Library of Congress",
    type: "landmark",
  },
];

/** Type-specific marker icons */
export const POI_ICONS: Record<
  PlaceOfInterest["type"],
  { emoji: string; color: string }
> = {
  church: { emoji: "⛪", color: "#92400e" },
  castle: { emoji: "🏰", color: "#78350f" },
  city: { emoji: "🏘️", color: "#0f766e" },
  port: { emoji: "⚓", color: "#1e40af" },
  landmark: { emoji: "📍", color: "#7c3aed" },
};
