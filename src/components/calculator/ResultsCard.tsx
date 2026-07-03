import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  description: string;
  tone?: "accent" | "success" | "warning" | "danger";
};

const tones = {
  accent: "bg-accent-soft text-secondary-dark border-secondary/20",
  success: "bg-success-bg text-success border-success/20",
  warning: "bg-warning-bg text-warning border-warning/20",
  danger: "bg-danger-bg text-danger border-danger/20",
};

export function ResultsCard({
  label,
  value,
  description,
  tone = "accent",
}: Props) {
  return (
    <div className="card-clean p-5">
      <div
        className={cn(
          "inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
          tones[tone]
        )}
      >
        {label}
      </div>
      <p className="mt-4 text-3xl font-bold tracking-[-0.04em] text-foreground">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
