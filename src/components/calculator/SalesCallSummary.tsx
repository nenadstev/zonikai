"use client";

import { useState } from "react";
import { Copy, RotateCcw } from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  type CalculatorInputs,
  type CalculatorResults,
} from "./calculator-model";

type Props = {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  onReset: () => void;
};

export function SalesCallSummary({ inputs, results, onReset }: Props) {
  const [copied, setCopied] = useState(false);

  const summaryText = `Based on the current inputs, your operation is spending approximately ${formatNumber(
    results.totalManualTrackingHours
  )} hours per month on manual tracking. Zonik AI could potentially help recover ${formatCurrency(
    results.totalMonthlyImpact
  )}/month through labor efficiency, fewer tracking-related issues and better use of team capacity. Annualized impact: ${formatCurrency(
    results.annualizedImpact
  )}/year.`;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <aside className="card-clean sticky top-20 p-5">
      <h3 className="text-base font-bold">Sales Call Summary</h3>
      <div className="mt-4 space-y-3 text-sm">
        <SummaryRow label="Active loads / month" value={formatNumber(inputs.activeLoadsPerMonth)} />
        <SummaryRow
          label="Manual tracking hours"
          value={`${formatNumber(results.totalManualTrackingHours)} hrs`}
        />
        <SummaryRow
          label="Tracking issue cost"
          value={formatCurrency(results.trackingErrorCost)}
        />
        <SummaryRow
          label="Monthly impact"
          value={formatCurrency(results.totalMonthlyImpact)}
        />
        <SummaryRow
          label="Annualized impact"
          value={formatCurrency(results.annualizedImpact)}
        />
      </div>

      <div className="mt-5 grid gap-2">
        <button
          type="button"
          onClick={copySummary}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy Summary"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Calculator
        </button>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
