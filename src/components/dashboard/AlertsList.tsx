"use client";

import { alerts } from "@/lib/dashboard-data";
import { StatusPill, riskVariant } from "./StatusPill";

export function AlertsList() {
  return (
    <section className="card-clean overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-bold">Alerts</h2>
        <p className="text-xs text-muted">{alerts.filter((a) => a.status === "OPEN").length} open alerts</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/40 text-[10px] uppercase tracking-wider text-muted">
              {["Time", "Load #", "Truck #", "Problem", "Severity", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr
                key={alert.id}
                className={alert.status === "OPEN" ? "border-b border-border hover:bg-surface/30" : "border-b border-border opacity-50"}
              >
                <td className="px-4 py-3 font-mono text-[13px]">{alert.time}</td>
                <td className="px-4 py-3 font-medium">{alert.loadNum}</td>
                <td className="px-4 py-3 text-muted">{alert.truckNum}</td>
                <td className="px-4 py-3">{alert.problem}</td>
                <td className="px-4 py-3"><StatusPill variant={riskVariant(alert.severity)}>{alert.severity}</StatusPill></td>
                <td className="px-4 py-3">
                  <StatusPill variant={alert.status === "OPEN" ? "danger" : "success"}>{alert.status}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
