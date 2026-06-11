"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { getLoadById, callLogs } from "@/lib/dashboard-data";
import { LoadDetailPanel } from "./LoadDetailPanel";
import { EscalatePanel } from "./EscalatePanel";
import { DriverDetailPanel } from "./DriverDetailPanel";
import { CallLogDetailPanel } from "./CallLogDetailPanel";

type PanelState =
  | { type: "load"; loadId: string }
  | { type: "escalate" }
  | { type: "driver"; loadId: string }
  | { type: "callLog"; callLogId: string }
  | null;

type DashboardPanelContextValue = {
  openLoad: (id: string) => void;
  openEscalate: () => void;
  openDriver: (loadId: string) => void;
  openCallLog: (callLogId: string) => void;
  closePanel: () => void;
  selectedLoadId: string | null;
};

const DashboardPanelContext = createContext<DashboardPanelContextValue | null>(null);

export function DashboardPanelProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<PanelState>(null);

  const openLoad = useCallback((id: string) => setPanel({ type: "load", loadId: id }), []);
  const openEscalate = useCallback(() => setPanel({ type: "escalate" }), []);
  const openDriver = useCallback((loadId: string) => setPanel({ type: "driver", loadId }), []);
  const openCallLog = useCallback((callLogId: string) => setPanel({ type: "callLog", callLogId }), []);
  const closePanel = useCallback(() => setPanel(null), []);

  const selectedLoadId = panel?.type === "load" ? panel.loadId : null;
  const load = panel?.type === "load" ? getLoadById(panel.loadId) ?? null : null;
  const driverLoad = panel?.type === "driver" ? getLoadById(panel.loadId) ?? null : null;
  const callLog =
    panel?.type === "callLog"
      ? callLogs.find((c) => c.id === panel.callLogId) ?? null
      : null;

  return (
    <DashboardPanelContext.Provider
      value={{ openLoad, openEscalate, openDriver, openCallLog, closePanel, selectedLoadId }}
    >
      {children}
      <LoadDetailPanel load={load} onClose={closePanel} />
      <EscalatePanel open={panel?.type === "escalate"} onClose={closePanel} />
      <DriverDetailPanel load={driverLoad} onClose={closePanel} />
      <CallLogDetailPanel log={callLog} onClose={closePanel} />
    </DashboardPanelContext.Provider>
  );
}

export function useDashboardPanel() {
  const ctx = useContext(DashboardPanelContext);
  if (!ctx) throw new Error("useDashboardPanel must be used within DashboardPanelProvider");
  return ctx;
}

/** @deprecated use useDashboardPanel */
export function useLoadDetail() {
  return useDashboardPanel();
}
