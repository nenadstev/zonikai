"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Eye, Link2, PhoneCall } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import {
  AlertVisual,
  ConnectVisual,
  MonitorVisual,
  VoiceVisual,
} from "@/components/home/HowItWorksVisuals";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Link2,
    shortTitle: "Connected to your TMS and ELD",
    title: "Zonik is connected to your TMS and ELD",
    description:
      "It pulls your loads and live GPS. You don't type anything in. No new hardware.",
    Visual: ConnectVisual,
    holdMs: 5000,
  },
  {
    number: "02",
    icon: Eye,
    shortTitle: "Watches every truck",
    title: "Zonik watches every truck",
    description:
      "It tracks GPS and the time to the next pickup or delivery. All day, every day. Nobody has to refresh a screen.",
    Visual: MonitorVisual,
    holdMs: 5000,
  },
  {
    number: "03",
    icon: PhoneCall,
    shortTitle: "Calls drivers who are late",
    title: "Zonik calls drivers who are late",
    description:
      "If a truck is late, Zonik calls the driver. It asks what happened. The answer goes to your team.",
    Visual: VoiceVisual,
    featured: true,
    holdMs: 9500,
  },
  {
    number: "04",
    icon: Bell,
    shortTitle: "Tells your team the status",
    title: "Zonik tells your team the status",
    description:
      "They only hear about trucks in trouble. The rest stays quiet.",
    Visual: AlertVisual,
    holdMs: 5000,
  },
];

function StepTimeline({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-[12%] right-[12%] top-[15px] hidden h-px bg-border md:block"
        aria-hidden
      />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
        {steps.map((step, i) => {
          const isActive = active === i;
          const isDone = active > i;
          return (
            <button
              key={step.number}
              type="button"
              onClick={() => onSelect(i)}
              className="group relative flex flex-col items-start text-left md:items-center md:px-3 md:text-center"
            >
              <span
                className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors",
                  isActive && "border-secondary bg-secondary text-white",
                  isDone && !isActive && "border-secondary/40 bg-accent-soft text-secondary-dark",
                  !isActive && !isDone && "border-border bg-white text-muted group-hover:border-secondary/40"
                )}
              >
                {i + 1}
              </span>
              <p
                className={cn(
                  "mt-3 text-sm font-semibold leading-snug",
                  isActive ? "text-secondary-dark" : "text-foreground"
                )}
              >
                {step.shortTitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 12000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const holdMs = steps[active].holdMs;
    const timeout = setTimeout(() => {
      setActive((s) => (s + 1) % steps.length);
    }, holdMs);
    return () => clearTimeout(timeout);
  }, [paused, active]);

  const step = steps[active];
  const Visual = step.Visual;

  return (
    <SectionShell id="how-it-works" variant="default">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="How it works"
            title="Zonik knows every truck and every load."
            titleAccent="Tracks them 24/7."
            punchline="Here's what it does to help your after-hours and dispatch teams."
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.08}>
          <div className="card-clean overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            {/* Timeline selector */}
            <div className="border-b border-border bg-surface/30 p-4 md:p-6">
              <StepTimeline active={active} onSelect={goTo} />
            </div>

            {/* Main visual stage */}
            <div className="relative bg-gradient-to-br from-white via-accent-soft/20 to-white">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.08),transparent_70%)]" />

              <div className="relative grid lg:grid-cols-[1fr_340px]">
                <div className="relative min-h-[260px] border-b border-border lg:min-h-[320px] lg:border-b-0 lg:border-r">
                  {/* Step indicator pill */}
                  <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-bold text-white"
                    >
                      Step {step.number}
                    </motion.span>
                    {step.featured && (
                      <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[9px] font-semibold text-secondary-dark">
                        AI call
                      </span>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full"
                    >
                      <Visual active />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Narrative panel */}
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="icon-chip mb-4 h-11 w-11">
                        <step.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold tracking-[-0.02em] md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
                        {step.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
