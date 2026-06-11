"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ChevronDown, ChevronUp, Pencil, X } from "lucide-react";
import type { Load, LoadStatus, LoadStop, StopStatus } from "@/lib/dashboard-types";
import { getCallLogsForLoad, LOAD_STATUSES, STOP_STATUSES } from "@/lib/dashboard-data";
import { DashboardModal } from "./DashboardModal";
import { RouteProgress } from "./RouteProgress";
import { StatusPill, gpsVariant, riskVariant, trackingVariant } from "./StatusPill";

type Props = {
  load: Load | null;
  onClose: () => void;
};

type ModalType = "confirmStop" | "sendHistory" | "changeStatus" | null;

export function LoadDetailPanel({ load, onClose }: Props) {
  return (
    <AnimatePresence>
      {load && <LoadDetailPanelInner key={load.id} load={load} onClose={onClose} />}
    </AnimatePresence>
  );
}

function LoadDetailPanelInner({ load, onClose }: { load: Load; onClose: () => void }) {
  const [aiSummary, setAiSummary] = useState(load.aiSummary);
  const [editingAiSummary, setEditingAiSummary] = useState(false);
  const [aiSummaryDraft, setAiSummaryDraft] = useState(load.aiSummary);
  const [voiceCheckIn, setVoiceCheckIn] = useState(load.voiceCheckIn ?? false);
  const [humanNote, setHumanNote] = useState(load.humanInput?.text ?? "");
  const [humanNoteTime, setHumanNoteTime] = useState<string | null>(load.humanInput?.addedAt ?? null);
  const [stops, setStops] = useState<LoadStop[]>(() => load.stops.map((s) => ({ ...s })));
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(load.loadStatus);
  const [currentEta, setCurrentEta] = useState(load.currentEta);
  const [modal, setModal] = useState<ModalType>(null);
  const [expandedCall, setExpandedCall] = useState<string | null>(null);
  const [statusTab, setStatusTab] = useState<"load" | "stop">("load");
  const [selectedStopId, setSelectedStopId] = useState(
    () => load.stops[load.currentStopIndex]?.id ?? load.stops[0]?.id ?? ""
  );

  const callLogsForLoad = getCallLogsForLoad(load.loadNum);

  const canSendToHistory = loadStatus === "Delivered" || loadStatus === "Cancelled";

  const saveHumanNote = () => {
    if (humanNote.trim()) {
      setHumanNoteTime(
        new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      );
    }
  };

  return (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            key={load.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-dark">Load Detail</p>
                <h3 className="text-lg font-bold">{load.loadNum}</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-surface" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div className="flex flex-wrap gap-2">
                <StatusPill variant={riskVariant(load.riskLevel)}>{load.riskLevel}</StatusPill>
                <StatusPill variant={trackingVariant(load.trackingStatus)}>{load.trackingStatus}</StatusPill>
                <StatusPill variant={gpsVariant(load.gpsStatus)}>GPS {load.gpsStatus}</StatusPill>
                <StatusPill variant="neutral">{loadStatus}</StatusPill>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted">Truck</p><p className="font-medium">{load.truckNum}</p></div>
                <div><p className="text-xs text-muted">Driver</p><p className="font-medium">{load.driver}</p></div>
                <div><p className="text-xs text-muted">Dispatcher</p><p className="font-medium">{load.dispatcher}</p></div>
                <div><p className="text-xs text-muted">Phone</p><p className="font-medium">{load.driverPhone ?? "Missing"}</p></div>
              </div>

              <div className="rounded-xl border border-border bg-surface/40 p-4">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Route Progress</p>
                <RouteProgress load={{ ...load, stops, currentStopIndex: load.currentStopIndex, currentEta }} />
              </div>

              <div className="feature-spotlight rounded-xl border border-secondary/25 p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="icon-chip h-8 w-8">
                      <Bot className="h-4 w-4" />
                    </div>
                    <h4 className="text-sm font-bold">Zonik AI Summary</h4>
                  </div>
                  {!editingAiSummary ? (
                    <button
                      type="button"
                      onClick={() => {
                        setAiSummaryDraft(aiSummary);
                        setEditingAiSummary(true);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-secondary/40 hover:text-secondary-dark"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingAiSummary(false)}
                        className="rounded-lg px-2.5 py-1 text-xs font-medium text-muted hover:bg-white/60"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAiSummary(aiSummaryDraft);
                          setEditingAiSummary(false);
                        }}
                        className="rounded-lg bg-secondary-dark px-2.5 py-1 text-xs font-semibold text-white hover:bg-secondary"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
                {editingAiSummary ? (
                  <textarea
                    value={aiSummaryDraft}
                    onChange={(e) => setAiSummaryDraft(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm leading-relaxed outline-none focus:border-secondary/50"
                  />
                ) : (
                  <p className="text-sm leading-relaxed text-foreground">{aiSummary}</p>
                )}
                <div className="mt-4 space-y-3 border-t border-border/60 pt-3 text-xs">
                  <p><span className="font-semibold text-muted">Warning:</span> {load.warning}</p>
                  <p><span className="font-semibold text-muted">Last call:</span> {load.lastCallAttempt ?? "—"}</p>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Manual overrides</p>
                {stops.map((stop) => (
                  <div key={stop.id} className="grid grid-cols-2 gap-2 text-xs">
                    <label className="col-span-2 font-medium">{stop.location} ({stop.type})</label>
                    <div>
                      <span className="text-muted">Appointment</span>
                      <input
                        type="text"
                        value={stop.appointmentTime}
                        onChange={(e) =>
                          setStops((prev) =>
                            prev.map((s) => (s.id === stop.id ? { ...s, appointmentTime: e.target.value } : s))
                          )
                        }
                        className="mt-1 w-full rounded border border-border px-2 py-1.5 text-sm outline-none focus:border-secondary/50"
                      />
                    </div>
                    <div>
                      <span className="text-muted">Stop ETA</span>
                      <input
                        type="text"
                        value={stop.eta}
                        onChange={(e) =>
                          setStops((prev) =>
                            prev.map((s) => (s.id === stop.id ? { ...s, eta: e.target.value } : s))
                          )
                        }
                        className="mt-1 w-full rounded border border-border px-2 py-1.5 text-sm outline-none focus:border-secondary/50"
                      />
                    </div>
                  </div>
                ))}
                <div>
                  <span className="text-xs text-muted">Current ETA (from driver call)</span>
                  <input
                    type="text"
                    value={currentEta}
                    onChange={(e) => setCurrentEta(e.target.value)}
                    className="mt-1 w-full rounded border border-border px-2 py-1.5 text-sm outline-none focus:border-secondary/50"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4">
                <input
                  type="checkbox"
                  checked={voiceCheckIn}
                  onChange={(e) => setVoiceCheckIn(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-secondary-dark"
                />
                <span className="text-sm">Should AI do additional voice check in the next analysis?</span>
              </label>

              <div className="rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Human input</p>
                <textarea
                  value={humanNote}
                  onChange={(e) => setHumanNote(e.target.value)}
                  onBlur={saveHumanNote}
                  placeholder="Add operator note..."
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-secondary/50"
                />
                {humanNoteTime && (
                  <p className="mt-1 text-[10px] text-muted">Added at {humanNoteTime}</p>
                )}
              </div>

              {callLogsForLoad.length > 0 && (
                <div className="rounded-xl border border-border overflow-hidden">
                  <p className="border-b border-border bg-surface/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                    Call logs
                  </p>
                  {callLogsForLoad.map((log) => (
                    <div key={log.id} className="border-b border-border last:border-0">
                      <button
                        type="button"
                        onClick={() => setExpandedCall(expandedCall === log.id ? null : log.id)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-surface/30"
                      >
                        <span>
                          <span className="font-mono text-xs text-muted">{log.time}</span>
                          <span className="ml-2 font-medium">{log.status}</span>
                        </span>
                        {expandedCall === log.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                      {expandedCall === log.id && (
                        <div className="border-t border-border bg-accent-soft/20 px-4 py-3">
                          <p className="text-[10px] font-bold uppercase text-muted">Driver said</p>
                          <p className="mt-1 text-sm italic leading-relaxed">
                            {log.driverSaid
                              ? `"${log.driverSaid}"`
                              : "No transcript — driver did not answer or voicemail only."}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Confirm Stop", action: () => setModal("confirmStop") },
                  { label: "Change Status", action: () => setModal("changeStatus") },
                  { label: "Send to History", action: () => setModal("sendHistory") },
                ].map(({ label, action }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={action}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-secondary/40 hover:bg-accent-soft/30"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {modal === "confirmStop" && (
            <DashboardModal title="Confirm Stop" onClose={() => setModal(null)}>
              <p className="mb-4 text-sm text-muted">Select a stop to confirm for {load.loadNum}:</p>
              <div className="space-y-2">
                {stops.map((stop) => (
                  <div key={stop.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm">
                    <div>
                      <p className="font-medium">{stop.location}</p>
                      <p className="text-xs text-muted">{stop.type} · Appt {stop.appointmentTime}</p>
                    </div>
                    <StatusPill variant="neutral">{stop.stopStatus}</StatusPill>
                  </div>
                ))}
              </div>
            </DashboardModal>
          )}

          {modal === "sendHistory" && (
            <DashboardModal
              title="Send to History"
              onClose={() => setModal(null)}
              footer={
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setModal(null)} className="rounded-lg px-4 py-2 text-sm text-muted hover:bg-surface">
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!canSendToHistory}
                    onClick={() => setModal(null)}
                    className="rounded-lg bg-secondary-dark px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Confirm
                  </button>
                </div>
              }
            >
              {canSendToHistory ? (
                <p className="text-sm">Confirm that load {load.loadNum} is complete and should be moved to history.</p>
              ) : (
                <p className="text-sm text-danger">
                  Cannot send to history. Load status must be <strong>Delivered</strong> or <strong>Cancelled</strong>. Current status: {loadStatus}.
                </p>
              )}
            </DashboardModal>
          )}

          {modal === "changeStatus" && (
            <DashboardModal title="Change Status" onClose={() => setModal(null)}>
              <div className="mb-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStatusTab("load")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium ${statusTab === "load" ? "bg-secondary-dark text-white" : "bg-surface text-muted"}`}
                >
                  Load / Tour
                </button>
                <button
                  type="button"
                  onClick={() => setStatusTab("stop")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium ${statusTab === "stop" ? "bg-secondary-dark text-white" : "bg-surface text-muted"}`}
                >
                  Stop
                </button>
              </div>
              {statusTab === "load" ? (
                <div className="space-y-2">
                  {LOAD_STATUSES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { setLoadStatus(s); setModal(null); }}
                      className={`block w-full rounded-lg border px-3 py-2.5 text-left text-sm ${loadStatus === s ? "border-secondary bg-accent-soft" : "border-border hover:bg-surface"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <select
                    value={selectedStopId}
                    onChange={(e) => setSelectedStopId(e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none"
                  >
                    {stops.map((s) => (
                      <option key={s.id} value={s.id}>{s.location} ({s.type})</option>
                    ))}
                  </select>
                  <div className="space-y-2">
                    {STOP_STATUSES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setStops((prev) =>
                            prev.map((stop) =>
                              stop.id === selectedStopId ? { ...stop, stopStatus: s as StopStatus } : stop
                            )
                          );
                          setModal(null);
                        }}
                        className="block w-full rounded-lg border border-border px-3 py-2.5 text-left text-sm hover:bg-surface"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </DashboardModal>
          )}
        </>
  );
}
