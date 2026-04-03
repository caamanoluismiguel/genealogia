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
function coloredIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -12],
  });
}

/** Migration destinations with coordinates and metadata */
const ORIGIN: [number, number] = [42.8806, -8.5463]; // Caamaño, A Coruña

const DESTINATIONS = [
  {
    name: "José Tomás Caamaño",
    branch: "Colombia (rama principal)",
    coords: [7.1195, -73.1198] as [number, number],
    color: "#3b82f6", // blue
    lineColor: "#3b82f6",
  },
  {
    name: "José María Caamaño",
    branch: "República Dominicana",
    coords: [18.7357, -69.9891] as [number, number],
    color: "#f59e0b", // amber
    lineColor: "#f59e0b",
  },
  {
    name: "Salvador Caamaño",
    branch: "Ecuador",
    coords: [-1.8312, -78.1834] as [number, number],
    color: "#22c55e", // green
    lineColor: "#22c55e",
  },
  {
    name: "Caamaño",
    branch: "Argentina",
    coords: [-34.6037, -58.3816] as [number, number],
    color: "#a855f7", // purple
    lineColor: "#a855f7",
  },
] as const;

export default function MapContent() {
  return (
    <MapContainer
      center={[20, -40]}
      zoom={3}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Origin marker */}
      <Marker position={ORIGIN} icon={coloredIcon("#ef4444")}>
        <Popup>
          <strong>Origen:</strong> Caamaño, A Coruña, España
        </Popup>
      </Marker>

      {/* Destination markers and migration lines */}
      {DESTINATIONS.map((dest) => (
        <span key={dest.branch}>
          <Polyline
            positions={[ORIGIN, dest.coords]}
            pathOptions={{
              color: dest.lineColor,
              weight: 2,
              dashArray: "8 6",
              opacity: 0.7,
            }}
          />
          <Marker position={dest.coords} icon={coloredIcon(dest.color)}>
            <Popup>
              <strong>{dest.name}</strong>
              <br />
              {dest.branch}
            </Popup>
          </Marker>
        </span>
      ))}
    </MapContainer>
  );
}
