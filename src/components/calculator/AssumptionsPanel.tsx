"use client";

import type { Assumptions } from "./calculator-model";
import { CurrencyInput, PercentageSlider } from "./CalculatorInputs";

type Props = {
  assumptions: Assumptions;
  revenuePerProductiveHour: number;
  onAssumptionChange: <K extends keyof Assumptions>(
    key: K,
    value: Assumptions[K]
  ) => void;
  onRevenueChange: (value: number) => void;
};

export function AssumptionsPanel({
  assumptions,
  revenuePerProductiveHour,
  onAssumptionChange,
  onRevenueChange,
}: Props) {
  return (
    <details className="card-clean p-5">
      <summary className="cursor-pointer text-sm font-bold text-foreground">
        Advanced assumptions
      </summary>
      <p className="mt-2 text-sm leading-6 text-muted">
        Adjust these percentages if the prospect has a more conservative or more
        aggressive operating model.
      </p>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <PercentageSlider
          label="Work reduction percentage"
          value={assumptions.workReductionPercentage}
          onChange={(value) =>
            onAssumptionChange("workReductionPercentage", value)
          }
        />
        <PercentageSlider
          label="Error reduction percentage"
          value={assumptions.errorReductionPercentage}
          onChange={(value) =>
            onAssumptionChange("errorReductionPercentage", value)
          }
        />
        <PercentageSlider
          label="Recovered hours redirected to productive work"
          value={assumptions.productiveReallocationPercentage}
          onChange={(value) =>
            onAssumptionChange("productiveReallocationPercentage", value)
          }
        />
        <CurrencyInput
          label="Revenue value per productive hour"
          value={revenuePerProductiveHour}
          onChange={onRevenueChange}
        />
      </div>
    </details>
  );
}
