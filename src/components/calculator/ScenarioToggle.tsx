"use client";

import type { Scenario } from "./calculator-model";
import { cn } from "@/lib/utils";

const scenarios: Scenario[] = ["Conservative", "Expected", "Aggressive"];

type Props = {
  value: Scenario;
  onChange: (scenario: Scenario) => void;
};

export function ScenarioToggle({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-full border border-border bg-white p-1">
      {scenarios.map((scenario) => (
        <button
          key={scenario}
          type="button"
          onClick={() => onChange(scenario)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4",
            value === scenario
              ? "bg-secondary-dark text-white shadow-sm"
              : "text-muted hover:bg-surface hover:text-foreground"
          )}
        >
          {scenario}
        </button>
      ))}
    </div>
  );
}
