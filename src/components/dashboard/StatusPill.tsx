import { cn } from "@/lib/utils";

const variants = {
  success: "bg-success-bg text-success border-success/20",
  warning: "bg-warning-bg text-warning border-warning/20",
  danger: "bg-danger-bg text-danger border-danger/20",
  neutral: "bg-surface text-muted border-border",
  accent: "bg-accent-soft text-secondary-dark border-secondary/20",
};

export function StatusPill({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function riskVariant(risk: string): keyof typeof variants {
  if (risk === "HIGH") return "danger";
  if (risk === "MEDIUM") return "warning";
  if (risk === "LOW") return "success";
  return "neutral";
}

export function trackingVariant(status: string): keyof typeof variants {
  if (status === "ON TIME") return "success";
  if (status === "LATE") return "danger";
  if (status === "MAJOR DELAY") return "danger";
  if (status === "AT RISK") return "warning";
  return "neutral";
}

export function gpsVariant(status: string): keyof typeof variants {
  if (status === "OK") return "success";
  if (status === "STALE") return "warning";
  if (status === "OFFLINE") return "danger";
  return "neutral";
}
