/**
 * Tree layout computation.
 * Converts genealogy data into positioned nodes and edges for SVG rendering.
 *
 * Uses a recursive pre-order traversal starting from root couples
 * (persons with no parents in the dataset). Children are centered below
 * their parent pair. A running X counter prevents overlap.
 */
import type { PersonIndex, TreeLayout, LayoutNode, LayoutEdge } from "./types";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;
const GENERATION_GAP = 180;
const SIBLING_GAP = 40;
const FAMILY_GAP = 80;

/**
 * Compute the tree layout from a person index.
 * Assigns (x, y) coordinates to each person node and creates edges.
 */
export function computeTreeLayout(
  index: PersonIndex,
  rootPersonId?: string,
): TreeLayout {
  const nodes: LayoutNode[] = [];
  const edges: LayoutEdge[] = [];
  const nodeMap = new Map<string, LayoutNode>();

  // Track which persons have been placed to avoid duplicates
  const placed = new Set<string>();

  // Running X position counter — mutated by reference via wrapper
  let cursorX = 0;

  /**
   * Find root persons: those who are not children in any family.
   * If rootPersonId is given, use that person as the single root.
   */
  function findRootPersonIds(): string[] {
    if (rootPersonId && index.persons.has(rootPersonId)) {
      return [rootPersonId];
    }
    const roots: string[] = [];
    for (const personId of index.persons.keys()) {
      if (!index.childIn.has(personId)) {
        roots.push(personId);
      }
    }
    // Sort for deterministic layout
    return roots.sort();
  }

  /**
   * Find the family where this person is a parent (first one).
   * Returns the family ID or undefined.
   */
  function getFamilyAsParent(personId: string): string | undefined {
    const familyIds = index.parentOf.get(personId);
    return familyIds?.[0];
  }

  /**
   * Recursively layout a family subtree starting from a person.
   * Returns the LayoutNode so the caller can position edges.
   */
  function layoutPerson(
    personId: string,
    generation: number,
  ): LayoutNode | null {
    if (placed.has(personId)) {
      return nodeMap.get(personId) ?? null;
    }

    // Check if this person has a family (as a parent)
    const familyId = getFamilyAsParent(personId);

    if (!familyId) {
      // Leaf person — no spouse or children
      const node: LayoutNode = {
        personId,
        x: cursorX,
        y: generation * GENERATION_GAP,
        generation,
      };
      cursorX += NODE_WIDTH + SIBLING_GAP;
      nodes.push(node);
      nodeMap.set(personId, node);
      placed.add(personId);
      return node;
    }

    const family = index.families.get(familyId);
    if (!family) {
      // Fallback — place as leaf
      const node: LayoutNode = {
        personId,
        x: cursorX,
        y: generation * GENERATION_GAP,
        generation,
      };
      cursorX += NODE_WIDTH + SIBLING_GAP;
      nodes.push(node);
      nodeMap.set(personId, node);
      placed.add(personId);
      return node;
    }

    // Get spouse (the other parent in the family)
    const spouseId = family.parents.find((id) => id !== personId);

    // First, layout all children to determine the subtree width
    const childNodes: LayoutNode[] = [];
    const childStartX = cursorX;

    for (const childId of family.children) {
      if (placed.has(childId)) continue;
      const childNode = layoutPerson(childId, generation + 1);
      if (childNode) {
        childNodes.push(childNode);
      }
    }

    // Determine the span of children
    const childEndX = cursorX;
    const childrenWidth = childEndX - childStartX;

    // Determine width needed for parent pair
    const pairWidth = spouseId ? NODE_WIDTH * 2 + SIBLING_GAP : NODE_WIDTH;

    // Center parents above children (or use cursor if no children)
    let parentX: number;
    if (childNodes.length > 0) {
      const childCenter = childStartX + childrenWidth / 2;
      parentX = childCenter - pairWidth / 2;
      // Ensure parents don't overlap with already-placed nodes to the left
      if (parentX < childStartX && childStartX === cursorX - childrenWidth) {
        // Re-adjust: parents should be at least at childStartX
        parentX = Math.max(parentX, childStartX);
      }
    } else {
      parentX = cursorX;
      // Advance cursor past the parent pair
      cursorX += pairWidth + SIBLING_GAP;
    }

    // Place primary parent
    const primaryNode: LayoutNode = {
      personId,
      x: parentX,
      y: generation * GENERATION_GAP,
      generation,
    };
    nodes.push(primaryNode);
    nodeMap.set(personId, primaryNode);
    placed.add(personId);

    // Place spouse
    if (spouseId && !placed.has(spouseId)) {
      const spouseNode: LayoutNode = {
        personId: spouseId,
        x: parentX + NODE_WIDTH + SIBLING_GAP,
        y: generation * GENERATION_GAP,
        generation,
      };
      nodes.push(spouseNode);
      nodeMap.set(spouseId, spouseNode);
      placed.add(spouseId);

      // Spouse edge
      edges.push({
        fromId: personId,
        toId: spouseId,
        type: "spouse",
      });
    }

    // Create parent-child edges
    for (const childNode of childNodes) {
      edges.push({
        fromId: personId,
        toId: childNode.personId,
        type: "parent-child",
      });
    }

    // Ensure cursor is past this entire subtree
    const rightEdge = spouseId
      ? parentX + NODE_WIDTH * 2 + SIBLING_GAP
      : parentX + NODE_WIDTH;
    if (cursorX < rightEdge + SIBLING_GAP) {
      cursorX = rightEdge + SIBLING_GAP;
    }

    return primaryNode;
  }

  // Find root persons and group them by family if possible
  const rootIds = findRootPersonIds();

  // Group roots: find roots that share a family (siblings from the same parents)
  // Also separate lone roots that are not part of any family as parents
  for (const rootId of rootIds) {
    if (placed.has(rootId)) continue;
    layoutPerson(rootId, 0);
    cursorX += FAMILY_GAP; // extra gap between root family groups
  }

  // Compute overall dimensions
  let maxX = 0;
  let maxY = 0;
  for (const node of nodes) {
    if (node.x + NODE_WIDTH > maxX) maxX = node.x + NODE_WIDTH;
    if (node.y + NODE_HEIGHT > maxY) maxY = node.y + NODE_HEIGHT;
  }

  return {
    nodes,
    edges,
    width: maxX + FAMILY_GAP,
    height: maxY + GENERATION_GAP,
  };
}
