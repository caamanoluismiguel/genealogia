/**
 * Kinship computation using Lowest Common Ancestor (LCA).
 * Determines relationship labels between any two persons.
 */
import type { PersonIndex, KinshipResult } from "./types";
import { getKinshipLabel } from "./labels";

/**
 * BFS upward from a person to build ancestor map: ancestorId -> generationsUp.
 */
function getAncestorMap(
  personId: string,
  index: PersonIndex,
): Map<string, number> {
  const ancestors = new Map<string, number>();
  ancestors.set(personId, 0);

  const queue: Array<{ id: string; gen: number }> = [{ id: personId, gen: 0 }];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const familyId = index.childIn.get(current.id);
    if (!familyId) continue;

    const family = index.families.get(familyId);
    if (!family) continue;

    for (const parentId of family.parents) {
      if (!ancestors.has(parentId)) {
        ancestors.set(parentId, current.gen + 1);
        queue.push({ id: parentId, gen: current.gen + 1 });
      }
    }
  }

  return ancestors;
}

/**
 * BFS upward from personId to ancestorId, returns ordered path.
 */
function buildPathToAncestor(
  personId: string,
  ancestorId: string,
  index: PersonIndex,
): string[] {
  if (personId === ancestorId) return [personId];

  const cameFrom = new Map<string, string>();
  const queue = [personId];
  cameFrom.set(personId, personId);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === ancestorId) break;

    const familyId = index.childIn.get(current);
    if (!familyId) continue;
    const family = index.families.get(familyId);
    if (!family) continue;

    for (const parentId of family.parents) {
      if (!cameFrom.has(parentId)) {
        cameFrom.set(parentId, current);
        queue.push(parentId);
      }
    }
  }

  // Reconstruct path from ancestor back to person, then reverse
  const path: string[] = [];
  let node = ancestorId;
  while (node !== personId) {
    path.push(node);
    const prev = cameFrom.get(node);
    if (!prev || prev === node) break;
    node = prev;
  }
  path.push(personId);
  path.reverse();
  return path;
}

/**
 * Find the kinship relationship between two persons.
 * Uses BFS to find LCA, then computes generational distance.
 */
export function computeKinship(
  fromId: string,
  toId: string,
  index: PersonIndex,
): KinshipResult | null {
  if (!index.persons.has(fromId) || !index.persons.has(toId)) return null;
  if (fromId === toId) return null;

  const ancestorsA = getAncestorMap(fromId, index);
  const ancestorsB = getAncestorMap(toId, index);

  // Find common ancestors with minimum total distance
  let bestDistance = Infinity;
  let bestLca: { id: string; genA: number; genB: number } | null = null;

  for (const [ancestorId, genA] of ancestorsA) {
    const genB = ancestorsB.get(ancestorId);
    if (genB === undefined) continue;

    const totalDist = genA + genB;
    if (totalDist < bestDistance) {
      bestDistance = totalDist;
      bestLca = { id: ancestorId, genA, genB };
    }
  }

  if (!bestLca) return null;

  // Build path: fromId -> ... -> LCA -> ... -> toId
  const pathUp = buildPathToAncestor(fromId, bestLca.id, index);
  const pathDown = buildPathToAncestor(toId, bestLca.id, index);
  pathDown.reverse();
  // Combine, removing duplicate LCA node
  const path = [...pathUp, ...pathDown.slice(1)];

  // Determine gender of "to" person for label
  const toPerson = index.persons.get(toId);
  const gender =
    toPerson?.gender === "male" || toPerson?.gender === "female"
      ? toPerson.gender
      : "unknown";

  // Swap genA/genB: we want "who is toId TO fromId?" not "who is fromId TO toId?"
  // genA=2,genB=0 means fromId is 2 below LCA, toId IS the LCA → toId is fromId's grandparent
  const label = getKinshipLabel(
    bestLca.genB,
    bestLca.genA,
    gender,
    "es",
    "colloquial",
  );

  return {
    from: fromId,
    to: toId,
    path,
    label,
    generationsUp: bestLca.genA,
    generationsDown: bestLca.genB,
  };
}
