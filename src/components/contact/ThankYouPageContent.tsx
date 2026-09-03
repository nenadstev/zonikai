"use client";

import { Check } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function ThankYouPageContent() {
  const { t } = useI18n();
  const c = t.thankYou;

  return (
    <SectionShell
      variant="accent"
      className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <span className="section-label mt-6 inline-flex">
              <BrandMark size={16} className="h-4 w-4" />
              {c.label}
            </span>
            <h1 className="mt-5 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[2rem] lg:text-[2.35rem]">
              {c.title}{" "}
              <span className="headline-accent">{c.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              {c.intro}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
              {c.nextLabel}
            </p>
            <ol className="mt-5 space-y-5">
              {c.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-secondary-dark">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-foreground">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-border pt-5 text-sm text-muted">
                {c.tip}{" "}
              <a
                href="mailto:hello@zonikai.com"
                className="font-medium text-secondary-dark hover:underline"
              >
                hello@zonikai.com
              </a>
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.12}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" variant="accent" size="lg">
              {c.primaryCta}
            </Button>
            <Button href="/pitch" variant="secondary" size="lg">
              {c.secondaryCta}
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
