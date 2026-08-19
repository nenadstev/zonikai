"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n/LocaleProvider";

function VoiceBars() {
  return (
    <div className="flex h-4 items-end gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-secondary"
          animate={{ height: [4, 14, 6, 16, 4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function EtaVisual() {
  const { t } = useI18n();
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        {t.story.chicagoUnloadShort}
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-xs text-muted">{t.story.onPaper}</span>
          <span className="font-mono text-sm font-semibold text-foreground">20:00</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-xs text-muted">{t.story.liveEta}</span>
          <span className="font-mono text-sm font-semibold text-warning">20:45</span>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-warning">{t.story.lateShort}</p>
    </div>
  );
}

export function CallVisual() {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex items-center gap-2 text-secondary-dark">
        <Phone className="h-3.5 w-3.5" />
        <span className="text-xs font-semibold">{t.story.calling}</span>
        <VoiceBars />
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">{t.story.driverTruck}</p>
      <p className="mt-1 text-xs text-muted">{t.story.breakdown}</p>
    </div>
  );
}

export function FactsVisual() {
  const { t } = useI18n();
  const rows = [
    { id: "T-1042", state: t.story.needsYou, hot: true },
    { id: "T-2187", state: t.story.onTime, hot: false },
    { id: "T-3301", state: t.story.onTime, hot: false },
  ];

  return (
    <div className="space-y-2.5">
      {rows.map((row) => (
        <div key={row.id} className="flex items-baseline justify-between gap-6">
          <span className="font-mono text-xs text-muted">{row.id}</span>
          <span
            className={
              row.hot
                ? "text-xs font-semibold text-warning"
                : "text-xs font-medium text-success"
            }
          >
            {row.state}
          </span>
        </div>
      ))}
    </div>
  );
}

export function LoadsVisual() {
  const { t } = useI18n();
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        {t.story.tonight}
      </p>
      <p className="text-sm text-muted line-through">{t.story.fires}</p>
      <p className="text-sm font-semibold text-secondary-dark">{t.story.loadsSetup}</p>
    </div>
  );
}

export function StatusVisual() {
  const { t } = useI18n();
  return (
    <div>
      <p className="font-mono text-xs text-muted">#48291 · stop 2 of 4</p>
      <p className="mt-2 text-sm font-semibold text-foreground">{t.story.omahaChicago}</p>
      <p className="mt-1 text-xs text-success">{t.story.onTime} · unload 20:45</p>
    </div>
  );
}

export function HandoffVisual() {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-3">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
          {t.story.night}
        </p>
        <p className="mt-1 text-sm font-semibold">12 trucks</p>
      </div>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="text-secondary"
      >
        <ArrowRight className="h-4 w-4" />
      </motion.span>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
          {t.story.day}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
          {t.story.sameFacts}
          <Check className="h-3.5 w-3.5 text-success" />
        </p>
      </div>
    </div>
  );
}

export function ReportVisual() {
  const { t } = useI18n();
  return (
    <div className="space-y-2.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        {t.story.thisWeek}
      </p>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-xs text-muted">{t.story.payMile}</span>
        <span className="font-mono text-xs font-semibold">$2.14</span>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-xs text-muted">{t.story.dispatcher}</span>
        <span className="text-xs font-semibold text-success">{t.story.anaLate}</span>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-xs text-muted">{t.story.driver}</span>
        <span className="text-xs font-semibold text-success">{t.story.driverLate}</span>
      </div>
    </div>
  );
}
