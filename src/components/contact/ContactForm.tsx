"use client";

import { Clock, MapPin, PhoneCall, Radio } from "lucide-react";
import { HoverCard } from "@/components/ui/HoverCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useI18n } from "@/lib/i18n/LocaleProvider";

const benefitIcons = [MapPin, PhoneCall, Radio, Clock];

export function ContactBenefits() {
  const { t } = useI18n();
  const c = t.contact;

  return (
    <AnimateOnScroll direction="left">
      <div>
        <span className="section-label mb-4 inline-flex">{c.benefitsLabel}</span>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          {c.benefitsTitle}{" "}
          <span className="headline-accent">{c.benefitsAccent}</span>
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
          {c.benefitsIntro}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {c.benefits.map((benefit, i) => {
            const Icon = benefitIcons[i];
            const featured = i === 3;
            return (
              <HoverCard
                key={benefit.title}
                spotlight={featured}
                accent="left"
                className={featured ? "sm:col-span-2" : ""}
              >
                <div className="flex gap-3">
                  <div className="icon-chip h-9 w-9 shrink-0 group-hover:scale-110">
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-[-0.01em]">{benefit.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{benefit.description}</p>
                  </div>
                </div>
              </HoverCard>
            );
          })}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
