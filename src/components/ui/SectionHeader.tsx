import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label?: string;
  title: string;
  titleAccent?: string;
  punchline?: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  titleAccent,
  punchline,
  subtitle,
  centered = true,
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12 md:mb-16", className)}>
      {label && <span className="section-label mb-4 inline-flex">{label}</span>}

      <h2
        className={cn(
          "max-w-4xl text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.12]",
          centered && "mx-auto",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
        {titleAccent && (
          <>
            <br />
            <span className={dark ? "text-[#a5b4fc]" : "headline-accent"}>
              {titleAccent}
            </span>
          </>
        )}
      </h2>

      {punchline && (
        <p
          className={cn(
            "punchline mx-auto mt-5 max-w-2xl",
            dark ? "text-neutral-200" : "text-foreground"
          )}
        >
          {punchline}
        </p>
      )}

      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg",
            dark ? "text-neutral-400" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
