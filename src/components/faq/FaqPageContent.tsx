"use client";

import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  Moon,
  PhoneCall,
  Plug,
  MapPin,
  Truck,
} from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const icons = {
  product: Truck,
  tracking: MapPin,
  calls: PhoneCall,
  night: Moon,
  reports: BarChart3,
  setup: Plug,
} as const;

export function FaqPageContent() {
  const { t } = useI18n();
  const groups = t.faq.groups;
  const [openByGroup, setOpenByGroup] = useState<Record<string, number | null>>(
    () => Object.fromEntries(groups.map((group) => [group.id, 0]))
  );

  const toggle = (group: string, index: number) => {
    setOpenByGroup((prev) => ({
      ...prev,
      [group]: prev[group] === index ? null : index,
    }));
  };

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
              {t.faq.title}
            </h1>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {groups.map((group, i) => {
              const Icon = icons[group.id as keyof typeof icons];
              const openIndex = openByGroup[group.id];
              return (
                <AnimateOnScroll key={group.id} delay={(i % 2) * 0.05}>
                  <section className="h-full overflow-hidden rounded-3xl border border-secondary/15 bg-white shadow-[0_12px_40px_rgba(78,70,252,0.06)]">
                    <div className="relative overflow-hidden border-b border-secondary/15 bg-gradient-to-br from-[#e4e1ff] via-[#eeedff] to-white px-6 py-5 md:px-8">
                      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-secondary via-[#818CF8] to-secondary/40" />
                      <div className="flex items-center gap-3.5">
                        <span className="icon-chip h-11 w-11 shadow-sm shadow-secondary/10">
                          {Icon ? <Icon className="h-4 w-4" /> : null}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-lg font-semibold tracking-[-0.02em]">
                            {group.title}
                          </h2>
                          <p className="text-xs font-medium text-secondary-dark/70">
                            {group.hint}
                          </p>
                        </div>
                        <span className="hidden rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-secondary-dark shadow-sm sm:inline">
                          {group.items.length}
                        </span>
                      </div>
                    </div>
                    <div className="divide-y divide-border px-2 md:px-4">
                      {group.items.map((faq, q) => {
                        const isOpen = openIndex === q;
                        const panelId = `${group.id}-${faq.question}`
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-");
                        return (
                          <div key={faq.question}>
                            <h3 className="text-[15px] font-semibold leading-snug">
                              <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggle(group.id, q)}
                                className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-accent-soft/40"
                              >
                                <span>{faq.question}</span>
                                <ChevronDown
                                  className={cn(
                                    "mt-0.5 h-4 w-4 shrink-0 text-secondary transition-transform duration-200",
                                    isOpen && "rotate-180"
                                  )}
                                />
                              </button>
                            </h3>
                            <div
                              id={panelId}
                              role="region"
                              aria-hidden={!isOpen}
                              className={cn(
                                "grid transition-[grid-template-rows] duration-200 ease-out",
                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                              )}
                            >
                              <div className="overflow-hidden">
                                <p className="px-4 pb-5 text-sm leading-relaxed text-muted">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </AnimateOnScroll>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted">{t.faq.stillHave}</p>
            <Button href="/contact" variant="accent" size="lg" className="mt-4">
              {t.nav.bookDemo}
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
