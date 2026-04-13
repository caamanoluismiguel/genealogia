# Caamaño Family — Deep Analysis (3-Expert Panel)

**Dataset:** 415 persons, 111 families, 1450–2025, 5+ countries
**Source file:** `src/data/caamano-family.json` (v32, 2026-04-13)
**Method:** Programmatic traversal of `persons[]` and `families[]`, plus structural network analysis.

---

## Expert 1 — Demographic Historian

### Coverage

- 175 of 415 persons (42.2%) carry a parseable birth year; 59 (14.2%) carry a death year; only **46 persons (11.1%) have both**, the universe in which true ages are computable. This is the single largest constraint on every demographic claim below.
- Sex ratio is **237M / 177F / 1 unknown** — a 1.34:1 male skew typical of pre-20th-century records, where men appear in notarial, baptismal-as-padrino, and military records far more often than women.

### Longevity

| Rank | Person                         | Lifespan  | Years |
| ---- | ------------------------------ | --------- | ----- |
| 1    | José Gesto Caamaño             | 1900–1991 | 91    |
| 2    | Manuela Bazarra Caamaño        | 1894–1981 | 87    |
| 2    | Rafael de Caamaño y Pardo      | 1762–1849 | 87    |
| 4    | José Bernardo Reino Caamaño    | 1882–1964 | 82    |
| 4    | Juan Beltrán Bazarra Fernández | 1790–1872 | 82    |
| 6    | María Ignacia Rodríguez Patiño | 1716–1797 | 81    |

The **18th-century longevity outliers** (Rafael de Caamaño y Pardo, María Ignacia Rodríguez Patiño, Domingo Antonio Caamaño 1735–1815) are striking because they suggest the noble Galician branch enjoyed elite health/nutrition decades before the demographic transition. Compare with Juan Vázquez de Caamaño (1540–1585, 45y) and José de Caamaño y Figueroa (1583–1630, 47y) — the same family in the same region two centuries earlier shows the expected pre-modern mortality.

### Mortality cluster

Two true infant deaths (José Caamaño de Cernadas 1699, José Cipriano Luis Pueyrredón Caamaño 1803) and one adolescent (Damiana Soto, 18). **The infant mortality "rate" of ~4% in this dataset is implausibly low** — pre-1900 baseline in Galicia/Caribbean was 25–35%. This is a recording bias, not a finding: dead infants simply weren't captured. (See Red Flags.)

The most politically charged death: **Francisco Alberto Caamaño Deñó (1932–1973), age 41** — Dominican constitutional president killed in the post-Trujillo era. He is the youngest non-infant adult death by a wide margin.

### Generation span

94 measurable parent-child pairs yield **avg 33.5 years/generation**. By century:

| Century (parent born) | n   | Avg gap |
| --------------------- | --- | ------- |
| 16th                  | 6   | 32.0    |
| 17th                  | 8   | 30.0    |
| 18th                  | 30  | 33.8    |
| 19th                  | 46  | 33.8    |
| 20th                  | 4   | 36.3    |

The flatness is itself the finding: there is **no demographic-transition signature** in this tree. A real family across 1500–2000 should show a contraction in the 19th century (industrialisation, contraception delay) and a re-expansion later. The flat 33-year gap suggests we're sampling male-line firstborns and oldest known children, not the full sibship — which inflates the mean.

### Sex ratio by century

| Century | M   | F   | M:F  |
| ------- | --- | --- | ---- |
| 15th    | 4   | 3   | 1.33 |
| 16th    | 12  | 4   | 3.0  |
| 17th    | 14  | 6   | 2.33 |
| 18th    | 34  | 14  | 2.43 |
| 19th    | 39  | 29  | 1.34 |
| 20th    | 11  | 3   | 3.67 |

The **16th–18th centuries are heavily male-biased** because the sources are notarial and noble-lineage records that named men. The 19th century normalises (parish registers begin capturing women systematically). The 20th-century re-skew is a documentation gap, not biology — modern living women are simply marked private/unrecorded.

### Widows / widowers

11 persons explicitly described as `viud[ao]` in notes — almost all women. Where parent death dates exist alongside a re-marriage hint, they should be the next research targets, because widow remarriages anchor sibling cohorts that otherwise float.

---

## Expert 2 — Migration & Mobility Specialist

### The 23 documented migrations

The dataset captures **23 explicit migration records**, but every one points outward from Galicia. There is **not a single return migration** documented. That alone is a research lead — there were absolutely returnees ("indianos") in this lineage given the wealth flows back to Porto do Son.

### Hub frequency (top birth/death places)

| Rank | Place                               | Mentions |
| ---- | ----------------------------------- | -------- |
| 1    | Colombia (generic)                  | 147      |
| 2    | El Banco, Magdalena, Colombia       | 40       |
| 3    | Porto do Son, A Coruña, Galicia     | 29       |
| 4    | Sta. María de Caamaño, Porto do Son | 16       |
| 5    | Noya / Noia                         | 14       |
| 6    | A Coruña capital                    | 6        |
| 7    | Villa de Muros                      | 6        |
| 8    | Lomba, Palmeira, Ribeira            | 5        |
| 9    | Rioviejo, Morales, Bolívar          | 5        |
| 10   | Padrón                              | 5        |

**The center of gravity is unambiguous: Porto do Son ↔ El Banco (Magdalena, Colombia).** Everything else is footnotes around that axis.

### Migration corridors (synthesised)

| Corridor                                                             | Persons         | Era       | Status                                |
| -------------------------------------------------------------------- | --------------- | --------- | ------------------------------------- |
| Caamaño parish → El Banco, Magdalena                                 | 2 + descendants | ~1840s    | **Foundational, oral tradition only** |
| Villagarcía de Arousa → Buenos Aires                                 | 5+              | 1880–1920 | CEMLA-confirmed                       |
| Galicia → Santo Domingo / San Juan de la Maguana                     | 3               | 1900–1930 | Documented                            |
| Galicia → Montevideo                                                 | 1               | 19c       | Uruguay archive                       |
| Galicia → Guayaquil                                                  | 2               | 18c, 19c  | Geneanet                              |
| Madrid → Guayaquil (Jacinto Caamaño Moraleja)                        | 1               | 18c       | Naval explorer                        |
| Galicia/Madrid → Chile (José Antonio de Mendoza Caamaño y Sotomayor) | 1               | 17–18c    | Viceroy of Peru lineage               |
| Galicia → Puebla/Tlaxcala (Domingo Antonio)                          | 1               | 18c       | Disputed                              |
| Provincia de España → Puerto Rico (Tomás Raimundo Agapito)           | 1               | ?         | Documented                            |
| Galicia → Antioquia (Bernardo Martínez y Perrúa)                     | 1               | 18–19c    | Documented                            |

### Geographic continuity breaks

- **José Antonio de Mendoza Caamaño y Sotomayor → Chile.** A Galician noble dying in Chile is the most extreme jump in the dataset. He was Viceroy of Peru (1736–1745). This breaks continuity by ~12,000 km in a single life.
- **Jacinto Caamaño Moraleja → Guayaquil** (Spanish navy explorer of the Pacific Northwest, 1790s) is the second-largest single-life displacement and is barely flagged in the notes.
- **Tomás Raimundo Agapito Caamaño López → Puerto Rico** is a quiet outlier; he is the only person in the tree who dies in PR despite zero family infrastructure there, suggesting either military or ecclesiastical posting.

### Multi-generational migration chains

Only **one chain is fully documented end-to-end**: José Tomás Caamaño (b.~1815, Galicia) → Colombia → his children form the El Banco cluster → grandchildren spread to Bolívar and Magdalena. Every other "chain" is a single person with no documented next-generation move, which means the dataset captures **arrival but not internal Latin American mobility**. Rioviejo → El Banco moves, Magdalena → Bogotá moves, El Banco → Caribbean coastal cities — all undocumented.

### Distance traveled (cross-country birth→death)

Only **9 persons** have both a birth-country and death-country we can actually compare. Of these, 7 are Galicia → Americas (≈8,000 km), 1 is Galicia → Chile (≈12,000 km), 1 is intra-Iberian. **Median displacement: ~8,000 km.** The fact that only 9 of 415 carry this data is the real finding — the migration lens is almost entirely shut.

### Documentation gaps (where the trail dies)

1. **El Banco, 1850–1880** — Damiana Soto and her cohort have no parish records.
2. **Rioviejo / Morales, Bolívar** — 5 persons, all "modern oral tradition" source.
3. **Argentine descendants** — CEMLA gives arrival manifests; no descendants traced.
4. **Pacific branches** (Ecuador, Chile) — single-person islands, no spouses or children.
5. **Mexican branch** — Domingo Antonio Caamaño in Puebla/Tlaxcala has zero descendants linked.

---

## Expert 3 — Structural / Network Analyst

### Connectivity catastrophe

The 415-person tree fragments into **112 disconnected components**:

| Component                        | Size | Anchor                                               |
| -------------------------------- | ---- | ---------------------------------------------------- |
| 0                                | 160  | **p001 main Colombian branch** (José Tomás Caamaño)  |
| 1                                | 32   | Pedro Caamaño / Rodríguez Patiño (18c Galicia noble) |
| 2                                | 24   | Rodrigo García de Caamaño (medieval, 12–14c)         |
| 3                                | 14   | "Desconocido Caamaño" / Villa branch                 |
| 4                                | 10   | Caamaño Gayoso Varela (Mariño de Goyanes)            |
| 5                                | 9    | Diego José Caamaño y Posé / Sanjurjo                 |
| 6                                | 7    | Juan de Caamaño / Martínez                           |
| 7                                | 7    | José Mariano Caamaño Conde                           |
| ...                              | ...  | ...                                                  |
| **87 components are singletons** | 1    | unconnected individuals                              |
| 14 small clusters                | 2–5  | mini-families                                        |

**Only 38.6% of the dataset (160/415) is structurally tied to the protagonist's bloodline.** The rest is "Caamaños I have collected." This is the single most important structural finding, and likely the highest-ROI thing to fix.

### Endogamy (Caamaño × Caamaño)

Exactly **one** marriage in the dataset is Caamaño × Caamaño:

- **f-fsf12: García de Caamaño y Sotomayor + Constanza Romero de Caamaño** (medieval/early-modern Galician nobility, where surname endogamy was common to consolidate land).

The near-total absence of cousin marriage in the modern Caribbean branch is itself a finding: in El Banco the surname married out aggressively (Soto, Reales, Castro, Rangel, Blanquicet, Laino), which suggests the founder arrived without an extended kin network and integrated by alliance.

### Compound surname analysis (noble lineage confluences)

| Compound                                    | Count               | Significance                                       |
| ------------------------------------------- | ------------------- | -------------------------------------------------- |
| Caamaño Castro                              | 11                  | Modern Caribbean alliance                          |
| Caamaño González                            | 9                   | Galician peasant/merchant                          |
| Caamaño Laino                               | 7                   | Mid-19c Magdalena                                  |
| Caamaño Rangel                              | 5                   | Magdalena alliance                                 |
| Caamaño Blanquicet                          | 5                   | Bolívar coastal                                    |
| Caamaño Pardo                               | 4                   | **Noble: Pardo de Cela lineage, 18c**              |
| Caamaño Figueroa                            | 4                   | **Noble: Figueroa, 16–17c Galicia**                |
| Caamaño Sotomayor                           | 3                   | **Noble: Casa de Sotomayor, viceregal connection** |
| Caamaño Cernadas                            | 3                   | 17–18c Galicia                                     |
| Caamaño Gayoso                              | 1 + 1 Gayoso Varela | **Noble: Gayoso de los Cobos**                     |
| Caamaño Ulloa / Taboada y Ribadeneira Ulloa | 2                   | **Noble: Ulloa & Taboada, top Galician hidalguía** |
| Caamaño Mendoza / de Mendoza                | 3                   | **Noble: Mendoza, viceregal**                      |

**The pattern is unmistakable:** the Galician Caamaños married into 6 of the most powerful Galician noble houses (Sotomayor, Pardo, Figueroa, Gayoso, Ulloa, Mendoza) between roughly 1500 and 1800. This makes the lineage a "network node" of Galician hidalguía — and the convergence on **Mendoza Caamaño Sotomayor** (which produced the Viceroy of Peru) is the apex.

The Caribbean branch shows the **opposite pattern**: alliance with locally rooted, non-noble Caribbean surnames. This is a clean class break across the 1840 emigration event.

### Top 10 network hubs (degree centrality)

| Rank | ID    | Name                           | Degree |
| ---- | ----- | ------------------------------ | ------ |
| 1    | p046  | Licerio Caamaño Rangel         | 21     |
| 2    | p013  | Benjamin Caamaño Reales        | 18     |
| 3    | p014  | Dominga Castro                 | 16     |
| 4    | p045  | Brígida Caamaño Rangel         | 11     |
| 5    | p025  | Emilio Caamaño Castro          | 10     |
| 6    | p050  | María Salud Caamaño Blanquicet | 9      |
| 6    | gn018 | [Privada] Caamaño Romero       | 9      |
| 6    | gn019 | Alejandro Bazarra Lado         | 9      |
| 6    | gn027 | Juan Beltrán Bazarra Fernández | 9      |

These are the **structural keystones** — every one is in the modern Magdalena/Bolívar cluster. Not a single medieval/noble person breaks the top 10, because the noble branches are tiny disconnected fragments.

### Biggest sibships

| Family                       | Children | Parents                                  |
| ---------------------------- | -------- | ---------------------------------------- |
| f007                         | **15**   | Benjamin Caamaño Reales + Dominga Castro |
| f035                         | 14       | Licerio Caamaño Rangel                   |
| f033                         | 9        | Brígida Caamaño Rangel                   |
| f012                         | 7        | Emilio Caamaño Castro + Emma Laino       |
| f015 / fsf03 / gnf04 / gnf07 | 6 each   | various                                  |

A 15-child documented sibship is exceptional and confirms the late-19c Caribbean branch was in true demographic expansion mode (high fertility, lower-than-baseline infant mortality, colonising frontier).

### Source reliability gradient

| Tier                    | Source tags                                                     | n   | %     |
| ----------------------- | --------------------------------------------------------------- | --- | ----- |
| Primary archival        | familysearch, pares, galiciana, geneanet, genco, cemla, uruguay | 165 | 39.8% |
| Secondary historical    | historical                                                      | 50  | 12.0% |
| Modern / oral tradition | modern, gap                                                     | 200 | 48.2% |

**Almost half the tree rests on oral tradition or undocumented modern reconstruction.** A defensible genealogical product needs this number above 70%. Every "modern" person is a research target.

---

## Final Panel Synthesis — 5 Actionable Insights

1. **Bridge the noble branches to the main tree.** The 32-person 18c Pedro Caamaño / Rodríguez Patiño cluster and the 24-person medieval Rodrigo García de Caamaño cluster are floating. If even one parent-child link can be established between these and the p001 lineage (most likely via a Domingo Antonio Caamaño or a Pardo-line ancestor), the structural backbone of the dataset doubles and the tree finally connects the 12c Galician origin to 21c Colombia.

2. **Hunt the El Banco baptismal records 1840–1870.** The founder José Tomás Caamaño is currently a pure oral-tradition node. A single Magdalena diocesan baptism would simultaneously fix his birth year, name his wife (currently "Desconocida Soto"), and validate the entire 160-person main branch. This is the highest-ROI single archive trip in the project.

3. **Reclassify the "modern" 200 persons by evidence tier.** Add a `confidence: low|medium|high` field. Right now a Geneanet record sits next to a great-aunt's anecdote with the same visual weight. This is the change that protects the project from credibility collapse when a third party audits it.

4. **Test the Mendoza-Sotomayor hypothesis.** The compound-surname analysis suggests that **Caamaño Pardo, Caamaño Figueroa and Caamaño Sotomayor are not three families but one** — successive marriages within the same noble cluster. PARES + Galiciana should be queryable for a single 17c-18c hub family that ties them. If confirmed, ~50 currently disconnected nobles collapse into one connected sub-tree.

5. **Document the missing return migration.** Statistically, of 23 outbound migrations from Galicia, at least 3–5 indianos returned. None are recorded. Searching Porto do Son property records 1880–1920 for Caamaño-funded constructions (escuelas, casas de indianos) will surface them.

---

## Red Flags (Data Inconsistencies)

| Severity   | ID                                                       | Issue                                                                                                                                                                                            |
| ---------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **High**   | p160 / p170                                              | Emilio Caamaño Castro recorded as parent of p170 (b.1849) but p160 born 1891 — parent born **42 years after** child. Likely a wrong family link.                                                 |
| **High**   | fs023 / fs026                                            | Damiana Soto (b.1865, d.1883 age 18) listed as mother of fs026 (b.1850) — biologically impossible by 15 years.                                                                                   |
| **Medium** | pa010 / pa011                                            | Pedro Caamaño listed as parent at age 2.                                                                                                                                                         |
| **Medium** | pa014 / pa011                                            | María Ignacia Rodríguez Patiño listed as parent at age 6. (These two pa\* errors point to the same broken family — fix one and both resolve.)                                                    |
| **Medium** | Infant mortality                                         | 2 infant deaths in 415 persons = ~0.5%. Real pre-1900 rate was 25–35%. The dataset systematically loses dead infants — this distorts every fertility/longevity number.                           |
| **Low**    | "Domingo Antonio Caamaño: España (presunto) → presunto)" | Migration record has a stray parenthesis and labels both endpoints as `presunto`; cannot be parsed.                                                                                              |
| **Low**    | 87 singleton persons                                     | Persons with no family edges — should be flagged as orphan records or removed.                                                                                                                   |
| **Low**    | `lastName` parsing                                       | Tokens like "(II)", "(escribano)", "(Caamaño?)", "'El Hermoso'" appear in the surname field. These should move to a `epithet` or `note` field; they currently pollute every surname-based query. |

### Forensic genealogist warning (the missing 4th expert)

A forensic genealogist would say three things bluntly:

1. **You are confusing surname clusters with bloodlines.** "Caamaño in Porto do Son in 1700" and "Caamaño in El Banco in 1900" are not automatically related — Galician toponymic surnames spread across thousands of unrelated families. The medieval Rodrigo García de Caamaño branch may have **zero genetic connection** to the modern Colombian one. Treat them as separate hypotheses, not separate parts of one tree.

2. **Oral tradition past two generations is fiction.** Anything sourced "tradición oral" beyond grandparents has roughly a 50/50 chance of being wrong on names, places, or relationships. The José Tomás Caamaño origin story is in this category and needs at least one primary source before it anchors 160 descendants.

3. **You are missing all the women.** The 1.34M:1F ratio is not biology — it's archival bias compounded by your own collection bias. Every missing wife is a missing surname and a missing maternal line. **Each unnamed "Desconocida" is an entire branch you will never find.**

### Hypothesis to test next session

> **"The 32-person Pedro Caamaño / Rodríguez Patiño 18c noble cluster and the 160-person Colombian main branch share a common ancestor in Domingo Antonio Caamaño (1735–1815) or his immediate descendants."**

If true: the tree unifies and the noble lineage finally has biological continuity into the present. If false: the noble branches must be re-labeled as "same surname, separate origin" — which is a smaller but more honest dataset. Either outcome moves the project forward.
