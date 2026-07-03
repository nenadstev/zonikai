import { formatCurrency } from "./calculator-model";

type Props = {
  laborEfficiencySavings: number;
  qualitySavings: number;
  revenueOpportunity: number;
};

export function ROIChart({
  laborEfficiencySavings,
  qualitySavings,
  revenueOpportunity,
}: Props) {
  const total =
    laborEfficiencySavings + qualitySavings + revenueOpportunity || 1;
  const segments = [
    {
      label: "Labor Efficiency",
      value: laborEfficiencySavings,
      color: "bg-secondary-dark",
    },
    {
      label: "Quality Savings",
      value: qualitySavings,
      color: "bg-success",
    },
    {
      label: "Revenue Opportunity",
      value: revenueOpportunity,
      color: "bg-warning",
    },
  ];

  return (
    <div className="card-clean p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Impact Breakdown</h3>
          <p className="mt-1 text-xs text-muted">
            Estimated monthly impact by category
          </p>
        </div>
      </div>

      <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-surface">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={segment.color}
            style={{ width: `${(segment.value / total) * 100}%` }}
          />
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${segment.color}`} />
              <span className="font-medium text-foreground">{segment.label}</span>
            </div>
            <span className="font-mono text-xs text-muted">
              {formatCurrency(segment.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
