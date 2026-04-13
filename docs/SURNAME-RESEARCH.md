---
name: Caamaño Surname Research
description: Etymology, origins, heraldry, migration patterns, and free genealogy APIs for the Caamaño surname. Galician origin, A Coruña.
type: project
---

# Caamaño Surname Research (2026-04-03)

## Etymology

- **Galician surname** (NOT Castilian)
- From medieval **Camaño** ← Latin **Camanius** or toponym **Camanium**
- Celtic root _cam-_ = "curved/crooked" — common in Galician toponymy
- Double "a" reflects Galician phonetic evolution (lost intervocalic consonant)
- Likely **toponymic** (place-derived), not occupational or patronymic

## Geographic Origin

- **Province:** A Coruña, Galicia, Spain
- Concentrated in: Betanzos, Pontedeume, Ferrol, Santiago area
- Earliest documented solar: **Tierra de Betanzos** (Ría de Betanzos, Mandeo river valley)
- **Torre de Caamaño** — traditional ancestral manor house in Betanzos area

## Heraldry

- Most common: **Azure (blue), three bars argent (silver)**
- Variant: bordure gules (red) with eight saltires or (gold)
- Secondary branch: gold field, green tree, wolf/boar at base
- Source: García Carraffa _Diccionario Heráldico y Genealógico_
- **Caveat:** Arms belong to specific lines, not all surname bearers

## Notable Historical Figures

- **Francisco Alberto Caamaño Deñó** (1932-1973) — Dominican revolutionary, led 1965 Constitutionalist revolt, briefly president. US invaded DR partly in response. Killed 1973.
- **José María Plácido Caamaño** (1838-1901) — **President of Ecuador** (1884-1888), from Guayaquil
- **Ángel Caamaño** (1861-1927) — Spanish journalist, "El Barquero"

## Migration Patterns (Galicia → Americas)

1. **Colonial (1500s-1700s):** Hidalgos/clergy → Ecuador (Audiencia de Quito), Dominican Republic, New Granada (Colombia)
2. **19th century (1850s-1900s):** Galician poverty + minifundio → Argentina (#1), Cuba (#2), Colombia via Barranquilla
3. **20th century (1900-1960):** Civil War + Franco → Argentina, Venezuela, Colombia, DR

- Family pattern (A Coruña → CO main, DR, EC, AR) = classic Galician diaspora

## Free APIs for Genealogy

| API                     | Free?      | Auth         | Best For                                                  |
| ----------------------- | ---------- | ------------ | --------------------------------------------------------- |
| **FamilySearch**        | Yes        | OAuth 2.0    | Parish records, civil registration, immigration. LARGEST. |
| **WikiTree**            | Yes        | API key      | Collaborative world tree, sourced data                    |
| **Geni.com**            | Partial    | OAuth 2.0    | Existing Caamaño trees ($13/mo for full)                  |
| **PARES** (Spain gov)   | Yes        | Free reg     | Colonial admin, emigration, Inquisition records           |
| **Arquivo de Galicia**  | Yes        | None         | A Coruña parish records (baptisms, marriages, burials)    |
| **CEMLA** (Argentina)   | Yes        | None         | Ship passenger lists Buenos Aires 1882-1960               |
| **INE.es**              | Yes        | None         | Surname frequency/distribution in Spain                   |
| **Forebears.io**        | Basic free | None         | Worldwide surname distribution maps                       |
| **IPUMS International** | Yes (reg)  | Registration | Census microdata (CO, EC, AR, DR, ES)                     |
| **Galiciana**           | Yes        | None         | Digitized Galician historical documents                   |

### FamilySearch API (Best Starting Point)

- URL: https://www.familysearch.org/developers/
- Docs: https://www.familysearch.org/developers/docs/api/
- Relevant collections: Spain parish records, Colombia civil reg, Argentine immigration, Ecuador church records

### Research Priority Order

1. FamilySearch — A Coruña parish records + Colombian civil registration
2. INE.es — Confirm surname concentration in A Coruña
3. PARES — Colonial emigration records
4. CEMLA — Argentine ship manifests
5. WikiTree/Geni — Existing Caamaño trees
6. Arquivo de Galicia — Betanzos/Pontedeume parish records

## CEMLA Deep Dive (2026-04-03)

**100 Caamaño passengers** to Buenos Aires, 1884-1907. Full data: `research/cemla-caamano-100.json`

### Key Finds

- **TOMAS CAAMANO** — age 42, married, jornalero. Ship P. de Satrústegui, arrived 25 Jan 1905 from VILLAGARCÍA. Traveling with children Amalia (6) + Manuel (5). Born ~1863.
- **JOSE MARIA CAAMANO** — age 15, labrador. Ship Nile, 23 Oct 1897 from Vigo. Born ~1882.
- **SALVADOR CAAMANO** — age 6, with Victor (42) + Antonia (12). Ship Darmstadt, 12 Dec 1906 from Villagarcía.
- 9+ family groups identified (same ship+date). See `docs/CEMLA-PARES-RESEARCH.md`.
- Departure ports: Coruña (35), Villagarcía (33), Vigo (20), Carril (5) — Villagarcía+Carril = 38% from Ría de Arousa zone.

## PARES Analysis (2026-04-03)

**602 records**, 1600-1900. First 100 analyzed. Key categories:

### CONTRATACIÓN (emigration licenses to Americas)

- Salvador Varela Caamaño (1687 + 1690) — EARLIEST emigrant, 2 licenses
- Antonio José de Mendoza Caamaño y Sotomayor (1735) — noble line
- Juan Antonio García de Caamaño (1776)
- José Leys Caamaño (1776)
- Francisco Javier Romay y Caamaño (1768)

### Inquisition (4-generation family trees)

- Baltasar de Mendoza Caamaño y Sotomayor (1680)
- Felipe de Caamaño y de Ocampo (1681)
- Felipe Caamaño de Ocampo + María Patiño (1699)

### Hidalguía lawsuits (5+ generation lineages)

- Domingo Antonio Caamaño Sotomayor y Figueroa — San Vicente de Cespón (15km from Noia), 1758
- Fernando García Fernández de Caamaño — San Miguel de Couso (20km from Noia), 1704

### Santa María de Caamaño parish

- Tax/property record 1761 (possibly Catastro de Ensenada) — lists every household in the surname's origin parish near Noia

## Genealogías de Colombia (2026-04-03)

PDF from www.genealogiasdecolombia.co (Fidel Botero Arango, 565K persons DB). 4 Caamaño lines:

### Line 1: Juan de Caamaño → Antioquia (MAIN COLOMBIA LINE)

1. **+JUAN DE CAAMAÑO** (Villa de Muros, A Coruña) m. +María Alfonso Martínez (Muros)
2. **+Luis de Caamaño Martínez** (b. 11 Sep 1647, Muros) m. 1682 +María Oáñez de Patiño
3. **+Juan Matías Martínez Perrúa y Caamaño** (b. 21 Feb 1681, Muros) m. 1713 +Antonia de Relova Perrúa y Amúzar
4. **Bernardo Martínez Y Perrúa** (b. 19 Aug 1720, Muros — d. 17 Feb 1788, Santa Fe de Bogotá). **Arrived Santa Fe de Antioquia 1744.** 8 children.

### Line 2: Clara de Caamaño de Mendoza (noble, b. 1502 Rubianes/Pontevedra)

Married Marqués De La Sierra De Outes (near Noia). Son: Cristobal Mariño De Lobeira (b. 1517, Santiago).

### Line 3: David Pontón Caamaño — married Julia de la Hortúa López

### Line 4: Juana María Caamaño Y Vega — 5 children in Bogotá 1689-1705

## FamilySearch XLS Data (2026-04-03)

**1,844 unique records** across 18 XLS exports. Full data: `research/familysearch-caamano-1844.json`

Top collections: La Coruña Municipal (1,332), Civil Records (136+20), Ellis Island (47), Uruguay passengers (28).
Top birth places: A Coruña (38), Ferrol (27), Ribeira (16), Betanzos (12), Muros (9), Noia (9), Palmeira (8).

## Colombian Parish Records CONFIRMED (2026-04-04)

**FamilySearch Film #004001320** — Santa Iglesia del Carmen, El Banco, Magdalena, Colombia. **2,531 images.**

Confirmed records:

- **Partida #1055:** Néstor Daniel Caamaño Castro, born 2 January 1901, son of Benjamín Caamaño and Dominga Castro
- **Partida #424:** Benjamín (son), baptized May 1896, son of Benjamín Caamaño and Dominga Castro
- Church: Santa Iglesia del Carmen, El Banco, Magdalena
- FamilySearch ARK: ark:/61903/3:1:3QS7-89ZR (baptism images)

**Action: Mine the remaining 2,500+ images** — search for all Caamaño entries in this film. Will contain marriages, deaths, and more baptisms.

## Critical Finds from Deep FamilySearch Analysis (2026-04-03)

- **Jose Caamano SOTO** (b.1889, Uruguay passenger list) — Caamaño+Soto surname combo matches patriarch José Tomás Caamaño who married Desconocida **Soto**. Confirms the family.
- **Bernardo Caamaño** (Betanzos) married Juana **Prieto** — connects to Bogotá Caamaño-Prieto line (1689-1705).
- **3 Tomás Caamaños** found (b.1845, 1847, 1852) — same generation as patriarch's possible sons.
- **Ramon Caamano** from Muro, Porto do Son — only record actually in Porto do Son municipality.
- **47 Ellis Island** + **28 Uruguay** passengers — Caamaños emigrated to USA and Uruguay, not just Argentina/Colombia.
- **Santiago Caamano Caamano** (b.1869, Uruguay) — both surnames Caamaño = intra-family marriage.

## Caamaño-Flores-Stagg Family Tree (Ecuador)

Image: `~/Downloads/gen/Figura-1-Arbol-genealogico-de-la-familia-Caamano-Flores-Stagg.png`

- **Jacinto Caamaño** → sons José María + Jacinto Ignacio
- José María → **José María Plácido Caamaño** (President of Ecuador 1884-1888)
- Jacinto Ignacio → married Francisca (daughter of **Juan José Flores**, 1st President of Ecuador)
