import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "accent" | "outlineDark";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-foreground border border-border hover:border-secondary/50 hover:bg-accent-soft/30",
    outlineDark:
      "border border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60",
    accent:
      "bg-secondary-dark text-white hover:bg-secondary shadow-md shadow-secondary/25 hover:shadow-lg hover:shadow-secondary/30",
    ghost: "text-muted hover:text-secondary-dark hover:bg-accent-soft rounded-lg hover:scale-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && "opacity-60 cursor-not-allowed hover:scale-100")}
    >
      {children}
    </button>
  );
}
