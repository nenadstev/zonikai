"use client";

import { motion } from "framer-motion";
import {
  aiActions,
  callLogs,
  criticalStops,
  gpsHealth,
  gpsStaleList,
  kpis,
} from "@/lib/dashboard-data";
import { useDashboardPanel } from "./DashboardPanelContext";
import { StatusPill, riskVariant } from "./StatusPill";

export function UpcomingCriticalStops() {
  return (
    <section className="card-clean h-full overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-bold">Upcoming Critical Stops</h2>
        <p className="text-xs text-muted">Pickups & deliveries in the next 2 hours</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/40 text-[10px] uppercase tracking-wider text-muted">
              {["Time", "Load #", "Truck #", "Type", "Location", "ETA", "Status", "Risk"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criticalStops.map((stop) => (
              <tr
                key={stop.loadNum + stop.time}
                className={stop.flagged ? "bg-danger-bg/40" : "border-b border-border hover:bg-surface/30"}
              >
                <td className="px-4 py-3 font-mono text-[13px]">{stop.time}</td>
                <td className="px-4 py-3 font-medium">{stop.loadNum}</td>
                <td className="px-4 py-3 text-muted">{stop.truckNum}</td>
                <td className="px-4 py-3"><StatusPill variant="accent">{stop.stopType}</StatusPill></td>
                <td className="px-4 py-3 text-muted">{stop.location}</td>
                <td className="px-4 py-3 font-mono">{stop.eta}</td>
                <td className="px-4 py-3 text-sm">{stop.status}</td>
                <td className="px-4 py-3"><StatusPill variant={riskVariant(stop.risk)}>{stop.risk}</StatusPill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function GpsHealthOverview() {
  const { openDriver } = useDashboardPanel();
  const total = gpsHealth.fresh + gpsHealth.stale + gpsHealth.offline + gpsHealth.unknown;
  const segments = [
    { label: "Fresh", value: gpsHealth.fresh, color: "bg-success" },
    { label: "Stale", value: gpsHealth.stale, color: "bg-warning" },
    { label: "Offline", value: gpsHealth.offline, color: "bg-danger" },
    { label: "Unknown", value: gpsHealth.unknown, color: "bg-neutral-400" },
  ];

  const offlineOrStale = gpsStaleList.filter((i) => i.status !== "OK");

  return (
    <section className="card-clean flex h-full flex-col p-5">
      <h2 className="text-base font-bold">GPS Health</h2>
      <p className="mt-0.5 text-xs text-muted">
        {gpsHealth.offline} offline · {gpsHealth.stale} stale
      </p>
      <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-surface">
        {segments.map((s) => (
          <div key={s.label} className={s.color} style={{ width: `${total ? (s.value / total) * 100 : 0}%` }} title={`${s.label}: ${s.value}`} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${s.color}`} />
            <span className="text-muted">{s.label}</span>
            <span className="font-semibold">{s.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex-1 space-y-2 overflow-y-auto border-t border-border pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Drivers — offline / stale</p>
        {(offlineOrStale.length > 0 ? offlineOrStale : gpsStaleList).map((item) => (
          <button
            key={item.truckNum}
            type="button"
            onClick={() => openDriver(item.loadId)}
            className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-left text-xs transition-colors hover:border-secondary/40 hover:bg-accent-soft/20"
          >
            <div>
              <span className="font-medium text-foreground">{item.driver}</span>
              <span className="ml-2 text-muted">{item.truckNum}</span>
            </div>
            <StatusPill variant={item.status === "OFFLINE" ? "danger" : "warning"}>
              {item.status === "OFFLINE" ? "GPS offline" : "Stale"}
            </StatusPill>
          </button>
        ))}
      </div>
    </section>
  );
}

export function RecentAiActions() {
  return (
    <section className="card-clean overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-bold">Recent AI Actions</h2>
        <p className="text-xs text-muted">Background automation this shift</p>
      </div>
      <div className="divide-y divide-border">
        {aiActions.map((action, i) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex gap-3 px-5 py-3 text-sm hover:bg-accent-soft/20"
          >
            <span className="shrink-0 font-mono text-xs text-muted">{action.time}</span>
            <span>{action.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function RecentCallLogs() {
  const { openCallLog } = useDashboardPanel();

  return (
    <section className="card-clean overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-bold">Recent Call Logs</h2>
        <p className="text-xs text-muted">Click a row to read the full transcript</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/40 text-[10px] uppercase tracking-wider text-muted">
              {["Time", "Load", "Truck", "Driver", "Reason", "Status", "Outcome"].map((h) => (
                <th key={h} className="px-3 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {callLogs.map((log) => (
              <tr
                key={log.id}
                onClick={() => openCallLog(log.id)}
                className="cursor-pointer border-b border-border hover:bg-accent-soft/15"
              >
                <td className="px-3 py-3 font-mono text-xs">{log.time}</td>
                <td className="px-3 py-3 font-medium">{log.loadNum}</td>
                <td className="px-3 py-3 text-muted">{log.truckNum}</td>
                <td className="px-3 py-3 text-muted">{log.driver}</td>
                <td className="px-3 py-3 text-xs">{log.reason}</td>
                <td className="px-3 py-3"><StatusPill variant="accent">{log.status}</StatusPill></td>
                <td className="px-3 py-3 text-xs">{log.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ShiftHandoffSummary() {
  return (
    <section className="card-clean p-5">
      <h2 className="text-base font-bold">Shift Handoff Summary</h2>
      <p className="mt-1 text-xs text-muted">Overview for next operator</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Active loads", value: kpis.activeLoads },
          { label: "High-risk loads", value: kpis.highRisk },
          { label: "Major delay", value: kpis.majorDelay },
          { label: "Unresolved alerts", value: kpis.openAlerts },
          { label: "Escalate to dispatch", value: kpis.escalateToDispatch },
          { label: "Critical deliveries", value: criticalStops.filter((s) => s.flagged).length },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-surface/40 px-4 py-3">
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-xs text-muted">{item.label}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 rounded-lg bg-secondary-dark px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary"
      >
        Generate Shift Summary
      </button>
    </section>
  );
}
