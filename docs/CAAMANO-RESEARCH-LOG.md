# Caamaño Research Log

> **Master persistent record of the Caamaño Galicia → Colombia genealogy investigation.**
> Created 2026-04-13. Project: `/Users/luismiguelcaamano/projects/genealogia`.

---

## HOW TO USE THIS LOG

This file is the **single canonical, append-only record** of all multi-source genealogy research on the Caamaño family line (Galicia, Spain → Cartagena/Nueva Granada → Colombia, 18th–20th centuries). It exists because parallel research sessions produce far more detail than fits in working memory, and the user has explicitly stated: **"nada de esto se puede perder."**

Rules for future sessions:

1. **NEVER overwrite.** Always APPEND a new dated `## Section: Session YYYY-MM-DD — <title>` block at the bottom.
2. **NEVER summarize away detail.** URLs, archival references, image IDs, record IDs, and even negative findings must be preserved verbatim. A "noise" hit today may turn out to be a key thread tomorrow.
3. **Cross-reference `/tmp/` artifacts by exact filename.** Many agent runs leave behind raw JSON, downloaded JPGs, OCR text, and shell scripts. List them at the end of every session so the next session can recover them (or re-run the script if `/tmp/` was purged).
4. **Always update epistemological assessment.** Each session should explicitly state: prior confidence in the central hypothesis (Caamaño origin = Santa María de Caamaño parish, Porto do Son, A Coruña, ~1815) → posterior confidence after the session.
5. **Action items ≠ done.** Carry forward unfinished items every session until they're checked off here.
6. **Tree state.** Every session must record the resulting `version`, persons count, families count, new IDs, and latest commit hashes.

The reader of the _most recent section only_ should still be able to (a) understand current state, (b) recover any earlier finding via the section index below, and (c) continue the work without re-discovering anything.

### Section Index

- Session 2026-04-13 — Multi-source deep dive (8 parallel agents)

---

## Section: Session 2026-04-13 — Multi-source deep dive

**Tree before:** v31, ~402 persons, ~110 families, prior confidence ~40 % that Santa María de Caamaño parish in Porto do Son is the documented origin of _José Tomás Caamaño Sr_ (`p001`, presumed ~1815).

**Tree after:** v32, **415 persons, 111 families**, posterior confidence **~85–90 %** for the parish of origin (still unproven for `p001` as a specific individual). Latest commits: `93c98dd`, `9e81c56`.

This session ran **eight specialized research agents in parallel** against complementary primary-source archives, then consolidated everything into the family tree and into this log. Session date: 2026-04-13.

---

### 1. Agentes lanzados (audit trail)

| #   | Agent / mission                                                                              | Status     | Key deliverables                                                                                                                      | Files in `/tmp/`                                                                                                                                                                                                                                                               |
| --- | -------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **WikiTree API sweep** — every Caamaño profile worldwide, look for Colombian bridge          | completed  | 13 profiles, all rooted in Carnota parish, zero Colombia link → contact Holmes-11913                                                  | `wikitree-caamano-{1..4}.json`, `wikitree-caamano-father.json`, `wikitree-caamano-mgr.json`, `wikitree-caamano-p17.json`, `wikitree-co.json`, `wikitree-mgr2.json`, `wikitree-rel.json`                                                                                        |
| 2   | **Galiciana — testamento 1803 Francisco García paleography**                                 | completed  | Identification of Don Joseph Caamaño as vecino of Santa María de Caamaño in 1803; 5 of 8 pages OCR'd; image IDs for remaining 3 pages | `galiciana-testament-1803-francisco-garcia-p{1..8}.jpg`                                                                                                                                                                                                                        |
| 3   | **Galiciana deep sweep — Real Audiencia + testamentos + escribanos**                         | completed  | 14 query slices, ~2338 unique records harvested; 11 priority Caamaño candidates fs060–fs070                                           | `galiciana-caamano.html`, `galiciana-caamano-fullsweep.json`, `galiciana-caamano-hits.json`, `galiciana-caamano-analyzed.json`, `galiciana-sweep.js`, `galiciana-analyze.js`, `galiciana-page1.html`, `galiciana-record.html`, `galiciana-grupo.html`, `galiciana-cookies.txt` |
| 4   | **BNE Hemeroteca Digital sweep** — Spanish historical press for Caamaño + emigration markers | completed  | 14 queries; 6 priority hits OCR'd; all proved noise except 1 side lead (Antonio Caamaño Aduana de Arroyo PR 1867)                     | `bne-*` (~60 files: HTML pages, query result snapshots, OCR text, headers, runlogs, scrapers `bne-hemeroteca-and.sh`, `bne-hemeroteca-search.sh`)                                                                                                                              |
| 5   | **Chronicling America (US Library of Congress) sweep**                                       | partial    | Scrapers staged, OCR pipeline ready; results pending verification                                                                     | `chronicling-caamano-fetch.sh`, `chronicling-caamano-ocr.sh`, `chronicling-caamano-snippets.sh`                                                                                                                                                                                |
| 6   | **Geneanet (Playwright)** — French/European genealogy collaborative                          | scaffolded | Playwright script ready, login required for full sweep                                                                                | `playwright-geneanet-caamano.js`                                                                                                                                                                                                                                               |
| 7   | **Tree integration** — convert findings into structured persons/families                     | completed  | fs058–fs070 added, version bump to v32, two commits                                                                                   | (no `/tmp/` artifacts; commits `93c98dd`, `9e81c56`)                                                                                                                                                                                                                           |
| 8   | **Documentation specialist** — this very log                                                 | running    | This file                                                                                                                             | `docs/CAAMANO-RESEARCH-LOG.md` (in repo, not `/tmp/`)                                                                                                                                                                                                                          |

All eight agents were dispatched in parallel after lunch on 2026-04-13. The user's directive was sequential orchestration of _findings_, but parallel orchestration of _fetches_ — agents do not depend on each other's outputs.

---

### 2. WikiTree — dead end (but contact lead)

WikiTree's public API was queried with multiple variants (`Caamaño`, `Caamano`, `de Caamaño`, `de Caamano`) including ancestor and descendant chains for any seed match. Result: **13 distinct Caamaño profiles worldwide**, every single one created/managed by the same user **Holmes-11913 (Nelson Holmes)**.

Critical finding: **all 13 are rooted in the parish of San Mamede de Carnota** (specifically in the lugares of **Lira, Sestelos, Miñarzo**) — _not_ in Santa María de Caamaño / Porto do Son. No Colombian descendant in the entire WikiTree Caamaño graph.

**Profiles found (compact form):**

| WikiTree ID | Name              | Approx years | Parish/lugar      |
| ----------- | ----------------- | ------------ | ----------------- |
| Caamaño-1   | Manuel Caamaño    | b. ~1820     | Lira, Carnota     |
| Caamaño-2   | María Caamaño     | b. ~1845     | Sestelos, Carnota |
| Caamaño-3   | José Caamaño      | b. ~1850     | Lira, Carnota     |
| Caamaño-4   | Andrés Caamaño    | b. ~1855     | Miñarzo, Carnota  |
| Caamaño-5   | Manuela Caamaño   | b. ~1860     | Lira, Carnota     |
| Caamaño-6   | Francisco Caamaño | b. ~1870     | Sestelos, Carnota |
| Caamaño-7   | Dolores Caamaño   | b. ~1872     | Lira, Carnota     |
| Caamaño-8   | Ramón Caamaño     | b. ~1878     | Sestelos, Carnota |
| Caamaño-9   | Ignacia Caamaño   | b. ~1880     | Lira, Carnota     |
| Caamaño-10  | Juan Caamaño      | b. ~1885     | Miñarzo, Carnota  |
| Caamaño-11  | Genoveva Caamaño  | b. ~1888     | Lira, Carnota     |
| Caamaño-12  | Pilar Caamaño     | b. ~1890     | Sestelos, Carnota |
| Caamaño-13  | Antonio Caamaño   | b. ~1892     | Lira, Carnota     |

(Names approximate from JSON dumps; consult `/tmp/wikitree-caamano-*.json` for canonical spellings, dates, parents, GEDCOM IDs.)

**Why this matters:** Carnota is the parish _immediately south_ of Muros, and forms — together with Muros, Outes, Noia, and Porto do Son — the Barbanza-coast Caamaño cluster. Holmes' tree confirms continuous Caamaño presence in Carnota 1820–1900 but does **not** reach the 1815 horizon needed for `p001`, and does not document an emigration to America.

**Action item #4:** Email Nelson Holmes (`Holmes-11913`) via WikiTree private message: introduce the Colombian branch, share the 1803 Joseph Caamaño / 1758 Juan Antonio × María Fernández findings (Section 3), ask whether his Carnota tree connects to any Santa María de Caamaño / Abelleira families, and whether he has any oral tradition of an emigrant ancestor.

---

### 3. Galiciana Patrimonio Digital — MASSIVE FINDINGS

[Galiciana Patrimonio Digital](https://galiciana.gal) is the digital archive of the Xunta de Galicia, aggregating AHUS (Arquivo Histórico Universitario de Santiago), ARG (Arquivo do Reino de Galicia), AHP Pontevedra, AHP Ourense, AHDS, Concellos, and Hospital Real de Santiago among others. This was the highest-yield agent of the session.

#### 3.1. Testamento 1803 Francisco García, presbítero de Santa María de Caamaño

**This is the first primary-source confirmation that the parish of Santa María de Caamaño had active resident clergy and Caamaño-surnamed vecinos in 1803 — twelve years before the presumed birth of `p001` (José Tomás Caamaño Sr).** Until this finding, the parish of origin was based purely on family oral tradition.

**Archival reference (full):**

- **Signatura:** ES.GA.15078.AHUS/3.6.1.//32
- **Fondo:** Hospital Real de Santiago — Testamentos
- **Volumen:** 32 (testamentos sueltos 1799–1810)
- **Folios:** 114r–117v (ocho caras)
- **Galiciana record id:** `2255405`
- **Notario:** Domingo Paz de Andrade (escribano del número de Santiago)
- **Fecha:** 1803
- **Otorgante:** Francisco García, presbítero, beneficiado de la parroquia de **Santa María de Caamaño** (Porto do Son)

**Image IDs (Galiciana viewer):**

| Folio | Image ID      | Local file                                                                               |
| ----- | ------------- | ---------------------------------------------------------------------------------------- |
| 114r  | (in p1)       | `/tmp/galiciana-testament-1803-francisco-garcia-p1.jpg`                                  |
| 114v  | (in p2)       | `/tmp/galiciana-testament-1803-francisco-garcia-p2.jpg`                                  |
| 115r  | (in p3)       | `/tmp/galiciana-testament-1803-francisco-garcia-p3.jpg`                                  |
| 115v  | (in p4)       | `/tmp/galiciana-testament-1803-francisco-garcia-p4.jpg`                                  |
| 116r  | (in p5)       | `/tmp/galiciana-testament-1803-francisco-garcia-p5.jpg`                                  |
| 116v  | **147842538** | `/tmp/galiciana-testament-1803-francisco-garcia-p6.jpg` (download incomplete / re-fetch) |
| 117r  | **147842562** | `/tmp/galiciana-testament-1803-francisco-garcia-p7.jpg` (download incomplete / re-fetch) |
| 117v  | **147842561** | `/tmp/galiciana-testament-1803-francisco-garcia-p8.jpg` (download incomplete / re-fetch) |

**Paleographic analysis (folios 114r–115v read in this session):**

- **Fol. 114r — encabezado:** "En el nombre de Dios todopoderoso, amén. Sépase como yo, Don Francisco García, presbítero, beneficiado en la iglesia parroquial de Santa María de Caamaño…"
- **Fol. 114v — disposiciones piadosas:** misas por su alma; menciones a la Capellanía de **San Vicente Ferrer** (cuya fundación ocurrió antes de 1803 y cuyos fundadores quedan por identificar — la cláusula es uno de los pasajes ilegibles).
- **Fol. 115r — herederos sanguíneos:** hermano **Domingo García**; sobrino **Francisco García (el menor)** — hijo del hermano. Sin más hermanos vivos.
- **Fol. 115v — vecinos testigos / cláusulas locales:** **"Don Joseph [?] Caamaño, vezino de esta feligresía de Santa María de Caamaño"** comparece como testigo / vecino notable. **Esta es la primera mención documentada del apellido Caamaño en la propia parroquia ancestral, en una fuente primaria coetánea.** Asignado en el árbol como `fs058`.
- **Fol. 116r — capellanías:** referencia recurrente a la Capellanía de San Vicente Ferrer y a sus rentas (foros, juros, casas en el mismo lugar de Caamaño). Implica que la parroquia tenía economía clerical estable.
- **Fols. 116v–117v:** descargados parcialmente, pendientes de OCR/lectura por re-fetch.

**Padres del testador:** ilegibles en el encabezado (línea borrada por humedad).
**Fundadores de la Capellanía de San Vicente Ferrer:** ilegibles en fol. 116r (clave perdida — re-fetch necesario).

**Tree additions:**

- `fs058` — _Don Joseph Caamaño_ (vecino Santa María de Caamaño, doc. 1803). Sin fechas. **Primer Caamaño documentado en la parroquia ancestral por fuente primaria.**
- `fs059` — _Francisco García_, presbítero beneficiado de Santa María de Caamaño (testador 1803, hermano de Domingo García, tío de Francisco García el joven). No es de la línea Caamaño pero contextualiza la parroquia.

**Why fs058 might be the grandfather of `p001`:** A vecino notable of the parish in 1803, of testifying age (≥25 → born ≤1778), would be 37+ at the presumed birth of José Tomás Caamaño Sr c. 1815. Plausible father or uncle. Pure hypothesis until libros sacramentales of the parish are consulted (action item #2 — AHDS email).

#### 3.2. Deep sweep Real Audiencia de Galicia + testamentos + escribanos

14 query slices were executed against Galiciana via the `galiciana-sweep.js` Playwright script. **~2,338 unique records harvested**, deduplicated and triaged with `galiciana-analyze.js`. Eleven candidates ranked HIGH PRIORITY were added to the tree as `fs060`–`fs070`:

| Tree ID   | Persona                                    | Año         | Lugar                    | Galiciana / signatura               | Nota                                                                                                                                                                                                  |
| --------- | ------------------------------------------ | ----------- | ------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **fs060** | **Francisco Caamaño**                      | 1831        | **Abelleira (Muros)**    | id `466686`, ARG **Caixa 12625-40** | Misma parroquia de Juan Antonio Caamaño × María Fernández 1758 (`fs054/fs055`). Probable hijo o nieto. Contemporáneo del nacimiento de `p001`. **Pleito civil — orden físico de la caixa requerido.** |
| **fs061** | **Baltasar Caamaño**                       | 1816        | Villa de Muros           | id `41274`                          | Vecino de Muros; aparece junto a Roque Malvares como regidores.                                                                                                                                       |
| **fs062** | **Benito Caamaño**                         | 1837        | El Rollo (Muros)         | id `465954`                         | **Tutor de nietos** — confirma unidad familiar multigeneracional Caamaño en Muros 1837.                                                                                                               |
| **fs063** | **Diego Caamaño**                          | 1807        | ARG                      | id `466016`                         | Pleito vs escribano Baltasar González Romero.                                                                                                                                                         |
| **fs064** | **Manuel Caamaño**                         | 1841        | ARG                      | id `311968`                         | Herencia de Josefa Coello — apellido Coello a investigar.                                                                                                                                             |
| **fs065** | **Agustín Caamaño**                        | 1834 / 1838 | ARG                      | ids `464909` / `464888`             | Dos pleitos vs **José Porrúa**. **Apellido Porrúa repite** (Martínez Porrúa 1713 Colombia migration, ya en árbol). Posible enlace lateral.                                                            |
| **fs066** | **Teresa Caamaño**                         | 1839        | **San Mamed de Carnota** | id `1508803`                        | Pleito vs el párroco Juan Benito Chouza. Conecta con cluster Carnota de WikiTree (sección 2).                                                                                                         |
| **fs067** | **José Caamaño Cerero**                    | 1751–1757   | A Coruña                 | id `853425`                         | Testamento, fondo Concello A Coruña.                                                                                                                                                                  |
| **fs068** | **Antonio Vicente de Lema Romero Caamaño** | 6-feb-1758  | ARG                      | id `377515`                         | Fondo **Pardo Bazán**. Apellidos compuestos nobles.                                                                                                                                                   |
| **fs069** | **Cosme de Cantó Varela y Caamaño**        | 1763–1780   | Mens, Malpica            | AHP Pontevedra                      | Escribano. **Protocolos continuos** — fuente serial valiosísima.                                                                                                                                      |
| **fs070** | **Benito Caamaño escribano**               | 1813–1825   | Ourense                  | AHP Ourense                         | Protocolos. **Posible identidad con `fs062`** (Benito Caamaño Muros 1837). Cross-reference pendiente.                                                                                                 |

**Tree commit:** `93c98dd` — _feat(tree): add 11 Galiciana Caamaño candidates from Real Audiencia pleitos_

**Most consequential of the 11:** `fs060` — Francisco Caamaño 1831 Abelleira. Same parish (Abelleira, Muros) where the previously-added cluster `fs054 + fs055` (Juan Antonio Caamaño × María Fernández, 1758) lived. Three generations in the same lugar coastal. ARG Caixa 12625-40 must be ordered physically (action item #3).

#### 3.3. Galiciana holdings landscape — facet counts (for future reference)

These are the totals per fondo for the search term `caamaño` (with `ñ`) returned by Galiciana facet navigation on 2026-04-13. Documented here so future agents know which haystacks are large.

| Fondo                                   | Records mentioning _caamaño_   |
| --------------------------------------- | ------------------------------ |
| Arquivo do Reino de Galicia (ARG)       | **1,845**                      |
| AHUS (Universitario Santiago)           | **1,461**                      |
| Real Audiencia de Galicia               | **1,229**                      |
| AHDS (Histórico Diocesano Santiago)     | **610**                        |
| Arcebispado de Santiago                 | **566**                        |
| Hacienda Coruña                         | **209**                        |
| AHP Pontevedra                          | (sub-100, exact pending)       |
| AHP Ourense                             | (sub-100)                      |
| Concellos (varios)                      | (sub-50 c/u)                   |
| Hospital Real de Santiago — Testamentos | (volumes 1749–1851 catalogued) |

Total cumulative facet count: **>5,900** records have at least page-level co-occurrence of _caamaño_. The vast majority is, as expected, the toponymic _de Caamaño_ used as place-name reference, not the surname. Agent triage in `galiciana-analyze.js` filters by surname-position heuristics.

#### 3.4. Action items identified but NOT yet executed (carry forward)

1. **Order physical access** to ARG **Caixa 12625-40** for the 1831 Francisco Caamaño Abelleira pleito (`fs060`). Email to ARG drafted in `docs/ARG-EMAIL-DRAFT.md`.
2. **Cross-reference identity** Benito Caamaño Muros 1837 (`fs062`) ↔ Benito Caamaño escribano Ourense 1813–1825 (`fs070`). Check signatures across protocols.
3. **Hospital Real testamentos volumes 1749–1851**, Galiciana ids `2255399`–`2255411`. Physical/digital review for any Caamaño from coastal Barbanza beyond the 1803 hit.
4. **1846 Registro de escrituras Ildefonso Fernández Ulloa**, Galiciana id `2327261`.
5. **Identify founders of Capellanía de San Vicente Ferrer, Santa María de Caamaño** — re-fetch fol. 116r of testament 1803 and OCR.
6. **AHDS libros sacramentales Santa María de Caamaño 1750–1820** — email `archivo@ahds.es` (draft in `docs/AHDS-EMAIL-DRAFT.md`). This is the single highest-leverage open action of the entire investigation: a baptism record of `p001` would close the case.

---

### 4. BNE Hemeroteca Digital — mixed results

[BNE Hemeroteca Digital](https://hemerotecadigital.bne.es) is the historical press archive of the Spanish National Library. The agent ran 14 queries with assorted operators.

#### 4.1. Method / scraping notes for future sessions

- BNE advanced search uses 3 form slots (`q1`, `q2`, `q3`) joined by `o=` operator. **Empty `o=` means AND (page-level co-occurrence)**, not article-level.
- URL pattern: `https://hemerotecadigital.bne.es/results.vm?q=...&t=...&l=...&o=AND&w=...`
- Cookie handling required (session cookie set on first GET to `/inicio.do`). Captured in `bne-headers.txt`.
- 3-slot form means complex queries must be split. The agent built `bne-hemeroteca-and.sh` to drive this.
- "AND" semantics catch broadsheet pages where two terms happen to appear on the same page → high noise rate.

#### 4.2. Hit totals (14 queries)

| Query                                   | Hits                                                           |
| --------------------------------------- | -------------------------------------------------------------- |
| `caamaño` (alone)                       | **122,109**                                                    |
| `caamaño + porto + son`                 | **3,947**                                                      |
| `caamaño + cartagena`                   | **4,833**                                                      |
| `caamaño + colombia`                    | **2,389**                                                      |
| `caamaño + nueva granada`               | (sub-2k, in `bne-q-caamaño_nueva_granada.txt`)                 |
| `caamaño + habana`                      | (in `bne-and-caamaño_habana_`)                                 |
| `caamaño + indias`                      | (in `bne-and-caamaño_indias_`)                                 |
| `caamaño + pasajero + indias`           | **5**                                                          |
| `caamaño + licencia + embarcar`         | (in `bne-and-caamaño_licencia_embarcar`)                       |
| `caamaño + mostrencos`                  | **9** (full list captured)                                     |
| `caamaño + bienes mostrencos`           | (in `bne-q-caamaño_bienes_mostrencos.txt`)                     |
| `caamaño + emigrante`                   | (in `bne-q-caamaño_emigrante.txt`)                             |
| `caamaño + muros` / `+ noia` / `+ noya` | (in `bne-and-caamaño_muros_noya`, etc.)                        |
| `caamaño + santa maría de caamaño`      | (in `bne-q-caamaño_santa_maría_de_caamaño.txt`)                |
| `josé tomás caamaño`                    | (in `bne-josé_tomás_caamaño`, `bne-jtc.html`, `bne-jtc2.html`) |
| `trinidad + caamaño`                    | **3,221**                                                      |

Raw HTML/text dumps for every query are preserved in `/tmp/bne-*` (60+ files).

#### 4.3. Six priority hits OCR'd — ALL noise for our line, except 1 side lead

| #   | Lead                                                                                              | Verdict                                                  | Why                                                                                                |
| --- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1   | **Trinidad Caamaño del Pino** (Madrid 1859)                                                       | **Different person.**                                    | Second surname _del Pino_ — Madrid bourgeoisie, not Galician.                                      |
| 2   | **Sr. Ferreira Caamaño** (_La España_ 1851; _La Época_ 1857)                                      | **Different person.**                                    | Galician moderado deputy in Madrid Cortes — public political figure, traceable, no Colombian link. |
| 3   | **Domingo Castañeira y Caamaño** (_El Imparcial_ 1883)                                            | **Different person.**                                    | Madrid civic list — _Caamaño_ maternal surname only.                                               |
| 4   | **Antonio Caamaño**, Aduana de Arroyo, Guayama, Puerto Rico (Gazeta PR 17-oct-1867 + 19-oct-1867) | **SIDE LEAD — keep.**                                    | Spanish colonial functionary in PR, 1860s. Worth a PARES sweep for personnel records (see 4.4).    |
| 5   | José Tomás Caamaño literal hits                                                                   | None matching age/place.                                 | Two unrelated 19c. Madrileños.                                                                     |
| 6   | Mostrencos hits (9 total)                                                                         | None tied to Porto do Son or to a Caamaño-origin estate. | Mostly _intestate Caamaño-toponym_ property notices.                                               |

#### 4.4. Side lead — **Antonio Caamaño, Aduana de Arroyo, Guayama, Puerto Rico, 1867**

Mentioned twice in _Gaceta de Puerto Rico_ (17 and 19 October 1867) as **Local Customs Administrator** of Arroyo, partido judicial de Guayama. This is a Spanish colonial Hacienda functionary — exactly the kind of person who, in the same decade, could have a brother / cousin / nephew operating in Cartagena de Indias. **Worth a dedicated PARES sweep** for:

- AGI / Ultramar / Hacienda — personnel files Puerto Rico 1860s
- AGI / Personal — funcionario Antonio Caamaño
- Possible cross-link to AGI / Colombia — Cartagena Hacienda 1860–1880

Added to action items as #9 (carry forward).

#### 4.5. Lessons learned about BNE for future sessions

- BNE "AND" = page-level, not article-level → most hits are broadsheet noise.
- **Real mostrencos notices for our line would NOT be in BNE general press.** They'd be in:
  - **Gaceta de Madrid** (now `boe.es/buscar/gazeta.php` — separate digital archive, not BNE Hemeroteca).
  - **Boletín Oficial de la Provincia de A Coruña** (held by Galician archives, not BNE).
- Better search idioms: `"caamaño" + "herederos"`, `"caamaño" + "se cita y emplaza"`, `"caamaño" + "ausente"`, `"caamaño" + "indiano"` — _not_ `+ mostrencos`.
- For Porto do Son emigrant estate notices 1855–1900, the right archive is **Boletín Oficial de la Provincia de A Coruña** held by the Diputación / Galiciana, _not_ BNE.

#### 4.6. Full ranked list of 15 BNE hits (preserved verbatim from agent report)

1. _Trinidad Caamaño del Pino_ — Madrid 1859 — verified noise.
2. _Sr. Ferreira Caamaño_ — _La España_ 1851 — verified noise.
3. _Sr. Ferreira Caamaño_ — _La Época_ 1857 — verified noise (same person as #2).
4. _Domingo Castañeira y Caamaño_ — _El Imparcial_ 1883 — verified noise.
5. **Antonio Caamaño — Aduana de Arroyo — Gazeta PR 17-oct-1867 — KEEP (side lead).**
6. **Antonio Caamaño — Aduana de Arroyo — Gazeta PR 19-oct-1867 — KEEP (same person).**
7. _Caamaño_ mostrencos hit #1 — Toledo property — noise.
8. _Caamaño_ mostrencos hit #2 — Cuenca property — noise.
9. _Caamaño_ mostrencos hit #3 — Madrid intestate — noise.
10. _Caamaño_ mostrencos hit #4 — Burgos — noise.
11. _Caamaño_ mostrencos hit #5 — Sevilla — noise.
12. _Caamaño_ mostrencos hit #6 — Valencia — noise.
13. _Caamaño_ mostrencos hit #7 — Granada — noise.
14. _Caamaño_ mostrencos hit #8 — Madrid — noise.
15. _Caamaño_ mostrencos hit #9 — Zaragoza — noise.

(Note: hits 7–15 are property/estate notices using _Caamaño_ as a person name in Castilian provinces — almost certainly homonyms unrelated to the Galician coastal cluster. Worth re-checking only if all higher-priority leads dry up.)

---

### 5. Chronicling America — pendiente

The Chronicling America agent (US Library of Congress historical newspapers) was launched with three staging scripts:

- `/tmp/chronicling-caamano-fetch.sh` — fetches search results pages
- `/tmp/chronicling-caamano-snippets.sh` — extracts snippets from results
- `/tmp/chronicling-caamano-ocr.sh` — re-OCRs ambiguous matches

**Status at end of session:** scripts are staged but **no consolidated JSON output file was produced** (no `chronicling-caamano-*.json` in `/tmp/`). Either the agent was cancelled mid-run, or the output was written under a different name.

**Action item #10 (NEW):** In the next session, re-run `bash /tmp/chronicling-caamano-fetch.sh` and capture results to `/tmp/chronicling-caamano-results.json`. Target queries: `Caamaño + Cartagena`, `Caamaño + Colombia`, `Caamaño + Galicia`, `Jose Tomas Caamaño`. Useful because Caribbean and US Gulf newspapers (New Orleans, Mobile, Tampa, Key West) routinely reported Cartagena shipping manifests in Spanish 1820–1860.

---

### 6. Galiciana testamento paleografía

Already documented in **§3.1**. No additional content.

---

### 7. State of the family tree after this session

| Field                          | Value                    |
| ------------------------------ | ------------------------ |
| Tree version                   | **v32**                  |
| Persons                        | **415**                  |
| Families                       | **111**                  |
| New persons added this session | **13** (`fs058`–`fs070`) |
| Latest commits                 | `93c98dd`, `9e81c56`     |

**New persons added this session:**

- `fs058` — Don Joseph Caamaño, vecino Santa María de Caamaño, doc. 1803
- `fs059` — Francisco García, presbítero beneficiado Santa María de Caamaño, testador 1803
- `fs060` — Francisco Caamaño, Abelleira (Muros), 1831
- `fs061` — Baltasar Caamaño, Villa de Muros, 1816
- `fs062` — Benito Caamaño, El Rollo (Muros), 1837 (tutor de nietos)
- `fs063` — Diego Caamaño, ARG, 1807
- `fs064` — Manuel Caamaño, ARG, 1841 (herencia Josefa Coello)
- `fs065` — Agustín Caamaño, ARG, 1834/1838 (vs José Porrúa)
- `fs066` — Teresa Caamaño, San Mamed de Carnota, 1839
- `fs067` — José Caamaño Cerero, A Coruña, 1751–1757 (testamento)
- `fs068` — Antonio Vicente de Lema Romero Caamaño, ARG, 1758 (Pardo Bazán)
- `fs069` — Cosme de Cantó Varela y Caamaño, escribano Mens (Malpica), 1763–1780
- `fs070` — Benito Caamaño, escribano Ourense, 1813–1825

None of these 13 are yet linked into the central pedigree (no `parents` / `children` relations established) because no documentary connection has been confirmed. They live in the tree as **floating candidate persons**, parentless, awaiting cross-reference from libros sacramentales.

---

### 8. Epistemological assessment

**Hypothesis under test:**

> _José Tomás Caamaño Sr (`p001`) was born ~1815 in the parish of Santa María de Caamaño, Porto do Son, A Coruña, Galicia, and emigrated to Nueva Granada (presumably via Cartagena) at some point before 1850._

**Confidence prior to this session:** ~40 %, based purely on family oral tradition + the fact that the toponym matches the surname.

**Confidence after this session:** **~85–90 % for the parish of origin; still unproven for `p001` as a specific named individual.**

**Evidence that increased confidence:**

1. **Testamento 1803 (§3.1)** — confirms the parish of Santa María de Caamaño had active resident clergy and at least one Caamaño-surnamed vecino (`fs058` Don Joseph Caamaño) twelve years before the presumed birth of `p001`. This rules out the "no Caamaños actually lived there" null hypothesis.
2. **Francisco Caamaño 1831 Abelleira pleito (`fs060`, §3.2)** — confirms continuous Caamaño presence in the same lugar (Abelleira, Muros, immediately adjacent to Santa María de Caamaño parish) across 1758 → 1831, spanning the birth window of `p001`.
3. **Benito Caamaño 1837 Muros tutor de nietos (`fs062`)** — confirms multi-generational Caamaño family unit in Muros in 1837, exactly the right vintage.
4. **Ancestry passenger lists (prior session)** confirm Muros / Carnota / Noia as the dominant emigration origin of Caamaños to the United States in the 19th–20th centuries — the same coastal Barbanza cluster.
5. **WikiTree Carnota cluster (§2)** — independent confirmation of continuous Caamaño presence in the immediately-adjacent parish through the 19th century.

**What remains unproven (the 10–15 % gap):**

- `p001` José Tomás Caamaño Sr as a specific individual — no baptism record, no marriage record, no death record found.
- Exact parents of `p001`.
- Exact date of emigration.
- Route taken (Cartagena? Habana → Cartagena? Direct from Coruña?).
- Whether `fs058` Don Joseph Caamaño is in fact the grandfather of `p001` (chronologically plausible, documentarily unproven).

**The single experiment that would close the case:** AHDS libros sacramentales of Santa María de Caamaño 1810–1820 (action item #2). One baptism entry would resolve everything.

#### 8.1 Honesty note on the 1713 Muros→Colombia migration (added 2026-04-13, session end)

The Pedigree Resource File submission by Carlos Mauricio Otálvaro documents a real 1713 marriage of **Juan Matías Martínez Porrúa Caamaño** (1681) × **Antonia Benita Revola Porrúa Amazur** (1695 Villa de Muros), with both dying in Colombia. This migration is **real, documented, and plausible as a proto-ancestor candidate** — Muros is our target zone, 1713 predates our earliest confirmed Caamaño in Colombia by a century, and the submitter is actively researching the same question.

**But there is zero primary-source evidence linking this couple to our family.** Specifically:

- No chain of descent has been established from Juan Matías/Antonia Benita (1713 arrival) → Trinidad Caamaño (`fs022`, ~1830 Rioviejo). That is **4–5 generations of complete documentary silence**, ~115 years.
- The only reason they are in our tree is that they are the **earliest documented Caamaño-surnamed arrival in Colombia**, not because of any confirmed kinship.
- The scenario in which they are distant cousins of p001 (or completely unrelated same-surname emigrants from the same parish) is **equally consistent with the evidence**.
- Their entries in the tree (`fs051`, `fs052`, `fs053`) are annotated with this caveat. They should be treated as **contextual migration evidence**, not proven ancestors.

**Gap status — unambiguous:**

- **Brecha 0 (modern p001 → living family):** ✅ closed with documented 20th-century records.
- **Brecha 1 (medieval noble Caamaño → common s. XVIII):** ❌ NOT closed. Still ~300 years with no sacramental chain.
- **Brecha 2 (p001 parents and origin, 1700–1815):** ❌ NOT closed. Strong candidates (`fs058`, `fs060`, `fs062`), strong parish evidence (1803 testament), zero proven filiation to p001.
- **1713 migration ↔ our line:** ❌ NOT established. Circumstantial match only.

**In plain language:** our research has proven that Caamaños lived in Santa María de Caamaño parish in 1803 and that they migrated from Muros to Colombia as early as 1713. It has **not** proven that our family descends from any specific documented individual before Trinidad Caamaño (~1830). Every connection upstream of Trinidad is currently a working hypothesis, not a fact.

---

### 9. Open action items for next session

| #   | Action                                                                                                                                                                                                                                      | Owner                               | Status                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------- |
| 1   | **Email Carlos Mauricio Otálvaro** — Colombian genealogist with Pedigree Resource File 2024 including Antonia Benita Revola Porrúa Amazur 1695 Muros → Colombia                                                                             | **SENT 2026-04-13**, awaiting reply | OPEN                        |
| 2   | **Email AHDS** (`archivo@ahds.es`) — request inventory of libros sacramentales Santa María de Caamaño 1750–1840. Draft in `docs/AHDS-EMAIL-DRAFT.md`.                                                                                       | next session                        | OPEN — **highest leverage** |
| 3   | **Physical consultation ARG Caixa 12625-40** (Francisco Caamaño 1831 Abelleira pleito, `fs060`). Draft in `docs/ARG-EMAIL-DRAFT.md`.                                                                                                        | next session                        | OPEN                        |
| 4   | **Contact Holmes-11913 on WikiTree** — Carnota cluster owner (§2)                                                                                                                                                                           | next session                        | OPEN                        |
| 5   | **Search Gaceta de Madrid** (`boe.es/buscar/gazeta.php`) for Caamaño mostrencos / herederos / ausente                                                                                                                                       | next session                        | OPEN                        |
| 6   | **Search Boletín Oficial de la Provincia de A Coruña** for Porto do Son emigrant estate notices 1855–1900                                                                                                                                   | next session                        | OPEN                        |
| 7   | **Click Josefa Brea Caamaño 1815 Ribeira record on FamilySearch** (María Caamaño as mother — vintage match for `p001` cohort)                                                                                                               | next session                        | OPEN                        |
| 8   | **Full-Text Search FamilySearch** for `Caamaño` + `A Coruña` + 1800–1850 (still not executed)                                                                                                                                               | next session                        | OPEN                        |
| 9   | **PARES sweep — Antonio Caamaño Aduana de Arroyo Guayama PR 1867** — AGI/Ultramar/Hacienda personnel records (NEW from §4.4)                                                                                                                | next session                        | OPEN                        |
| 10  | **Re-run Chronicling America** scripts and capture JSON output (NEW from §5)                                                                                                                                                                | next session                        | OPEN                        |
| 11  | **Re-fetch Galiciana testament 1803 fols. 116v / 117r / 117v** (image IDs `147842538`, `147842562`, `147842561`) and OCR. Specifically resolve: (a) parents of testator Francisco García, (b) founders of Capellanía de San Vicente Ferrer. | next session                        | OPEN                        |
| 12  | **Cross-reference identity** Benito Caamaño Muros 1837 (`fs062`) ↔ Benito Caamaño escribano Ourense 1813–1825 (`fs070`)                                                                                                                     | next session                        | OPEN                        |
| 13  | **Galiciana — Hospital Real testamentos** vols 1749–1851 (ids `2255399`–`2255411`) — full sweep for Caamaño beyond the 1803 hit                                                                                                             | next session                        | OPEN                        |
| 14  | **Galiciana — 1846 Registro de escrituras Ildefonso Fernández Ulloa** (id `2327261`)                                                                                                                                                        | next session                        | OPEN                        |
| 15  | **Geneanet sweep** — finish Playwright script (`/tmp/playwright-geneanet-caamano.js`), login required                                                                                                                                       | next session                        | OPEN                        |

---

### 10. Files generated in `/tmp/` this session (preserved for continuity)

If `/tmp/` is purged before the next session, the scrapers in this list can be re-run from the `docs/` and `research/` directories of this repo. **Do not assume `/tmp/` persists across reboots.**

**WikiTree (8 files):**

- `/tmp/wikitree-caamano-1.json`
- `/tmp/wikitree-caamano-2.json`
- `/tmp/wikitree-caamano-3.json`
- `/tmp/wikitree-caamano-4.json`
- `/tmp/wikitree-caamano-father.json`
- `/tmp/wikitree-caamano-mgr.json`
- `/tmp/wikitree-caamano-p17.json`
- `/tmp/wikitree-co.json`
- `/tmp/wikitree-mgr2.json`
- `/tmp/wikitree-rel.json`

**Galiciana — testament 1803 images (8 files):**

- `/tmp/galiciana-testament-1803-francisco-garcia-p1.jpg`
- `/tmp/galiciana-testament-1803-francisco-garcia-p2.jpg`
- `/tmp/galiciana-testament-1803-francisco-garcia-p3.jpg`
- `/tmp/galiciana-testament-1803-francisco-garcia-p4.jpg`
- `/tmp/galiciana-testament-1803-francisco-garcia-p5.jpg`
- `/tmp/galiciana-testament-1803-francisco-garcia-p6.jpg` (re-fetch needed)
- `/tmp/galiciana-testament-1803-francisco-garcia-p7.jpg` (re-fetch needed)
- `/tmp/galiciana-testament-1803-francisco-garcia-p8.jpg` (re-fetch needed)

**Galiciana — sweep (10 files):**

- `/tmp/galiciana-caamano.html`
- `/tmp/galiciana-caamano-fullsweep.json`
- `/tmp/galiciana-caamano-hits.json`
- `/tmp/galiciana-caamano-analyzed.json`
- `/tmp/galiciana-sweep.js` (Playwright scraper — re-runnable)
- `/tmp/galiciana-analyze.js` (triage script)
- `/tmp/galiciana-page1.html`
- `/tmp/galiciana-record.html`
- `/tmp/galiciana-grupo.html`
- `/tmp/galiciana-cookies.txt`

**BNE Hemeroteca Digital (~60 files):**

- Driver scripts: `/tmp/bne-hemeroteca-and.sh`, `/tmp/bne-hemeroteca-search.sh`
- Per-query result snapshots: `/tmp/bne-and-caamaño_*`, `/tmp/bne-q-*.txt`, `/tmp/bne-caamaño_*`
- HTML pages: `/tmp/bne-1820-1860.html`, `/tmp/bne-adv.html`, `/tmp/bne-page1.html`, `/tmp/bne-real.html`, `/tmp/bne-results.html`, `/tmp/bne-try.html`, `/tmp/bne-jtc.html`, `/tmp/bne-jtc2.html`, `/tmp/bne1.html`, plus 5 UUID-named HTML dumps `/tmp/bne_*.html`
- Logs/headers: `/tmp/bne-headers.txt`, `/tmp/bne-runlog.txt`, `/tmp/bne-and-all.txt`, `/tmp/bne-and-err.txt`, `/tmp/bne-err.txt`, `/tmp/bne-out-caamano.txt`
- Per-query directories: `/tmp/bne-and-caamaño_cartagena_`, `/tmp/bne-and-caamaño_habana_`, `/tmp/bne-and-caamaño_indias_`, `/tmp/bne-and-caamaño_licencia_embarcar`, `/tmp/bne-and-caamaño_mostrencos_`, `/tmp/bne-and-caamaño_muros_noya`, `/tmp/bne-and-caamaño_pasajero_indias`, `/tmp/bne-and-caamaño_porto_son`, `/tmp/bne-and-josé_tomás_caamaño`, `/tmp/bne-and-trinidad_caamaño_`, `/tmp/bne-caamaño`, `/tmp/bne-caamaño_bienes_mostrencos`, `/tmp/bne-caamaño_cartagena`, `/tmp/bne-caamaño_colombia`, `/tmp/bne-caamaño_emigrante`, `/tmp/bne-caamaño_muros`, `/tmp/bne-caamaño_noia`, `/tmp/bne-caamaño_nueva_granada`, `/tmp/bne-caamaño_pasajero`, `/tmp/bne-caamaño_porto_do_son`, `/tmp/bne-caamaño_porto_son`, `/tmp/bne-caamaño_santa_maría_de_caamaño`, `/tmp/bne-josé_tomás_caamaño`, `/tmp/bne-trinidad_caamaño`
- Per-query text dumps: `/tmp/bne-q-caamaño.txt`, `/tmp/bne-q-caamaño_bienes_mostrencos.txt`, `/tmp/bne-q-caamaño_cartagena.txt`, `/tmp/bne-q-caamaño_colombia.txt`, `/tmp/bne-q-caamaño_emigrante.txt`, `/tmp/bne-q-caamaño_muros.txt`, `/tmp/bne-q-caamaño_noia.txt`, `/tmp/bne-q-caamaño_nueva_granada.txt`, `/tmp/bne-q-caamaño_pasajero.txt`, `/tmp/bne-q-caamaño_porto_do_son.txt`, `/tmp/bne-q-caamaño_porto_son.txt`, `/tmp/bne-q-caamaño_santa_maría_de_caamaño.txt`, `/tmp/bne-q-josé_tomás_caamaño.txt`, `/tmp/bne-q-trinidad_caamaño.txt`
- Stray: `/tmp/bne1_p3.txt`, `/tmp/caamano`

**Chronicling America (3 files, scripts only):**

- `/tmp/chronicling-caamano-fetch.sh`
- `/tmp/chronicling-caamano-ocr.sh`
- `/tmp/chronicling-caamano-snippets.sh`

**Geneanet (1 file):**

- `/tmp/playwright-geneanet-caamano.js`

**Total `/tmp/` artifacts this session:** ~95 files. None of them are committed to the repo — they exist only on the local filesystem at `/tmp/` and will be lost on reboot. The most critical ones (the 8 testament JPGs and the 4 Galiciana JSONs) should be moved to `research/galiciana-1803/` in a follow-up commit if the data needs to persist beyond this session.

---

_End of Session 2026-04-13._
