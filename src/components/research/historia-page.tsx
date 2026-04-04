/**
 * Historia del Apellido Caamaño — editorial research page.
 * Updated 2026-04-04 with all research findings from CEMLA, PARES,
 * FamilySearch, Genealogías de Colombia, Geneanet, Xenealoxia.org.
 */

const COMARCAS = [
  { name: "Muros", count: 1677, pct: 100 },
  { name: "A Coruña", count: 1466, pct: 87 },
  { name: "Fisterra", count: 972, pct: 58 },
  { name: "Noia", count: 948, pct: 57 },
  { name: "Bergantiños", count: 867, pct: 52 },
  { name: "Santiago", count: 572, pct: 34 },
  { name: "Xallas", count: 525, pct: 31 },
  { name: "Terra de Soneira", count: 415, pct: 25 },
  { name: "O Salnés (Pontevedra)", count: 307, pct: 18 },
  { name: "Vigo (Pontevedra)", count: 306, pct: 18 },
];

const COUNTRIES = [
  {
    name: "España",
    flag: "🇪🇸",
    count: "6,205",
    note: "Concentrado en Galicia (A Coruña)",
  },
  {
    name: "Colombia",
    flag: "🇨🇴",
    count: "1,504",
    note: "Documentados desde 1689",
  },
  {
    name: "Rep. Dominicana",
    flag: "🇩🇴",
    count: "~800",
    note: "Legado revolucionario",
  },
  { name: "Ecuador", flag: "🇪🇨", count: "~600", note: "Legado presidencial" },
  {
    name: "Argentina",
    flag: "🇦🇷",
    count: "~500",
    note: "100 pasajeros CEMLA (1884-1907)",
  },
  {
    name: "Estados Unidos",
    flag: "🇺🇸",
    count: "1,089",
    note: "47 por Ellis Island",
  },
  {
    name: "Uruguay",
    flag: "🇺🇾",
    count: "~100",
    note: "28 en listas de pasajeros",
  },
];

const NOTABLES = [
  {
    name: "García de Caamaño 'El Hermoso'",
    years: "~1400s",
    role: "Fundador de Villagarcía de Arousa",
    accent: "border-l-teal-500",
    badge: "bg-teal-600",
    icon: "🏘️",
    description:
      "Señor de Rubianes, Vista Alegre, Arealonga. Fundó 'o meu lugar e porto de VILA-GARCÍA' el 12 de mayo de 1441. Construyó el Pazo de Rubianes (inscripción: 'Fizo Fernández de Caamaño anno de 1411'). Hoy Villagarcía de Arousa tiene 38.000 habitantes.",
  },
  {
    name: "Antonio Domingo Caamaño Mendoza",
    years: "~1660–1746",
    role: "Virrey del Perú (1736-1746)",
    accent: "border-l-amber-500",
    badge: "bg-amber-600",
    icon: "👑",
    description:
      "3er Marqués de Villagarcía, Vizconde de Barrantes. Embajador de España en Venecia. Nombrado Virrey del Perú en 1736. Murió en el mar frente al Cabo de Hornos regresando a España en 1746.",
  },
  {
    name: "Jacinto Caamaño Moraleja",
    years: "1759–~1820",
    role: "Explorador naval de Alaska",
    accent: "border-l-blue-500",
    badge: "bg-blue-600",
    icon: "⚓",
    description:
      "Caballero de Calatrava. Lideró la última gran expedición española a Alaska y Columbia Británica (1790-1792). La Isla Camano (Washington) y el Pasaje Caamaño (Columbia Británica) llevan su nombre. Se casó con la ecuatoriana Francisca de Arteta — su nieto fue Presidente de Ecuador.",
  },
  {
    name: "José María Plácido Caamaño",
    years: "1838–1901",
    role: "12° Presidente del Ecuador (1884-1888)",
    accent: "border-l-sky-500",
    badge: "bg-sky-600",
    icon: "🏛️",
    description:
      "Nieto del navegante Jacinto Caamaño. Abogado y político guayaquileño. Su período se conoce como el inicio del 'Progresismo'. Murió exiliado en Sevilla.",
  },
  {
    name: "Francisco Alberto Caamaño Deñó",
    years: "1932–1973",
    role: "Revolucionario dominicano",
    accent: "border-l-red-500",
    badge: "bg-red-600",
    icon: "✊",
    description:
      "Líder de la revuelta constitucionalista de 1965 en República Dominicana. Elegido Presidente durante el conflicto. EE.UU. invadió la RD en respuesta. Exiliado a Londres y Cuba. Regresó con un grupo guerrillero en 1973 — capturado y ejecutado.",
  },
  {
    name: "Vasco de Caamaño",
    years: "~1200s",
    role: "Fundador de la línea Camões (Portugal)",
    accent: "border-l-emerald-500",
    badge: "bg-emerald-600",
    icon: "✒️",
    description:
      "Hijo de la 5ª generación del tronco principal. Protegido del Rey Juan I de Portugal desde 1369. Se casó en Portugal, dando origen a la familia Camões — sí, la familia del poeta Luís de Camões, considerado el mayor poeta de la lengua portuguesa.",
  },
  {
    name: "Ángel Caamaño 'El Barquero'",
    years: "1861–1927",
    role: "Periodista y crítico teatral",
    accent: "border-l-purple-500",
    badge: "bg-purple-600",
    icon: "📰",
    description:
      "Reconocido crítico teatral de Madrid. Su columna era lectura obligada para la escena cultural española de principios del siglo XX.",
  },
];

const MIGRATIONS = [
  {
    era: "Colonial (1500s–1700s)",
    push: "Hidalgos, clérigos y funcionarios coloniales",
    destinations: "Ecuador, Rep. Dominicana, Nueva Granada (Colombia)",
    detail:
      "1687: Salvador Varela Caamaño obtiene la primera licencia de la Casa de Contratación — el Caamaño más antiguo documentado cruzando el Atlántico. 1689: Juana María Caamaño tiene 5 hijos en Bogotá. 1744: Bernardo Martínez y Perrúa (línea Caamaño de Muros) llega a Antioquia.",
    source: "PARES (Archivo General de Indias) + Genealogías de Colombia",
  },
  {
    era: "Siglo XIX (1850–1900)",
    push: "Pobreza gallega, crisis del minifundio, hambrunas",
    destinations: "Argentina (#1), Cuba (#2), Colombia, Uruguay, EEUU",
    detail:
      "~1845: José Tomás Caamaño emigra desde la parroquia de Santa María de Caamaño (Porto do Son) a Colombia. Sus hermanos se dispersan a Rep. Dominicana, Ecuador y Argentina. 1889: José Caamaño Soto (combinación Caamaño+Soto) aparece en listas de pasajeros a Uruguay — confirma la familia.",
    source: "Tradición oral + CEMLA + FamilySearch",
  },
  {
    era: "Siglo XX (1884–1907)",
    push: "Emigración masiva gallega, pobreza rural, servicio militar",
    destinations:
      "Buenos Aires (100 pasajeros), Nueva York (47), Montevideo (28)",
    detail:
      "CEMLA documenta 100 pasajeros Caamaño a Buenos Aires. El 38% embarcó desde Villagarcía de Arousa (fundada por un Caamaño en 1441). En 1905, Tomás Caamaño (42 años, jornalero) llega a Buenos Aires con sus hijos Amalia y Manuel en el barco P. de Satrústegui.",
    source: "CEMLA (cemla.com) + FamilySearch Ellis Island",
  },
];

const RESEARCH_SOURCES = [
  {
    name: "FamilySearch",
    count: "1,844 registros",
    icon: "📖",
    description: "Registros parroquiales, civiles y censos de A Coruña",
  },
  {
    name: "CEMLA",
    count: "100 pasajeros",
    icon: "🚢",
    description: "Listas de pasajeros al puerto de Buenos Aires (1884-1907)",
  },
  {
    name: "PARES",
    count: "602 documentos",
    icon: "📜",
    description:
      "Portal de Archivos Españoles — Casa de Contratación, Inquisición, Simancas",
  },
  {
    name: "Genealogías de Colombia",
    count: "4 líneas",
    icon: "🇨🇴",
    description: "Base de datos de 583.000 individuos — Fidel Botero Arango",
  },
  {
    name: "Ellis Island",
    count: "47 pasajeros",
    icon: "🗽",
    description: "New York Passenger Arrival Lists (1892-1925)",
  },
  {
    name: "Uruguay",
    count: "28 pasajeros",
    icon: "🇺🇾",
    description: "Uruguay Passenger Lists (1888-1980)",
  },
  {
    name: "Geneanet",
    count: "380 perfiles",
    icon: "🌐",
    description:
      "Árboles genealógicos colaborativos — José Vázquez de Caamaño (1517)",
  },
  {
    name: "García Carraffa",
    count: "Tomo XX",
    icon: "📚",
    description:
      "Enciclopedia Heráldica y Genealógica — 13 generaciones documentadas",
  },
  {
    name: "Xenealoxia.org",
    count: "Artículo",
    icon: "🏰",
    description:
      "Foro de genealogía gallega — historia del Castro Caamaño y fundación de Villagarcía",
  },
];

function SectionDivider() {
  return (
    <div className="mx-auto my-12 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
  );
}

function BarChart({ data }: { data: typeof COMARCAS }) {
  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <span className="w-40 shrink-0 text-right text-sm text-slate-700">
            {item.name}
          </span>
          <div className="flex-1">
            <div
              className="h-6 rounded-r bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-500"
              style={{ width: `${item.pct}%` }}
            />
          </div>
          <span className="w-14 shrink-0 text-sm font-medium tabular-nums text-slate-800">
            {item.count.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HistoriaPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Hero */}
        <header className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-teal-600">
            Historia y Genealogía
          </p>
          <h1 className="font-serif text-4xl font-bold text-slate-950 sm:text-5xl">
            El Apellido Caamaño
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            Desde una fortaleza en las costas de Galicia hasta cinco países en
            tres continentes — la historia de un linaje que ha fundado ciudades,
            gobernado naciones e inspirado poesía.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-32 rounded-full bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
        </header>

        {/* 1. Origin */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-slate-950">
            Origen: Santa María de Caamaño
          </h2>
          <p className="mb-4 leading-relaxed text-slate-700">
            El apellido <strong>Caamaño</strong> es <strong>toponímico</strong>{" "}
            — deriva de la parroquia de <strong>Santa María de Caamaño</strong>,
            en el municipio de <strong>Porto do Son</strong> (comarca de Noia, A
            Coruña, Galicia). El castillo de <strong>Castro Caamaño</strong>,
            fundado en <strong>1177</strong>, dio nombre a la familia. La
            inscripción decía:{" "}
            <em>
              &quot;Fizo Juan de Caamaño, Año de Mill Ciento Setenta et
              Siete.&quot;
            </em>
          </p>

          <div className="mb-6 overflow-hidden rounded-xl border border-slate-200">
            <img
              src="https://commons.wikimedia.org/w/thumb.php?f=Iglesia_de_Santa_Mar%C3%ADa_de_Caama%C3%B1o_%288187571099%29.jpg&w=800"
              alt="Iglesia de Santa María de Caamaño, Porto do Son"
              className="h-56 w-full object-cover"
              loading="lazy"
            />
            <p className="bg-slate-100 px-4 py-2 text-xs text-slate-500">
              Iglesia de Santa María de Caamaño (siglo XII), Porto do Son, A
              Coruña. Foto: Wikimedia Commons, CC BY-SA.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-600">
                Etimología
              </p>
              <p className="text-sm text-slate-700">
                Del <strong>latín Camanius</strong>, raíz celta <em>cam-</em> =
                &quot;curvo&quot;. La doble &quot;a&quot; es evolución fonética
                gallega. Apellido <strong>toponímico</strong>.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-600">
                Primera mención
              </p>
              <p className="text-sm text-slate-700">
                <strong>453 d.C.</strong> — Un Caamaño, Gobernador de Galicia
                bajo los Suevos, preside un Concilio. <strong>589</strong> —
                Talasio y Pantardo Caamaño en el III Concilio de Toledo.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-600">
                Hitos fundacionales
              </p>
              <p className="text-sm text-slate-700">
                <strong>1129:</strong> Monasterio de Toxosoutos (Noia).{" "}
                <strong>1177:</strong> Castro Caamaño. <strong>1411:</strong>{" "}
                Pazo de Rubianes. <strong>1441:</strong> Villagarcía de Arousa.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 2. Distribution Spain */}
        <section>
          <h2 className="mb-2 font-serif text-2xl font-semibold text-slate-950">
            Distribución en España
          </h2>
          <p className="mb-6 text-slate-600">
            <strong>5,017 personas</strong> llevan el apellido en Galicia. La
            mayor concentración: comarcas costeras de <strong>Muros</strong>,{" "}
            <strong>Noia</strong> y <strong>A Coruña</strong> — exactamente
            donde se encuentra la parroquia ancestral.
          </p>
          <BarChart data={COMARCAS} />
          <p className="mt-3 text-right text-xs text-slate-400">
            Fuente: INE, Padrón Continuo ·{" "}
            <a
              href="https://www.ine.es/apellidos/formGeneralresult.do?vista=3&orig=ine&cmb3=99&cmb6=Caamano&L=0"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600"
            >
              Ver mapa en INE →
            </a>
          </p>
        </section>

        <SectionDivider />

        {/* 3. Worldwide */}
        <section>
          <h2 className="mb-2 font-serif text-2xl font-semibold text-slate-950">
            Distribución Mundial
          </h2>
          <p className="mb-6 text-slate-600">
            Presente en <strong>36+ países</strong>. El 67% vive en las
            Américas.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COUNTRIES.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <span className="text-2xl">{c.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {c.name}
                  </p>
                  <p className="text-xs text-slate-500">{c.note}</p>
                </div>
                <span className="shrink-0 font-serif text-lg font-bold text-slate-600">
                  {c.count}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-right text-xs text-slate-400">
            Fuente:{" "}
            <a
              href="https://forebears.io/surnames/caama%C3%B1o"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600"
            >
              Forebears.io →
            </a>
          </p>
        </section>

        <SectionDivider />

        {/* 4. Heraldry */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-slate-950">
            Heráldica
          </h2>
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex shrink-0 items-center justify-center">
              <div className="relative flex h-36 w-28 items-center justify-center overflow-hidden rounded-b-[50%] border-2 border-slate-400 bg-blue-700 shadow-lg">
                <div className="space-y-1.5">
                  <div className="h-1.5 w-16 rounded bg-gray-200" />
                  <div className="h-1.5 w-16 rounded bg-gray-200" />
                  <div className="h-1.5 w-16 rounded bg-gray-200" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-2 text-sm leading-relaxed text-slate-700">
                <strong>Escudo principal:</strong> En campo de{" "}
                <strong>azur</strong> (azul), tres <strong>barras</strong> de{" "}
                <strong>plata</strong>.
              </p>
              <p className="mb-2 text-sm leading-relaxed text-slate-700">
                <strong>Variante:</strong> Bordura de gules (rojo) con ocho
                sotueres de oro.
              </p>
              <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-xs italic text-slate-500">
                Los escudos pertenecen a líneas familiares específicas, no a
                todos los portadores del apellido. Fuente: García Carraffa,{" "}
                <em>Diccionario Heráldico y Genealógico</em>, Tomo XX.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 5. Colombian Lines */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-slate-950">
            Los Caamaño en Colombia
          </h2>
          <p className="mb-6 text-slate-600">
            Tres líneas documentadas de Caamaños llegaron a Colombia entre los
            siglos XVII y XIX.
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-200 border-l-4 border-l-emerald-500 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                1689 — Juana María Caamaño en Bogotá
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Casada con Francisco Prieto Pasarón. 5 hijos nacidos en Santa Fe
                de Bogotá entre 1689 y 1705. Primera presencia Caamaño
                documentada en Colombia.
              </p>
              <p className="mt-2 text-xs text-teal-600">
                📄 Fuente: Genealogías de Colombia (Fidel Botero Arango)
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 border-l-4 border-l-emerald-500 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                1744 — Bernardo Martínez y Perrúa → Antioquia
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Nacido en Villa de Muros (1720), línea directa de Juan de
                Caamaño. Llegó a Santa Fe de Antioquia en 1744. Murió en Bogotá
                (1788). 8 hijos. La línea Caamaño más antigua documentada
                emigrando a Colombia.
              </p>
              <p className="mt-2 text-xs text-teal-600">
                📄 Fuente: Genealogías de Colombia — 4 generaciones desde Muros
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 border-l-4 border-l-emerald-500 bg-white p-5">
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                ~1845 — José Tomás Caamaño → Colombia
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Nuestro patriarca. Nacido ~1815 en Santa María de Caamaño, Porto
                do Son. Casado con una mujer de apellido Soto. Emigró a Colombia
                con sus hermanos, que se dispersaron a Rep. Dominicana, Ecuador
                y Argentina.
              </p>
              <p className="mt-2 text-xs text-teal-600">
                📄 Fuente: Tradición oral familiar. Confirmado: José Caamaño
                Soto (1889) en listas de pasajeros a Uruguay — misma combinación
                de apellidos.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 6. Notables */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-slate-950">
            Caamaños Ilustres
          </h2>
          <div className="space-y-5">
            {NOTABLES.map((person) => (
              <div
                key={person.name}
                className={`rounded-xl border border-slate-200 bg-white ${person.accent} border-l-4 p-5`}
              >
                <div className="mb-2 flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg text-white ${person.badge}`}
                  >
                    {person.icon}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-slate-900">
                      {person.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {person.years} · {person.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  {person.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* 7. Migration Waves */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-slate-950">
            Olas Migratorias
          </h2>
          <div className="space-y-5">
            {MIGRATIONS.map((wave) => (
              <div
                key={wave.era}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <h3 className="mb-2 font-serif text-base font-bold text-slate-900">
                  {wave.era}
                </h3>
                <p className="mb-1 text-sm text-slate-700">
                  <strong>Causas:</strong> {wave.push}
                </p>
                <p className="mb-2 text-sm text-slate-700">
                  <strong>Destinos:</strong> {wave.destinations}
                </p>
                <p className="mb-2 text-sm leading-relaxed text-slate-600">
                  {wave.detail}
                </p>
                <p className="text-xs text-teal-600">📄 {wave.source}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 px-5 py-4 text-center">
            <p className="font-serif text-sm font-medium text-teal-800">
              &quot;Cuatro hermanos Caamaño cruzaron el Atlántico desde Galicia
              — uno a Colombia, otro a República Dominicana, otro a Ecuador,
              otro a Argentina.&quot;
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* 8. Research Sources */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-slate-950">
            Fuentes de Investigación
          </h2>
          <p className="mb-6 text-slate-600">
            Esta historia se construyó con datos de{" "}
            <strong>9 archivos y bases de datos</strong> en 4 países. Es un
            logro colectivo.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {RESEARCH_SOURCES.map((src) => (
              <div
                key={src.name}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{src.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {src.name}
                    </p>
                    <p className="text-xs text-teal-600">{src.count}</p>
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-500">{src.description}</p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* 9. Research Links */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-slate-950">
            Investiga tu Historia
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://www.familysearch.org/search/record/results?q.surname=CAAMANO&q.birthLikePlace=A+Coru%C3%B1a%2C+Spain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="text-lg">📖</span>
              FamilySearch — Registros parroquiales
            </a>
            <a
              href="https://pares.mcu.es/ParesBusquedas20/catalogo/search?texto=CAAMANO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="text-lg">📜</span>
              PARES — 602 documentos en archivos españoles
            </a>
            <a
              href="https://cemla.com/buscador/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="text-lg">🚢</span>
              CEMLA — 100 pasajeros a Buenos Aires
            </a>
            <a
              href="https://www.genealogiasdecolombia.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="text-lg">🇨🇴</span>
              Genealogías de Colombia — 583,000 individuos
            </a>
            <a
              href="https://www.ine.es/apellidos/formGeneralresult.do?vista=1&orig=ine&cmb6=CAAMANO&L=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="text-lg">📊</span>
              INE — Frecuencia del apellido en España
            </a>
            <a
              href="https://foros.xenealoxia.org/viewtopic.php?t=4415"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
            >
              <span className="text-lg">🏰</span>
              Xenealoxia.org — Historia de García Caamaño
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 mb-8 text-center">
          <div className="mx-auto h-0.5 w-16 rounded-full bg-slate-300" />
          <p className="mt-6 font-serif text-lg italic text-slate-500">
            &quot;Un apellido que ha fundado ciudades, gobernado naciones,
            inspirado poesía y cruzado océanos — desde las costas de Alaska
            hasta los palacios de Quito, desde las barricadas de Santo Domingo
            hasta las tierras de Colombia.&quot;
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Investigación: Luis Miguel Caamaño · Fuentes: FamilySearch, CEMLA,
            PARES, Genealogías de Colombia, INE, Geneanet, García Carraffa,
            Xenealoxia.org
          </p>
        </div>
      </div>
    </div>
  );
}
