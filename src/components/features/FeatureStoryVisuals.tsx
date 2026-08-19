"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Phone, PhoneCall, Truck } from "lucide-react";
import { RouteMapAnimation } from "@/components/ui/RouteMapAnimation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

type VisualProps = { active?: boolean; compact?: boolean };

function VoiceBars({ active }: { active: boolean }) {
  return (
    <div className="flex h-5 items-end gap-0.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-[#a5b4fc]"
          animate={active ? { height: [4, 18, 7, 16, 5] } : { height: 4 }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function EtaStoryVisual({ active = true, compact = false }: VisualProps) {
  const { t } = useI18n();
  return (
    <div className={cn("flex h-full flex-col justify-between", compact ? "gap-3" : "gap-6")}>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          {t.story.chicagoUnload}
        </p>
        <div className={cn("grid grid-cols-2", compact ? "mt-3 gap-2.5" : "mt-6 gap-4")}>
          <div className={cn("rounded-2xl border border-border bg-surface/60", compact ? "p-3" : "p-5")}>
            <p className="text-xs font-medium text-muted">{t.story.onPaper}</p>
            <p
              className={cn(
                "mt-2 font-mono font-semibold tracking-[-0.04em]",
                compact ? "text-2xl" : "text-4xl md:text-5xl"
              )}
            >
              20:00
            </p>
          </div>
          <motion.div
            animate={
              active
                ? { borderColor: ["#f97316", "#fdba74", "#f97316"] }
                : undefined
            }
            transition={{ duration: 2.2, repeat: Infinity }}
            className={cn(
              "rounded-2xl border-2 border-warning bg-warning-bg",
              compact ? "p-3" : "p-5"
            )}
          >
            <p className="text-xs font-medium text-warning">{t.story.liveEta}</p>
            <p
              className={cn(
                "mt-2 font-mono font-semibold tracking-[-0.04em] text-warning",
                compact ? "text-2xl" : "text-4xl md:text-5xl"
              )}
            >
              20:45
            </p>
          </motion.div>
        </div>
        <p className={cn("font-semibold text-warning", compact ? "mt-2 text-xs" : "mt-4 text-sm")}>
          {t.story.lateWindow}
        </p>
      </div>
      <RouteMapAnimation
        height={compact ? "h-16 w-full" : "h-32 w-full md:h-40"}
        showLabels={false}
      />
    </div>
  );
}

export function CallStoryVisual({ active = true, compact = false }: VisualProps) {
  const { t } = useI18n();
  return (
    <div className={cn("flex h-full flex-col justify-center", compact ? "gap-3" : "gap-5")}>
      <div
        className={cn(
          "rounded-2xl border border-secondary/30 bg-accent-soft/70",
          compact ? "p-3.5" : "p-5"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center rounded-2xl bg-secondary/15 text-secondary-dark",
              compact ? "h-9 w-9" : "h-12 w-12"
            )}
          >
            <Phone className={compact ? "h-4 w-4" : "h-5 w-5"} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-secondary-dark">{t.story.calling}</p>
            <p className="text-xs text-muted">{t.story.callingSub}</p>
          </div>
          <VoiceBars active={active} />
        </div>
        <p
          className={cn(
            "rounded-xl bg-white leading-relaxed text-foreground",
            compact ? "mt-2.5 px-3 py-2 text-xs" : "mt-4 px-4 py-3 text-sm"
          )}
        >
          {t.story.callLine}
        </p>
      </div>

      <div className={cn("rounded-2xl border border-border bg-white", compact ? "p-3.5" : "p-5")}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-surface",
              compact ? "h-9 w-9" : "h-12 w-12"
            )}
          >
            <PhoneCall className={compact ? "h-4 w-4 text-muted" : "h-5 w-5 text-muted"} />
          </div>
          <div>
            <p className="text-sm font-semibold">{t.story.driverTruck}</p>
            <p className="text-xs text-muted">M. Johnson</p>
          </div>
        </div>
        <div
          className={cn(
            "flex items-start gap-2 rounded-xl bg-success-bg text-success",
            compact ? "mt-2.5 px-3 py-2 text-xs" : "mt-4 px-4 py-3 text-sm"
          )}
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0" />
          {t.story.breakdown}
        </div>
      </div>
    </div>
  );
}

export function FactsStoryVisual({ active = true, compact = false }: VisualProps) {
  const { t } = useI18n();
  const rows = [
    { id: "T-1042", load: "#48291", state: t.story.needsYou, tone: "warning" as const },
    { id: "T-2187", load: "#48305", state: t.story.onTime, tone: "success" as const },
    { id: "T-3301", load: "#48312", state: t.story.onTime, tone: "success" as const },
    { id: "T-4410", load: "#48318", state: t.story.onTime, tone: "success" as const },
    { id: "T-5522", load: "#48320", state: t.story.onTime, tone: "success" as const },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center justify-between", compact ? "mb-2" : "mb-4")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          {t.story.nightBoard}
        </p>
        <span className="rounded-full bg-success-bg px-2.5 py-1 text-[11px] font-semibold text-success">
          {t.story.quietNeeds}
        </span>
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
        {rows.map((row) => (
          <motion.div
            key={row.id}
            animate={
              active && row.tone === "warning"
                ? { backgroundColor: ["#ffffff", "#fff7ed", "#ffffff"] }
                : { backgroundColor: "#ffffff" }
            }
            transition={{ duration: 2.4, repeat: Infinity }}
            className={cn(
              "flex items-center justify-between gap-3",
              compact ? "px-3 py-2" : "px-4 py-3.5 md:px-5"
            )}
          >
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-muted" />
              <div>
                <p className="font-mono text-sm font-semibold">{row.id}</p>
                <p className="font-mono text-[11px] text-muted">{row.load}</p>
              </div>
            </div>
            <StatusBadge variant={row.tone}>{row.state}</StatusBadge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LoadsStoryVisual({ active = true, compact = false }: VisualProps) {
  const { t } = useI18n();
  return (
    <div className="grid h-full min-h-0 overflow-hidden rounded-2xl border border-border md:grid-cols-2">
      <div className={cn("bg-[#111111] text-white", compact ? "p-4" : "p-6 md:p-8")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {t.story.before}
        </p>
        <p className={cn("font-semibold tracking-[-0.03em]", compact ? "mt-3 text-lg" : "mt-4 text-xl")}>
          {t.story.fires}
        </p>
        <ul className={cn("text-sm text-neutral-400", compact ? "mt-4 space-y-2" : "mt-6 space-y-3")}>
          {t.story.fireItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <motion.div
        animate={active ? { backgroundColor: ["#ffffff", "#eeedff", "#ffffff"] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity }}
        className={cn("bg-white", compact ? "p-4" : "p-6 md:p-8")}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-dark">
          {t.story.withZonik}
        </p>
        <p
          className={cn(
            "font-semibold tracking-[-0.03em] text-secondary-dark",
            compact ? "mt-3 text-lg" : "mt-4 text-xl"
          )}
        >
          {t.story.loadsSetup}
        </p>
        <ul className={cn("text-sm font-medium text-foreground", compact ? "mt-4 space-y-2" : "mt-6 space-y-3")}>
          {t.story.loadWins.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" /> {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export function StatusStoryVisual({ active = true, compact = false }: VisualProps) {
  const { t } = useI18n();
  const stops = [
    { name: t.story.stops[0], done: true },
    { name: t.story.stops[1], done: true },
    { name: t.story.stops[2], done: false, current: true },
    { name: t.story.stops[3], done: false },
  ];

  return (
    <div className={cn("flex h-full flex-col", compact ? "gap-3" : "gap-5")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-muted">#48291 · T-1042</p>
          <p className="mt-1 text-xl font-semibold tracking-[-0.03em]">{t.story.omahaChicago}</p>
        </div>
        <StatusBadge variant="warning">{t.story.atRisk}</StatusBadge>
      </div>
      <div className="space-y-3">
        {stops.map((stop) => (
          <div key={stop.name} className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-2.5 w-2.5 shrink-0 rounded-full",
                stop.done && "bg-success",
                stop.current && "bg-warning",
                !stop.done && !stop.current && "bg-border"
              )}
            />
            <span
              className={cn(
                "text-sm",
                stop.current ? "font-semibold text-foreground" : "text-muted"
              )}
            >
              {stop.name}
            </span>
            {stop.current && (
              <span className="ml-auto font-mono text-xs font-semibold text-warning">20:45</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 text-secondary" />
          {t.story.liveGps}
        </div>
        <RouteMapAnimation
          height={compact ? "h-16 w-full" : "h-28 w-full md:h-32"}
          showLabels={false}
          compact
        />
      </div>
    </div>
  );
}

export function HandoffStoryVisual({ active = true, compact = false }: VisualProps) {
  const { t } = useI18n();
  const trucks = t.story.truckRows;

  return (
    <div className="flex h-full flex-col items-stretch justify-center gap-4 md:flex-row md:items-center">
      <div
        className={cn(
          "flex-1 rounded-2xl border border-white/10 bg-[#111111] text-white",
          compact ? "p-3.5" : "p-5"
        )}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {t.story.night}
        </p>
        <p className="mt-2 text-lg font-semibold">{t.story.trucksWatched}</p>
        <ul className="mt-4 space-y-2 text-sm text-neutral-400">
          {trucks.map((row) => (
            <li key={row}>{row}</li>
          ))}
        </ul>
      </div>
      <motion.div
        animate={active ? { x: [0, 6, 0] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex justify-center text-secondary"
      >
        <ArrowRight className="h-7 w-7 rotate-90 md:rotate-0" />
      </motion.div>
      <div className={cn("flex-1 rounded-2xl border border-border bg-white", compact ? "p-3.5" : "p-5")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-dark">
          {t.story.day}
        </p>
        <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
          {t.story.sameFacts}
          <Check className="h-5 w-5 text-success" />
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {t.story.handoffItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ReportStoryVisual({ active = true, compact = false }: VisualProps) {
  const { t } = useI18n();
  const cards = [
    { label: t.story.payMile, value: "$2.14", hint: t.story.thisWeek },
    { label: t.story.dispatcher, value: "Ana", hint: t.story.anaHint },
    { label: t.story.driver, value: "M. Johnson", hint: t.story.driverHint },
  ];

  return (
    <div className="grid h-full content-center gap-3 sm:grid-cols-3 sm:gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          animate={active ? { y: [0, -4, 0] } : undefined}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
          className={cn("rounded-2xl border border-border bg-white", compact ? "p-3.5" : "p-5")}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {card.label}
          </p>
          <p
            className={cn(
              "font-semibold tracking-[-0.03em]",
              compact ? "mt-2 text-xl" : "mt-3 text-2xl md:text-3xl"
            )}
          >
            {card.value}
          </p>
          <p className="mt-2 text-sm font-medium text-success">{card.hint}</p>
        </motion.div>
      ))}
    </div>
  );
}
