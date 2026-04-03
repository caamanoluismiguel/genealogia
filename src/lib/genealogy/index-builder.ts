/**
 * Builds adjacency indexes from raw GenealogyData for O(1) lookups.
 * Used by kinship, layout, and search modules.
 */
import type { GenealogyData, PersonIndex, PersonSource } from "./types";

export function buildPersonIndex(data: GenealogyData): PersonIndex {
  const persons = new Map(data.persons.map((p) => [p.id, p]));
  const parentOf = new Map<string, string[]>();
  const childIn = new Map<string, string>();
  const families = new Map(data.families.map((f) => [f.id, f]));

  for (const family of data.families) {
    for (const parentId of family.parents) {
      const existing = parentOf.get(parentId);
      if (existing) {
        existing.push(family.id);
      } else {
        parentOf.set(parentId, [family.id]);
      }
    }
    for (const childId of family.children) {
      childIn.set(childId, family.id);
    }
  }

  return { persons, parentOf, childIn, families };
}

/** Build a filtered index containing only persons from visible sources */
export function filterIndexBySources(
  index: PersonIndex,
  visibleSources: Set<PersonSource>,
): PersonIndex {
  // Auto-include gap when historical is visible
  const effective = new Set(visibleSources);
  if (effective.has("historical")) effective.add("gap");

  const persons = new Map(
    [...index.persons].filter(([, p]) => !p.source || effective.has(p.source)),
  );

  const families = new Map(
    [...index.families].filter(([, f]) =>
      f.parents.some((pid) => persons.has(pid)),
    ),
  );

  const parentOf = new Map<string, string[]>();
  const childIn = new Map<string, string>();

  for (const [familyId, family] of families) {
    for (const parentId of family.parents) {
      if (!persons.has(parentId)) continue;
      const existing = parentOf.get(parentId);
      if (existing) existing.push(familyId);
      else parentOf.set(parentId, [familyId]);
    }
    for (const childId of family.children) {
      if (!persons.has(childId)) continue;
      childIn.set(childId, familyId);
    }
  }

  return { persons, parentOf, childIn, families };
}
