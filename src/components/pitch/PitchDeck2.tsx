"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bell,
  Check,
  Eye,
  Globe,
  Link2,
  Mail,
  Phone,
  PhoneCall,
  Sun,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  PITCH2_AFTER_INDEX,
  PITCH2_HOW_INDEX,
  PITCH2_LOAD_CALL_INDEX,
  PITCH2_LOAD_DELAY_INDEX,
  PITCH2_LOAD_ONTIME_INDEX,
  PITCH2_NIGHT_INDEX,
  PITCH2_SLIDE_COUNT,
} from "@/lib/pitch-slides-2";
import { pitch2 as s } from "@/lib/pitch2-copy";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  AlertVisual,
  ConnectVisual,
  MonitorVisual,
  VoiceVisual,
} from "@/components/home/HowItWorksVisuals";
import { IntegrationsHub } from "@/components/integrations/IntegrationsHub";
import { cn } from "@/lib/utils";

const H = "min-h-[100dvh]";
const COUNT = PITCH2_SLIDE_COUNT;
const howVisuals = [ConnectVisual, MonitorVisual, VoiceVisual, AlertVisual] as const;
const howIcons = [Link2, Eye, PhoneCall, Bell];

function makeRoute(w: number, h: number, vh: number) {
  const padY = Math.min(vh * 0.1, 88);
  const cx = w / 2;
  const usable = Math.max(vh, h - padY * 2);
  const bends = Math.max(COUNT, Math.round(usable / Math.max(vh * 0.9, 1)));
  const step = usable / bends;
  const amp = Math.min(w * 0.28, step * 0.42);
  let d = `M ${cx} ${padY}`;
  const stops: { x: number; y: number }[] = [];
  for (let i = 0; i < bends; i++) {
    const y0 = padY + i * step;
    const y1 = padY + (i + 1) * step;
    const bx = i % 2 === 0 ? cx - amp : cx + amp;
    d += ` C ${bx} ${y0 + step * 0.32}, ${bx} ${y1 - step * 0.32}, ${cx} ${y1}`;
    stops.push({ x: bx, y: y0 + step * 0.5 });
  }
  return { d, stops };
}

function lengthAtY(path: SVGPathElement, targetY: number, len: number) {
  let lo = 0;
  let hi = len;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).y < targetY) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function PitchMapTruck() {
  return (
    <svg viewBox="0 0 64 32" className="h-8 w-auto overflow-visible" aria-hidden>
      <defs>
        <filter id="pitch2-truck-glow" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="pitch2-truck-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <ellipse className="pitch-truck-halo" cx="32" cy="16" rx="28" ry="13" fill="#38BDF8" />
      <circle className="pitch-truck-halo" cx="32" cy="16" r="14" fill="none" stroke="#7DD3FC" strokeWidth="1.2" />
      <g filter="url(#pitch2-truck-glow)">
        <rect x="10" y="4" width="7" height="2.6" rx="1.3" fill="#0F172A" />
        <rect x="22" y="4" width="7" height="2.6" rx="1.3" fill="#0F172A" />
        <rect x="10" y="25.4" width="7" height="2.6" rx="1.3" fill="#0F172A" />
        <rect x="22" y="25.4" width="7" height="2.6" rx="1.3" fill="#0F172A" />
        <rect x="42" y="5" width="6" height="2.4" rx="1.2" fill="#0F172A" />
        <rect x="42" y="24.6" width="6" height="2.4" rx="1.2" fill="#0F172A" />
        <rect x="6" y="7" width="32" height="18" rx="2.6" fill="url(#pitch2-truck-body)" />
        <rect x="9" y="10" width="26" height="12" rx="1.6" fill="#60A5FA" opacity="0.55" />
        <rect x="38" y="8.5" width="16" height="15" rx="2.4" fill="#93C5FD" />
        <rect x="44" y="11" width="8" height="10" rx="1.4" fill="#E0F2FE" />
        <rect x="53.5" y="12" width="2.6" height="3.4" rx="0.7" fill="#FDE68A" />
        <rect x="53.5" y="16.6" width="2.6" height="3.4" rx="0.7" fill="#FDE68A" />
      </g>
    </svg>
  );
}

function PitchRoute({
  pathRef,
  fillRef,
  truckRef,
  truckBodyRef,
  onLayout,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  fillRef: React.RefObject<SVGPathElement | null>;
  truckRef: React.RefObject<HTMLDivElement | null>;
  truckBodyRef: React.RefObject<HTMLDivElement | null>;
  onLayout: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (box.w < 8 || box.h < 8) return;
    onLayout();
  }, [box, onLayout]);

  const route = box.w > 8 && box.h > 8 ? makeRoute(box.w, box.h, Math.min(box.h, window.innerHeight)) : null;

  return (
    <div ref={boxRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(165,180,252,0.7) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      {route ? (
        <svg
          viewBox={`0 0 ${box.w} ${box.h}`}
          width={box.w}
          height={box.h}
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="pitch2-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={route.d}
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={route.d}
            fill="none"
            stroke="#818CF8"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="10 18"
            opacity="0.4"
          />
          <path ref={pathRef} d={route.d} fill="none" stroke="transparent" strokeWidth="1" />
          <path
            ref={fillRef}
            d={route.d}
            fill="none"
            stroke="#4E46FC"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            filter="url(#pitch2-glow)"
            opacity="0.95"
          />
          {route.stops.map((stop) => (
            <circle
              key={`${stop.x}-${stop.y}`}
              cx={stop.x}
              cy={stop.y}
              r="5"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(165,180,252,0.45)"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      ) : null}
      <div
        ref={truckRef}
        className="absolute left-1/2 top-0 z-[1] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          ref={truckBodyRef}
          className="will-change-transform drop-shadow-[0_0_18px_rgba(56,189,248,0.95)]"
        >
          <PitchMapTruck />
        </div>
        <div className="absolute left-1/2 top-[24px] -translate-x-1/2 whitespace-nowrap rounded-full border border-sky-300/35 bg-[#0b1b3a]/85 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wide text-sky-100">
          T-1042
        </div>
      </div>
    </div>
  );
}

function VoiceBars({ active }: { active: boolean }) {
  return (
    <div className="flex h-5 items-end gap-0.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-[#4E46FC]"
          animate={active ? { height: [4, 18, 7, 16, 5] } : { height: 4 }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function BrokerCallVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between gap-3 p-5">
      <div className="flex items-center justify-between">
        {["T-2187", "T-3301", "T-1042"].map((id, i) => (
          <div
            key={id}
            className={cn(
              "rounded-xl border px-3 py-2 text-center",
              i === 2
                ? "border-warning bg-warning-bg"
                : "border-border bg-surface/70"
            )}
          >
            <Truck className={cn("mx-auto h-4 w-4", i === 2 ? "text-warning" : "text-[#3f3f46]")} />
            <p className="mt-1 font-mono text-[11px] font-semibold">{id}</p>
            <p className={cn("text-[10px] font-semibold", i === 2 ? "text-warning" : "text-success")}>
              {i === 2 ? "At risk" : "On time"}
            </p>
          </div>
        ))}
      </div>
      <motion.div
        animate={active ? { y: [4, 0, 4] } : undefined}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="rounded-2xl border-2 border-danger/40 bg-danger-bg p-4"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-danger text-white">
            <Phone className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-danger">{s.today.incoming}</p>
            <p className="text-sm font-semibold">{s.today.broker}</p>
          </div>
        </div>
        <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm leading-snug">“{s.today.bubble}”</p>
      </motion.div>
      <div className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning-bg px-3 py-2.5">
        <ImageAna />
        <div>
          <p className="text-sm font-semibold">{s.today.operator}</p>
          <p className="text-[11px] text-warning">{s.today.operatorLine}</p>
        </div>
      </div>
    </div>
  );
}

function ImageAna() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/pitch/ana-after-hours-agent.png"
      alt=""
      width={40}
      height={40}
      className="h-10 w-10 rounded-full object-cover object-top"
    />
  );
}

function WorkflowVisual({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setStep((n) => (n + 1) % s.workflow.chain.length), 1400);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="flex h-full flex-col justify-between gap-4 p-5">
      <div className="flex flex-wrap items-center gap-1.5">
        {s.workflow.chain.map((item, i) => (
          <div key={item} className="flex items-center gap-1.5">
            <div
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold",
                step === i
                  ? "border-warning bg-warning-bg text-warning"
                  : "border-border bg-surface text-[#3f3f46]"
              )}
            >
              {item}
            </div>
            {i < s.workflow.chain.length - 1 ? <ArrowRight className="h-3 w-3 text-[#3f3f46]" /> : null}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3f3f46]">ELD</p>
          <p className="mt-2 font-mono text-sm font-semibold">T-1042 on I-70</p>
          <p className={cn("mt-1 text-xs", step >= 2 ? "text-warning" : "text-[#3f3f46]")}>
            {step >= 2 ? "ETA 20:45 vs 20:00" : "Location copied"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3f3f46]">Google Maps</p>
          <p className="mt-2 text-sm font-semibold">Chicago unload</p>
          <p className="mt-1 font-mono text-lg font-semibold text-warning">20:45</p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-border px-3 py-2">
        <p className="text-sm font-medium">{s.workflow.queue}</p>
        <p className="font-mono text-sm font-semibold text-warning">T-2187 then T-3301</p>
      </div>
    </div>
  );
}

function LanguageVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-3 p-5">
      <div className="grid grid-cols-3 gap-2">
        {s.language.drivers.map((d) => (
          <div key={d.id} className="rounded-xl border border-border bg-surface/60 p-3 text-center">
            <Truck className="mx-auto h-4 w-4 text-[#3f3f46]" />
            <p className="mt-1 font-mono text-[11px] font-semibold">{d.id}</p>
            <p className="text-[11px] text-[#3f3f46]">{d.name}</p>
            <p className="mt-2 inline-flex items-center gap-1 rounded-full border border-secondary/25 bg-[#eeedff] px-2 py-0.5 text-[10px] font-semibold text-secondary-dark">
              <Globe className="h-3 w-3" />
              {d.lang}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning-bg px-3 py-3">
        <ImageAna />
        <div>
          <p className="text-sm font-semibold">{s.language.operator}</p>
          <p className="text-[11px] font-medium text-warning">Trying T-2187 in Spanish</p>
        </div>
      </div>
    </div>
  );
}

function CostVisual() {
  return (
    <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-3 p-5">
      <div className="rounded-xl border border-border bg-surface/70 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3f3f46]">{s.cost.timeLabel}</p>
        <ul className="mt-3 space-y-2">
          {s.cost.timeItems.map((item) => (
            <li key={item} className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm font-medium text-warning">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-between rounded-xl border border-dashed border-warning/40 bg-warning-bg/60 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-warning">{s.cost.bookedLabel}</p>
        <p className="font-mono text-5xl font-semibold text-warning">{s.cost.bookedValue}</p>
      </div>
    </div>
  );
}

function IdeaVisual({ active }: { active: boolean }) {
  return (
    <div className="grid h-full grid-cols-[1fr_auto_1fr] items-stretch gap-2 p-4">
      <div className="flex flex-col rounded-2xl border border-border bg-[#111111] p-4 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">{s.idea.beforeLabel}</p>
        <p className="mt-1 text-sm font-semibold">{s.idea.operatorLabel}</p>
        <ul className="mt-4 flex-1 space-y-2">
          {s.idea.beforeTasks.map((task, i) => (
            <motion.li
              key={task}
              animate={
                active
                  ? { x: [0, 12, 0], opacity: [1, 0.35, 1] }
                  : undefined
              }
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15 }}
              className="rounded-xl border border-warning/40 bg-warning-bg px-3 py-2.5 text-sm font-semibold text-[#9a3412]"
            >
              {task}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center px-1">
        <motion.div
          animate={active ? { x: [0, 6, 0] } : undefined}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex-1 rounded-2xl border-2 border-secondary/40 bg-[#eeedff] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-dark">{s.idea.zonikLabel}</p>
          <p className="mt-1 text-xs font-medium text-secondary-dark">{s.idea.zonikLine}</p>
          <ul className="mt-3 space-y-2">
            {s.idea.afterZonik.map((task) => (
              <li key={task} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 text-sm font-semibold text-secondary-dark">
                <Check className="h-3.5 w-3.5 shrink-0" />
                {task}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 rounded-2xl border-2 border-success/40 bg-success-bg p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-success">{s.idea.teamLabel}</p>
          <p className="mt-1 text-xs font-medium text-[#14532d]">{s.idea.teamLine}</p>
          <ul className="mt-3 space-y-2">
            {s.idea.afterTeam.map((task) => (
              <li key={task} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 text-sm font-semibold text-foreground">
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-success" />
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function LoadOnTimeVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-xs font-medium text-[#3f3f46]">#48291, T-1042</p>
          <p className="mt-1 text-lg font-semibold">{s.loadOnTime.nextStop}</p>
        </div>
        <StatusBadge variant="success">{s.loadOnTime.status}</StatusBadge>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-surface/60 p-4">
          <p className="text-xs text-[#3f3f46]">{s.loadOnTime.scheduled}</p>
          <p className="mt-2 font-mono text-3xl font-semibold">20:00</p>
        </div>
        <motion.div
          animate={active ? { borderColor: ["#22c55e", "#86efac", "#22c55e"] } : undefined}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="rounded-2xl border-2 border-success bg-success-bg p-4"
        >
          <p className="text-xs text-success">{s.loadOnTime.liveEta}</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-success">19:47</p>
        </motion.div>
      </div>
    </div>
  );
}

function LoadDelayVisual({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-xs font-medium text-[#3f3f46]">#48291, T-1042</p>
          <p className="mt-1 text-lg font-semibold">{s.loadOnTime.nextStop}</p>
        </div>
        <StatusBadge variant="warning">{s.loadDelay.status}</StatusBadge>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-surface/60 p-4">
          <p className="text-xs text-[#3f3f46]">{s.loadDelay.scheduled}</p>
          <p className="mt-2 font-mono text-3xl font-semibold">20:00</p>
        </div>
        <motion.div
          animate={active ? { borderColor: ["#f97316", "#fdba74", "#f97316"] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="rounded-2xl border-2 border-warning bg-warning-bg p-4"
        >
          <p className="text-xs text-warning">{s.loadDelay.liveEta}</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-warning">20:45</p>
        </motion.div>
      </div>
      <p className="text-center text-sm font-semibold text-warning">
        {s.loadDelay.late}, {s.loadDelay.risk}
      </p>
      <div className="flex items-center justify-center gap-2 rounded-xl border border-secondary/30 bg-accent-soft px-3 py-2 text-sm font-medium text-secondary-dark">
        <PhoneCall className="h-4 w-4" />
        {s.loadDelay.call}
      </div>
    </div>
  );
}

function LoadCallVisual({ active }: { active: boolean }) {
  const fields = [
    { label: s.loadCall.extract.reason, value: s.loadCall.extract.reasonVal },
    { label: s.loadCall.extract.eta, value: s.loadCall.extract.etaVal },
    { label: s.loadCall.extract.status, value: s.loadCall.extract.statusVal },
  ];
  return (
    <div className="grid h-full gap-3 p-4 md:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col justify-center gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary">{s.loadCall.language}</p>
        <div className="rounded-2xl border border-secondary/25 bg-accent-soft p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-secondary-dark">{s.loadCall.zonik}</p>
            <VoiceBars active={active} />
          </div>
          <p className="mt-2 rounded-xl bg-white px-3 py-2 text-sm">“{s.loadCall.line}”</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="text-sm font-semibold">{s.loadCall.driver}</p>
          <p className="mt-2 rounded-xl bg-success-bg px-3 py-2 text-sm text-success">“{s.loadCall.reply}”</p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2">
        {fields.map((field, i) => (
          <motion.div
            key={field.label}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 8 }}
            transition={{ delay: 0.2 + i * 0.2 }}
            className="rounded-xl border border-border bg-white px-4 py-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3f3f46]">{field.label}</p>
            <p className="mt-1 font-mono text-lg font-semibold">{field.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function KnowsVisual() {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="rounded-xl border border-border bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm font-semibold">#48291, T-1042</p>
          <StatusBadge variant="warning">{s.knows.status}</StatusBadge>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#3f3f46]">{s.knows.reason}</p>
            <p className="font-semibold">{s.knows.reasonVal}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#3f3f46]">{s.knows.eta}</p>
            <p className="font-mono font-semibold">{s.knows.etaVal}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#3f3f46]">{s.knows.contact}</p>
            <p className="font-semibold">{s.knows.contactVal}</p>
          </div>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="rounded-xl border border-danger/20 bg-danger-bg p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-danger">{s.knows.oldTitle}</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {s.knows.oldItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-success/30 bg-success-bg p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-success">{s.knows.newTitle}</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {s.knows.newItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PathsVisual({ active }: { active: boolean }) {
  return (
    <div className="grid h-full gap-3 text-foreground md:grid-cols-[1fr_auto_1fr]">
      <div className="rounded-2xl border-2 border-success/40 bg-success-bg p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-success">{s.paths.pathA.title}</p>
        <ol className="mt-4 space-y-3">
          {s.paths.pathA.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-sm font-medium text-[#14532d]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-[11px] font-bold text-white">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>
      <div className="hidden items-center md:flex">
        <span className="rounded-full border border-border bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3f3f46]">
          or
        </span>
      </div>
      <div className="rounded-2xl border-2 border-warning/50 bg-warning-bg p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-warning">{s.paths.pathB.title}</p>
        <ol className="mt-4 space-y-3">
          {s.paths.pathB.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-sm font-medium text-[#9a3412]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning text-[11px] font-bold text-white">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
        <motion.div
          animate={active ? { opacity: [0.85, 1, 0.85] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-5 rounded-xl border-2 border-warning bg-white px-3 py-2.5 text-sm font-semibold text-warning"
        >
          {s.paths.pathB.action}
        </motion.div>
      </div>
    </div>
  );
}

function ChangesVisual() {
  return (
    <div className="grid h-full grid-cols-2 gap-3 text-foreground">
      <div className="flex flex-col rounded-2xl border border-border bg-[#111111] p-4 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">{s.changes.today}</p>
        <p className="mt-1 text-xs text-white">{s.changes.todayCaption}</p>
        <ul className="mt-3 flex-1 space-y-1.5">
          {s.changes.todayItems.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-sm font-semibold text-white">Next loads: 0</p>
      </div>
      <div className="flex flex-col rounded-2xl border-2 border-success/40 bg-white p-4 shadow-[0_16px_40px_rgba(34,197,94,0.12)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-dark">{s.changes.withZonik}</p>
        <p className="mt-1 text-xs text-[#3f3f46]">{s.changes.afterCaption}</p>
        <ul className="mt-3 flex-1 space-y-2">
          {s.changes.afterItems.map((item, i) => (
            <li
              key={item}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-semibold",
                i >= 3
                  ? "border-2 border-success bg-success-bg text-success"
                  : "border border-secondary/20 bg-[#eeedff] text-secondary-dark"
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DispatchVisual({ active }: { active: boolean }) {
  return (
    <div className="grid h-full grid-cols-2 gap-3 text-foreground">
      <div className="rounded-2xl border border-border bg-[#ececee] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3f3f46]">{s.dispatch.beforeLabel}</p>
        <ul className="mt-3 space-y-2">
          {s.dispatch.beforeItems.map((item) => (
            <li key={item} className="rounded-lg border border-warning/25 bg-warning-bg px-3 py-2 text-sm font-medium text-[#9a3412]">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        animate={active ? { boxShadow: ["0 0 0 rgba(34,197,94,0)", "0 12px 28px rgba(34,197,94,0.16)", "0 0 0 rgba(34,197,94,0)"] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        className="rounded-2xl border-2 border-success/40 bg-white p-4"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-dark">{s.dispatch.afterLabel}</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2 py-0.5 text-[10px] font-bold text-success">
            <Sun className="h-3 w-3" /> 24/7
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {s.dispatch.afterItems.map((item, i) => (
            <li
              key={item}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold",
                i >= 2 ? "bg-success-bg text-success" : "bg-[#eeedff] text-secondary-dark"
              )}
            >
              <Check className="h-3.5 w-3.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function HandoffVisual() {
  return (
    <div className="grid h-full gap-3 text-foreground md:grid-cols-2">
      <div className="space-y-2 rounded-2xl border border-border bg-[#111111] p-4 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white">{s.handoff.todayLabel}</p>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
            <Mail className="h-3.5 w-3.5" />
            {s.handoff.todayFrom}
          </p>
          <p className="mt-2 text-sm leading-snug text-white">“{s.handoff.todayFromBody}”</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
            <Mail className="h-3.5 w-3.5" />
            {s.handoff.todayBack}
          </p>
          <p className="mt-2 text-sm leading-snug text-white">“{s.handoff.todayBackBody}”</p>
        </div>
      </div>
      <div className="rounded-2xl border-2 border-success/40 bg-white p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-dark">{s.handoff.zonikLabel}</p>
        <p className="mt-1 text-sm font-semibold text-success">{s.handoff.zonikBoard}</p>
        <ul className="mt-3 space-y-2">
          {s.handoff.zonikItems.map((item) => (
            <li key={item} className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function peak(p: number, index: number, halfWidth: number) {
  const center = index / (COUNT - 1);
  return Math.max(0, 1 - Math.abs(p - center) / halfWidth);
}

function Slide({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      data-panel={index}
      className={cn("relative z-10 flex min-h-[100dvh] items-center px-5 py-16 sm:px-8 lg:px-12", H, className)}
    >
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function Card({
  children,
  className,
  compact,
  glass,
}: {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  glass?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
        glass
          ? "border-white/15 bg-white/[0.08] text-white shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
          : "border-white/10 bg-white text-foreground",
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8 lg:p-10",
        className
      )}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", light ? "text-[#e0e7ff]" : "text-secondary")}>
      {children}
    </p>
  );
}

function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-border bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PitchDeck2() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const truckBodyRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const dawnRef = useRef<HTMLDivElement>(null);
  const rawProgress = useRef(0);
  const visProgress = useRef(0);
  const targetRef = useRef(0);
  const [active, setActive] = useState(0);
  const [howStep, setHowStep] = useState(0);

  const paintRoute = useCallback((p: number) => {
    const path = pathRef.current;
    const fill = fillRef.current;
    const truck = truckRef.current;
    const truckBody = truckBodyRef.current;
    const night = nightRef.current;
    const dawn = dawnRef.current;
    const nightT = peak(p, PITCH2_NIGHT_INDEX, 0.12);
    const dawnT = peak(p, PITCH2_AFTER_INDEX, 0.09);
    if (night) night.style.opacity = String(nightT * 0.95);
    if (dawn) dawn.style.opacity = String(dawnT * 0.72);
    if (!path || !fill || !truck || !truckBody) return;
    const len = path.getTotalLength();
    if (!len) return;
    const root = scrollerRef.current;
    const vh = root?.clientHeight ?? 0;
    const targetY = (root?.scrollTop ?? 0) + vh * 0.38;
    const dist = lengthAtY(path, targetY, len);
    const tPos = Math.min(len * 0.992, Math.max(len * 0.012, dist));
    fill.style.strokeDashoffset = String(1 - tPos / len);
    const a = path.getPointAtLength(tPos);
    const b = path.getPointAtLength(Math.min(len, tPos + Math.max(16, len * 0.006)));
    const svg = path.ownerSVGElement;
    const overlay = truck.offsetParent as HTMLElement | null;
    if (svg && overlay) {
      const ctm = svg.getScreenCTM();
      const box = overlay.getBoundingClientRect();
      const toLocal = (x: number, y: number) => {
        const pt = svg.createSVGPoint();
        pt.x = x;
        pt.y = y;
        if (!ctm) return { x: 0, y: 0 };
        const sp = pt.matrixTransform(ctm);
        return { x: sp.x - box.left, y: sp.y - box.top };
      };
      const pa = toLocal(a.x, a.y);
      const pb = toLocal(b.x, b.y);
      truck.style.left = `${pa.x}px`;
      truck.style.top = `${pa.y}px`;
      truckBody.style.transform = `rotate(${(Math.atan2(pb.y - pa.y, pb.x - pa.x) * 180) / Math.PI}deg)`;
    }
    if (active === PITCH2_LOAD_DELAY_INDEX || active === PITCH2_LOAD_CALL_INDEX) {
      truck.style.filter = "drop-shadow(0 0 16px rgba(249,115,22,0.85))";
    } else if (dawnT > 0.25) {
      truck.style.filter = "drop-shadow(0 0 16px rgba(255,176,96,0.8))";
    } else if (nightT > 0.35) {
      truck.style.filter = "grayscale(0.2) opacity(0.85)";
    } else {
      truck.style.filter = "drop-shadow(0 0 16px rgba(56,189,248,0.95))";
    }
  }, [active]);

  const onRouteLayout = useCallback(() => {
    paintRoute(visProgress.current);
  }, [paintRoute]);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(COUNT - 1, index));
    targetRef.current = next;
    scrollerRef.current?.querySelector(`[data-panel="${next}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    let raf = 0;
    let running = true;

    const read = () => {
      const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-panel]"));
      panels.sort((a, b) => Number(a.dataset.panel) - Number(b.dataset.panel));
      const y = root.scrollTop;
      const max = Math.max(1, root.scrollHeight - root.clientHeight);
      const starts = panels.map((panel) => panel.offsetTop);
      let i = 0;
      for (; i < starts.length - 1; i++) {
        if (y < starts[i + 1] - 0.5) break;
      }
      const a = starts[i] ?? 0;
      const b = i < starts.length - 1 ? starts[i + 1] : max;
      const local = Math.min(1, Math.max(0, (y - a) / Math.max(1, b - a)));
      const slide = Number(panels[i]?.dataset.panel ?? i);
      rawProgress.current = Math.min(1, Math.max(0, (slide + local) / (COUNT - 1)));
      setActive((prev) => (prev === slide ? prev : slide));
      targetRef.current = slide;
    };

    const tick = () => {
      if (!running) return;
      visProgress.current += (rawProgress.current - visProgress.current) * 0.08;
      paintRoute(visProgress.current);
      if (Math.abs(rawProgress.current - visProgress.current) > 0.0004) {
        raf = requestAnimationFrame(tick);
      } else {
        visProgress.current = rawProgress.current;
        paintRoute(visProgress.current);
        raf = 0;
      }
    };

    const onScroll = () => {
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    read();
    paintRoute(0);
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [paintRoute]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const root = scrollerRef.current;
      if (!root) return;
      const step = root.clientHeight * 0.62;
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        root.scrollTo({ top: root.scrollTop + step, behavior: "smooth" });
      } else if (e.key === " " && !e.repeat) {
        e.preventDefault();
        root.scrollTo({ top: root.scrollTop + (e.shiftKey ? -step : step), behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        root.scrollTo({ top: root.scrollTop - step, behavior: "smooth" });
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(COUNT - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  const HowVisual = howVisuals[howStep];

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="pitch-scroller relative h-[100dvh] overflow-y-auto overscroll-y-contain bg-[#0b1b3a]"
      >
        <div className="relative">
          <PitchRoute
            pathRef={pathRef}
            fillRef={fillRef}
            truckRef={truckRef}
            truckBodyRef={truckBodyRef}
            onLayout={onRouteLayout}
          />
          <div className="pointer-events-none sticky top-0 z-[1] h-0" aria-hidden>
            <div className="relative h-[100dvh] w-full">
              <div
                ref={nightRef}
                className="absolute inset-0 opacity-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.62) 100%)",
                }}
              />
              <div ref={dawnRef} className="pitch-dawn absolute inset-0 opacity-0">
                <div
                  className="absolute inset-0 mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(circle at var(--pitch-sun-x) var(--pitch-sun-y), rgba(255,232,180,0.72) 0%, rgba(255,186,100,0.42) 10%, rgba(255,128,52,0.16) 24%, rgba(255,90,40,0.05) 42%, transparent 58%)",
                  }}
                />
                <div className="pitch-sun-bloom" />
                <div className="pitch-sun-rays" />
                <div className="pitch-sun" />
              </div>
            </div>
          </div>

          <Slide index={0}>
            <Card glass>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow light>{s.today.eyebrow}</Eyebrow>
                  <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl md:leading-[1.1]">
                    {s.today.headline}
                  </h1>
                  {s.today.lines.map((line) => (
                    <p key={line} className="mt-3 text-base text-white">
                      {line}
                    </p>
                  ))}
                  <p className="mt-4 text-xl font-semibold text-[#e0e7ff]">“{s.today.quote}”</p>
                  <p className="mt-5 text-base font-semibold text-white">{s.today.late}</p>
                  <p className="mt-1 text-base text-white">{s.today.hit}</p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-warning">
                    {s.today.emotion}
                  </p>
                </div>
                <Stage className="min-h-[22rem]">
                  <BrokerCallVisual active={active === 0} />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={1}>
            <Card>
              <Eyebrow>{s.workflow.eyebrow}</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                {s.workflow.headline}
              </h2>
              <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <ol className="space-y-3">
                  {s.workflow.steps.map((step) => (
                    <li key={step.number} className="flex gap-3">
                      <span className="font-mono text-sm font-semibold text-secondary">{step.number}</span>
                      <div>
                        <p className="text-sm font-semibold">{step.title}</p>
                        <p className="mt-0.5 text-sm text-[#3f3f46]">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Stage className="min-h-[18rem]">
                  <WorkflowVisual active={active === 1} />
                </Stage>
              </div>
              <p className="mt-6 text-xl font-semibold tracking-[-0.02em] text-secondary-dark">
                {s.workflow.footer}
              </p>
            </Card>
          </Slide>

          <Slide index={2}>
            <Card glass>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow light>{s.language.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                    {s.language.headline}
                  </h2>
                  {s.language.lines.map((line) => (
                    <p key={line} className="mt-3 text-base text-white">
                      {line}
                    </p>
                  ))}
                  <p className="mt-6 text-xl font-semibold text-[#e0e7ff]">{s.language.line}</p>
                  <p className="mt-8 text-lg font-semibold text-white">{s.language.tease}</p>
                </div>
                <Stage className="min-h-[18rem]">
                  <LanguageVisual />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={3}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow>{s.cost.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.cost.headline}</h2>
                  <ul className="mt-5 space-y-1.5">
                    {s.cost.lines.map((line) => (
                      <li key={line} className="text-base text-[#3f3f46]">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-base text-[#3f3f46]">{s.cost.but}</p>
                  <p className="mt-6 text-xl font-semibold text-secondary-dark">{s.cost.payoff}</p>
                  <p className="mt-8 text-lg font-semibold">{s.cost.tease}</p>
                </div>
                <Stage className="min-h-[16rem]">
                  <CostVisual />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={4}>
            <Card glass>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow light>{s.idea.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                    {s.idea.headline}
                  </h2>
                  <ul className="mt-5 space-y-2">
                    {s.idea.points.map((point) => (
                      <li key={point} className="text-base text-white">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xl font-semibold text-[#e0e7ff]">{s.idea.payoff}</p>
                  <p className="mt-4 text-sm text-white">{s.idea.zonikLine}</p>
                  <p className="text-sm text-white">{s.idea.teamLine}</p>
                </div>
                <Stage className="min-h-[20rem]">
                  <IdeaVisual active={active === 4} />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={PITCH2_HOW_INDEX}>
            <Card glass>
              <Eyebrow light>{s.how.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{s.how.headline}</h2>
              <p className="mt-2 text-lg text-[#e0e7ff]">{s.how.sub}</p>
              <div className="mt-6 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04]">
                <div className="grid grid-cols-2 border-b border-white/10 md:grid-cols-4">
                  {s.how.steps.map((step, i) => {
                    const Icon = howIcons[i];
                    return (
                      <button
                        key={step.number}
                        type="button"
                        onClick={() => setHowStep(i)}
                        className={cn(
                          "flex items-center gap-2 border-b border-white/15 px-3 py-3 text-left text-white md:border-b-0 md:border-r md:last:border-r-0",
                          howStep === i ? "bg-white/15" : "text-white hover:bg-white/[0.08]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full",
                            howStep === i ? "bg-secondary text-white" : "border border-white/45"
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span>
                          <p className="font-mono text-[10px] text-[#e0e7ff]">{step.number}</p>
                          <p className="text-sm font-semibold">{step.title}</p>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid lg:grid-cols-[1fr_280px]">
                  <div className="min-h-[240px] bg-white text-foreground lg:min-h-[280px]">
                    {howStep === 2 ? (
                      <div className="flex h-full flex-col justify-center gap-3 p-5">
                        <HowVisual active={active === PITCH2_HOW_INDEX} />
                        <div className="flex flex-wrap gap-2">
                          {s.how.steps[2].langs?.map((lang) => (
                            <span
                              key={lang}
                              className="rounded-full border border-secondary/25 bg-[#eeedff] px-2.5 py-1 text-[11px] font-semibold text-secondary-dark"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : howStep === 0 ? (
                      <div className="flex h-full flex-col">
                        <HowVisual active={active === PITCH2_HOW_INDEX} />
                        <p className="border-t border-border px-4 py-2 text-center text-xs font-semibold text-secondary-dark">
                          {s.how.steps[0].visual}
                        </p>
                      </div>
                    ) : howStep === 3 ? (
                      <div className="flex h-full flex-col justify-center gap-2 p-5">
                        {s.how.escalate.slice(0, 4).map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm">
                            <Check className="h-3.5 w-3.5 text-success" />
                            {item}
                          </div>
                        ))}
                        <p className="mt-2 text-sm font-semibold text-warning">OR {s.how.escalate[4]}</p>
                      </div>
                    ) : (
                      <HowVisual active={active === PITCH2_HOW_INDEX} />
                    )}
                  </div>
                  <div className="flex flex-col justify-center border-t border-white/15 p-6 lg:border-l lg:border-t-0">
                    <p className="text-lg font-semibold text-white">{s.how.steps[howStep].headline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white">{s.how.steps[howStep].text}</p>
                  </div>
                </div>
              </div>
            </Card>
          </Slide>

          <Slide index={PITCH2_LOAD_ONTIME_INDEX}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow>{s.loadOnTime.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.loadOnTime.headline}</h2>
                  <p className="mt-4 text-lg text-[#3f3f46]">{s.loadOnTime.sub}</p>
                </div>
                <Stage className="min-h-[16rem]">
                  <LoadOnTimeVisual active={active === PITCH2_LOAD_ONTIME_INDEX} />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={PITCH2_LOAD_DELAY_INDEX}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow>{s.loadDelay.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.loadDelay.headline}</h2>
                  <p className="mt-4 text-lg text-[#3f3f46]">{s.loadDelay.sub}</p>
                </div>
                <Stage className="min-h-[18rem]">
                  <LoadDelayVisual active={active === PITCH2_LOAD_DELAY_INDEX} />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={PITCH2_LOAD_CALL_INDEX}>
            <Card>
              <Eyebrow>{s.loadCall.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.loadCall.headline}</h2>
              <Stage className="mt-6 min-h-[22rem]">
                <LoadCallVisual active={active === PITCH2_LOAD_CALL_INDEX} />
              </Stage>
            </Card>
          </Slide>

          <Slide index={9}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow>{s.knows.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.knows.headline}</h2>
                  <p className="mt-4 text-lg text-[#3f3f46]">{s.knows.loop}</p>
                  <p className="mt-6 text-xl font-semibold text-secondary-dark">{s.knows.payoff}</p>
                </div>
                <Stage className="min-h-[18rem]">
                  <KnowsVisual />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={10}>
            <Card glass>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{s.paths.headline}</h2>
              <p className="mt-3 text-xl text-[#e0e7ff]">{s.paths.sub}</p>
              <Stage className="mt-6 min-h-[20rem] bg-white p-4 text-foreground">
                <PathsVisual active={active === 10} />
              </Stage>
              <div className="mt-6 space-y-1 text-center">
                {s.paths.footer.map((line) => (
                  <p key={line} className="text-lg font-semibold text-white">
                    {line}
                  </p>
                ))}
              </div>
            </Card>
          </Slide>

          <Slide index={PITCH2_AFTER_INDEX}>
            <Card compact className="border-[#ffd7b0]/35 shadow-[0_24px_80px_rgba(255,150,80,0.18)]">
              <div className="grid items-center gap-6 lg:grid-cols-[0.62fr_1.38fr]">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.changes.headline}</h2>
                  <p className="mt-6 text-2xl font-semibold text-secondary-dark">{s.changes.payoff}</p>
                  <p className="mt-3 text-base text-[#3f3f46]">{s.changes.note}</p>
                </div>
                <Stage className="min-h-[22rem] p-3">
                  <ChangesVisual />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={12}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow>{s.dispatch.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.dispatch.headline}</h2>
                  <ul className="mt-5 space-y-2">
                    {s.dispatch.points.map((point) => (
                      <li key={point} className="text-base text-[#3f3f46]">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xl font-semibold text-secondary-dark">{s.dispatch.payoff}</p>
                </div>
                <Stage className="min-h-[18rem] p-3">
                  <DispatchVisual active={active === 12} />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={13}>
            <Card glass>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow light>{s.handoff.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                    {s.handoff.headline}
                  </h2>
                  {s.handoff.lines.map((line) => (
                    <p key={line} className="mt-3 text-base text-white">
                      {line}
                    </p>
                  ))}
                  <p className="mt-6 text-xl font-semibold text-[#e0e7ff]">{s.handoff.payoff}</p>
                </div>
                <Stage className="min-h-[18rem] p-3">
                  <HandoffVisual />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={14}>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow light>{s.transition.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]">
                {s.transition.headline}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-white md:text-lg">{s.transition.sub}</p>
              <div className="mt-10">
                <Button href="https://app.zonikai.com/" variant="accent" size="lg" className="gap-2">
                  {s.transition.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Slide>

          <Slide index={15}>
            <Eyebrow light>{s.integrations.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              {s.integrations.headline}
            </h2>
            <p className="mt-2 text-sm text-white">{s.integrations.sub}</p>
            <div className="mt-5 rounded-[2rem] ring-1 ring-white/10">
              <IntegrationsHub compact />
            </div>
          </Slide>

          <Slide index={16}>
            <div className="mx-auto max-w-3xl">
              <Eyebrow light>{s.pilot.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">{s.pilot.headline}</h2>
              <p className="mt-3 text-xl font-semibold text-[#e0e7ff]">{s.pilot.sub}</p>
              <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 sm:p-7">
                <ol className="space-y-5">
                  {s.pilot.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="font-mono text-sm font-semibold text-[#e0e7ff]">0{i + 1}</span>
                      <div>
                        <p className="text-base font-semibold text-white">{step.title}</p>
                        <p className="mt-1 text-sm text-white">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-8">
                <Button href="mailto:hello@zonikai.com?subject=14-day%20pilot" variant="accent" size="lg">
                  {s.pilot.cta}
                </Button>
              </div>
              <p className="mt-5 text-lg font-semibold text-white">{s.pilot.footer}</p>
            </div>
          </Slide>

          <Slide index={17}>
            <Card>
              <div className="grid items-start gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow>{s.pricing.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{s.pricing.headline}</h2>
                  <p className="mt-4 text-lg text-[#3f3f46]">{s.pricing.sub}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.pricing.factors.map((factor) => (
                      <li
                        key={factor}
                        className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm font-medium"
                      >
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                    {s.pricing.includesTitle}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {s.pricing.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-lg font-medium">
                        <Check className="h-4 w-4 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-sm font-semibold text-secondary-dark">{s.pricing.note}</p>
                </div>
              </div>
            </Card>
          </Slide>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 md:flex">
        {Array.from({ length: COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${s.ui.goToSlide} ${i + 1}`}
            className={cn(
              "pointer-events-auto h-2 w-2 rounded-full transition-all",
              active === i ? "scale-125 bg-secondary" : "bg-white/35 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
}
