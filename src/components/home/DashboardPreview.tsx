"use client";

import { useState } from "react";
import { AlertTriangle, Phone, Wifi, WifiOff } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type LoadRow = {
  id: string;
  loadNum: string;
  truckNum: string;
  driver: string;
  nextStop: string;
  eta: string;
  delay: string;
  trackingStatus: string;
  riskLevel: "success" | "warning" | "danger";
  riskLabel: string;
  gpsStatus: "online" | "offline";
  gpsLabel: string;
  voiceStatus?: string;
  summary?: string;
};

const loads: LoadRow[] = [
  {
    id: "1",
    loadNum: "#48291",
    truckNum: "T-1042",
    driver: "M. Johnson",
    nextStop: "Chicago, IL",
    eta: "14:30",
    delay: "—",
    trackingStatus: "In Transit",
    riskLevel: "success",
    riskLabel: "On Time",
    gpsStatus: "online",
    gpsLabel: "Online",
  },
  {
    id: "2",
    loadNum: "#48305",
    truckNum: "T-2187",
    driver: "R. Martinez",
    nextStop: "Denver, CO",
    eta: "20:45",
    delay: "+2 hr",
    trackingStatus: "Delayed",
    riskLevel: "warning",
    riskLabel: "At Risk",
    gpsStatus: "online",
    gpsLabel: "Online",
    voiceStatus: "Voice confirmed",
    summary: "AI Voice Agent confirmed breakdown. ETA updated from 18:45 to 20:45.",
  },
  {
    id: "3",
    loadNum: "#48312",
    truckNum: "T-3301",
    driver: "J. Williams",
    nextStop: "Dallas, TX",
    eta: "22:00",
    delay: "—",
    trackingStatus: "In Transit",
    riskLevel: "success",
    riskLabel: "On Time",
    gpsStatus: "offline",
    gpsLabel: "Offline",
    summary: "GPS signal lost. Last ping 2 hours ago. Voice agent queued.",
  },
  {
    id: "4",
    loadNum: "#48318",
    truckNum: "T-4410",
    driver: "S. Chen",
    nextStop: "Atlanta, GA",
    eta: "06:15",
    delay: "+2 hr",
    trackingStatus: "Critical",
    riskLevel: "danger",
    riskLabel: "High Risk",
    gpsStatus: "offline",
    gpsLabel: "Offline",
    summary:
      "Truck stationary. GPS offline. Next stop is late. Risk level: HIGH.",
  },
];

export function DashboardPreview() {
  const [selectedId, setSelectedId] = useState("4");
  const selected = loads.find((l) => l.id === selectedId);

  return (
    <SectionShell id="product" variant="muted" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="Operations Dashboard"
            title="Zonik monitors every load for you."
            titleAccent="Your team only steps in when it matters."
            punchline="This dashboard runs 24/7 — tracking GPS, ETAs, and risks — and tells your after-hours team exactly what's happening. No manual portal checks. No calling every driver. Just react where it's urgent."
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="card-clean overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between border-b border-border bg-primary px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <BrandMark size={20} className="h-5 w-5" />
                <div>
                  <h3 className="text-sm font-semibold">Active Loads</h3>
                  <p className="text-xs text-neutral-400">4 loads · Live monitoring</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-success/20 px-2.5 py-1 text-xs text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                Syncing
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface/50">
                    {[
                      "Load #",
                      "Truck #",
                      "Driver",
                      "Next Stop",
                      "ETA",
                      "Delay",
                      "Status",
                      "Risk",
                      "GPS",
                      "Voice",
                    ].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-muted"
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
                      onClick={() => setSelectedId(load.id)}
                      className={cn(
                        "cursor-pointer border-b border-border transition-all hover:bg-accent-soft/20",
                        selectedId === load.id && "bg-accent-soft/40 ring-1 ring-inset ring-secondary/20",
                        load.riskLevel === "danger" && selectedId !== load.id && "hover:bg-danger-bg/30"
                      )}
                    >
                      <td className="px-4 py-3.5 font-medium">{load.loadNum}</td>
                      <td className="px-4 py-3.5 text-muted">{load.truckNum}</td>
                      <td className="px-4 py-3.5 text-muted">{load.driver}</td>
                      <td className="px-4 py-3.5 text-muted">{load.nextStop}</td>
                      <td className="px-4 py-3.5 font-mono text-[13px]">{load.eta}</td>
                      <td className={cn("px-4 py-3.5 font-mono text-[13px]", load.delay !== "—" && "font-medium text-warning")}>
                        {load.delay}
                      </td>
                      <td className="px-4 py-3.5 text-muted">{load.trackingStatus}</td>
                      <td className="px-4 py-3.5">
                        <StatusBadge variant={load.riskLevel}>{load.riskLabel}</StatusBadge>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn("inline-flex items-center gap-1 text-xs font-medium", load.gpsStatus === "online" ? "text-success" : "text-danger")}>
                          {load.gpsStatus === "online" ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                          {load.gpsLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {load.voiceStatus ? (
                          <span className="inline-flex items-center gap-1 text-xs text-accent">
                            <Phone className="h-3 w-3" />
                            {load.voiceStatus}
                          </span>
                        ) : (
                          <span className="text-xs text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selected?.summary && (
              <div
                className={cn(
                  "mx-4 mb-4 mt-1 flex items-start gap-3 rounded-xl border p-4 sm:mx-5",
                  selected.riskLevel === "danger"
                    ? "border-danger/15 bg-danger-bg"
                    : selected.riskLevel === "warning"
                      ? "border-warning/15 bg-warning-bg"
                      : "border-border bg-surface/50"
                )}
              >
                <AlertTriangle className={cn("mt-0.5 h-4 w-4 shrink-0", selected.riskLevel === "danger" ? "text-danger" : selected.riskLevel === "warning" ? "text-warning" : "text-muted")} />
                <div>
                  <p className="text-sm font-medium">{selected.loadNum} — {selected.riskLabel}</p>
                  <p className="mt-1 text-sm text-muted">{selected.summary}</p>
                </div>
              </div>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
