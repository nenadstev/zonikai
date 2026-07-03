"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { AssumptionsPanel } from "./AssumptionsPanel";
import { CalculatorStep } from "./CalculatorStep";
import {
  CurrencyInput,
  NumberInput,
  PercentageSlider,
} from "./CalculatorInputs";
import { ROIChart } from "./ROIChart";
import { ResultsCard } from "./ResultsCard";
import { SalesCallSummary } from "./SalesCallSummary";
import { ScenarioToggle } from "./ScenarioToggle";
import { StepIndicator } from "./StepIndicator";
import {
  calculateResults,
  defaultInputs,
  formatCurrency,
  formatNumber,
  scenarioPresets,
  type Assumptions,
  type CalculatorInputs,
  type Scenario,
} from "./calculator-model";

const stepLabels = [
  "Team Cost",
  "Manual Tracking Work",
  "Mistakes, Claims & Penalties",
  "Revenue Opportunity",
  "Results",
];

export function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [scenario, setScenario] = useState<Scenario>("Expected");
  const [assumptions, setAssumptions] = useState<Assumptions>(
    scenarioPresets.Expected
  );

  const results = useMemo(
    () => calculateResults(inputs, assumptions),
    [inputs, assumptions]
  );

  const setInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const setAssumption = <K extends keyof Assumptions>(
    key: K,
    value: Assumptions[K]
  ) => {
    setAssumptions((prev) => ({ ...prev, [key]: value }));
  };

  const applyScenario = (nextScenario: Scenario) => {
    setScenario(nextScenario);
    setAssumptions(scenarioPresets[nextScenario]);
  };

  const resetCalculator = () => {
    setInputs(defaultInputs);
    setScenario("Expected");
    setAssumptions(scenarioPresets.Expected);
    setCurrentStep(0);
  };

  const isResults = currentStep === 4;

  return (
    <main className="bg-background">
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.18),transparent_34%),linear-gradient(180deg,#ffffff_0%,#fafafa_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="section-label">
              <Calculator className="h-3.5 w-3.5" />
              After-Hours Cost Calculator
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-foreground md:text-6xl">
              After-Hours Cost Calculator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Calculate how much manual tracking is costing your operation every
              month - and what your team could recover with Zonik AI.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="inline-flex items-center gap-2 rounded-full bg-secondary-dark px-5 py-3 text-sm font-semibold text-white shadow-md shadow-secondary/20 transition-colors hover:bg-secondary"
              >
                Build Your ROI Case
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="max-w-xl text-sm leading-6 text-muted">
                Zonik AI does not replace your team. It reduces repetitive
                tracking work, catches issues earlier and helps your team focus
                on higher-value work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <StepIndicator currentStep={currentStep} labels={stepLabels} />

        {!isResults ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              {currentStep === 0 && (
                <TeamCostStep
                  inputs={inputs}
                  results={results}
                  setInput={setInput}
                />
              )}
              {currentStep === 1 && (
                <ManualTrackingStep
                  inputs={inputs}
                  results={results}
                  setInput={setInput}
                />
              )}
              {currentStep === 2 && (
                <MistakesStep
                  inputs={inputs}
                  results={results}
                  setInput={setInput}
                />
              )}
              {currentStep === 3 && (
                <RevenueStep
                  inputs={inputs}
                  results={results}
                  assumptions={assumptions}
                  scenario={scenario}
                  setInput={setInput}
                  setAssumption={setAssumption}
                  onScenarioChange={applyScenario}
                />
              )}

              <WizardNavigation
                currentStep={currentStep}
                onBack={() => setCurrentStep((step) => Math.max(0, step - 1))}
                onNext={() => setCurrentStep((step) => Math.min(4, step + 1))}
              />
            </div>
            <LiveSummary results={results} />
          </div>
        ) : (
          <ResultsScreen
            inputs={inputs}
            results={results}
            assumptions={assumptions}
            scenario={scenario}
            setInput={setInput}
            setAssumption={setAssumption}
            onScenarioChange={applyScenario}
            onReset={resetCalculator}
            onBack={() => setCurrentStep(3)}
          />
        )}
      </section>
    </main>
  );
}

type InputSetter = <K extends keyof CalculatorInputs>(
  key: K,
  value: CalculatorInputs[K]
) => void;

type AssumptionSetter = <K extends keyof Assumptions>(
  key: K,
  value: Assumptions[K]
) => void;

function TeamCostStep({
  inputs,
  results,
  setInput,
}: {
  inputs: CalculatorInputs;
  results: ReturnType<typeof calculateResults>;
  setInput: InputSetter;
}) {
  return (
    <CalculatorStep
      eyebrow="Team Cost"
      title="Your tracking team setup"
      subtitle="Let's estimate how much of your current team cost is tied to manual tracking work."
      output={
        <OutputPreview
          label="Estimated monthly team cost tied to tracking"
          value={formatCurrency(results.trackingTeamCost)}
        />
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput
          label="Number of dispatchers"
          value={inputs.numberOfDispatchers}
          onChange={(value) => setInput("numberOfDispatchers", value)}
        />
        <CurrencyInput
          label="Average monthly cost per dispatcher"
          value={inputs.avgDispatcherMonthlyCost}
          onChange={(value) => setInput("avgDispatcherMonthlyCost", value)}
        />
        <NumberInput
          label="Number of after-hours operators"
          value={inputs.numberOfAfterhoursOperators}
          onChange={(value) => setInput("numberOfAfterhoursOperators", value)}
        />
        <CurrencyInput
          label="Average monthly cost per after-hours operator"
          value={inputs.avgAfterhoursMonthlyCost}
          onChange={(value) => setInput("avgAfterhoursMonthlyCost", value)}
        />
      </div>
      <PercentageSlider
        label="Percentage of their time spent on tracking"
        helper="Use the best estimate from the prospect. Most teams underestimate this."
        value={inputs.trackingTimePercentage}
        onChange={(value) => setInput("trackingTimePercentage", value)}
      />
    </CalculatorStep>
  );
}

function ManualTrackingStep({
  inputs,
  results,
  setInput,
}: {
  inputs: CalculatorInputs;
  results: ReturnType<typeof calculateResults>;
  setInput: InputSetter;
}) {
  return (
    <CalculatorStep
      eyebrow="Manual Tracking Work"
      title="Manual load tracking workload"
      subtitle="Estimate how much time your team spends manually checking loads, GPS status and ETAs."
      output={
        <OutputPreview
          label="Estimated manual tracking time"
          value={`${formatNumber(results.totalManualTrackingHours)} hours / month`}
        />
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput
          label="Active loads per month"
          value={inputs.activeLoadsPerMonth}
          onChange={(value) => setInput("activeLoadsPerMonth", value)}
        />
        <NumberInput
          label="Average manual check-ins per load"
          value={inputs.avgCheckinsPerLoad}
          onChange={(value) => setInput("avgCheckinsPerLoad", value)}
        />
        <NumberInput
          label="Average minutes per manual check"
          value={inputs.avgMinutesPerCheck}
          onChange={(value) => setInput("avgMinutesPerCheck", value)}
        />
        <NumberInput
          label="Loads monitored after hours per month"
          value={inputs.loadsMonitoredAfterhoursPerMonth}
          onChange={(value) =>
            setInput("loadsMonitoredAfterhoursPerMonth", value)
          }
        />
        <NumberInput
          label="Extra minutes per after-hours load"
          value={inputs.extraMinutesPerAfterhoursLoad}
          onChange={(value) => setInput("extraMinutesPerAfterhoursLoad", value)}
        />
      </div>
    </CalculatorStep>
  );
}

function MistakesStep({
  inputs,
  results,
  setInput,
}: {
  inputs: CalculatorInputs;
  results: ReturnType<typeof calculateResults>;
  setInput: InputSetter;
}) {
  return (
    <CalculatorStep
      eyebrow="Mistakes, Claims & Penalties"
      title="Cost of missed updates and tracking mistakes"
      subtitle="Manual tracking errors can create missed updates, claims, penalties and customer complaints."
      output={
        <OutputPreview
          label="Estimated monthly cost of tracking issues"
          value={formatCurrency(results.trackingErrorCost)}
        />
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput
          label="Monthly tracking mistakes"
          value={inputs.monthlyTrackingMistakes}
          onChange={(value) => setInput("monthlyTrackingMistakes", value)}
        />
        <CurrencyInput
          label="Average cost per mistake"
          value={inputs.avgCostPerMistake}
          onChange={(value) => setInput("avgCostPerMistake", value)}
        />
        <NumberInput
          label="Monthly claims or service failures caused by missed updates"
          value={inputs.monthlyClaims}
          onChange={(value) => setInput("monthlyClaims", value)}
        />
        <CurrencyInput
          label="Average cost per claim / service failure"
          value={inputs.avgCostPerClaim}
          onChange={(value) => setInput("avgCostPerClaim", value)}
        />
        <CurrencyInput
          label="Monthly penalties or customer deductions"
          value={inputs.monthlyPenalties}
          onChange={(value) => setInput("monthlyPenalties", value)}
        />
      </div>
    </CalculatorStep>
  );
}

function RevenueStep({
  inputs,
  results,
  assumptions,
  scenario,
  setInput,
  setAssumption,
  onScenarioChange,
}: {
  inputs: CalculatorInputs;
  results: ReturnType<typeof calculateResults>;
  assumptions: Assumptions;
  scenario: Scenario;
  setInput: InputSetter;
  setAssumption: AssumptionSetter;
  onScenarioChange: (scenario: Scenario) => void;
}) {
  return (
    <CalculatorStep
      eyebrow="Revenue Opportunity"
      title="What could your team do with recovered time?"
      subtitle="If your team spends less time manually checking loads, that time can go toward customer updates, carrier sales, load coverage, retention or other revenue-generating work."
      output={
        <OutputPreview
          label="Estimated monthly revenue opportunity"
          value={formatCurrency(results.revenueOpportunity)}
        />
      }
    >
      <PercentageSlider
        label="Percentage of recovered hours that can be redirected to productive work"
        value={assumptions.productiveReallocationPercentage}
        onChange={(value) =>
          setAssumption("productiveReallocationPercentage", value)
        }
      />
      <CurrencyInput
        label="Estimated revenue value per productive hour"
        value={inputs.revenuePerProductiveHour}
        onChange={(value) => setInput("revenuePerProductiveHour", value)}
      />
      <label className="block">
        <span className="text-sm font-semibold text-foreground">
          Monthly sales / retention opportunity multiplier
        </span>
        <select
          value={scenario}
          onChange={(e) => onScenarioChange(e.target.value as Scenario)}
          className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-3 text-sm font-medium outline-none transition-colors focus:border-secondary/50 focus:ring-2 focus:ring-accent-soft"
        >
          <option>Conservative</option>
          <option>Expected</option>
          <option>Aggressive</option>
        </select>
      </label>
    </CalculatorStep>
  );
}

function WizardNavigation({
  currentStep,
  onBack,
  onNext,
}: {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 0}
        className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-muted transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary"
      >
        {currentStep === 3 ? "View Results" : "Continue"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function LiveSummary({ results }: { results: ReturnType<typeof calculateResults> }) {
  return (
    <aside className="card-clean h-fit p-5 lg:sticky lg:top-20">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-dark">
        Live Summary
      </p>
      <div className="mt-5 space-y-4">
        <SummaryMetric
          icon={<Clock className="h-4 w-4" />}
          label="Estimated manual tracking hours"
          value={`${formatNumber(results.totalManualTrackingHours)} hrs`}
        />
        <SummaryMetric
          icon={<DollarSign className="h-4 w-4" />}
          label="Estimated tracking labor cost"
          value={formatCurrency(results.manualTrackingLaborCost)}
        />
        <SummaryMetric
          icon={<AlertTriangle className="h-4 w-4" />}
          label="Estimated error / claim cost"
          value={formatCurrency(results.trackingErrorCost)}
        />
        <SummaryMetric
          icon={<TrendingUp className="h-4 w-4" />}
          label="Potential monthly impact"
          value={formatCurrency(results.totalMonthlyImpact)}
        />
      </div>
    </aside>
  );
}

function SummaryMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/35 p-4">
      <div className="flex items-center gap-2 text-muted">
        {icon}
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-foreground">
        {value}
      </p>
    </div>
  );
}

function OutputPreview({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="text-xl font-bold tracking-[-0.03em] text-secondary-dark">
        {value}
      </p>
    </div>
  );
}

function ResultsScreen({
  inputs,
  results,
  assumptions,
  scenario,
  setInput,
  setAssumption,
  onScenarioChange,
  onReset,
  onBack,
}: {
  inputs: CalculatorInputs;
  results: ReturnType<typeof calculateResults>;
  assumptions: Assumptions;
  scenario: Scenario;
  setInput: InputSetter;
  setAssumption: AssumptionSetter;
  onScenarioChange: (scenario: Scenario) => void;
  onReset: () => void;
  onBack: () => void;
}) {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <div className="card-clean p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-dark">
                Results
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                Your estimated monthly opportunity
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                Based on your inputs, here is what Zonik AI could help your
                operation recover by reducing repetitive tracking work, catching
                issues earlier and freeing up team capacity.
              </p>
            </div>
            <ScenarioToggle value={scenario} onChange={onScenarioChange} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ResultsCard
            label="Labor Efficiency Savings"
            value={formatCurrency(results.laborEfficiencySavings)}
            description="Potential monthly savings from reducing repetitive manual tracking work."
            tone="accent"
          />
          <ResultsCard
            label="Quality & Claims Savings"
            value={formatCurrency(results.qualitySavings)}
            description="Potential monthly savings from fewer missed updates, claims and service failures."
            tone="success"
          />
          <ResultsCard
            label="Revenue Opportunity"
            value={formatCurrency(results.revenueOpportunity)}
            description="Potential monthly revenue opportunity if recovered team hours are redirected to sales-generating or customer-retention work."
            tone="warning"
          />
          <ResultsCard
            label="Total Monthly Impact"
            value={formatCurrency(results.totalMonthlyImpact)}
            description="Estimated monthly impact from labor efficiency, quality savings and recovered team capacity."
            tone="danger"
          />
        </div>

        <div className="card-clean p-6">
          <p className="text-sm font-semibold text-muted">Annualized Impact</p>
          <p className="mt-2 text-4xl font-bold tracking-[-0.05em] text-foreground">
            {formatCurrency(results.annualizedImpact)}
          </p>
          <p className="mt-2 text-sm text-muted">
            Estimated annual opportunity based on the selected monthly impact.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
          <ROIChart
            laborEfficiencySavings={results.laborEfficiencySavings}
            qualitySavings={results.qualitySavings}
            revenueOpportunity={results.revenueOpportunity}
          />
          <ImpactComparison />
        </div>

        <AssumptionsPanel
          assumptions={assumptions}
          revenuePerProductiveHour={inputs.revenuePerProductiveHour}
          onAssumptionChange={setAssumption}
          onRevenueChange={(value) => setInput("revenuePerProductiveHour", value)}
        />

        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="text-xs leading-5 text-muted">
            This calculator provides an estimate based on your inputs and
            selected assumptions. Actual savings and revenue impact may vary
            depending on your operation, workflow and implementation.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          Back to inputs
        </button>
      </div>

      <SalesCallSummary inputs={inputs} results={results} onReset={onReset} />
    </div>
  );
}

function ImpactComparison() {
  const before = [
    "Manual load checks",
    "Reactive issue detection",
    "Missed updates",
    "After-hours pressure",
    "Team focused on repetitive work",
  ];
  const after = [
    "Automated load monitoring",
    "Early risk alerts",
    "Clear exception-based workflow",
    "Better after-hours visibility",
    "Team focused on higher-value work",
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ComparisonCard title="Before Zonik AI" items={before} tone="muted" />
      <ComparisonCard title="With Zonik AI" items={after} tone="accent" />
    </div>
  );
}

function ComparisonCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "muted" | "accent";
}) {
  return (
    <div className="card-clean p-5">
      <h3 className="text-base font-bold">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm">
            <CheckCircle2
              className={
                tone === "accent"
                  ? "mt-0.5 h-4 w-4 shrink-0 text-success"
                  : "mt-0.5 h-4 w-4 shrink-0 text-muted"
              }
            />
            <span className="text-muted">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
