import { cn } from "@/lib/utils";

type TruckIllustrationProps = {
  className?: string;
  variant?: "semi" | "cab" | "icon";
};

export function TruckIllustration({
  className,
  variant = "semi",
}: TruckIllustrationProps) {
  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 48 48"
        className={cn("h-6 w-6", className)}
        fill="none"
        aria-hidden
      >
        <rect x="6" y="22" width="28" height="14" rx="2" fill="currentColor" opacity="0.12" />
        <path
          d="M34 22h6l4 6v8h-10V22z"
          fill="currentColor"
          opacity="0.2"
        />
        <rect x="6" y="22" width="28" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M34 22h6l4 6v8h-10V22z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="14" cy="36" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="36" cy="36" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (variant === "cab") {
    return (
      <svg
        viewBox="0 0 120 60"
        className={cn("h-auto w-full max-w-[120px]", className)}
        fill="none"
        aria-hidden
      >
        <rect x="4" y="20" width="70" height="28" rx="3" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1" />
        <path d="M74 28h16l10 12v8H74V28z" fill="#E0E7FF" stroke="#C7D2FE" strokeWidth="1" strokeLinejoin="round" />
        <rect x="82" y="32" width="10" height="8" rx="1" fill="#818CF8" opacity="0.3" />
        <circle cx="22" cy="48" r="6" fill="#FAFAFA" stroke="#A1A1AA" strokeWidth="1.5" />
        <circle cx="22" cy="48" r="2" fill="#71717A" />
        <circle cx="88" cy="48" r="6" fill="#FAFAFA" stroke="#A1A1AA" strokeWidth="1.5" />
        <circle cx="88" cy="48" r="2" fill="#71717A" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 80"
      className={cn("h-auto w-full", className)}
      fill="none"
      aria-hidden
    >
      <rect x="8" y="28" width="110" height="32" rx="4" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1" />
      <path
        d="M118 36h28l16 16v8H118V36z"
        fill="#EEF2FF"
        stroke="#C7D2FE"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <rect x="130" y="42" width="14" height="10" rx="1.5" fill="#818CF8" opacity="0.25" />
      <line x1="20" y1="36" x2="100" y2="36" stroke="#E4E4E7" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="38" cy="60" r="8" fill="#FAFAFA" stroke="#D4D4D8" strokeWidth="1.5" />
      <circle cx="38" cy="60" r="3" fill="#A1A1AA" />
      <circle cx="148" cy="60" r="8" fill="#FAFAFA" stroke="#D4D4D8" strokeWidth="1.5" />
      <circle cx="148" cy="60" r="3" fill="#A1A1AA" />
      <circle cx="170" cy="60" r="8" fill="#FAFAFA" stroke="#D4D4D8" strokeWidth="1.5" />
      <circle cx="170" cy="60" r="3" fill="#A1A1AA" />
    </svg>
  );
}
