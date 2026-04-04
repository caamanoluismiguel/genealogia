"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MIGRATION_ROUTES,
  PRIMARY_ORIGIN,
  detectCountry,
  type RoutePoint,
} from "@/data/migration-routes";
import familyData from "@/data/caamano-family.json";
import type { Person } from "@/lib/genealogy/types";

// Fix default marker icons (broken in webpack/Next.js)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

/** Create a colored circle marker icon */
function coloredIcon(color: string, size = 16) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 2)],
  });
}

/** Origin star marker */
function originIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #0d9488;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    "><span style="color:white;font-size:12px;font-weight:bold;">★</span></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

/** Group persons by their migration destination country */
function getTravelersByCountry(): Map<string, Person[]> {
  const groups = new Map<string, Person[]>();
  for (const p of familyData.persons as Person[]) {
    if (!p.migrations || p.migrations.length === 0) continue;
    for (const m of p.migrations) {
      const dest =
        typeof m.to === "string" ? m.to : (m.to as { label: string }).label;
      const country = detectCountry(dest);
      if (country) {
        if (!groups.has(country)) groups.set(country, []);
        groups.get(country)!.push(p);
      }
    }
  }
  return groups;
}

/** Collect unique origin and destination points from routes */
function getUniquePoints(routes: typeof MIGRATION_ROUTES): {
  origins: RoutePoint[];
  destinations: Map<string, RoutePoint & { color: string; routes: string[] }>;
} {
  const originMap = new Map<string, RoutePoint>();
  const destMap = new Map<
    string,
    RoutePoint & { color: string; routes: string[] }
  >();

  for (const route of routes) {
    const oKey = `${route.from.lat},${route.from.lng}`;
    if (!originMap.has(oKey)) originMap.set(oKey, route.from);

    const dKey = `${route.to.lat},${route.to.lng}`;
    if (!destMap.has(dKey)) {
      destMap.set(dKey, {
        ...route.to,
        color: route.color,
        routes: [route.label],
      });
    } else {
      destMap.get(dKey)!.routes.push(route.label);
    }
  }

  return { origins: [...originMap.values()], destinations: destMap };
}

/** Map a destination label to a country key for traveler lookup */
function destToCountry(label: string): string | null {
  return detectCountry(label);
}

export default function MapContent() {
  const { origins, destinations } = getUniquePoints(MIGRATION_ROUTES);
  const travelers = getTravelersByCountry();

  return (
    <MapContainer
      center={[15, -35]}
      zoom={3}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Primary origin — Castro Caamaño, Porto do Son */}
      <Marker
        position={[PRIMARY_ORIGIN.lat, PRIMARY_ORIGIN.lng]}
        icon={originIcon()}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-bold text-teal-800">
              Origen: {PRIMARY_ORIGIN.label}
            </p>
            <p className="text-slate-600">
              Parroquia ancestral de los Caamaño.
              <br />
              Castro Caamaño (fundado 1177).
            </p>
          </div>
        </Popup>
      </Marker>

      {/* Secondary origin ports */}
      {origins
        .filter(
          (o) => o.lat !== PRIMARY_ORIGIN.lat || o.lng !== PRIMARY_ORIGIN.lng,
        )
        .map((origin) => (
          <Marker
            key={`o-${origin.lat}-${origin.lng}`}
            position={[origin.lat, origin.lng]}
            icon={coloredIcon("#0d9488", 12)}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-slate-800">
                  Puerto: {origin.label}
                </p>
                <p className="text-slate-500">Puerto de embarque</p>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Migration route lines */}
      {MIGRATION_ROUTES.map((route) => (
        <Polyline
          key={route.id}
          positions={[
            [route.from.lat, route.from.lng],
            [route.to.lat, route.to.lng],
          ]}
          pathOptions={{
            color: route.color,
            weight: route.passengers
              ? Math.min(route.passengers / 8, 5) + 1
              : 2,
            dashArray: route.year && route.year < 1800 ? "4 6" : "8 6",
            opacity: 0.7,
          }}
        />
      ))}

      {/* Destination markers with travelers */}
      {[...destinations.entries()].map(([key, dest]) => {
        const country = destToCountry(dest.label);
        const people = country ? (travelers.get(country) ?? []) : [];

        return (
          <Marker
            key={`d-${key}`}
            position={[dest.lat, dest.lng]}
            icon={coloredIcon(dest.color, 18)}
          >
            <Popup maxWidth={280} minWidth={200}>
              <div className="text-sm">
                <p className="font-bold text-slate-800">{dest.label}</p>

                {/* Actual travelers */}
                {people.length > 0 && (
                  <div className="mt-2 border-t border-slate-100 pt-2">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {people.length}{" "}
                      {people.length === 1 ? "viajero" : "viajeros"}
                    </p>
                    <ul className="space-y-1">
                      {people.slice(0, 12).map((p) => (
                        <li key={p.id}>
                          <a
                            href={`/genealogia/person/${p.id}`}
                            className="flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 hover:underline"
                          >
                            <span
                              className="inline-block h-2 w-2 shrink-0 rounded-full"
                              style={{
                                background:
                                  p.gender === "male"
                                    ? "#60a5fa"
                                    : p.gender === "female"
                                      ? "#f472b6"
                                      : "#94a3b8",
                              }}
                            />
                            <span className="font-medium">
                              {p.firstName} {p.lastName}
                            </span>
                            {p.birthDate && (
                              <span className="text-slate-400">
                                ({p.birthDate})
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                      {people.length > 12 && (
                        <li className="text-[10px] text-slate-400">
                          +{people.length - 12} más
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Route descriptions */}
                <ul className="mt-2 space-y-0.5 border-t border-slate-100 pt-2 text-slate-500">
                  {dest.routes.map((r, i) => (
                    <li key={i} className="text-[10px]">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Map legend */}
      <div className="leaflet-bottom leaflet-left">
        <div className="leaflet-control m-3 rounded-lg border border-slate-200 bg-white/95 p-3 text-xs shadow-md backdrop-blur-sm">
          <p className="mb-2 font-semibold text-slate-700">
            Rutas de migración
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 bg-emerald-500" />
              <span className="text-slate-600">Colombia</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 bg-amber-500" />
              <span className="text-slate-600">Rep. Dominicana</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 bg-sky-500" />
              <span className="text-slate-600">Ecuador</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 bg-violet-500" />
              <span className="text-slate-600">Argentina</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 bg-red-500" />
              <span className="text-slate-600">EEUU (Ellis Island)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-4 bg-pink-500" />
              <span className="text-slate-600">Uruguay</span>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-slate-400">
            ── continua &nbsp; - - colonial
          </p>
        </div>
      </div>
    </MapContainer>
  );
}
