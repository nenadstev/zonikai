"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Zonik AI?",
    answer:
      "An AI agent that watches your loads after hours. It tracks GPS, calls drivers when something looks wrong, and alerts your team only when a load needs help.",
  },
  {
    question: "Does it replace my dispatchers?",
    answer:
      "No. It takes busy work off their plate — portal checks and check calls. Your people still decide what to do.",
  },
  {
    question: "How does it catch delays?",
    answer:
      "It compares where the truck is to the pickup and delivery times. When a load starts falling behind, it gets flagged.",
  },
  {
    question: "What happens when GPS goes dark?",
    answer:
      "Zonik flags the truck right away. If it stays dark, the AI calls the driver to find out what is going on.",
  },
  {
    question: "What do the AI driver calls sound like?",
    answer:
      "Short and clear. The AI asks where the driver is and if they will make the stop. Then it writes the answer — and the new ETA — on your board.",
  },
  {
    question: "Does it run on weekends and holidays?",
    answer: "Yes. Every night, every weekend, every holiday. It does not call in sick.",
  },
  {
    question: "Can one person cover the whole night?",
    answer:
      "Yes. Zonik does the watching and the calling. One dispatcher only handles the few loads that need a human.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a demo. We will show you how it fits your fleet and help you connect your TMS and ELD.",
  },
];

export function FaqPageContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SectionShell variant="accent" className="!pb-12 !pt-16 md:!pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <span className="section-label mb-4 inline-flex">
              <BrandMark size={16} className="h-4 w-4" />
              FAQ
            </span>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.12]">
              Questions we hear a lot.
              <br />
              <span className="headline-accent">Straight answers.</span>
            </h1>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((faq, i) => (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left"
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
                    <p className="pb-4 text-sm leading-relaxed text-muted">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted">Still have a question?</p>
            <Button href="/contact" variant="accent" size="lg" className="mt-4">
              Contact us
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
