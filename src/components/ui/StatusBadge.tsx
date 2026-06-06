import { cn } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "danger" | "neutral";

type StatusBadgeProps = {
  children: React.ReactNode;
  variant?: StatusVariant;
  className?: string;
};

const variants: Record<StatusVariant, string> = {
  success: "bg-success-bg text-success border border-success/10",
  warning: "bg-warning-bg text-warning border border-warning/10",
  danger: "bg-danger-bg text-danger border border-danger/10",
  neutral: "bg-surface text-muted border border-border",
};

export function StatusBadge({
  children,
  variant = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
