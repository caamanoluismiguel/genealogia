"use client";

import { useState } from "react";
import { loadFamilyData } from "@/lib/data/loader";
import type { Gender } from "@/lib/genealogy/types";

const data = loadFamilyData();

// ARIA: Warm input style — amber border at rest, teal on focus (action color).
// ring-teal-500/20 creates a soft glow that guides the eye without harsh contrast.
const inputClass =
  "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-xs transition-colors duration-150 placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:outline-none";

const selectClass =
  "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-xs transition-colors duration-150 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:outline-none";

// ARIA: Section header with decorative left bar — creates visual grouping that
// reads as "chapters" in the form. Breaks the flat list into a narrative structure.
function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 flex items-center gap-2.5">
        {/* ARIA: 3px amber bar echoes the left border accent on person nodes */}
        <div
          className="h-5 w-0.5 rounded-full bg-teal-500"
          aria-hidden="true"
        />
        <span className="font-serif text-base font-semibold text-slate-800">
          {title}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

function FormField({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}{" "}
        {required && (
          <span className="text-rose-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export function PersonForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [deathPlace, setDeathPlace] = useState("");
  const [notes, setNotes] = useState("");
  const [parentFamilyId, setParentFamilyId] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const newPerson = {
      id: `p${Date.now()}`,
      firstName,
      lastName,
      gender,
      birthDate: birthDate || undefined,
      birthPlace: birthPlace || undefined,
      deathDate: deathDate || undefined,
      deathPlace: deathPlace || undefined,
      notes: notes || undefined,
      events: [],
      migrations: [],
      parentFamilyId: parentFamilyId || undefined,
      partnerId: partnerId || undefined,
    };
    console.log("Nuevo familiar:", newPerson);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      // NOVA: Success state — warm card with a centered confirmation message.
      // The amber-400 checkmark circle echoes the form's accent color.
      <div className="rounded-2xl border border-slate-300 bg-slate-50 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 11l5 5 9-9"
              stroke="#0d9488"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-serif text-xl font-semibold text-slate-950">
          Familiar registrado
        </p>
        <p className="mt-2 text-sm text-slate-600">
          {firstName} {lastName} se guardó correctamente. (La persistencia
          completa se implementará en la Fase 2.)
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:from-teal-700 hover:to-teal-600 hover:shadow-md active:scale-[0.98]"
        >
          Agregar otro
        </button>
      </div>
    );
  }

  return (
    // ARIA: Card wrapper with warm border and shadow lifts the form off the page bg.
    // The form is visually contained — a "document" being filled out.
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm"
    >
      <div className="space-y-8">
        {/* Section 1 — Información Personal */}
        <FormSection title="Información Personal">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nombre" htmlFor="firstName" required>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                placeholder="Ej: José Tomás"
              />
            </FormField>
            <FormField label="Apellido" htmlFor="lastName" required>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                placeholder="Ej: Caamaño Reales"
              />
            </FormField>
          </div>

          <FormField label="Género" htmlFor="gender">
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className={selectClass}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </FormField>
        </FormSection>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Section 2 — Fechas y Lugares */}
        <FormSection title="Fechas y Lugares">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Fecha de nacimiento" htmlFor="birthDate">
              <input
                id="birthDate"
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className={inputClass}
                placeholder="Ej: 1952-03-15"
              />
            </FormField>
            <FormField label="Lugar de nacimiento" htmlFor="birthPlace">
              <input
                id="birthPlace"
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className={inputClass}
                placeholder="Ej: Barranquilla, Colombia"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Fecha de fallecimiento" htmlFor="deathDate">
              <input
                id="deathDate"
                type="text"
                value={deathDate}
                onChange={(e) => setDeathDate(e.target.value)}
                className={inputClass}
                placeholder="Opcional"
              />
            </FormField>
            <FormField label="Lugar de fallecimiento" htmlFor="deathPlace">
              <input
                id="deathPlace"
                type="text"
                value={deathPlace}
                onChange={(e) => setDeathPlace(e.target.value)}
                className={inputClass}
                placeholder="Opcional"
              />
            </FormField>
          </div>

          <FormField label="Notas" htmlFor="notes">
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={`${inputClass} h-auto min-h-[80px] resize-y`}
              placeholder="Información adicional sobre esta persona..."
            />
          </FormField>
        </FormSection>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Section 3 — Relaciones Familiares */}
        <FormSection title="Relaciones Familiares">
          <FormField label="Hijo/a de..." htmlFor="parentFamilyId">
            <select
              id="parentFamilyId"
              value={parentFamilyId}
              onChange={(e) => setParentFamilyId(e.target.value)}
              className={selectClass}
            >
              <option value="">— Seleccionar familia —</option>
              {data.families.map((f) => {
                const parentNames = f.parents
                  .map((pid) => {
                    const p = data.persons.find((pr) => pr.id === pid);
                    return p ? `${p.firstName} ${p.lastName}` : pid;
                  })
                  .join(" + ");
                return (
                  <option key={f.id} value={f.id}>
                    {parentNames || f.id}
                  </option>
                );
              })}
            </select>
          </FormField>

          <FormField label="Pareja de..." htmlFor="partnerId">
            <select
              id="partnerId"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              className={selectClass}
            >
              <option value="">— Seleccionar persona —</option>
              {data.persons.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName}
                </option>
              ))}
            </select>
          </FormField>
        </FormSection>

        {/* Submit */}
        <div className="pt-2">
          {/* KAI: Full-width teal gradient submit — matches the sidebar CTA button.
              active:scale-[0.98] gives tactile press confirmation. */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:from-teal-700 hover:to-teal-600 hover:shadow-md active:scale-[0.98]"
          >
            Guardar familiar
          </button>
        </div>
      </div>
    </form>
  );
}
