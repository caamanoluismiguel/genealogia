/**
 * Core genealogy data model.
 * All person and family types for the Caamano family tree.
 */

/** Gender options */
export type Gender = "male" | "female" | "other" | "unknown";

/** Data source for each person record */
export type PersonSource =
  | "modern"
  | "historical"
  | "familysearch"
  | "cemla"
  | "geneanet"
  | "genco"
  | "ellisisland"
  | "uruguay"
  | "pares"
  | "galiciana"
  | "gap";

/** Life event types */
export type EventType =
  | "birth"
  | "death"
  | "marriage"
  | "divorce"
  | "immigration"
  | "emigration"
  | "baptism"
  | "graduation"
  | "custom";

/** A life event with optional location and date */
export interface LifeEvent {
  type: EventType;
  date?: string; // ISO 8601 partial date (e.g. "1952", "1952-03", "1952-03-15")
  place?: string;
  description?: string;
}

/** Geographic location for migration tracking */
export interface GeoLocation {
  lat: number;
  lng: number;
  label: string; // e.g. "Lugo, Galicia, Spain"
}

/** Migration record for the map view */
export interface Migration {
  from: GeoLocation;
  to: GeoLocation;
  year?: number;
  reason?: string;
}

/** A single person in the family tree */
export interface Person {
  id: string;
  source?: PersonSource;
  firstName: string;
  lastName: string;
  maidenName?: string;
  gender: Gender;
  birthDate?: string;
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  photoUrl?: string;
  notes?: string;
  events: LifeEvent[];
  migrations: Migration[];
}

/** A family unit (couple + children) */
export interface Family {
  id: string;
  /** Parent IDs (1 or 2) */
  parents: string[];
  /** Child IDs */
  children: string[];
  marriageDate?: string;
  marriagePlace?: string;
  divorceDate?: string;
}

/** Top-level data structure stored in caamano-family.json */
export interface GenealogyData {
  persons: Person[];
  families: Family[];
  meta: {
    lastUpdated: string;
    version: number;
  };
}

/** Adjacency index for fast traversal */
export interface PersonIndex {
  /** personId -> Person */
  persons: Map<string, Person>;
  /** personId -> familyIds where person is a parent */
  parentOf: Map<string, string[]>;
  /** personId -> familyId where person is a child */
  childIn: Map<string, string>;
  /** familyId -> Family */
  families: Map<string, Family>;
}

/** Kinship relationship result */
export interface KinshipResult {
  from: string;
  to: string;
  path: string[];
  label: string; // e.g. "primo segundo" / "second cousin"
  generationsUp: number;
  generationsDown: number;
}

/** Tree layout node position (computed by layout engine) */
export interface LayoutNode {
  personId: string;
  x: number;
  y: number;
  generation: number;
}

/** Tree layout edge */
export interface LayoutEdge {
  fromId: string;
  toId: string;
  type: "parent-child" | "spouse";
}

/** Complete layout for rendering */
export interface TreeLayout {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  width: number;
  height: number;
}
