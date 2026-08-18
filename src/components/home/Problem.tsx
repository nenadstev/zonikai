"use client";

import { Clock, Flame, Route } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useI18n } from "@/lib/i18n/LocaleProvider";

const problemIcons = [Flame, Clock, Route];

export function Problem() {
  const { t } = useI18n();

  return (
    <SectionShell variant="white" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label={t.problem.label}
            title={t.problem.title}
            titleAccent={t.problem.titleAccent}
            punchline={t.problem.punchline}
          />
        </AnimateOnScroll>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {t.problem.items.map((problem, i) => {
            const Icon = problemIcons[i];
            return (
              <AnimateOnScroll key={problem.hook} delay={i * 0.08}>
                <div className="flex h-full flex-col bg-white p-7 md:p-8">
                  <Icon className="h-8 w-8 text-secondary" strokeWidth={1.75} />
                  <p className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-[1.65rem] md:leading-tight">
                    {problem.hook}
                  </p>
                  <p className="mt-2 text-sm font-medium text-secondary-dark">{problem.versus}</p>
                  <p className="mt-6 text-sm leading-relaxed text-muted">{problem.description}</p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
