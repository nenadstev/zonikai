"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PhoneForwarded, X } from "lucide-react";
import { escalationItems } from "@/lib/dashboard-data";
import { useDashboardPanel } from "./DashboardPanelContext";
import { StatusPill } from "./StatusPill";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function EscalatePanel({ open, onClose }: Props) {
  const { openLoad } = useDashboardPanel();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
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
              <div className="flex items-center gap-2">
                <PhoneForwarded className="h-4 w-4 text-warning" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary-dark">Escalate to Dispatch</p>
                  <h3 className="text-lg font-bold">{escalationItems.length} loads</h3>
                </div>
              </div>
              <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-surface" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {escalationItems.map((item) => (
                <div key={item.loadId} className="rounded-xl border border-warning/30 bg-warning-bg/30 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold">{item.loadNum}</p>
                      <p className="text-xs text-muted">{item.truckNum} · {item.driver}</p>
                    </div>
                    <StatusPill variant="warning">{item.loadStatus}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{item.reason}</p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openLoad(item.loadId);
                    }}
                    className="mt-3 text-xs font-semibold text-secondary-dark hover:underline"
                  >
                    View load details →
                  </button>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
