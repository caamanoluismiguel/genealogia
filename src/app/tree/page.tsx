/**
 * Main interactive tree visualization page.
 * Server Component shell — delegates rendering to FamilyTree client component.
 */
import { FamilyTree } from "@/components/tree/family-tree";

export default function TreePage() {
  return <FamilyTree />;
}
