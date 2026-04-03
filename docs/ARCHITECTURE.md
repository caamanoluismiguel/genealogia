# Architecture: Genealogia Caamano

## Overview

Personal genealogy web app for the Caamano family. No auth, no database for MVP.
Data is stored in a single JSON file and loaded at build/request time.

---

## Data Model

### Person

```typescript
interface Person {
  id: string; // UUID or slug (e.g. "jose-caamano-1925")
  firstName: string;
  lastName: string;
  maidenName?: string;
  gender: "male" | "female" | "other" | "unknown";
  birthDate?: string; // ISO 8601 partial: "1952", "1952-03", "1952-03-15"
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  photoUrl?: string;
  notes?: string;
  events: LifeEvent[];
  migrations: Migration[];
}
```

### Family (couple + children unit)

```typescript
interface Family {
  id: string;
  parents: string[]; // 1-2 Person IDs
  children: string[]; // Person IDs
  marriageDate?: string;
  marriagePlace?: string;
  divorceDate?: string;
}
```

### Supporting Types

```typescript
interface LifeEvent {
  type:
    | "birth"
    | "death"
    | "marriage"
    | "divorce"
    | "immigration"
    | "emigration"
    | "baptism"
    | "graduation"
    | "custom";
  date?: string;
  place?: string;
  description?: string;
}

interface GeoLocation {
  lat: number;
  lng: number;
  label: string; // e.g. "Lugo, Galicia, Spain"
}

interface Migration {
  from: GeoLocation;
  to: GeoLocation;
  year?: number;
  reason?: string;
}
```

### Top-Level Data Structure

```typescript
interface GenealogyData {
  persons: Person[];
  families: Family[];
  meta: { lastUpdated: string; version: number };
}
```

### Adjacency Index (runtime, not persisted)

```typescript
interface PersonIndex {
  persons: Map<string, Person>;
  parentOf: Map<string, string[]>; // personId -> familyIds as parent
  childIn: Map<string, string>; // personId -> familyId as child
  families: Map<string, Family>;
}
```

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                       # Redirect to /tree
│   ├── layout.tsx                     # Root layout (Geist font, metadata)
│   ├── globals.css                    # Tailwind v4 + Shadcn theme
│   ├── tree/
│   │   └── page.tsx                   # Tree visualization (Server Component shell)
│   ├── person/
│   │   └── [id]/
│   │       └── page.tsx               # Person detail (deep-linkable)
│   ├── map/
│   │   └── page.tsx                   # Migration map
│   └── add/
│       └── page.tsx                   # Add family member form
├── components/
│   ├── tree/
│   │   ├── family-tree.tsx            # SVG tree container + d3-zoom
│   │   ├── person-node.tsx            # Person card (SVG foreignObject)
│   │   ├── family-link.tsx            # SVG connector paths
│   │   ├── relationship-path.tsx      # Highlighted kinship path overlay
│   │   ├── tree-controls.tsx          # Zoom/reset floating controls
│   │   └── tree-search.tsx            # Search autocomplete
│   ├── person/
│   │   ├── person-detail-sidebar.tsx  # Slide-in detail panel
│   │   └── person-form.tsx            # Add/edit person form
│   ├── map/
│   │   └── migration-map.tsx          # Leaflet map with migration lines
│   ├── layout/
│   │   ├── nav-header.tsx             # App navigation
│   │   └── sidebar.tsx                # Optional sidebar
│   └── ui/                            # Shadcn/UI primitives (button, etc.)
├── lib/
│   ├── genealogy/
│   │   ├── types.ts                   # All TypeScript interfaces
│   │   ├── kinship.ts                 # LCA algorithm + relationship labels
│   │   ├── layout.ts                  # Tree layout computation (x,y coords)
│   │   ├── mutations.ts               # Pure immutable data transforms
│   │   ├── index-builder.ts           # Build adjacency index from raw data
│   │   ├── search.ts                  # Fuzzy name search
│   │   └── labels.ts                  # ES/EN kinship term lookup tables
│   ├── data/
│   │   └── loader.ts                  # Load JSON data from filesystem
│   └── utils.ts                       # Shadcn cn() utility
├── hooks/
│   ├── use-genealogy.ts               # Data loading hook
│   ├── use-tree-zoom.ts               # d3-zoom state management
│   └── use-kinship.ts                 # Kinship computation hook
├── stores/
│   └── tree-store.ts                  # Zustand: selected person, sidebar, search
└── data/
    └── caamano-family.json            # Family tree data (the "database")
```

---

## Tech Stack Decisions

| Choice                  | Rationale                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| **JSON file**           | No database overhead for a personal tool. Easy to version-control, edit manually, export. |
| **d3-zoom**             | Industry standard for SVG pan/zoom. Handles touch, mouse wheel, programmatic zoom.        |
| **Leaflet**             | Free, no API key, lightweight. Perfect for migration visualization.                       |
| **Zustand**             | Minimal boilerplate for tree selection state. No context provider hell.                   |
| **LCA algorithm**       | Standard approach for kinship computation. O(n) with preprocessing.                       |
| **SVG foreignObject**   | Allows HTML-styled person cards inside SVG tree layout.                                   |
| **Immutable mutations** | Pure functions return new data objects. Easy to test, undo-friendly.                      |

---

## Domain Boundaries

### `lib/genealogy/` — Core Domain (pure, no React)

All genealogy algorithms. Zero framework dependencies. Testable in isolation.

- **types.ts**: Canonical type definitions
- **index-builder.ts**: O(n) index construction
- **kinship.ts**: LCA-based relationship computation
- **layout.ts**: Tree node positioning
- **mutations.ts**: Immutable CRUD operations
- **search.ts**: Fuzzy name matching
- **labels.ts**: Bilingual kinship terminology

### `components/tree/` — Tree Visualization (React, client)

SVG-based interactive tree. All `"use client"`.

### `components/person/` — Person UI (React, client)

Detail sidebar and add/edit form. All `"use client"`.

### `components/map/` — Geographic Map (React, client)

Leaflet-based migration visualization. `"use client"`.

### `lib/data/` — Data Access

Loads JSON from filesystem (server) or passes pre-loaded data (client).

### `stores/` — Client State

Zustand store for UI state (selection, sidebar, search).

---

## Key Algorithms

### Kinship (LCA)

1. Build parent-child adjacency from `PersonIndex`
2. BFS from person A upward to find all ancestors with generation count
3. BFS from person B upward to find all ancestors with generation count
4. Find lowest common ancestor (first shared ancestor)
5. Compute (generationsUp, generationsDown) from LCA
6. Map to kinship label via `labels.ts` lookup table

### Tree Layout

1. Identify root persons (no parents in data)
2. Assign generations (BFS from roots)
3. Position nodes: x = horizontal spread within generation, y = generation \* spacing
4. Handle multiple root families (side by side)
5. Create edges from family parent-child and spouse relationships

### Fuzzy Search

1. Normalize query (lowercase, strip accents)
2. Check exact substring match first (highest score)
3. Fall back to simple Levenshtein distance
4. Return top N results sorted by score
