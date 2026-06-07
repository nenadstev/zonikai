"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const ROUTE =
  "M 36 132 C 72 52, 118 78, 158 88 S 248 62, 308 78 S 352 92, 368 98";

type RouteMapProps = {
  viewBox?: string;
  height?: string;
  showLabels?: boolean;
  compact?: boolean;
  theme?: "light" | "dark";
};

export function RouteMapAnimation({
  viewBox = "0 0 400 180",
  height = "h-auto w-full",
  showLabels = true,
  compact = false,
  theme = "light",
}: RouteMapProps) {
  const uid = useId().replace(/:/g, "");
  const routeActiveId = `routeActive-${uid}`;
  const routeGlowId = `routeGlow-${uid}`;
  const truckGlowId = `truckGlow-${uid}`;

  const bg = theme === "dark" ? "#18181B" : compact ? "#FAFAFA" : "#F8FAFC";
  const gridStroke = theme === "dark" ? "#27272A" : "#ECECEC";
  const labelFill = theme === "dark" ? "#A1A1AA" : "#737373";

  return (
    <svg viewBox={viewBox} className={height} aria-hidden>
      <defs>
        <linearGradient id={routeActiveId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#818CF8" stopOpacity="1" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={routeGlowId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0" />
          <stop offset="50%" stopColor="#818CF8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
        </linearGradient>
        <filter id={truckGlowId}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="180" fill={bg} rx="8" />

      {[...Array(6)].map((_, i) => (
        <line
          key={`g${i}`}
          x1="0"
          y1={i * 36}
          x2="400"
          y2={i * 36}
          stroke={gridStroke}
          strokeWidth="0.75"
        />
      ))}

      <path
        d={ROUTE}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />

      <motion.path
        d={ROUTE}
        fill="none"
        stroke={`url(#${routeActiveId})`}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0.4, 1, 1, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.55, 1] }}
      />

      <motion.path
        d={ROUTE}
        fill="none"
        stroke={`url(#${routeGlowId})`}
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0.12, pathOffset: 0, opacity: 0.6 }}
        animate={{ pathOffset: [0, 1], opacity: 0.6 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <g>
        <motion.circle
          cx="36"
          cy="132"
          r="10"
          fill="#16A34A"
          initial={{ opacity: 0.15, scale: 1 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <circle cx="36" cy="132" r="4" fill="#16A34A" />
        {showLabels && (
          <text x="36" y="155" textAnchor="middle" fill={labelFill} fontSize="9" fontWeight="500">
            Pickup
          </text>
        )}
      </g>

      <g>
        <motion.circle
          cx="368"
          cy="98"
          r="10"
          fill="#818CF8"
          initial={{ opacity: 0.15, scale: 1 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <circle cx="368" cy="98" r="4" fill="#6366F1" />
        {showLabels && (
          <text x="368" y="121" textAnchor="middle" fill={labelFill} fontSize="9" fontWeight="500">
            Delivery
          </text>
        )}
      </g>

      <motion.g
        filter={`url(#${truckGlowId})`}
        style={{ offsetPath: `path('${ROUTE}')`, offsetRotate: "auto" } as React.CSSProperties}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <rect x="-8" y="-4" width="14" height="7" rx="1.2" fill="#6366F1" />
        <rect x="4" y="-2.5" width="6" height="5" rx="0.6" fill="#C7D2FE" />
        <circle cx="-4" cy="4.5" r="1.8" fill="#52525B" />
        <circle cx="7" cy="4.5" r="1.8" fill="#52525B" />
      </motion.g>

      <motion.g
        style={{ offsetPath: `path('${ROUTE}')`, offsetRotate: "auto" } as React.CSSProperties}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0.15 }}
      >
        <motion.circle
          cx="0"
          cy="0"
          r="6"
          fill="#818CF8"
          initial={{ opacity: 0.5, scale: 0.6 }}
          animate={{ opacity: [0.5, 0], scale: [0.6, 1.8] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  );
}
