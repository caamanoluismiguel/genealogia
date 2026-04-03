/**
 * Highlighted kinship path overlay.
 * Shows the relationship chain between two selected persons
 * with an animated dashed line and a floating label badge.
 */
"use client";

import type { KinshipResult, LayoutNode } from "@/lib/genealogy/types";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;

interface RelationshipPathProps {
  kinship: KinshipResult;
  nodeMap: Map<string, LayoutNode>;
}

export function RelationshipPath({ kinship, nodeMap }: RelationshipPathProps) {
  const { path, label } = kinship;

  if (path.length < 2) return null;

  // Build the path through center points of each node
  const points: { x: number; y: number }[] = [];
  for (const personId of path) {
    const node = nodeMap.get(personId);
    if (!node) return null;
    points.push({
      x: node.x + NODE_WIDTH / 2,
      y: node.y + NODE_HEIGHT / 2,
    });
  }

  // Build SVG path string connecting consecutive points with lines
  const segments = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    segments.push(`L ${points[i].x} ${points[i].y}`);
  }
  const d = segments.join(" ");

  // Midpoint for the label
  const midIndex = Math.floor(points.length / 2);
  const midPoint = points[midIndex];

  return (
    <g>
      <path
        d={d}
        fill="none"
        className="stroke-teal-500"
        strokeWidth={4}
        strokeDasharray="8 4"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="24"
          to="0"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>

      {/* Floating label badge */}
      <foreignObject
        x={midPoint.x - 60}
        y={midPoint.y - 16}
        width={120}
        height={32}
      >
        <div className="flex items-center justify-center">
          <span className="rounded-full bg-teal-600 px-3 py-1 text-sm font-medium text-white shadow">
            {label}
          </span>
        </div>
      </foreignObject>
    </g>
  );
}
