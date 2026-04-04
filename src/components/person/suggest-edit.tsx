"use client";

import { useState } from "react";
import type { Person } from "@/lib/genealogy/types";

const CONTACT_EMAIL = "caamano.luismiguel@gmail.com";

interface SuggestEditProps {
  person: Person;
}

/**
 * Elder-friendly "suggest an edit" flow.
 * 3 taps: button → form → send via email.
 * Large text, big buttons, minimal fields.
 */
export function SuggestEditButton({ person }: SuggestEditProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-base font-medium text-slate-600 transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 active:scale-[0.98]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14.5 2.5l3 3L6 17H3v-3L14.5 2.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        ¿Algo está mal? Sugerir un cambio
      </button>

      {open && (
        <SuggestEditModal person={person} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

function SuggestEditModal({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) {
  const [name, setName] = useState(`${person.firstName} ${person.lastName}`);
  const [birthDate, setBirthDate] = useState(person.birthDate ?? "");
  const [birthPlace, setBirthPlace] = useState(person.birthPlace ?? "");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    const subject = encodeURIComponent(
      `Corrección: ${person.firstName} ${person.lastName}`,
    );
    const body = encodeURIComponent(
      `Hola Luis Miguel,\n\nQuiero sugerir un cambio en el árbol genealógico:\n\n` +
        `Persona: ${person.firstName} ${person.lastName} (${person.id})\n\n` +
        `Nombre correcto: ${name}\n` +
        `Fecha de nacimiento: ${birthDate || "(sin cambio)"}\n` +
        `Lugar de nacimiento: ${birthPlace || "(sin cambio)"}\n\n` +
        `Comentario: ${comment || "(ninguno)"}\n\n` +
        `— Enviado desde el Árbol Caamaño`,
    );

    window.open(
      `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`,
      "_self",
    );
    setSent(true);
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none";

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="suggest-title"
    >
      {/* Modal — slides up on mobile, centered on desktop */}
      <div className="w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {sent ? (
          /* Success state */
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-teal-600"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900">¡Gracias!</h2>
            <p className="mt-2 text-base text-slate-600">
              Tu sugerencia fue enviada. Luis Miguel la revisará pronto.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-teal-600 px-8 py-3 text-base font-semibold text-white hover:bg-teal-700 active:scale-[0.98]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          /* Edit form */
          <>
            <h2
              id="suggest-title"
              className="text-xl font-semibold text-slate-900"
            >
              Sugerir un cambio
            </h2>
            <p className="mt-1 text-base text-slate-500">
              Corrige lo que esté mal. Luis Miguel revisará tu sugerencia.
            </p>

            <div className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="suggest-name"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Nombre completo
                </label>
                <input
                  id="suggest-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Birth date */}
              <div>
                <label
                  htmlFor="suggest-birth"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="suggest-birth"
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="Ej: 1952 o 15 de marzo de 1952"
                  className={inputClass}
                />
              </div>

              {/* Birth place */}
              <div>
                <label
                  htmlFor="suggest-place"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Lugar de nacimiento
                </label>
                <input
                  id="suggest-place"
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  placeholder="Ej: Barranquilla, Colombia"
                  className={inputClass}
                />
              </div>

              {/* Free comment */}
              <div>
                <label
                  htmlFor="suggest-comment"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  ¿Qué más quieres corregir?
                </label>
                <textarea
                  id="suggest-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escribe aquí cualquier corrección: nombres, fechas, relaciones familiares..."
                  rows={3}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Send button — BIG, green, impossible to miss */}
            <button
              type="button"
              onClick={handleSend}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-lg font-semibold text-white shadow-md hover:bg-teal-700 active:scale-[0.98]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Enviar sugerencia por correo
            </button>

            <p className="mt-3 text-center text-sm text-slate-400">
              Se abrirá tu app de correo con el mensaje listo para enviar.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
