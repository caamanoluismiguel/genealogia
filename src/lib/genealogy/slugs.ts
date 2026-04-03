/**
 * Bidirectional slug map for URL-friendly person identifiers.
 * Strips diacritics and deduplicates collisions with numeric suffixes.
 */
import type { Person } from "./types";

/** Generate a URL-friendly slug from a person's name */
export function personToSlug(person: Person): string {
  const raw = `${person.firstName} ${person.lastName}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return raw;
}

/** Build a bidirectional slug map from persons array */
export function buildSlugMap(persons: Person[]): {
  slugToId: Map<string, string>;
  idToSlug: Map<string, string>;
} {
  const slugToId = new Map<string, string>();
  const idToSlug = new Map<string, string>();
  const seen = new Map<string, number>();

  for (const person of persons) {
    let slug = personToSlug(person);
    const count = seen.get(slug) ?? 0;
    if (count > 0) slug = `${slug}-${count + 1}`;
    seen.set(slug.replace(/-\d+$/, ""), count + 1);

    slugToId.set(slug, person.id);
    idToSlug.set(person.id, slug);
  }

  return { slugToId, idToSlug };
}
