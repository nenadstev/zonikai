"use client";

import { cn } from "@/lib/utils";

type BaseInputProps = {
  label: string;
  helper?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

function parseNumeric(value: string) {
  const cleaned = value.replace(/[^\d.-]/g, "");
  if (!cleaned) return 0;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function NumberInput({
  label,
  helper,
  value,
  onChange,
  min = 0,
  step = 1,
}: BaseInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {helper && <span className="mt-1 block text-xs text-muted">{helper}</span>}
      <input
        type="number"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(parseNumeric(e.target.value))}
        className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-3 text-sm font-medium outline-none transition-colors focus:border-secondary/50 focus:ring-2 focus:ring-accent-soft"
      />
    </label>
  );
}

export function CurrencyInput({
  label,
  helper,
  value,
  onChange,
}: BaseInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {helper && <span className="mt-1 block text-xs text-muted">{helper}</span>}
      <div className="mt-2 flex items-center rounded-xl border border-border bg-white px-3 transition-colors focus-within:border-secondary/50 focus-within:ring-2 focus-within:ring-accent-soft">
        <span className="pr-2 text-sm font-semibold text-muted">$</span>
        <input
          inputMode="numeric"
          value={new Intl.NumberFormat("en-US").format(value || 0)}
          onChange={(e) => onChange(parseNumeric(e.target.value))}
          className="w-full bg-transparent py-3 text-sm font-medium outline-none"
        />
      </div>
    </label>
  );
}

export function PercentageSlider({
  label,
  helper,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: BaseInputProps) {
  return (
    <label className="block">
      <div className="flex items-start justify-between gap-3">
        <span>
          <span className="text-sm font-semibold text-foreground">{label}</span>
          {helper && <span className="mt-1 block text-xs text-muted">{helper}</span>}
        </span>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-secondary-dark">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(parseNumeric(e.target.value))}
        className={cn(
          "mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-surface accent-secondary-dark",
          "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary-dark"
        )}
      />
    </label>
  );
}
