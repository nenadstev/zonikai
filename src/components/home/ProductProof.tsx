"use client";

import Image from "next/image";
import { ArrowRight, Calculator, Eye, Phone } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";

const flips = [
  {
    icon: Eye,
    before: "Someone has to notice a truck is late.",
    after: "Zonik already saw it.",
  },
  {
    icon: Calculator,
    before: "Someone has to figure out the ETA.",
    after: "The next stop and the time are already there.",
  },
  {
    icon: Phone,
    before: "Someone has to call the driver.",
    after: "Zonik already called. You have the answer.",
  },
];

export function ProductProof() {
  return (
    <SectionShell id="product" variant="muted" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="What changes"
            title="You used to depend on people to notice."
            titleAccent="Now the work is already done."
            punchline="Zonik tracks every truck, 24/7. It calculates the next stop. It calls late drivers. Your team focuses on what matters."
          />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="relative mb-10 overflow-hidden rounded-3xl border border-border">
            <div className="grid md:grid-cols-2">
              <div className="bg-[#111111] px-6 py-8 text-white md:px-10 md:py-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Before
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
                  People have to notice. Then they have to count.
                </h3>
                <ul className="mt-8 space-y-4">
                  {flips.map((item) => (
                    <li key={item.before} className="flex items-start gap-3 text-neutral-400">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
                      <span className="text-sm leading-snug md:text-base">{item.before}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative bg-white px-6 py-8 md:px-10 md:py-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(78,70,252,0.12),transparent_55%)]" />
                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary-dark">
                    With Zonik
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-3xl">
                    It&apos;s done. Your team works on what matters.
                  </h3>
                  <ul className="mt-8 space-y-4">
                    {flips.map((item) => (
                      <li key={item.after} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                          <ArrowRight className="h-3 w-3" />
                        </span>
                        <span className="text-sm font-semibold leading-snug text-foreground md:text-base">
                          {item.after}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.08}>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_50px_rgba(0,0,0,0.08)]">
            <Image
              src="/product/fleet-map.png"
              alt="Zonik fleet map of trucks across the United States"
              width={1024}
              height={580}
              className="h-auto w-full"
            />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="accent" size="lg">
              Book a Demo
            </Button>
            <Button href="/features" variant="secondary" size="lg">
              See features
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
