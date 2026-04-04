/**
 * Contribute page — unified "suggest a person or correction" flow.
 * Everything goes through email approval. No direct writes.
 */
import { ContributeForm } from "@/components/person/contribute-form";

export const metadata = {
  title: "Contribuir — Árbol Caamaño",
  description:
    "Sugiere agregar un familiar o corregir información en el árbol genealógico Caamaño.",
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-slate-950">
          Contribuir al Árbol
        </h1>
        <p className="mt-2 text-base leading-relaxed text-slate-600">
          ¿Falta alguien? ¿Hay un dato incorrecto? Tu sugerencia será revisada
          por Luis Miguel antes de publicarse.
        </p>
        <div className="mt-4 h-px bg-gradient-to-r from-teal-300 via-slate-200 to-transparent" />
      </div>

      <ContributeForm />
    </div>
  );
}
