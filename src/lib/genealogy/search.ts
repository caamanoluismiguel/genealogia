/**
 * Fuzzy name search across the person dataset.
 * Used by tree-search autocomplete.
 */
import type { Person } from "./types";

/** Search result with relevance score */
export interface SearchResult {
  person: Person;
  score: number;
}

/**
 * Normalize a string for accent-insensitive, case-insensitive comparison.
 */
function normalize(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Get all searchable name parts for a person.
 */
function getSearchableText(person: Person): string {
  const parts = [person.firstName, person.lastName];
  if (person.maidenName) parts.push(person.maidenName);
  return normalize(parts.join(" "));
}

/**
 * Score a person against a normalized query.
 * Higher score = better match.
 * Returns 0 if no match.
 */
function scorePerson(person: Person, normalizedQuery: string): number {
  const fullText = getSearchableText(person);
  const firstName = normalize(person.firstName);
  const lastName = normalize(person.lastName);
  const maidenName = person.maidenName ? normalize(person.maidenName) : "";

  // Exact full match
  if (fullText === normalizedQuery) return 100;

  // Exact match on individual fields
  if (
    firstName === normalizedQuery ||
    lastName === normalizedQuery ||
    maidenName === normalizedQuery
  ) {
    return 90;
  }

  // Starts with on any field
  if (
    firstName.startsWith(normalizedQuery) ||
    lastName.startsWith(normalizedQuery) ||
    maidenName.startsWith(normalizedQuery)
  ) {
    return 70;
  }

  // Full text starts with
  if (fullText.startsWith(normalizedQuery)) return 60;

  // Contains in any field
  if (fullText.includes(normalizedQuery)) return 40;

  // Multi-word query: check if all words are present
  const queryWords = normalizedQuery.split(/\s+/);
  if (queryWords.length > 1) {
    const allPresent = queryWords.every((word) => fullText.includes(word));
    if (allPresent) return 30;
  }

  return 0;
}

/**
 * Search persons by name (fuzzy match).
 * Returns results sorted by relevance, limited to `limit` results.
 */
export function searchPersons(
  query: string,
  persons: Person[],
  limit: number = 10,
): SearchResult[] {
  if (!query.trim()) return [];

  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const results: SearchResult[] = [];

  for (const person of persons) {
    const score = scorePerson(person, normalizedQuery);
    if (score > 0) {
      results.push({ person, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
