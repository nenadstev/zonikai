"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HoverCardProps = {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
  accent?: "none" | "left" | "top";
};

export function HoverCard({
  children,
  className,
  spotlight = false,
  accent = "none",
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative rounded-2xl border border-border bg-white p-6 transition-colors duration-300",
        "hover:border-secondary/40 hover:shadow-[0_16px_40px_rgba(99,102,241,0.12)]",
        spotlight && "feature-spotlight",
        accent === "left" &&
          "border-l-[3px] border-l-secondary hover:border-l-secondary-dark",
        accent === "top" &&
          "overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:scale-x-0 before:bg-secondary before:transition-transform before:duration-300 hover:before:scale-x-100",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
