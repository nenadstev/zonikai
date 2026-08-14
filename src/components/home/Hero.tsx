"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, MapPin, Phone, PhoneCall, Truck } from "lucide-react";
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
  const [callPhase, setCallPhase] = useState<"idle" | "calling" | "status">("idle");

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
    }, 8000);
    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    if (status === "on-time") {
      setCallPhase("idle");
      return;
    }
    setCallPhase("calling");
    const timer = setTimeout(() => setCallPhase("status"), 4000);
    return () => clearTimeout(timer);
  }, [status]);

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
            <span className="font-mono text-xs font-semibold text-white">#48291</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-300">
              <Truck className="h-3 w-3 text-[#a5b4fc]" /> T-1042
            </span>
          </div>
        </div>

        <div className="relative p-4">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <RouteMapAnimation theme="glass" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="animate-scan-line absolute left-0 right-0 h-8 bg-gradient-to-b from-secondary/0 via-secondary/15 to-secondary/0" />
            </div>

            <AnimatePresence>
              {callPhase === "calling" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-xl border border-secondary/40 bg-[#0f1424]/85 p-3 shadow-lg shadow-black/40 backdrop-blur-md"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/20 text-[#a5b4fc]">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#a5b4fc]">AI calling driver</p>
                    <p className="text-[11px] leading-snug text-neutral-400">Getting status for your team</p>
                  </div>
                  <VoiceWave />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {callPhase === "status" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute bottom-3 left-3 right-3 flex items-start gap-2 rounded-xl border border-warning/40 bg-[#1a140c]/85 p-3 shadow-lg shadow-black/40 backdrop-blur-md"
                >
                  <PhoneCall className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#fbbf24]" />
                  <p className="text-xs leading-snug text-neutral-200">
                    Breakdown on I-70. New ETA 20:45.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">Next stop</p>
              <p className="mt-1 text-sm font-semibold text-white">Chicago, IL</p>
              <p className="text-[11px] text-neutral-400">Unload</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">ETA</p>
              <p className="mt-1 font-mono text-base font-semibold text-white">
                {pad(eta.hours)}:{pad(eta.minutes)}:{pad(eta.seconds)}
              </p>
            </div>
            <div
              className={`rounded-xl border p-3 transition-colors ${
                status === "at-risk" ? "border-warning/40 bg-warning/15" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">Status</p>
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
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-white/10 bg-transparent px-4 py-2.5 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-[#a5b4fc]" /> I-80, NE · Live GPS</span>
        </div>
      </div>
    </motion.div>
  );
}

const stats = [
  { icon: MapPin, value: "Next-stop ETA", label: "Pickup or delivery" },
  { icon: PhoneCall, value: "Calls late drivers", label: "You get the answer" },
  { icon: ArrowRightLeft, value: "The work is done", label: "Your team does the rest" },
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
              24/7 tracking for trucking
            </span>

            <h1 className="mt-6 text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.7rem] lg:text-[3.05rem]">
              Know when every truck hits the next stop.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-300">
              Zonik watches every truck. You see the next stop and the ETA. If a truck
              is late, Zonik calls the driver. Your team only steps in when it counts.
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
