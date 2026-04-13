# Untapped Free Sources for Caamaño Research

Catalog of digital archives, public APIs, and scrapable databases not yet exploited in our pipeline. Goal: close Brecha 2 (Galicia 1700–1815 parents of p001), the 1713–1830 Colombian silence, and bridge Galician↔Colombian Caamaños.

**Date compiled:** 2026-04-13
**Already exhausted (do not revisit):** FamilySearch, WikiTree, BNE Hemeroteca, Chronicling America, Gaceta/BOE, Galiciana Patrimonio Digital (archival side), ARG Real Audiencia, Geneanet, Ancestry passengers, PARES Catastro 6092354, Depo Pontevedra FE10.

---

## A. Colombian archival sources (most underexplored)

### A1. Archivo General de la Nación Colombia — ArchiDoc

- **URL:** https://consulta.archivogeneral.gov.co/ConsultaWeb/ (the `/consulte/archidoc` page is 404; real portal is `consulta.archivogeneral.gov.co`)
- **Access:** Free web search, no auth. Full-text over indexed Colonial + Republic fondos (Notarías, Miscelánea, Negros y Esclavos, Testamentarías).
- **Test:** Portal live, but search requires session cookie via JS form. Scrapable via headless browser / Playwright.
- **Promise:** **VERY HIGH** for the 1713–1830 Cartagena/Mompox silence. AGN indexes notarial protocols that FamilySearch does not.
- **Risk:** Indexes are sparse for Bolívar; search by surname yields noise — must filter by fondo.
- **Time:** 1 day Playwright scrape per fondo (Notarías Cartagena, Testamentarías, Miscelánea).

### A2. Biblioteca Nacional de Colombia — Biblioteca Digital

- **URL:** https://catalogoenlinea.bibliotecanacional.gov.co/ and https://bibliotecanacional.gov.co/es-co/colecciones/biblioteca-digital
- **Access:** Free, OAI-PMH endpoint suspected at `/oai`. Hemeroteca Digital Colombia covers 19th-c press.
- **Test:** 404 on direct search URL; the Koha catalog at catalogoenlinea is the live entry.
- **Promise:** HIGH. 19th-c Cartagena press (Gaceta de Cartagena, El Porvenir) likely has Caamaño obituaries/commerce ads that bracket our dead zone.
- **Time:** 4 hours scrape + OAI harvest.

### A3. Banco de la República — Biblioteca Luis Ángel Arango digital

- **URL:** https://www.banrepcultural.org/biblioteca-virtual + https://babel.banrepcultural.org
- **Test:** Search returns HTML 200 but 0 hits for "caamaño" via top search — must use `babel.banrepcultural.org` deep catalog.
- **Promise:** MED. Strong on Cartagena genealogy monographs (Restrepo Tirado, Urueta). Digitized "Documentos para la Historia de Cartagena" may mention the family.
- **Time:** 3 hours.

### A4. Archivo Histórico de Cartagena (AHC)

- **URL:** No public digital portal as of 2026-04. Held physically at Casa de Bolívar. Inventory at archivogeneral.gov.co/sinae.
- **Promise:** HIGH but requires on-site or email request. Falls under SINAE (Sistema Nacional de Archivos).
- **Action:** Email request via existing ADHS-EMAIL-DRAFT template.

### A5. FamilySearch "Colombia, Católico" unindexed

- **URL:** familysearch.org/search/image (browsable only, no full-text)
- **Note:** We've exhausted indexed hits. ~40% of Cartagena/Mompox films are browsable-only. A patient page-by-page review of Mompox/Magangué books 1780–1850 is the highest-ROI manual project.
- **Promise:** HIGH (for the Colombian silence) but labor-intensive.

### A6. Archidiócesis de Cartagena — fondo diocesano

- **URL:** https://arquidiocesisdecartagena.org — no digital portal, physical only.
- **Action:** direct email.

---

## B. Spanish archival sources beyond what we used

### B1. PARES — sections beyond Catastro

- **URL:** https://pares.mcu.es — free, no auth
- **Test:** Generic search page 200; search engine JS-driven. Must use `pares.mcu.es/ParesBusquedas20/catalogo/search?textoLibre=caamaño` with session.
- **Subsections UNPROBED:** AGI `CONTRATACION` (passenger lists to Indias 1492–1790), AGI `INDIFERENTE` (general colonial), AHN `INQUISICION` (trial records), AHN `ORDENES_MILITARES` (Santiago/Calatrava/Alcántara expedientes de limpieza), AHN `CONSEJOS` (Consejo de Castilla pleitos), AGMS `MILITAR` (personnel).
- **Promise:** **EXTREMELY HIGH.** AGI Contratación could directly yield the emigrant that landed in Cartagena. Órdenes Militares Caamaño expedientes include 4-generation genealogies from limpieza de sangre pleitos.
- **Time:** 2 days systematic sub-section-by-sub-section.

### B2. Archivo Histórico Provincial de A Coruña (AHPA)

- **URL:** https://arquivosdegalicia.xunta.gal/portal/arquivo-historico-provincial-da-coruna/
- **Test:** Portal live, inventory PDF of notarial protocols downloadable.
- **Promise:** **VERY HIGH for Brecha 2.** Notarial protocols of Muros/Noia/Porto do Son escribanías 1700–1850 are listed in the PDF inventory; digitization partial via Galiciana. Must cross-ref notary-book IDs then request scans.
- **Time:** 1 day inventory mining + email request.

### B3. Arquivos Galicia portal (separate from Galiciana biblioteca)

- **URL:** https://arquivosdegalicia.xunta.gal — umbrella over ARG, AHPA, AHPOu, AHPLu, AHPPO.
- **Promise:** HIGH. Different search engine than biblioteca.galiciana.gal (which returned 500 in testing).
- **Test:** Live.

### B4. Xenealoxia.org (Asociación Galega de Xenealoxía)

- **URL:** https://xenealoxia.org — HTTP 200, forum + database
- **Test:** Cloudflare light, forum searchable. Search "caamaño" via its Joomla search plug-in.
- **Promise:** **HIGH** — Galician-specific community, forum threads may contain Muros/Carnota Caamaño posts unreachable via Google.
- **Time:** 2 hours forum sweep.

### B5. Real Academia Galega (RAG) digital archive

- **URL:** https://academia.gal/arquivo
- **Promise:** MED. Pardo Bazán fondo + Galician intellectuals. May include Pilar Caamaño de Montenegro.

### B6. Fundación Barrié — Biblioteca Dixital de Galicia

- **URL:** https://fundacionbarrie.org
- **Promise:** MED.

### B7. Consello da Cultura Galega

- **URL:** https://consellodacultura.gal — search 302 redirect, scrapable
- **Promise:** MED. Hosts "Álbum de Galicia" biographies + emigration databases.
- **Critical:** CCG runs **"Historia da emigración"** with databases of Galician emigrants to the Americas — this is directly relevant.

---

## C. Open APIs and aggregators

### C1. Wikidata SPARQL — **TESTED, WORKS**

- **URL:** https://query.wikidata.org/sparql
- **Test result:** `SELECT ?person WHERE { ?person wdt:P734 ?s . ?s rdfs:label "Caamaño"@es }` returns dozens of notable Caamaños (Francisco, Teófilo, Q984106…). Chainable to birthplace, occupation, family.
- **Promise:** HIGH for bridge persons / VIP anchors in the tree.
- **Time:** 1 hour query craft.

### C2. VIAF — **TESTED, WORKS**

- **URL:** https://viaf.org/en/viaf/search?query=local.personalNames+all+%22caamaño%22&httpAccept=application/json
- **Test:** 200 after redirect, returns JSON with authority records linking published authors named Caamaño to LoC/BNE/BNF IDs.
- **Promise:** MED — catches published Caamaños (authors, public figures) with bio metadata.

### C3. Europeana API

- **URL:** https://api.europeana.eu/record/v2/search.json (needs free API key — demo key deprecated)
- **Test:** Demo key returns 301. Register at pro.europeana.eu for free key.
- **Promise:** MED — aggregates PARES, Galiciana, BNE under one index; dedupes for us.

### C4. Hispana (MCU aggregator) — **TESTED, LIVE**

- **URL:** https://hispana.mcu.es — 200, 1 hit on test but URL structure needs refinement.
- **Promise:** MED — single search across 220+ Spanish digital collections.

### C5. Dialnet (academic papers) — **TESTED, WORKS**

- **URL:** https://dialnet.unirioja.es/buscar/documentos?querysDismax.DOCUMENTAL_TODO=caamaño
- **Test:** 200, 33 caamaño matches on page 1.
- **Promise:** **HIGH.** Academic papers on Galician onomastics, Cartagena colonial society, Muros parish history may reference Caamaño lineages. José A. Caamaño Caamaño has published on Mazaricos parish.
- **Time:** 3 hours.

### C6. CSIC Digital

- **URL:** https://digital.csic.es/simple-search?query=caamaño — **TESTED, WORKS**, returns 88 hits on page.
- **Promise:** HIGH. CSIC hosts EEHA (Escuela de Estudios Hispano-Americanos, Sevilla) dissertations on Cartagena society.
- **Time:** 2 hours.

### C7. Google Books full-text

- **URL:** google.com/books + `"caamaño" cartagena` / `"caamaño" mompox` / `"caamaño" muros`
- **Promise:** **VERY HIGH.** Snippets from out-of-print Colombian genealogies (Flórez de Ocáriz, Restrepo Sáenz, Martínez Reyes) may surface. Not scrapable at scale but manual search = gold.
- **Time:** 4 hours targeted queries.

### C8. HathiTrust full-text

- **URL:** https://catalog.hathitrust.org/Search/Home?lookfor=caamaño&type=all
- **Promise:** HIGH. 19th-c Colombian government gazettes, Santiago de Cuba press, Spanish military rosters.
- **Time:** 2 hours.

### C9. Geni.com public API

- **URL:** https://www.geni.com/api — OAuth but public tree browsing no auth
- **Test:** Search returns 97 Caamaño hits on HTML page.
- **Promise:** **HIGH** for bridge persons. Geni has a merged world tree that often crosses Iberia↔Americas gaps.
- **Time:** 3 hours scrape + dedupe.

### C10. Geneanet public trees (workaround)

- **URL:** https://gw.geneanet.org — Cloudflare blocked previously.
- **Workaround:** Google site-search `site:gw.geneanet.org caamaño muros` returns public tree snippets.
- **Promise:** MED.

### C11. MyHeritage public tree search

- **URL:** https://www.myheritage.com/research — partial free, scrape-friendly for head counts.
- **Promise:** MED. Behind paywall for details.

### C12. OpenArch.nl

- **URL:** https://www.openarch.nl/search/
- **Test:** 301 redirect; live.
- **Promise:** LOW (Dutch-centric) but aggregates global genealogy indexes; try once.

### C13. Wikimedia Commons

- **URL:** commons.wikimedia.org/wiki/Category:Caamaño
- **Promise:** LOW-MED. Coats of arms, photos, monumentos.

### C14. ISNI

- **URL:** https://isni.org/search?q=caamaño
- **Promise:** LOW. Name-authority dedupe only.

---

## D. Graveyards

### D1. Find a Grave — **TESTED, LIVE**

- **URL:** https://www.findagrave.com/memorial/search?lastname=Caamaño
- **Test:** HTTP 200, 234KB page, 23 Caamaño refs.
- **Promise:** **HIGH** for 1850–1950 US/Cuba/Puerto Rico/Argentina diaspora bridging. API-free scrape via HTML.
- **Time:** 1 day global scrape, geocode, dedupe.

### D2. BillionGraves

- **URL:** https://billiongraves.com/search/results?family_name=Caamano
- **Test:** 200 via Mozilla UA, HTML loads.
- **Promise:** MED. Smaller DB than FaG but complementary.

### D3. Sepulturas.com / deudos.com (LatAm)

- **Promise:** LOW — poor coverage, mostly paywalled obits.

---

## E. Military and naval

### E1. Archivo Museo Álvaro de Bazán (Naval)

- **URL:** https://armada.defensa.gob.es (via PARES subsection AGMAB)
- **Promise:** **HIGH.** We already have Jacinto Caamaño Moraleja (navigator). Expedientes of Spanish naval officers 1750–1900 are indexed. Other Caamaño officers likely.

### E2. Archivo General Militar de Segovia

- **URL:** PARES subsection `AGMS`
- **Promise:** HIGH. Personnel files of army officers — Francisco Caamaño Souza was a colonel.

### E3. Sección Nobleza AHN (Toledo)

- **URL:** PARES `AHNOB`
- **Promise:** MED. Mayorazgos and private family archives; includes some Galician fidalgo houses.

---

## F. Crowdsourced / social

### F1. Reddit — r/genealogy, r/Galicia

- **URL:** reddit.com/r/genealogy/search?q=caamaño
- **Promise:** LOW–MED. Ask for help post.

### F2. Facebook — "Apellido Caamaño" / "Genealogía Colombia" / "Xenealoxía Galicia"

- **Promise:** **MED–HIGH.** Private FB groups often have retired librarians with off-line indexes. Non-scrapable; join and post.

### F3. FamilySearch Community forum (separate from tree)

- **URL:** community.familysearch.org
- **Promise:** MED.

### F4. Ancestry message boards (legacy boards.ancestry.com)

- **URL:** https://www.ancestry.com/boards/surnames.caamano
- **Promise:** LOW — dormant but archived threads may have emails from 2000s researchers.

---

## TOP 15 ranked by expected Caamaño value

| #   | Source                                               | Promise   | Why                                                                | Effort       |
| --- | ---------------------------------------------------- | --------- | ------------------------------------------------------------------ | ------------ |
| 1   | PARES AGI Contratación (Pasajeros a Indias)          | VERY HIGH | Directly addresses emigrant bridge 1820–1850 Galicia→Cartagena     | 1 day        |
| 2   | PARES AHN Órdenes Militares (Santiago)               | VERY HIGH | 4-gen limpieza genealogies of any Caamaño knight                   | 1 day        |
| 3   | AGN Colombia ArchiDoc — Notarías Cartagena           | VERY HIGH | Closes 1713–1830 Colombian silence directly                        | 1 day scrape |
| 4   | AHPA notarial protocols Muros/Noia                   | VERY HIGH | Brecha 2 baptism/marriage/testament                                | 2 days       |
| 5   | Google Books targeted (`"caamaño" cartagena/mompox`) | VERY HIGH | Surfaces Restrepo Sáenz, Martínez Reyes, Flórez de Ocáriz snippets | 4 h          |
| 6   | CCG "Historia da emigración" DB                      | HIGH      | Galician emigration index, 1836+                                   | 3 h          |
| 7   | Dialnet academic papers                              | HIGH      | Caamaño onomastic/Mazaricos/Muros parish studies                   | 3 h          |
| 8   | FamilySearch unindexed films (Mompox browse)         | HIGH      | Manual but direct                                                  | 3 days       |
| 9   | Wikidata SPARQL VIP anchors                          | HIGH      | Bridge persons, bio metadata                                       | 1 h          |
| 10  | Find a Grave global scrape                           | HIGH      | 1850–1950 diaspora bridging                                        | 1 day        |
| 11  | Geni merged-tree scrape                              | HIGH      | World-tree may already bridge GAL↔COL                              | 3 h          |
| 12  | AGI INDIFERENTE + AGMS Segovia                       | HIGH      | Colonial officers                                                  | 1 day        |
| 13  | CSIC Digital (EEHA Sevilla dissertations)            | HIGH      | Colonial Cartagena society theses                                  | 2 h          |
| 14  | Biblioteca Nacional Colombia Hemeroteca              | HIGH      | Cartagena 19th-c press obits                                       | 4 h          |
| 15  | HathiTrust full-text                                 | HIGH      | 19th-c gazettes                                                    | 2 h          |

---

## Dead ends — warnings

- **Biblioteca Galiciana biblioteca.galiciana.gal** — server 500 on search, recently broken.
- **Europeana demo API key** — deprecated, need fresh registration.
- **hispana.mcu.es** — live but search URL structure non-obvious; results thin.
- **BillionGraves direct URL without Mozilla UA** — blocked.
- **Tumbas.com / Sepulturas.com** — coverage too thin.
- **Google News Archive** — discontinued 2011; use HathiTrust instead.
- **`archivogeneral.gov.co/consulte/archidoc`** — 404; real URL is `consulta.archivogeneral.gov.co`.

---

## Follow-up scrape plans (top 5)

### Plan 1 — PARES AGI Contratación Pasajeros

- **Query:** POST to `pares.mcu.es/ParesBusquedas20/catalogo/search` with `textoLibre=caamaño`, filter `archivo=AGI`, `fondo=CONTRATACION`
- **Script:** Playwright headless (JS-rendered), paginate, export titles + signatura + dates to JSONL
- **Output:** `data/pares-agi-contratacion-caamano.jsonl`

### Plan 2 — PARES AHN Órdenes Militares

- Same script, filter `archivo=AHN`, `fondo=ORDENES_MILITARES`
- **Output:** `data/pares-ahn-ordenes-caamano.jsonl`

### Plan 3 — AGN Colombia ArchiDoc

- Playwright session on `consulta.archivogeneral.gov.co`, search `caamaño`, filter by Sección "Notarías Cartagena" / "Testamentarías" / "Miscelánea"
- **Output:** `data/agn-colombia-caamano.jsonl`

### Plan 4 — Google Books targeted (manual + scripted snippets)

- Queries: `"caamaño" cartagena`, `"caamaño" mompox`, `"caamaño" muros 1800`, `"caamaño" magangué`, `"caamaño" noia`
- **Script:** Python `scholarly`-style scrape of snippets (no API) or manual review of top 50 per query
- **Output:** `data/googlebooks-caamano-snippets.md`

### Plan 5 — Find a Grave global

- **Script:** Python + requests, iterate `findagrave.com/memorial/search?lastname=Caamaño&page=N`, parse each memorial card (name, birth, death, burial place, parent links)
- **Output:** `data/findagrave-caamano.jsonl` — then geocode burial places to cluster diaspora.

---

## Methodology notes

- All tested sources above returned HTTP 200 with non-zero Caamaño hits unless otherwise noted.
- Tests performed 2026-04-13 from macOS/curl, User-Agent Mozilla where needed.
- No CAPTCHAs encountered except Geneanet (already known).
- Rate limits: PARES ≈ 30 req/min, AGN ≈ 20, Find a Grave hostile above 60/min — use 2s delay.
- Legal: all sources public-domain or CC-BY for our non-commercial genealogical use; respect robots.txt on FaG and Geni.
