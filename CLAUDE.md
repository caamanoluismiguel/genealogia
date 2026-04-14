# Genealogía Caamaño — Family Tree Web App

@AGENTS.md

## What This Is

Personal genealogy web app for the Caamaño family. **423 persons, 115 families, ~28 generations** (12th century → present). Traces from **Caamaño, A Coruña, Galicia, España** → Colombia (main branch), Dominican Republic, Ecuador, Argentina, Uruguay, USA, Mexico, Puerto Rico, Cuba.

**Live:** https://caamanoluismiguel.github.io/genealogia/
**Repo:** https://github.com/caamanoluismiguel/genealogia (public)
**Deploy:** GitHub Pages via GitHub Actions (auto on push to main)
**No auth, no database.** Single JSON file is the "database." Static export. Personal tool shared via WhatsApp.

## The Family

- **Origin:** Parish of Santa María de Caamaño, Porto do Son (Comarca de Noya), A Coruña, Galicia, Spain
- **Owner:** Luis Miguel Caamaño = `p151`, father Luis = `p037`, wife Alejandra = `p150`, children Pablo `p152` + María Lucía `p153`
- **Root ancestor in data:** Rodrigo García de Caamaño = `h001` (~1100s, conquest of Baeza)
- **Colombian patriarch:** José Tomás Caamaño = `p001` (born Caamaño, A Coruña → emigrated to Colombia)
- **~20 generations** spanning 12th century to present, across 5 countries
- **"Yo soy" identity system:** `?yo=slug` shareable URLs, welcome modal, localStorage persistence, WhatsApp share

### Data Structure (v38, 2026-04-13)

- **423 persons**, **115 families** — version 38
- **Modern persons:** IDs `p001`-`p179` (modern family, Colombian branch)
- **Historical persons:** IDs `h001`-`h050` (medieval lineage, García Carraffa Tomo XX + Casa de Romelle)
- **FamilySearch persons:** IDs `fs001`-`fs070` (Ribeira/Palmeira + Muros + Noble Ferrol Gayoso-Pardo + Bolívar 1954 + Colombian candidates)
- **PARES persons:** IDs `pa001`-`pa030` (Catastro Ensenada 13 Caamaños + AGI Contratación Muros Luaces chain + AHN OM Caballeros San Juan + Chancillería Valladolid + Inquisición + JARE + AGS)
- **Geneanet persons:** IDs `gn001`-`gn061` (Bazarra-Caamaño Porto do Son, Jacobo Malvarez, Pedro 1712-1767, Tomás Raimundo Agapito PR, Mexican branch Domingo Antonio → José Luis)
- **Galiciana persons:** `fs058` (Joseph Caamaño 1803) + `fs059` (Francisco García presbítero) — via testament 1803 Santa María de Caamaño
- **CEMLA passengers:** IDs `cm001`-`cm007` (Buenos Aires ship manifests — Tomás 1905 family)
- **Genealogías de Colombia:** IDs `gc001`-`gc012` (Juan de Caamaño → Antioquia 1744, Clara 1502, Juana María Bogotá 1689, Ecuador presidential line) — **fs051/fs052/fs053 merged here v36** (1713 Martínez Porrúa = gc005-007)
- **Uruguay:** ID `uy001` (José Caamaño Soto)
- **Gap marker:** ID `gap001`
- **PersonSource types:** `modern | historical | familysearch | cemla | geneanet | genco | ellisisland | uruguay | pares | galiciana | gap`

### The Complete Lineage (honest epistemic state v38)

```
h001: Rodrigo García de Caamaño (1100s, conquest of Baeza)
  └→ 10+ generations documented (García Carraffa Tomo XX + Casa de Romelle)
      └→ h019: García de Caamaño "El Alto" (d. 1540, Señor de Rubianes)
          └→ ⚠ BRECHA 1 (~1540s to ~1700s) — noble → common folk. NOT CLOSED.
              └→ [cluster Muros documented via PARES/AGI but no chain to p001]
                  · pa020 Simón de Luaces y Caamaño ~1660 Muros × María de Solís
                  · pa021 Jacobo Luaces de Caamaño ~1690 Muros × María Fernández de Orgás
                  · pa022 Ignacio de Luaces (~1710 Muros, †Ultramar) — AGI CONTRATACION 5590 N.6
                  · fs054 Juan Antonio Caamaño × fs055 María Fernández (Abelleira, Muros 1758) — IGI
                  · fs056 Juan de Caamaño × fs057 Gándara Lestón (Esteiro, Muros 1771)
                  · fs058 Don Joseph Caamaño (1803 Santa María de Caamaño) — Galiciana testament
                  · fs060 Francisco Caamaño (1831 Abelleira pleito) — ARG Caixa 12625-40
                  · fs062 Benito Caamaño (1837 El Rollo Muros, tutor de nietos)
              └→ p001: José Tomás Caamaño Sr (~1815, tradición oral Sta María de Caamaño → Colombia)
                  ⚠ BRECHA 2 (1700-1815) — NOT CLOSED. No primary source links anyone above to p001.
                  ⚠ p001 himself has ZERO primary documents (baptism, passport, marriage)
                  └→ fs022 Trinidad Caamaño (~1830 Rioviejo, Bolívar) — FIRST documented Caamaño
                  │   × fs023 Damiana Soto (~1825-†1883 Rioviejo) — AHDS burial record 1883
                  │   │  └→ fs029 Emeteria Soto (†<1883) — her illegitimate mother
                  │   └→ fs026 José Tomás Caamaño Soto "el viudo" (~1850, †1891 Rioviejo)
                  │       × fs027 Dolores Castañeda (1st wife, †<1891)
                  │       × fs028 Suzana Muñoz (2nd wife, 1891 in articulo mortis, de Mompós)
                  └→ p006: José Tomás Jr (~1840) — oral tradition
                      └→ p013: Benjamín (~1870)
                          └→ p023: Néstor (1901) ✓ AHDS partida #1055 El Banco
                              └→ p037: Luis (1949) ✓
                                  └→ p151: Luis Miguel (Dec 1983) ✓
```

**EPISTEMIC STATUS v38 (2026-04-13):**

- ✅ **Brecha 0** (modern → Trinidad ~1830) — CLOSED with primary records
- ❌ **Brecha 2** (p001 parents 1700-1815) — NOT CLOSED. Strong candidates in Muros parish, zero proven filiation
- ❌ **Brecha 1** (noble medieval → common s.XVIII) — NOT CLOSED. ~300 year gap in sacramental chain
- ❌ **1713 Muros→Colombia migration** (Martínez Porrúa Caamaño) — DOCUMENTED, NOT LINKED to our line
- The 1803 Galiciana testament (Francisco García presbítero Santa María de Caamaño) confirms parish was active with Caamaño families 12 years before p001's presumed birth
- The AGI Contratación Luaces-de-Caamaño chain (3 gens Muros, 1660-1727) is the first primary-source Caamaño-of-Muros family confirmed, but Luaces is a distinct compound surname

### Pinned Research Actions (updated 2026-04-13, v38)

**Sources EXHAUSTED this session (negative or limited results):**

- ✅ **PARES 6092354** (Catastro Ensenada Sta María de Caamaño) — 13 Caamaños extracted → `docs/PARES-6092354-CAAMANO-REPORT.md`
- ✅ **PARES AGI Contratación / AHN OM / Inquisición / Chancillería Valladolid** — 16 primary-source persons added v38 via curl scrape (bypassed Playwright CAPTCHA)
- ✅ **Galiciana Patrimonio Digital** — 1803 testament Francisco García presbítero Sta María de Caamaño extracted + Real Audiencia sweep (11 candidates, fs060-fs070)
- ✅ **WikiTree API** — 12 Caamaños worldwide, all Carnota (Holmes-11913), dead end
- ✅ **BNE Hemeroteca Digital** — 122k hits, all noise. No mostrencos for our line
- ✅ **Gaceta de Madrid (BOE)** — 56 unique, all collateral (Ferreira Caamaño deputy, Pontevedra mostrencos). Dry well
- ✅ **Chronicling America (LoC)** — 486 hits, dominated by President Caamaño Ecuador + Ramón NYC embezzler. Zero for our line
- ✅ **Ancestry passenger lists** — 3041 hits post-1900, confirms Muros/Carnota/Noia emigration pattern
- ✅ **Consello Cultura Galega Emigración** — 0 item hits, AEG doesn't cover costa Barbanza municipalities
- ⚠️ **Geneanet** — Cloudflare blocking, partial data (larapat tree, panchovilla2018)

**Emails pending OUR action (drafts ready):**

1. **AHDS** (`archivo@ahds.es`) — request sacramental books Sta María de Caamaño 1750-1840. Draft in `docs/AHDS-EMAIL-DRAFT.md`. **HIGHEST LEVERAGE**: single baptism record would close Brecha 2.
2. **ARG** (Arquivo do Reino de Galicia) — request Caixa 12625-40 (Francisco Caamaño 1831 Abelleira pleito) + Respuestas Particulares Catastro originales. Draft in `docs/ARG-EMAIL-DRAFT.md`.
3. **Carlos Mauricio Otálvaro** — Colombian genealogist, email SENT 2026-04-13 with Pedigree Resource File 2024. Awaiting reply.

**Open untapped sources (see `docs/UNTAPPED-SOURCES.md` for full catalog):**

4. **AGN Colombia ArchiDoc** (`consulta.archivogeneral.gov.co`) — Notarías Cartagena + Testamentarías 1700-1900. Requires Playwright.
5. **AHPA Muros/Noia notarial protocols** — semi-public PDF inventory + scans on request.
6. **Google Books** — targeted queries for Restrepo Sáenz, Flórez de Ocáriz, Martínez Reyes snippets.
7. **FamilySearch OAuth API** — register at developers.familysearch.org → automated chain search.
8. **Biblioteca Nacional Colombia hemeroteca** — 19th-century Colombian press, never scraped.
9. **AHPA Noia escribano protocolos 1740-1780** — contratos de obra de canteros Pedro/Andrés Caamaño identificados en PARES 6092354 f.174v.
10. **Xenealoxia.org** — Galician genealogy community forum.
11. **GenCo pay $5** — genealogiasdecolombia.co 583K database.
12. **Wikidata SPARQL** — preliminary test shows dozens of Caamaño hits (verified live).

**Persistent research log:** `docs/CAAMANO-RESEARCH-LOG.md` (master audit trail, append new sessions).

### Research Data Files

- `docs/CEMLA-PARES-RESEARCH.md` — full analysis of CEMLA (100 passengers), PARES (602 records), Genealogías de Colombia (4 lines), FamilySearch (1,844 records)
- `docs/AHDS-EMAIL-DRAFT.md` — ready-to-send email to Santiago diocesan archive
- `research/cemla-caamano-100.json` — 100 CEMLA ship passenger records
- `research/familysearch-caamano-1844.json` — 1,844 FamilySearch records from 18 XLS exports
- `~/Downloads/gen/Caamaño.pdf` — Genealogías de Colombia fascicle (Juan de Caamaño → Bernardo → Antioquia 1744)
- `~/Downloads/gen/*.xls` — 18 FamilySearch XLS exports (raw)

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
│   ├── timeline/page.tsx              # Interactive slide-based timeline (900 years)
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
│   │   ├── person-detail-sidebar.tsx  # Slide-in panel (desktop) / bottom sheet (mobile)
│   │   ├── person-form.tsx            # Add family member form
│   │   ├── suggest-edit.tsx           # Elder-friendly "suggest a change" modal → email
│   │   └── whatsapp-share.tsx         # WhatsApp share button with pre-filled message
│   ├── timeline/
│   │   └── family-timeline.tsx        # Slide-based timeline with century jumps + swipe
│   ├── map/
│   │   ├── migration-map.tsx          # Dynamic import wrapper (SSR-safe)
│   │   └── map-content.tsx            # Data-driven Leaflet map with travelers in popups
│   ├── research/
│   │   ├── historia-page.tsx          # Surname history editorial page (7 sections)
│   │   └── research-dashboard.tsx     # 4-API integration cards
│   ├── layout/
│   │   ├── nav-header.tsx             # App nav with family crest + 7 links (incl Timeline)
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
│   │   ├── research-links.ts          # Deep link generator for FamilySearch/INE/PARES/CEMLA
│   │   └── timeline.ts               # Timeline event extraction from JSON + century helpers
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
    ├── caamano-family.json            # Family tree data (217 persons, 60 families, v7)
    └── migration-routes.ts            # Route definitions, coordinates, country colors, detectCountry()
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

## Current State (v38, 2026-04-13 PM session)

- **Data:** **423 personas, 115 familias, versión 38**. **+82 personas en una sesión** integrando PARES/AGI Contratación, AHN Órdenes Militares, Galiciana (testamento 1803 Sta María de Caamaño), Real Audiencia de Galicia, Real Chancillería Valladolid, Inquisición Córdoba, JARE México, DR Luaces-Caamaño chain de Muros.
- **Código:** TypeScript strict, `npx tsc --noEmit` clean, `npm run build` OK (427 rutas estáticas).
- **Deploy:** commit `9fab5ca` (v38) en main, GitHub Actions verde, sitio live.
- **Brecha 0 (p001 → tú):** ✅ CERRADA con partidas primarias (Néstor partida #1055 El Banco, Damiana Soto defunción 1883 AHDS-Magangué).
- **Brecha 1 (1540-1710 noble→común):** ❌ NO cerrada. ~40% avance (Bernarda de Luces Bazarra, García "El Alto", Depo fondo).
- **Brecha 2 (1700-1815 p001 padres):** ❌ NO cerrada. Strong candidates identificados en costa Barbanza (fs058 Joseph Caamaño 1803 Sta Mª de Caamaño, fs060 Francisco 1831 Abelleira, fs062 Benito 1837 Muros, pa020-pa022 Luaces-Caamaño chain Muros 1660-1727). **Cero enlace sacramental primario a p001.**
- **Migración 1713 Muros→Colombia** (Martínez Porrúa Caamaño × Revola Porrúa Amazur, gc005-gc007): DOCUMENTADA vía AGI Contratación + Pedigree Resource File Otálvaro 2024. **NO establecido parentesco con nuestra línea.** Merged v36 en cluster Genealogías de Colombia ya existente.
- **p001 José Tomás Caamaño Sr:** sin documento primario directo. Existe como construcción narrativa de tradición oral. La evidencia sube la probabilidad del **origen parroquial** (Santa María de Caamaño, Porto do Son) al ~85-90% pero NO prueba al individuo.
- **Fuentes primarias citables nuevas en esta sesión:**
  - **AGI ES.41091.AGI//CONTRATACION,5590,N.6** — Autos bienes difuntos Ignacio de Luaces (Muros, †Ultramar 1727)
  - **AGI ES.41091.AGI//CONTRATACION,5459,N.9** — José Varela Camaño pasajero 1699 → Nueva España
  - **AGI ES.41091.AGI//CONTRATACION,5465,N.1,R.9** — Felipe de Baños + María Jiansa y Caamaño Muros
  - **AHN ES.28079.AHN//OM-SAN_JUAN_DE_JERUSALEN,Exp.23367-23368** — 4 Caballeros de San Juan Caamaño Pardo Gayoso y Copeiro (Ferrol)
  - **AHN ES.28079.AHN//INQUISICIÓN,3730,Exp.42** — Proceso de fe Juan Camaño 1775 Córdoba
  - **ARChV ES.47186.ARCHV//PL CIVILES,PÉREZ ALONSO (F),CAJA 3703,1** — Pleito herencia Matías Caamaño 1773-1807 Fefiñanes
  - **ARG ES.GA.15030.ARG//1.1.1.2.3.1.2.13.//Caixa 12625-40** — Francisco Caamaño 1831 Abelleira (pendiente orden física)
  - **AHUS ES.GA.15078.AHUS/3.6.1.//32** — Testamento Francisco García presbítero 1803 Sta María de Caamaño (Galiciana id 2255405)
- **Reportes/docs generados en esta sesión:**
  - `docs/CAAMANO-RESEARCH-LOG.md` — master research log persistente (append-only)
  - `docs/UNTAPPED-SOURCES.md` — catálogo 34 fuentes libres + top 5 scrape plans
  - `docs/BRIDGING-ANALYSIS.md` — análisis 112 componentes desconectados, 10 propuestas merge
  - `docs/ONOMASTIC-ANALYSIS.md` — top 20 nombres 500 años (José/María/Juan/García dominan)
  - `docs/GENEALOGY-DEEP-ANALYSIS.md` — panel 3 expertos (demográfico + mobility + structural)
- **Nuevas páginas en el sitio:** `/estadisticas` (dashboard research progress) + `/novedades` (changelog v1-v38)
- **Filtros de árbol expandidos:** toggle "Galiciana" agregado al `PersonSource` type + tree-controls
- **Epistemic posture:** honest — las notas de fs051/fs052 (migración 1713) fueron corregidas v35 para quitar overclaims "PATRIARCAS de la rama colombiana", reemplazadas con caveats explícitos.
- **Agentes usados en esta sesión:** ~18 en paralelo (WikiTree, Chronicling America, BNE, Gaceta, Galiciana x3, paleografía x2, UX team, onomástica, 3 expertos, research log, bridging, untapped sources, PARES x3, CCG, Geneanet, research docs). PARES scraping via Playwright murió por CAPTCHA de PARES — sustituido por curl directo sobre `/catalogo/find` que funciona sin auth.

## Estado histórico anterior (v13, 2026-04-05)

- **Data:** 263 persons, 76 families in committed JSON (v13). El Banco, Magdalena confirmed. DR line added. Data integrity: estimates flagged with ~, traditions marked.
- **Code:** 70+ source files, 9 routes, TypeScript strict, zero errors. Static export to GitHub Pages.
- **UI:** Slate/teal palette. Country color-coding + country filter (🇨🇴🇩🇴🇪🇨🇦🇷🇪🇸). Semantic zoom. Cinematic timeline with 7 era moods. Branch index for quick-jump. Mobile bottom sheet. Elder-friendly contribute/suggest flows.
- **Deploy:** GitHub Pages via Actions. Auto-deploys on push to main. ~1 min.
- **Research:** Emails SENT to AHDS (arquivo@ahds.es) + Archivo de Simancas (referencias.ags@cultura.gob.es). Awaiting responses.
- **Colombian parish records:** FamilySearch Film #004001320 — Santa Iglesia del Carmen + Nuestra Señora de la Candelaria, El Banco, Magdalena. 2,531 images, 888 indexed records. Néstor Daniel confirmed (partida #1055, born Jan 2, 1901). Benjamín + Dominga Castro confirmed. 6+ Caamaño branches documented in El Banco.
- **DR line:** Diego José Caamaño y Posé → Ramón (Santiago de Compostela) → Álvaro + Ramiro → DR. Source: marielacaamano.blogspot.com. Connection to p001 unconfirmed.
- **Key routes:** `/tree` (main + country filter + branch index), `/timeline` (cinematic, 7 eras), `/map` (photos + sources), `/historia` (complete rewrite), `/add` (contribute flow with approval), `/person/[id]` (OG + suggest + WhatsApp)

### UX Features Shipped

- **Country filter** — 🇨🇴🇩🇴🇪🇨🇦🇷🇪🇸 flag toggles in tree controls. Tap a country = show only that branch.
- **Branch index** — "🌿 Ramas familiares" panel listing all branches with quick-jump zoom.
- **Semantic zoom** — 3 levels: colored dots (far), compact name+year (mid), full cards (close)
- **Country color-coding** — emerald=Colombia, amber=DR, sky=Ecuador, violet=Argentina, slate=España
- **Cinematic timeline** — 7 era moods (medieval→emigration→modern), watermark years, source badges, collaborative credits footer, gap as mystery
- **Data-driven map** — 11 routes, 6 origin ports, 8 destinations, travelers in popups, real photos of places (church, castle, Pazo, ports), source citations
- **Map origin corrected** — Santa María de Caamaño (42.6556, -9.025)
- **Mobile bottom sheet** — person detail slides up from bottom on phones
- **WhatsApp share** — big green button, pre-filled message with person link
- **Suggest edit** — elder-friendly modal, sends email
- **Contribute flow** — unified "add person / fix info / other" with email approval. No direct writes.
- **PayPal donate** — "🔍 Ayúdanos a encontrar más registros" in nav header
- **OG metadata** — per-person title/description for WhatsApp previews
- **Data integrity** — estimates flagged (~), traditions marked, unverified facts noted
- **Source attribution** — every timeline event shows its archive source

### FamilySearch Findings (updated 2026-04-04)

See `docs/FAMILYSEARCH-FINDINGS.md` for full details.

**Ribeira/Palmeira Clan (2026-04-03):**

- **Pablo Caamaño Villa** (fs003, born 1802, Palmeira/Muros) — earliest documented Caamaño in area. Marinero, widower.
- **José Caamaño González** (fs005, born 1833, Lomba, Palmeira) — probable son of Pablo, fully documented family.
- **Felipe Caamaño** (fs015, born ~1820, Sampedro, Palmeira) — parallel line, possibly Pablo's brother or son.
- **ID scheme:** `fs001`-`fs016` for FamilySearch-sourced persons, `fsf01`-`fsf04` for families.

**Granada Caamaño Cluster (2026-04-04) — NEW:**

- **Juan Becerra Camaño** (~1745, born **Noya, Coruña** → lived Granada) — GAP 1 ERA. Full name reveals maternal surname Becerra. Father was a Camaño from Noya (~1710-1720). Married Francisca Vidal y Ochoa (Granada). Two sons baptized San Matías 1773-1778.
- **Mariana Camano** (d. 1730, Granada, born **Galicia**) — earlier Galician Caamaño in Granada, possibly established the migration pipeline.
- **Antonio Caamano** (born Sevilla, Ourense — Galicia) — son of Francisco Caamaño + Francisca Caamaño (same-surname marriage). Son Emilio born 1843.
- **Juan Manuel Caamaño** — daughter María Matilde born 1833. Possibly grandson of Juan Becerra.
- **Pre-marriage investigation file** for Juan Bezerra Camano exists in Granada diocese — would name his parents + exact Noya parish. **HIGH PRIORITY.**

**Porto do Son Indexed Records (2026-04-04):**

- FamilySearch indexed records for parish of Santa María de Caamaño are **very thin** — mostly poorly transcribed fragments from handwritten registers.
- Notable: Sebastián Camaño appears as father in multiple records. Camaño+Piñero and Camaño+Vidal surname combinations found.
- **AHDS parish registers remain the critical path** for this parish.

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

### Immediate Next Steps (updated 2026-04-04)

**Research (blocking on external responses):**

1. **✅ AHDS email sent** — awaiting response. Follow up mid-April if no reply. Tel: +34 981 58 38 84.
2. **Access Juan Bezerra Camano pre-marriage file** — Granada diocese, FamilySearch. Would name his Noya parents (~1710-1720).
3. **Access Salvador + Dolores Caamano 1640 marriage** — Buenos Aires colonial record, may name Spanish parish.
4. **Catastro de Ensenada (1752)** — email Archivo de Simancas for Santa María de Caamaño household census.

**Technical (can do now):** 5. **FamilySearch API integration** — register at developers.familysearch.org → build automated search script to chain baptism records backward through the gap. OAuth 2.0, free. 6. **Historical branch visualization** — render h001-h021 + fs001-fs016 + Granada cluster as "deep roots" in tree 7. **Heraldry display** — show Caamaño coat of arms (azure, 3 bars argent) 8. **Migration map** — add Spain→Americas routes with historical data

### Gap Status (2026-04-04)

- **Gap 2 (Pablo ↔ José Tomás):** ~80% closed. One baptism record away. AHDS response will likely close it.
- **Gap 1 (Noble → Common, 1540-1770):** ~20%. Scattered data points (Juan Becerra ~1745, Mariana Camano d.1730, Juo Caamaño 1700) but no chain. Best case with AHDS: push back to ~1650. Catastro de Ensenada (1752) is the wildcard.
- **Verified unbroken chain:** 6 generations, Luis Miguel (1983) → José Tomás Sr (~1815).
- **Goal:** Extend unbroken chain as far back as parish records allow (~1600-1700 best case).

### Research Docs

- `docs/COMPLETE-LINEAGE.md` — Full lineage (medieval + FamilySearch + modern + gap analysis)
- `docs/SURNAME-RESEARCH.md` — All sources, URLs, INE data, worldwide distribution
- `docs/FAMILYSEARCH-FINDINGS.md` — Census research, Ribeira/Palmeira clan, Granada cluster, Porto do Son assessment
- `docs/COMPETITIVE-LANDSCAPE.md` — App strategy and differentiation
