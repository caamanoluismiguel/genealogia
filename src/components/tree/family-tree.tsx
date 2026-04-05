/**
 * Main SVG tree container with pan/zoom support.
 * Orchestrates person nodes, connector lines, kinship path, controls, and sidebar.
 * Integrates "Yo soy" identity system for personalized relationship viewing.
 */
"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { useGenealogy } from "@/hooks/use-genealogy";
import { useTreeZoom } from "@/hooks/use-tree-zoom";
import { useKinship } from "@/hooks/use-kinship";
import { useTreeStore } from "@/stores/tree-store";
import { computeTreeLayout } from "@/lib/genealogy/layout";
import { buildSlugMap } from "@/lib/genealogy/slugs";
import { PersonNode } from "./person-node";
import { FamilyLink } from "./family-link";
import { RelationshipPath } from "./relationship-path";
import { TreeControls } from "./tree-controls";
import { TreeSearch } from "./tree-search";
import { ReferenceChip } from "./reference-chip";
import { WelcomeModal } from "./welcome-modal";
import { PathFinderBanner } from "./path-finder-banner";
import { BranchIndex } from "./branch-index";
import { PersonDetailSidebar } from "@/components/person/person-detail-sidebar";
import {
  updatePerson,
  addPerson,
  addFamily,
  addChildToFamily,
} from "@/lib/genealogy/mutations";
import { exportData } from "@/lib/data/persistence";
import {
  filterIndexBySources,
  filterIndexByCountry,
} from "@/lib/genealogy/index-builder";
import type { Person, LayoutNode } from "@/lib/genealogy/types";

export function FamilyTree() {
  const { data, index, mutate } = useGenealogy();

  const { visibleSources, toggleSource, activeCountry, setCountry } =
    useTreeStore();

  const filteredIndex = useMemo(() => {
    const bySource = filterIndexBySources(index, visibleSources);
    return filterIndexByCountry(bySource, activeCountry);
  }, [index, visibleSources, activeCountry]);

  const layout = useMemo(
    () => computeTreeLayout(filteredIndex),
    [filteredIndex],
  );

  const nodeMap = useMemo(() => {
    const map = new Map<string, LayoutNode>();
    for (const node of layout.nodes) {
      map.set(node.personId, node);
    }
    return map;
  }, [layout.nodes]);

  const svgRef = useRef<SVGSVGElement>(null);
  const { transform, zoomIn, zoomOut, resetZoom, fitAll, zoomToPosition } =
    useTreeZoom({ svgRef });

  const {
    selectedPersonId,
    referencePersonId,
    sidebarOpen,
    selectPerson,
    setReferencePerson,
    compareMode,
    comparePersonA,
    comparePersonB,
    enterCompareMode,
    exitCompareMode,
    setComparePersonA,
    setComparePersonB,
  } = useTreeStore();

  // Track whether the welcome modal has been dismissed (skip without selecting)
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  // Track whether initialization from URL/localStorage is complete
  const [initialized, setInitialized] = useState(false);

  // Slug map for URL <-> person ID conversion
  const slugMap = useMemo(() => buildSlugMap(data.persons), [data.persons]);

  // Compute kinship between reference person and selected person
  const { result: kinshipResult } = useKinship(
    referencePersonId,
    selectedPersonId,
    index,
  );

  // Compute kinship between two compare-mode persons (Path Finder)
  const { result: compareKinshipResult } = useKinship(
    comparePersonA,
    comparePersonB,
    index,
  );

  // Active kinship: compare mode takes priority
  const activeKinship = compareMode ? compareKinshipResult : kinshipResult;

  // Set of person IDs in the active kinship path for highlighting
  const activePathSet = useMemo(() => {
    if (!activeKinship) return new Set<string>();
    return new Set(activeKinship.path);
  }, [activeKinship]);

  // Relationship label for the selected person (Yo soy mode only)
  const selectedRelationshipLabel = kinshipResult?.label ?? null;

  const selectedPerson = selectedPersonId
    ? (index.persons.get(selectedPersonId) ?? null)
    : null;

  const referencePerson = referencePersonId
    ? (index.persons.get(referencePersonId) ?? null)
    : null;

  const referencePersonName = referencePerson
    ? `${referencePerson.firstName} ${referencePerson.lastName}`
    : null;

  // Build the share URL with the current reference person's slug
  const shareUrl = useMemo(() => {
    if (!referencePersonId) return "";
    const slug = slugMap.idToSlug.get(referencePersonId);
    if (!slug) return "";
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("yo", slug);
    return url.toString();
  }, [referencePersonId, slugMap.idToSlug]);

  // Initialize reference person from URL or localStorage on mount
  useEffect(() => {
    // 1. Check URL param ?yo=
    const params = new URLSearchParams(window.location.search);
    const yoSlug = params.get("yo");
    if (yoSlug) {
      const id = slugMap.slugToId.get(yoSlug);
      if (id) {
        setReferencePerson(id);
        setInitialized(true);
        return;
      }
    }
    // 2. Check localStorage
    try {
      const stored = localStorage.getItem("genealogia-yo");
      if (stored && index.persons.has(stored)) {
        setReferencePerson(stored);
        setInitialized(true);
        return;
      }
    } catch {
      // localStorage unavailable
    }
    // 3. No identity found — clear default and show welcome modal
    setReferencePerson(null);
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync URL when reference person changes
  useEffect(() => {
    if (!initialized) return;
    if (!referencePersonId) return;
    const slug = slugMap.idToSlug.get(referencePersonId);
    if (slug) {
      const url = new URL(window.location.href);
      url.searchParams.set("yo", slug);
      window.history.replaceState({}, "", url.toString());
    }
  }, [referencePersonId, slugMap.idToSlug, initialized]);

  // --- Mutation handlers for inline editing ---

  const handleUpdatePerson = useCallback(
    (id: string, updates: Partial<Person>) => {
      mutate((prev) => updatePerson(prev, id, updates));
    },
    [mutate],
  );

  const handleAddSpouse = useCallback(
    (
      personId: string,
      spouseData: {
        firstName: string;
        lastName: string;
        gender: Person["gender"];
      },
    ) => {
      mutate((prev) => {
        const spouseId = `p${Date.now()}`;
        const spouse: Person = {
          id: spouseId,
          firstName: spouseData.firstName,
          lastName: spouseData.lastName,
          gender: spouseData.gender,
          events: [],
          migrations: [],
        };
        let next = addPerson(prev, spouse);
        // Check if person already has a family as parent
        const existingFamily = prev.families.find((f) =>
          f.parents.includes(personId),
        );
        if (existingFamily) {
          // Add spouse to existing family
          next = {
            ...next,
            families: next.families.map((f) =>
              f.id === existingFamily.id
                ? { ...f, parents: [...f.parents, spouseId] }
                : f,
            ),
          };
        } else {
          // Create new family
          const familyId = `f${Date.now()}`;
          next = addFamily(next, {
            id: familyId,
            parents: [personId, spouseId],
            children: [],
          });
        }
        return next;
      });
    },
    [mutate],
  );

  const handleAddChild = useCallback(
    (
      personId: string,
      childData: {
        firstName: string;
        lastName: string;
        gender: Person["gender"];
      },
    ) => {
      mutate((prev) => {
        const childId = `p${Date.now() + 1}`;
        const child: Person = {
          id: childId,
          firstName: childData.firstName,
          lastName: childData.lastName,
          gender: childData.gender,
          events: [],
          migrations: [],
        };
        let next = addPerson(prev, child);
        // Find family where this person is a parent
        const parentFamily = prev.families.find((f) =>
          f.parents.includes(personId),
        );
        if (parentFamily) {
          next = addChildToFamily(next, parentFamily.id, childId);
        } else {
          // Create a single-parent family
          const familyId = `f${Date.now() + 2}`;
          next = addFamily(next, {
            id: familyId,
            parents: [personId],
            children: [childId],
          });
        }
        return next;
      });
    },
    [mutate],
  );

  const handleExport = useCallback(() => {
    exportData(data);
  }, [data]);

  const handleSelectPerson = useCallback(
    (id: string) => {
      if (compareMode) {
        if (!comparePersonA) {
          setComparePersonA(id);
        } else if (!comparePersonB) {
          setComparePersonB(id);
        }
        // If both set, ignore further clicks until reset
        return;
      }
      selectPerson(id);
    },
    [
      compareMode,
      comparePersonA,
      comparePersonB,
      selectPerson,
      setComparePersonA,
      setComparePersonB,
    ],
  );

  const handleSidebarCompare = useCallback(
    (id: string) => {
      // "Ver relacion con [ref]": set the selected person as comparison target
      // kinship is computed between referencePersonId and selectedPersonId
      selectPerson(id);
    },
    [selectPerson],
  );

  const handleCloseSidebar = useCallback(() => {
    selectPerson(null);
  }, [selectPerson]);

  const handleSearchSelect = useCallback(
    (personId: string) => {
      selectPerson(personId);
      const node = nodeMap.get(personId);
      if (node) {
        zoomToPosition(node.x + 100, node.y + 40);
      }
    },
    [selectPerson, nodeMap, zoomToPosition],
  );

  const handleFitAll = useCallback(() => {
    fitAll(layout.width, layout.height);
  }, [fitAll, layout.width, layout.height]);

  const handleReferenceSelect = useCallback(
    (personId: string) => {
      setReferencePerson(personId);
    },
    [setReferencePerson],
  );

  const handleWelcomeSkip = useCallback(() => {
    setWelcomeDismissed(true);
  }, []);

  const handleWelcomeSelect = useCallback(
    (personId: string) => {
      setReferencePerson(personId);
      setWelcomeDismissed(true);
    },
    [setReferencePerson],
  );

  // Auto-center on the reference person (or fit all if none)
  useEffect(() => {
    if (!initialized) return;
    const timer = setTimeout(() => {
      if (referencePersonId) {
        const refNode = nodeMap.get(referencePersonId);
        if (refNode) {
          zoomToPosition(refNode.x + 100, refNode.y + 40);
          return;
        }
      }
      // Fallback: fit all
      fitAll(layout.width, layout.height);
    }, 300);
    return () => clearTimeout(timer);
    // Only re-center when referencePersonId changes, not on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referencePersonId, initialized]);

  // Show welcome modal when no reference person and not dismissed
  const showWelcome = initialized && !referencePersonId && !welcomeDismissed;

  return (
    <div
      className="relative h-[calc(100vh-56px)] w-full overflow-hidden"
      style={{
        backgroundColor: "#fefce8",
        backgroundImage:
          "radial-gradient(circle, #d4a57420 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <svg ref={svgRef} className="h-full w-full">
        <g
          transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}
        >
          {/* Edges first (behind nodes) */}
          {layout.edges.map((edge) => {
            const fromNode = nodeMap.get(edge.fromId);
            const toNode = nodeMap.get(edge.toId);
            if (!fromNode || !toNode) return null;

            const isHighlighted =
              activePathSet.has(edge.fromId) && activePathSet.has(edge.toId);

            return (
              <FamilyLink
                key={`${edge.fromId}-${edge.toId}`}
                edge={edge}
                fromX={fromNode.x}
                fromY={fromNode.y}
                toX={toNode.x}
                toY={toNode.y}
                isHighlighted={isHighlighted}
              />
            );
          })}

          {/* Relationship path overlay */}
          {activeKinship && (
            <RelationshipPath kinship={activeKinship} nodeMap={nodeMap} />
          )}

          {/* Person nodes */}
          {layout.nodes.map((node) => {
            const person = index.persons.get(node.personId);
            if (!person) return null;

            const isReference = node.personId === referencePersonId;
            const relationshipLabel =
              node.personId === selectedPersonId
                ? selectedRelationshipLabel
                : null;

            return (
              <PersonNode
                key={node.personId}
                person={person}
                layout={node}
                isSelected={node.personId === selectedPersonId}
                isHighlighted={activePathSet.has(node.personId)}
                isReference={isReference}
                isCompareA={compareMode && node.personId === comparePersonA}
                isCompareB={compareMode && node.personId === comparePersonB}
                relationshipLabel={relationshipLabel}
                onSelect={handleSelectPerson}
                zoomScale={transform.k}
              />
            );
          })}
        </g>
      </svg>

      <TreeSearch persons={data.persons} onSelect={handleSearchSelect} />

      <BranchIndex onJumpToPerson={handleSearchSelect} />

      {referencePersonId && (
        <ReferenceChip
          persons={data.persons}
          currentPersonId={referencePersonId}
          currentPersonName={referencePersonName}
          shareUrl={shareUrl}
          onSelect={handleReferenceSelect}
        />
      )}

      {compareMode && (
        <PathFinderBanner
          personA={
            comparePersonA ? (index.persons.get(comparePersonA) ?? null) : null
          }
          personB={
            comparePersonB ? (index.persons.get(comparePersonB) ?? null) : null
          }
          kinshipLabel={compareKinshipResult?.label ?? null}
          onReset={() => {
            setComparePersonA(null);
            setComparePersonB(null);
          }}
          onClose={exitCompareMode}
        />
      )}

      <TreeControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
        onFitAll={handleFitAll}
        zoomLevel={transform.k}
        onExport={handleExport}
        onCompare={enterCompareMode}
        compareActive={compareMode}
        visibleSources={visibleSources}
        onToggleSource={toggleSource}
        activeCountry={activeCountry}
        onSetCountry={setCountry}
      />

      <PersonDetailSidebar
        person={selectedPerson}
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        onCompare={handleSidebarCompare}
        referencePersonName={referencePersonName}
        relationshipLabel={selectedRelationshipLabel}
        onUpdatePerson={handleUpdatePerson}
        onAddSpouse={handleAddSpouse}
        onAddChild={handleAddChild}
      />

      {showWelcome && (
        <WelcomeModal
          persons={data.persons}
          onSelect={handleWelcomeSelect}
          onSkip={handleWelcomeSkip}
        />
      )}
    </div>
  );
}
