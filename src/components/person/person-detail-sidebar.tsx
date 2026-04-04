/**
 * Slide-in sidebar showing full person details.
 * Displays dates, places, notes, and a kinship comparison button.
 * Includes inline editing: update details, add spouse, add child.
 */
"use client";

import { useState, useEffect } from "react";
import type { Person } from "@/lib/genealogy/types";
import { getResearchLinks } from "@/lib/genealogy/research-links";

interface PersonDetailSidebarProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
  onCompare: (id: string) => void;
  relatedPersons?: { label: string; person: Person }[];
  /** Name of the "Yo soy" reference person for dynamic button text */
  referencePersonName?: string | null;
  /** Computed kinship label between reference and this person */
  relationshipLabel?: string | null;
  onUpdatePerson?: (id: string, updates: Partial<Person>) => void;
  onAddSpouse?: (
    personId: string,
    spouse: { firstName: string; lastName: string; gender: Person["gender"] },
  ) => void;
  onAddChild?: (
    personId: string,
    child: { firstName: string; lastName: string; gender: Person["gender"] },
  ) => void;
}

function formatDate(date?: string): string | null {
  if (!date) return null;
  return date;
}

// Shared input styling — matches the add page
const inputClass =
  "flex h-9 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-950 shadow-xs transition-colors duration-150 placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:outline-none";

const selectClass =
  "flex h-9 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-950 shadow-xs transition-colors duration-150 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:outline-none";

// ZERO: Inline SVG icons — zero bundle cost, crisp at all sizes.
function IconCalendar() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-teal-600"
    >
      <rect
        x="1"
        y="2.5"
        width="11"
        height="9.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M1 5.5h11M4 1v3M9 1v3"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-teal-500"
    >
      <path
        d="M6 1a4 4 0 0 1 4 4c0 3-4 7-4 7S2 8 2 5a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="6" cy="5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-teal-600"
    >
      <circle cx="6.5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M1.5 11.5c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconNote() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-teal-600"
    >
      <rect
        x="1.5"
        y="1.5"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M4 4.5h5M4 6.5h5M4 8.5h3"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconEvent() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-teal-600"
    >
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M6.5 3.5v3l2 1.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2l10 10M12 2L2 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconRelationship() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="3" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5 4h4M3 6v5M11 6v5M3 11h8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M10 2l2 2-7 7H3V9l7-7Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M7 3v8M3 7h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-teal-600"
    >
      <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M8.5 8.5L12 12"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconExternalLinkSmall() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M9 6.5v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1h3M7.5 1.5H11v3.5M5.5 6.5L11 1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ARIA: Gender-coded accent color for the sidebar header stripe.
function getGenderAccent(gender: Person["gender"]): string {
  switch (gender) {
    case "male":
      return "bg-blue-400";
    case "female":
      return "bg-pink-400";
    default:
      return "bg-slate-300";
  }
}

// Section header — consistent treatment for all info groups
function SectionHeader({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-1.5">
      {icon}
      {/* ARIA: Removed /70 opacity — section headers must be readable at small size */}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </h3>
    </div>
  );
}

// Inline mini-form field
function MiniField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-600">
        {label}
      </label>
      {children}
    </div>
  );
}

// --- Edit Info Form ---
function EditInfoForm({
  person,
  onSave,
  onCancel,
}: {
  person: Person;
  onSave: (updates: Partial<Person>) => void;
  onCancel: () => void;
}) {
  const [birthDate, setBirthDate] = useState(person.birthDate ?? "");
  const [birthPlace, setBirthPlace] = useState(person.birthPlace ?? "");
  const [deathDate, setDeathDate] = useState(person.deathDate ?? "");
  const [deathPlace, setDeathPlace] = useState(person.deathPlace ?? "");
  const [notes, setNotes] = useState(person.notes ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      birthDate: birthDate || undefined,
      birthPlace: birthPlace || undefined,
      deathDate: deathDate || undefined,
      deathPlace: deathPlace || undefined,
      notes: notes || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <MiniField label="Fecha nac.">
          <input
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={inputClass}
            placeholder="1952-03-15"
          />
        </MiniField>
        <MiniField label="Lugar nac.">
          <input
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            className={inputClass}
            placeholder="Lugo, Galicia"
          />
        </MiniField>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <MiniField label="Fecha fall.">
          <input
            type="text"
            value={deathDate}
            onChange={(e) => setDeathDate(e.target.value)}
            className={inputClass}
            placeholder="Opcional"
          />
        </MiniField>
        <MiniField label="Lugar fall.">
          <input
            type="text"
            value={deathPlace}
            onChange={(e) => setDeathPlace(e.target.value)}
            className={inputClass}
            placeholder="Opcional"
          />
        </MiniField>
      </div>
      <MiniField label="Notas">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className={`${inputClass} h-auto min-h-[56px] resize-y`}
          placeholder="Notas adicionales..."
        />
      </MiniField>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-150 hover:from-teal-700 hover:to-teal-600 active:scale-[0.98]"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// --- Add Person Mini-Form (reused for spouse + child) ---
function AddPersonForm({
  onAdd,
  onCancel,
  submitLabel,
}: {
  onAdd: (data: {
    firstName: string;
    lastName: string;
    gender: Person["gender"];
  }) => void;
  onCancel: () => void;
  submitLabel: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<Person["gender"]>("male");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    onAdd({ firstName: firstName.trim(), lastName: lastName.trim(), gender });
    setFirstName("");
    setLastName("");
    setGender("male");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <MiniField label="Nombre *">
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            placeholder="Nombre"
          />
        </MiniField>
        <MiniField label="Apellido *">
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
            placeholder="Apellido"
          />
        </MiniField>
      </div>
      <MiniField label="Genero">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as Person["gender"])}
          className={selectClass}
        >
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </MiniField>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all duration-150 hover:from-teal-700 hover:to-teal-600 active:scale-[0.98]"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export function PersonDetailSidebar({
  person,
  isOpen,
  onClose,
  onCompare,
  relatedPersons,
  referencePersonName,
  relationshipLabel,
  onUpdatePerson,
  onAddSpouse,
  onAddChild,
}: PersonDetailSidebarProps) {
  // Disclosure state for inline editing sections
  const [showEdit, setShowEdit] = useState(false);
  const [showAddSpouse, setShowAddSpouse] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);

  // Reset forms when person changes or sidebar closes
  const personId = person?.id ?? null;
  useEffect(() => {
    setShowEdit(false);
    setShowAddSpouse(false);
    setShowAddChild(false);
  }, [personId]);

  return (
    <div
      // NOVA: translate-x transition creates a natural slide-in from the right.
      // 300ms cubic-bezier matches the "page transition" timing in the design system.
      className={`absolute top-0 right-0 z-40 h-full w-[340px] border-l border-slate-300 bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen && person ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {person && (
        <div className="flex h-full flex-col overflow-y-auto">
          {/* ARIA: Parchment gradient header — from-slate-50 to-white creates
              a warm zone that frames the name without harsh contrast breaks.
              The 4px gender stripe at the top is a subtle identity signal. */}
          <div
            className={`h-1 w-full shrink-0 ${getGenderAccent(person.gender)}`}
          />

          <div className="bg-gradient-to-b from-slate-50 to-white px-5 pb-4 pt-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {/* ARIA: Large serif name is the hero element — the person is the content */}
                <h2 className="font-serif text-xl font-semibold leading-tight text-slate-950">
                  {person.firstName}
                </h2>
                {/* ARIA: Last name in hero header — amber-800 without opacity */}
                <p className="mt-0.5 text-sm text-slate-700">
                  {person.lastName}
                </p>
              </div>
              {/* KAI: Close button — 32px target, subtle hover state */}
              <button
                type="button"
                onClick={onClose}
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-teal-600 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Cerrar"
              >
                <IconClose />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-100" />

          {/* Body */}
          <div className="flex-1 space-y-5 p-5">
            {/* Information section */}
            <section>
              <SectionHeader icon={<IconCalendar />} label="Informacion" />
              <dl className="space-y-2.5 text-sm">
                {person.birthDate && (
                  <div className="flex gap-2">
                    <IconCalendar />
                    <div>
                      <dt className="text-xs text-slate-600">Nacimiento</dt>
                      <dd className="text-slate-950">
                        {formatDate(person.birthDate)}
                        {person.birthPlace && (
                          <span className="ml-1 text-slate-600">
                            <IconMapPin />
                            {/* inline location — appears after date */}
                          </span>
                        )}
                      </dd>
                      {person.birthPlace && (
                        <dd className="mt-0.5 flex items-center gap-1 text-xs text-slate-600">
                          <IconMapPin />
                          {person.birthPlace}
                        </dd>
                      )}
                    </div>
                  </div>
                )}
                {person.deathDate && (
                  <div className="flex gap-2">
                    <IconCalendar />
                    <div>
                      <dt className="text-xs text-slate-600">Fallecimiento</dt>
                      <dd className="text-slate-950">
                        {formatDate(person.deathDate)}
                      </dd>
                      {person.deathPlace && (
                        <dd className="mt-0.5 flex items-center gap-1 text-xs text-slate-600">
                          <IconMapPin />
                          {person.deathPlace}
                        </dd>
                      )}
                    </div>
                  </div>
                )}
                {person.maidenName && (
                  <div className="flex gap-2">
                    <IconUser />
                    <div>
                      <dt className="text-xs text-slate-600">
                        Apellido de soltera
                      </dt>
                      <dd className="text-slate-950">{person.maidenName}</dd>
                    </div>
                  </div>
                )}
                {!person.birthDate && !person.deathDate && (
                  <p className="italic text-slate-500">
                    Sin fechas registradas
                  </p>
                )}
              </dl>
            </section>

            {/* Events */}
            {person.events.length > 0 && (
              <section>
                <div className="mb-3 h-px bg-slate-100" />
                <SectionHeader icon={<IconEvent />} label="Eventos" />
                <ul className="space-y-2 text-sm">
                  {person.events.map((event, i) => (
                    <li key={i} className="flex gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      <div>
                        <span className="font-medium capitalize text-slate-950">
                          {event.type}
                        </span>
                        {event.date && (
                          <span className="ml-1 text-slate-600">
                            {event.date}
                          </span>
                        )}
                        {event.place && (
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-600">
                            <IconMapPin />
                            {event.place}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Notes */}
            {person.notes && (
              <section>
                <div className="mb-3 h-px bg-slate-100" />
                <SectionHeader icon={<IconNote />} label="Notas" />
                {/* ARIA: Italic text for notes gives a "handwritten note" feel —
                    appropriate for personal family records */}
                <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-sm leading-relaxed text-slate-800 italic">
                  {person.notes}
                </p>
              </section>
            )}

            {/* Related persons */}
            {relatedPersons && relatedPersons.length > 0 && (
              <section>
                <div className="mb-3 h-px bg-slate-100" />
                <SectionHeader icon={<IconUser />} label="Familiares" />
                <ul className="space-y-1.5 text-sm">
                  {relatedPersons.map(({ label, person: related }) => (
                    <li key={related.id} className="flex items-baseline gap-2">
                      <span className="shrink-0 text-xs text-slate-600">
                        {label}
                      </span>
                      <span className="font-serif font-medium text-slate-950">
                        {related.firstName} {related.lastName}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Relationship result */}
            {relationshipLabel && referencePersonName && (
              <div className="pt-1">
                <div className="mb-4 h-px bg-slate-100" />
                <div className="rounded-xl bg-teal-50 border border-teal-200 px-4 py-3 text-center">
                  <p className="text-xs text-teal-700">
                    Relaci&oacute;n con {referencePersonName}
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold text-teal-800">
                    Tu {relationshipLabel}
                  </p>
                </div>
              </div>
            )}

            {/* Compare button — only shown when reference person is set */}
            {referencePersonName && !relationshipLabel && (
              <div className="pt-1">
                <div className="mb-4 h-px bg-slate-100" />
                <button
                  type="button"
                  onClick={() => onCompare(person.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:from-teal-700 hover:to-teal-600 hover:shadow-md active:scale-[0.98]"
                >
                  <IconRelationship />
                  Ver relaci&oacute;n con {referencePersonName}
                </button>
              </div>
            )}

            {/* --- Research Links --- */}
            <section>
              <div className="mb-3 h-px bg-slate-100" />
              <SectionHeader
                icon={<IconSearch />}
                label="Investigar en archivos"
              />
              <div className="flex flex-col gap-2">
                <a
                  href={
                    getResearchLinks(
                      person.firstName,
                      person.lastName,
                      person.birthPlace,
                    ).familySearch.records
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100"
                >
                  <IconExternalLinkSmall />
                  Buscar en FamilySearch
                </a>
                <a
                  href={
                    getResearchLinks(person.firstName, person.lastName).pares
                      .search
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100"
                >
                  <IconExternalLinkSmall />
                  Buscar en PARES
                </a>
              </div>
            </section>

            {/* --- Editing Actions --- */}
            {(onUpdatePerson || onAddSpouse || onAddChild) && (
              <section>
                <div className="mb-3 h-px bg-slate-100" />
                <SectionHeader icon={<IconEdit />} label="Acciones" />
                <div className="space-y-3">
                  {/* Edit person details */}
                  {onUpdatePerson && (
                    <div className="rounded-lg bg-slate-50 p-3">
                      {showEdit ? (
                        <EditInfoForm
                          person={person}
                          onSave={(updates) => {
                            onUpdatePerson(person.id, updates);
                            setShowEdit(false);
                          }}
                          onCancel={() => setShowEdit(false)}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setShowEdit(true);
                            setShowAddSpouse(false);
                            setShowAddChild(false);
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100"
                        >
                          <IconEdit />
                          Editar informacion
                        </button>
                      )}
                    </div>
                  )}

                  {/* Add spouse */}
                  {onAddSpouse && (
                    <div className="rounded-lg bg-slate-50 p-3">
                      {showAddSpouse ? (
                        <AddPersonForm
                          submitLabel="Agregar pareja"
                          onAdd={(spouseData) => {
                            onAddSpouse(person.id, spouseData);
                            setShowAddSpouse(false);
                          }}
                          onCancel={() => setShowAddSpouse(false)}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddSpouse(true);
                            setShowEdit(false);
                            setShowAddChild(false);
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100"
                        >
                          <IconPlus />
                          Agregar pareja
                        </button>
                      )}
                    </div>
                  )}

                  {/* Add child */}
                  {onAddChild && (
                    <div className="rounded-lg bg-slate-50 p-3">
                      {showAddChild ? (
                        <AddPersonForm
                          submitLabel="Agregar hijo/a"
                          onAdd={(childData) => {
                            onAddChild(person.id, childData);
                            setShowAddChild(false);
                          }}
                          onCancel={() => setShowAddChild(false)}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddChild(true);
                            setShowEdit(false);
                            setShowAddSpouse(false);
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100"
                        >
                          <IconPlus />
                          Agregar hijo/a
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
