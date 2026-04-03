/**
 * Spanish and English kinship term lookup tables.
 * Maps (generationsUp, generationsDown) to human-readable labels.
 */

export type Locale = "es" | "en";
export type LabelStyle = "formal" | "colloquial";

type GenderKey = "male" | "female" | "unknown";

interface LabelEntry {
  es: Record<GenderKey, { formal: string; colloquial: string }>;
  en: Record<GenderKey, { formal: string; colloquial: string }>;
}

/** Direct-line and close collateral lookup table */
const KINSHIP_TABLE: Record<string, LabelEntry> = {
  "1,0": {
    es: {
      male: { formal: "hijo", colloquial: "hijo" },
      female: { formal: "hija", colloquial: "hija" },
      unknown: { formal: "hijo/a", colloquial: "hijo/a" },
    },
    en: {
      male: { formal: "son", colloquial: "son" },
      female: { formal: "daughter", colloquial: "daughter" },
      unknown: { formal: "child", colloquial: "child" },
    },
  },
  "0,1": {
    es: {
      male: { formal: "padre", colloquial: "papá" },
      female: { formal: "madre", colloquial: "mamá" },
      unknown: { formal: "padre/madre", colloquial: "padre/madre" },
    },
    en: {
      male: { formal: "father", colloquial: "dad" },
      female: { formal: "mother", colloquial: "mom" },
      unknown: { formal: "parent", colloquial: "parent" },
    },
  },
  "2,0": {
    es: {
      male: { formal: "nieto", colloquial: "nieto" },
      female: { formal: "nieta", colloquial: "nieta" },
      unknown: { formal: "nieto/a", colloquial: "nieto/a" },
    },
    en: {
      male: { formal: "grandson", colloquial: "grandson" },
      female: { formal: "granddaughter", colloquial: "granddaughter" },
      unknown: { formal: "grandchild", colloquial: "grandchild" },
    },
  },
  "0,2": {
    es: {
      male: { formal: "abuelo", colloquial: "abuelo" },
      female: { formal: "abuela", colloquial: "abuela" },
      unknown: { formal: "abuelo/a", colloquial: "abuelo/a" },
    },
    en: {
      male: { formal: "grandfather", colloquial: "grandpa" },
      female: { formal: "grandmother", colloquial: "grandma" },
      unknown: { formal: "grandparent", colloquial: "grandparent" },
    },
  },
  "3,0": {
    es: {
      male: { formal: "bisnieto", colloquial: "bisnieto" },
      female: { formal: "bisnieta", colloquial: "bisnieta" },
      unknown: { formal: "bisnieto/a", colloquial: "bisnieto/a" },
    },
    en: {
      male: { formal: "great-grandson", colloquial: "great-grandson" },
      female: {
        formal: "great-granddaughter",
        colloquial: "great-granddaughter",
      },
      unknown: { formal: "great-grandchild", colloquial: "great-grandchild" },
    },
  },
  "0,3": {
    es: {
      male: { formal: "bisabuelo", colloquial: "bisabuelo" },
      female: { formal: "bisabuela", colloquial: "bisabuela" },
      unknown: { formal: "bisabuelo/a", colloquial: "bisabuelo/a" },
    },
    en: {
      male: { formal: "great-grandfather", colloquial: "great-grandpa" },
      female: { formal: "great-grandmother", colloquial: "great-grandma" },
      unknown: { formal: "great-grandparent", colloquial: "great-grandparent" },
    },
  },
  "4,0": {
    es: {
      male: { formal: "tataranieto", colloquial: "tataranieto" },
      female: { formal: "tataranieta", colloquial: "tataranieta" },
      unknown: { formal: "tataranieto/a", colloquial: "tataranieto/a" },
    },
    en: {
      male: {
        formal: "great-great-grandson",
        colloquial: "great-great-grandson",
      },
      female: {
        formal: "great-great-granddaughter",
        colloquial: "great-great-granddaughter",
      },
      unknown: {
        formal: "great-great-grandchild",
        colloquial: "great-great-grandchild",
      },
    },
  },
  "0,4": {
    es: {
      male: { formal: "tatarabuelo", colloquial: "tatarabuelo" },
      female: { formal: "tatarabuela", colloquial: "tatarabuela" },
      unknown: { formal: "tatarabuelo/a", colloquial: "tatarabuelo/a" },
    },
    en: {
      male: {
        formal: "great-great-grandfather",
        colloquial: "great-great-grandpa",
      },
      female: {
        formal: "great-great-grandmother",
        colloquial: "great-great-grandma",
      },
      unknown: {
        formal: "great-great-grandparent",
        colloquial: "great-great-grandparent",
      },
    },
  },
  "0,5": {
    es: {
      male: { formal: "trastatarabuelo", colloquial: "trastatarabuelo" },
      female: { formal: "trastatarabuela", colloquial: "trastatarabuela" },
      unknown: { formal: "trastatarabuelo/a", colloquial: "trastatarabuelo/a" },
    },
    en: {
      male: {
        formal: "3rd great-grandfather",
        colloquial: "3rd great-grandpa",
      },
      female: {
        formal: "3rd great-grandmother",
        colloquial: "3rd great-grandma",
      },
      unknown: {
        formal: "3rd great-grandparent",
        colloquial: "3rd great-grandparent",
      },
    },
  },
  "1,1": {
    es: {
      male: { formal: "hermano", colloquial: "hermano" },
      female: { formal: "hermana", colloquial: "hermana" },
      unknown: { formal: "hermano/a", colloquial: "hermano/a" },
    },
    en: {
      male: { formal: "brother", colloquial: "brother" },
      female: { formal: "sister", colloquial: "sister" },
      unknown: { formal: "sibling", colloquial: "sibling" },
    },
  },
  "2,1": {
    es: {
      male: { formal: "sobrino", colloquial: "sobrino" },
      female: { formal: "sobrina", colloquial: "sobrina" },
      unknown: { formal: "sobrino/a", colloquial: "sobrino/a" },
    },
    en: {
      male: { formal: "nephew", colloquial: "nephew" },
      female: { formal: "niece", colloquial: "niece" },
      unknown: { formal: "nephew/niece", colloquial: "nephew/niece" },
    },
  },
  "1,2": {
    es: {
      male: { formal: "tío", colloquial: "tío" },
      female: { formal: "tía", colloquial: "tía" },
      unknown: { formal: "tío/a", colloquial: "tío/a" },
    },
    en: {
      male: { formal: "uncle", colloquial: "uncle" },
      female: { formal: "aunt", colloquial: "aunt" },
      unknown: { formal: "uncle/aunt", colloquial: "uncle/aunt" },
    },
  },
  "2,2": {
    es: {
      male: { formal: "primo hermano", colloquial: "primo" },
      female: { formal: "prima hermana", colloquial: "prima" },
      unknown: { formal: "primo/a hermano/a", colloquial: "primo/a" },
    },
    en: {
      male: { formal: "first cousin", colloquial: "first cousin" },
      female: { formal: "first cousin", colloquial: "first cousin" },
      unknown: { formal: "first cousin", colloquial: "first cousin" },
    },
  },
  "3,2": {
    es: {
      male: { formal: "sobrino segundo", colloquial: "sobrino segundo" },
      female: { formal: "sobrina segunda", colloquial: "sobrina segunda" },
      unknown: {
        formal: "sobrino/a segundo/a",
        colloquial: "sobrino/a segundo/a",
      },
    },
    en: {
      male: {
        formal: "first cousin once removed",
        colloquial: "first cousin once removed",
      },
      female: {
        formal: "first cousin once removed",
        colloquial: "first cousin once removed",
      },
      unknown: {
        formal: "first cousin once removed",
        colloquial: "first cousin once removed",
      },
    },
  },
  "2,3": {
    es: {
      male: { formal: "tío segundo", colloquial: "tío segundo" },
      female: { formal: "tía segunda", colloquial: "tía segunda" },
      unknown: { formal: "tío/a segundo/a", colloquial: "tío/a segundo/a" },
    },
    en: {
      male: {
        formal: "first cousin once removed",
        colloquial: "first cousin once removed",
      },
      female: {
        formal: "first cousin once removed",
        colloquial: "first cousin once removed",
      },
      unknown: {
        formal: "first cousin once removed",
        colloquial: "first cousin once removed",
      },
    },
  },
  "3,3": {
    es: {
      male: { formal: "primo segundo", colloquial: "primo segundo" },
      female: { formal: "prima segunda", colloquial: "prima segunda" },
      unknown: { formal: "primo/a segundo/a", colloquial: "primo/a segundo/a" },
    },
    en: {
      male: { formal: "second cousin", colloquial: "second cousin" },
      female: { formal: "second cousin", colloquial: "second cousin" },
      unknown: { formal: "second cousin", colloquial: "second cousin" },
    },
  },
};

/**
 * Generate labels for high direct-line generations (> 5).
 */
function getHighDirectLine(
  gen: number,
  descending: boolean,
  gender: GenderKey,
  locale: Locale,
): string {
  const n = gen - 2; // e.g. gen=6 -> "4o abuelo"
  if (locale === "es") {
    if (descending) {
      // N-gen descendant
      const suffix = gender === "female" ? "a" : "o";
      return `${n}º niet${suffix}`;
    }
    const suffix = gender === "female" ? "a" : "o";
    return `${n}º abuel${suffix}`;
  }
  // English
  const ordinal = getOrdinal(n);
  if (descending) {
    const base =
      gender === "female"
        ? "granddaughter"
        : gender === "male"
          ? "grandson"
          : "grandchild";
    return `${ordinal} great-${base}`;
  }
  const base =
    gender === "female"
      ? "grandmother"
      : gender === "male"
        ? "grandfather"
        : "grandparent";
  return `${ordinal} great-${base}`;
}

function getOrdinal(n: number): string {
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  return `${n}${suffixes[mod10] ?? "th"}`;
}

/**
 * Cousin degree word: "primo", "primo segundo", "prima tercera", etc.
 */
function getCousinWord(
  degree: number,
  gender: GenderKey,
  locale: Locale,
): string {
  if (locale === "es") {
    const suffix = gender === "female" ? "a" : "o";
    if (degree === 1) return `prim${suffix}`;
    const ordSuffix = gender === "female" ? "a" : "o";
    const ordinals: Record<number, string> = {
      2: "segund",
      3: "tercer",
      4: "cuart",
      5: "quint",
      6: "sext",
    };
    const base = ordinals[degree];
    if (base) return `prim${suffix} ${base}${ordSuffix}`;
    return `prim${suffix} ${degree}º`;
  }
  return `${getOrdinal(degree)} cousin`;
}

/**
 * Descendant word: hijo, nieto, bisnieto, etc.
 */
function getDescendantWord(
  generations: number,
  gender: GenderKey,
  locale: Locale,
): string {
  if (locale === "es") {
    const s = gender === "female" ? "a" : "o";
    if (generations === 1) return `hij${s}`;
    if (generations === 2) return `niet${s}`;
    if (generations === 3) return `bisniet${s}`;
    if (generations === 4) return `tataraniet${s}`;
    return `${generations - 2}º niet${s}`;
  }
  const base =
    gender === "female" ? "daughter" : gender === "male" ? "son" : "child";
  if (generations === 1) return base;
  const grandBase =
    gender === "female"
      ? "granddaughter"
      : gender === "male"
        ? "grandson"
        : "grandchild";
  if (generations === 2) return grandBase;
  return "great-".repeat(generations - 2) + grandBase;
}

/**
 * Ancestor word: padre, abuelo, bisabuelo, etc.
 * Always masculine (generic intermediate ancestor).
 */
function getAncestorWord(generations: number, locale: Locale): string {
  if (locale === "es") {
    if (generations === 1) return "padre";
    if (generations === 2) return "abuelo";
    if (generations === 3) return "bisabuelo";
    if (generations === 4) return "tatarabuelo";
    return `${generations - 2}º abuelo`;
  }
  if (generations === 1) return "parent";
  if (generations === 2) return "grandparent";
  return "great-".repeat(generations - 2) + "grandparent";
}

/**
 * Generate labels for general collateral relationships.
 * (N,M) where both > 0 and not in the lookup table.
 *
 * Colloquial mode produces plain-language descriptions:
 *   "primo 1º, 2 veces removido" → "nieto de tu primo" or "primo de tu abuelo"
 */
function getGeneralCollateral(
  genA: number,
  genB: number,
  gender: GenderKey,
  locale: Locale,
  style: LabelStyle = "formal",
): string {
  const minGen = Math.min(genA, genB);
  const cousinDegree = minGen - 1;
  const removal = Math.abs(genA - genB);

  // Colloquial: describe as a chain of familiar words
  if (style === "colloquial" && removal > 0) {
    if (genA > genB) {
      // Person A is below you → "nieto de tu primo" / "your cousin's grandchild"
      const descWord = getDescendantWord(removal, gender, locale);
      const cousinBase = getCousinWord(cousinDegree, "unknown", locale);
      return locale === "es"
        ? `${descWord} de tu ${cousinBase}`
        : `your ${cousinBase}'s ${descWord}`;
    }
    // Person A is above you → "primo de tu abuelo" / "your grandparent's cousin"
    const cousinWord = getCousinWord(cousinDegree, gender, locale);
    const ancWord = getAncestorWord(removal, locale);
    return locale === "es"
      ? `${cousinWord} de tu ${ancWord}`
      : `your ${ancWord}'s ${cousinWord}`;
  }

  // Formal (original logic)
  if (locale === "es") {
    const suffix = gender === "female" ? "a" : "o";
    if (removal === 0) {
      return `prim${suffix} ${cousinDegree}º`;
    }
    const vezWord = removal === 1 ? "vez" : "veces";
    return `prim${suffix} ${cousinDegree}º, ${removal} ${vezWord} removid${suffix}`;
  }

  // English formal
  const ordinal = getOrdinal(cousinDegree);
  if (removal === 0) {
    return `${ordinal} cousin`;
  }
  const removalWord =
    removal === 1 ? "once" : removal === 2 ? "twice" : `${removal} times`;
  return `${ordinal} cousin ${removalWord} removed`;
}

/**
 * Returns the kinship label for the given generational distances.
 * genA = generations from person A up to LCA
 * genB = generations from person B up to LCA
 */
export function getKinshipLabel(
  generationsUp: number,
  generationsDown: number,
  gender: GenderKey,
  locale: Locale,
  style: LabelStyle = "formal",
): string {
  // Check lookup table first
  const key = `${generationsUp},${generationsDown}`;
  const entry = KINSHIP_TABLE[key];
  if (entry) {
    return entry[locale][gender][style];
  }

  // Direct line (one side is 0) beyond the table
  if (generationsDown === 0 && generationsUp > 5) {
    return getHighDirectLine(generationsUp, true, gender, locale);
  }
  if (generationsUp === 0 && generationsDown > 5) {
    return getHighDirectLine(generationsDown, false, gender, locale);
  }

  // High direct line for descendants (5,0)
  if (generationsDown === 0 && generationsUp === 5) {
    return getHighDirectLine(generationsUp, true, gender, locale);
  }
  if (generationsUp === 0 && generationsDown === 5) {
    // Already handled by 0,5 in table... but handle missing
    return getHighDirectLine(generationsDown, false, gender, locale);
  }

  // General collateral
  if (generationsUp > 0 && generationsDown > 0) {
    return getGeneralCollateral(
      generationsUp,
      generationsDown,
      gender,
      locale,
      style,
    );
  }

  return locale === "es" ? "parentesco desconocido" : "unknown relationship";
}
