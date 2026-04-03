"use client";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  type RefObject,
} from "react";
import { zoom, zoomIdentity, type ZoomBehavior } from "d3-zoom";
import { select } from "d3-selection";

interface UseTreeZoomOptions {
  svgRef: RefObject<SVGSVGElement | null>;
  minZoom?: number;
  maxZoom?: number;
}

interface ZoomTransform {
  x: number;
  y: number;
  k: number;
}

interface UseTreeZoomReturn {
  transform: ZoomTransform;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  fitAll: (width: number, height: number) => void;
  zoomToPosition: (x: number, y: number) => void;
}

const ZOOM_STEP = 1.3;

export function useTreeZoom({
  svgRef,
  minZoom = 0.1,
  maxZoom = 3,
}: UseTreeZoomOptions): UseTreeZoomReturn {
  const [transform, setTransform] = useState<ZoomTransform>({
    x: 0,
    y: 0,
    k: 1,
  });
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(
    null,
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([minZoom, maxZoom])
      .on("zoom", (event) => {
        const t = event.transform;
        setTransform({ x: t.x, y: t.y, k: t.k });
      });

    zoomBehaviorRef.current = zoomBehavior;

    const selection = select(svg);
    selection.call(zoomBehavior);
    selection.on("dblclick.zoom", null);

    return () => {
      selection.on(".zoom", null);
    };
  }, [svgRef, minZoom, maxZoom]);

  const zoomIn = useCallback(() => {
    const svg = svgRef.current;
    const zoomBehavior = zoomBehaviorRef.current;
    if (!svg || !zoomBehavior) return;
    select(svg).call(zoomBehavior.scaleBy, ZOOM_STEP);
  }, [svgRef]);

  const zoomOut = useCallback(() => {
    const svg = svgRef.current;
    const zoomBehavior = zoomBehaviorRef.current;
    if (!svg || !zoomBehavior) return;
    select(svg).call(zoomBehavior.scaleBy, 1 / ZOOM_STEP);
  }, [svgRef]);

  const resetZoom = useCallback(() => {
    const svg = svgRef.current;
    const zoomBehavior = zoomBehaviorRef.current;
    if (!svg || !zoomBehavior) return;
    select(svg).call(zoomBehavior.transform, zoomIdentity);
  }, [svgRef]);

  const fitAll = useCallback(
    (treeWidth: number, treeHeight: number) => {
      const svg = svgRef.current;
      const zoomBehavior = zoomBehaviorRef.current;
      if (!svg || !zoomBehavior) return;

      const { width: svgW, height: svgH } = svg.getBoundingClientRect();
      if (svgW === 0 || svgH === 0) return;

      const padding = 80;
      const scaleX = (svgW - padding * 2) / treeWidth;
      const scaleY = (svgH - padding * 2) / treeHeight;
      const scale = Math.max(Math.min(scaleX, scaleY, 1), 0.15);

      const tx = (svgW - treeWidth * scale) / 2;
      const ty = (svgH - treeHeight * scale) / 2;

      const t = zoomIdentity.translate(tx, ty).scale(scale);
      select(svg).call(zoomBehavior.transform, t);
    },
    [svgRef],
  );

  const zoomToPosition = useCallback(
    (x: number, y: number) => {
      const svg = svgRef.current;
      const zoomBehavior = zoomBehaviorRef.current;
      if (!svg || !zoomBehavior) return;

      const { width: svgW, height: svgH } = svg.getBoundingClientRect();
      if (svgW === 0 || svgH === 0) return;
      const scale = 0.7; // zoom out slightly to show context
      const tx = svgW / 2 - x * scale;
      const ty = svgH / 2 - y * scale;

      const t = zoomIdentity.translate(tx, ty).scale(scale);
      select(svg).call(zoomBehavior.transform, t);
    },
    [svgRef],
  );

  return {
    transform,
    zoomIn,
    zoomOut,
    resetZoom,
    fitAll,
    zoomToPosition,
  };
}
