"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  MapPin,
  PhoneForwarded,
  Radio,
  ShieldAlert,
  Timer,
} from "lucide-react";
import { KPI_TOOLTIPS, kpis, kpiDeltas } from "@/lib/dashboard-data";
import { useDashboardPanel } from "./DashboardPanelContext";
import { InfoTooltip } from "./InfoTooltip";
import { cn } from "@/lib/utils";

const toneStyles = {
  accent: "text-secondary-dark bg-accent-soft",
  success: "text-success bg-success-bg",
  warning: "text-warning bg-warning-bg",
  danger: "text-danger bg-danger-bg",
} as const;

type Tone = keyof typeof toneStyles;

const cards: {
  key: keyof typeof kpis;
  label: string;
  icon: typeof MapPin;
  tone: Tone;
  href?: string;
  onClick?: "escalate";
}[] = [
  { key: "activeLoads", label: "Active Loads", icon: MapPin, tone: "accent" },
  { key: "onTime", label: "On-Time Loads", icon: Clock, tone: "success" },
  { key: "mediumRisk", label: "Medium Risk Loads", icon: AlertTriangle, tone: "warning" },
  { key: "highRisk", label: "High Risk Loads", icon: ShieldAlert, tone: "danger" },
  { key: "majorDelay", label: "Major Delay", icon: Timer, tone: "danger" },
  { key: "escalateToDispatch", label: "Escalate to Dispatch", icon: PhoneForwarded, tone: "warning", onClick: "escalate" },
  { key: "openAlerts", label: "Open Alerts", icon: Radio, tone: "danger", href: "/dashboard/alerts" },
];

export function KpiGrid() {
  const { openEscalate } = useDashboardPanel();

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-7">
      {cards.map((card) => {
        const value = kpis[card.key];
        const delta = kpiDeltas[card.key];
        const isUp = delta.startsWith("+") && delta !== "+0" && delta !== "0";
        const tooltip = KPI_TOOLTIPS[card.key];

        const inner = (
          <>
            <div className="flex items-center justify-between">
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", toneStyles[card.tone])}>
                <card.icon className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5">
                <InfoTooltip text={tooltip} />
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isUp && card.tone === "danger" ? "text-danger" : isUp ? "text-warning" : "text-muted"
                  )}
                >
                  {delta !== "0" ? `${delta} last hour` : "No change"}
                </span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <p className="mt-0.5 text-xs font-medium text-muted">{card.label}</p>
            </div>
          </>
        );

        const className = "card-clean flex flex-col gap-3 p-4 text-left transition-shadow hover:shadow-md";

        if (card.href) {
          return (
            <Link key={card.key} href={card.href} className={className}>
              {inner}
            </Link>
          );
        }

        if (card.onClick === "escalate") {
          return (
            <button key={card.key} type="button" onClick={openEscalate} className={className}>
              {inner}
            </button>
          );
        }

        return (
          <div key={card.key} className={className}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
