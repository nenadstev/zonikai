"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { FEATURES } from "@/lib/features";
import {
  CallStoryVisual,
  EtaStoryVisual,
  FactsStoryVisual,
  HandoffStoryVisual,
  LoadsStoryVisual,
  ReportStoryVisual,
  StatusStoryVisual,
} from "@/components/features/FeatureStoryVisuals";

const visuals = [
  EtaStoryVisual,
  CallStoryVisual,
  FactsStoryVisual,
  LoadsStoryVisual,
  StatusStoryVisual,
  HandoffStoryVisual,
  ReportStoryVisual,
];

export function FeaturesFullPage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const panelCount = FEATURES.length + 2;

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number(visible.target.getAttribute("data-panel"));
        if (!Number.isNaN(index)) setActive(index);
      },
      { root, threshold: 0.55 }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const panel = scrollerRef.current?.querySelector(`[data-panel="${index}"]`);
    panel?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="h-[calc(100dvh-3.5rem)] snap-y snap-mandatory overflow-y-auto overscroll-y-contain"
      >
        <section
          data-panel="0"
          className="relative flex h-[calc(100dvh-3.5rem)] snap-start snap-always flex-col items-center justify-center px-4 text-center sm:px-6"
        >
          <span className="section-label mb-6 inline-flex">
            <BrandMark size={16} className="h-4 w-4" />
            Features
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] md:text-6xl md:leading-[1.05]">
            Always know what&apos;s going on with your trucks.
          </h1>
          <button
            type="button"
            onClick={() => goTo(1)}
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-muted transition-colors hover:text-foreground"
            aria-label="Scroll to next section"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
              Scroll
            </span>
            <span className="relative flex h-10 w-6 items-start justify-center rounded-full border-2 border-current pt-2">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-current"
                animate={{ y: [0, 10, 0], opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <motion.span
              className="block h-2 w-2 rotate-45 border-b-2 border-r-2 border-current"
              animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </button>
        </section>

        {FEATURES.map((feature, i) => {
          const Visual = visuals[i];
          const panelIndex = i + 1;
          return (
            <section
              key={feature.number}
              data-panel={panelIndex}
              className="flex h-[calc(100dvh-3.5rem)] snap-start snap-always items-center px-4 py-8 sm:px-6 lg:px-8"
            >
              <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
                <div>
                  <p className="font-mono text-sm font-semibold tracking-[0.18em] text-secondary">
                    {feature.number} / 07
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl md:leading-[1.08]">
                    {feature.title}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
                    {feature.text}
                  </p>
                </div>
                <div className="flex h-[min(56vh,36rem)] min-h-[280px] items-stretch overflow-hidden rounded-3xl border border-border bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:p-8">
                  <div className="w-full">
                    <Visual active={active === panelIndex} />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <section
          data-panel={FEATURES.length + 1}
          className="flex h-[calc(100dvh-3.5rem)] snap-start snap-always items-center px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="section-dark relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl px-6 py-16 text-center md:px-12 md:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.2),transparent_60%)]" />
            <div className="relative z-10">
              <span className="section-label mb-6 inline-flex">Book a demo</span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]">
                Let Zonik do the watching.
                <br />
                <span className="text-[#a5b4fc]">Your team works on what matters.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-neutral-400">
                Zonik watches every truck. You see the next stop and the ETA. Late
                drivers get a call. Your team only steps in when it counts.
              </p>
              <div className="mt-10">
                <Button href="/contact" variant="accent" size="lg">
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {Array.from({ length: panelCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to section ${i + 1}`}
            className={cn(
              "pointer-events-auto h-2 w-2 rounded-full transition-all",
              active === i ? "scale-125 bg-secondary" : "bg-border hover:bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
