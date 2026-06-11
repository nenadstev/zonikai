"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { loads } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { useLoadDetail } from "./LoadDetailContext";
import { StatusPill, gpsVariant, riskVariant, trackingVariant } from "./StatusPill";

const filters = [
  { id: "all", label: "All Active Loads" },
  { id: "medium", label: "Medium Risk" },
  { id: "high", label: "High Risk" },
  { id: "major", label: "Major Delay" },
  { id: "escalate", label: "Escalate to Dispatch" },
  { id: "phone", label: "Missing Phone" },
  { id: "offline", label: "GPS Offline" },
  { id: "stale", label: "GPS Stale" },
] as const;

type FilterId = (typeof filters)[number]["id"];

function formatGps(load: (typeof loads)[0]) {
  if (load.gpsStatus === "OFFLINE") return "GPS offline";
  return load.lastGpsUpdate;
}

export function ActiveLoadsTable() {
  const { openLoad } = useLoadDetail();
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = loads;
    if (filter === "medium") result = result.filter((l) => l.riskCategory === "medium");
    if (filter === "high") result = result.filter((l) => l.riskCategory === "high");
    if (filter === "major") result = result.filter((l) => l.riskCategory === "majorDelay");
    if (filter === "escalate") result = result.filter((l) => l.escalatedToDispatch);
    if (filter === "phone") result = result.filter((l) => !l.driverPhone);
    if (filter === "offline") result = result.filter((l) => l.gpsStatus === "OFFLINE");
    if (filter === "stale") result = result.filter((l) => l.gpsStatus === "STALE");

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.loadNum.toLowerCase().includes(q) ||
          l.truckNum.toLowerCase().includes(q) ||
          l.driver.toLowerCase().includes(q) ||
          l.dispatcher.toLowerCase().includes(q) ||
          l.nearestCity.toLowerCase().includes(q)
      );
    }
    return result;
  }, [filter, search]);

  return (
    <section id="loads" className="card-clean overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs text-muted">{filtered.length} of {loads.length} loads</p>
      </div>

      <div className="flex flex-col gap-3 border-b border-border bg-surface/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                filter === f.id
                  ? "bg-secondary-dark text-white"
                  : "bg-white text-muted hover:bg-accent-soft hover:text-secondary-dark"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Load #, truck, driver, city..."
            className="w-full min-w-[160px] bg-transparent text-sm outline-none sm:w-48"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/40 text-[10px] uppercase tracking-wider text-muted">
              {[
                "Load #", "Truck #", "Driver", "Dispatcher", "Pickup", "Delivery", "Next Stop",
                "Location", "ETA", "Delay", "Tracking", "Risk", "GPS", "Truck", "Last GPS", "Warning", "",
              ].map((h) => (
                <th key={h} className="px-3 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((load) => (
              <tr
                key={load.id}
                className="border-b border-border transition-colors hover:bg-accent-soft/15"
              >
                <td className="px-3 py-3 font-medium">{load.loadNum}</td>
                <td className="px-3 py-3 text-muted">{load.truckNum}</td>
                <td className="px-3 py-3 text-muted">{load.driver}</td>
                <td className="px-3 py-3 text-muted">{load.dispatcher}</td>
                <td className="px-3 py-3 text-xs text-muted">{load.pickup}</td>
                <td className="px-3 py-3 text-xs text-muted">{load.delivery}</td>
                <td className="px-3 py-3 text-xs">{load.nextStop}</td>
                <td className="max-w-[140px] truncate px-3 py-3 text-xs text-muted">{load.nearestCity}</td>
                <td className="px-3 py-3 font-mono text-[13px]">{load.currentEta}</td>
                <td className={cn("px-3 py-3 font-mono text-[13px]", load.delayMinutes > 0 && "text-warning font-medium")}>
                  {load.delayMinutes > 0 ? `+${load.delayMinutes}m` : "—"}
                </td>
                <td className="px-3 py-3"><StatusPill variant={trackingVariant(load.trackingStatus)}>{load.trackingStatus}</StatusPill></td>
                <td className="px-3 py-3"><StatusPill variant={riskVariant(load.riskLevel)}>{load.riskLevel}</StatusPill></td>
                <td className="px-3 py-3"><StatusPill variant={gpsVariant(load.gpsStatus)}>{load.gpsStatus === "OFFLINE" ? "OFFLINE" : load.gpsStatus}</StatusPill></td>
                <td className="px-3 py-3"><StatusPill variant="neutral">{load.truckStatus}</StatusPill></td>
                <td className="px-3 py-3 text-xs text-muted">{formatGps(load)}</td>
                <td className="max-w-[160px] truncate px-3 py-3 text-xs">{load.warning}</td>
                <td className="px-3 py-3">
                  <button
                    type="button"
                    onClick={() => openLoad(load.id)}
                    className="text-xs font-semibold text-secondary-dark hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
