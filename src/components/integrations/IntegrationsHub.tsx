"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Database,
  LayoutList,
  MapPin,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { IntegrationLogo } from "@/components/ui/IntegrationLogo";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const eld = [
  { name: "Samsara", logo: "/integrations/samsara.svg" },
  { name: "Geotab", logo: "/integrations/geotab.svg" },
  { name: "Motive", logo: "/integrations/motive.svg" },
  { name: "Omnitracs", logo: "/integrations/omnitracs.png" },
  { name: "Platform Science", logo: "/integrations/platform-science.png" },
  { name: "Trimble", logo: "/integrations/trimble.svg" },
  { name: "ELD Rider", logo: "/integrations/eld-rider.svg" },
  { name: "Verizon Connect", logo: "/integrations/verizon-connect.svg" },
];

const tms = ["McLeod", "TMW", "Aljex", "AscendTMS", "DAT", "Truckstop"];
const pm = ["Asana", "Monday.com", "Jira", "ClickUp"];
const comm = ["Slack", "Teams", "Email", "SMS"];

function Cable({ axis }: { axis: "x" | "y" }) {
  const horizontal = axis === "x";
  return (
    <svg
      className={cn(
        "shrink-0 overflow-visible",
        horizontal ? "h-4 w-12 min-w-10 flex-1 md:w-20" : "mx-auto h-12 w-4 md:h-16"
      )}
      viewBox={horizontal ? "0 0 120 16" : "0 0 16 80"}
      preserveAspectRatio="none"
      aria-hidden
    >
      <line
        x1={horizontal ? 0 : 8}
        y1={horizontal ? 8 : 0}
        x2={horizontal ? 120 : 8}
        y2={horizontal ? 8 : 80}
        stroke="#4E46FC"
        strokeOpacity="0.25"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <motion.line
        x1={horizontal ? 0 : 8}
        y1={horizontal ? 8 : 0}
        x2={horizontal ? 120 : 8}
        y2={horizontal ? 8 : 80}
        stroke="#818CF8"
        strokeWidth="2"
        strokeDasharray="4 8"
        animate={{ strokeDashoffset: [0, -24] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        r="3.5"
        fill="#fff"
        animate={
          horizontal
            ? { cx: [6, 114], cy: 8 }
            : { cx: 8, cy: [6, 74] }
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function BranchCard({
  label,
  icon: Icon,
  children,
  className,
}: {
  label: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative min-w-0 w-full rounded-3xl border border-white/10 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] md:p-6",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b1b3a] text-[#a5b4fc]">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b1b3a]">
          {label}
        </p>
      </div>
      {children}
    </div>
  );
}

function NameChip({ name }: { name: string }) {
  return (
    <span className="inline-flex w-full min-w-0 items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
      {name}
    </span>
  );
}

function LogoTile({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-2 py-3 shadow-sm">
      <IntegrationLogo name={name} src={logo} className="h-7" />
      <span className="mt-2 text-center text-[10px] font-medium text-muted">{name}</span>
    </div>
  );
}

function Hub({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative z-10 flex items-center justify-center",
        compact ? "h-24 w-24 md:h-28 md:w-28" : "h-36 w-36 md:h-40 md:w-40"
      )}
    >
      <motion.span
        className="absolute inset-0 rounded-full border border-[#818CF8]/30"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-3 rounded-full border border-[#818CF8]/50"
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.2, 0.7] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(129,140,248,0.45)",
            "0 0 40px 8px rgba(78,70,252,0.35)",
            "0 0 0 0 rgba(129,140,248,0.45)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className={cn(
          "relative flex items-center justify-center rounded-full border border-white/20 bg-white",
          compact ? "h-16 w-16 md:h-20 md:w-20" : "h-24 w-24 md:h-28 md:w-28"
        )}
      >
        <Image
          src="/brand/zonik-pin.png"
          alt="Zonik"
          width={56}
          height={61}
          className={cn("w-auto object-contain", compact ? "h-8 md:h-10" : "h-12 md:h-14")}
        />
      </motion.div>
    </div>
  );
}

function EldBranch({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const items = compact ? eld.slice(0, 4) : eld;
  return (
    <BranchCard label={t.integrations.eld} icon={MapPin} className={compact ? "p-3 md:p-4" : undefined}>
      <div className={cn("grid gap-2.5", compact ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-4")}>
        {items.map((item) => (
          <LogoTile key={item.name} {...item} />
        ))}
      </div>
    </BranchCard>
  );
}

function TmsBranch({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const items = compact ? tms.slice(0, 4) : tms;
  return (
    <BranchCard label={t.integrations.tms} icon={Database} className={cn("min-w-0 flex-1", compact && "p-3 md:p-4")}>
      <div className={cn("flex flex-col gap-2", compact && "gap-1.5")}>
        {items.map((name) => (
          <NameChip key={name} name={name} />
        ))}
      </div>
    </BranchCard>
  );
}

function CommBranch({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <BranchCard
      label={t.integrations.comm}
      icon={MessageSquare}
      className={cn("min-w-0 flex-1", compact && "p-3 md:p-4")}
    >
      <div className={cn("flex flex-col gap-2", compact && "gap-1.5")}>
        {comm.map((name) => (
          <NameChip key={name} name={name} />
        ))}
      </div>
    </BranchCard>
  );
}

function PmBranch({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <BranchCard
      label={t.integrations.pm}
      icon={LayoutList}
      className={cn("mx-auto max-w-xl", compact && "p-3 md:p-4")}
    >
      <div className="flex flex-wrap gap-2">
        {pm.map((name) => (
          <span
            key={name}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {name}
          </span>
        ))}
      </div>
    </BranchCard>
  );
}

export function IntegrationsHub({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] bg-[#0b1b3a]",
        compact ? "px-4 py-5 md:px-6 md:py-6" : "px-5 py-8 sm:px-8 md:px-10 md:py-12"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(165,180,252,0.7) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4E46FC]/25 blur-[90px]" />
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-[#818CF8]/20 blur-[70px]" />
      <div className="pointer-events-none absolute -right-10 bottom-8 h-40 w-40 rounded-full bg-[#4E46FC]/20 blur-[60px]" />

      <div className="relative">
        <div className="flex flex-col items-center lg:hidden">
          <Hub compact={compact} />
          <Cable axis="y" />
          <div className="flex w-full flex-col gap-5">
            <EldBranch compact={compact} />
            <TmsBranch compact={compact} />
            <PmBranch compact={compact} />
            <CommBranch compact={compact} />
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] lg:items-center lg:gap-x-2">
          <div className="col-span-3 mx-auto w-full max-w-3xl">
            <EldBranch compact={compact} />
          </div>

          <div />
          <Cable axis="y" />
          <div />

          <div className="flex min-w-0 items-center">
            <TmsBranch compact={compact} />
            <Cable axis="x" />
          </div>
          <div className="flex justify-center px-1">
            <Hub compact={compact} />
          </div>
          <div className="flex min-w-0 items-center">
            <Cable axis="x" />
            <CommBranch compact={compact} />
          </div>

          <div />
          <Cable axis="y" />
          <div />

          <div className="col-span-3">
            <PmBranch compact={compact} />
          </div>
        </div>
      </div>
    </div>
  );
}
