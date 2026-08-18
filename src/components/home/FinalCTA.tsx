"use client";

import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function FinalCTA() {
  const { t } = useI18n();

  return (
    <SectionShell variant="default" className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="section-dark relative overflow-hidden rounded-3xl px-6 py-16 text-center md:px-12 md:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.2),transparent_60%)]" />

            <div className="relative z-10">
              <span className="section-label mb-6 inline-flex">{t.cta.label}</span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]">
                {t.cta.title}
                <br />
                <span className="text-[#a5b4fc]">{t.cta.titleAccent}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-neutral-400">
                {t.cta.body}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="accent" size="lg">
                  {t.cta.bookDemo}
                </Button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
