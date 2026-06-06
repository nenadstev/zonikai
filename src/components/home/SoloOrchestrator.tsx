"use client";

import { motion } from "framer-motion";
import { Bot, Headphones, User, Users, X, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function SoloOrchestrator() {
  return (
    <SectionShell id="orchestrator" variant="muted" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="One operator. Full coverage."
            title="Replace a 10-person overnight team"
            titleAccent="with one dispatcher and Zonik AI."
            punchline="Same fleet coverage. A fraction of the headcount. No burnout."
          />
        </AnimateOnScroll>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <AnimateOnScroll direction="left">
            <div className="relative h-full rounded-2xl border border-border bg-white p-6 md:p-8 opacity-90">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger-bg">
                  <X className="h-3.5 w-3.5 text-danger" />
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Before Zonik AI</p>
              </div>
              <p className="mt-3 text-lg font-semibold text-muted line-through decoration-danger/40">
                10 trackers on shift every night
              </p>
              <div className="mt-6 grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex flex-col items-center gap-1 rounded-lg border border-border bg-surface/80 p-2"
                  >
                    <User className="h-3.5 w-3.5 text-muted" />
                    <span className="text-[8px] text-muted">#{i + 1}</span>
                  </motion.div>
                ))}
              </div>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                <li>· Manual GPS portal checks</li>
                <li>· Check calls to every driver</li>
                <li>· Reactive, not proactive</li>
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="right">
            <div className="feature-spotlight relative h-full rounded-2xl p-6 md:p-8">
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-bg">
                    <Check className="h-3.5 w-3.5 text-success" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary-dark">With Zonik AI</p>
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                  1 operator + AI
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-secondary/25 bg-white px-4 py-5 shadow-sm"
                  >
                    <div className="icon-chip h-12 w-12">
                      <Headphones className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-secondary-dark">1 Operator</span>
                    <span className="text-[10px] text-muted">Handles exceptions</span>
                  </motion.div>

                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-xl text-secondary"
                  >
                    +
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-secondary/25 bg-white px-4 py-5 shadow-sm"
                  >
                    <div className="icon-chip h-12 w-12">
                      <Bot className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-secondary-dark">Zonik AI</span>
                    <span className="text-[10px] text-muted">Monitors everything</span>
                  </motion.div>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {[
                    "AI monitors every load 24/7",
                    "Voice agents call drivers automatically",
                    "Operator reacts only to flagged loads",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="mt-8 flex flex-col items-center justify-center gap-1 rounded-2xl border border-secondary/30 bg-white py-8 text-center shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-secondary" />
              <span className="text-3xl font-bold tracking-tight text-secondary-dark">10 → 1</span>
            </div>
            <p className="mt-2 max-w-md text-sm font-medium text-foreground">
              One skilled operator with Zonik AI runs your entire after-hours operation.
            </p>
          </motion.div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
