"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  Database,
  MapPin,
  Phone,
  Radio,
  Truck,
  Wifi,
} from "lucide-react";
import { RouteMapAnimation } from "@/components/ui/RouteMapAnimation";
import { BrandMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

function VoiceBars({ active }: { active: boolean }) {
  return (
    <div className="flex h-4 items-end gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-secondary"
          animate={active ? { height: [3, 14, 6, 12, 4] } : { height: 3 }}
          transition={
            active
              ? { duration: 0.7, repeat: Infinity, delay: i * 0.08 }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

export function ConnectVisual({ active }: { active: boolean }) {
  const sources = [
    { label: "TMS", sub: "Active loads", icon: Database, side: "left" as const },
    { label: "ELD / GPS", sub: "Live location", icon: MapPin, side: "right" as const },
  ];

  return (
    <div className="relative flex h-full min-h-[220px] items-center justify-center px-4 py-6">
      <div className="grid w-full max-w-md grid-cols-[1fr_auto_1fr] items-center gap-3">
        {sources.map((src) => (
          <motion.div
            key={src.label}
            animate={{ opacity: active ? 1 : 0.55, y: active ? 0 : 4 }}
            className="rounded-xl border border-border bg-white p-3 shadow-sm"
          >
            <div className="icon-chip mx-auto h-9 w-9">
              <src.icon className="h-4 w-4" />
            </div>
            <p className="mt-2 text-center text-xs font-semibold">{src.label}</p>
            <p className="text-center text-[10px] text-muted">{src.sub}</p>
            {src.side === "left" && (
              <div className="mt-2 space-y-1">
                {["#48291", "#48305"].map((id, j) => (
                  <motion.div
                    key={id}
                    className="rounded-md bg-surface px-2 py-1 font-mono text-[9px] text-muted"
                    animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.4 }}
                    transition={{ duration: 2, repeat: Infinity, delay: j * 0.4 }}
                  >
                    {id}
                  </motion.div>
                ))}
              </div>
            )}
            {src.side === "right" && (
              <div className="mt-2 flex justify-center gap-1">
                {[0, 1, 2].map((j) => (
                  <motion.span
                    key={j}
                    className="h-1.5 w-1.5 rounded-full bg-success"
                    animate={active ? { opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] } : { opacity: 0.3, scale: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.3 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}

        <div className="relative flex flex-col items-center">
          <svg className="absolute -inset-x-8 top-1/2 h-8 w-[calc(100%+4rem)] -translate-y-1/2 overflow-visible" aria-hidden>
            <motion.line
              x1="0"
              y1="16"
              x2="56"
              y2="16"
              stroke="#818CF8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={active ? { strokeDashoffset: [0, -16] } : { strokeDashoffset: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="144"
              y1="16"
              x2="88"
              y2="16"
              stroke="#818CF8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={active ? { strokeDashoffset: [0, -16] } : { strokeDashoffset: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </svg>
          <motion.div
            animate={
              active
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(129,140,248,0.4)",
                      "0 0 0 8px rgba(129,140,248,0)",
                      "0 0 0 0 rgba(129,140,248,0)",
                    ],
                  }
                : { boxShadow: "0 0 0 0 rgba(129,140,248,0)" }
            }
            transition={{ duration: 2, repeat: Infinity }}
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg"
          >
            <BrandMark size={28} className="h-7 w-7" />
          </motion.div>
        </div>
      </div>

      <motion.p
        animate={{ opacity: active ? 1 : 0.4 }}
        className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-medium text-secondary-dark"
      >
        Data synced · No manual import
      </motion.p>
    </div>
  );
}

export function MonitorVisual({ active }: { active: boolean }) {
  const loads = [
    { id: "#48291", status: "On time", tone: "success" as const },
    { id: "#48305", status: "At risk", tone: "warning" as const },
    { id: "#48312", status: "On time", tone: "success" as const },
    { id: "#48318", status: "Critical", tone: "danger" as const },
  ];

  return (
    <div className="relative flex h-full min-h-[220px] flex-col gap-3 px-4 py-5">
      <div className="relative overflow-hidden rounded-xl border border-border bg-white">
        {active && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-secondary/15 to-transparent"
            animate={{ y: ["-100%", "400%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <div className="flex items-center justify-between border-b border-border bg-surface/60 px-3 py-2">
          <span className="text-[10px] font-semibold">Live fleet board</span>
          <span className="flex items-center gap-1 text-[9px] text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            Monitoring
          </span>
        </div>
        <div className="divide-y divide-border">
          {loads.map((load, i) => (
            <motion.div
              key={load.id}
              animate={
                active && load.tone !== "success"
                  ? {
                      backgroundColor: [
                        "#ffffff",
                        load.tone === "warning" ? "#fff7ed" : "#fef2f2",
                        "#ffffff",
                      ],
                    }
                  : { backgroundColor: "#ffffff" }
              }
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
              className="flex items-center justify-between px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <Truck className="h-3 w-3 text-muted" />
                <span className="font-mono text-[10px] font-medium">{load.id}</span>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                  load.tone === "success" && "bg-success-bg text-success",
                  load.tone === "warning" && "bg-warning-bg text-warning",
                  load.tone === "danger" && "bg-danger-bg text-danger"
                )}
              >
                {load.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <RouteMapAnimation compact showLabels={false} height="h-16 w-full" />
    </div>
  );
}

export function VoiceVisual({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3200);
    const loop = setInterval(() => {
      setPhase(0);
      setTimeout(() => setPhase(1), 600);
      setTimeout(() => setPhase(2), 1800);
      setTimeout(() => setPhase(3), 3200);
    }, 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(loop);
    };
  }, [active]);

  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 px-4 py-5">
      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        <motion.div
          animate={{ scale: active && phase >= 1 ? 1.02 : 1 }}
          className="rounded-xl border border-secondary/30 bg-accent-soft/60 p-3"
        >
          <div className="flex items-center gap-2">
            <div className="icon-chip h-8 w-8">
              <Radio className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold">AI Voice Agent</p>
              <VoiceBars active={active && phase >= 1 && phase < 3} />
            </div>
          </div>
          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 rounded-lg bg-white px-2 py-1.5 text-[9px] leading-snug text-muted"
            >
              &ldquo;Hi, this is Zonik. Can you confirm your status?&rdquo;
            </motion.p>
          )}
        </motion.div>

        <motion.div
          animate={{
            borderColor: active && phase >= 1 ? "#818CF8" : "#e8e8e8",
          }}
          className="rounded-xl border border-border bg-white p-3"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
              <Phone className="h-3.5 w-3.5 text-muted" />
            </div>
            <div>
              <p className="text-[10px] font-semibold">Driver · T-2187</p>
              <p className="text-[9px] text-muted">M. Johnson</p>
            </div>
          </div>
          {phase >= 1 && phase < 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center gap-1 text-[9px] font-medium text-secondary-dark"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-secondary"
              />
              Call in progress…
            </motion.div>
          )}
          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-start gap-1 rounded-lg bg-success-bg px-2 py-1.5 text-[9px] text-success"
            >
              <Check className="mt-0.5 h-3 w-3 shrink-0" />
              &ldquo;Breakdown on I-70. ETA +2 hr.&rdquo;
            </motion.p>
          )}
        </motion.div>
      </div>

      {phase >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-[10px]"
        >
          <Wifi className="h-3 w-3 text-success" />
          Dashboard updated · Delay +2 hr · Risk: At Risk
        </motion.div>
      )}
    </div>
  );
}

export function AlertVisual({ active }: { active: boolean }) {
  const quietLoads = ["#48291", "#48312", "#48320", "#48325", "#48330"];

  return (
    <div className="relative flex h-full min-h-[220px] flex-col px-4 py-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold text-muted">After-hours operator view</p>
        <span className="rounded-full bg-success-bg px-2 py-0.5 text-[9px] font-semibold text-success">
          4 loads quiet
        </span>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2">
        <div className="space-y-1.5">
          {quietLoads.map((id) => (
            <motion.div
              key={id}
              animate={{ opacity: active ? 0.35 : 0.25 }}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface/40 px-2 py-1.5"
            >
              <Truck className="h-2.5 w-2.5 text-muted" />
              <span className="font-mono text-[9px] text-muted">{id}</span>
              <Check className="ml-auto h-2.5 w-2.5 text-success/60" />
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={
            active
              ? {
                  scale: [1, 1.02, 1],
                  boxShadow: [
                    "0 4px 20px rgba(220,38,38,0.15)",
                    "0 8px 30px rgba(220,38,38,0.25)",
                    "0 4px 20px rgba(220,38,38,0.15)",
                  ],
                }
              : { scale: 1, boxShadow: "0 4px 20px rgba(220,38,38,0.15)" }
          }
          transition={{ duration: 2, repeat: Infinity }}
          className="relative flex flex-col rounded-xl border-2 border-danger/40 bg-danger-bg p-3"
        >
          <motion.div
            animate={active ? { rotate: [0, 12, -12, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-danger text-white shadow-md"
          >
            <Bell className="h-3.5 w-3.5" />
          </motion.div>
          <p className="text-[10px] font-bold text-danger">Action needed</p>
          <p className="mt-1 font-mono text-xs font-semibold">#48318</p>
          <p className="mt-1 text-[9px] leading-snug text-muted">
            GPS offline · Truck stationary · Next stop late
          </p>
          <motion.span
            animate={active ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-auto inline-block rounded-lg bg-danger px-2 py-1.5 text-center text-[9px] font-semibold text-white"
          >
            Review now →
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
