"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function DashboardHeader() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatted =
    now?.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }) ?? "—";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          After-Hours Operations Center
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted md:text-[15px]">
          Live overview of active loads, truck activity, delays, GPS issues and loads that require
          attention.
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
        <p className="font-mono text-sm text-foreground">{formatted}</p>
        <div className="flex items-center gap-2 rounded-full border border-success/20 bg-success-bg px-3 py-1.5">
          <motion.span
            className="h-2 w-2 rounded-full bg-success"
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-semibold text-success">System Monitoring Active</span>
        </div>
      </div>
    </div>
  );
}
