/**
 * Add new family member page.
 * Server Component shell for the PersonForm.
 */
import { PersonForm } from "@/components/person/person-form";

export default function AddPage() {
  return (
    // ARIA: Same parchment page background as the person detail page.
    // max-w-2xl + centered layout keeps the form document-like and focused.
    <div className="mx-auto max-w-2xl px-6 py-8">
      {/* ARIA: Page header with serif title and descriptive subtitle.
          The amber accent bar under the heading echoes the form section markers. */}
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-amber-950">
          Agregar Familiar
        </h1>
        <p className="mt-1 text-sm text-amber-700">
          Registra un nuevo miembro de la familia Caamaño en el árbol.
        </p>
        {/* NOVA: Thin decorative line under the heading — same amber gradient
            used on the map page hero, creating a consistent page header pattern. */}
        <div className="mt-4 h-px bg-gradient-to-r from-amber-300 via-amber-200 to-transparent" />
      </div>

      <PersonForm />
    </div>
  );
}
