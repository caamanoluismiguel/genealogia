"use client";

import dynamic from "next/dynamic";

const MapContent = dynamic(() => import("./map-content"), { ssr: false });

export function MigrationMap() {
  return (
    <div style={{ height: "calc(100vh - 56px - 80px)", width: "100%" }}>
      <MapContent />
    </div>
  );
}
