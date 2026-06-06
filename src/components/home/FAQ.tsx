"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { HoverCard } from "@/components/ui/HoverCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Zonik AI?",
    answer:
      "Zonik AI is an after-hours monitoring agent for trucking and freight tracking teams. It watches your active loads around the clock, tracks GPS, calls drivers with AI voice agents, and alerts your team when something needs attention.",
  },
  {
    question: "Does Zonik AI replace our tracking team?",
    answer:
      "No. Zonik AI handles constant monitoring and driver outreach so your team can focus on resolving exceptions. It supports your tracking team — it doesn't replace them.",
  },
  {
    question: "How does Zonik AI detect delays?",
    answer:
      "Zonik AI compares live GPS data and ETA updates against scheduled pickup and delivery windows. When a load starts falling behind, the system flags it automatically.",
  },
  {
    question: "Can it track GPS issues?",
    answer:
      "Yes. Zonik AI monitors GPS signal status continuously and alerts your team when a truck goes offline or stops reporting location data.",
  },
  {
    question: "How do AI voice agents work?",
    answer:
      "When a load is at risk, Zonik's AI voice agent calls the driver, confirms their status, and automatically updates your dashboard with the latest ETA, delay, and stop information.",
  },
  {
    question: "Does it work during nights and weekends?",
    answer:
      "Absolutely. Zonik AI runs 24/7 — including nights, weekends, and holidays — so your loads are always monitored even when your team is off shift.",
  },
  {
    question: "Can one person really handle after-hours tracking?",
    answer:
      "Yes. With Zonik AI monitoring every load, calling drivers via voice agents, and surfacing only exceptions, one skilled operator can orchestrate after-hours operations that previously required a team of 10 or more.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a demo and we'll walk you through how Zonik AI fits into your tracking workflow. Setup is straightforward and we help you connect your data sources.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell id="faq" variant="muted" bordered>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="FAQ"
            title="Common questions."
            titleAccent="Straight answers."
          />
        </AnimateOnScroll>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <AnimateOnScroll key={faq.question} delay={i * 0.04}>
              <HoverCard className="!p-0 overflow-hidden hover:!shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="pr-4 text-sm font-medium">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
                      openIndex === i && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200",
                    openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </HoverCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
