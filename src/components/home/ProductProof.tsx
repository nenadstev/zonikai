"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Phone, Wifi, WifiOff } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type LoadRow = {
  id: string;
  loadNum: string;
  truckNum: string;
  nextStop: string;
  eta: string;
  riskLevel: "success" | "warning" | "danger";
  riskLabel: string;
  gpsStatus: "online" | "offline";
  mapX: number;
  mapY: number;
  summary?: string;
};

const loads: LoadRow[] = [
  {
    id: "1",
    loadNum: "#48291",
    truckNum: "T-1042",
    nextStop: "Chicago, IL",
    eta: "14:30",
    riskLevel: "success",
    riskLabel: "On Time",
    gpsStatus: "online",
    mapX: 62,
    mapY: 44,
  },
  {
    id: "2",
    loadNum: "#48305",
    truckNum: "T-2187",
    nextStop: "Denver, CO",
    eta: "20:45",
    riskLevel: "warning",
    riskLabel: "At Risk",
    gpsStatus: "online",
    mapX: 40,
    mapY: 50,
    summary: "AI called the driver. Breakdown on I-70. New ETA 20:45.",
  },
  {
    id: "3",
    loadNum: "#48312",
    truckNum: "T-3301",
    nextStop: "Dallas, TX",
    eta: "22:00",
    riskLevel: "success",
    riskLabel: "On Time",
    gpsStatus: "offline",
    mapX: 42,
    mapY: 68,
    summary: "GPS went dark. Voice agent is calling the driver now.",
  },
  {
    id: "4",
    loadNum: "#48318",
    truckNum: "T-4410",
    nextStop: "Atlanta, GA",
    eta: "06:15",
    riskLevel: "danger",
    riskLabel: "High Risk",
    gpsStatus: "offline",
    mapX: 78,
    mapY: 70,
    summary: "Truck stopped. GPS offline. Next stop is late.",
  },
];

function markerColor(load: LoadRow) {
  if (load.gpsStatus === "offline" || load.riskLevel === "danger") return "#dc2626";
  if (load.riskLevel === "warning") return "#ea580c";
  return "#16a34a";
}

function FleetMap({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = loads.find((l) => l.id === (hovered ?? selectedId));

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold">Fleet map</h3>
          <p className="text-xs text-muted">{loads.length} trucks on the road</p>
        </div>
        <div className="hidden gap-3 text-[10px] text-muted sm:flex">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-success" /> On time
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-warning" /> At risk
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-danger" /> Trouble
          </span>
        </div>
      </div>

      <div className="relative min-h-[280px] bg-[#f1f5f9] p-3 sm:min-h-[320px]">
        <svg viewBox="0 0 100 80" className="h-full w-full" aria-hidden>
          <rect width="100" height="80" fill="#f8fafc" rx="1" />
          {[...Array(8)].map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="#e2e8f0"
              strokeWidth="0.2"
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="80"
              stroke="#e2e8f0"
              strokeWidth="0.2"
            />
          ))}
          <path
            d="M 20 70 Q 50 40 80 30"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          <path
            d="M 30 20 Q 55 50 75 65"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          {[
            { x: 62, y: 44, label: "Chicago" },
            { x: 40, y: 68, label: "Dallas" },
            { x: 78, y: 70, label: "Atlanta" },
            { x: 42, y: 50, label: "Denver" },
          ].map((city) => (
            <g key={city.label}>
              <circle cx={city.x} cy={city.y} r="0.8" fill="#94a3b8" />
              <text x={city.x} y={city.y - 2} textAnchor="middle" fill="#64748b" fontSize="2.4">
                {city.label}
              </text>
            </g>
          ))}
          {loads.map((load) => {
            const color = markerColor(load);
            const isActive = load.id === (hovered ?? selectedId);
            return (
              <g
                key={load.id}
                className="cursor-pointer"
                onMouseEnter={() => setHovered(load.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelect(load.id)}
              >
                {isActive && (
                  <motion.circle
                    cx={load.mapX}
                    cy={load.mapY}
                    r="4"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    initial={{ r: 2, opacity: 0.8 }}
                    animate={{ r: 5, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
                <circle
                  cx={load.mapX}
                  cy={load.mapY}
                  r={isActive ? 2.4 : 1.8}
                  fill={color}
                  stroke="#fff"
                  strokeWidth="0.4"
                />
              </g>
            );
          })}
        </svg>

        {active && (
          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-border bg-white/95 px-3 py-2.5 shadow-sm backdrop-blur-sm sm:left-auto sm:right-3 sm:w-56">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold">{active.truckNum}</p>
              <StatusBadge variant={active.riskLevel}>{active.riskLabel}</StatusBadge>
            </div>
            <p className="mt-1 text-[11px] text-muted">
              Next: {active.nextStop} · ETA {active.eta}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadsBoard({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = loads.find((l) => l.id === selectedId);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-white">
        <div className="flex items-center gap-2.5">
          <BrandMark size={18} className="h-[18px] w-[18px]" />
          <div>
            <h3 className="text-sm font-semibold">Active loads</h3>
            <p className="text-[11px] text-neutral-400">Where every truck stands right now</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/20 px-2.5 py-1 text-[11px] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
          Live
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              {["Load", "Truck", "Next stop", "ETA", "Risk", "GPS"].map((col) => (
                <th
                  key={col}
                  className="px-3 py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loads.map((load) => (
              <tr
                key={load.id}
                onClick={() => onSelect(load.id)}
                className={cn(
                  "cursor-pointer border-b border-border transition-colors hover:bg-accent-soft/30",
                  selectedId === load.id && "bg-accent-soft/50"
                )}
              >
                <td className="px-3 py-3 font-medium">{load.loadNum}</td>
                <td className="px-3 py-3 text-muted">{load.truckNum}</td>
                <td className="px-3 py-3 text-muted">{load.nextStop}</td>
                <td className="px-3 py-3 font-mono text-[13px]">{load.eta}</td>
                <td className="px-3 py-3">
                  <StatusBadge variant={load.riskLevel}>{load.riskLabel}</StatusBadge>
                </td>
                <td className="px-3 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-xs font-medium",
                      load.gpsStatus === "online" ? "text-success" : "text-danger"
                    )}
                  >
                    {load.gpsStatus === "online" ? (
                      <Wifi className="h-3 w-3" />
                    ) : (
                      <WifiOff className="h-3 w-3" />
                    )}
                    {load.gpsStatus === "online" ? "Live" : "Offline"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected?.summary && (
        <div
          className={cn(
            "m-3 flex items-start gap-2.5 rounded-xl border p-3",
            selected.riskLevel === "danger"
              ? "border-danger/15 bg-danger-bg"
              : selected.riskLevel === "warning"
                ? "border-warning/15 bg-warning-bg"
                : "border-border bg-surface/50"
          )}
        >
          {selected.riskLevel === "success" ? (
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          ) : (
            <AlertTriangle
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                selected.riskLevel === "danger" ? "text-danger" : "text-warning"
              )}
            />
          )}
          <div>
            <p className="text-sm font-medium">
              {selected.loadNum} — {selected.riskLabel}
            </p>
            <p className="mt-0.5 text-sm text-muted">{selected.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductProof() {
  const [selectedId, setSelectedId] = useState("4");

  return (
    <SectionShell id="product" variant="muted" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="See it work"
            title="One board. One map."
            titleAccent="Every truck, all night."
            punchline="See where each truck is, if it will make the next stop, and what needs a human."
          />
        </AnimateOnScroll>

        <div className="grid gap-6 lg:grid-cols-2">
          <AnimateOnScroll>
            <LoadsBoard selectedId={selectedId} onSelect={setSelectedId} />
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <FleetMap selectedId={selectedId} onSelect={setSelectedId} />
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/dashboard" variant="secondary" size="lg">
              Open full dashboard
            </Button>
            <Button href="/features" variant="ghost" size="lg">
              See all features →
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
