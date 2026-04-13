# Structural Bridging Analysis — Caamaño Family Tree

**Generated:** 2026-04-13
**Source:** `src/data/caamano-family.json` (415 persons, 111 families)
**Method:** Union-Find over family edges → component decomposition → cross-component name/notes matching.
**Status:** Analysis only. No changes applied to `caamano-family.json`. User review required before any merge.

---

## 1. Component statistics

- **Total persons:** 415
- **Total families:** 111
- **Total connected components:** **112**
- **Main component (contains p001):** **160 persons (38.6%)**
- **Non-main components with ≥2 persons:** 24
- **Singletons (isolated persons):** **87 (21.0%)**

### Size histogram

| Component size |                                                                             Count |
| -------------: | --------------------------------------------------------------------------------: |
|            160 |                                                                    1 (main, p001) |
|             32 |                                                       1 (C1 Bazarra/Porto do Son) |
|             24 |                                                      1 (C2 Casa de Noya medieval) |
|             14 |                                     1 (C3 Ribeira/Palmeira — Pablo Caamaño Villa) |
|             10 |                                                   1 (C4 Ferrol Pardo de Figueroa) |
|              9 |                                          1 (C5 Dominican Republic / Caamaño Deñó) |
|              7 |                               3 (C6 Muros 1647, C7 Puebla MX, C8 Morales Bolívar) |
|              6 |                                                       2 (C9 Rioviejo, C10 Padrón) |
|              5 | 4 (C11 El Banco Licerio dup, C12 Jacobo Malvarez, C13 Puerto Rico, C14 Noia 1531) |
|              4 |                                                1 (C15 Miguel/Rangel El Banco dup) |
|              3 |                                                                                 4 |
|              2 |                                                                                 5 |
|              1 |                                                                            **87** |

The tree is deeply fragmented: only 38.6% of persons sit on the main p001 lineage, and nearly 1 in 5 is a singleton with no family edge at all. Most singletons are recently-scraped Geneanet and FamilySearch hits lacking a parent/child link.

---

## 2. Top 10 bridge proposals

Confidence scale: **strong** (evidence already sufficient to merge), **moderate-strong** (likely same person; double-check one source), **moderate** (plausible, need archival confirmation), **weak-moderate** (circumstantial).

### #1 — Merge C11 into main via p046 Licerio Caamaño Rangel — **strong**

**Component C11:** `p171` Licerio Caamaño Rangel, `p172` Ana María Benavides, `p173` Tito, `p174` Emilio, `p175` Néstor (5 persons).

**Target in main:** `p046` Licerio Caamaño Rangel.

**Action:** `p171` is a duplicate of `p046`. Collapse them. Attach `p172` as a third spouse of `p046` via a new family, with `p173`/`p174`/`p175` as children of that union.

**Evidence:** Identical full name "Licerio Caamaño Rangel", identical birthplace (El Banco, Magdalena). `p046` is already explicitly noted as "Hijo de Miguel Caamaño Soto y Ruthesinda Rangel" and carries two prior unions (f035 unknown + f036 Villarreal). `p171` notes describe a parallel third union to Ana María Benavides, documented in FamilySearch El Banco records, same parish (Santa Iglesia del Carmen / Film #004001320) as the rest of `p046`'s children.

**Net effect:** +4 persons into main component (160 → 164).

**Confirmation needed:** Baptismal certificates of `p173`/`p174`/`p175` naming Licerio Caamaño Rangel as father.

---

### #2 — Merge C15 into main (Miguel + Rudecinda Rangel family) — **strong**

**Component C15:** `p176` Miguel Caamaño, `p177` Rudecinda Rangel, `p178` Jacob Caamaño Rangel, `p179` Salvadora Blanquicet (4 persons).

**Target in main:** `p008` Miguel Caamaño Soto, `p009` Ruthesinda Rangel, `p047` Jacob Caamaño Rangel, `p048` Salvadora Blanquicet.

**Action:** Four-for-four duplicate. Merge `p176`→`p008`, `p177`→`p009`, `p178`→`p047`, `p179`→`p048`. Delete C15's families.

**Evidence:** All four names match. `p178` notes cite the 28-abril-1909 marriage date and children Daniel Enrique (1910, 1915), Ruth María (1912), Salud, Elías José, Miguel Gustavo — children that already exist as descendants of `p047` in the main tree. This is almost certainly an accidental re-scrape of the same family.

**Net effect:** Removes 4 duplicate records; consolidates El Banco branch.

**Confirmation needed:** None — already confirmed by FamilySearch.

---

### #3 — Merge fs051/fs052/fs053 into C6 (Muros Juan de Caamaño line) — **strong**

**Source (3 persons):** `fs051` Juan Matías Martínez Porrúa Caamaño (1681), `fs052` Antonia Benita Revola Porrúa Amazur (1695), `fs053` Bernardo Benito Martínez Porrúa.

**Target component:** C6 (7 persons: `gc001` Juan de Caamaño, `gc002` María Alfonso Martínez, `gc003` Luis de Caamaño Martínez 1647, `gc004` María Oáñez de Patiño, `gc005` Juan Matías Martínez Perrúa y Caamaño 1681, `gc006` Antonia de Relova Perrúa y Amúzar, `gc007` Bernardo Martínez y Perrúa 1720).

**Action:** `fs051`→`gc005`, `fs052`→`gc006`, `fs053`→`gc007`. Collapse trio into C6.

**Evidence:** Birth year 1681 match, same documented marriage (03-sep-1713 La Coruña), same son Bernardo 1720→Antioquia 1744, all in Villa de Muros. `fs051-53` is an independent re-entry from FamilySearch Pedigree Resource File (Carlos Mauricio Otálvaro, 2024-07-18) of the exact line already in Genealogías de Colombia. Triple-sourced.

**Net effect:** Consolidates Muros 1647→Antioquia 1744 colonial branch (7→10 persons). **Does not yet attach to main p001** — C6 remains its own component, but cleaner. See proposal #9 for the next step.

---

### #4 — Link C8 Morales/Bolívar cluster to main via a new sibling of p006 — **moderate-strong**

**Component C8 (7):** `fs017` José Tomás Caamaño (b.1890 Morales, Bolívar), `fs018` Virginia Benavides, `fs019` Glicerio Caamaño Benavides, `fs020` Matilde Fambrant, `fs021` Glicerio Caamaño Fambrant (1954), `fs024` Ruth Caamaño Benavides (1935), `fs025` Ezequiel Benavides.

**Target in main:** Descendants of `p006` José Tomás Caamaño Soto + `p007` Faustina Reales.

**Action:** Do not collapse `fs017` onto an existing person. Instead introduce a placeholder intermediate sibling ("NN Caamaño Reales") as a new child of (`p006`, `p007`), and make `fs017` their son. This preserves the Morales/Margarita/Barranca branch as a distinct cousin line of `p013` Benjamín.

**Evidence:** Geographic cluster (Morales, Margarita, Barranca — all Bolívar, ~40 km south of El Banco, Magdalena) sits inside the main branch's footprint. FamilySearch ark 3:1:3QSQ-G9GZ-C9Y5 (partida N°955, image 285/354) + ark 1:1:XS6D-JNV2 (Ruth Caamaño Benavides marriage 09-may-1954) already name José Tomás Caamaño as paternal grandfather of `fs021`. Generation math (b.1890 for `fs017` vs ~1870 for `p013`) places `fs017` as a cousin, not a son, of `p013`.

**Net effect:** +7 persons into main (plus 1 placeholder).

**Confirmation needed:** The Magangué partida N°955 and matrimonio N°128 should explicitly name the paternal grandparents of `fs017`. Without that, this is moderate, not strong.

---

### #5 — C9 Rioviejo cluster (Trinidad + Damiana Soto) — **moderate-strong**, handle with care

**Component C9 (6):** `fs022` Trinidad Caamaño (~1830), `fs023` Damiana Soto (~1825), `fs026` José Tomás Caamaño Soto (~1850), `fs027` Dolores Castañeda, `fs028` Suzana Muñoz, `fs029` Emeteria Soto.

**Target in main:** `p006` José Tomás Caamaño Soto (possibly also `p001`/`p002`).

**Action:** Merge `fs026`→`p006`. **Do not** automatically merge `fs022`/`fs023` onto `p001`/`p002` — name/place conflict.

**Evidence:** `fs026` carries the same "Caamaño Soto" combination as `p006` and is dated ~1850. Its parents `fs022` Trinidad + `fs023` Damiana Soto would, however, rewrite `p001`'s first name from "José Tomás" to "Trinidad" — this contradicts oral tradition and the `p001` baptism gap. Safer reading: `fs022` and `p001` are brothers, both Caamaño, both married women surnamed Soto; the "Caamaño Soto" of `p006` actually descends from the `fs022` branch and was mis-assigned to `p001`'s line.

**Net effect:** Either +6 into main (aggressive) or +5 with `fs022`/`fs023` kept as sibling sub-branch.

**Confirmation needed:** FamilySearch Magangué partida N°128 and the 16-may-1883 Rioviejo defunción of Damiana Soto — need to verify parents of `fs026` to decide whether `p006` truly descends from Trinidad or from José Tomás.

---

### #6 — C12 (Jacobo Caamaño Malvarez, Porto do Son 1798) as candidate parent of p001 — **moderate**

**Component C12 (5):** `gn010` Jacobo Caamaño Malvarez (~1770), `gn011` Josefa Cernadas Yáñez (~1775), `gn012` Joaquina (~1800), `gn013` María Josefa (~1802), `gn014` Vicente (~1805).

**Target in main:** `p001` José Tomás Caamaño (~1815).

**Action:** Add `p001` as a late child (~1815) of (`gn010`, `gn011`) — marked "proposed, unconfirmed" until AHDS confirms.

**Evidence:** `gn010` is sourced from Geneanet `larapat` (Patrice Lara, verified 2026-04-13) with an explicit marriage record 4-NOV-1798 in Porto do Son — the same parish as `p001`'s oral tradition. Known children span 1800-1805; a child born ~1815 is chronologically possible as a late-life birth. `gn010` is currently the only documented Caamaño patriarch married in Santa María de Caamaño parish in the correct window.

**Net effect:** +5 persons into main.

**Confirmation needed:** AHDS Libro de bautismos Santa María de Caamaño ~1810-1820 searching for "Joseph Thomás, hijo de Jacobo Caamaño Malvarez y Josefa Cernadas Yáñez". A single baptism closes Gap 2.

---

### #7 — C3 (Pablo Caamaño Villa / Ribeira-Palmeira clan) as sibling ancestor of p001 — **moderate**

**Component C3 (14):** `fs001`-`fs013` rooted at `fs001` [Desconocido] Caamaño (~1770, Muros) and his son `fs003` Pablo Caamaño Villa (1802).

**Target in main:** `p001` José Tomás Caamaño (~1815).

**Action:** Per project CLAUDE.md, Pablo (1802) and p001 (~1815) are contemporaries — likely brothers sharing `fs001` as father, or uncle-nephew. Model them as siblings under a new placeholder father drawn from `fs001`. Moves all 14 C3 persons into main.

**Evidence:** `fs003` is the only "Caamaño Villa" in La Coruña database; Muros is adjacent to Porto do Son; generational math works; CLAUDE.md already labels Gap 2 as a "proof gap, not a time gap." This is the working hypothesis of the project.

**Net effect:** +14 into main (the biggest single-bridge payoff on the list).

**Confirmation needed:** AHDS bautismos Muros/Palmeira/Sta María de Caamaño 1795-1820.

---

### #8 — Merge C12 into C1 (Jacobo Malvarez → Bazarra/Porto do Son clan) — **moderate**

**Source:** C12 (5 persons).
**Target:** C1 (32 persons, Bazarra Caamaño cluster: `pa010` Pedro Caamaño ~1695, `pa011` Andrés Caamaño ~1722, `gn007` Pedro Bazarra Caamaño 1712, etc.).

**Action:** Attach `gn010` Jacobo (~1770) as grandson of `pa010` Pedro Caamaño (~1695, documented cantero of Santa María de Caamaño in PARES 6092354 f.174v). Chronologically clean: Pedro → unknown intermediate → Jacobo.

**Evidence:** Same parish, consecutive generations of documented Caamaños. `gn007` is already triple-sourced (PARES + Depo + Geneanet) per CLAUDE.md and is marked as the key bridge candidate for Gap 1. Merging C1+C12 creates a 37-person Porto do Son clan — the single strongest non-main cluster.

**Net effect:** Does NOT yet attach to main, but consolidates the two biggest Porto do Son components and sets up a larger target for proposals #6, #7, #9.

**Confirmation needed:** AHDS Libro de matrimonios 1663-1745 fol. 113 + Depo FE10 files 1.185/31-34.

---

### #9 — Link C17 (Francisco de los Santos Thomás de Caamaño) to C1 or to main via name "Thomás" — **moderate**

**Component C17 (3):** `pa003` Santos de Caamaño (~1690), `pa004` Juan de los Santos de Caamaño (~1720), `pa005` Francisco de los Santos Thomás de Caamaño (~1725).

**Action:** Merge C17 into C1 as a sibling Santos-Caamaño branch within Santa María de Caamaño. Tentatively propose `pa005` as great-grandfather of `p001` José Tomás (3 generations ≈ 90 years).

**Evidence:** PARES 6092354 folio 0282 Catastro de Ensenada explicitly includes the patronymic **Thomás** in this branch — the only documented occurrence of "Thomás" among Sta María de Caamaño Caamaños in the 18th century, and the exact name recycled in `p001` "José Tomás". Galician naming custom recycles patronymics every 2-3 generations.

**Net effect:** +3 into C1 (after proposal #8 merges C1 to main: +3 into main).

**Confirmation needed:** AHDS bautismos 1720-1730 Sta María de Caamaño + AHPA protocolos notariales de Noia 1740-1780.

---

### #10 — Merge C14 (García de Caamaño y Sotomayor 1531 Noia) into C2 (Casa de Noya medieval) — **weak-moderate**

**Source:** C14 (5 persons, `fs030`-`fs034`, Noia 1531-1573).
**Target:** C2 (24 persons, historical Casa de Noya `h001`-`h025`, 1100s-1540s).

**Action:** Attach `fs030` García de Caamaño y Sotomayor (1531) as a younger cadet relative of `h019` García de Caamaño de Mendoza "El Alto" (d.1540). Same parish (Noia), same surname compound ("Caamaño y Sotomayor"), same half-century.

**Evidence:** "Caamaño y Sotomayor" appears only in the noble line; fragmentary FamilySearch 1531-1573 Noia records plausibly fit the García Carraffa Tomo XX genealogy.

**Net effect:** 0 into main. **Important caveat:** C2 itself is not in the main p001 component, and per the user's instructions, famous historical figures (Viceroy of Peru, President of Ecuador) must not be merged into the Colombian line without strong evidence. This merge only consolidates two historical components; it does not touch `p001`.

**Confirmation needed:** García Carraffa Tomo XX cross-reference + Depo fondo 1.185/31-34 to confirm the Sotomayor branching.

---

## 3. Confirmed-separate components (do NOT merge)

| Component                                                                              | Why separate                                                                                                                                             |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **C5 Dominican Republic** — p197-p205, Francisco Alberto Caamaño Deñó (1932 president) | Source (mariela caamano blog) explicitly states connection to `p001` is unconfirmed. Santiago de Compostela → DR is a distinct Galician emigration line. |
| **C7 Puebla/Mexico** — gn043, gn056-gn061                                              | Independent 18th-century Galicia → Nueva España colonial migration. No shared ancestors with `p001` within documented window.                            |
| **C13 Puerto Rico** — gn045, gn052-gn055 (Tomás Raimundo Agapito Caamaño López 1811)   | Independent Caribbean branch. `gn053` Pablo Caamaño Federico is NOT `p152` Pablo Caamaño Perdomo.                                                        |
| **C18 Romelle/Zas** — h029-h031                                                        | Distinct hidalgo line from Zas (far north A Coruña), 1580-1618. Geographically and genealogically separate from Porto do Son/Noia cluster.               |
| **C10 Padrón** — fs045-fs050 (José María Caamaño Pardo 1818)                           | `fs045` notes explicitly state "NO es p001". Padrón is ~60 km north of Porto do Son.                                                                     |
| **C4 Ferrol Pardo de Figueroa** — 10 persons, 1695-1872                                | Noble Caamaño-Pardo-Figueroa line; distinct from Porto do Son peasant/marinero line. No documented bridge.                                               |

---

## 4. Orphan individuals potentially relinkable with more data

- **`cm001` / `cm005` Tomás Caamaño** (1863, Villagarcía → Buenos Aires 1905, with children Amalia + Manuel) — could link to the missing Argentine brother `p005`. Also appears to be a duplicate pair within the tree itself.
- **`cm006` Amalia + `cm007` Manuel Caamaño** — children on same voyage, should attach to `cm001`.
- **`gn042` Tomás Caamaño Listón** (1848, Muros) — same parish cluster as `p001`.
- **`pa008` / `pa009` Sebastián Caamaño + Rosa de Tourís** (~1715, Sta María de Caamaño) — likely sibling of the C17 Santos-Caamaño branch.
- **`fs054` / `fs055` Juan Antonio Caamaño + María Antonia Fernández** (Muros).
- **`fs056` / `fs057` Juan de Caamaño + María Rosa de Gándara Lestón** (Esteiro, Muros).
- **`fs064` Manuel Caamaño** (~1790, Galiciana Real Audiencia 1841 heritage dispute) — candidate son of `fs001`.
- **87 singletons** — all candidates for reattachment once primary sources surface. Most are recently-scraped Geneanet/FamilySearch hits lacking a family edge.

---

## 5. Summary of net effect if top 10 proposals executed

|         Proposal | New persons into main | New persons into "super-cluster" (C1 consolidated) |
| ---------------: | --------------------: | -------------------------------------------------: |
|    #1 C11 → main |                    +4 |                                                    |
|    #2 C15 → main |   +0 (removes 4 dups) |                                                    |
| #3 fs051-53 → C6 |                     0 |                                                    |
|     #4 C8 → main |                    +7 |                                                    |
|     #5 C9 → main |              +5 to +6 |                                                    |
|    #6 C12 → main |                    +5 |                                                    |
|     #7 C3 → main |                   +14 |                                                    |
|      #8 C12 → C1 |                     0 |                                                 +5 |
|      #9 C17 → C1 |                     0 |                                                 +3 |
|     #10 C14 → C2 |                     0 |                                                    |

If all high-confidence merges (#1, #2, #3, #4, #5) are executed, the main component grows from **160 → ~180 persons (43.4%)**. If #6 and #7 are also confirmed by AHDS, main reaches **~199 persons (48.0%)**. The research bottleneck is unambiguously AHDS baptisms 1795-1820 for Santa María de Caamaño parish.

---

## 6. Methodology notes

1. **Graph construction:** nodes = persons; edges = co-membership in a `families[].parents` or `families[].children` array. Union-Find with path compression.
2. **Name matching:** normalized (lowercased, accent-stripped) `firstName` + first token of `lastName`. Matches filtered to `lastName="caamano"` and birth-year delta ≤ 15 years where both known.
3. **Notes matching:** scanned non-main persons' `notes` for Spanish kinship triggers (`hijo de`, `hija de`, `padre`, `madre`) combined with a substring match against full names of main-component persons. ~50% of matches were false positives (ambiguous substring hits like "padre" inside generic narrative); the remainder are listed in the JSON proposals file.
4. **What this analysis did NOT do:** full fuzzy surname scoring, date-window propagation through ancestors, or LLM-driven note interpretation. A follow-up pass with those techniques would likely surface 5-10 more moderate-confidence bridges.

Structured machine-readable proposals: `/tmp/bridging-proposals.json`.
