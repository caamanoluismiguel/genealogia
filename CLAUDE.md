# Genealogía Caamaño — Family Tree Web App

@AGENTS.md

## What This Is

Personal genealogy web app for the Caamaño family. **175 persons, 51 families, ~20 generations** (12th century → present). Traces from **Caamaño, A Coruña, Galicia, España** → Colombia (main branch), Dominican Republic, Ecuador, Argentina.

**No auth, no database.** Single JSON file is the "database." Personal tool, not a SaaS.

## The Family

- **Origin:** Parish of Santa María de Caamaño, Porto do Son (Comarca de Noya), A Coruña, Galicia, Spain
- **Owner:** Luis Miguel Caamaño = `p151`, father Luis = `p037`, wife Alejandra = `p150`, children Pablo `p152` + María Lucía `p153`
- **Root ancestor in data:** Rodrigo García de Caamaño = `h001` (~1100s, conquest of Baeza)
- **Colombian patriarch:** José Tomás Caamaño = `p001` (born Caamaño, A Coruña → emigrated to Colombia)
- **~20 generations** spanning 12th century to present, across 5 countries
- **"Yo soy" identity system:** `?yo=slug` shareable URLs, welcome modal, localStorage persistence, WhatsApp share

### Data Structure (v4, 2026-04-03)

- **201 persons** (153 modern + 21 historical + 16 FamilySearch + 4 CEMLA + 6 Geneanet + 1 gap)
- **55 families** (41 modern + 10 historical + 4 FamilySearch)
- **Historical persons:** IDs `h001`-`h021` (medieval lineage from García Carraffa, Tomo XX)
- **FamilySearch persons:** IDs `fs001`-`fs016` (Ribeira/Palmeira census clan, 1798-1905)
- **Gap marker:** ID `gap001` — unverified connection between medieval line (~1540) and Colombian line (~1850s)
- **Modern persons:** IDs `p001`-`p153` (your family)

### The Complete Lineage

```
h001: Rodrigo García de Caamaño (1100s, conquest of Baeza)
  └→ 10 generations documented (García Carraffa Tomo XX)
      └→ h019: García de Caamaño "El Alto" (d. 1540, Señor de Rubianes)
          └→ ⚠ BRECHA 1 (~1540s to ~1770s)
              └→ fs001: [Desconocido] Caamaño (born ~1770, Muros)
                  └→ fs003: Pablo Caamaño Villa (born 1802, Palmeira/Muros — marinero)
                      └→ fs005: José Caamaño González (born 1833, Lomba, Palmeira)
                          └→ fs014: "José Caamaño Incógnito" (¿emigrante?)
                          └→ ⚠ BRECHA 2: ¿conexión con p001?
              └→ p001: José Tomás Caamaño (Caamaño, A Coruña → Colombia)
                  └→ 6 generations
                      └→ p151: Luis Miguel Caamaño (owner)
```

**The gap narrowed from ~300 years to ~200 years.** Pablo Caamaño Villa (fs003, born 1802) is the closest documented ancestor candidate to José Tomás (p001, born ~1850s). They are from the same coastal area (Palmeira/Porto do Son, 5km apart). The connection is plausible but not yet proven.

### Three Historical Branches (all documented)

1. **Rama Troncal** — Casa de Noya (h001→h013, 7 generations, 1100s-1390s)
2. **Segunda Rama** — Señores de Rubianes / Marqueses de Villagarcía (h013→h019+, 1390s-1700s)
3. **Tercera Rama** — Vista Alegre / Barrantes (merged back into Segunda Rama)

## Surname Research (2026-04-03)

### Etymology

- **Galician surname** (NOT Castilian) — from medieval **Camaño** ← Latin **Camanius**
- Celtic root _cam-_ = "curved/crooked" — common in Galician toponymy
- Double "a" = Galician phonetic evolution (lost intervocalic consonant)
- Classification: **toponymic** (place-derived)

### Geographic Origin

- **Province:** A Coruña, Galicia, Spain
- **Concentrated in:** Betanzos, Pontedeume, Ferrol, Santiago area
- **Earliest solar:** Tierra de Betanzos (Ría de Betanzos, Mandeo river valley)
- **Torre de Caamaño** — traditional ancestral manor house

### Heraldry

- **Arms:** Azure (blue), three bars argent (silver)
- **Variant:** Bordure gules (red) with eight saltires or (gold)
- **Secondary branch:** Gold field, green tree, wolf/boar at base
- **Source:** García Carraffa _Diccionario Heráldico y Genealógico de Apellidos Españoles y Americanos_
- **Caveat:** Arms belong to specific family lines, not all surname bearers

### Notable Historical Caamaños

- **García de Caamaño "El Hermoso"** (~1400s) — **Founded Villagarcía de Arousa** (1441). Built Pazo de Rubianes (inscription 1411). `h017`
- **José Antonio de Mendoza Caamaño y Sotomayor** (1667-1746) — 3rd Marquis of Villagarcía. **VICEROY OF PERU** (1736-1746). Ambassador to Venice. Died at sea off Cape Horn. `h021`
- **Vasco de Caamaño** (~1200s) — Son of Gen 5. Went to Portugal, **founded the Camões line** — as in **Luís de Camões**, Portugal's greatest poet.
- **Jacinto Caamaño Moraleja** (1759-~1820s) — Spanish naval explorer, Knight of Calatrava. Explored Alaska/BC. **Camano Island (WA), Caamaño Sound (BC)** named after him.
- **José María Plácido Caamaño** (1838-1901) — **President of Ecuador** (1884-1888). Grandson of Jacinto.
- **Francisco Alberto Caamaño Deñó** (1932-1973) — Dominican revolutionary, led 1965 Constitutionalist revolt, briefly president.
- **Ángel Caamaño** (1861-1927) — Spanish journalist/theater critic, "El Barquero"

### Migration Patterns (Galicia → Americas)

1. **Colonial (1500s-1700s):** Hidalgos/clergy → Ecuador, DR, New Granada (Colombia)
2. **19th century (1850s-1900s):** Galician poverty + minifundio → Argentina (#1), Cuba (#2), Colombia via Barranquilla
3. **20th century (1900-1960):** Civil War + Franco → Argentina, Venezuela, Colombia, DR

- A Coruña port was main departure point. Brothers often split: one to Argentina, one to Colombia, one to Caribbean.

## Tech Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript 5.8+** strict
- **Tailwind CSS v4** + **Shadcn/UI**
- **Zustand v5** (client state: selection, sidebar, search)
- **d3-zoom** + **d3-selection** (SVG pan/zoom)
- **react-leaflet** + **leaflet** (migration map, free, no API key)
- **NO database** — JSON file at `src/data/caamano-family.json`
- **NO auth** — personal tool

## Architecture

See `docs/ARCHITECTURE.md` for full data model, algorithms, and domain boundaries.

```
src/
├── app/
│   ├── page.tsx                       # Redirect to /tree
│   ├── layout.tsx                     # Root layout + NavHeader
│   ├── tree/page.tsx                  # Main tree visualization
│   ├── person/[id]/page.tsx           # Person detail (deep link)
│   ├── map/page.tsx                   # Migration map
│   ├── historia/page.tsx              # Surname history + research
│   ├── research/page.tsx              # API integration dashboard
│   └── add/page.tsx                   # Add family member form
├── components/
│   ├── tree/                          # Tree visualization (SVG + d3-zoom)
│   │   ├── family-tree.tsx            # SVG container + pan/zoom + orchestrator
│   │   ├── person-node.tsx            # Person card (foreignObject, gender-coded)
│   │   ├── family-link.tsx            # SVG connector paths (bezier curves)
│   │   ├── relationship-path.tsx      # Animated kinship path highlight
│   │   ├── tree-controls.tsx          # Zoom/reset/export/compare floating controls
│   │   ├── tree-search.tsx            # Search autocomplete with gender indicators
│   │   ├── reference-chip.tsx         # "Yo soy: [Name]" identity chip + share button
│   │   ├── welcome-modal.tsx          # First-visit "¿Quién eres?" person picker
│   │   └── path-finder-banner.tsx     # Compare two people banner UI
│   ├── person/
│   │   ├── person-detail-sidebar.tsx  # Slide-in panel + inline editing + research links
│   │   └── person-form.tsx            # Add family member form
│   ├── map/
│   │   ├── migration-map.tsx          # Dynamic import wrapper (SSR-safe)
│   │   └── map-content.tsx            # Leaflet map with colored migration routes
│   ├── research/
│   │   ├── historia-page.tsx          # Surname history editorial page (7 sections)
│   │   └── research-dashboard.tsx     # 4-API integration cards
│   ├── layout/
│   │   ├── nav-header.tsx             # App nav with family crest + 6 links
│   │   └── sidebar.tsx                # Optional sidebar
│   └── ui/                            # Shadcn primitives (button)
├── lib/
│   ├── genealogy/                     # Core domain (pure, no React)
│   │   ├── types.ts                   # All TypeScript interfaces
│   │   ├── kinship.ts                 # LCA algorithm (BFS, swapped genA/genB for correct labels)
│   │   ├── labels.ts                  # ES/EN kinship term lookup tables (formal + colloquial)
│   │   ├── layout.ts                  # Tree layout computation (recursive pre-order)
│   │   ├── mutations.ts               # Immutable CRUD: addPerson, updatePerson, addFamily, etc.
│   │   ├── index-builder.ts           # Adjacency index from JSON (O(1) lookups)
│   │   ├── search.ts                  # Accent-insensitive fuzzy name search
│   │   ├── slugs.ts                   # Bidirectional URL slug map (person ↔ slug)
│   │   └── research-links.ts          # Deep link generator for FamilySearch/INE/PARES/CEMLA
│   ├── data/
│   │   ├── loader.ts                  # Static JSON import (server components)
│   │   └── persistence.ts             # localStorage persistence + JSON export + reset
│   └── utils.ts                       # Shadcn cn() utility
├── hooks/
│   ├── use-genealogy.ts               # Data loading + mutate (localStorage-backed)
│   ├── use-tree-zoom.ts               # d3-zoom state management
│   └── use-kinship.ts                 # Kinship computation hook
├── stores/
│   └── tree-store.ts                  # Zustand: selection, reference, compare mode, sidebar
└── data/
    └── caamano-family.json            # Family tree data (JSON)
```

## Data Model

### Key Types (in `lib/genealogy/types.ts`)

```typescript
interface Person {
  id: string; // "p001", "p151", etc.
  firstName: string;
  lastName: string;
  maidenName?: string;
  gender: "male" | "female" | "other" | "unknown";
  birthDate?: string; // ISO 8601 partial: "1952", "1952-03-15"
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  photoUrl?: string;
  notes?: string;
  events: LifeEvent[];
  migrations: Migration[];
}

interface Family {
  id: string;
  parents: string[]; // 1-2 Person IDs
  children: string[]; // Person IDs, ordered
  marriageDate?: string;
  marriagePlace?: string;
  divorceDate?: string;
}

interface Migration {
  from: GeoLocation; // { lat, lng, label }
  to: GeoLocation;
  year?: number;
  reason?: string;
}
```

### Runtime Index (not persisted)

```typescript
interface PersonIndex {
  persons: Map<string, Person>;
  parentOf: Map<string, string[]>; // personId → familyIds as parent
  childIn: Map<string, string>; // personId → familyId as child
  families: Map<string, Family>;
}
```

## Key Algorithms

### Kinship (LCA — Lowest Common Ancestor)

1. BFS from person A upward → all ancestors with generation count
2. BFS from person B upward → all ancestors with generation count
3. Find LCA (first shared ancestor)
4. Compute (generationsUp, generationsDown)
5. Map to Spanish/English label via `labels.ts`

### Tree Layout

1. Identify roots (no parents in data)
2. BFS generations → y = generation × spacing
3. x = horizontal spread within generation
4. Handle multiple root families side by side

### Fuzzy Search

1. Normalize (lowercase, strip accents)
2. Exact substring match (highest score)
3. Levenshtein distance fallback
4. Top N by score

## Features

- **"Yo soy" identity:** `?yo=slug` shareable URLs → welcome modal → localStorage → WhatsApp share
- **Kinship calculator:** Click any person → "tu abuela", "tu primo segundo" (colloquial Spanish labels)
- **Path Finder:** Compare any two people — click compare button, pick A and B, see animated relationship path + label
- **Migration map:** Leaflet with Spain→Americas colored routes (Colombia blue, DR amber, Ecuador green, Argentina purple)
- **Inline editing:** Add spouse/child, edit dates/places/notes directly from sidebar. Persists to localStorage.
- **Data persistence:** localStorage-backed with JSON export button (download icon in controls)
- **Historia page:** 7-section editorial page — etymology, INE distribution bar chart, worldwide distribution, heraldry (CSS shield), 4 notable Caamaños, 3 migration waves, research links
- **Research page:** 4 API integration cards (FamilySearch, INE, PARES, CEMLA) with deep links + search
- **Person detail:** Rich sidebar with info sections, research links (FamilySearch + PARES per person), inline editing
- **Warm parchment UI:** Family crest, serif headings, gender-coded nodes, WCAG AA contrast compliance

## Free Genealogy APIs (For Future Integration)

| API                     | Free?      | Auth         | Best For                                         | URL                                      |
| ----------------------- | ---------- | ------------ | ------------------------------------------------ | ---------------------------------------- |
| **FamilySearch**        | Yes        | OAuth 2.0    | Parish records, civil reg, immigration. LARGEST. | familysearch.org/developers/             |
| **WikiTree**            | Yes        | API key      | Collaborative world tree, sourced data           | wikitree.com/wiki/Help:API_Documentation |
| **Geni.com**            | Partial    | OAuth 2.0    | Existing Caamaño trees ($13/mo full)             | geni.com/platform                        |
| **PARES** (Spain gov)   | Yes        | Free reg     | Colonial admin, emigration, Inquisition          | pares.culturaydeporte.gob.es             |
| **Arquivo de Galicia**  | Yes        | None         | A Coruña parish records (baptisms, burials)      | arquivosdegalicia.xunta.gal              |
| **CEMLA** (Argentina)   | Yes        | None         | Ship passenger lists Buenos Aires 1882-1960      | cemla.com                                |
| **INE.es**              | Yes        | None         | Surname frequency/distribution in Spain          | ine.es                                   |
| **Forebears.io**        | Basic free | None         | Worldwide surname distribution maps              | forebears.io                             |
| **IPUMS International** | Yes (reg)  | Registration | Census microdata (CO, EC, AR, DR, ES)            | international.ipums.org                  |
| **Galiciana**           | Yes        | None         | Digitized Galician historical documents          | biblioteca.galiciana.gal                 |

### FamilySearch API (Best Starting Point)

- Docs: https://www.familysearch.org/developers/docs/api/
- Relevant collections: Spain parish records (A Coruña), Colombia civil reg, Argentine immigration, Ecuador church records
- OAuth 2.0, free account required

### Research Priority Order (Bridging the Gap)

The gap is ~1540s to ~1850s (~300 years, ~10-12 generations). José Tomás was born in the Parish of Caamaño, Porto do Son — in the Comarca de Noya, same area as the ancestral fortress of Castro Caamaño.

1. **García Carraffa Tomo XX** (FREE) — 13-generation lineage, may have more detail on cadet branches: https://archive.org/details/enciclopediahera20garc
2. **FamilySearch La Coruña Municipal Records (1648-1951)** — Search for José Tomás Caamaño baptism in Porto do Son: https://www.familysearch.org/en/search/collection/2015359
3. **Geneanet `larapat` tree** — 17,919 people from Porto do Son/Noya parish area. Search for Caamaño: https://en.geneanet.org/fonds/individus/?go=1&place__0__=Porto+Do+Son&size=50
4. **538 Geni.com Caamaño profiles** — Andrés Caamaño (1838, Mazaricos, A Coruña) is a direct lead
5. **PARES Movimientos Migratorios** — José Tomás's emigration record from A Coruña: https://pares.mcu.es/MovimientosMigratorios/
6. **CEMLA** — Argentine ship manifests for the brother who went to Argentina: https://cemla.com/buscador/
7. **Arquivo de Galicia** — Porto do Son / Santa María de Caamaño parish records: https://arquivosdegalicia.xunta.gal/
8. **Bermúdez de Castro lineage** — Detailed 6-gen Villagarcía branch: http://genealogiabermudezdecastro.es/LINAJES-EMPARENTADOS/MOSQUERA-Guimarei-y-Bentraces/CAAMANYO-Senyores-de-Villagarc-a/

### Key Research Docs

- `docs/COMPLETE-LINEAGE.md` — Full 20-generation lineage (medieval + modern + gap analysis)
- `docs/SURNAME-RESEARCH.md` — All sources, URLs, INE data, worldwide distribution, Ecuador/DR branches
- `docs/COMPETITIVE-LANDSCAPE.md` — App strategy and differentiation

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type check
```

## Conventions

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Types: `PascalCase` in `lib/genealogy/types.ts`
- Hooks: `use-*.ts` with `"use client"`
- Server Components by default; `"use client"` only for interactive leaves
- Data mutations are pure functions returning new objects (immutable)

## Key Design Decisions

| Choice              | Rationale                                                          |
| ------------------- | ------------------------------------------------------------------ |
| JSON file           | No DB overhead for personal tool. Easy to version-control, export. |
| d3-zoom             | Industry standard for SVG pan/zoom. Touch + mouse + programmatic.  |
| Leaflet             | Free, no API key, lightweight. Perfect for migration viz.          |
| Zustand             | Minimal boilerplate for tree selection state.                      |
| LCA algorithm       | Standard kinship computation. O(n) with preprocessing.             |
| SVG foreignObject   | HTML-styled person cards inside SVG tree layout.                   |
| Immutable mutations | Pure functions. Easy to test, undo-friendly.                       |

## Current State (v5, 2026-04-03)

- **Data:** Modern family tree with 153 persons, 41 families in committed JSON. Historical/research persons (h001-h021, fs001-fs016, cm001-cm004, gn001-gn006) documented in `docs/` but not yet in app JSON.
- **Code:** Fully functional app — 51 source files, 8 routes, 10,087 lines. All features implemented and working. TypeScript strict, zero errors. Production build passes.
- **UI:** Warm parchment theme (amber palette), family crest shield, gender-coded person nodes, WCAG AA contrast. Responsive.
- **Research:** Deep surname research completed across FamilySearch, INE, PARES, CEMLA, Forebears, García Carraffa, Geneanet. All findings in Historia page + docs/.
- **App strategy:** Differentiated from Ancestry/MyHeritage by "yo soy" identity + WhatsApp-first sharing + migration narrative + path finder. See `docs/COMPETITIVE-LANDSCAPE.md`.
- **Key routes:** `/tree` (main), `/map` (migration), `/historia` (surname research), `/research` (API links), `/add` (form), `/person/[id]` (detail)

### FamilySearch Findings (2026-04-03)

See `docs/FAMILYSEARCH-FINDINGS.md` for full details. Key discovery:

**Pablo Caamaño Villa** (fs003, born 1802, Palmeira, Ribeira — naturaleza: Muros) is the earliest documented Caamaño in the Palmeira/Ribeira area. Marinero, widower. The ONLY "Caamaño Villa" in the entire La Coruña database. His probable son **José Caamaño González** (fs005, born 1833, Lomba, Palmeira) has a fully documented family spanning 6 children across 8+ censuses.

One child is listed as **"José Caamaño Incógnito"** (fs014) — "Incógnito" means unknown second surname, typical of someone who emigrated and whose records were incomplete.

**Parallel line:** Felipe Caamaño (fs015, born ~1820, Sampedro, Palmeira) — same parish as Pablo, possibly brother or son.

**ID scheme:** `fs001`-`fs016` for FamilySearch-sourced persons, `fsf01`-`fsf04` for families.

### CEMLA Emigrant Records (2026-04-03)

100 Caamaño passengers found arriving Buenos Aires 1884-1907. Key name matches:

| ID        | Name               | Born  | Ship              | Port            | Date       | Match                                                                 |
| --------- | ------------------ | ----- | ----------------- | --------------- | ---------- | --------------------------------------------------------------------- |
| **cm001** | **Tomás Caamaño**  | ~1863 | P. de Satrústegui | **Villagarcía** | 1905-01-25 | **Same name as patriarch p001!** With children Amalia (6), Manuel (5) |
| cm002     | José María Caamaño | ~1882 | Nile              | Vigo            | 1897-10-23 | Same name as brother p003                                             |
| cm003     | Felipe Caamaño     | ~1860 | Rosario           | Coruña          | 1899-10-07 | Marinero — same Felipe from census? (fs015)                           |
| cm004     | Salvador Caamaño   | ~1900 | Darmstadt         | Villagarcía     | 1906-12-12 | Same name as brother p004. With Víctor (42) + Antonia (12)            |

**Critical note:** These went to ARGENTINA, not Colombia/DR/Ecuador. But the name pattern (Tomás + José María + Salvador) matching your family's names is striking. Possible: different branches of same extended family emigrating to different countries simultaneously.

### Geneanet Finds (2026-04-03)

380 Caamaño profiles on Geneanet. Key finds added to tree (gn001-gn006):

- **José Vázquez de Caamaño** (gn004, born 1517, Noia) — potential link between noble line and later generations
- **José Romero de Caamaño** (gn006, born 1761, Boiro) — Boiro is across the ría from Porto do Son
- Multiple Caamaños from Mazaricos (bordering Porto do Son) and Carnota (764 surname bearers)

### Census Correction

"José Caamaño Incógnito" (fs014) is a ~2-year-old grandchild in the 1890 census, NOT an emigrant. "Incógnito" = father unknown (illegitimate child of one of José's daughters). Does NOT connect to p001.

**ID scheme:** `cm001`-`cm004` for CEMLA, `gn001`-`gn006` for Geneanet.

## Future Roadmap

See `memory/genealogia-future-plans.md` for 20-feature roadmap:

- WhatsApp OG cards, path finder, GEDCOM export, AI bios, photo colorization, Vercel Blob, FamilySearch API integration, heraldry display, etc.

### Immediate Next Steps

1. **Bridge gap 2** — prove connection between Pablo Caamaño Villa (fs003) / José Caamaño González (fs005) and José Tomás Caamaño (p001). Porto do Son church records (Diocese of Santiago) needed — FamilySearch municipal records don't cover Porto do Son.
2. **Bridge gap 1** — connect Pablo's father (fs001, ~1770, Muros) to medieval noble lines (h019, d. 1540). Muros church records needed.
3. **Contact AHDS** — Archivo Histórico Diocesano de Santiago de Compostela for Santa María de Caamaño parish records
4. **Request civil registration** — Spanish Ministry of Justice (free) for Caamaño births in Porto do Son 1840-1870
5. **Geneanet larapat tree** — 17,919 people from Porto do Son area, may have Caamaño entries
6. **Heraldry display** — show Caamaño coat of arms (azure, 3 bars argent) on the app
7. **Historical branch visualization** — render h001-h021 + fs001-fs016 as "deep roots" in tree
8. **Migration map** — add Spain→Americas routes with actual historical data

### Research Docs

- `docs/COMPLETE-LINEAGE.md` — Full lineage (medieval + FamilySearch + modern + gap analysis)
- `docs/SURNAME-RESEARCH.md` — All sources, URLs, INE data, worldwide distribution
- `docs/FAMILYSEARCH-FINDINGS.md` — Census research, Ribeira/Palmeira clan, Pablo Caamaño Villa
- `docs/COMPETITIVE-LANDSCAPE.md` — App strategy and differentiation
