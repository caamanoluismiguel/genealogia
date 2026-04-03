/**
 * SVG connector lines between family members.
 * Spouse links are horizontal; parent-child links use cubic bezier curves.
 */
"use client";

import type { LayoutEdge } from "@/lib/genealogy/types";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;

interface FamilyLinkProps {
  edge: LayoutEdge;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isHighlighted: boolean;
}

export function FamilyLink({
  edge,
  fromX,
  fromY,
  toX,
  toY,
  isHighlighted,
}: FamilyLinkProps) {
  const strokeColor = isHighlighted ? "stroke-teal-500" : "stroke-slate-300";
  const strokeWidth = isHighlighted ? 3 : 2;

  if (edge.type === "spouse") {
    // Horizontal line connecting right side of first node to left side of second
    const x1 = fromX + NODE_WIDTH;
    const y1 = fromY + NODE_HEIGHT / 2;
    const x2 = toX;
    const y2 = toY + NODE_HEIGHT / 2;

    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
    );
  }

  // Parent-child: cubic bezier from parent bottom center to child top center
  const startX = fromX + NODE_WIDTH / 2;
  const startY = fromY + NODE_HEIGHT;
  const endX = toX + NODE_WIDTH / 2;
  const endY = toY;
  const midY = (startY + endY) / 2;

  const d = `M ${startX} ${startY} C ${startX} ${midY} ${endX} ${midY} ${endX} ${endY}`;

  return (
    <path d={d} className={strokeColor} strokeWidth={strokeWidth} fill="none" />
  );
}
