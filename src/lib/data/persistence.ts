/**
 * Data persistence layer using localStorage.
 * Falls back to the static JSON import when no persisted data exists.
 */
import type { GenealogyData } from "@/lib/genealogy/types";
import baseData from "@/data/caamano-family.json";
import { serializeGedcom } from "@/lib/genealogy/gedcom-export";

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

/** Trigger a browser download for an in-memory blob */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function todayStamp(): string {
  return new Date().toISOString().split("T")[0];
}

/** Export data as downloadable JSON file */
export function exportData(data: GenealogyData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, `caamano-family-${todayStamp()}.json`);
}

/**
 * Export the current tree (including local edits) as a GEDCOM 5.5.1 file.
 * A UTF-8 BOM is prepended so older desktop readers keep ñ and accents.
 */
export function exportGedcom(data: GenealogyData): void {
  const blob = new Blob(["\uFEFF", serializeGedcom(data)], {
    type: "text/plain;charset=utf-8",
  });
  downloadBlob(blob, `caamano-family-${todayStamp()}.ged`);
}

/** Reset to base data (clear localStorage) */
export function resetData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
