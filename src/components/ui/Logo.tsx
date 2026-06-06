import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-secondary/20 bg-accent-soft">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-foreground" fill="none">
          <path
            d="M2 14h3l1.5-4h9L17 14h3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="5" y="14" width="14" height="4" rx="1" fill="currentColor" opacity="0.15" />
          <circle cx="7" cy="18" r="1.5" fill="currentColor" />
          <circle cx="17" cy="18" r="1.5" fill="currentColor" />
          <path d="M8 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {showText && (
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
          Zonik <span className="text-highlight">AI</span>
        </span>
      )}
    </Link>
  );
}
