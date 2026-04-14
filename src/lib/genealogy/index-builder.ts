/**
 * Builds adjacency indexes from raw GenealogyData for O(1) lookups.
 * Used by kinship, layout, and search modules.
 */
import type { GenealogyData, PersonIndex, PersonSource } from "./types";
import { detectCountry } from "@/data/migration-routes";

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

/** Filter index by minimum documentary certainty level.
 *  null = show all (default).
 *  "circumstantial" = hide hypothetical.
 *  "proven" = hide circumstantial + hypothetical.
 *  Persons without a certainty field are treated as circumstantial (safest default).
 */
export function filterIndexByCertainty(
  index: PersonIndex,
  minCertainty: "proven" | "circumstantial" | "hypothetical" | null,
): PersonIndex {
  if (!minCertainty) return index;

  const ranks = { proven: 3, circumstantial: 2, hypothetical: 1 };
  const threshold = ranks[minCertainty];

  const persons = new Map(
    [...index.persons].filter(([, p]) => {
      const cert = p.certainty ?? "circumstantial";
      return ranks[cert] >= threshold;
    }),
  );

  const families = new Map(
    [...index.families].filter(
      ([, f]) =>
        f.parents.some((pid) => persons.has(pid)) ||
        f.children.some((cid) => persons.has(cid)),
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

/** Filter index to show only persons from a specific country.
 *  Parents of visible children are always included (no orphans).
 *  Persons with unknown country are always included.
 */
export function filterIndexByCountry(
  index: PersonIndex,
  country: string | null,
): PersonIndex {
  if (!country) return index;

  const matching = new Set<string>();
  for (const [id, p] of index.persons) {
    const personCountry = detectCountry(p.birthPlace);
    if (!personCountry || personCountry === country) {
      matching.add(id);
    }
  }

  // Two passes: include parents↔children chains
  for (let pass = 0; pass < 2; pass++) {
    for (const [, family] of index.families) {
      const hasChild = family.children.some((cid) => matching.has(cid));
      const hasParent = family.parents.some((pid) => matching.has(pid));
      if (hasChild) for (const pid of family.parents) matching.add(pid);
      if (hasParent) for (const cid of family.children) matching.add(cid);
    }
  }

  const persons = new Map(
    [...index.persons].filter(([id]) => matching.has(id)),
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
