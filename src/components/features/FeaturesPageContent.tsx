"use client";

import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FEATURES } from "@/lib/features";
import {
  CallVisual,
  EtaVisual,
  FactsVisual,
  HandoffVisual,
  LoadsVisual,
  ReportVisual,
  StatusVisual,
} from "@/components/features/FeatureVisuals";

const visuals = [
  EtaVisual,
  CallVisual,
  FactsVisual,
  LoadsVisual,
  StatusVisual,
  HandoffVisual,
  ReportVisual,
];

export function FeaturesPageContent() {
  return (
    <>
      <SectionShell variant="accent" className="!pb-12 !pt-16 md:!pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <span className="section-label mb-4 inline-flex">
              <BrandMark size={16} className="h-4 w-4" />
              Features
            </span>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.12]">
              Always know what&apos;s going on with your trucks.
            </h1>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-4 md:!pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-border">
            {FEATURES.map((feature, i) => {
              const Visual = visuals[i];
              return (
                <AnimateOnScroll key={feature.number} delay={Math.min(i, 3) * 0.06}>
                  <article className="grid items-center gap-6 py-12 md:grid-cols-[5.5rem_minmax(0,1fr)_13rem] md:gap-10 md:py-16">
                    <p className="font-mono text-4xl font-semibold tracking-[-0.06em] text-secondary/35 md:text-5xl">
                      {feature.number}
                    </p>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-[1.85rem] md:leading-tight">
                        {feature.title}
                      </h2>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                        {feature.text}
                      </p>
                    </div>
                    <Visual />
                  </article>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <FinalCTA />
    </>
  );
}
