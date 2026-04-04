/**
 * Historia del Apellido Caamaño — editorial-style research page.
 * All data is hardcoded from research across FamilySearch, INE, PARES, CEMLA, Forebears.
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
    note: "Concentrado en Galicia",
  },
  {
    name: "Colombia",
    flag: "🇨🇴",
    count: "1,504",
    note: "Costa Caribe, Barranquilla",
  },
  {
    name: "Rep. Dominicana",
    flag: "🇩🇴",
    count: "~800",
    note: "Legado revolucionario",
  },
  { name: "Ecuador", flag: "🇪🇨", count: "~600", note: "Legado presidencial" },
  { name: "Argentina", flag: "🇦🇷", count: "~500", note: "Inmigración gallega" },
  { name: "Estados Unidos", flag: "🇺🇸", count: "1,089", note: "NJ, FL, CA" },
];

const NOTABLES = [
  {
    name: "Jacinto Caamaño Moraleja",
    years: "1759–1829",
    role: "Explorador y navegante",
    accent: "border-l-blue-500",
    badge: "bg-blue-500",
    icon: "⚓",
    description:
      "Explorador naval español que lideró la última gran expedición española a Alaska y la costa de Columbia Británica (1792). Cartografió la costa desde la Bahía de Bucareli hasta Nootka. La Isla Camano (Washington, EE.UU.) y el Pasaje Caamaño (Columbia Británica) llevan su nombre. Se casó con la ecuatoriana Francisca de Arteta Santistevan y tuvo 8 hijos — su nieto se convirtió en Presidente de Ecuador.",
  },
  {
    name: "José María Plácido Caamaño",
    years: "1837–1900",
    role: "12° Presidente del Ecuador",
    accent: "border-l-teal-500",
    badge: "bg-slate-500",
    icon: "🏛️",
    description:
      "Nieto del navegante Jacinto Caamaño. Abogado, terrateniente y político guayaquileño. Presidente Constitucional de Ecuador de 1883 a 1888, período conocido como el inicio del 'Progresismo'. Su padre, José María Caamaño y Arteta, fue candidato presidencial en 1865. Murió exiliado en Sevilla, España, en la pobreza.",
  },
  {
    name: "Francisco Alberto Caamaño Deñó",
    years: "1932–1973",
    role: "Revolucionario dominicano",
    accent: "border-l-red-500",
    badge: "bg-red-500",
    icon: "✊",
    description:
      "Líder de la revuelta constitucionalista de 1965 en República Dominicana para restaurar al presidente electo Juan Bosch. Fue elegido Presidente Constitucional durante el conflicto. Estados Unidos invadió la RD en parte como respuesta a su movimiento. Hijo del General Fausto Caamaño Medina. Exiliado a Londres (1966), huyó a Cuba (1967). Regresó con un grupo guerrillero en febrero de 1973, fue capturado y ejecutado.",
  },
  {
    name: "Ángel Caamaño",
    years: "1861–1927",
    role: "Periodista y crítico teatral",
    accent: "border-l-purple-500",
    badge: "bg-purple-500",
    icon: "✒️",
    description:
      'Periodista español conocido como "El Barquero". Reconocido crítico teatral de su época en Madrid.',
  },
];

const MIGRATIONS = [
  {
    era: "Colonial",
    years: "1500s–1700s",
    push: "Hidalgos, clérigos y funcionarios coloniales",
    destinations: "Ecuador, Rep. Dominicana, Nueva Granada (Colombia)",
    detail:
      "Los primeros Caamaño cruzaron el Atlántico como parte de la administración colonial española. Jacinto Caamaño navegó entre México, Perú y Ecuador, casándose con una ecuatoriana.",
  },
  {
    era: "Siglo XIX",
    years: "1850–1900",
    push: "Pobreza gallega, crisis del minifundio, hambrunas",
    destinations: "Argentina (#1), Cuba (#2), Colombia vía Barranquilla",
    detail:
      "500,000 personas emigraron entre 1853 y 1900, principalmente de Galicia, Canarias y Cantabria. El puerto de A Coruña fue el principal punto de partida. Los hermanos a menudo se separaban — uno a Argentina, otro a Colombia, otro al Caribe.",
  },
  {
    era: "Siglo XX",
    years: "1900–1960",
    push: "Guerra Civil Española, dictadura de Franco, posguerra",
    destinations: "Argentina, Venezuela, Colombia, Rep. Dominicana",
    detail:
      "La segunda gran ola migratoria gallega. El CEMLA registra más de 4.4 millones de llegadas al puerto de Buenos Aires en este período. Exactamente el patrón de la familia Caamaño: cuatro hermanos, cuatro destinos en América.",
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
              className="h-6 rounded-r bg-gradient-to-r from-teal-400 to-teal-300 transition-all duration-500"
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
    <div className="min-h-screen" style={{ backgroundColor: "#fefce8" }}>
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Hero */}
        <header className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-slate-500">
            Historia y Genealogía
          </p>
          <h1 className="font-serif text-4xl font-bold text-slate-950 sm:text-5xl">
            El Apellido Caamaño
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-700">
            Desde las costas de Galicia hasta tres continentes — la historia de
            un linaje que ha dejado su marca en exploración, política y
            revolución.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-32 rounded-full bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
        </header>

        {/* 1. Etymology */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-slate-950">
            Origen y Etimología
          </h2>
          <p className="mb-4 leading-relaxed text-slate-800">
            <strong>Caamaño</strong> es un apellido de origen{" "}
            <strong>gallego</strong> — no castellano — con raíces que se
            remontan al menos al siglo V. La primera mención documentada es un{" "}
            <em>Camaño</em>, gobernador de Galicia que presidió su Concilio en
            el año <strong>453 d.C.</strong> durante el Reino Suevo.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-300 bg-white/60 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Teoría 1
              </p>
              <p className="text-sm text-slate-800">
                Del <strong>latín Camanius</strong>, con raíz celta{" "}
                <em>cam-</em> = &quot;curvo, torcido&quot;. Común en toponimia
                gallega. La doble &quot;a&quot; refleja evolución fonética
                gallega.
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-white/60 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Teoría 2
              </p>
              <p className="text-sm text-slate-800">
                <strong>&quot;Ca&quot;</strong> (conjunción antigua =
                &quot;porque&quot;) + <strong>&quot;amanar&quot;</strong> (forma
                dialectal gallega de &quot;maña&quot; = destreza, habilidad).
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-white/60 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Teoría 3
              </p>
              <p className="text-sm text-slate-800">
                Del latín <strong>&quot;campus magnus&quot;</strong> =
                &quot;campo grande&quot;. Clasificación: apellido{" "}
                <strong>toponímico</strong> (derivado de un lugar).
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            Origen geográfico: <strong>Tierra de Betanzos</strong>, Ría de
            Betanzos, valle del río Mandeo, provincia de A Coruña, Galicia.
            Solar ancestral: <strong>Torre de Caamaño</strong>.
          </p>
        </section>

        <SectionDivider />

        {/* 2. Distribution in Spain */}
        <section>
          <h2 className="mb-2 font-serif text-2xl font-semibold text-slate-950">
            Distribución en España
          </h2>
          <p className="mb-6 text-slate-700">
            <strong>5,017 personas</strong> llevan el apellido Caamaño en
            Galicia. La mayor concentración está en las comarcas costeras de A
            Coruña.
          </p>
          <BarChart data={COMARCAS} />
          <p className="mt-3 text-right text-xs text-slate-500">
            Fuente: INE, Padrón Continuo •{" "}
            <a
              href="https://www.ine.es/apellidos/formGeneralresult.do?vista=3&orig=ine&cmb3=99&cmb6=Caamano&L=0"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-700"
            >
              Ver mapa en INE →
            </a>
          </p>
        </section>

        <SectionDivider />

        {/* 3. Worldwide Distribution */}
        <section>
          <h2 className="mb-2 font-serif text-2xl font-semibold text-slate-950">
            Distribución Mundial
          </h2>
          <p className="mb-6 text-slate-700">
            Presente en <strong>36+ países</strong>. El 67% de los Caamaño del
            mundo viven en las Américas.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COUNTRIES.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white/60 px-4 py-3"
              >
                <span className="text-2xl">{c.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-950">
                    {c.name}
                  </p>
                  <p className="text-xs text-slate-600">{c.note}</p>
                </div>
                <span className="shrink-0 font-serif text-lg font-bold text-slate-700">
                  {c.count}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-right text-xs text-slate-500">
            Fuente:{" "}
            <a
              href="https://forebears.io/surnames/caama%C3%B1o"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-700"
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
            {/* Simple CSS shield */}
            <div className="flex shrink-0 items-center justify-center">
              <div className="relative flex h-36 w-28 items-center justify-center overflow-hidden rounded-b-[50%] border-2 border-teal-500 bg-blue-700">
                <div className="space-y-1.5">
                  <div className="h-1.5 w-16 rounded bg-gray-200" />
                  <div className="h-1.5 w-16 rounded bg-gray-200" />
                  <div className="h-1.5 w-16 rounded bg-gray-200" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-2 text-sm leading-relaxed text-slate-800">
                <strong>Escudo principal:</strong> En campo de{" "}
                <strong>azur</strong> (azul), tres <strong>barras</strong> de{" "}
                <strong>plata</strong> (blanco/plateado).
              </p>
              <p className="mb-2 text-sm leading-relaxed text-slate-800">
                <strong>Variante 1:</strong> Bordura de gules (rojo) con ocho
                sotueres de oro.
              </p>
              <p className="mb-2 text-sm leading-relaxed text-slate-800">
                <strong>Variante 2:</strong> En campo de oro, un brazo alado
                vestido de sinople (verde), moviente del flanco siniestro, con
                las alas de plata y sosteniendo en la mano una corona de azur.
              </p>
              <p className="mt-3 rounded-lg bg-slate-100/60 px-3 py-2 text-xs italic text-slate-600">
                Nota: Los escudos de armas pertenecen a líneas familiares
                específicas, no a todos los portadores del apellido. Fuente:
                García Carraffa, <em>Diccionario Heráldico y Genealógico</em>.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 5. Notable Caamaños */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-slate-950">
            Caamaños Ilustres
          </h2>
          <div className="space-y-6">
            {NOTABLES.map((person) => (
              <div
                key={person.name}
                className={`rounded-xl border border-slate-300 bg-white/60 ${person.accent} border-l-4 p-5`}
              >
                <div className="mb-2 flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg text-white ${person.badge}`}
                  >
                    {person.icon}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-slate-950">
                      {person.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {person.years} · {person.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-800">
                  {person.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* 6. Migration Waves */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-slate-950">
            Olas Migratorias
          </h2>
          <div className="space-y-5">
            {MIGRATIONS.map((wave) => (
              <div
                key={wave.era}
                className="rounded-xl border border-slate-300 bg-white/60 p-5"
              >
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="rounded-full bg-slate-200 px-3 py-0.5 text-xs font-bold text-slate-800">
                    {wave.era}
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    {wave.years}
                  </span>
                </div>
                <p className="mb-1 text-sm text-slate-800">
                  <strong>Causas:</strong> {wave.push}
                </p>
                <p className="mb-2 text-sm text-slate-800">
                  <strong>Destinos:</strong> {wave.destinations}
                </p>
                <p className="text-sm italic text-slate-600">{wave.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/50 px-5 py-4 text-center">
            <p className="font-serif text-sm font-medium text-teal-800">
              &quot;Cuatro hermanos Caamaño cruzaron el Atlántico desde Galicia
              — uno a Colombia, otro a República Dominicana, otro a Ecuador,
              otro a Argentina. Exactamente el patrón documentado por los
              historiadores de la emigración gallega.&quot;
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* 7. Research Links */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-semibold text-slate-950">
            Investiga tu Historia
          </h2>
          <p className="mb-6 text-slate-700">
            Explora estos archivos y bases de datos para descubrir más sobre tus
            antepasados Caamaño.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://www.familysearch.org/search/record/results?q.surname=CAAMANO&q.birthLikePlace=A+Coru%C3%B1a%2C+Spain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/50 px-4 py-3 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-100"
            >
              <span className="text-lg">📖</span>
              FamilySearch — Registros parroquiales
            </a>
            <a
              href="https://www.ine.es/apellidos/formGeneralresult.do?vista=1&orig=ine&cmb6=CAAMANO&L=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              <span className="text-lg">📊</span>
              INE — Frecuencia del apellido
            </a>
            <a
              href="https://pares.mcu.es/ParesBusquedas20/catalogo/search?texto=CAAMANO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/50 px-4 py-3 text-sm font-medium text-red-800 transition-colors hover:bg-red-100"
            >
              <span className="text-lg">📜</span>
              PARES — Archivos Españoles
            </a>
            <a
              href="https://cemla.com/buscador/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50/50 px-4 py-3 text-sm font-medium text-green-800 transition-colors hover:bg-green-100"
            >
              <span className="text-lg">🚢</span>
              CEMLA — Pasajeros a Buenos Aires
            </a>
          </div>
        </section>

        {/* Footer quote */}
        <div className="mt-16 mb-8 text-center">
          <div className="mx-auto h-0.5 w-16 rounded-full bg-slate-300" />
          <p className="mt-6 font-serif text-lg italic text-slate-600">
            &quot;Un apellido que ha dejado su marca en tres continentes — desde
            las costas de Alaska hasta los palacios de Quito, desde las
            barricadas de Santo Domingo hasta las tierras de Colombia.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
