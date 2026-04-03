/**
 * Pure data mutation functions for genealogy data.
 * All functions return new data objects (immutable).
 */
import type { GenealogyData, Person, Family } from "./types";

/** Add a new person to the dataset */
export function addPerson(data: GenealogyData, person: Person): GenealogyData {
  return {
    ...data,
    persons: [...data.persons, person],
    meta: { ...data.meta, lastUpdated: new Date().toISOString() },
  };
}

/** Update an existing person */
export function updatePerson(
  data: GenealogyData,
  personId: string,
  updates: Partial<Person>,
): GenealogyData {
  return {
    ...data,
    persons: data.persons.map((p) =>
      p.id === personId ? { ...p, ...updates, id: p.id } : p,
    ),
    meta: { ...data.meta, lastUpdated: new Date().toISOString() },
  };
}

/** Remove a person and clean up all family references */
export function removePerson(
  data: GenealogyData,
  personId: string,
): GenealogyData {
  return {
    ...data,
    persons: data.persons.filter((p) => p.id !== personId),
    families: data.families.map((f) => ({
      ...f,
      parents: f.parents.filter((id) => id !== personId),
      children: f.children.filter((id) => id !== personId),
    })),
    meta: { ...data.meta, lastUpdated: new Date().toISOString() },
  };
}

/** Add a new family unit */
export function addFamily(data: GenealogyData, family: Family): GenealogyData {
  return {
    ...data,
    families: [...data.families, family],
    meta: { ...data.meta, lastUpdated: new Date().toISOString() },
  };
}

/** Link a child to an existing family */
export function addChildToFamily(
  data: GenealogyData,
  familyId: string,
  childId: string,
): GenealogyData {
  return {
    ...data,
    families: data.families.map((f) =>
      f.id === familyId ? { ...f, children: [...f.children, childId] } : f,
    ),
    meta: { ...data.meta, lastUpdated: new Date().toISOString() },
  };
}
