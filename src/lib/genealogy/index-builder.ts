/**
 * Builds adjacency indexes from raw GenealogyData for O(1) lookups.
 * Used by kinship, layout, and search modules.
 */
import type { GenealogyData, PersonIndex } from "./types";

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
