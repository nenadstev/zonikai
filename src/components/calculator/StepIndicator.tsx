"use client";

import { cn } from "@/lib/utils";

type Props = {
  currentStep: number;
  labels: string[];
};

export function StepIndicator({ currentStep, labels }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">
          Step {currentStep + 1} of {labels.length}
        </p>
        <p className="text-xs font-medium text-muted">{labels[currentStep]}</p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-5">
        {labels.map((label, index) => {
          const active = index === currentStep;
          const complete = index < currentStep;

          return (
            <div key={label} className="min-w-0">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-colors",
                  complete || active ? "bg-secondary-dark" : "bg-surface"
                )}
              />
              <p
                className={cn(
                  "mt-2 truncate text-[11px] font-medium",
                  active ? "text-secondary-dark" : "text-muted"
                )}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
