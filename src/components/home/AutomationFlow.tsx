"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  MapPin,
  Phone,
  RefreshCw,
  Truck,
  Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TruckIllustration } from "@/components/ui/TruckIllustration";
import { cn } from "@/lib/utils";

const nodes = [
  { icon: Truck, label: "Active Loads", sub: "TMS sync" },
  { icon: MapPin, label: "GPS Feed", sub: "Live location" },
  { icon: Bot, label: "AI Monitor", sub: "Risk detection" },
  { icon: Phone, label: "Voice Agent", sub: "Driver calls" },
  { icon: RefreshCw, label: "Dashboard", sub: "Auto-update" },
  { icon: Bell, label: "Team Alert", sub: "When needed" },
];

const STEP_MS = 1400;

function ProcessPipeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % nodes.length);
    }, STEP_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(activeStep / (nodes.length - 1));
  }, [activeStep]);

  return (
    <div className="relative">
      {/* Desktop: horizontal process line behind nodes */}
      <div className="relative hidden lg:block">
        <div className="absolute left-[8%] right-[8%] top-[2.75rem] h-px bg-border" />
        <motion.div
          className="absolute left-[8%] top-[2.65rem] h-0.5 rounded-full bg-gradient-to-r from-secondary/40 via-secondary to-secondary-dark"
          initial={false}
          animate={{
            scaleX: progress,
            opacity: progress > 0 ? 1 : 0.35,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "84%", transformOrigin: "left" }}
        />
        <motion.div
          className="absolute top-[2.35rem] z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_12px_rgba(129,140,248,0.8)]"
          animate={{ left: `${8 + progress * 84}%` }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Mobile: vertical process line */}
      <div className="absolute bottom-4 left-[1.65rem] top-4 w-px bg-border lg:hidden" />
      <motion.div
        className="absolute left-[1.6rem] top-4 z-10 w-0.5 origin-top rounded-full bg-gradient-to-b from-secondary/40 via-secondary to-secondary-dark lg:hidden"
        animate={{ scaleY: progress }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: "calc(100% - 2rem)" }}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
        {nodes.map((node, i) => {
          const isActive = activeStep === i;
          const isComplete = activeStep > i;
          const isPending = activeStep < i;

          return (
            <motion.div
              key={node.label}
              animate={{
                scale: isActive ? 1.03 : 1,
              }}
              transition={{ duration: 0.35 }}
              className={cn(
                "relative flex flex-col items-center rounded-xl border bg-white p-4 text-center transition-colors duration-300",
                "lg:pl-3 lg:pr-3",
                isActive && "border-secondary bg-accent-soft/60 shadow-sm shadow-secondary/10",
                isComplete && "border-secondary/45 bg-accent-soft/25",
                isPending && "border-border"
              )}
            >
              {/* Animated border sweep when step is active */}
              {isActive && (
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="absolute inset-x-0 top-0 h-px overflow-hidden rounded-t-xl">
                    <motion.span
                      className="block h-full w-1/2 bg-gradient-to-r from-transparent via-secondary to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </span>
                  <span className="absolute inset-y-0 right-0 w-px overflow-hidden rounded-r-xl">
                    <motion.span
                      className="block h-1/2 w-full bg-gradient-to-b from-transparent via-secondary to-transparent"
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.3,
                      }}
                    />
                  </span>
                </motion.span>
              )}

              {/* Connector arrow desktop */}
              {i < nodes.length - 1 && (
                <div
                  className={cn(
                    "absolute -right-1.5 top-1/2 z-10 hidden h-px w-3 lg:block",
                    isComplete ? "bg-secondary" : "bg-border"
                  )}
                />
              )}

              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300",
                  isActive && "icon-chip",
                  isComplete && "bg-accent-soft text-secondary-dark",
                  isPending && "bg-surface text-muted"
                )}
              >
                <node.icon className="h-4 w-4" />
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-xl ring-2 ring-secondary/30"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </div>

              <p
                className={cn(
                  "relative z-10 mt-3 text-xs font-semibold transition-colors",
                  isActive && "text-secondary-dark",
                  isComplete && "text-foreground",
                  isPending && "text-muted"
                )}
              >
                {node.label}
              </p>
              <p className="relative z-10 mt-0.5 text-[10px] text-muted">{node.sub}</p>

              {/* Step indicator */}
              <span
                className={cn(
                  "relative z-10 mt-2 font-mono text-[9px] uppercase tracking-wider",
                  isActive ? "text-secondary" : "text-muted/60"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function AutomationFlow() {
  return (
    <SectionShell id="automations" variant="accent" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="Automations"
            title="GPS ping → voice call → dashboard update → team alert."
            titleAccent="Fully automated. Zero manual steps."
            punchline="One continuous loop — from live truck data to the exact moment your team needs to act."
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="card-clean overflow-hidden p-6 md:p-10">
            <ProcessPipeline />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "Runs 24/7",
                  text: "Automations never sleep — nights, weekends, and holidays included.",
                },
                {
                  icon: TruckIllustration,
                  title: "Freight-native",
                  text: "Built for trucking workflows: stops, ETAs, ELD data, and driver contact.",
                  isTruck: true,
                },
                {
                  icon: Bell,
                  title: "Exception-only alerts",
                  text: "Your team hears from Zonik only when a load actually needs attention.",
                  isTruck: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-border bg-surface/50 p-4"
                >
                  <div className="icon-chip h-9 w-9 shrink-0">
                    {item.isTruck ? (
                      <TruckIllustration variant="icon" className="h-4 w-4" />
                    ) : (
                      <item.icon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
