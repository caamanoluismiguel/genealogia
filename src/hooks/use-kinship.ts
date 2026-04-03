/**
 * Hook for computing and displaying kinship relationships.
 * Wraps the kinship algorithm with React state.
 */

"use client";

import { useMemo } from "react";
import { computeKinship } from "@/lib/genealogy/kinship";
import type { KinshipResult, PersonIndex } from "@/lib/genealogy/types";

interface UseKinshipReturn {
  result: KinshipResult | null;
  isComputing: boolean;
}

export function useKinship(
  fromId: string | null,
  toId: string | null,
  index: PersonIndex | null,
): UseKinshipReturn {
  const result = useMemo(() => {
    if (!fromId || !toId || !index) return null;
    return computeKinship(fromId, toId, index);
  }, [fromId, toId, index]);

  return {
    result,
    isComputing: false,
  };
}
