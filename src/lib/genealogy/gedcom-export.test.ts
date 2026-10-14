import { describe, expect, it } from "vitest";
import { formatGedcomName, serializeGedcom, toGedcomDate } from "./gedcom-export";
import type { GenealogyData, Person } from "./types";

function person(p: Partial<Person> & Pick<Person, "id">): Person {
  return {
    firstName: "",
    lastName: "",
    gender: "unknown",
    events: [],
    migrations: [],
    ...p,
  };
}

const NOW = new Date(Date.UTC(2026, 9, 14));

const sample: GenealogyData = {
  meta: { lastUpdated: "2026-10-14", version: 39 },
  persons: [
    person({
      id: "p151",
      firstName: "Luis Miguel",
      lastName: "Caamaño Morales",
      gender: "male",
      birthDate: "1983-12",
      birthPlace: "Colombia",
      certainty: "circumstantial",
      certaintyReason: "Historia oral coherente",
      source: "modern",
    }),
    person({
      id: "p150",
      firstName: "Alejandra",
      lastName: "Peña",
      gender: "female",
      certainty: "proven",
    }),
    person({
      id: "p152",
      firstName: "Pablo",
      lastName: "Caamaño",
      gender: "male",
      birthDate: "~1815",
      deathDate: "<1890",
      certainty: "hypothetical",
      notes: "Línea uno\nLínea dos con @ arroba",
    }),
  ],
  families: [
    {
      id: "f1",
      parents: ["p150", "p151"],
      children: ["p152", "ghost"],
      marriageDate: "2010-06-05",
      marriagePlace: "Bogotá, Colombia",
    },
  ],
};

describe("toGedcomDate", () => {
  it("maps exact and partial ISO dates", () => {
    expect(toGedcomDate("1952-03-15")).toBe("15 MAR 1952");
    expect(toGedcomDate("1901-01-02")).toBe("2 JAN 1901");
    expect(toGedcomDate("1983-12")).toBe("DEC 1983");
    expect(toGedcomDate("1949")).toBe("1949");
  });

  it("maps approximate, before and after qualifiers", () => {
    expect(toGedcomDate("~1815")).toBe("ABT 1815");
    expect(toGedcomDate("c.1600")).toBe("ABT 1600");
    expect(toGedcomDate("circa 1700")).toBe("ABT 1700");
    expect(toGedcomDate("<1815")).toBe("BEF 1815");
    expect(toGedcomDate(">1815")).toBe("AFT 1815");
  });

  it("maps ranges to BET ... AND ...", () => {
    expect(toGedcomDate("1763-1780")).toBe("BET 1763 AND 1780");
    expect(toGedcomDate("1815/1820")).toBe("BET 1815 AND 1820");
    expect(toGedcomDate("1815-03..1816-01")).toBe("BET MAR 1815 AND JAN 1816");
  });

  it("falls back to a date phrase for free text and rejects invalid parts", () => {
    expect(toGedcomDate("siglo XIX")).toBe("(siglo XIX)");
    expect(toGedcomDate("s.XVIII-XIX")).toBe("(s.XVIII-XIX)");
    expect(toGedcomDate("1952-13-01")).toBe("(1952-13-01)");
    expect(toGedcomDate("")).toBeNull();
    expect(toGedcomDate(undefined)).toBeNull();
  });
});

describe("formatGedcomName", () => {
  it("wraps the surname in slashes", () => {
    expect(formatGedcomName("Luis Miguel", "Caamaño Morales")).toBe(
      "Luis Miguel /Caamaño Morales/",
    );
  });
  it("handles a missing surname and strips stray slashes", () => {
    expect(formatGedcomName("Felicia", "")).toBe("Felicia //");
    expect(formatGedcomName("Ana/María", "Soto")).toBe("Ana María /Soto/");
  });
});

describe("serializeGedcom", () => {
  const ged = serializeGedcom(sample, { now: NOW });
  const lines = ged.split("\r\n").filter(Boolean);

  it("writes a UTF-8 5.5.1 header and a trailer", () => {
    expect(lines[0]).toBe("0 HEAD");
    expect(ged).toContain("1 CHAR UTF-8");
    expect(ged).toContain("2 VERS 5.5.1");
    expect(ged).toContain("2 FORM LINEAGE-LINKED");
    expect(ged).toContain("1 DATE 14 OCT 2026");
    expect(lines.at(-1)).toBe("0 TRLR");
  });

  it("keeps ñ and accents intact", () => {
    expect(ged).toContain("1 NAME Luis Miguel /Caamaño Morales/");
    expect(ged).toContain("2 SURN Caamaño Morales");
    expect(ged).toContain("2 PLAC Bogotá, Colombia");
    const roundTrip = new TextDecoder("utf-8").decode(new TextEncoder().encode(ged));
    expect(roundTrip).toBe(ged);
  });

  it("every line matches level + optional xref + tag + optional value", () => {
    const re = /^(0|[1-9]\d?) (@[A-Za-z0-9_]+@ )?[A-Z_][A-Z0-9_]*( .*)?$/;
    for (const line of lines) {
      expect(line).toMatch(re);
      expect(Array.from(line).length).toBeLessThanOrEqual(255);
    }
  });

  it("links families both ways and skips dangling members", () => {
    expect(ged).toContain("0 @Ff1@ FAM");
    expect(ged).toContain("1 HUSB @Ip151@");
    expect(ged).toContain("1 WIFE @Ip150@");
    expect(ged).toContain("1 CHIL @Ip152@");
    expect(ged).not.toContain("ghost");
    expect(ged).toMatch(/0 @Ip151@ INDI[\s\S]*?1 FAMS @Ff1@/);
    expect(ged).toMatch(/0 @Ip152@ INDI[\s\S]*?1 FAMC @Ff1@/);
    expect(ged).toContain("1 MARR\r\n2 DATE 5 JUN 2010\r\n2 PLAC Bogotá, Colombia");
  });

  it("every pointer targets a defined record", () => {
    const defined = new Set(
      lines.map((l) => /^0 (@[^@]+@) /.exec(l)?.[1]).filter(Boolean),
    );
    const pointers = lines
      .map((l) => /^\d+ [A-Z_]+ (@[^@]+@)$/.exec(l)?.[1])
      .filter(Boolean);
    expect(pointers.length).toBeGreaterThan(0);
    for (const p of pointers) expect(defined.has(p)).toBe(true);
  });

  it("preserves certainty as NOTE and QUAY", () => {
    expect(ged).toContain(
      "1 NOTE Certeza documental: CIRCUMSTANTIAL (circunstancial). Motivo: Historia oral coherente",
    );
    expect(ged).toContain("1 NOTE Certeza documental: PROVEN (probado, documento primario)");
    expect(ged).toContain("1 NOTE Certeza documental: HYPOTHETICAL (hipotético)");
    expect(ged).toContain("1 SOUR Genealogía Caamaño, fuente del registro: modern\r\n2 QUAY 2");
  });

  it("maps approximate person dates and multi-line notes", () => {
    expect(ged).toContain("1 BIRT\r\n2 DATE ABT 1815");
    expect(ged).toContain("1 DEAT\r\n2 DATE BEF 1890");
    expect(ged).toContain("1 NOTE Línea uno\r\n2 CONT Línea dos con @@ arroba");
  });

  it("splits long text with CONC without losing characters", () => {
    const long = "ñ".repeat(450);
    const out = serializeGedcom(
      { ...sample, persons: [person({ id: "x1", notes: long })], families: [] },
      { now: NOW, lineEnding: "\n" },
    );
    const noteLines = out.split("\n").filter((l) => / (NOTE|CONC) /.test(l));
    expect(noteLines.length).toBe(3);
    const rebuilt = noteLines.map((l) => l.replace(/^\d+ (NOTE|CONC) /, "")).join("");
    expect(rebuilt).toBe(long);
  });
});
