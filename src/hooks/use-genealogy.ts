/**
 * Hook for loading and accessing genealogy data.
 * Loads from localStorage (with fallback to static JSON).
 * Provides a mutate function for persisting changes.
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { loadPersistedData, persistData } from "@/lib/data/persistence";
import { buildPersonIndex } from "@/lib/genealogy/index-builder";
import type { GenealogyData, PersonIndex } from "@/lib/genealogy/types";

interface UseGenealogyReturn {
  data: GenealogyData;
  index: PersonIndex;
  mutate: (updater: (prev: GenealogyData) => GenealogyData) => void;
  isLoading: false;
  error: null;
}

export function useGenealogy(): UseGenealogyReturn {
  const [data, setData] = useState<GenealogyData>(() => loadPersistedData());
  const index = useMemo(() => buildPersonIndex(data), [data]);

  const mutate = useCallback(
    (updater: (prev: GenealogyData) => GenealogyData) => {
      setData((prev) => {
        const next = updater(prev);
        persistData(next);
        return next;
      });
    },
    [],
  );

  return {
    data,
    index,
    mutate,
    isLoading: false,
    error: null,
  };
}
