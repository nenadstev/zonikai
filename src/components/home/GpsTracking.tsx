"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Satellite, Signal, Truck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { RouteMapAnimation } from "@/components/ui/RouteMapAnimation";
import { TruckIllustration } from "@/components/ui/TruckIllustration";
import { StatusBadge } from "@/components/ui/StatusBadge";

const trucks = [
  { id: "T-1042", location: "I-80, Nebraska", speed: "62 mph", status: "success" as const, label: "On Time" },
  { id: "T-2187", location: "I-70, Kansas", speed: "0 mph", status: "warning" as const, label: "Stationary" },
  { id: "T-3301", location: "Last ping: Dallas", speed: "—", status: "danger" as const, label: "GPS Offline" },
];

export function GpsTracking() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % trucks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionShell id="gps" variant="dark" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            dark
            label="Live GPS"
            title="Know where every truck is —"
            titleAccent="without opening a single portal."
            punchline="GPS location, speed, and route progress checked continuously. Not on a manual refresh."
          />
        </AnimateOnScroll>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll direction="left">
            <div className="card-clean relative overflow-hidden p-1">
              <div className="relative overflow-hidden rounded-[0.75rem] border border-neutral-800 bg-neutral-900/50 p-4">
                <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-[11px] font-medium text-neutral-300">
                  <Signal className="h-3 w-3 text-success" />
                  3 signals live
                </div>
                <RouteMapAnimation theme="dark" showLabels />

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { icon: Satellite, label: "Satellite lock" },
                    { icon: Navigation, label: "Route match" },
                    { icon: MapPin, label: "Stop ETA" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center rounded-lg border border-neutral-700 bg-neutral-800/80 py-2.5">
                      <Icon className="h-3.5 w-3.5 text-secondary" />
                      <span className="mt-1 text-[10px] text-neutral-400">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="right">
            <div className="space-y-3">
              {trucks.map((truck, i) => (
                <motion.div
                  key={truck.id}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                    activeIndex === i
                      ? "border-secondary/50 bg-accent-soft/10 shadow-[0_0_24px_rgba(129,140,248,0.15)]"
                      : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
                  }`}
                  animate={{ scale: activeIndex === i ? 1.02 : 1 }}
                >
                  <div className="icon-chip h-10 w-10 shrink-0">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{truck.id}</span>
                      <StatusBadge variant={truck.status}>{truck.label}</StatusBadge>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {truck.location} · {truck.speed}
                    </p>
                  </div>
                  <TruckIllustration variant="icon" className="hidden h-6 w-6 shrink-0 text-secondary/30 sm:block" />
                </motion.div>
              ))}
            </div>

            <p className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-sm leading-relaxed text-neutral-400">
              <span className="font-semibold text-[#a5b4fc]">Signal drops instantly flagged.</span>{" "}
              When GPS goes offline or a truck goes off-route, Zonik AI alerts your team — no waiting for the next manual check.
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </SectionShell>
  );
}
