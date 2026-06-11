"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Truck } from "lucide-react";
import { loads } from "@/lib/dashboard-data";
import type { Load } from "@/lib/dashboard-types";
import { useLoadDetail } from "./LoadDetailContext";
import { StatusPill, riskVariant } from "./StatusPill";

function markerColor(load: Load) {
  if (load.gpsStatus === "OFFLINE" || load.riskLevel === "HIGH") return "#dc2626";
  if (load.trackingStatus === "AT RISK" || load.riskLevel === "MEDIUM") return "#ea580c";
  if (load.trackingStatus === "ON TIME") return "#16a34a";
  return "#a3a3a3";
}

export function LiveMap() {
  const { openLoad, selectedLoadId } = useLoadDetail();
  const [hovered, setHovered] = useState<Load | null>(null);
  const preview = hovered ?? loads.find((l) => l.id === selectedLoadId) ?? null;

  return (
    <section id="map" className="card-clean overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-bold tracking-[-0.02em]">Live Truck Activity</h2>
          <p className="text-xs text-muted">{loads.length} active trucks on map</p>
        </div>
        <div className="flex gap-3 text-[10px] text-muted">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> On time</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> At risk</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-danger" /> High / offline</span>
        </div>
      </div>

      <div className="relative grid lg:grid-cols-[1fr_280px]">
        <div className="relative min-h-[360px] bg-[#f8fafc] p-4">
          <svg viewBox="0 0 100 80" className="h-full w-full" aria-hidden>
            {/* simplified region */}
            <rect width="100" height="80" fill="#f1f5f9" rx="1" />
            {[...Array(8)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#e2e8f0" strokeWidth="0.2" />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="80" stroke="#e2e8f0" strokeWidth="0.2" />
            ))}
            {/* major routes */}
            <path d="M 20 70 Q 50 40 80 30" fill="none" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
            <path d="M 30 20 Q 55 50 75 65" fill="none" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
            {/* cities */}
            {[
              { x: 62, y: 44, label: "Chicago" },
              { x: 72, y: 48, label: "Columbus" },
              { x: 40, y: 68, label: "Dallas" },
              { x: 64, y: 60, label: "Nashville" },
              { x: 58, y: 52, label: "Indianapolis" },
              { x: 52, y: 56, label: "St. Louis" },
              { x: 78, y: 70, label: "Atlanta" },
              { x: 82, y: 42, label: "Pittsburgh" },
            ].map((city) => (
              <g key={city.label}>
                <circle cx={city.x} cy={city.y} r="0.8" fill="#94a3b8" />
                <text x={city.x} y={city.y - 2} textAnchor="middle" fill="#94a3b8" fontSize="2.2">
                  {city.label}
                </text>
              </g>
            ))}
            {/* trucks */}
            {loads.map((load) => (
              <g
                key={load.id}
                className="cursor-pointer"
                onMouseEnter={() => setHovered(load)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => openLoad(load.id)}
              >
                <motion.circle
                  cx={load.mapX}
                  cy={load.mapY}
                  r={selectedLoadId === load.id ? 2.8 : 2.2}
                  fill={markerColor(load)}
                  animate={
                    load.truckStatus === "MOVING"
                      ? { cx: [load.mapX, load.mapX + 0.3, load.mapX], cy: [load.mapY, load.mapY - 0.2, load.mapY] }
                      : {}
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  opacity={selectedLoadId && selectedLoadId !== load.id ? 0.45 : 1}
                />
                {selectedLoadId === load.id && (
                  <circle cx={load.mapX} cy={load.mapY} r="4" fill="none" stroke="#818cf8" strokeWidth="0.5" />
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className="border-t border-border bg-white p-4 lg:border-l lg:border-t-0">
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                key={preview.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft">
                    <Truck className="h-4 w-4 text-secondary-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{preview.truckNum}</p>
                    <p className="text-xs text-muted">Load {preview.loadNum}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted">Driver:</span> {preview.driver}</p>
                  <p><span className="text-muted">Location:</span> {preview.nearestCity}</p>
                  <p><span className="text-muted">ETA:</span> {preview.currentEta}</p>
                  <p><span className="text-muted">Remaining:</span> {preview.remainingMiles} mi</p>
                  <p className="flex items-center gap-2">
                    <span className="text-muted">Risk:</span>
                    <StatusPill variant={riskVariant(preview.riskLevel)}>{preview.riskLevel}</StatusPill>
                  </p>
                  <p><span className="text-muted">GPS:</span> {preview.lastGpsUpdate}</p>
                </div>
                <button
                  type="button"
                  onClick={() => openLoad(preview.id)}
                  className="w-full rounded-lg bg-secondary-dark py-2 text-xs font-semibold text-white hover:bg-secondary"
                >
                  Open Full Load Details
                </button>
              </motion.div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center text-sm text-muted">
                <Navigation className="mb-2 h-8 w-8 opacity-40" />
                <p>Click a truck marker to preview</p>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-6 border-t border-border pt-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Legend</p>
            <div className="space-y-1.5 text-xs text-muted">
              <p className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Pickup / delivery on select</p>
              <p>Route path shown in load detail</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
