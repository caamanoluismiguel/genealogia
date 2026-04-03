/**
 * Data persistence layer using localStorage.
 * Falls back to the static JSON import when no persisted data exists.
 */
import type { GenealogyData } from "@/lib/genealogy/types";
import baseData from "@/data/caamano-family.json";

const STORAGE_KEY = "genealogia-data";

/** Load data: localStorage override > base JSON */
export function loadPersistedData(): GenealogyData {
  if (typeof window === "undefined") {
    return baseData as GenealogyData;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.meta?.version >= (baseData as GenealogyData).meta.version) {
        return parsed as GenealogyData;
      }
    }
  } catch {
    // localStorage unavailable or corrupt — fall through to base data
  }
  return baseData as GenealogyData;
}

/** Save data to localStorage */
export function persistData(data: GenealogyData): void {
  if (typeof window === "undefined") return;
  try {
    const updated = {
      ...data,
      meta: { ...data.meta, lastUpdated: new Date().toISOString() },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage full or unavailable — silent fail
  }
}

/** Export data as downloadable JSON file */
export function exportData(data: GenealogyData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `caamano-family-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Reset to base data (clear localStorage) */
export function resetData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
