"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Phone, PhoneCall, Radio, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
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
      transition={{ duration: 0.7, delay: 0.25 }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-secondary/30 via-transparent to-secondary/5 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-xs font-semibold text-white">Live Operations</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 rounded-full bg-success/20 px-2 py-0.5 text-[10px] font-medium text-[#4ade80] sm:flex">
              <Radio className="h-3 w-3" /> GPS Active
            </span>
            <span className="font-mono text-[11px] text-neutral-400">#48291</span>
          </div>
        </div>

        <div className="relative p-4">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <RouteMapAnimation theme="glass" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="animate-scan-line absolute left-0 right-0 h-8 bg-gradient-to-b from-secondary/0 via-secondary/15 to-secondary/0" />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { label: "ETA", content: <span className="font-mono text-base font-semibold text-white">{pad(eta.hours)}:{pad(eta.minutes)}:{pad(eta.seconds)}</span> },
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
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[#4ade80]">
                    <MapPin className="h-3 w-3" /> I-80, NE · Live
                  </span>
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border p-3 transition-colors ${
                  item.highlight ? "border-warning/40 bg-warning/15" : "border-white/10 bg-white/[0.03] hover:border-secondary/40"
                } ${item.label === "GPS" ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">{item.label}</p>
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
                className="absolute bottom-16 left-4 right-4 flex items-center gap-3 rounded-xl border border-secondary/40 bg-[#0f1424]/85 p-3 shadow-lg shadow-black/40 backdrop-blur-md"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/20 text-[#a5b4fc]">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#a5b4fc]">AI Voice Agent calling driver</p>
                  <p className="truncate text-[11px] text-neutral-400">Confirming ETA · Updating dashboard...</p>
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
                className="absolute bottom-4 left-4 right-4 flex items-start gap-2 rounded-xl border border-danger/40 bg-[#1c0f14]/85 p-3 shadow-lg shadow-black/40 backdrop-blur-md"
              >
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f87171]" />
                <div>
                  <p className="text-xs font-semibold text-[#f87171]">Delay detected — action needed</p>
                  <p className="text-[11px] text-[#fca5a5]">Load #48291 · Driver stationary 45 min</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 border-t border-white/10 bg-transparent px-4 py-2.5 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5"><Truck className="h-3 w-3 text-[#a5b4fc]" /> T-1042</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-[#a5b4fc]" /> 3 trucks on route</span>
        </div>
      </div>
    </motion.div>
  );
}

const stats = [
  { icon: Radio, value: "All night", label: "Loads watched" },
  { icon: PhoneCall, value: "AI calls", label: "Drivers when needed" },
  { icon: ShieldCheck, value: "You decide", label: "Only on trouble" },
];

export function Hero() {
  return (
    <section className="relative -mt-14 flex min-h-[94vh] items-center overflow-hidden bg-[#0a0d16]">
      {/* Background truck photo */}
      <Image
        src="/hero/truck-hero.jpg"
        alt="Freight truck on the highway at dusk"
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover object-center"
      />

      {/* Legibility + brand color overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d16]/94 via-[#0a0d16]/50 to-[#0a0d16]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-transparent to-[#0a0d16]/35" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-secondary/20 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-28 pb-16 sm:px-6 md:pt-32 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-md">
              <BrandMark size={16} className="h-4 w-4" />
              AI after-hours tracking for trucking
            </span>

            <h1 className="mt-6 text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.7rem] lg:text-[3.05rem]">
              Every load monitored. Every risk detected.{" "}
              <span className="bg-gradient-to-r from-[#a5b4fc] to-[#818cf8] bg-clip-text text-transparent">
                Your AI after-hours tracking agent.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-neutral-300">
              Zonik watches your trucks at night. It calls drivers when something looks
              wrong. Your team sees every load on one screen.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="accent" size="lg">
                Book a Demo
              </Button>
              <Button href="/#how-it-works" variant="outlineDark" size="lg">
                See How It Works
              </Button>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.07] px-3.5 py-3 backdrop-blur-md"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-[#a5b4fc]">
                    <stat.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight text-white">{stat.value}</p>
                    <p className="mt-0.5 text-xs leading-snug text-neutral-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
