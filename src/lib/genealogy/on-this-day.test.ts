import { describe, expect, it } from "vitest";
import { daysUntilNext, getOnThisDay, parseFullDate } from "./on-this-day";
import type { Family, Person } from "./types";

function person(id: string, extra: Partial<Person> = {}): Person {
  return {
    id,
    firstName: id,
    lastName: "Caamaño",
    gender: "unknown",
    events: [],
    migrations: [],
    ...extra,
  };
}

const TODAY = { year: 2026, month: 10, day: 14 };

describe("parseFullDate", () => {
  it("accepts only complete, valid YYYY-MM-DD dates", () => {
    expect(parseFullDate("1901-01-02")).toEqual({ year: 1901, month: 1, day: 2 });
    expect(parseFullDate("1983-12")).toBeNull();
    expect(parseFullDate("1815")).toBeNull();
    expect(parseFullDate("~1815-10-14")).toBeNull();
    expect(parseFullDate("1901-02-30")).toBeNull();
    expect(parseFullDate("1900-02-29")).toBeNull();
    expect(parseFullDate("2000-02-29")).toEqual({ year: 2000, month: 2, day: 29 });
  });
});

describe("daysUntilNext", () => {
  it("counts forward and wraps to next year", () => {
    expect(daysUntilNext(TODAY, 10, 14)).toEqual({ days: 0, year: 2026 });
    expect(daysUntilNext(TODAY, 10, 15)).toEqual({ days: 1, year: 2026 });
    expect(daysUntilNext(TODAY, 10, 13)).toEqual({ days: 364, year: 2027 });
    expect(daysUntilNext({ year: 2026, month: 12, day: 31 }, 1, 1)).toEqual({
      days: 1,
      year: 2027,
    });
  });

  it("moves Feb 29 to Feb 28 in common years", () => {
    expect(daysUntilNext({ year: 2027, month: 2, day: 28 }, 2, 29)).toEqual({
      days: 0,
      year: 2027,
    });
    expect(daysUntilNext({ year: 2028, month: 2, day: 28 }, 2, 29)).toEqual({
      days: 1,
      year: 2028,
    });
  });
});

describe("getOnThisDay", () => {
  it("returns today's births, deaths and marriages with years elapsed", () => {
    const persons = [
      person("a", { birthDate: "1901-10-14" }),
      person("b", { deathDate: "1883-10-14" }),
      person("c", { birthDate: "1950-10" }), // no day, never matches
      person("d", { birthDate: "~1815" }),
    ];
    const families: Family[] = [
      { id: "f1", parents: ["a", "b"], children: [], marriageDate: "1920-10-14" },
    ];
    const r = getOnThisDay({ persons, families }, TODAY);
    expect(r.mode).toBe("today");
    expect(r.items.map((i) => i.kind)).toEqual(["birth", "marriage", "death"]);
    expect(r.items[0]).toMatchObject({ personIds: ["a"], yearsAgo: 125, daysUntil: 0 });
    expect(r.items[1].personIds).toEqual(["a", "b"]);
  });

  it("falls back to the next 30 days, sorted by proximity", () => {
    const persons = [
      person("a", { birthDate: "1798-11-04" }), // 21 days
      person("b", { deathDate: "1900-10-20" }), // 6 days
      person("c", { birthDate: "1900-12-25" }), // 72 days, outside
    ];
    const r = getOnThisDay({ persons, families: [] }, TODAY);
    expect(r.mode).toBe("upcoming");
    expect(r.items.map((i) => [i.personIds[0], i.daysUntil])).toEqual([
      ["b", 6],
      ["a", 21],
    ]);
    expect(r.items[1].yearsAgo).toBe(228);
  });

  it("shows the nearest date when nothing falls inside the window", () => {
    const persons = [
      person("a", { birthDate: "1900-12-25" }),
      person("b", { birthDate: "1950-12-25" }),
      person("c", { birthDate: "1900-03-01" }),
    ];
    const r = getOnThisDay({ persons, families: [] }, TODAY);
    expect(r.mode).toBe("next");
    expect(r.items.map((i) => i.personIds[0])).toEqual(["a", "b"]);
    expect(r.items[0].daysUntil).toBe(72);
  });

  it("ignores future dates and reports none when nothing has a full date", () => {
    const persons = [
      person("a", { birthDate: "2030-10-14" }),
      person("b", { birthDate: "1950" }),
    ];
    expect(getOnThisDay({ persons, families: [] }, TODAY)).toEqual({
      mode: "none",
      items: [],
    });
  });

  it("drops unknown spouses from marriage anniversaries", () => {
    const families: Family[] = [
      { id: "f1", parents: ["a", "ghost"], children: [], marriageDate: "1930-10-14" },
    ];
    const r = getOnThisDay({ persons: [person("a")], families }, TODAY);
    expect(r.items[0].personIds).toEqual(["a"]);
  });
});
