"use client";

import { useState } from "react";

const CONTACT_EMAIL = "caamano.luismiguel@gmail.com";

type ContributionType = "add-person" | "fix-info" | "other";

const CONTRIBUTION_TYPES: {
  value: ContributionType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "add-person",
    label: "Agregar un familiar",
    description:
      "Falta alguien en el árbol — un hijo, hermano, primo, abuelo...",
    icon: "👤",
  },
  {
    value: "fix-info",
    label: "Corregir información",
    description: "Un nombre, fecha, lugar o parentesco está incorrecto.",
    icon: "✏️",
  },
  {
    value: "other",
    label: "Otra contribución",
    description: "Fotos, historias, documentos, o cualquier otra información.",
    icon: "💬",
  },
];

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none";

export function ContributeForm() {
  const [type, setType] = useState<ContributionType | null>(null);
  const [sent, setSent] = useState(false);

  // Add person fields
  const [personName, setPersonName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [relatedTo, setRelatedTo] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");

  // Fix info fields
  const [whoToFix, setWhoToFix] = useState("");
  const [whatToFix, setWhatToFix] = useState("");

  // Shared
  const [comment, setComment] = useState("");
  const [senderName, setSenderName] = useState("");

  function handleSend() {
    let subject = "";
    let body = "";

    if (type === "add-person") {
      subject = `Agregar familiar: ${personName || "(sin nombre)"}`;
      body =
        `Hola Luis Miguel,\n\n` +
        `Quiero sugerir agregar a alguien al árbol:\n\n` +
        `Nombre: ${personName || "(no proporcionado)"}\n` +
        `Parentesco: ${relationship || "(no proporcionado)"}\n` +
        `Familiar de: ${relatedTo || "(no proporcionado)"}\n` +
        `Fecha de nacimiento: ${birthDate || "(no proporcionado)"}\n` +
        `Lugar de nacimiento: ${birthPlace || "(no proporcionado)"}\n\n` +
        `Comentario: ${comment || "(ninguno)"}\n\n` +
        `Enviado por: ${senderName || "(anónimo)"}\n` +
        `— Desde el Árbol Caamaño`;
    } else if (type === "fix-info") {
      subject = `Corrección: ${whoToFix || "(persona no especificada)"}`;
      body =
        `Hola Luis Miguel,\n\n` +
        `Quiero corregir información en el árbol:\n\n` +
        `Persona: ${whoToFix || "(no especificada)"}\n` +
        `Qué corregir: ${whatToFix || "(no especificado)"}\n\n` +
        `Comentario: ${comment || "(ninguno)"}\n\n` +
        `Enviado por: ${senderName || "(anónimo)"}\n` +
        `— Desde el Árbol Caamaño`;
    } else {
      subject = "Contribución al árbol Caamaño";
      body =
        `Hola Luis Miguel,\n\n` +
        `Quiero contribuir al árbol:\n\n` +
        `${comment || "(sin detalle)"}\n\n` +
        `Enviado por: ${senderName || "(anónimo)"}\n` +
        `— Desde el Árbol Caamaño`;
    }

    window.open(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_self",
    );
    setSent(true);
  }

  // Success state
  if (sent) {
    return (
      <div className="py-12 text-center">
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
        <h2 className="text-xl font-semibold text-slate-900">
          ¡Gracias por tu contribución!
        </h2>
        <p className="mt-2 text-base text-slate-600">
          Luis Miguel revisará tu sugerencia y la agregará al árbol si es
          correcta.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setType(null);
          }}
          className="mt-6 rounded-xl bg-teal-600 px-8 py-3 text-base font-semibold text-white hover:bg-teal-700 active:scale-[0.98]"
        >
          Enviar otra sugerencia
        </button>
      </div>
    );
  }

  // Step 1: Choose type
  if (!type) {
    return (
      <div className="space-y-4">
        <p className="text-base font-medium text-slate-700">
          ¿Qué quieres hacer?
        </p>
        {CONTRIBUTION_TYPES.map((ct) => (
          <button
            key={ct.value}
            type="button"
            onClick={() => setType(ct.value)}
            className="flex w-full items-start gap-4 rounded-xl border-2 border-slate-200 bg-white p-5 text-left transition-all hover:border-teal-400 hover:bg-teal-50 active:scale-[0.99]"
          >
            <span className="mt-0.5 text-2xl">{ct.icon}</span>
            <div>
              <p className="text-base font-semibold text-slate-900">
                {ct.label}
              </p>
              <p className="mt-0.5 text-sm text-slate-500">{ct.description}</p>
            </div>
          </button>
        ))}

        <div className="mt-6 rounded-xl bg-slate-100 px-5 py-4 text-center">
          <p className="text-sm text-slate-500">
            🔒 Todas las sugerencias son revisadas antes de publicarse.
            <br />
            Tu contribución se envía por correo electrónico.
          </p>
        </div>
      </div>
    );
  }

  // Step 2: Fill form based on type
  return (
    <div>
      {/* Back button */}
      <button
        type="button"
        onClick={() => setType(null)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M10 7H2M6 3L2 7l4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Cambiar tipo de contribución
      </button>

      <div className="space-y-5">
        {type === "add-person" && (
          <>
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              👤 Agregar un familiar
            </h2>

            <div>
              <label
                htmlFor="c-name"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Nombre completo del familiar
              </label>
              <input
                id="c-name"
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Ej: María José Caamaño Restrepo"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="c-rel"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                ¿Qué parentesco tiene?
              </label>
              <input
                id="c-rel"
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="Ej: Hija de, Esposa de, Hermano de..."
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="c-related"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                ¿Familiar de quién? (que ya está en el árbol)
              </label>
              <input
                id="c-related"
                type="text"
                value={relatedTo}
                onChange={(e) => setRelatedTo(e.target.value)}
                placeholder="Ej: Luis Miguel Caamaño, Néstor Caamaño..."
                className={inputClass}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="c-birth"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="c-birth"
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="Ej: 1985 o 15 de marzo de 1985"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="c-place"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Lugar de nacimiento
                </label>
                <input
                  id="c-place"
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  placeholder="Ej: Barranquilla, Colombia"
                  className={inputClass}
                />
              </div>
            </div>
          </>
        )}

        {type === "fix-info" && (
          <>
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              ✏️ Corregir información
            </h2>

            <div>
              <label
                htmlFor="c-who"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                ¿De quién es la información incorrecta?
              </label>
              <input
                id="c-who"
                type="text"
                value={whoToFix}
                onChange={(e) => setWhoToFix(e.target.value)}
                placeholder="Ej: Néstor Caamaño, José Tomás..."
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="c-what"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                ¿Qué está mal y cuál es el dato correcto?
              </label>
              <textarea
                id="c-what"
                value={whatToFix}
                onChange={(e) => setWhatToFix(e.target.value)}
                placeholder="Ej: La fecha de nacimiento dice 1901 pero fue 1902. El lugar dice Bogotá pero nació en Barranquilla..."
                rows={3}
                className={inputClass}
              />
            </div>
          </>
        )}

        {type === "other" && (
          <>
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              💬 Otra contribución
            </h2>
            <p className="text-sm text-slate-500">
              Fotos antiguas, historias familiares, documentos, o cualquier
              información que quieras compartir.
            </p>
          </>
        )}

        {/* Shared fields */}
        <div>
          <label
            htmlFor="c-comment"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            {type === "other"
              ? "¿Qué quieres compartir?"
              : "Comentario adicional (opcional)"}
          </label>
          <textarea
            id="c-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe aquí lo que quieras agregar..."
            rows={3}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="c-sender"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Tu nombre (para que sepa quién envía)
          </label>
          <input
            id="c-sender"
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Ej: Tía Martha, Prima Sofía..."
            className={inputClass}
          />
        </div>

        {/* Send button */}
        <button
          type="button"
          onClick={handleSend}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-lg font-semibold text-white shadow-md hover:bg-teal-700 active:scale-[0.98]"
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

        <p className="text-center text-sm text-slate-400">
          Se abrirá tu app de correo con el mensaje listo. Luis Miguel revisará
          tu sugerencia antes de agregarla al árbol.
        </p>
      </div>
    </div>
  );
}
