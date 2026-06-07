"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  PhoneCall,
  RefreshCw,
  User,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { HoverCard } from "@/components/ui/HoverCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TruckIllustration } from "@/components/ui/TruckIllustration";

type CallStep = {
  id: number;
  label: string;
  detail: string;
  status: "pending" | "active" | "done";
};

const initialSteps: CallStep[] = [
  { id: 1, label: "Risk detected", detail: "Load #48305 — driver stationary 45 min", status: "pending" },
  { id: 2, label: "AI Voice Agent calls driver", detail: "Calling M. Johnson · Truck T-2187", status: "pending" },
  { id: 3, label: "Status confirmed", detail: '"Breakdown on I-70. ETA +2 hours."', status: "pending" },
  { id: 4, label: "Dashboard updated", detail: "ETA, delay, and risk level synced automatically", status: "pending" },
];

function VoiceWaveBars() {
  return (
    <div className="flex h-5 items-end gap-0.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-accent"
          animate={{ height: [3, 18, 8, 16, 4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

export function VoiceAgent() {
  const [steps, setSteps] = useState(initialSteps);

  useEffect(() => {
    let stepIndex = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(setTimeout(fn, ms));
    };

    const runCycle = () => {
      setSteps(initialSteps.map((s) => ({ ...s, status: "pending" })));
      stepIndex = 0;

      const advance = () => {
        if (stepIndex >= initialSteps.length) {
          schedule(runCycle, 2500);
          return;
        }

        setSteps((prev) =>
          prev.map((s, i) => ({
            ...s,
            status: i < stepIndex ? "done" : i === stepIndex ? "active" : "pending",
          }))
        );
        stepIndex++;
        schedule(advance, stepIndex === 2 ? 2500 : 1800);
      };

      schedule(advance, 500);
    };

    runCycle();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <SectionShell id="voice-agent" variant="white" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="AI Voice Agent"
            title="No more 2 AM check calls."
            titleAccent="Zonik calls the driver — and updates your dashboard."
            punchline="When a load is at risk, the AI voice agent reaches the driver, confirms status, and syncs everything automatically."
          />
        </AnimateOnScroll>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <AnimateOnScroll direction="left">
            <div className="card-clean overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft">
                    <PhoneCall className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Voice Agent Active</p>
                    <p className="text-xs text-muted">Automated driver outreach</p>
                  </div>
                </div>
                <VoiceWaveBars />
              </div>

              <div className="space-y-0 p-2">
                {steps.map((step, i) => (
                  <div
                    key={step.id}
                    className={`relative flex gap-4 rounded-xl p-4 transition-colors ${
                      step.status === "active" ? "bg-accent-soft/60" : ""
                    }`}
                  >
                    {i < steps.length - 1 && (
                      <div className="absolute left-[27px] top-12 h-[calc(100%-16px)] w-px bg-border" />
                    )}
                    <div
                      className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        step.status === "done"
                          ? "border-success bg-success-bg text-success"
                          : step.status === "active"
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-border bg-white text-muted"
                      }`}
                    >
                      {step.status === "done" ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : step.status === "active" && step.id === 2 ? (
                        <Phone className="h-3 w-3 animate-pulse" />
                      ) : (
                        <span className="text-[10px] font-medium">{step.id}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pb-2">
                      <p className={`text-sm font-medium ${step.status === "pending" ? "text-muted" : "text-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{step.detail}</p>
                      {step.status === "active" && step.id === 2 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-white p-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                            <User className="h-4 w-4 text-muted" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">M. Johnson</p>
                            <p className="text-[11px] text-muted">Driver · T-2187</p>
                          </div>
                          <VoiceWaveBars />
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="right">
            <div className="space-y-6">
              {[
                {
                  icon: PhoneCall,
                  title: "Automatic driver calls",
                  text: "When a load is at risk, the AI voice agent calls the driver — no dispatcher needed at 2 AM.",
                },
                {
                  icon: RefreshCw,
                  title: "Real-time dashboard sync",
                  text: "Confirmed ETAs, delays, and stop statuses are pushed to your dashboard instantly after each call.",
                },
                {
                  icon: TruckIllustration,
                  title: "Built for trucking ops",
                  text: "Voice agents understand freight context — pickup windows, delivery appointments, and GPS gaps.",
                  isTruck: true,
                },
              ].map((item) => (
                <HoverCard key={item.title} accent="top" className="flex gap-4 !p-5">
                  <div className="icon-chip h-10 w-10 shrink-0 group-hover:scale-110">
                    {item.isTruck ? (
                      <TruckIllustration variant="icon" className="h-5 w-5" />
                    ) : (
                      <item.icon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </HoverCard>
              ))}

              <div className="feature-spotlight rounded-xl p-5">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>Before voice agent</span>
                  <ArrowRight className="h-3 w-3" />
                  <span>After call</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-surface p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted">ETA</p>
                    <p className="mt-1 text-sm text-muted line-through">18:45</p>
                  </div>
                  <div className="rounded-lg border border-success/20 bg-success-bg p-3">
                    <p className="text-[10px] uppercase tracking-wider text-success">Updated</p>
                    <p className="mt-1 text-sm font-semibold text-success">20:45</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </SectionShell>
  );
}
