"use client";

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
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TruckIllustration } from "@/components/ui/TruckIllustration";

const nodes = [
  { icon: Truck, label: "Active Loads", sub: "TMS sync" },
  { icon: MapPin, label: "GPS Feed", sub: "Live location" },
  { icon: Bot, label: "AI Monitor", sub: "Risk detection" },
  { icon: Phone, label: "Voice Agent", sub: "Driver calls" },
  { icon: RefreshCw, label: "Dashboard", sub: "Auto-update" },
  { icon: Bell, label: "Team Alert", sub: "When needed" },
];

export function AutomationFlow() {
  return (
    <section id="automations" className="border-y border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="Automations"
            title="From GPS ping to team alert — fully automated."
            subtitle="Zonik AI connects your load data, GPS feeds, voice agents, and dashboard into one continuous monitoring loop."
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="card-clean overflow-hidden p-6 md:p-10">
            <div className="relative">
              <svg className="absolute inset-0 hidden h-full w-full md:block" aria-hidden>
                <path
                  d="M 80 60 H 920"
                  fill="none"
                  stroke="#E8E8E8"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  className="animate-flow-dash"
                />
              </svg>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {nodes.map((node, i) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative flex flex-col items-center rounded-xl border border-border bg-white p-4 text-center transition-shadow hover:shadow-sm"
                  >
                    {i < nodes.length - 1 && (
                      <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-border lg:block" />
                    )}
                    <div className="icon-chip h-10 w-10">
                      <node.icon className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-xs font-semibold">{node.label}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{node.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>

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
    </section>
  );
}
