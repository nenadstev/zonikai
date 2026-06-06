"use client";

import { motion } from "framer-motion";
import { Bot, Headphones, User, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function SoloOrchestrator() {
  return (
    <section id="orchestrator" className="border-y border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="One operator. Full coverage."
            title="Orchestrate after-hours with one person — not a team of ten."
            subtitle="Zonik AI monitors every load, calls drivers, and surfaces only the exceptions. One dispatcher can run overnight operations that used to require an entire tracking team."
          />
        </AnimateOnScroll>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll direction="left">
            <div className="rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Before Zonik AI
              </p>
              <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-white p-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                      <User className="h-3.5 w-3.5 text-muted" />
                    </div>
                    <span className="text-[9px] text-muted">Tracker</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                10 people manually checking loads, calling drivers, and watching
                GPS portals through the night.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="right">
            <div className="rounded-2xl border border-secondary/25 bg-gradient-to-br from-accent-soft to-white p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-secondary-dark">
                With Zonik AI
              </p>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex flex-col items-center gap-2 rounded-xl border border-secondary/20 bg-white px-6 py-4">
                  <div className="icon-chip h-12 w-12">
                    <Headphones className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-secondary-dark">1 Operator</span>
                </div>

                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-secondary"
                >
                  →
                </motion.div>

                <div className="flex flex-col items-center gap-2 rounded-xl border border-secondary/20 bg-white px-6 py-4">
                  <div className="icon-chip h-12 w-12">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-secondary-dark">Zonik AI</span>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  "AI monitors all active loads 24/7",
                  "Voice agents handle driver check calls",
                  "Operator reacts only to flagged exceptions",
                  "Same coverage — fraction of the headcount",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-white py-6 text-center">
            <div className="flex items-center gap-2 text-secondary-dark">
              <Users className="h-4 w-4" />
              <span className="text-sm font-semibold">10 → 1</span>
            </div>
            <p className="max-w-md text-sm text-muted">
              One skilled operator with Zonik AI can orchestrate after-hours
              tracking for your entire fleet — without burning out your team.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
