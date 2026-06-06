import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: React.ReactNode;
  id?: string;
  variant?: "default" | "muted" | "dark" | "accent" | "white";
  className?: string;
  bordered?: boolean;
};

const variants = {
  default: "bg-background",
  muted: "section-muted",
  dark: "section-dark",
  accent: "section-accent",
  white: "bg-white",
};

export function SectionShell({
  children,
  id,
  variant = "default",
  className,
  bordered = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28",
        variants[variant],
        bordered && "border-y border-border",
        className
      )}
    >
      {children}
    </section>
  );
}
