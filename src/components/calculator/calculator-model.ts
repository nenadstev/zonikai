export type Scenario = "Conservative" | "Expected" | "Aggressive";

export type CalculatorInputs = {
  numberOfDispatchers: number;
  avgDispatcherMonthlyCost: number;
  numberOfAfterhoursOperators: number;
  avgAfterhoursMonthlyCost: number;
  trackingTimePercentage: number;
  activeLoadsPerMonth: number;
  avgCheckinsPerLoad: number;
  avgMinutesPerCheck: number;
  loadsMonitoredAfterhoursPerMonth: number;
  extraMinutesPerAfterhoursLoad: number;
  monthlyTrackingMistakes: number;
  avgCostPerMistake: number;
  monthlyClaims: number;
  avgCostPerClaim: number;
  monthlyPenalties: number;
  revenuePerProductiveHour: number;
};

export type Assumptions = {
  workReductionPercentage: number;
  errorReductionPercentage: number;
  productiveReallocationPercentage: number;
  scenarioMultiplier: number;
};

export type CalculatorResults = {
  averageTotalTeamCost: number;
  trackingTeamCost: number;
  manualTrackingHours: number;
  afterhoursTrackingHours: number;
  totalManualTrackingHours: number;
  estimatedHourlyTeamCost: number;
  manualTrackingLaborCost: number;
  trackingErrorCost: number;
  freedHours: number;
  productiveHours: number;
  revenueOpportunity: number;
  laborEfficiencySavings: number;
  qualitySavings: number;
  totalMonthlyImpact: number;
  annualizedImpact: number;
};

export const defaultInputs: CalculatorInputs = {
  numberOfDispatchers: 6,
  avgDispatcherMonthlyCost: 4500,
  numberOfAfterhoursOperators: 2,
  avgAfterhoursMonthlyCost: 4000,
  trackingTimePercentage: 35,
  activeLoadsPerMonth: 900,
  avgCheckinsPerLoad: 3,
  avgMinutesPerCheck: 4,
  loadsMonitoredAfterhoursPerMonth: 300,
  extraMinutesPerAfterhoursLoad: 6,
  monthlyTrackingMistakes: 8,
  avgCostPerMistake: 350,
  monthlyClaims: 3,
  avgCostPerClaim: 1200,
  monthlyPenalties: 2500,
  revenuePerProductiveHour: 120,
};

export const scenarioPresets: Record<Scenario, Assumptions> = {
  Conservative: {
    workReductionPercentage: 20,
    errorReductionPercentage: 15,
    productiveReallocationPercentage: 40,
    scenarioMultiplier: 0.5,
  },
  Expected: {
    workReductionPercentage: 35,
    errorReductionPercentage: 30,
    productiveReallocationPercentage: 50,
    scenarioMultiplier: 1,
  },
  Aggressive: {
    workReductionPercentage: 50,
    errorReductionPercentage: 45,
    productiveReallocationPercentage: 65,
    scenarioMultiplier: 1.3,
  },
};

const safeNumber = (value: number | undefined) =>
  Number.isFinite(value) ? Number(value) : 0;

export function calculateResults(
  inputs: CalculatorInputs,
  assumptions: Assumptions
): CalculatorResults {
  const numberOfDispatchers = safeNumber(inputs.numberOfDispatchers);
  const avgDispatcherMonthlyCost = safeNumber(inputs.avgDispatcherMonthlyCost);
  const numberOfAfterhoursOperators = safeNumber(inputs.numberOfAfterhoursOperators);
  const avgAfterhoursMonthlyCost = safeNumber(inputs.avgAfterhoursMonthlyCost);
  const totalTeamMembers = numberOfDispatchers + numberOfAfterhoursOperators;

  const averageTotalTeamCost =
    numberOfDispatchers * avgDispatcherMonthlyCost +
    numberOfAfterhoursOperators * avgAfterhoursMonthlyCost;
  const trackingTeamCost =
    averageTotalTeamCost * (safeNumber(inputs.trackingTimePercentage) / 100);

  const manualTrackingHours =
    (safeNumber(inputs.activeLoadsPerMonth) *
      safeNumber(inputs.avgCheckinsPerLoad) *
      safeNumber(inputs.avgMinutesPerCheck)) /
    60;
  const afterhoursTrackingHours =
    (safeNumber(inputs.loadsMonitoredAfterhoursPerMonth) *
      safeNumber(inputs.extraMinutesPerAfterhoursLoad)) /
    60;
  const totalManualTrackingHours = manualTrackingHours + afterhoursTrackingHours;
  const estimatedHourlyTeamCost =
    totalTeamMembers > 0 ? averageTotalTeamCost / 173.33 / totalTeamMembers : 28;
  const manualTrackingLaborCost =
    totalManualTrackingHours * estimatedHourlyTeamCost;

  const trackingErrorCost =
    safeNumber(inputs.monthlyTrackingMistakes) *
      safeNumber(inputs.avgCostPerMistake) +
    safeNumber(inputs.monthlyClaims) * safeNumber(inputs.avgCostPerClaim) +
    safeNumber(inputs.monthlyPenalties);

  const workReductionRate = safeNumber(assumptions.workReductionPercentage) / 100;
  const errorReductionRate = safeNumber(assumptions.errorReductionPercentage) / 100;
  const productiveReallocationRate =
    safeNumber(assumptions.productiveReallocationPercentage) / 100;

  const freedHours = totalManualTrackingHours * workReductionRate;
  const productiveHours = freedHours * productiveReallocationRate;
  const revenueOpportunity =
    productiveHours *
    safeNumber(inputs.revenuePerProductiveHour) *
    safeNumber(assumptions.scenarioMultiplier);
  const laborEfficiencySavings = manualTrackingLaborCost * workReductionRate;
  const qualitySavings = trackingErrorCost * errorReductionRate;
  const totalMonthlyImpact =
    laborEfficiencySavings + qualitySavings + revenueOpportunity;
  const annualizedImpact = totalMonthlyImpact * 12;

  return {
    averageTotalTeamCost,
    trackingTeamCost,
    manualTrackingHours,
    afterhoursTrackingHours,
    totalManualTrackingHours,
    estimatedHourlyTeamCost,
    manualTrackingLaborCost,
    trackingErrorCost,
    freedHours,
    productiveHours,
    revenueOpportunity,
    laborEfficiencySavings,
    qualitySavings,
    totalMonthlyImpact,
    annualizedImpact,
  };
}

export function formatCurrency(value: number, suffix = "") {
  return `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value || 0))}${suffix}`;
}

export function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value || 0);
}
