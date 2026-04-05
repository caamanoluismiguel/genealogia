/**
 * Zustand store for tree view state.
 * Manages selected person, highlighted path, zoom level, and search query.
 */
import { create } from "zustand";
import type { PersonSource } from "@/lib/genealogy/types";

interface TreeState {
  /** Currently selected person ID */
  selectedPersonId: string | null;
  /** Second selected person for kinship comparison */
  comparisonPersonId: string | null;
  /** "Yo soy" — who the user identifies as */
  referencePersonId: string | null;
  /** Search query string */
  searchQuery: string;
  /** Whether the detail sidebar is open */
  sidebarOpen: boolean;

  /** Path Finder compare mode */
  compareMode: boolean;
  comparePersonA: string | null;
  comparePersonB: string | null;

  /** Which data sources are visible in the tree */
  visibleSources: Set<PersonSource>;

  /** Country filter — null = show all, Set = show only these */
  activeCountry: string | null;

  // Actions
  selectPerson: (id: string | null) => void;
  setComparisonPerson: (id: string | null) => void;
  setReferencePerson: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  reset: () => void;

  // Source layer actions
  toggleSource: (source: PersonSource) => void;

  // Country filter actions
  setCountry: (country: string | null) => void;

  // Path Finder actions
  enterCompareMode: () => void;
  exitCompareMode: () => void;
  setComparePersonA: (id: string | null) => void;
  setComparePersonB: (id: string | null) => void;
}

export const useTreeStore = create<TreeState>()((set) => ({
  selectedPersonId: null,
  comparisonPersonId: null,
  referencePersonId: "p151",
  searchQuery: "",
  sidebarOpen: false,

  compareMode: false,
  comparePersonA: null,
  comparePersonB: null,

  visibleSources: new Set<PersonSource>(["modern"]),
  activeCountry: null,

  selectPerson: (id) => set({ selectedPersonId: id, sidebarOpen: id !== null }),
  setComparisonPerson: (id) => set({ comparisonPersonId: id }),
  setReferencePerson: (id) => {
    if (id) {
      try {
        localStorage.setItem("genealogia-yo", id);
      } catch {
        // localStorage unavailable — ignore
      }
    }
    set({ referencePersonId: id });
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  reset: () =>
    set({
      selectedPersonId: null,
      comparisonPersonId: null,
      searchQuery: "",
      sidebarOpen: false,
      compareMode: false,
      comparePersonA: null,
      comparePersonB: null,
    }),

  // Source layer actions
  toggleSource: (source) =>
    set((s) => {
      const next = new Set(s.visibleSources);
      if (next.has(source)) {
        if (next.size > 1) next.delete(source);
      } else {
        next.add(source);
      }
      return { visibleSources: next };
    }),

  // Country filter — tap to select, tap again to deselect (show all)
  setCountry: (country) =>
    set((s) => ({
      activeCountry: s.activeCountry === country ? null : country,
    })),

  // Path Finder actions
  enterCompareMode: () =>
    set({
      compareMode: true,
      comparePersonA: null,
      comparePersonB: null,
      // Close sidebar when entering compare mode
      sidebarOpen: false,
      selectedPersonId: null,
    }),
  exitCompareMode: () =>
    set({
      compareMode: false,
      comparePersonA: null,
      comparePersonB: null,
    }),
  setComparePersonA: (id) => set({ comparePersonA: id }),
  setComparePersonB: (id) => set({ comparePersonB: id }),
}));
