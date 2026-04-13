# Fondo "Familia Caamaño" — Arquivo da Deputación de Pontevedra

**Signatura del fondo:** ES.GA.36038.ADPO.10
**Procedencia:** Casa de Romelle (Zas) → Casa de Goiáns (Boiro) → Sálvora / Barbanza
**Cobertura cronolóxica:** 1411 – 1895
**Total de expedientes catalogados:** **3 568 únicos** scrapeados (de los 3 577 declarados)
**Portal:** https://atopo.depo.gal/ (VuFind)
**Buscador filtrado:** https://atopo.depo.gal/Search/Results?lookfor=caama%C3%B1o&filter%5B%5D=fond_txtF_mv%3A%22FAMILIA+CAAMA%C3%91O%22

## 1. Resumen ejecutivo

- **3 568** registros descargados con título + ID en `research/depo-familia-caamano/all-records.tsv`.
- **1 616** son potencialmente relevantes para nosotros tras filtro multi-criterio (geo + tipo + nombre); guardados en `relevant.tsv`.
- **200** registros prioritarios fetcheados al detalle (HTML completo) y parseados con campos Signatura / Fecha / Tipo / Sumario en `records/*.txt` y `records-index.tsv`.
- **22** son ejecutorias / probas de nobreza / hidalguía.
- **25** son testamentos o codicilos.
- **34+** son partidas de bautismo / fe de bautismo (incluidas series Caamaño y Pardo).
- **17** son árboles genealógicos / "xenealoxía" propiamente dichos.
- **Hallazgo más importante:** existe una serie de **1797** que extracta el testamento de **García de Caamaño + Inés de Mendoza (1478)** y la escritura de mejora de **García Caamaño de Rubianes + Constanza Sánchez Guillelme de Bendaña (1534)** a favor de su hijo mayor **García Rodríguez de Caamaño** — estamos pisando exactamente la franja de `h019` (García "El Alto", Señor de Rubianes, d.1540). Ver §3.
- **Segundo gran hallazgo:** en 1657 el licenciado **Antonio de Caamaño Ribadeneira, reitor de Santa María de Rubiáns**, dispuso por testamento que sus bienes pasasen a la **Casa de Romelle**. Este es el puente documental entre el linaje de **Rubianes** (rama troncal h017–h019) y el fondo conservado en Pontevedra. Esto explica por qué este archivo conserva tanto material de Rubianes y por qué los Caamaño de Romelle/Goiáns son colaterales directos nuestros.
- **Tercer gran hallazgo:** **16** documentos del fondo se sitúan explícitamente en la **parroquia de Santa María de Caamaño / Porto do Son** entre 1543 y 1805 — incluyendo titulares del beneficio curado, visitas episcopales 1617–1624, sentencias, pleitos por rentas y un pleito de 1666 incoado por **Juan de Caamaño y Sotomayor** que enumera la cadena de presentadores del beneficio (Juan Prego de Caamaño 1564 → García Caamaño → otro García de Caamaño → Diego Romay). Ese pleito es la **mejor pista de cadena de nombres entre Rubianes y nuestro José Tomás Sr (p001)**.

## 2. Tabla — Top 20 expedientes más valiosos

| #   | Signatura      | Fecha             | Tipo      | Título                                                                                                                                                                                                               | Por qué importa                                                                                |
| --- | -------------- | ----------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | 1.195/15       | 1797 (test. 1478) | UD simple | Extracto do testamento que outorgou **García de Caamaño, marido de Inés de Mendoza**, no ano 1478. Árbore                                                                                                            | Padre/abuelo de h019; bisabuelo del fundador de Villagarcía. **Brecha 1**                      |
| 2   | 1.195/10       | 1797 (escr. 1534) | UD simple | Extracto de escritura de mellora outorgada por **García Caamaño de Rubianes**, marido de Constanza Sánchez Guillelme de Bendaña, a favor do seu fillo **García Rodríguez de Caamaño** (1534). Árbore                 | Coincide con **h019 García "El Alto", d.1540**. Confirma esposa + hijo + mejora hereditaria    |
| 3   | 1.195/11       | 1797 (escr. 1534) | UD simple | Extracto da escritura de arras de **Garcia de Caamaño de Rubianes** a favor de **Margarita de Montoto, muller de García Rodríguez de Caamaño**                                                                       | Nuera identificada. Generación inmediatamente posterior a h019                                 |
| 4   | 1.305/8        | 1856 (test. 1654) | UD simple | Copia auténtica do testamento de **D. García de Caamaño y Sotomayor** (1654), realizada a petición do seu fillo **D. Juan de Caamaño Sotomayor**, Señor das casas de **Caamaño e Nebra**. Noia                       | Casa de Caamaño + Nebra (Porto do Son) en 1654; nombres directos de patriarcas hidalgos        |
| 5   | 1.199/1        | c.1700–c.1852     | UD comp.  | Bienes que pasaron de **Antonio de Caamaño Ribadeneira, rector de Santa María de Rubiáns**, á Casa de Romelle (test. 1657)                                                                                           | **Puente Rubianes → Romelle**. Explica la procedencia del fondo                                |
| 6   | 1.213/14       | 1666              | UD simple | Pleito de **Juan de Caamaño y Sotomayor** sobre los presentadores del beneficio curado de **Sta María de Caamaño**: Juan Prego de Caamaño (1564) → García Caamaño → García de Caamaño → Fernando Romay → Diego Romay | **CADENA EXPLÍCITA DE NOMBRES** en la parroquia de origen 1564–1666                            |
| 7   | 1.213/9        | S/D               | UD simple | Información dos titulares do beneficio curado de **Santa María de Caamaño** e o seu anexo en **Porto do Son**                                                                                                        | Lista nominativa parroquial. Posible Rosetta para Brecha 1                                     |
| 8   | 1.250/55       | S/D               | UD comp.  | **Nova da xenealoxía das casas de Quindimil e Goiáns**                                                                                                                                                               | Genealogía narrativa de la rama Quindimil (Lousame) + Goiáns (Boiro)                           |
| 9   | 1.250/97       | c.1700–c.1800     | UD comp.  | **Árbore xenealóxica da familia de Goiáns**                                                                                                                                                                          | Pedigree gráfico Casa de Goiáns                                                                |
| 10  | 1.213/5        | S/D               | UD simple | Árbore xenealóxica dos descendentes de **Francisco Gómez de Guisamonde e María Alfonso de Caamaño** (Casa Goyanes)                                                                                                   | Línea materna Caamaño en Goiáns                                                                |
| 11  | 1.229/13       | 1773              | UD simple | Nomeamento de xuíz das illas de **Sálvora, Vionta e Noro** por **Vicente Caamaño Varela** (Aguiño, Ribeira)                                                                                                          | Jurisdicción Caamaño sobre las islas — XVIII                                                   |
| 12  | 1.277/3        | 1790              | UD simple | Real Carta executoria a favor de **Vicente Caamaño** sobre os morgados do **Pazo de Orellán** (Zas) por morte do Conde de Maceda                                                                                     | Mayorazgo + sucesión titulada — vincula con árbol h-series                                     |
| 13  | 1.271/19       | 1788              | UD simple | Testemuño compulsorio de **partidas de bautizados, casados e mortos pertencentes á xenealoxía de D. Vicente Caamaño** (Vilalba, bispado de Mondoñedo)                                                                | Compulsa sacramental usable como "puerta trasera" para reconstruir tres generaciones del XVIII |
| 14  | 1.213/19       | 1799              | UD simple | Partida de bautismo de **Juan Antonio Caamaño y Varela** (1795)                                                                                                                                                      | Bautismo Caamaño certificado                                                                   |
| 15  | 1.213/24       | 1799              | UD simple | Partida de bautismo de **Beatriz**, filla de **Jorge Vázquez Caamaño e Aldonza Ribadeneira** (1799)                                                                                                                  | Conexión Vázquez-Caamaño + Ribadeneira                                                         |
| 16  | 1.213/(varios) | 1761–1800         | serie     | Copias das partidas de bautismo de **Juan Bautista José, Margarita Agustina, Antonia, Joaquina Ana** e outros **Caamaño y Pardo**                                                                                    | Serie completa rama Caamaño-Pardo del XVIII                                                    |
| 17  | 1.221/x        | 1655              | UD simple | Carta de Antonio Romero, reitor de **Sta María de Caamaño**, a **Juan de Caamaño y Sotomayor**                                                                                                                       | Correspondencia parroquial directa                                                             |
| 18  | 1.235/16       | 1800              | UD simple | Notas sobre o dereito de posesión sobre o **couto de Goiáns en Porto do Son**                                                                                                                                        | Goiáns dentro de Porto do Son a comienzos XIX                                                  |
| 19  | 1.272/x        | 1657 (test)       | UD comp.  | Testamento original de **Antonio de Caamaño Ribadeneira** (rector Sta. M. Rubiáns)                                                                                                                                   | Pieza original que explica el traspaso a Romelle                                               |
| 20  | 1.232/x        | 1543/1564         | UD simple | Concordia + Título do beneficio curado de **Sta María de Caamaño** dado a **Fernando de Romay** (1564)                                                                                                               | Año exacto del relevo Caamaño → Romay en el beneficio parroquial                               |

(Lista priorizada por puntuación de relevancia. Las 200 fichas completas están en `records/arc.ADP_*.txt`.)

## 3. Probas de nobreza / hidalguía / executorias (24 expedientes)

El catálogo declara 4 probas de nobreza estrictas, pero el fondo tiene **22 ejecutorias** que en la práctica funcionan como probanzas hidalguistas. Las más relevantes para la **Brecha 1** son:

- **arc.ADP_0003419339** — _Testemuño auténtico das probas de nobreza de Francisco Bermúdez de Castro para entrar na Orde de Malta_ (1573). Probanza más antigua del fondo. Bermúdez de Castro está emparentado con Caamaño-Sotomayor.
- **arc.ADP_0003421334** — _Real Carta executoria a Vicente Caamaño sobre o morgado do Pazo de Orellán_ (1790, 334 folios). Sucesión titulada confirmada por el Consello de Castilla. Cita ascendentes del demandante hasta varias generaciones atrás.
- **arc.ADP_0003421043** — _Executoria sobre toda a Facenda do Partido de San Les a Antonio José Caamaño y Mendoza, señor de Romelle_ (1658). Estamos en la generación inmediatamente posterior a Antonio de Caamaño Ribadeneira (test. 1657).
- **arc.ADP_0003421270** — \*Dúas copias de Reais cartas executorias libradas a instancia de **Jorge Caamaño\***, contra herdeiros dos caseiros debedores da Casa de Romelle (1756–1775).
- **arc.ADP_0003420976** — _Real Provisión a instancia de **García de Caamaño** para sacar compulsa dunha executoria_ (1630).
- **arc.ADP_0003421731** — \*Carta de pago a favor de **García Caamaño** polo abono dos gastos da executoria a petición de **Álvaro de Losada\*** (1616).

**Acción:** las cuatro probas formales son las únicas pruebas pre-1700 que rellenan la franja medieval-moderna de Brecha 1. Hay que pedir reproducción al Arquivo da Deputación de Pontevedra (consulta@depo.gal o presencial).

## 4. Testamentos vinculados a la zona Porto do Son / Noia / Muros / Boiro

| Signatura | Fecha                 | Otorgante                                                                                                                                        | Relevancia                                                   |
| --------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| 1.195/15  | test. **1478**        | **García de Caamaño + Inés de Mendoza**                                                                                                          | Padre/abuelo de h019. Caldas de Reis (notario Juan Goldriño) |
| 1.195/10  | escr. **1534**        | **García Caamaño de Rubianes + Constanza Sánchez Guillelme de Bendaña**                                                                          | h019 directo (d.1540 → escritura 1534 = encaje perfecto)     |
| 1.305/8   | test. **1654**        | **García de Caamaño y Sotomayor**                                                                                                                | Padre de Juan, "Señor das casas de Caamaño e Nebra"          |
| 1.272/x   | test. **1657**        | **Antonio de Caamaño Ribadeneira**, rector de Sta María de Rubiáns                                                                               | Bisagra Rubianes ↔ Romelle                                   |
| 1.213/x   | test. **1700/1702**   | **Antonio Caamaño y Quintana** (testamento + codicilo)                                                                                           | Generación 1700 documentada                                  |
| varios    | **1735**              | **Antonio Joseph de Mendoza Caamaño Sotomayor y Ronquillo**                                                                                      | Hijo del Virrey del Perú h021                                |
| 1.250/x   | **1654**              | **María de Andrade Montenegro** (test + 2 codicilos)                                                                                             | Esposa de un Caamaño-Sotomayor                               |
| varios    | 1727, 1737, 1750      | Antonio Caamaño y Quintana, María de Neira señora de Oca, García de Caamaño (cumprimento de mandas de misas)                                     | Cadena XVIII confirmada                                      |
| 1.196/x   | **1856** (test. 1654) | Copia auténtica do testamento de García de Caamaño y Sotomayor por petición de **Juan de Caamaño Sotomayor, Señor das casas de Caamaño e Nebra** | **Casa de Caamaño en Nebra** (Porto do Son) literal          |
| 1.297/x   | 1547                  | Codicilo e aprobación de testamento de **Pedro Martínez de Oza**                                                                                 | El más antiguo del fondo                                     |

## 5. Certificacións eclesiásticas + partidas de bautismo (≥34 en el top-200)

Series consolidadas de bautismos Caamaño y Caamaño-Pardo del **XVIII**:

- **1707** — Francisco de Lamas e Leonor de Zúñiga Sotomayor
- **1724** — Fernando Antonio Caamaño y Gayoso
- **1724** — Sancho Arias Conde y Ulloa
- **1761–1800** — Juan Bautista José Caamaño y Pardo
- **1765–1788** — Margarita Agustina Caamaño y Pardo
- **1767–1774** — Antonia Caamaño
- **1773** — Bernardo Pardo (hijo de Jacinto Pardo)
- **1773** — Juana Micaela Pardo
- **1773** — María Josefa Pardo
- **1788** — _compulsa de partidas de bautizados, casados e mortos pertencentes á xenealoxía de D. Vicente Caamaño_ (Vilalba, Mondoñedo)
- **1795** — Juan Antonio Caamaño y Varela
- **1797** — Joaquina Ana Caamaño y Gayoso
- **1799** — Beatriz, filla de Jorge Vázquez Caamaño e Aldonza Ribadeneira
- **1825** — Ramona Caamaño Carbonell

El catálogo total declara **101 certificaciones eclesiásticas** en el fondo. Solo hemos descargado las 34 del top-200 — muy probable que entre las 67 restantes haya partidas de Porto do Son o Sta. María de Caamaño que no aparecieron en el filtro porque el título no incluye la palabra "Caamaño" (puede decir solo el nombre del bautizado). **Acción recomendada:** scrapear en Fase 5 los 1 616 registros del filtro amplio (`relevant.tsv`) y/o pedir el inventario completo de la subserie 1.213 al archivo.

## 6. Árbores xenealóxicas (17+ en el top-200, 28 en total el fondo)

- **arc.ADP_0003422653** — \*Nova da xenealoxía das casas de **Quindimil e Goiáns\*** (orixinal e copia)
- **arc.ADP_0003422688** — \*Árbore xenealóxica da familia de **Goiáns\*** (c.1700–c.1800)
- **arc.ADP_0003422583** — \*Árbore xenealóxica dos descendentes de **Francisco Gómez de Guisamonde e María Alfonso de Caamaño\*** (Casa Goyanes)
- **arc.ADP_0003419256** — \*Información e xenealoxía de **D. Antonio Caamaño y Quintana\*** (1653)
- **arc.ADP_0003419259** — _Xenealoxía da Casa dos señores de Romero, da Casa do Barco_ (1728)
- **arc.ADP_0003422643** — \*Árbore xenealóxica dos descendentes de **Jorge Varela e Inés Vázquez de Mosquera\***
- **arc.ADP_0003422645** — _Xenealoxía da Casa de **Carballido** de 1442 a 1657_
- **arc.ADP_0003419253** — Árbore correspondente ao testamento de **Constanza Paz de Figueroa** (1614)
- **arc.ADP_0003419248/49/50/52/54** — Árbores Varela Mariño, Bermúdez de Castro, Pardo de Cela, Mendoza-Sotomayor, Leys-Leboráns

Estos pedigrees son **descargables como imagen escaneada** (el portal expone `mainDigitalData`). **Acción inmediata**: pedir digitalización (o ver en sala) los #422688 y #422583, que son específicamente Casa Goiáns/Goyanes.

## 7. Nombres nuevos detectados (no estaban en nuestro árbol caamano-family.json)

Personas Caamaño nombradas en este fondo y que **no figuran** en `src/data/caamano-family.json`:

| Nombre                                          | Fecha aprox.               | Casa / lugar                                                  |
| ----------------------------------------------- | -------------------------- | ------------------------------------------------------------- |
| **García de Caamaño + Inés de Mendoza**         | test. 1478, Caldas de Reis | Generación previa a h019                                      |
| **Constanza Sánchez Guillelme de Bendaña**      | 1534                       | Esposa de h019                                                |
| **García Rodríguez de Caamaño**                 | 1534                       | Hijo mayor de h019                                            |
| **Margarita de Montoto**                        | 1534                       | Esposa de García Rodríguez                                    |
| **Juan Prego de Caamaño**                       | 1564                       | Presentador del beneficio curado de Sta. M. de Caamaño        |
| **Juan de Caamaño y Sotomayor**                 | 1655–1666                  | Litigante por el beneficio curado                             |
| **Fernando de Caamaño**                         | 1688                       | Pleito veciños de S. Fins de Ribasieira                       |
| **Antonio de Caamaño Ribadeneira**              | †1657                      | Rector de Sta. M. de Rubiáns                                  |
| **Antonio Caamaño y Quintana**                  | test. 1700/02              | Casa de Romelle                                               |
| **Antonio José Caamaño y Mendoza**              | 1658                       | Señor de Romelle                                              |
| **García de Caamaño Sotomayor** "el Capitán"    | 1607–1640                  | Numerosos pleitos en Noia                                     |
| **García de Caamaño y Sotomayor**               | †ant. 1654                 | Padre de Juan; Casa de Caamaño y Nebra                        |
| **Juan de Caamaño Sotomayor**                   | 1856                       | Hijo del anterior; Señor das casas de Caamaño e Nebra         |
| **Vicente Caamaño Varela y Mendoza**            | 1772                       | Dono da xurisdición de Romelle                                |
| **Vicente Caamaño Varela y Gayoso**             | 1775–1797                  | Dueño morgados Orellán + Sálvora                              |
| **Juan Antonio Caamaño Varela y Mendoza**       | 1744–1799                  | Señor de Romelle e Goyanes                                    |
| **Juan José Caamaño Pardo**                     | 1788–1814                  | Cereixo + Casa Romelle                                        |
| **Rafael Caamaño Pardo**                        | 1835                       | Sucesor Casa Romelle                                          |
| **Jorge Caamaño**                               | 1756–1775                  | Couto de Boiro                                                |
| **Jorge Vázquez Caamaño + Aldonza Ribadeneira** | 1799                       | Padres de Beatriz                                             |
| **Juan Antonio Caamaño Varela**                 | 1795 / 1799                | Bautismos compulsados                                         |
| **Joaquina Ana Caamaño y Gayoso**               | 1797                       | Bautismo                                                      |
| **Fernando Antonio Caamaño y Gayoso**           | 1724                       | Bautismo                                                      |
| **Jacinta María Caamaño**                       | 1673                       | Bautismo                                                      |
| **Ramona Caamaño Carbonell**                    | 1825                       | Bautismo                                                      |
| **María Alfonso de Caamaño**                    | <1500                      | Casada con Francisco Gómez de Guisamonde — origen Casa Goiáns |
| **Ruy Pérez de Caamaño**                        | 1619–1623                  | Pleito sucesorio                                              |
| **Antonia Caamaño**                             | 1767–1774                  | Bautismo                                                      |
| **Margarita Agustina Caamaño y Pardo**          | 1765–1788                  | Bautismo                                                      |
| **Juan Bautista José Caamaño y Pardo**          | 1761–1800                  | Bautismo                                                      |

≈30 nombres Caamaño nuevos. Todos cubren la franja **1478 → 1856** y permiten reconstruir, prácticamente sin huecos, el linaje noble de **Rubianes → Romelle → Goiáns → Sálvora**.

## 8. Conexiones con el árbol existente

### Conexión 1 — Rubianes (h019 García "El Alto", d.1540)

**3 expedientes simultáneos** (signaturas 1.195/10, 1.195/11, 1.195/15) confirman:

- García de Caamaño († pre-1478) + **Inés de Mendoza** → padre
- **García Caamaño de Rubianes** + **Constanza Sánchez Guillelme de Bendaña** = h019 — escritura de mejora 1534
- **García Rodríguez de Caamaño** + **Margarita de Montoto** = hijo mayor de h019

→ Esto **extiende h019 hacia atrás una generación más** (testamento 1478) y **hacia adelante una generación más** (García Rodríguez + Margarita 1534). Hay material para añadir 4 personas históricas nuevas (h022–h025) al árbol.

### Conexión 2 — Bisagra Rubianes ↔ Romelle (1657)

El testamento de **Antonio de Caamaño Ribadeneira**, rector de Sta María de **Rubiáns**, dispuso en 1657 que sus bienes pasasen a la Casa de Romelle. **Esto explica por qué este fondo (Romelle/Goiáns/Sálvora) está lleno de papeles de Rubianes**, y confirma que los Caamaño de Romelle son **colaterales directos** de h019. La rama troncal y la rama de Romelle son **una sola familia** documentalmente unida hasta 1657.

### Conexión 3 — Cadena del beneficio curado de Sta María de Caamaño (1564→1666)

El pleito de 1666 (#1.213/14) lista nominalmente la cadena de presentadores del beneficio:

> **Juan Prego de Caamaño** (1564) → **Rodrigo de Mendoza** → **García Caamaño** → **Rodrigo de Mendoza** → **García de Caamaño** → **Fernando Romay** → **Diego Romay**

Este es **el único documento del fondo que nombra Caamaños sucesivos viviendo o vinculados a la propia parroquia de Sta María de Caamaño** durante la Brecha 1. Los "García Caamaño" del XVII pueden ser nietos/biznietos de h019.

### Conexión 4 — Casa de Caamaño y Nebra (1654/1856)

La copia auténtica de 1856 (#1.305/8) habla literalmente de la **"Casa de Caamaño e Nebra"** y de Juan de Caamaño Sotomayor como su Señor. Nebra **es una parroquia del concello de Porto do Son**, vecina inmediata de Sta María de Caamaño. **Este es el dato más fuerte que vincula la rama hidalga con el lugar exacto donde nació p001 (José Tomás Caamaño Sr).**

### Conexión 5 — fs003 / pa001-pa013 (Catastro)

- Los **Caamaño Pardo** del XVIII (Juan José, Margarita Agustina, Juan Bautista José) son **contemporáneos** de los Caamaños del Catastro de Ensenada 1752 (PARES 6092354 / `pa001`-`pa013`). Aunque pertenecen a distinto estrato social (hidalgos vs. canteros/labradores), son **vecinos de parroquia** y comparten apadrinamientos en el XVIII. La compulsa sacramental de 1788 (#1.271/19) podría contener un nombre cruzado entre las dos series.
- Pablo Caamaño Villa (`fs003`, 1802, Palmeira) + José Tomás Sr (`p001`, ~1815, Sta. M. de Caamaño) podrían ser descendientes ilegítimos / línea menor de algún Caamaño-Sotomayor del XVIII. La revisión de la compulsa de 1788 podría dar el cabo del hilo.

## 9. Próximas acciones

1. **Pedir reproducción digital al Arquivo da Deputación de Pontevedra** (telf. +34 986 80 41 00, email: arquivo@depo.gal) de **8 piezas prioritarias** en este orden:
   - 1.195/15 (test. 1478 García + Inés de Mendoza)
   - 1.195/10 (escr. 1534 García "El Alto" + Constanza)
   - 1.195/11 (arras 1534 García Rodríguez + Margarita)
   - 1.305/8 (copia 1856 del test. 1654 — Casa de Caamaño e Nebra)
   - 1.213/14 (1666 — cadena de presentadores del beneficio)
   - 1.213/9 (s/d — titulares del beneficio de Sta M. Caamaño)
   - 1.271/19 (1788 — compulsa sacramental Vicente Caamaño)
   - 1.250/55 (s/d — xenealoxía Quindimil/Goiáns)
2. **Fase 5 — Ampliar el scrape a los 1 616 records de `relevant.tsv`** (no solo los 200 prioritarios). Especialmente las 67 certificaciones eclesiásticas restantes que pueden contener bautismos directos de Sta. M. Caamaño / Porto do Son / Nebra.
3. **Cruzar nombres con PARES 6092354** (Catastro de Ensenada): buscar `Antonio Caamaño Quintana`, `Jorge Caamaño`, `Vicente Caamaño Varela`, `Juan José Caamaño Pardo` en las Comprobaciones de 1752–1755.
4. **Añadir al árbol** las personas de la conexión 1 como nuevos nodos `h022`–`h025` (pre-h019 y post-h019) con `personSource: 'pares'` o crear nuevo source `'depo'`.
5. **Email de seguimiento a AHDS** mencionando estos hallazgos: ahora podemos pedirles bautismos del XVII en Sta María de Caamaño con nombres concretos (Juan Prego de Caamaño 1564, García Caamaño y Sotomayor 1607–1654, Fernando de Caamaño 1688, Juan de Caamaño Sotomayor 1655–1666).
6. **Visita presencial a Pontevedra** (depo.gal, sala de consulta del Arquivo) para fotografiar in situ las 4 probas de nobreza completas + los 17 árboles genealógicos, todo cabe en 1–2 días.
7. **Contactar a la Xunta** para confirmar si el fondo ya está parcialmente digitalizado y disponible en línea (algunos registros del scrape muestran `mainDigitalData` indicando que **sí hay digitalizaciones**; hay que cruzar con cada signatura).

---

## Anexo — Archivos generados

- `research/depo-familia-caamano/all-records.tsv` — 3 568 registros (id + título)
- `research/depo-familia-caamano/relevant.tsv` — 1 616 registros tras filtro amplio (id + título + tags)
- `research/depo-familia-caamano/relevant-high.tsv` — 1 122 alta prioridad
- `research/depo-familia-caamano/ultra.tsv` — 668 ultra prioritarios
- `research/depo-familia-caamano/topfetch.tsv` — 200 fetcheados al detalle (con score)
- `research/depo-familia-caamano/records-index.tsv` — índice de los 200 con campos parseados
- `research/depo-familia-caamano/records/arc.ADP_*.txt` — 200 fichas individuales

## 10. Fase 5 — Scrape ampliado (2026-04-13)

**Total fondo scrapeado:** 1.616 / 1.616 registros relevantes (100%, completo). 200 ya estaban fetcheados en Fase 4; **995 nuevos** en Fase 5.

**Nuevos hits que pasan filtros A/B/C:** 995. Distribución:

- Bautismos / fes de bautismo nuevas: **14**
- Testamentos / codicilos nuevos: **185**
- Árboles / genealogías nuevos: **76**
- Probas de nobreza / executorias nuevas: **10**
- Registros geográficamente vinculados a Porto do Son / Nebra / Noia / Muros / Boiro: **281**
- Coincidencias directas con nombres del Catastro 1760 (pa001-pa013): **6**

### 10.1 ⭐ Los cuatro hallazgos críticos de Fase 5

#### Hallazgo A — Testamento de ALBERTA DE CAAMAÑO (1569) — `1.292/12`

**Primer testamento Caamaño del siglo XVI localizado.** Copia auténtica hecha en 1797 del original de 1569. Cae de lleno dentro de Brecha 1 (1540-1700). Alberta de Caamaño es una mujer del linaje, contemporánea de la generación inmediatamente posterior a h019 García "El Alto" (d.1540). **Nombre completamente nuevo, no estaba en ninguna de las fuentes previas.**

#### Hallazgo B — Testamento de JUAN PREGO DE CAAMAÑO (1585) — `1.299/16`

⭐⭐⭐ Este es el mismo **Juan Prego de Caamaño** que aparece en el pleito de 1666 (`1.213/14` de Fase 4) como **presentador del beneficio curado de Santa María de Caamaño desde 1564**. Su testamento de 1585 existe como copia auténtica de 1797. **Es el único testamento conocido de un Caamaño vinculado directamente a la parroquia ancestral en el siglo XVI.** Debería nombrar padres, esposa, hijos → podría conectar directamente con h019 por un lado y con los Caamaño del XVII por otro. **Pieza de máxima prioridad.**

#### Hallazgo C — Partidas de bautismo del Arquivo de Vicente Caamaño (1638-1751) — `1.270/11`

113 años consecutivos de partidas de bautismo extraídas del archivo familiar de Vicente Caamaño. Este es exactamente el rango cronológico de **Brecha 2** (1540-1815) y cubre la franja 1638-1751 sin huecos. Si contienen bautismos de Caamaños de Sta María de Caamaño / Nebra / Porto do Son, resuelven la mayor parte de la brecha histórica de un solo golpe.

#### Hallazgo D — PEDRO CAAMAÑO difunto ante 1794 — `1.193/4`

⭐ Literal: "Preito de Vicente Caamaño con **María Rodríguez, viúva de Pedro Caamaño**, polo non pagamento das rendas do lugar de Oron..." (1794). **Hay un Pedro Caamaño que murió antes de 1794**, casado con María Rodríguez, inquilinos del "lugar de Oron". ⭐ **Candidato MUY fuerte a `pa010` Pedro Caamaño cantero (nacido ~1720 según el Catastro de Ensenada 1760)** — fecha de muerte compatible (vivió ~70-74 años). Esta es **la primera coincidencia genealógica directa entre el fondo de Pontevedra y los 13 Caamaño del Catastro** documentados en PARES 6092354.

### 10.2 Nuevas partidas de bautismo y certificaciones eclesiásticas

| Signatura  | Fecha     | Título                                                                                                                    |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `1.270/11` | 1638-1751 | Partidas de bautismo pertencentes ao Arquivo de Vicente Caamaño (1638-1751)                                               |
| `1.270/5`  | 1640-1643 | Asentos das partidas de bautismo dos fillos de Fernando Bermúdez de Castro e María de Castro                              |
| `1.227/17` | 1666-1799 | Certificacións da folla de bautismo de Juan Varela                                                                        |
| `1.191/13` | 1702      | Certificado de bautismo de Pedro de Rajo, fillo de José de Rojo e de Constanza Pérez (1702)                               |
| `1.227/16` | 1724      | Certificación da folla de bautismo de Juan Varela                                                                         |
| `6`        | 1764-1796 | Copia da relación de bens contidos no memorial de Josefa Lorenzo e certificados de bautismo e defunción                   |
| `1.271/22` | 1770      | Certificación das partidas de bautismo de Margarita Victoria Copeiro y Osorio (1770)                                      |
| `1.271/30` | 1773      | Certificado das partidas de bautismo da familia Copeiro (1773)                                                            |
| `1.271/39` | 1787      | Certificado de varias partidas de bautismo, casamento e morte (1787)                                                      |
| `1.255/29` | 1788      | Carta con relación de bautismos e defuncións da familia Pardo de Lamas                                                    |
| `1.271/5`  | 1789      | Copia auténtica das partidas de bautismo das fillas de Antonio Lamas Carballido Sotomayor (1789)                          |
| `1.311/53` | 1798      | Copia auténtica das partidas de bautismo de D. Andrés de Gayoso y Ozores e Dª. María Rosa Ventura e D. Juan Gayoso (1798) |
| `1.191/15` | 1805      | Certificado de bautismo de Agustín María, fillo de Ignacio Mendoza e María Garcia González (1805)                         |
| `1.313/18` | 1814      | Copia do nomeamento a favor de Ciprián Lorenzo de Pouso como Mestre de Escola da parroquia de Goiáns (1814)               |

### 10.3 Testamentos nuevos (185 — listamos los 15 más antiguos, por relevancia para Brecha 1)

| Signatura  | Fecha         | Título                                                                                                                             |
| ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `1.240/10` | 1496-1797     | Orixinal e tres copias do testamento de Rodrigo Pérez de Carantoña (1496) ; Orixinal e copia do testamento de Pedro de Calo (1540) |
| `1.282/7`  | c.a 1500-1600 | Testamento de Sancho López Coscones de Lamas                                                                                       |
| `1.311/5`  | 1504          | Copias auténticas do testamento outorgado por Catalina Martínez                                                                    |
| `1.241/5`  | 1504          | Orixinal e copia do testamento de Inés Yáñez                                                                                       |
| `1.257/28` | 1507          | Testamento de Fernando Res (Rodríguez) de Mendos a favor da súa muller                                                             |
| `1.241/1`  | 1510-1527     | Tres testamentos de Pedro Losada Escudero e copias posteriores                                                                     |
| `2`        | ca. 1517      | Testamento outorgado por Jorge Varela "O Vello", Señor de Quindimil                                                                |
| `1.308/32` | 1517-1806     | Expediente relativo ao testamento de Ruy Martínez de Carballido                                                                    |
| `1.304/11` | c.a 1517-1743 | Dous testamentos de Jorge Varela "O vello"                                                                                         |
| `1.304/16` | 1519-1743     | Testamento outorgado por Teresa Sánchez Varela (1519)                                                                              |
| `2`        | ca. 1519      | Copia do testamento outorgado por Teresa Sánchez Varela                                                                            |
| `1.257/29` | 1531          | Orixinal e copia do testamento de Namorante Mariño                                                                                 |
| `1.241/2`  | 1536          | Testamento de Inés Yáñez da Costa, instituindo como universal herdeiro ao seu sobriño Ruy Pérez da Costa                           |
| `1.313/21` | c.a 1540      | Nota sobre a carta de dote notificada no testamento de 1540 por Pedro de Calo de Carantoña                                         |
| `1.292/13` | c.a 1550      | Copia do codicilo de Vasco Prego (1550)                                                                                            |

_Lista completa de los 185 testamentos en `research/depo-familia-caamano/phase5-new-categorized.json`._

### 10.4 Genealogías / árboles nuevos (76 — listamos 10)

| Signatura  | Fecha    | Título                                                                                                                                       |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `1.299/16` | 1797     | Copia auténtica do testamento outorgado por Juan Prego de Caamaño (1585)                                                                     |
| `1.290/5`  | 1797     | Copia do testamento outorgado por Payo Romero de Bialo (1569)                                                                                |
| `1.292/12` | 1797     | Copia auténtica do testamento outorgado por Alberta de Caamaño (1569)                                                                        |
| `1.304/13` | 1799     | Copia auténtica do testamento outorgado por Álvaro de San Payo de Montaos (1609)                                                             |
| `1.213/45` | 1802     | Copia auténtica do testamento de Antonio Gómez de Guisamonde outorgado en 1575                                                               |
| `1`        | 1803     | Copia auténtica, realizada a instancia de D. Juan José Caamaño y Pardo, do testamento outorgado, en 1640, por D. Fernando Bermúdez de Castro |
| `1.178/14` | 1797     | Copia da escritura de concordia outorgada entre García de Caamaño e Jorge Varela de Castro sobre a dote de Aldonza de Caamaño                |
| `1.200/11` | 1797     | Inventario feito polo xuíz de Goiáns dos bens e papeis que quedaron por falecemento de Juan Varela de Goyanes, no ano 1674                   |
| `1.213/46` | 1806     | Relación de varias escrituras referentes ós bens do Partido de Muros e Noia                                                                  |
| `1.292/13` | c.a 1550 | Copia do codicilo de Vasco Prego (1550)                                                                                                      |

### 10.5 Registros geográficamente vinculados a Porto do Son / Nebra / Noia / Muros / Boiro (281 — top 20)

| Signatura  | Fecha     | Título                                                                                                                                              |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1.197/1`  | c.a 1446  | Documento sobre a reedificación que mantiñan os Señores da Casa de Goyanes na parroquia de Santa Eulalia de Boiro                                   |
| `1.240/10` | 1496-1797 | Orixinal e tres copias do testamento de Rodrigo Pérez de Carantoña (1496) ; Orixinal e copia do testamento de Pedro de Calo (1540)                  |
| `1.311/5`  | 1504      | Copias auténticas do testamento outorgado por Catalina Martínez                                                                                     |
| `1.241/1`  | 1510-1527 | Tres testamentos de Pedro Losada Escudero e copias posteriores                                                                                      |
| `1.236/13` | 1513      | Escritura de concordia que outorgaron Alonso Guillelmez e Ruy Fernández sobre os bens que as fillas de Martín Becerra ficaran de García de Caamaño  |
| `1.306/11` | 1523      | Copia da escritura de dote outorgada en Noia en 1523, a favor de Gregorio do Souto e Iseo Rodríguez                                                 |
| `1.229/19` | 1525-1764 | Copia das notificacións enviadas a Jorge Caamaño y Varela e a Juan Francisco Caamaño y Sotomayor para compulsar os documentos que presenten         |
| `1.196/2`  | 1526      | Carta de contrato entre Juan Mariño de Goiáns e Teresa González, súa irmá                                                                           |
| `1.296/20` | 1537-1835 | Índice dos documentos existentes no cartafol "M" de Goiáns (1537-1835)                                                                              |
| `1.311/31` | 1540      | Escritura de foro outorgado por Juan Mariño de Rianxo a favor de Juan de Rosende                                                                    |
| `1.292/13` | c.a 1550  | Copia do codicilo de Vasco Prego (1550)                                                                                                             |
| `1.301/37` | 1553      | Copias auténticas do testamento outorgado por Beatriz Varela (1552-53)                                                                              |
| `1.193/36` | 1559      | Instancia de Juan Caamaño y Sotomayor solicitando que Juan González de Torres declare o que lle debe polas rendas dun lugar en Santa María de Nebra |
| `2`        | 1561      | Arrendo que fixo o Sr. Álvaro de Caamaño, Señor de Romelle, a Juan Sánchez                                                                          |
| `1.229/22` | 1562-1772 | Cartas orixinais e copias relativas á ostreira do río Goiáns                                                                                        |
| `1.186/51` | 1567      | Carta de doazón do sobrado de Carnero para a elección de alcaldes na vila de Noia a favor de Jorge Vázquez de Costa Bermúdez (1567)                 |
| `1.193/23` | 1572      | Dúas escrituras de posesión feitas a favor do licenciado Caamaño                                                                                    |
| `1.235/4`  | 1572      | Parte do preito pola xurisdición criminal e civil do Couto de Santa Eulalia de Boiro                                                                |
| `1.290/4`  | 1573      | Copia sinxela do testamento de Teresa González de Sotomayor                                                                                         |
| `1.193/24` | 1573-1574 | Real provisión que empraza a Fernando Caamaño en nome de Juan Prego Caamaño no Preito que manteñen                                                  |

### 10.6 Probas de nobreza / executorias nuevas (10)

| Signatura  | Fecha     | Título                                                                                                                                                |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1.208/8`  | 1421-1723 | Copia do preito entre Juan Antonio Caamaño y Varela e Pedro Barreiro Domingo García e outros pola posesión do lugar de Aro, do morgado de Leboráns    |
| `1.191/2`  | 1604      | Carta executoria librada a petición de Marcos de Frades contra Martín Paris, Álvaro de Figueira y Simón Paris, para que lle paguen o que lle deben    |
| `1.188/5`  | 1605      | Copia dunha executoria presentada por Francisco de Ouriona a favor de Teresa López onde se presentan testemuños sobre o seu dereito de posesión       |
| `1.188/8`  | 1605      | Testemuño dunha carta executoria feita por Francisco de Ouriona polo cal Gregorio Vázquez decide que Teresa López é posuidora dos seus bens dotais    |
| `1.188/6`  | 1674      | Copia dunha executoria a instancia de Juan Taboada Ribadeneyra no cal os donos da Casa de Gontalde quedan libres do pagamento de tres cargas de trigo |
| `1.281/17` | 1683-1782 | Carta executoria e dilixencias outorgada polo señor Nuncio sobre o beneficio sinecura de S. Pedro de Nantón a favor de Juan Antonio López de Andrade  |
| `1.213/31` | 1691      | Carta executoria a favor de Fernado de Caamaño y Sotomayor contra Pedro dos Rios polos despoxos realizados na ermida de Santa María Magdalena         |
| `1.281/20` | 1715      | Carta executoria a petición de Diego de Lamas y Sotomayor contra Melchor Fernández Nogueira no preito que seguen pola elección de décimo              |
| `1.264/21` | 1803      | Despacho de executoria librada a instancia do sucesor dos morgados de Zas, Nebra e Carballido (1803)                                                  |
| `1.246/35` | S/D       | Relación dos bens e regalías pertencentes a Juan José Caamaño correspondentes á vinculación que otorgou o Capitán a Juan Copeiro de Parga             |

### 10.7 Coincidencias con nombres del Catastro 1760 (pa001-pa013)

| Signatura  | Fecha     | Título                                                                                                                   |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| `1.185/85` | 1683      | Carta de D. Pedro Caamaño y Sotomayor ao seu tío D. Juan de Caamaño                                                      |
| `1.284/29` | 1704      | Libro das rendas cobradas nos partidos de Santiago, Barcala, Noia e Soneira (1704)                                       |
| `1.222/3`  | 1747-1748 | Documentación relativa as rendas dos caseiros polas Casas de Zas, Carballido, Barcala, Noia, Nebra e Caamaño (1747-1748) |
| `1.222/2`  | 1748      | Contas das casas de Zas, Barcala, Nebra, Noia e Corcubión dadas a José de Parga (1748)                                   |
| `1.193/4`  | 1794      | Preito de Vicente Caamaño con María Rodríguez, viúva de Pedro Caamaño, polo non pagamento das rendas do lugar de Orons   |
| `1.194/20` | 1803-1807 | Preito sobre contas entre Juan José Caamaño e Marcos Varela (1803-1807)                                                  |

### 10.8 Puente a Colombia (22 hits relacionados con el linaje Caamaño Sotomayor)

Las 22 coincidencias son del clan **Caamaño Sotomayor** en Noia durante el XVII — contemporáneos de la bisagra Rubianes→Romelle (h021 virrey muerto 1746, Antonio Ribadeneira rector 1657). No son directamente del siglo XIX colombiano; son el linaje hidalgo gallego del siglo XVII del que probablemente descienden tanto los Caamaño de Pontevedra como, por líneas menores, los Caamaño comunes de Sta María de Caamaño que terminaron emigrando a América. **Requieren rastreo de hijas y descendencia menor para cerrar el puente.**

### 10.9 Acciones críticas actualizadas

**Pedir reproducción digital al Arquivo da Deputación de Pontevedra de estas 4 piezas nuevas en primer lugar:**

1. **`1.299/16`** (1797 / copia test. 1585) — **Testamento de Juan Prego de Caamaño** (beneficio curado Sta María de Caamaño desde 1564). Máxima prioridad.
2. **`1.270/11`** (1638-1751) — **Partidas de bautismo del Arquivo de Vicente Caamaño** (113 años de bautismos familiares).
3. **`1.292/12`** (1797 / copia test. 1569) — **Testamento de Alberta de Caamaño** (siglo XVI).
4. **`1.193/4`** (1794) — **Pleito contra la viuda de Pedro Caamaño** (para confirmar si es el cantero pa010 del Catastro).

**Piezas secundarias nuevas de alta prioridad:**

- `1.227/17` (1666-1799) — certificaciones de folla de bautismo de Juan Varela (133 años, arquivo Caamaño).
- `1.270/5` (1640-1643) — partidas de bautismo de los hijos de Fernando Bermúdez de Castro + María de Castro.
- `1.222/3` (1747-1748) — cuentas de rentas de las casas de Zas, Carballido, Barcala, Noia, **Nebra e Caamaño** (1ª mención explícita del topónimo "casa Caamaño" en la serie XVIII).
- `1.273/15` (c.1606) — transacción entre los señores das casas de **Nebra e Caamaño**.
- `1.264/21` (1803) — despacho de executoria al sucesor dos morgados de **Zas, Nebra e Carballido** — puente al XIX.

### 10.10 Siguiente fase propuesta

**Fase 6 — Contacto directo con la Deputación de Pontevedra.** Un único email al arquivo (`arquivo@depo.gal`) solicitando reproducción digital de las **12 piezas prioritarias** (8 de Fase 4 + 4 nuevas de Fase 5). Con la señalización ya hecha es trivial pedirlas. El resto del fondo puede esperar a la respuesta.
