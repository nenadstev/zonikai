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

const STEP_MS = 5000;

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect load & GPS data",
    description:
      "Pull active loads from your TMS and live GPS from your ELD — synced automatically, no spreadsheets.",
    tag: "One-time setup",
    Visual: ConnectVisual,
  },
  {
    number: "02",
    icon: Eye,
    title: "Monitor every load 24/7",
    description:
      "Zonik watches location, ETA, stop status, and delays around the clock — your team never refreshes a portal.",
    tag: "Always on",
    Visual: MonitorVisual,
  },
  {
    number: "03",
    icon: PhoneCall,
    title: "AI calls drivers when needed",
    description:
      "When something looks off, the Voice Agent calls the driver, confirms status, and updates the dashboard.",
    tag: "No check calls",
    Visual: VoiceVisual,
    featured: true,
  },
  {
    number: "04",
    icon: Bell,
    title: "Alert your team on exceptions",
    description:
      "Your after-hours operator sees only loads that need action — everything else stays quiet on the board.",
    tag: "Exceptions only",
    Visual: AlertVisual,
  },
];

function StepTimeline({
  active,
  onSelect,
  progress,
}: {
  active: number;
  onSelect: (i: number) => void;
  progress: number;
}) {
  return (
    <div className="relative">
      {/* Desktop connector */}
      <div className="absolute left-[12%] right-[12%] top-5 hidden h-px bg-border md:block" />
      <motion.div
        className="absolute left-[12%] top-[19px] hidden h-0.5 rounded-full bg-gradient-to-r from-secondary via-secondary to-secondary-dark md:block"
        animate={{ scaleX: progress }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "76%", transformOrigin: "left" }}
      />

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {steps.map((step, i) => {
          const isActive = active === i;
          const isDone = active > i;
          return (
            <button
              key={step.number}
              type="button"
              onClick={() => onSelect(i)}
              className={cn(
                "group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-300 md:items-center md:p-4 md:text-center",
                isActive &&
                  "border-secondary bg-accent-soft/50 shadow-[0_8px_30px_rgba(129,140,248,0.12)] ring-1 ring-secondary/20",
                isDone && !isActive && "border-secondary/30 bg-accent-soft/20",
                !isActive && !isDone && "border-border bg-white hover:border-secondary/30 hover:bg-accent-soft/10"
              )}
            >
              <div className="flex w-full items-center justify-between md:flex-col md:gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                    isActive && "icon-chip",
                    isDone && !isActive && "bg-accent-soft text-secondary-dark",
                    !isActive && !isDone && "bg-surface text-muted group-hover:bg-accent-soft/60"
                  )}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "font-mono text-[10px] font-bold md:mt-1",
                    isActive ? "text-secondary" : "text-muted"
                  )}
                >
                  {step.number}
                </span>
              </div>
              <p
                className={cn(
                  "mt-2 text-xs font-semibold leading-snug md:text-[13px]",
                  isActive ? "text-secondary-dark" : "text-foreground"
                )}
              >
                {step.title}
              </p>
              <span className="mt-1 hidden rounded-full bg-surface px-2 py-0.5 text-[9px] font-medium text-muted md:inline-block">
                {step.tag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setProgress(i / (steps.length - 1));
    setPaused(true);
    setTimeout(() => setPaused(false), 12000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((s) => {
        const next = (s + 1) % steps.length;
        setProgress(next / (steps.length - 1));
        return next;
      });
    }, STEP_MS);
    return () => clearInterval(interval);
  }, [paused]);

  const step = steps[active];
  const Visual = step.Visual;

  return (
    <SectionShell id="how-it-works" variant="default">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="How it works"
            title="Four steps."
            titleAccent="Zero manual monitoring."
            punchline="Connect your data once. Zonik runs the loop — watch each step below."
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.08}>
          <div className="card-clean overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            {/* Timeline selector */}
            <div className="border-b border-border bg-surface/30 p-4 md:p-6">
              <StepTimeline active={active} onSelect={goTo} progress={progress} />
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
                        AI-powered
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

                  {/* Auto-advance bar */}
                  {!paused && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border">
                      <motion.div
                        key={`bar-${active}`}
                        className="h-full bg-secondary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  )}
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
                      <p className="mt-4 text-xs font-medium text-secondary-dark">
                        Tap any step above · Auto-plays every {STEP_MS / 1000}s
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex gap-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to step ${i + 1}`}
                        onClick={() => goTo(i)}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-colors",
                          i === active ? "bg-secondary" : "bg-border hover:bg-secondary/40"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom flow summary */}
            <div className="grid divide-y border-t border-border md:grid-cols-4 md:divide-x md:divide-y-0">
              {[
                "TMS + ELD → Zonik",
                "24/7 risk scan",
                "Driver contacted by AI",
                "Team alerted once",
              ].map((label, i) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-center md:justify-center md:px-3",
                    i === active && "bg-accent-soft/40"
                  )}
                >
                  <span className="font-mono text-[9px] font-bold text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-medium text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
