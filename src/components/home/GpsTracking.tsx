"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Satellite, Signal, Truck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
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
    <section id="gps" className="border-y border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="Live GPS"
            title="Every truck. Every route. Always visible."
            subtitle="Zonik AI continuously tracks GPS location, speed, and route progress — so your team always knows where every load stands."
          />
        </AnimateOnScroll>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll direction="left">
            <div className="card-clean relative overflow-hidden p-1">
              <div className="relative overflow-hidden rounded-[0.75rem] bg-surface p-6">
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-muted">
                  <Signal className="h-3 w-3 text-success" />
                  3 signals live
                </div>

                <svg viewBox="0 0 360 220" className="w-full">
                  <rect width="360" height="220" fill="#FAFAFA" rx="8" />
                  {[...Array(7)].map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 33} x2="360" y2={i * 33} stroke="#F0F0F0" strokeWidth="0.5" />
                  ))}
                  {[...Array(9)].map((_, i) => (
                    <line key={`v${i}`} x1={i * 45} y1="0" x2={i * 45} y2="220" stroke="#F0F0F0" strokeWidth="0.5" />
                  ))}

                  <path
                    d="M 40 180 Q 100 60 180 100 T 320 80"
                    fill="none"
                    stroke="#E8E8E8"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                  <path
                    d="M 40 180 Q 100 60 180 100 T 320 80"
                    fill="none"
                    stroke="#818CF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                  />

                  {[
                    { cx: 40, cy: 180, color: "#16A34A" },
                    { cx: 180, cy: 100, color: "#818CF8" },
                    { cx: 320, cy: 80, color: "#EA580C" },
                  ].map((point, i) => (
                    <g key={i}>
                      <circle cx={point.cx} cy={point.cy} r="12" fill={point.color} opacity="0.1" />
                      <motion.circle
                        cx={point.cx}
                        cy={point.cy}
                        r="4"
                        fill={point.color}
                        animate={{ opacity: activeIndex === i ? 1 : 0.4, scale: activeIndex === i ? 1.3 : 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </g>
                  ))}

                  <motion.g
                    animate={{ x: [0, 70, 140, 210, 280], y: [0, -120, -80, -100, -100] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    <rect x="-6" y="-2.5" width="10" height="5" rx="0.8" fill="#818CF8" />
                    <rect x="2.5" y="-1" width="4" height="3.5" rx="0.4" fill="#C7D2FE" />
                    <circle cx="-2.5" cy="3.5" r="1.2" fill="#71717A" />
                    <circle cx="5" cy="3.5" r="1.2" fill="#71717A" />
                  </motion.g>
                </svg>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { icon: Satellite, label: "Satellite lock" },
                    { icon: Navigation, label: "Route match" },
                    { icon: MapPin, label: "Stop ETA" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center rounded-lg border border-border bg-white py-2.5">
                      <Icon className="h-3.5 w-3.5 text-secondary-dark" />
                      <span className="mt-1 text-[10px] text-muted">{label}</span>
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
                  className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                    activeIndex === i
                      ? "border-accent/30 bg-accent-soft/50"
                      : "border-border bg-white"
                  }`}
                  animate={{ scale: activeIndex === i ? 1.01 : 1 }}
                >
                  <div className="icon-chip h-10 w-10 shrink-0">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{truck.id}</span>
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

            <p className="mt-6 text-sm leading-relaxed text-muted">
              GPS data is checked continuously — not on a manual refresh cycle.
              When a signal drops or a truck goes off-route, Zonik AI flags it
              immediately.
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
