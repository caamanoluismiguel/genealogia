# Auditoría de Certeza Documental — Árbol Caamaño v39

**Fecha:** 2026-04-13
**Versión del árbol:** 39
**Total personas:** 423
**Total familias:** 115

## Metodología

Cada persona del árbol ha sido clasificada en uno de tres niveles epistémicos basados en la calidad de sus fuentes documentales (campo `certainty` en el JSON):

- **✅ PROVEN** — documento primario archivístico o registro civil/parroquial directo que cita al individuo (signatura AGI/AHN/ARG/ARChV/AHUS/AHDS, partida, film FamilySearch, o civil/census). Base defendible académicamente.
- **🟡 CIRCUMSTANTIAL** — fuente secundaria publicada (García Carraffa, Genealogías de Colombia), bases indexadas (IGI, Pedigree Resource File, CEMLA), o tradición familiar con fechas internamente coherentes. Útil como hipótesis, no como prueba.
- **❌ HYPOTHETICAL** — tradición oral sin soporte documental, árbol de usuario sin corroborar, candidato especulativo, o marcador explícito de brecha.

**Regla de oro:** una persona es *PROVEN* solo si su existencia está confirmada por un documento contemporáneo (s.XIX en adelante) o una cita archivística directa. No basta con aparecer en un árbol Geneanet o en tradición familiar — eso es *CIRCUMSTANTIAL* como mucho.

## Resumen estadístico

| Nivel | Personas | % |
|---|---:|---:|
| ✅ PROVEN | 50 | 11.8% |
| 🟡 CIRCUMSTANTIAL | 312 | 73.8% |
| ❌ HYPOTHETICAL | 61 | 14.4% |

### Interpretación

- **Solo el 11.8% (50 personas) del árbol puede defenderse académicamente.** Este es el núcleo probado.
- **El 73.8% (312 personas) son circunstanciales** — coherentes pero sin cita archivística directa. Útiles para contexto, hipótesis, y narrativa. No son "hechos" genealógicos.
- **El 14.4% (61 personas) son hipotéticas** — deben ser tratadas como candidatos, no como antepasados.

## Desglose por fuente × nivel

| Fuente | Total | ✅ Proven | 🟡 Circumst. | ❌ Hipot. |
|---|---:|---:|---:|---:|
| **modern** | 194 | 8 | 181 | 5 |
| **historical** | 50 | 0 | 50 | 0 |
| **familysearch** | 54 | 11 | 37 | 6 |
| **pares** | 30 | 17 | 13 | 0 |
| **galiciana** | 13 | 10 | 2 | 1 |
| **geneanet** | 61 | 4 | 9 | 48 |
| **genco** | 12 | 0 | 12 | 0 |
| **cemla** | 7 | 0 | 7 | 0 |
| **uruguay** | 1 | 0 | 1 | 0 |
| **gap** | 1 | 0 | 0 | 1 |

## Observaciones clave

### 1. El linaje directo del propietario

- **✅ p023 Néstor Daniel Caamaño Castro** (1901, partida #1055 El Banco) — PROVEN
- **✅ p013 Benjamín Caamaño Reales** (~1870) — PROVEN (AHDS + registros Magdalena)
- **🟡 p037 Luis Caamaño Garizabal** (1949) — CIRCUMSTANTIAL (conocido por familia, sin cita civil en notas)
- **🟡 p151 Luis Miguel Caamaño Morales** (1983) — CIRCUMSTANTIAL (él mismo)
- **🟡 p006 José Tomás Caamaño Soto Jr** (~1840) — CIRCUMSTANTIAL (oral tradition, coherent dates)
- **❌ p001 José Tomás Caamaño Sr** (~1815) — HYPOTHETICAL (construcción narrativa, sin documento primario)

**La cadena documentalmente probada se rompe en p006/p013.** Entre Trinidad Caamaño (fs022, ~1830 Rioviejo, PROVEN) y Néstor Daniel (1901, PROVEN) hay una generación (Benjamín + José Tomás Jr) donde la evidencia es circunstancial, y un quiebre total hacia p001.

### 2. Cluster Muros confirmado

La **cadena Luaces-de-Caamaño** (3 generaciones en Muros 1660-1727) es el cluster documental más sólido conectado al apellido Caamaño en la zona ancestral:

- ✅ pa020 Simón de Luaces y Caamaño (~1660 Muros)
- ✅ pa021 Jacobo Luaces de Caamaño (~1690 Muros)
- ✅ pa022 Ignacio de Luaces (~1710 Muros, †Ultramar 1727)

Fuente: AGI CONTRATACION,5590,N.6. **Ningún enlace probado con p001.**

### 3. Caballeros de la Orden de San Juan de Jerusalén

Los 4 hermanos Caamaño Pardo Gayoso y Copeiro (Ferrol) son PROVEN via AHN OM Exp. 23367 y 23368:

- ✅ fs039 Juan José Caamaño y Pardo (1761)
- ✅ pa015 José Frutos (1772)
- ✅ pa016 Joaquín Gabino (1762-1849)
- ✅ pa017 Rafael José (1762)

Padres (PROVEN por referencia en expediente): fs037 Vicente Caamaño Gayoso Varela (1717) + fs038 María Josefa Pardo Copeiro (1735-1800). **Rama noble paralela sin conexión probada a nuestro linaje.**

### 4. Brechas pendientes

| Brecha | Estado | Personas del lado "arriba" | Conexión al siguiente nivel |
|---|---|---|---|
| **0. Modern → Trinidad** | ✅ Cerrada documentalmente | p023 Néstor (1901, PROVEN) → fs022 Trinidad (~1830, PROVEN) | Cadena completa |
| **2. p001 padres** | ❌ NO cerrada | ~20 candidatos HYPOTHETICAL/CIRCUMSTANTIAL (fs058 Joseph 1803, fs060 Francisco 1831, fs062 Benito 1837, cluster Luaces) | Sin enlace primario |
| **1. Noble medieval → común** | ❌ NO cerrada | h019 García "El Alto" (†1540) | ~300 años sin cadena sacramental |

### 5. Las 48 personas Geneanet hipotéticas

La mayor concentración de entradas HYPOTHETICAL (48/61 = 78%) viene de **árboles de usuario Geneanet** — principalmente la rama Bazarra Caamaño Porto do Son del usuario `larapat` (Patrice Lara). Estas personas (Pedro Bazarra Caamaño 1712-1767, su ascendencia y descendencia) tienen **fechas y lugares coherentes** pero su fuente es una contribución comunitaria, no archivos primarios.

**Recomendación:** mantenerlas en el árbol como CIRCUMSTANTIAL de contexto una vez que se obtenga confirmación multi-árbol independiente (otros usuarios Geneanet citándolas). Por ahora quedan como HYPOTHETICAL hasta que una fuente archivística independiente las valide.

## Personas PROVEN (las 50 defendibles académicamente)

| ID | Nombre | Fuente primaria |
|---|---|---|
| `fs017` | José Tomás Caamaño | FS primary document (ark/film/partida) |
| `fs018` | Virginia Benavides | FS primary document (ark/film/partida) |
| `fs019` | Glicerio Caamaño Benavides | FS primary document (ark/film/partida) |
| `fs021` | Glicerio Caamaño Fambrant | FS primary document (ark/film/partida) |
| `fs022` | Trinidad Caamaño | FS primary document (ark/film/partida) |
| `fs023` | Damiana Soto | FS primary document (ark/film/partida) |
| `fs026` | José Tomás Caamaño Soto | FS primary document (ark/film/partida) |
| `fs028` | Suzana Muñoz | FS primary document (ark/film/partida) |
| `fs029` | Emeteria Soto | FS primary document (ark/film/partida) |
| `fs039` | Juan José Caamaño y Pardo | FS primary document (ark/film/partida) |
| `fs054` | Juan Antonio Caamaño | FS primary document (ark/film/partida) |
| `fs058` | Joseph Caamaño | FS primary document (ark/film/partida) |
| `fs059` | Francisco García (presbítero) | FS primary document (ark/film/partida) |
| `fs060` | Francisco Caamaño | FS primary document (ark/film/partida) |
| `fs061` | Baltasar Caamaño | FS primary document (ark/film/partida) |
| `fs062` | Benito Caamaño | FS primary document (ark/film/partida) |
| `fs063` | Diego Caamaño | FS primary document (ark/film/partida) |
| `fs064` | Manuel Caamaño | FS primary document (ark/film/partida) |
| `fs066` | Teresa Caamaño | FS primary document (ark/film/partida) |
| `fs067` | José Caamaño Cerero | FS primary document (ark/film/partida) |
| `fs068` | Antonio Vicente de Lema Romero Caamaño | FS primary document (ark/film/partida) |
| `gn007` | Pedro Bazarra Caamaño | Geneanet w/ primary citation |
| `gn043` | José Mariano Caamaño Conde | Geneanet w/ primary citation |
| `gn045` | Tomás Raimundo Agapito Caamaño López | Geneanet w/ primary citation |
| `gn059` | José Luis Caamaño González | Geneanet w/ primary citation |
| `p007` | Faustina Reales | Modern family with primary document citation |
| `p013` | Benjamin Caamaño Reales | Modern family with primary document citation |
| `p014` | Dominga Castro | Modern family with primary document citation |
| `p023` | Néstor Daniel Caamaño Castro | Modern family with primary document citation |
| `p109` | Brígida Caamaño | Modern family with primary document citation |
| `p160` | Emilio Caamaño Castro | Modern family with primary document citation |
| `p161` | Justina Lucía Caamaño Castro | Modern family with primary document citation |
| `p195` | Tomás Caamaño (Caamaño?) | Modern family with primary document citation |
| `pa005` | Francisco de los Santos Thomás de Caamaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa015` | José Frutos Caamaño Pardo Gayoso y Copeiro | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa016` | Joaquín Gabino Caamaño Pardo Gayoso y Copeiro | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa017` | Rafael José Caamaño Pardo Gayoso y Copeiro | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa018` | Gabriel Romero de Caamaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa019` | Ángela Caamaño Pato | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa020` | Simón de Luaces y Caamaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa021` | Jacobo Luaces de Caamaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa022` | Ignacio de Luaces | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa023` | Domingo Varela Camaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa024` | José Varela Camaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa025` | María Jiansa y Caamaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa026` | Matías Caamaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa027` | Rosa Estévez | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa028` | José Manuel Caamaño y Estévez | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa029` | Isabel Caamaño y Estévez | PARES primary archival signature (AGI/AHN/ARG/ARChV) |
| `pa030` | Juan Camaño | PARES primary archival signature (AGI/AHN/ARG/ARChV) |

## Recomendaciones del auditor

1. **Publicar un "Árbol probado"** filtrado por `certainty === "proven"` — sería un subconjunto de 50 personas defendible para cualquier genealogista profesional.
2. **Filtrar UI del sitio** con toggle "Solo probados" / "Todos" para transparencia pública. Los visitantes merecen saber qué es hecho y qué es hipótesis.
3. **NO BORRAR** los 373 no-proven. La investigación es acumulativa. Lo circumstantial de hoy puede ser proven mañana con una llamada al AHDS.
4. **Atacar las 2 brechas con prioridad**:
   - Brecha 2 (p001 padres): llamada AHDS + visita investigador local
   - Brecha 0 interna (p006/p013 → circumstantial): buscar partidas Bolívar 1840-1870 en FS Film
5. **Y-DNA test** sigue siendo la acción de mayor leverage para validar la hipótesis de origen Muros/costa Barbanza.

---

*Este reporte es generado automáticamente desde el campo `certainty` de cada persona en `src/data/caamano-family.json`. Para re-ejecutar: `node scripts/audit-certainty.js`.*

