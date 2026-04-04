/**
 * Geographic migration map page.
 * Shows family migration paths on an interactive world map.
 */
import { MigrationMap } from "@/components/map/migration-map";

export default function MapPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ARIA: Hero section — amber accent bar at top anchors the warm palette.
          Serif heading + italic subtitle signal that this is a story, not a dashboard.
          The hero sits above the map so the map's full height is uninterrupted. */}
      <div className="border-b border-slate-300 bg-gradient-to-b from-slate-50 to-white">
        {/* NOVA: 3px amber top bar — same accent bar used on person cards and
            the sidebar header. Creates visual continuity across all surfaces. */}
        <div className="h-0.5 w-full bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300" />
        <div className="px-6 py-5">
          <h1 className="font-serif text-2xl font-semibold text-slate-950">
            Rutas de Migración
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-700 italic">
            El viaje de la familia Caamaño desde Galicia hasta las Américas —
            cada línea es una historia de esperanza y arraigo.
          </p>
        </div>
      </div>

      {/* Map fills the remaining viewport height */}
      <div className="flex-1">
        <MigrationMap />
      </div>
    </div>
  );
}
