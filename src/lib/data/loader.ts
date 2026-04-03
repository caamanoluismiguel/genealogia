/**
 * Loads the family JSON data.
 * Imports the static JSON file and returns it as GenealogyData.
 */
import type { GenealogyData } from "@/lib/genealogy/types";
import familyData from "@/data/caamano-family.json";

/**
 * Load family data from the JSON file.
 */
export function loadFamilyData(): GenealogyData {
  return familyData as GenealogyData;
}
