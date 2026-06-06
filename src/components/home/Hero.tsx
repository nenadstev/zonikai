"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Phone, Radio, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TruckIllustration } from "@/components/ui/TruckIllustration";

function VoiceWave() {
  return (
    <div className="flex h-4 items-end gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-accent"
          animate={{ height: [4, 14, 6, 16, 4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
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
    <div className="card-clean overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-xs font-medium text-muted">Live Operations</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1 text-[11px] text-muted sm:flex">
            <Radio className="h-3 w-3 text-accent" />
            GPS Active
          </span>
          <span className="font-mono text-[11px] text-muted">#48291</span>
        </div>
      </div>

      <div className="relative p-4">
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
          <svg viewBox="0 0 400 180" className="h-auto w-full">
            <rect width="400" height="180" fill="#FAFAFA" />
            {[...Array(6)].map((_, i) => (
              <line key={i} x1="0" y1={i * 36} x2="400" y2={i * 36} stroke="#F0F0F0" strokeWidth="1" />
            ))}
            <path
              d="M 30 130 Q 90 50 160 80 T 280 70 T 370 100"
              fill="none"
              stroke="#E8E8E8"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <path
              d="M 30 130 Q 90 50 160 80 T 280 70 T 370 100"
              fill="none"
              stroke="#818CF8"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle cx="30" cy="130" r="5" fill="#16A34A" opacity="0.2" />
            <circle cx="30" cy="130" r="2.5" fill="#16A34A" className="animate-pulse-dot" />
            <circle cx="370" cy="100" r="5" fill="#818CF8" opacity="0.2" />
            <circle cx="370" cy="100" r="2.5" fill="#818CF8" className="animate-pulse-dot" />
            <motion.g
              animate={{ x: [0, 55, 110, 170, 230, 290, 340], y: [0, -80, -50, -60, -80, -60, -30] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <rect x="-7" y="-3" width="12" height="6" rx="1" fill="#818CF8" />
              <rect x="3" y="-1.5" width="5" height="4" rx="0.5" fill="#C7D2FE" />
              <circle cx="-3" cy="4" r="1.5" fill="#71717A" />
              <circle cx="6" cy="4" r="1.5" fill="#71717A" />
            </motion.g>
          </svg>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="animate-scan-line absolute left-0 right-0 h-8 bg-gradient-to-b from-accent/0 via-accent/5 to-accent/0" />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-white p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">ETA</p>
            <p className="mt-1 font-mono text-base font-semibold tracking-tight">
              {pad(eta.hours)}:{pad(eta.minutes)}:{pad(eta.seconds)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Status</p>
            <div className="mt-1">
              <AnimatePresence mode="wait">
                <motion.div key={status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <StatusBadge variant={status === "on-time" ? "success" : "warning"}>
                    {status === "on-time" ? "On Time" : "At Risk"}
                  </StatusBadge>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="col-span-2 rounded-xl border border-border bg-white p-3 sm:col-span-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">GPS</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-success">
              <MapPin className="h-3 w-3" /> I-80, NE · Live
            </p>
          </div>
        </div>

        <AnimatePresence>
          {voiceActive && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute bottom-16 left-4 right-4 flex items-center gap-3 rounded-xl border border-accent/20 bg-accent-soft p-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                <Phone className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground">AI Voice Agent calling driver</p>
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
              className="absolute bottom-4 left-4 right-4 flex items-start gap-2 rounded-xl border border-danger/15 bg-danger-bg p-3"
            >
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
              <div>
                <p className="text-xs font-medium text-danger">Delay detected</p>
                <p className="text-[11px] text-danger/80">Load #48291 — Driver stationary 45 min</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted">
        <span className="flex items-center gap-1.5"><Truck className="h-3 w-3" /> T-1042</span>
        <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> 3 trucks on route</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll>
            <span className="section-label">
              <TruckIllustration variant="icon" className="h-4 w-4 text-secondary-dark" />
              After-hours freight tracking
            </span>

            <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.25rem]">
              Your after-hours tracking team.{" "}
              <span className="text-highlight">Powered by AI.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-[17px]">
              Zonik AI monitors every active load, tracks GPS in real time,
              calls drivers with voice agents, and lets{" "}
              <span className="font-medium text-secondary-dark">one operator orchestrate</span>{" "}
              what used to take a team of ten.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">Book a Demo</Button>
              <Button href="/#how-it-works" variant="secondary" size="lg">
                See How It Works
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 border-t border-border pt-8">
              {[
                { label: "GPS tracking", value: "24/7" },
                { label: "Voice agents", value: "Auto-call" },
                { label: "Loads monitored", value: "Real-time" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-sm font-semibold text-secondary-dark">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </div>
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
