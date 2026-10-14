# Untapped Sources — Results (2026-10-14)

**Goal:** Brecha 2 (origin/parents of p001 José Tomás Caamaño Sr) and any 19th-century Caamaño in the Colombian Caribbean (Rioviejo, Mompós, Magangué, El Banco, Cartagena, Magdalena).
**Raw data:** `research/untapped-2026-10/` (AGN API JSON, Banrep OCR JSON, Wikidata CSV, Internet Archive full-text hits, reusable scripts in `scripts/`).
**Classes:** PROVEN = primary source states it, with reference. CIRCUMSTANTIAL = right surname + right place/time, no stated link to our line. NOISE = homonyms, other countries, OCR false positives.

**Bottom line:** No document links anyone to p001, Trinidad Caamaño or José Tomás Caamaño Soto. Brecha 2 is **still open**. The run did find the **first documented Caamaño family in the Mompós district before Trinidad**: Ignacio Caamaño, an elderly man murdered on his estancia near Mompós in January (most likely 1842), who had a granddaughter. It also found a **B. A. Caamaño trading in El Banco in 1898**. Both are CIRCUMSTANTIAL only.

---

## 1. AGN Colombia (Archivo General de la Nación)

**Access change:** `consulta.archivogeneral.gov.co` (ArchiDoc) **no longer resolves in DNS**. The catalog now lives in **DATAVIVA**:
- `https://dataviva.archivogeneral.gov.co/explore/agn` is the full descriptive catalog (Colonia, República, Archivo Anexo, Notarías and others). It has a public JSON API: `POST /api/search/public` with root id `66acc915a58c7bfd59b83353` (the whole AGN), and `GET /api/resources/public/details/{id}`. The script is in `scripts/dvq.py` and `scripts/dvd.py`.
- `https://datavivadigital.archivogeneral.gov.co/browse` is a small digitized subset (LIBNOVA). Searching Caamaño, Caamano, Camaño or Rioviejo returned **0 hits** there. As a check that the search works, Cartagena returned 346.

The search ignores accents (ñ is treated as n). It covers titles, scope notes and name indexes, **not** the text of the documents.

| Query | Hits |
|---|---|
| Caamaño / Caamano / Caamaña | 9 (same set) |
| Camaño / Camano | 8 (same set) |
| Caamanho | 0 |
| "Trinidad Caamaño", "José Tomás Caamaño", "Damiana Soto" | 0 |
| Rioviejo | 5 |
| Río Viejo | 34 (mostly other rivers) |

**Findings:**

| Item | Reference | Class |
|---|---|---|
| **Don Gabriel de Camano/Camaño, corregidor**, writes from **Villa de San Benito** (San Benito Abad, Sabanas) on 6 Nov 1742 about smuggling routes between Tolú and Tegua | AGN, Colonia, Aduanas-Cartas, `ADUANAS-CARTAS.SC.3,10,D.181`, ff. 1036-1039 | CIRCUMSTANTIAL (a Caamaño official in the Cartagena province, 88 years before Trinidad) |
| Same Gabriel de Camano, writing from **Sampués** in 1742, collected 60 natives of San Andrés (Montes de María) for the Cartagena fortifications | `REAL-HACIENDA-CARTAS.SC.52,7,D.84`, ff. 476-479 | CIRCUMSTANTIAL |
| Gabriel de Camaño, juez de residencia at Mariquita, 1736 | `RESI-ANTIOQUIA.SC.54,12,D.14`, ff. 714-835 | CIRCUMSTANTIAL (same man, at an earlier post) |
| "Causas de Gabriel de Caamaño y Florentino Barrera", 1763 | `CRIMINALES-JUICIOS.SC.19,183,D.87`, ff. 574-579 | CIRCUMSTANTIAL (possibly the same man, or a son) |
| Presbítero Ignacio Caamaño/Camaño, priest of Bogotá and Calandaima, 1730s-1750s | `CENSOS-DEPTOS.SC.10,4,D.45`; `SC.10,5,D.33`; `HISTORIA-ECLESIASTICA.SC.30,16,D.5`; `CURAS-OBISPOS.SC.21,13,D.37`; `CAPELL-PA-VE-CUN-MAG.SC.9,1,D.16` | NOISE (Andean region; a priest) |
| Jacinto Caamaño (navigator) at Guayaquil, 1800; Mendoza Caamaño viceroy, 1734; José María Caamaño (Ecuador), 1886; Antero Camaño (Guamo), 1829; Pablo Camaño, 1815; Benito Camaño (Guayaquil), 1825; Manuel Caamaño (lawyer), 1948 | various | NOISE |
| 1833 population census of Mompós province, which includes the **parroquia de Rioviejo** (cantón de Simití) | `CO.AGN.SAA-II.12.1.1.4`, ff. 15-17 | NOISE for names: it gives only aggregate counts of men and women, with no names |
| 1791 homicide case brought by Miguel Moya, alcalde of Rioviejo (then in the jurisdiction of Tamalameque) | `CRIMINALES-JUICIOS.SC.19,115,D.1` | NOISE (no Caamaño); context only |

**Negative result worth keeping:** the AGN catalog has **no indexed Caamaño in the Mompós, Rioviejo, Magangué or El Banco area in the 19th century**. Its Notarías holdings are mostly Bogotá protocols. The Cartagena and Mompós notarial books are not indexed by name.

## 2. Biblioteca Nacional de Colombia

- `bibliotecadigital.bibliotecanacional.gov.co` does not resolve in DNS.
- The live catalog, `catalogoenlinea.bibliotecanacional.gov.co` (SirsiDynix, including the digitized 19th-century press "PRENSA XIX DIG"), returns **HTTP 403 with a "Verifying your browser" bot challenge**. I stopped there, per the rules. **Not searched.** This is still a manual job for a human using a normal browser.

## 3. Banco de la República — Biblioteca Virtual (babel.banrepcultural.org)

The CONTENTdm API is open: `dmQuery` with full text over the OCR, and `dmGetItemInfo` returns the OCR text. "Caamaño" gave 43 records across all collections. In the press collection (`p17054coll26`) "Caamaño" gave 43 page-level hits and "Camaño" gave 18 (mostly OCR misreadings of "camino").

| Finding | Source | Class |
|---|---|---|
| **Ignacio Caamaño**, "hombre honrado i de una edad avanzada", lived on **his estancia four leagues from the city of Mompós on the bank of the Magdalena**. He was killed on the night of **20 January** by his servant José Antonio Linares and found dead on the 21st. He was **buried on 22 January in the parroquia de San Fernando**. His **granddaughter Buenaventura ("Ventura") Caamaño, aged 9**, had been brought from the neighbouring "ladera de Ancón"; she was assaulted and drowned in the river. Linares was captured on the 24th in the parroquia del Guamal. The first-instance death sentence was given by the juez 2° subrogado of the circuito de Mompós on 22 Nov [1842]. The Tribunal de Cartagena approved it on **19 Dec 1842**, signed by Ramón Benedetti and Francisco de la Espriella. | *Semanario de la Provincia de Cartagena*, n.° 28, 22 Jan 1843, "Administración de Justicia". Banrep `p17054coll26` item 8092 (parent 8169): https://babel.banrepcultural.org/digital/collection/p17054coll26/id/8092 | **CIRCUMSTANTIAL, high value.** This is a primary published court ruling that proves a Caamaño family (grandfather plus at least one child who had a daughter around 1833) living near Mompós around 1842, about 60 km downriver from El Banco and in the same river corridor as Rioviejo. **It does not name any link to Trinidad or p001.** The OCR damages the year of the murder; it is most likely January 1842. |
| **Justo J. Caamaño** signs a patriotic declaration by the vecinos of **Ciénaga (Magdalena), dated 21 May 1852**, alongside Fontalvo, Rada, Manjarrés, Labarcés, Escalona and others | *Gaceta Oficial* n.° 1401, 5 Jul 1852, Banrep item 25699 | CIRCUMSTANTIAL (a Caamaño in the Magdalena province, 1852) |
| **"De venta en casa de B. A. Caamaño. Banco. Departamento del Magdalena."** A booklet advertisement repeated in nos. 47-55 (15-24 Nov 1898) | *El Autonomista* (Bogotá, a Uribe Uribe daily), Banrep items 29044-29052 | CIRCUMSTANTIAL. A **B. A. Caamaño was a merchant or agent in El Banco in 1898**, the same town and time as p013 Benjamín Caamaño Reales (children baptized at El Banco 1891-1901). B. A. would fit "Benjamín A.", but the source does not say so, and our tree has no middle initial for Benjamín. |
| **Dr. Manuel F. Caamaño**, lawyer practising in the circuits of Santa Marta and Ciénaga (1917); Juez 3.° del Circuito de Santa Marta, Apr 1913 (*Diario Oficial* 1914, archive.org `diariooficial1914colo_0`); suplente for the Senate, 1916; **Governor of Magdalena, Oct-Nov 1939** (*El Estado*, Santa Marta); Abogado Consultor de la Presidencia, 1941 | *El Renacimiento* (Santa Marta) 18 May 1917; *La Doctrina* (Ciénaga) 1917; *El Estado* nos. 4718-4746 (1939); IA `diariooficial1916colo_3` and `diariooficial1941colo` | CIRCUMSTANTIAL. He was a prominent Magdalena Caamaño, born around or before 1888. **Possible identity with p019 "Manuel Felipe Caamaño Castro" (son of Benjamín), but this is unproven.** If he was a judge in 1913 he was probably born before Benjamín's children who are documented from 1891, so he may instead be a brother or cousin of Benjamín. |
| *El Banco: ayer, hoy y siempre* by **Guillermo Barreto & Miguel Caamaño** (Santa Marta: Pro Gama, 2001), cited in two Banrep studies of the Ciénaga de Zapatosa | Banrep items `p17054coll18` 195 and 14 | Lead (secondary source). It is a **local history of El Banco co-written by a Caamaño** and may contain family tradition about the arrival of the Caamaños. |
| José María Caamaño (Ecuador) in *Gaceta Oficial* 1850 and later papers; Luisa Caamaño de Montero and María Caamaño in the Bogotá directory of 1893; Rafael Caamaño in Guayaquil, 1877; Urbano J. Camaño, Bogotá club, 1899; Juan Camaño, 1856 list; Toribio Camaño, Cundinamarca, 1850 | various | NOISE |

## 4. Wikidata SPARQL

- Surname items: Q42591785 (Caamaño), Q37444084 (Caamano), Q50128810 (Camaño), Q36920167 (Camano). P734 gave 50 people. A full-text search over human items gave 180 rows.
- **0 people with a birth or death place in Colombia.** The pre-1900 entries are Galician nobility (García de Caamaño y Mendoza; Mendoza Caamaño; José Caamaño y Gayoso c.1735-1815; Joaquín Caamaño Pardo c.1772-1849; Juan Josef Caamaño y Pardo 1761-1819), Ecuador (José María Plácido Caamaño, Ángela Caamaño de Vivero), Argentina (Joaquín Camaño y Bazán) and Mexico (Juan B. Caamaño).
- **Class: NOISE** for our line. Wikidata has no bridge persons. Files: `wikidata-surname-P734.csv`, `wikidata-fulltext-humans.csv`.

## 5. Google Books

- **Not reachable.** The anonymous Books API returned "Quota exceeded (Queries per day)". The HTML search at `google.com/search?tbm=bks` is gated behind JavaScript. HathiTrust full-text search returned a **Cloudflare challenge (403)**. I left both alone, per the rules.
- **Substitute: Internet Archive full-text search** (`archive.org/services/search/beta/page_production`, backend `fts`).
  - "Trinidad Caamaño": 2 hits, both the Ecuadorian Caamaño y Gómez Cornejo family.
  - "José Tomás Caamaño": 0.
  - "Caamaño Reales": 0.
  - "Damiana Soto": 29, none in Colombia.
  - "Caamaño Soto": 8. The main hit is José Demetrio Caamaño Soto of Liberia, **Costa Rica**, 1905. NOISE.
  - "Santa María de Caamaño": 13, all gazetteer entries for the Galician parish.
  - "Caamaño" Rioviejo: 6, all coincidences.
- Restrepo Sáenz and Flórez de Ocáriz could not be searched without Google Books. They remain open.

---

## Proposed tree additions (NOT applied; for LM to decide)

1. **New person `col001`: Ignacio Caamaño** (born before about 1780, died 20/21 Jan [1842], estancia near Mompós; buried 22 Jan at parroquia de San Fernando). certainty `circumstantial`. Source: *Semanario de la Provincia de Cartagena* n.° 28, 22 Jan 1843 (Banrep p17054coll26/8092). Note: "no stated relation to Trinidad/p001".
2. **New person `col002`: Buenaventura "Ventura" Caamaño** (born about 1833, died Jan [1842], Magdalena river near Mompós), granddaughter of col001. Her parent is unnamed. Same source.
3. **Note on p013 Benjamín**: "A 'B. A. Caamaño' sold goods in El Banco in Nov 1898 (*El Autonomista* nos. 47-55). Identity unproven."
4. **Note on p019 Manuel Felipe Caamaño Castro**: "Possible match with Dr. Manuel F. Caamaño (judge, Santa Marta 1913; Magdalena governor 1939). Unproven; the dates may point to an older relative."
5. Optional colonial context person: **Gabriel de Caamaño/Camaño**, corregidor (Sabanas/Tolú, 1742), AGN refs above. Class `circumstantial`, not linked.

## Concrete next steps (highest return first)

1. **FamilySearch "Colombia, registros parroquiales": burials of San Fernando (Bolívar), January 1841-1842.** Find Ignacio Caamaño's burial entry, which may give his origin ("natural de Galicia"?), his age and his wife. Then check **Mompós baptisms around 1830-1835 for Buenaventura Caamaño** to find her parents. This is the most direct test of whether a Spanish-born Caamaño sat in the Mompós district before Trinidad.
2. **The case file**: the causa criminal against Juan [José] Antonio Linares, Juzgado 2.° del Circuito de Mompós, 1842, which went to the Tribunal de Cartagena on consulta (Dec 1842). Ask at the **Archivo Histórico de Cartagena** and the **Archivo Histórico de Mompós**. Witness testimony would name Ignacio's children.
3. **Get the book *El Banco: ayer, hoy y siempre*** (Barreto & Caamaño, Pro Gama, Santa Marta, 2001). Try Banrep or the Biblioteca Nacional by interlibrary request, or contact co-author Miguel Caamaño directly. He may be family.
4. **Biblioteca Nacional "Prensa XIX digitalizada"**: search by hand in a normal browser for Caamaño and Camaño in Mompós, Cartagena and Santa Marta papers from the 1840s-1890s. Automated access is blocked.
5. **AGI and PARES (follow-up):** look for Gabriel de Caamaño as corregidor de Tolú / Sabanas around 1740, which may give his origin.
6. **Google Books (Restrepo Sáenz, Flórez de Ocáriz)**: retry by hand in a browser; the API quota was exhausted.
