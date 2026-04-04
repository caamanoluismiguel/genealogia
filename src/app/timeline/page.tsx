/**
 * Interactive family timeline page.
 * Slide-based navigation through 900 years of Caamaño history.
 */
import { FamilyTimeline } from "@/components/timeline/family-timeline";

export const metadata = {
  title: "Línea del Tiempo — Árbol Caamaño",
  description:
    "Recorre 900 años de historia de la familia Caamaño. Desde el castillo de Castro Caamaño (1177) hasta el presente.",
};

export default function TimelinePage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="border-b border-slate-300 bg-gradient-to-b from-slate-50 to-white">
        <div className="h-0.5 w-full bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300" />
        <div className="px-6 py-5">
          <h1 className="font-serif text-2xl font-semibold text-slate-950">
            Línea del Tiempo
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600 italic">
            900 años de historia familiar — navega con las flechas o desliza en
            tu teléfono.
          </p>
        </div>
      </div>

      {/* Timeline fills remaining height */}
      <div
        className="flex-1"
        style={{ minHeight: "calc(100vh - 56px - 100px)" }}
      >
        <FamilyTimeline />
      </div>
    </div>
  );
}
