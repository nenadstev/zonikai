"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { attentionItems } from "@/lib/dashboard-data";
import { useLoadDetail } from "./LoadDetailContext";
import { StatusPill, riskVariant } from "./StatusPill";

export function AttentionQueue() {
  const { openLoad } = useLoadDetail();
  return (
    <section className="card-clean overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-danger-bg/30 px-5 py-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-danger" />
          <h2 className="text-base font-bold tracking-[-0.02em]">What Needs Attention Now</h2>
        </div>
        <span className="rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-semibold text-danger">
          {attentionItems.length} items
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/40 text-[11px] uppercase tracking-wider text-muted">
              {["Severity", "Load #", "Truck #", "Driver", "Problem", "Location", "Next Stop", "ETA", "Delay", "Last GPS", "Last Call", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attentionItems.map((item, i) => (
              <motion.tr
                key={item.loadId}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-border transition-colors hover:bg-accent-soft/20"
              >
                <td className="px-4 py-3">
                  <StatusPill variant={riskVariant(item.severity)}>{item.severity}</StatusPill>
                </td>
                <td className="px-4 py-3 font-medium">{item.loadNum}</td>
                <td className="px-4 py-3 text-muted">{item.truckNum}</td>
                <td className="px-4 py-3 text-muted">{item.driver}</td>
                <td className="max-w-[200px] px-4 py-3 text-sm font-medium text-foreground">
                  {item.problem}
                </td>
                <td className="px-4 py-3 text-muted">{item.location}</td>
                <td className="px-4 py-3 text-muted">{item.nextStop}</td>
                <td className="px-4 py-3 font-mono text-[13px]">{item.eta}</td>
                <td className="px-4 py-3 font-mono text-[13px] text-warning">{item.delay}</td>
                <td className="px-4 py-3 text-xs text-muted">{item.lastGps}</td>
                <td className="px-4 py-3 text-xs text-muted">{item.lastCall}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => openLoad(item.loadId)}
                    className="rounded-lg bg-secondary-dark px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-secondary"
                  >
                    View Load
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
