/**
 * Person detail page (deep-linkable).
 * Shows full person information with navigation back to tree.
 */
import { loadFamilyData } from "@/lib/data/loader";
import { buildPersonIndex } from "@/lib/genealogy/index-builder";
import Link from "next/link";
import type { Person } from "@/lib/genealogy/types";

interface PersonPageProps {
  params: Promise<{ id: string }>;
}

// ARIA: Gender stripe color — same visual language as PersonNode and sidebar.
function getGenderStripe(gender: Person["gender"]): string {
  switch (gender) {
    case "male":
      return "bg-blue-400";
    case "female":
      return "bg-pink-400";
    default:
      return "bg-slate-300";
  }
}

function getGenderLabel(gender: Person["gender"]): string {
  switch (gender) {
    case "male":
      return "Masculino";
    case "female":
      return "Femenino";
    default:
      return "Otro";
  }
}

// ZERO: Inline SVG icons — no extra dependency.
function IconCalendar() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-amber-500"
    >
      <rect
        x="1"
        y="2.5"
        width="12"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M1 6h12M4.5 1v3M9.5 1v3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-teal-500"
    >
      <path
        d="M6.5 1a4.5 4.5 0 0 1 4.5 4.5C11 9 6.5 13 6.5 13S2 9 2 5.5A4.5 4.5 0 0 1 6.5 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="6.5" cy="5.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-teal-500"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconNote() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-amber-500"
    >
      <rect
        x="1.5"
        y="1.5"
        width="11"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 5h6M4 7.5h6M4 10h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ARIA: Reusable section card — warm border + soft background groups related info.
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-amber-100 bg-amber-50/40 p-5">
      <h2 className="mb-3 font-serif text-base font-semibold text-amber-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function generateStaticParams() {
  const data = loadFamilyData();
  return data.persons.map((p) => ({ id: p.id }));
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;
  const data = loadFamilyData();
  const index = buildPersonIndex(data);
  const person = index.persons.get(id);

  if (!person) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-8 text-center">
          <p className="font-serif text-xl text-amber-900">
            Persona no encontrada
          </p>
          <p className="mt-2 text-sm text-amber-700">
            No se encontró a ningún familiar con el ID &quot;{id}&quot;.
          </p>
          <Link
            href="/tree"
            className="mt-4 inline-block text-sm font-medium text-teal-600 underline-offset-2 hover:underline"
          >
            Volver al árbol
          </Link>
        </div>
      </div>
    );
  }

  // Find families where this person is a parent
  const parentFamilyIds = index.parentOf.get(id) ?? [];
  const parentFamilies = parentFamilyIds
    .map((fid) => index.families.get(fid))
    .filter(Boolean);

  // Find the family where this person is a child
  const childFamilyId = index.childIn.get(id);
  const childFamily = childFamilyId
    ? index.families.get(childFamilyId)
    : undefined;

  const parents = childFamily
    ? childFamily.parents.map((pid) => index.persons.get(pid)).filter(Boolean)
    : [];

  const spouses = parentFamilies.flatMap((f) =>
    f!.parents
      .filter((pid) => pid !== id)
      .map((pid) => index.persons.get(pid))
      .filter(Boolean),
  );

  const children = parentFamilies.flatMap((f) =>
    f!.children.map((cid) => index.persons.get(cid)).filter(Boolean),
  );

  const siblings = childFamily
    ? childFamily.children
        .filter((cid) => cid !== id)
        .map((cid) => index.persons.get(cid))
        .filter(Boolean)
    : [];

  const genderStripe = getGenderStripe(person.gender);

  return (
    // ARIA: max-w-2xl + centered layout focuses reading. py-8 gives breathing room
    // between the nav header and the content.
    <div className="mx-auto max-w-2xl px-6 py-8">
      {/* Back link */}
      <Link
        href="/tree"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-amber-700 transition-colors hover:text-amber-950"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 7H2M6 3L2 7l4 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver al árbol
      </Link>

      {/* Hero card — parchment gradient background */}
      {/* ARIA: The 4px top gender stripe is the same pattern used in the sidebar
          and search dropdown — a consistent visual language across all person surfaces. */}
      <div className="overflow-hidden rounded-2xl border border-amber-200 shadow-md">
        <div className={`h-1.5 w-full ${genderStripe}`} />
        <div className="bg-gradient-to-b from-amber-50 to-white px-6 py-6">
          {/* ARIA: Large serif name is the page hero — family records are name-first */}
          <h1 className="font-serif text-3xl font-semibold text-amber-950">
            {person.firstName}{" "}
            <span className="text-2xl font-normal text-amber-800">
              {person.lastName}
            </span>
          </h1>
          <p className="mt-1 text-sm text-amber-700">
            {getGenderLabel(person.gender)}
          </p>

          {/* Key dates row */}
          {(person.birthDate || person.deathDate) && (
            <div className="mt-4 flex flex-wrap gap-4 border-t border-amber-100 pt-4">
              {person.birthDate && (
                <div className="flex items-start gap-2">
                  <IconCalendar />
                  <div>
                    <p className="text-xs text-amber-700">Nacimiento</p>
                    <p className="text-sm font-medium text-amber-950">
                      {person.birthDate}
                    </p>
                    {person.birthPlace && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-amber-700">
                        <IconMapPin />
                        {person.birthPlace}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {!person.birthDate && person.birthPlace && (
                <div className="flex items-start gap-2">
                  <IconMapPin />
                  <div>
                    <p className="text-xs text-amber-700">
                      Lugar de nacimiento
                    </p>
                    <p className="text-sm font-medium text-amber-950">
                      {person.birthPlace}
                    </p>
                  </div>
                </div>
              )}
              {person.deathDate && (
                <div className="flex items-start gap-2">
                  <IconCalendar />
                  <div>
                    <p className="text-xs text-amber-700">Fallecimiento</p>
                    <p className="text-sm font-medium text-amber-950">
                      {person.deathDate}
                    </p>
                    {person.deathPlace && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-amber-700">
                        <IconMapPin />
                        {person.deathPlace}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          {person.notes && (
            <div className="mt-4 flex items-start gap-2 border-t border-amber-100 pt-4">
              <IconNote />
              <p className="text-sm leading-relaxed text-amber-900 italic">
                {person.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Family relationship sections */}
      <div className="mt-6 space-y-4">
        {parents.length > 0 && (
          <SectionCard title="Padres">
            <ul className="space-y-2">
              {parents.map((p) => (
                <li key={p!.id}>
                  <Link
                    href={`/person/${p!.id}`}
                    className="inline-flex items-center gap-1.5 font-serif text-sm font-medium text-amber-950 underline-offset-2 hover:text-teal-700 hover:underline"
                  >
                    {p!.firstName} {p!.lastName}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {spouses.length > 0 && (
          <SectionCard title="Pareja(s)">
            <ul className="space-y-2">
              {spouses.map((s) => (
                <li key={s!.id}>
                  <Link
                    href={`/person/${s!.id}`}
                    className="inline-flex items-center gap-1.5 font-serif text-sm font-medium text-amber-950 underline-offset-2 hover:text-teal-700 hover:underline"
                  >
                    {s!.firstName} {s!.lastName}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {children.length > 0 && (
          <SectionCard title="Hijos">
            <ul className="grid grid-cols-2 gap-2">
              {children.map((c) => (
                <li key={c!.id}>
                  <Link
                    href={`/person/${c!.id}`}
                    className="inline-flex items-center gap-1.5 font-serif text-sm font-medium text-amber-950 underline-offset-2 hover:text-teal-700 hover:underline"
                  >
                    {c!.firstName} {c!.lastName}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {siblings.length > 0 && (
          <SectionCard title="Hermanos">
            <ul className="grid grid-cols-2 gap-2">
              {siblings.map((s) => (
                <li key={s!.id}>
                  <Link
                    href={`/person/${s!.id}`}
                    className="inline-flex items-center gap-1.5 font-serif text-sm font-medium text-amber-950 underline-offset-2 hover:text-teal-700 hover:underline"
                  >
                    {s!.firstName} {s!.lastName}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {/* Migrations — travel/movement section with arrow motif */}
        {person.migrations.length > 0 && (
          <SectionCard title="Migraciones">
            <ul className="space-y-3">
              {person.migrations.map((m, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 rounded-lg border border-amber-100 bg-white px-3 py-1.5">
                    <IconMapPin />
                    <span className="font-medium text-amber-950">
                      {typeof m.from === "string" ? m.from : m.from.label}
                    </span>
                  </div>
                  <IconArrow />
                  <div className="flex items-center gap-1.5 rounded-lg border border-teal-100 bg-teal-50/50 px-3 py-1.5">
                    <IconMapPin />
                    <span className="font-medium text-teal-900">
                      {typeof m.to === "string" ? m.to : m.to.label}
                    </span>
                  </div>
                  {m.reason && (
                    <span className="text-xs text-amber-700 italic">
                      ({m.reason})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
