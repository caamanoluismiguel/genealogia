# PARES: transcripciones de expedientes citados solo por catálogo (octubre de 2026)

**Fecha:** 2026-10-14
**Método:** imágenes descargadas con curl desde PARES (`pares.cultura.gob.es`), sin autenticación ni CAPTCHA, con 0,5 s entre peticiones. Script: `research/pares-transcriptions-2026-10/download.sh <nid> <outdir>`. La correspondencia entre imagen y dbCode **no es secuencial**: el script la lee de `clickThumbnail(n, dbCode)` en la página del visor. Las imágenes se leyeron una por una (recortes ampliados con ImageMagick en los pasajes difíciles).
**Ubicación local de las imágenes:** `research/pares-transcriptions-2026-10/<doc>/images/NNNN.jpg`
**Convenciones:** grafía original; abreviaturas desarrolladas entre corchetes cuando hay duda; `[?]` = lectura insegura; `[…]` = ilegible. Confianza: **ALTA / MEDIA / BAJA**. "img" = número de imagen PARES; "f." = foliación del expediente cuando es visible.

> **⚠ Postura epistémica.** Nada de lo que sigue conecta documentalmente con p001 José Tomás Caamaño Sr. Estos documentos aclaran **quiénes eran** pa020–pa025 y corrigen fechas y lugares; no prueban parentesco con nuestra línea colombiana.

---

## TL;DR

| Doc | Digitalizado | Imágenes leídas | Hallazgo principal |
|---|---|---|---|
| AGI CONTRATACION,5590,N.6 (Ignacio de Luaces) | **Sí**, 46 img (PARES nid 99835) | 46/46 (img 2 y 46 en blanco) | **Partida de bautismo** (6‑VII‑1700, S. Pedro de Muros) y **partida de matrimonio de los padres** (27‑I‑1697) copiadas literalmente. **Murió ahogado en el Río de la Plata el 12‑II‑1727**, no en Nueva España. Hermanos: Antonio, Simón, Juana y Josefa. |
| AGI CONTRATACION,5459,N.9 (José Varela Camaño) | **Sí**, 8 img (nid 155486) | 8/8 (img 8 en blanco) | Natural y vecino de **Pernes, Coto de Bergantiños** (no de Muros); 22 años en 1699; factor de mercancías propias en la flota de Nueva España. |
| AGI CONTRATACION,5465,N.1,R.9 (Felipe de Baños) | **Sí**, 12 img (nid 156354) | 12/12 | Felipe de Baños hijo, ~16 años en 1709, natural de Muros, criado del gobernador de **Trinidad y Guayana**. La madre aparece como "María **Iansa / Ieanza de Camaño**"; la forma "Jiansa" del catálogo es incierta. |
| ARChV PL CIVILES,PÉREZ ALONSO (F),CAJA 3703,1 (Matías Caamaño) | **Sí**, **1.588 img** (nid 228333) | 12 descargadas, 3 leídas (portada y pedimento de 1805) | Solo muestreo. Portada: Joaquín Antonio Forrado contra Pedro González de Groba (administrador de la renta del tabaco, Puentedeume) y su mujer Dª **María Isabel Caamaño y Estévez**, y el licenciado D. **José Manuel Caamaño**, abogado de la Real Audiencia de Galicia, vecino de Fefiñanes. |

---

## 1. AGI ES.41091.AGI//CONTRATACION,5590,N.6: autos de bienes de difuntos de Ignacio de Luaces

**PARES:** https://pares.cultura.gob.es/ParesBusquedas20/catalogo/description/99835 · 46 imágenes · 20 hojas · fechas 1727–1728 y 1776–1777.
**Local:** `research/pares-transcriptions-2026-10/agi-contratacion-5590-n6/images/`

### 1.1 Estructura del expediente

| img | Folio | Contenido |
|---|---|---|
| 1 | f.1 | Carátula: "S. M. 3. Cadiz año de 1728. nº Raphael. Autos a pedimento de D. Blas de Figueroa en nombre de Maria Fern[ande]z de Orgas, m[adr]e de Ignacio de Luaces, mozo del navio San Raphael, sobre que se le entreguen los vienes que quedaron por su fallecim[ien]to". Nº 12. |
| 3–6 | f.1bis–2v | **Poder** otorgado en Muros el 30‑XI‑1727 por María Fernández de Orxas ante Francisco García de Castro, con la comprobación de los escribanos de Muros. |
| 7–14 | f.3–6v | **Información de filiación** ante el alcalde ordinario de Muros, 28–30‑XI‑1727: pedimento y tres testigos. El papel está **muy dañado por tinta ferrogálica** (img 9–12). |
| 15–16 | f.7–7v | **Certificación del cura de San Pedro de Muros** con copia literal de dos partidas (bautismo y matrimonio). ⭐ |
| 17 | f.8 | **Certificación del capellán del navío** sobre la muerte. ⭐ |
| 19–22 | f.9–10v | Pedimento en Cádiz de Blas Antonio González de Figueroa, auto del 9‑II‑1728 y libramiento de 154 pesos. |
| 27–28 | f.13 | Recibo de los 154 pesos firmado por Figueroa en Cádiz, 9‑II‑1728. |
| 23–26, 29–45 | f.11–20 | **Segunda fase (1776–1777):** quedan 467 reales de vellón en el arca; carta al juez de Muros, su informe y el **poder de Josefa Luaces de Orxas** (7‑VII‑1776), el auto y el libramiento a Ignacio Suárez. |

### 1.2 Pasajes clave (transcripción paleográfica)

**(a) Partida de bautismo, inserta en la certificación de 1727** (img 15, f.7). Confianza **ALTA** en nombres y fecha; **MEDIA** en los nombres de padrinos y clérigos.

> D. Jacobo Gomez de Bazarra Canonigo Cura de las [almas] y Clerecia Collegial y Parroq[ui]al de Señor San Pedro de la Villa de Muros, Diocesis Compostelana, Certifico adonde Convenga en como abiendo buscado el Libro de asientos de Baptizados de dha Parroq[ui]al y Iglesia he allado en el folio sesenta del precitado libro la partida que se sigue = En seis de Jullio de mill y siete cientos años, Yo Dn Juan Patiño de Luazes [?], de licencia del Canonigo Dn Juan Gomez Calderon Cura de esta Villa, Baptizé y puse los Santos Oleos a un hijo de Jacob de Luazes y de su muger Maria Fernandez; tubo nombre Ygnacio; fueron sus Padrinos [Mtre? / Alfz?] Dn Nicolas [?] Pardiñas Villar de Francos y su Muger Doña Juana Rodriguez [?] de Guiamonde [?]; adbertiles el parentesco espiritual y obligacion de enseñarle la Doctrina Christiana, y lo firmo ut supra = Dn Juan Gomez Calderon = Juan Patiño =

*Resumen:* Ignacio fue bautizado el **6 de julio de 1700** en la colegiata de San Pedro de Muros (libro de bautismos, f. 60). Era hijo de Jacobo de Luaces y de María Fernández. Los padrinos fueron dos personas de rango "Don/Doña" (Pardiñas Villar de Francos), lo que apunta a una familia con cierta posición. *Nota:* el apellido del clérigo bautizante se lee "de Luazes" o "de Suarez"; en este escribano las dos formas se parecen (MEDIA‑BAJA).

**(b) Partida de matrimonio de los padres, en la misma certificación** (img 15–16, f.7–7v). Confianza **ALTA** en contrayentes, padres y fecha; **MEDIA‑BAJA** en el oficiante y los testigos.

> Y lo mesmo Certifico que aviendo buscado el Libro de asientos de casados y belados de dha Parroq[ui]al y Iglesia, he allado a fojas veinte y [?] la Partida del thenor siguiente = En veinte y siete de henero de mill seis cientos noventa y siete Casé in facie ecclesie Yo el Canonigo Dn J[ua]n [?] de Aranda [?] y Rebolla [?] a Jacob Luazes de Caam[año] hijo de Simon de Luazes y Caamaño y de Maria de Soliz, con Maria Fernandez de Orxas hija de Pedro de Orxas y de Maria Fernandez de Baños, y aviendo precedido las tres amonestaciones y mas dispuesto por el Santo Concilio de Trento, no resultó ympedimento alguno; fueron testigos el Lic[enciad]o [?] Dn Juan Patiño de Luazes [?], el Racionero [?] Ant[oni]o Rodriguez [?] de Rebolla [?], Andres Gonzalez y otros, y lo firmo ut supra = D. J[ua]n [?] Aranda [?] de Rebolla = Y al margen de dha partida se halla la anotacion que se sigue = Esta Belado = segun bien concuerda con la original … a pedim[ien]to de la referida Maria Fernandez de Orxas en dha Villa a dia mes y año dhos = Jacob Gomez de Bazarra

*Resumen:* el **27 de enero de 1697**, en San Pedro de Muros, se casaron **Jacobo Luaces de Caamaño**, hijo de **Simón de Luaces y Caamaño** y **María de Solís**, y **María Fernández de Orxas**, hija de **Pedro de Orxas** y **María Fernández de Baños**. Es la **fuente primaria** de la filiación pa020 → pa021 que hasta ahora solo conocíamos por el catálogo. La filiación queda confirmada en un asiento sacramental copiado literalmente.

**(c) Poder de la madre** (img 3, Muros, 30‑XI‑1727). Confianza **MEDIA‑ALTA**.

> En la Villa de Muros a treinta dias del mes de Nobiembre año de mill setecientos y veinte y siete, por delante mi ss[criba]no del numero y testigos parecio presente Maria Fernandez de Orxas viuda que fincó de Jacob[o] Luazes de Caam[año], vezina que es y dho su marido havido de esta dha Villa, Diocesis Compostelana del Reyno de Galicia, y dixo que durante dho matrimonio ha tenido por su hijo legitimo entre otros a Ygnacio Luazes Fernandez de Orxas, el qual siendo soltero habra unos onze años poco mas o menos se ausentó desta dha Villa para fuera del Reyno … biniendo de Buenos Ayres … en el navio nombrado San Rafael … su Comandante Su Señoria el Señor Dn Salvador Garcia Poze, y por Capitan y Piloto Dn Joseph Romero, y segundo Piloto Dn Pedro Ribas [?] … otorga todo su Poder cumplido … a Dn Blas Antonio Gonzalez Figueroa vezino desta Villa, Capitan del navio nombrado el Rozario [?], y a Juan de Rivera [?] Figueroa de la misma vezindad … para cobrar … todo lo que del dho Ygnacio Luazes de Caamaño su hijo difunto hubiere quedado …

*Resumen:* en noviembre de 1727 el padre, **Jacobo, ya había muerto**. Ignacio se fue de Muros **soltero hacia 1716**. El poder lo atestiguan "[Domingo?] **Romero de Caamaño**, Procurador de causas desta Villa", Juan García de Zúñiga y Antonio González (img 4–5; MEDIA).

**(d) Pedimento ante el alcalde de Muros** (img 7, f.3). Confianza **MEDIA‑ALTA**.

> … en nombre de Maria Fernandez de Orxas viuda que fincó de Jacobo de Luazes de Caamaño … an tenido por su hijo lexitimo entre otros a Ygnacio de Luazes Caam[año] Fernandez de Orxas … salió desta Villa para fuera del Reyno … biniendo de Buenos ayres y del Puerto nombrado la Trinidad [?] en el Navio nombrado San Rafael … y biniendo el hijo de mi parte con otros trece marineros se ahogó en el Rio de la Plata de Buenos ayres en un Bote de dho Navio que en el iban …

*Resumen:* Ignacio usaba los apellidos completos **"Luaces [de] Caamaño Fernández de Orxas"**. Se ahogó junto con otros 13 marineros cuando volcó un bote del navío en el Río de la Plata.

**(e) Testigos de la información** (img 8–13, f.3v–6). Confianza **BAJA** por el daño del papel. El juez es D. Joseph Antonio de Longa [?], alcalde ordinario de Muros "por Su Ilustrísima el Señor Arzobispo de Santiago" (Muros era villa de señorío arzobispal). Los tres testigos son vecinos de Muros: Juan González; [Alonso?] Romero de Caamaño [?] (BAJA); y un tercero cuyo nombre es ilegible y que firma "… de Caamaño" (img 12, MEDIA para el apellido). Todos repiten la filiación. Un testigo atribuye la noticia de la muerte a otro marinero de Muros que venía en el mismo navío (BAJA). La certificación final (img 13) dice: "a pedimiento de dha Maria Fernandez de Orxas viuda del precitado Jacobo Luazes de Caam[año] … en dha Villa a treinta dias del mes de Nov[iemb]re año de mill setecientos y veinte y siete" (MEDIA‑ALTA).

**(f) Certificación de muerte** (img 17, f.8, papel sellado de 1728). Confianza **ALTA**.

> Certifico yo el infrascripto Capellan de la nao nombrada S. Rafael y Sto Domingo de la Calzada, Capitana [del Registro?] que ultimamente llegó de la Ciudad de B[ueno]s Ayres al cargo de D. Salvador Garzia Pose su dueño, que en el Rio de la plata de dha Ciudad se ahogó el dia doze de Febrero del año proximo pasado de 1727 Ygnacio de Luazes, natural de Muros; y para que conste di la presente en Cadiz a 18 de febrero de 1728. Rodrigo Beaun [?]

*Resumen:* **Ignacio de Luaces murió ahogado el 12 de febrero de 1727 en el Río de la Plata, frente a Buenos Aires.** Tenía 26 años.

**(g) Pago en Cádiz** (img 19–22, 27–28). Confianza **ALTA**. Blas Antonio González de Figueroa, "vezino de Muros en el Reyno de Galicia y residente en esta Ciudad", cobra **154 pesos** de soldada líquida. El auto del juez D. Francisco Manuel de Coral [?] es del 9‑II‑1728, y Figueroa firma el recibo ese mismo día. La madre es declarada "**madre unica y universal heredera abintestato**".

**(h) Fase de 1776: informe del juez de Muros** (img 31–32, f.14–14v, Muros, [21?]‑VII‑1776). Confianza **ALTA** en el contenido; **BAJA** en el firmante.

> … debo decir … que de los dhos Jacob[o] Luaces y Maria Fern[ande]z de Orjas, difuntos, vecinos que fueron de esta villa, solo quedó por su hija legitima y universal heredera (por haverse muerto los demas) Josepha Luaces de Orjas, celibata y pobre, que se alimenta con los socorros de los fieles devotos, pues los que tubo por hermanos, Ygnacio, Antonio, Simon y Juana Luaces, que se han muerto, es publico y notorio en esta dha villa …

*Resumen:* Jacobo y María tuvieron **al menos cinco hijos: Ignacio, Antonio, Simón, Juana y Josefa**. En 1776 solo vivía Josefa, soltera y pobre. Los dos padres habían muerto.

**(i) Poder de Josefa** (img 35–38, f.15–16v, Muros, 7‑VII‑1776). Confianza **ALTA**.

> En la Villa de Muros a siete dias del mes de Jullio año de mil setecientos setenta y seis … parecio presente Josepha Luazes de Orxas, selibata, vezina de esta Villa, hija legitima y unica que quedo de Jacobo Luazes y Maria Fern[ande]z de Orxas, vezinos que fueron de esta misma Villa, difuntos … Ygnacio Luazes su hermano havia servido en los Navios … nombrado S. Raphael y Sto Domingo de la Calzada … quatrocientos sesenta y siete r[eale]s vellon que pertenecen a la otorgante como unica hermana que ha quedado del sobredho … [poder] a D. Ygnacio Suarez Mercader y vezino de dha Ciudad de Cadiz … y a Domingo Antonio Sendon [?], vezino de esta villa … y la otorgante no lo firmó por no saber, y a su ruego lo hizo uno de los presentes que lo fueron D. Estevan de Longa [?] Canonigo de la Colexiata de esta Villa, D. Bartolome Patiño y Caamaño Procurador General de ella, y D. Thomas de Campelo escribano de Su Magestad … = Como testigo y a ruego Bartholome Patiño y Caamaño. Ante mi Joseph Antonio Luazes Figueroa.

*Resumen:* Josefa no sabía firmar. Firmó por ella como testigo **D. Bartolomé Patiño y Caamaño, procurador general de Muros**. El escribano del número de Muros (y de Louro) era **Joseph Antonio Luazes Figueroa**, posible pariente por el apellido Luaces, aunque el documento **no** lo dice. El libramiento de 467 reales a Ignacio Suárez se despachó el 1‑VIII‑1776 (img 39–40) y se terminó de tramitar en mayo y junio de 1777 (img 41–45).

### 1.3 Todas las personas nombradas (N.6)

| Persona | Rol / parentesco | img | Confianza |
|---|---|---|---|
| **Ignacio Luaces [de] Caamaño Fernández de Orxas** | El difunto. Bautizado 6‑VII‑1700 en San Pedro de Muros; se fue soltero ~1716; mozo del navío *San Rafael y Santo Domingo de la Calzada*; **ahogado en el Río de la Plata el 12‑II‑1727** | 3, 7, 15, 17 | ALTA |
| **Jacobo (Jacob) Luaces de Caamaño** | Padre. Casó el 27‑I‑1697; murió antes del 30‑XI‑1727 | 3, 7, 13, 15 | ALTA |
| **María Fernández de Orxas** (Orjas/Orgas) | Madre. Viuda en 1727; heredera abintestato; murió antes de 1776 | 3, 7, 15, 31 | ALTA |
| **Simón de Luaces y Caamaño** | Abuelo paterno | 15 | ALTA |
| **María de Solís** | Abuela paterna | 15 | ALTA |
| **Pedro de Orxas** | Abuelo materno | 15 | ALTA |
| **María Fernández de Baños** | Abuela materna | 15 | ALTA |
| **Josefa Luaces de Orxas** | Hermana. Soltera, pobre, no sabe firmar; única viva en 1776 | 31–37 | ALTA |
| **Antonio, Simón y Juana Luaces** | Hermanos, muertos antes de 1776 | 32 | ALTA |
| D. Nicolás [?] Pardiñas Villar de Francos y Dª Juana Rodríguez [?] de Guiamonde [?] | Padrinos de Ignacio | 15 | MEDIA |
| D. Juan Patiño de Luazes [?] | Clérigo que lo bautizó; testigo de la boda de 1697 | 15–16 | MEDIA‑BAJA |
| D. Juan Gómez Calderón; D. Juan [?] de Aranda [?] y Rebolla [?] | Cura de Muros en 1700; canónigo que ofició la boda | 15–16 | MEDIA / BAJA |
| D. Jacobo Gómez de Bazarra | Canónigo cura de San Pedro de Muros en 1727 | 15–16 | ALTA |
| D. Blas Antonio González de Figueroa | Apoderado en 1727–28, capitán del navío *el Rosario* [?], vecino de Muros | 3, 19, 28 | ALTA |
| [Domingo?] Romero de Caamaño | Procurador de causas de Muros, testigo del poder de 1727 | 5 | MEDIA (apellido) / BAJA (nombre) |
| [?] … de Caamaño | Testigo de la información de 1727 | 12 | BAJA |
| Francisco García de Castro | Escribano de Muros en 1727 | 5, 13 | ALTA |
| D. Salvador García Pose; D. Joseph Fernández Romero | Dueño y comandante del navío; capitán y maestre | 3, 7, 17, 23 | ALTA |
| Rodrigo Beaun [?] | Capellán del navío | 17 | BAJA (firma) |
| **D. Bartolomé Patiño y Caamaño** | Procurador general de Muros en 1776; firma por Josefa | 37 | ALTA |
| Joseph Antonio Luazes Figueroa | Escribano del número de Muros y Louro en 1776 | 37 | ALTA |
| D. Esteban de Longa [?]; D. Tomás de Campelo | Canónigo de la colegiata; escribano. Testigos en 1776 | 37–38 | MEDIA |
| D. Ignacio Suárez; Domingo Antonio Sendón [?] | Apoderados de Josefa: mercader de Cádiz; vecino de Muros | 32, 35, 39 | ALTA / BAJA |
| D. Calixto Sanz | Escribano de cámara de la Audiencia de Contratación en 1776 | 24, 30–31, 39 | ALTA |

### 1.4 Señales para el clúster de Muros y Santa María de Caamaño

- ⭐ **Confirmado con fuente primaria:** pa020 Simón de Luaces y Caamaño × María de Solís → pa021 Jacobo Luaces de Caamaño × María Fernández de Orxas (boda 27‑I‑1697) → pa022 Ignacio (bautismo 6‑VII‑1700). La familia era feligresa de **San Pedro de Muros**, no de Santa María de Caamaño. El expediente **no menciona la parroquia de Caamaño (Porto do Son)**.
- En Muros hay otros portadores del apellido Caamaño con oficio público: **Romero de Caamaño** (procurador de causas, 1727) y **Bartolomé Patiño y Caamaño** (procurador general, 1776). El apellido aparece en compuestos ("Patiño y Caamaño", "Romero de Caamaño", "Luaces de Caamaño"), como en el patrón de los "de los Santos de Caamaño" del Catastro.
- **Vínculo Baños–Caamaño en Muros (hipótesis, sin probar):** la abuela materna de Ignacio es María Fernández **de Baños**. Doc. 3 registra en Muros (1709) a Felipe de Baños casado con María Iansa **de Camaño**. Mismo pueblo, misma generación, mismos apellidos. **No hay prueba de parentesco.**
- **Colombia:** ninguna mención. La ruta de Ignacio era Cádiz → Buenos Aires.
- **p001:** sin relación documental. Esta rama se extingue en lo que se ve: en 1776 la única superviviente es Josefa, soltera. De Antonio y Simón no sabemos si tuvieron descendencia.

---

## 2. AGI ES.41091.AGI//CONTRATACION,5459,N.9: José Varela Camaño, pasajero en 1699

**PARES:** nid 155486 · 8 imágenes · **Local:** `research/pares-transcriptions-2026-10/agi-contratacion-5459-n9/images/`

**Pedimento** (img 1, papel sellado de 1699; margen "6 Julio"). Confianza **ALTA**.

> Joseph Barela Camaño residente en esta Ciudad y natural y vezino del lugar de Pernes del Coto de Bergantiños en el Reyno de Galicia digo que como consta de la certificacion de la Contaduria principal … tengo cargadas y registradas diferentes mercadurias de mas valor de duzientos mill m[a]r[avedi]s en algunos navios de la presente flota que se apresta para hazer viaje a la provincia de Nueva España a cargo del general Dn Manuel de Velasco y Tejada cavallero del horden de Santiago, adonde me es preciso pasar a beneficiar el procedido de dichas mercadurias … ofrezco informacion de ser natural de dho lugar … y hijo legitimo de Domingo Barela Camaño y Maria del Villar naturales y vecinos de dho lugar, de hedad de veinte y dos años, con dos lunares en la mexilla izquierda y cicatriz [?] en la frente, de buen cuerpo, pelo castaño y oyo en la barba, soltero, christiano viejo y no de los prohibidos de pasar a las Indias …

- **Testigos** (img 3–6, Cádiz, julio de 1699): tres gallegos residentes en Cádiz, **naturales de La Coruña** (nombres BAJA: Santiago Cabrera [?], Joseph Suárez [?] de Pardo [?], Pedro [?] Amaro del Campo [?]). Dicen conocerlo desde hace 6 a 12 años, en Pernes y en Cádiz, y confirman la filiación: "hijo lexitimo de Domingo Varela Camaño y Maria de Villar su lex[iti]ma muger" (ALTA).
- **Despacho** (img 2): "En 6 de Julio de 1699 se dio despacho de embarcacion al dho Dn Joseph Barela como factor soltero en qualquier navio de la flota" (ALTA).
- **Certificación de la Contaduría** (img 7): mercancías por valor de más de 200.000 maravedís (MEDIA).

**Resumen:** José Varela (Barela) Camaño nació hacia **1677**. Era soltero y comerciante de sus propias mercancías ("factor"). Natural de **Pernes, Coto de Bergantiños**, al norte de la provincia de A Coruña y lejos de Muros y Porto do Son. Sus padres eran Domingo Varela Camaño y María del Villar. Destino: Nueva España, en la flota de Manuel de Velasco y Tejada (1699).
**Señales:** **ninguna** con el clúster de Muros, Santa María de Caamaño o Colombia. Es un portador independiente del apellido.

---

## 3. AGI ES.41091.AGI//CONTRATACION,5465,N.1,R.9: Felipe de Baños, criado del gobernador de Trinidad (1709)

**PARES:** nid 156354 · 12 imágenes · **Título real del expediente:** "Cristóbal Félix Guzmán" · **Local:** `research/pares-transcriptions-2026-10/agi-contratacion-5465-n1-r9/images/`

**Pedimento del gobernador** (img 1, papel sellado de 1709). Confianza **MEDIA‑ALTA**.

> D. Xptobal Phelix de Guzman a quien S. M. … ha hecho merced del puesto de Governador y Capitan General de la Isla de la Trinidad y la Guayana … y que pueda llevar en mi servicio dos criados … llevo por tales criados a Phelipe de Baños natural de la villa de Muros en Galicia hijo del mismo y de Maria Ieanza [?] de Camaño naturales de dicha villa; a D. Pablo Antonio Martinez de Bezares …

**Información de Felipe de Baños** (img 7–9, Sevilla, octubre de 1709). Tres testigos, todos vecinos de Sevilla. El primero vive en la collación de San Pedro, se llama Juan Serrano de Reina [?] y su testimonio es el de img 7. Confianza **ALTA** en el contenido; **MEDIA‑BAJA** en el apellido materno.

> … conoce a Phelipe de Baños y save que es natural de la villa de Muros en Galicia, que sera de hedad de diez y seis años, trigueño [?], mediano de cuerpo, … picado de viruelas; … es soltero no sujeto a matrimonio ni a otra religion alguna y que es hijo legitimo de legitimo matrimonio de Phelipe de Baños y de Maria Iansa [?] de Camaño su legitima muger, naturales de la dha Villa de Muros en Galicia …

Los otros dos testigos (img 8: Joseph Mauricio [?] … de Reina [?]; img 9: Joseph Salvador … de Soto [?]) repiten "Maria Iansa de Camaño" y las mismas señas: 16 años, picado de viruelas. La licencia real (img 10–11) es de 1709 y el despacho de embarque se dio en **Sevilla el 7‑X‑1709** (img 12).

**Resumen:** Felipe de Baños (hijo) nació en Muros hacia **1693**. Sus padres eran Felipe de Baños y María "Iansa/Ieanza de Camaño", los dos naturales de Muros. En 1709 pasó como criado del sargento mayor Cristóbal Félix de Guzmán, nuevo gobernador de **Trinidad y Guayana**.
**Notas:**
- La lectura del catálogo, "**Jiansa y Caamaño**", **no se sostiene literalmente**. El original dice "Iansa", "Ieanza" o "Iansa" **de** Camaño, sin "y". Podría ser una mala transcripción de un apellido como "Llanza" o "Yanza". Recomiendo registrar el apellido como "Iansa (¿?) de Camaño" con nota de lectura dudosa.
- **Señal geográfica:** Trinidad y Guayana pertenecían a la órbita de Tierra Firme y Venezuela, vecina pero no Colombia. **No hay vínculo con Colombia** en el expediente.
- Muros + Baños + Caamaño: ver la hipótesis de §1.4 (sin probar).

---

## 4. ARChV ES.47186.ARCHV//PL CIVILES,PÉREZ ALONSO (F),CAJA 3703,1: herencia de Matías Caamaño y Rosa Estévez (Fefiñanes)

**PARES:** nid 228333 · **digitalizado, 1.588 imágenes** (8 unidades) · **Local:** `research/pares-transcriptions-2026-10/archv-pl-civiles-perez-alonso-f-caja3703-1/images/` (solo img 1–12).

Solo hice un **muestreo**: leí la portada de la primera pieza y el pedimento de 1805. Leer el pleito completo requeriría descargar las 1.588 imágenes (~5 GB, unas 15 min a 0,5 s por imagen) y repartir la lectura entre varios agentes por rangos.

**Portada** (img 2). Confianza **ALTA**.

> Autos hechos en esta Chanz[illerí]a [de] Fefiñanes / Puente de Hume. Año de 1806 … D. Joaquin Antonio Forrado, ess[criba]no y vez[in]o de la v[ill]a de Fefiñanes, con Dn Pedro Gonzalez de Groba, tercenista ma[yo]r de la R[ea]l Renta del Tavaco en la v[ill]a de Puente de Hume, y Dª Maria Ysavel Caamaño y Estebez su Muger, y el Lic[encia]do Dn Jose Manuel Caamaño, Abogado de la R[ea]l Aud[ienci]a de Galicia, vez[in]o de dha v[ill]a de Fefiñanes. … Restitucion de los vienes que quedaron por muerte de Dª Rosa Estebez y Dn Matias Caamaño su primer [?] marido …

**Pedimento de 1805** (img 6–7). Confianza **MEDIA**. El procurador de Forrado expone que este, como **heredero de su tío D. Francisco Antonio Pérez**, siguió el pleito que aquel tenía "con D. José Manuel Caamaño y su hermana Dª María Isabel" ante la justicia de **Cambados**. La Real Audiencia de La Coruña condenó a pagar 6.970 reales de un recibo dado por José Moreno, vecino de la villa de Cortegada, a favor de **D. Francisco y Dª Rosa Estévez, su hermana, como cumplidores [testamentarios] de D. Matías Caamaño, marido que había sido de ésta**, y además las cosas del inventario hecho por muerte de dicho D. Matías Caamaño. Valladolid, 23‑XII‑1805.

**Personas y aportes:**
- **Matías Caamaño** murió antes que Rosa Estévez. Rosa fue cumplidora de su testamento junto con **su hermano D. Francisco Estévez** [?]. La portada dice "su primer [?] marido", lo que sugiere que Rosa **volvió a casarse** (BAJA en "primer").
- **María Isabel Caamaño y Estévez** estaba casada con **Pedro González de Groba**, tercenista del tabaco en Puentedeume.
- **José Manuel Caamaño (y Estévez)**: licenciado y **abogado de la Real Audiencia de Galicia**, vecino de Fefiñanes. Dato nuevo de profesión para pa028.
- **Señales:** ninguna con Muros, Santa María de Caamaño o Colombia. Es la ría de Arousa (Cambados), otro clúster.

---

## 5. Propuestas para el árbol (NO aplicadas; requieren revisión de LM)

**Correcciones**
1. **pa022 Ignacio de Luaces:** `birthDate` "~1710" → **"1700-07-06" (bautismo)**, en San Pedro de Muros. Añadir `deathDate` **"1727-02-12"**. `deathPlace` "Ultramar (posible Nueva España)" → **"Río de la Plata, Buenos Aires (ahogado)"**. Notas: mozo del navío *San Rafael y Santo Domingo de la Calzada*; se fue soltero ~1716; nombre completo "Ignacio Luaces de Caamaño Fernández de Orxas"; los autos se tramitaron en **Cádiz**, no en Sevilla.
2. **pa021 Jacobo Luaces de Caamaño:** `birthDate` "~1690" es imposible porque se casó en 1697 → **"~1665–1675"**. Añadir la boda del **27‑I‑1697 en San Pedro de Muros** y la muerte antes del 30‑XI‑1727. Corregir el apellido de la esposa: "Orgás" → **"Fernández de Orxas (Orjas)"**. La abuela materna se llama completa: **María Fernández de Baños**.
3. **pa020 Simón de Luaces y Caamaño:** `birthDate` "~1660" → **"~1630–1650"** (su hijo se casó en 1697).
4. **pa025 María "Jiansa y Caamaño":** marcar la lectura como dudosa. El original dice "Maria Iansa/Ieanza de Camaño". Añadir que su hijo Felipe tenía unos 16 años en 1709 (n. ~1693) y que viajó a Trinidad y Guayana.
5. **pa024 José Varela Camaño:** `birthDate` → **"~1677"** (22 años en julio de 1699). La nota "tercer Caamaño migrado a las Américas" debería aclarar que es de Bergantiños, sin relación con Muros.

**Adiciones posibles** (todas con certeza ALTA y fuente AGI CONTRATACION,5590,N.6)
6. **María Fernández de Orxas** como persona propia (cónyuge de pa021; viuda en 1727; muerta antes de 1776).
7. Hijos de pa021 × María Fernández de Orxas: **Josefa Luaces de Orxas** (viva en 1776, soltera), **Antonio**, **Simón** y **Juana Luaces** (muertos antes de 1776).
8. Abuelos maternos de pa022: **Pedro de Orxas** × **María Fernández de Baños**.
9. Personas de contexto, en notas y no como nodos: **Bartolomé Patiño y Caamaño** (procurador general de Muros, 1776) y **[Domingo?] Romero de Caamaño** (procurador de causas de Muros, 1727). Pueden servir para futuras búsquedas en los libros de San Pedro de Muros.
10. pa028 José Manuel Caamaño y Estévez: añadir "licenciado, abogado de la Real Audiencia de Galicia (1805)". pa029: el nombre es **María Isabel**, casada con **Pedro González de Groba** (tercenista del tabaco, Puentedeume).

**Lo que NO se debe concluir:** ningún documento conecta con p001 ni con Colombia. pa020–pa022 son feligreses de San Pedro de Muros, no de Santa María de Caamaño.

---

## 6. Próximos pasos
- **Libros sacramentales de San Pedro de Muros** (AHDS): bautismos ~1697–1715 (hermanos de Ignacio) y bautismo de Jacobo (~1665–1675) para subir a la generación de Simón y María de Solís. Las citas exactas (libro de bautismos, f. 60; libro de casados, f. 2x) están arriba.
- Pleito ARChV 3703,1: lectura completa repartida entre varios agentes por rangos de imágenes. Script ya preparado: `download.sh 228333 <dir>`.
