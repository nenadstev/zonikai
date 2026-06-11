"use client";

import { Info } from "lucide-react";

export function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <Info className="h-3.5 w-3.5 text-muted/60 transition-colors group-hover:text-secondary-dark" />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-white px-3 py-2 text-[11px] font-normal normal-case leading-relaxed text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {text}
      </span>
    </span>
  );
}
