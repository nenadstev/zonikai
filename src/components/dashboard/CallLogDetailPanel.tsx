"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import type { CallLog } from "@/lib/dashboard-types";
import { StatusPill } from "./StatusPill";

type Props = {
  log: CallLog | null;
  onClose: () => void;
};

export function CallLogDetailPanel({ log, onClose }: Props) {
  return (
    <AnimatePresence>
      {log && (
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
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-dark">Call Transcript</p>
                <h3 className="text-lg font-bold">{log.loadNum}</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-surface" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted">Time</p><p className="font-mono font-medium">{log.time}</p></div>
                <div><p className="text-xs text-muted">Driver</p><p className="font-medium">{log.driver}</p></div>
                <div><p className="text-xs text-muted">Truck</p><p className="font-medium">{log.truckNum}</p></div>
                <div><p className="text-xs text-muted">Status</p><StatusPill variant="accent">{log.status}</StatusPill></div>
              </div>

              <div className="rounded-xl border border-border bg-surface/40 p-4">
                <p className="text-xs font-semibold text-muted">Reason</p>
                <p className="mt-1 text-sm">{log.reason}</p>
                <p className="mt-3 text-xs font-semibold text-muted">Outcome</p>
                <p className="mt-1 text-sm">{log.outcome}</p>
                <p className="mt-3 text-xs font-semibold text-muted">Summary</p>
                <p className="mt-1 text-sm">{log.summary}</p>
              </div>

              <div className="rounded-xl border border-secondary/25 bg-accent-soft/30 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-secondary-dark" />
                  <p className="text-xs font-bold uppercase tracking-wider">Driver said</p>
                </div>
                {log.driverSaid ? (
                  <p className="text-sm italic leading-relaxed">&ldquo;{log.driverSaid}&rdquo;</p>
                ) : (
                  <p className="text-sm text-muted">No transcript — driver did not answer or voicemail only.</p>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
