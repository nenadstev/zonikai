"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Truck, X } from "lucide-react";
import type { Load } from "@/lib/dashboard-types";
import { StatusPill, gpsVariant } from "./StatusPill";

type Props = {
  load: Load | null;
  onClose: () => void;
};

export function DriverDetailPanel({ load, onClose }: Props) {
  return (
    <AnimatePresence>
      {load && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-dark">Driver Contact</p>
                <h3 className="text-lg font-bold">{load.driver}</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-surface" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="flex flex-wrap gap-2">
                <StatusPill variant={gpsVariant(load.gpsStatus)}>GPS {load.gpsStatus}</StatusPill>
                <StatusPill variant="neutral">{load.truckStatus}</StatusPill>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted">Truck</p><p className="font-medium">{load.truckNum}</p></div>
                <div><p className="text-xs text-muted">Load</p><p className="font-medium">{load.loadNum}</p></div>
                <div><p className="text-xs text-muted">Dispatcher</p><p className="font-medium">{load.dispatcher}</p></div>
                <div><p className="text-xs text-muted">Location</p><p className="font-medium">{load.nearestCity}</p></div>
              </div>

              <div className="rounded-xl border border-border bg-surface/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Phone</p>
                <p className="mt-1 text-lg font-bold">{load.driverPhone ?? "Missing — update in TMS"}</p>
                {load.driverPhone && (
                  <a
                    href={`tel:${load.driverPhone.replace(/\D/g, "")}`}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-secondary-dark px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary"
                  >
                    <Phone className="h-4 w-4" />
                    Call driver
                  </a>
                )}
              </div>

              <div className="rounded-xl border border-border p-4 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <Truck className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase">Route status</span>
                </div>
                <p className="mt-2">Next stop: <span className="font-medium text-foreground">{load.nextStop}</span></p>
                <p className="mt-1">ETA: <span className="font-mono font-medium">{load.currentEta}</span></p>
                <p className="mt-1 text-xs text-muted">
                  GPS: {load.gpsStatus === "OFFLINE" ? "GPS offline" : load.lastGpsUpdate}
                </p>
              </div>

              <p className="text-xs text-muted">
                After-hours agent can use this panel to reach the driver directly when GPS is stale or offline.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
