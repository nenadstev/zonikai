"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Phone, Radio, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { RouteMapAnimation } from "@/components/ui/RouteMapAnimation";

function VoiceWave() {
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

function HeroDashboard() {
  const [eta, setEta] = useState({ hours: 2, minutes: 14, seconds: 32 });
  const [status, setStatus] = useState<"on-time" | "at-risk">("on-time");
  const [showAlert, setShowAlert] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 2; minutes = 14; seconds = 32; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatus((s) => (s === "on-time" ? "at-risk" : "on-time"));
    }, 7000);
    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    const voiceInterval = setInterval(() => {
      setVoiceActive(true);
      setTimeout(() => setVoiceActive(false), 5000);
    }, 12000);
    const alertInterval = setInterval(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    }, 14000);
    return () => {
      clearInterval(voiceInterval);
      clearInterval(alertInterval);
    };
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-secondary/20 via-transparent to-secondary/5 blur-2xl" />
      <div className="card-clean relative overflow-hidden shadow-[0_24px_60px_rgba(99,102,241,0.12)]">
        <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-accent-soft/50 to-white px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-xs font-semibold text-secondary-dark">Live Operations</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 rounded-full bg-success-bg px-2 py-0.5 text-[10px] font-medium text-success sm:flex">
              <Radio className="h-3 w-3" /> GPS Active
            </span>
            <span className="font-mono text-[11px] text-muted">#48291</span>
          </div>
        </div>

        <div className="relative p-4">
          <div className="relative overflow-hidden rounded-xl border border-secondary/15 bg-surface">
            <RouteMapAnimation />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="animate-scan-line absolute left-0 right-0 h-8 bg-gradient-to-b from-secondary/0 via-secondary/10 to-secondary/0" />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { label: "ETA", content: <span className="font-mono text-base font-semibold">{pad(eta.hours)}:{pad(eta.minutes)}:{pad(eta.seconds)}</span> },
              {
                label: "Status",
                content: (
                  <AnimatePresence mode="wait">
                    <motion.div key={status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <StatusBadge variant={status === "on-time" ? "success" : "warning"}>
                        {status === "on-time" ? "On Time" : "At Risk"}
                      </StatusBadge>
                    </motion.div>
                  </AnimatePresence>
                ),
                highlight: status === "at-risk",
              },
              {
                label: "GPS",
                content: (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-success">
                    <MapPin className="h-3 w-3" /> I-80, NE · Live
                  </span>
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border p-3 transition-colors ${
                  item.highlight ? "border-warning/30 bg-warning-bg" : "border-border bg-white hover:border-secondary/30"
                } ${item.label === "GPS" ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">{item.label}</p>
                <div className="mt-1">{item.content}</div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {voiceActive && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute bottom-16 left-4 right-4 flex items-center gap-3 rounded-xl border border-secondary/30 bg-accent-soft p-3 shadow-lg shadow-secondary/10"
              >
                <div className="icon-chip h-8 w-8 shrink-0 bg-white">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-secondary-dark">AI Voice Agent calling driver</p>
                  <p className="truncate text-[11px] text-muted">Confirming ETA · Updating dashboard...</p>
                </div>
                <VoiceWave />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute bottom-4 left-4 right-4 flex items-start gap-2 rounded-xl border border-danger/20 bg-danger-bg p-3"
              >
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
                <div>
                  <p className="text-xs font-semibold text-danger">Delay detected — action needed</p>
                  <p className="text-[11px] text-danger/80">Load #48291 · Driver stationary 45 min</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 border-t border-border bg-surface/50 px-4 py-2.5 text-[11px] text-muted">
          <span className="flex items-center gap-1.5"><Truck className="h-3 w-3 text-secondary" /> T-1042</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-secondary" /> 3 trucks on route</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="section-accent relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll>
            <span className="section-label">
              <BrandMark size={16} className="h-4 w-4" />
              After-hours freight tracking
            </span>

            <h1 className="mt-6 text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[2.5rem] lg:text-[2.85rem]">
              Every load monitored. Every risk detected.{" "}
              <span className="headline-accent">Your AI after-hours tracking agent.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-[17px]">
              Zonik AI continuously monitors active loads, detects delays and GPS issues,
              and alerts your team exactly when action is needed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="accent" size="lg">Book a Demo</Button>
              <Button href="/#how-it-works" variant="secondary" size="lg">See How It Works</Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border/80 pt-8">
              {[
                { label: "GPS monitoring", value: "24/7", desc: "Every truck, every route" },
                { label: "Voice agents", value: "Auto-call", desc: "Drivers, not dispatchers" },
                { label: "Your team", value: "Exceptions only", desc: "No manual check calls" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  className="group rounded-xl border border-transparent p-3 transition-all hover:border-secondary/25 hover:bg-white/80 hover:shadow-sm"
                >
                  <p className="text-sm font-bold text-secondary-dark group-hover:text-secondary-dark">{stat.value}</p>
                  <p className="mt-0.5 text-xs font-semibold text-foreground">{stat.label}</p>
                  <p className="mt-1 text-[10px] leading-snug text-muted">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15} direction="right">
            <HeroDashboard />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
