"use client";

import { useMemo, useState } from "react";
import { Clock, RotateCcw, TrendingUp, Truck, Users } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { CurrencyInput, NumberInput, PercentageSlider } from "./CalculatorInputs";
import {
  calculateResults,
  defaultInputs,
  formatCurrency,
  formatNumber,
  scenarioPresets,
  type CalculatorInputs,
  type Scenario,
} from "./calculator-model";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

export function CalculatorPage() {
  const { t } = useI18n();
  const c = t.calculator;
  const nights = c.nights as { id: Scenario; label: string; hint: string }[];
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [scenario, setScenario] = useState<Scenario>("Expected");
  const assumptions = scenarioPresets[scenario];
  const results = useMemo(
    () => calculateResults(inputs, assumptions),
    [inputs, assumptions]
  );

  const setInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "activeLoadsPerMonth") {
        next.loadsMonitoredAfterhoursPerMonth = Math.round(Number(value) / 3);
      }
      return next;
    });
  };

  const reset = () => {
    setInputs(defaultInputs);
    setScenario("Expected");
  };

  const people =
    inputs.numberOfDispatchers + inputs.numberOfAfterhoursOperators;

  return (
    <>
      <SectionShell variant="accent" className="!pb-12 !pt-16 md:!pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="section-label mb-4 inline-flex">
            <BrandMark size={16} className="h-4 w-4" />
            {c.label}
          </span>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.12]">
            {c.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            {c.intro}
          </p>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
            <div className="card-clean p-5 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-dark">
                {c.fleetLabel}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                {c.fleetTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {c.fleetHint}
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <NumberInput
                    label={c.loadsLabel}
                    helper={c.loadsHelper}
                    value={inputs.activeLoadsPerMonth}
                    onChange={(value) => setInput("activeLoadsPerMonth", value)}
                  />
                </div>
                <NumberInput
                  label={c.dispatchersLabel}
                  helper={c.dispatchersHelper}
                  value={inputs.numberOfDispatchers}
                  onChange={(value) => setInput("numberOfDispatchers", value)}
                />
                <CurrencyInput
                  label={c.dispatcherPayLabel}
                  helper={c.dispatcherPayHelper}
                  value={inputs.avgDispatcherMonthlyCost}
                  onChange={(value) =>
                    setInput("avgDispatcherMonthlyCost", value)
                  }
                />
                <NumberInput
                  label={c.nightsLabel}
                  helper={c.nightsHelper}
                  value={inputs.numberOfAfterhoursOperators}
                  onChange={(value) =>
                    setInput("numberOfAfterhoursOperators", value)
                  }
                />
                <CurrencyInput
                  label={c.nightsPayLabel}
                  helper={c.nightsPayHelper}
                  value={inputs.avgAfterhoursMonthlyCost}
                  onChange={(value) =>
                    setInput("avgAfterhoursMonthlyCost", value)
                  }
                />
              </div>

              <div className="mt-6">
                <PercentageSlider
                  label={c.trackingLabel}
                  helper={c.trackingHelper}
                  value={inputs.trackingTimePercentage}
                  onChange={(value) => setInput("trackingTimePercentage", value)}
                />
              </div>

              <fieldset className="mt-7">
                <legend className="text-sm font-semibold">
                  {c.roughLegend}
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {nights.map((night) => (
                    <button
                      key={night.id}
                      type="button"
                      onClick={() => setScenario(night.id)}
                      className={cn(
                        "rounded-2xl border px-3 py-3 text-left transition-colors",
                        scenario === night.id
                          ? "border-secondary/40 bg-accent-soft"
                          : "border-border bg-white hover:bg-surface"
                      )}
                    >
                      <span className="block text-sm font-semibold">
                        {night.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {night.hint}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {c.reset}
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-secondary/15 bg-white shadow-[0_12px_40px_rgba(78,70,252,0.06)] lg:sticky lg:top-24">
              <div className="border-b border-secondary/10 bg-gradient-to-br from-[#e4e1ff] via-[#eeedff] to-white px-6 py-5 md:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-dark">
                  {c.resultLabel}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground">
                  {c.summaryStart}{" "}
                  <strong>{formatNumber(people)}</strong>{" "}
                  {people === 1 ? c.person : c.people} {c.summaryAnd}{" "}
                  <strong>{formatNumber(inputs.activeLoadsPerMonth)}</strong>{" "}
                  {c.summaryLoads} {formatNumber(inputs.trackingTimePercentage)}
                  {c.summaryPct}{" "}
                  <strong>
                    {formatNumber(results.peopleFreed, 1)} {c.summaryFewer}{" "}
                    {results.peopleFreed === 1 ? c.person : c.people}
                  </strong>
                  {c.summaryEnd}
                </p>
              </div>

              <div className="space-y-5 p-6 md:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {c.fewerTitle}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                    {formatNumber(results.peopleFreed, 1)} {c.people}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {formatNumber(results.dispatchersFreed, 1)} {c.fromDispatch} ·{" "}
                    {formatNumber(results.afterhoursFreed, 1)} {c.fromNights}{" "}
                    {formatNumber(inputs.trackingTimePercentage)}
                    {c.chasingShare}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ImpactStat
                    icon={<Users className="h-4 w-4" />}
                    label={c.paySaved}
                    value={`${formatCurrency(results.headcountSavings)} ${c.perMonth}`}
                  />
                  <ImpactStat
                    icon={<Clock className="h-4 w-4" />}
                    label={c.hoursBack}
                    value={`${formatNumber(results.freedHours)} ${c.perMonth}`}
                  />
                </div>

                <div className="rounded-2xl border border-secondary/20 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <span className="icon-chip mt-0.5 h-10 w-10">
                      <Truck className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-dark">
                        {c.stayTitle}
                      </p>
                      <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
                        {formatNumber(results.remainingPeople, 1)} {c.people} ·{" "}
                        {formatCurrency(results.loadWorkValue)} {c.perMonth}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {formatNumber(results.remainingDispatchers, 1)} {c.stayHint}{" "}
                        · {formatNumber(results.remainingAfterhours, 1)}{" "}
                        {c.stayNights}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-accent-soft/70 p-5">
                  <div className="flex items-start gap-3">
                    <span className="icon-chip mt-0.5 h-10 w-10">
                      <TrendingUp className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-dark">
                        {c.impactTitle}
                      </p>
                      <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
                        {formatCurrency(results.annualizedImpact)} {c.aYear}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {formatCurrency(results.totalMonthlyImpact)} {c.aMonth}{" "}
                        {c.impactHint}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted">
                  {c.disclaimer}
                </p>

                <Button href="/contact" variant="accent" size="lg">
                  {t.nav.bookDemo}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}

function ImpactStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-4">
      <div className="flex items-center gap-2 text-muted">
        {icon}
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">{value}</p>
    </div>
  );
}
