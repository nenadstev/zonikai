"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CalendarClock,
  Check,
  Clock,
  Eye,
  Link2,
  MapPin,
  Package,
  Phone,
  PhoneCall,
  TrendingUp,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  PITCH_AFTER_INDEX,
  PITCH_HOW_INDEX,
  PITCH_LOAD_CALL_INDEX,
  PITCH_LOAD_DELAY_INDEX,
  PITCH_LOAD_ONTIME_INDEX,
  PITCH_NIGHT_INDEX,
  PITCH_SLIDE_COUNT,
} from "@/lib/pitch-slides";
import { Button } from "@/components/ui/Button";
import { RouteMapAnimation } from "@/components/ui/RouteMapAnimation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  AlertVisual,
  ConnectVisual,
  MonitorVisual,
  VoiceVisual,
} from "@/components/home/HowItWorksVisuals";
import { IntegrationsHub } from "@/components/integrations/IntegrationsHub";
import { CallStoryVisual } from "@/components/features/FeatureStoryVisuals";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const H = "min-h-[100dvh]";
const VIEW = "h-[100dvh]";
const COUNT = PITCH_SLIDE_COUNT;
const NIGHT_N = 5;
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
        <filter id="pitch-truck-glow" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="pitch-truck-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <ellipse className="pitch-truck-halo" cx="32" cy="16" rx="28" ry="13" fill="#38BDF8" />
      <circle className="pitch-truck-halo" cx="32" cy="16" r="14" fill="none" stroke="#7DD3FC" strokeWidth="1.2" />
      <g filter="url(#pitch-truck-glow)">
        <rect x="10" y="4" width="7" height="2.6" rx="1.3" fill="#0F172A" />
        <rect x="22" y="4" width="7" height="2.6" rx="1.3" fill="#0F172A" />
        <rect x="10" y="25.4" width="7" height="2.6" rx="1.3" fill="#0F172A" />
        <rect x="22" y="25.4" width="7" height="2.6" rx="1.3" fill="#0F172A" />
        <rect x="42" y="5" width="6" height="2.4" rx="1.2" fill="#0F172A" />
        <rect x="42" y="24.6" width="6" height="2.4" rx="1.2" fill="#0F172A" />
        <rect x="6" y="7" width="32" height="18" rx="2.6" fill="url(#pitch-truck-body)" />
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
            <filter id="pitch-glow" x="-20%" y="-20%" width="140%" height="140%">
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
            filter="url(#pitch-glow)"
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

const boardRowIcons = [MapPin, Phone, Clock, Phone] as const;

function AfterHoursBoardVisual({
  boardRef,
  active,
}: {
  boardRef: React.RefObject<HTMLDivElement | null>;
  active?: boolean;
}) {
  const { t } = useI18n();
  const s = t.pitch.problem;
  const operator = s.boardOperator.split(" · ")[0] ?? "Ana";

  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-[2rem] bg-red-500/10 blur-2xl" aria-hidden />
      <div
        ref={boardRef}
        className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border bg-[#0b1b3a] px-4 py-3.5 text-white sm:px-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a5b4fc]">
              {s.boardTitle}
            </p>
            <p className="mt-1 text-sm font-semibold text-white/90">{s.boardCaption}</p>
          </div>
          <p className="shrink-0 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/70">
            {s.boardTime}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-warning/20 bg-warning-bg/50 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <motion.div
              animate={active ? { boxShadow: ["0 0 0 0 rgba(249,115,22,0.35)", "0 0 0 8px rgba(249,115,22,0)", "0 0 0 0 rgba(249,115,22,0.35)"] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-warning bg-white"
            >
              <Image
                src="/pitch/ana-after-hours-agent.png"
                alt={operator}
                width={44}
                height={44}
                className="h-full w-full object-cover object-top"
              />
            </motion.div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{s.boardOperator}</p>
              <p className="text-[11px] text-muted">{s.boardOperatorSub}</p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <motion.p
              animate={active ? { opacity: [1, 0.65, 1] } : undefined}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="font-mono text-sm font-semibold text-warning"
            >
              {s.boardTimer}
            </motion.p>
            <p className="text-[10px] font-medium text-warning/80">{s.boardBlocked}</p>
          </div>
        </div>

        <div className="divide-y divide-border">
          {s.boardRows.map((row, i) => {
            const Icon = boardRowIcons[i] ?? Phone;
            return (
              <article
                key={row.truck}
                data-night-card
                className="flex items-center justify-between gap-3 px-4 py-3.5 will-change-transform sm:px-5"
                style={{ opacity: 0, transform: "translate3d(0, -108px, 0) scale(0.94)" }}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface">
                    <Truck className="h-4 w-4 text-muted" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-semibold">{row.truck}</p>
                    <p className="truncate font-mono text-[11px] text-muted">
                      {row.load} · {row.stop}
                    </p>
                  </div>
                </div>
                <div className="min-w-0 text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning-bg px-2.5 py-1 text-[11px] font-semibold text-warning">
                    <Icon className="h-3 w-3" />
                    {row.task}
                  </span>
                  <p className="mt-1 truncate text-[11px] text-muted">{row.detail}</p>
                  <p className="mt-1 font-mono text-[10px] font-semibold text-warning/90">
                    {operator} · {row.duration}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <article
          data-night-card
          className="flex items-center justify-between gap-3 border-t border-dashed border-warning/30 bg-warning-bg/70 px-4 py-4 will-change-transform sm:px-5"
          style={{ opacity: 0, transform: "translate3d(0, -108px, 0) scale(0.94)" }}
        >
          <p className="text-sm font-semibold text-warning">{s.nextLoadsLabel}</p>
          <p className="font-mono text-3xl font-semibold tracking-[-0.04em] text-warning">
            {s.nextLoadsValue}
          </p>
        </article>
      </div>
    </div>
  );
}

function BigIdeaVisual({ active }: { active: boolean }) {
  const { t } = useI18n();
  const s = t.pitch.idea;
  const teamLabel = t.pitch.division.teamTitle;
  return (
    <div className="grid h-full min-h-[18rem] grid-cols-2 gap-3">
      <motion.div
        animate={active ? { opacity: [0.92, 1, 0.92] } : { opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity }}
        className="rounded-2xl border border-secondary/25 bg-[#eeedff] p-4"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary-dark">
          Zonik
        </p>
        <ul className="mt-3 space-y-2">
          {s.zonikTasks.map((task) => (
            <li key={task} className="flex items-center gap-2 text-sm font-medium text-secondary-dark">
              <Check className="h-3.5 w-3.5 shrink-0 text-secondary" />
              {task}
            </li>
          ))}
        </ul>
      </motion.div>
      <div className="rounded-2xl border border-warning/25 bg-[#fff7ed] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-warning">
          {teamLabel}
        </p>
        <ul className="mt-3 space-y-2">
          {s.teamTasks.map((task, i) => (
            <motion.li
              key={task}
              animate={active ? { x: [0, 4, 0], opacity: [1, 0.72, 1] } : { x: 0, opacity: 1 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
              className="flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-warning" />
              {task}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LoadOnTimeVisual({ active }: { active: boolean }) {
  const { t } = useI18n();
  const s = t.pitch.loadOnTime;
  const ui = t.pitch.ui;
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-muted">#48291 · T-1042</p>
          <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">{s.nextStop}</p>
        </div>
        <StatusBadge variant="success">{s.status}</StatusBadge>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-surface/60 p-4">
          <p className="text-xs font-medium text-muted">{s.scheduled}</p>
          <p className="mt-2 font-mono text-3xl font-semibold">20:00</p>
        </div>
        <motion.div
          animate={active ? { borderColor: ["#22c55e", "#86efac", "#22c55e"] } : undefined}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="rounded-2xl border-2 border-success bg-success-bg p-4"
        >
          <p className="text-xs font-medium text-success">{s.liveEta}</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-success">19:47</p>
        </motion.div>
      </div>
      <RouteMapAnimation height="h-20 w-full" showLabels={false} />
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-success">{ui.onTime}</p>
    </div>
  );
}

function LoadDelayVisual({ active }: { active: boolean }) {
  const { t } = useI18n();
  const s = t.pitch.loadDelay;
  const ui = t.pitch.ui;
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-muted">#48291 · T-1042</p>
          <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">{t.pitch.loadOnTime.nextStop}</p>
        </div>
        <StatusBadge variant="warning">{s.status}</StatusBadge>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-surface/60 p-4">
          <p className="text-xs font-medium text-muted">{s.scheduled}</p>
          <p className="mt-2 font-mono text-3xl font-semibold">20:00</p>
        </div>
        <motion.div
          animate={active ? { borderColor: ["#f97316", "#fdba74", "#f97316"] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="rounded-2xl border-2 border-warning bg-warning-bg p-4"
        >
          <p className="text-xs font-medium text-warning">{s.liveEta}</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-warning">20:45</p>
        </motion.div>
      </div>
      <p className="text-center text-sm font-semibold text-warning">{s.late}</p>
      <motion.div
        animate={active ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.6 }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="flex items-center justify-center gap-2 rounded-xl border border-secondary/30 bg-accent-soft/60 px-3 py-2 text-sm font-medium text-secondary-dark"
      >
        <PhoneCall className="h-4 w-4" />
        {ui.atRisk} → AI call starting
      </motion.div>
    </div>
  );
}

function LoadCallExtractVisual({ active }: { active: boolean }) {
  const { t } = useI18n();
  const ex = t.pitch.loadCall.extract;
  const fields = [
    { label: ex.reason, value: ex.reasonVal },
    { label: ex.eta, value: ex.etaVal },
    { label: ex.status, value: ex.statusVal },
  ];
  return (
    <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-[1.1fr_0.9fr]">
      <CallStoryVisual compact active={active} />
      <div className="flex flex-col justify-center gap-2">
        {fields.map((field, i) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, x: 12 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0.4, x: 12 }}
            transition={{ delay: 0.4 + i * 0.25, duration: 0.4 }}
            className="rounded-xl border border-border bg-white px-4 py-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{field.label}</p>
            <p className="mt-1 font-mono text-lg font-semibold">{field.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PathsVisual({ active }: { active: boolean }) {
  const { t } = useI18n();
  const s = t.pitch.paths;
  return (
    <div className="grid h-full gap-3 md:grid-cols-2">
      <motion.div
        animate={active ? { backgroundColor: ["#ecfdf5", "#d1fae5", "#ecfdf5"] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        className="rounded-2xl border border-success/30 bg-success-bg p-4"
      >
        <p className="text-sm font-semibold text-success">{s.pathA.title}</p>
        <ul className="mt-3 space-y-2 text-sm text-foreground">
          {s.pathA.items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-success" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-success">{s.pathA.footer}</p>
      </motion.div>
      <motion.div
        animate={active ? { backgroundColor: ["#fff7ed", "#ffedd5", "#fff7ed"] } : undefined}
        transition={{ duration: 3, repeat: Infinity }}
        className="rounded-2xl border border-warning/30 bg-warning-bg p-4"
      >
        <p className="text-sm font-semibold text-warning">{s.pathB.title}</p>
        <ul className="mt-3 space-y-2 text-sm text-foreground">
          {s.pathB.items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-warning" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-warning">{s.pathB.footer}</p>
      </motion.div>
    </div>
  );
}

function DivisionVisual({ active }: { active: boolean }) {
  const { t } = useI18n();
  const s = t.pitch.division;
  const zonikIcons = [Eye, Clock, AlertTriangle, MapPin, PhoneCall, Check, Bell, AlertTriangle] as const;
  const teamIcons = [Package, TrendingUp, Phone, Check, CalendarClock, Truck] as const;

  return (
    <div className="grid gap-4 md:grid-cols-[1.14fr_0.86fr]">
      <motion.div
        animate={active ? { boxShadow: ["0 0 32px rgba(78,70,252,0.18)", "0 0 52px rgba(129,140,248,0.32)", "0 0 32px rgba(78,70,252,0.18)"] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity }}
        className="relative overflow-hidden rounded-2xl border border-secondary/35 bg-[#121f45]/80 p-5"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 12% 0%, rgba(129,140,248,0.22), transparent 42%), radial-gradient(circle at 88% 100%, rgba(78,70,252,0.14), transparent 38%)",
          }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a5b4fc]">
              {s.zonikTitle}
            </p>
            <p className="mt-1 text-sm font-medium text-white/75">{s.zonikSubtitle}</p>
          </div>
          <span className="shrink-0 rounded-full border border-secondary/35 bg-secondary/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#c7d2fe]">
            {s.zonikBadge}
          </span>
        </div>
        <ul className="relative mt-4 grid gap-2 sm:grid-cols-2">
          {s.zonikItems.map((item, i) => {
            const Icon = zonikIcons[i] ?? Check;
            return (
              <motion.li
                key={item}
                initial={false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0.82, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="flex items-center gap-2.5 rounded-xl border border-secondary/25 bg-[#0b1b3a]/55 px-3 py-2.5 text-sm text-white/90"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/25">
                  <Icon className="h-3.5 w-3.5 text-[#a5b4fc]" />
                </span>
                <span className="leading-snug">{item}</span>
              </motion.li>
            );
          })}
        </ul>
        <motion.div
          animate={active ? { opacity: [0.65, 1, 0.65] } : { opacity: 0.75 }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="relative mt-4 flex items-center gap-2.5 rounded-xl border border-secondary/30 bg-secondary/10 px-3 py-2.5"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a5b4fc]"
                style={{ animationDelay: `${i * 180}ms` }}
              />
            ))}
          </div>
          <p className="text-xs font-semibold text-[#c7d2fe]">{s.zonikFootnote}</p>
        </motion.div>
      </motion.div>

      <motion.div
        animate={active ? { boxShadow: ["0 0 24px rgba(34,197,94,0.12)", "0 0 40px rgba(74,222,128,0.22)", "0 0 24px rgba(34,197,94,0.12)"] } : undefined}
        transition={{ duration: 3.6, repeat: Infinity }}
        className="relative overflow-hidden rounded-2xl border border-success/30 bg-[#ecfdf5]/[0.08] p-5"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 100% 0%, rgba(74,222,128,0.16), transparent 46%)",
          }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-success">
              {s.teamTitle}
            </p>
            <p className="mt-1 text-sm font-medium text-white/80">{s.teamSubtitle}</p>
          </div>
          <span className="shrink-0 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-success">
            {s.teamBadge}
          </span>
        </div>
        <ul className="relative mt-4 space-y-2.5">
          {s.teamItems.map((item, i) => {
            const Icon = teamIcons[i] ?? TrendingUp;
            return (
              <motion.li
                key={item}
                initial={false}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0.88, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
                className="flex items-start gap-2.5 rounded-xl border border-success/20 bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-white/90"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-success/15">
                  <Icon className="h-3.5 w-3.5 text-success" />
                </span>
                <span className="leading-snug">{item}</span>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}

function BenefitVisual({ active }: { active: boolean }) {
  const { t } = useI18n();
  const s = t.pitch.benefit;
  return (
    <div className="grid h-full min-h-[18rem] grid-cols-[0.36fr_0.64fr] gap-2">
      <div className="flex flex-col rounded-2xl border border-border/50 bg-[#ececee] p-3 opacity-75 saturate-50">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted/80">
          {s.beforeLabel}
        </p>
        <div className="mt-2.5 flex-1 space-y-1.5">
          {s.beforeTasks.map((task, i) => (
            <div
              key={i}
              className="rounded-lg border border-red-200/80 bg-red-50 px-2.5 py-1.5 text-[11px] font-medium text-red-400/90"
            >
              {task}
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-xs text-muted/60">0 booked</p>
      </div>

      <motion.div
        animate={
          active
            ? {
                boxShadow: [
                  "0 16px 48px rgba(34,197,94,0.16)",
                  "0 20px 56px rgba(78,70,252,0.12)",
                  "0 16px 48px rgba(34,197,94,0.16)",
                ],
              }
            : undefined
        }
        transition={{ duration: 3.2, repeat: Infinity }}
        className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-success/45 bg-white p-4 shadow-[0_16px_48px_rgba(34,197,94,0.14)]"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 88% 12%, rgba(74,222,128,0.14), transparent 42%), radial-gradient(circle at 12% 88%, rgba(78,70,252,0.08), transparent 38%)",
          }}
        />
        <p className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-dark">
          {s.monitored}
        </p>
        <div className="relative mt-3 flex-1 space-y-2">
          {s.afterTasks.map((task, i) => {
            const isLast = i === s.afterTasks.length - 1;
            const isBook = i > 0 && i < s.afterTasks.length - 1;
            return (
              <motion.div
                key={i}
                animate={active && isLast ? { scale: [1, 1.03, 1] } : undefined}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-semibold",
                  isLast
                    ? "border-2 border-success bg-success-bg text-success shadow-[0_4px_16px_rgba(34,197,94,0.18)]"
                    : isBook
                      ? "border border-secondary/25 bg-[#eeedff] text-secondary-dark"
                      : "border border-border bg-white text-foreground shadow-sm"
                )}
              >
                {task}
              </motion.div>
            );
          })}
        </div>
        <motion.p
          animate={active ? { opacity: [0.85, 1, 0.85] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="relative mt-3 text-lg font-bold tracking-[-0.02em] text-success"
        >
          {s.booked}
        </motion.p>
      </motion.div>
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
  tight,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <section
      data-panel={index}
      className={cn(
        "relative z-10 flex items-center px-5 sm:px-8 lg:px-12",
        tight ? "py-6 sm:py-8" : "py-20",
        H,
        className
      )}
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
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.2em]",
        light ? "text-[#a5b4fc]" : "text-secondary"
      )}
    >
      {children}
    </p>
  );
}

function Stage({
  children,
  className,
  fluid,
}: {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-border bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
        fluid ? "h-auto" : "h-[min(48vh,26rem)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PitchDeck() {
  const { t } = useI18n();
  const s = t.pitch;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const truckBodyRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const dawnRef = useRef<HTMLDivElement>(null);
  const nightCardsRef = useRef<HTMLDivElement>(null);
  const rawProgress = useRef(0);
  const visProgress = useRef(0);
  const rawNight = useRef(0);
  const visNight = useRef(0);
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
    const nightT = peak(p, PITCH_NIGHT_INDEX, 0.16);
    const dawnT = peak(p, PITCH_AFTER_INDEX, 0.09);
    const nightHold = visNight.current > 0.001 && visNight.current < 0.999;
    if (night) night.style.opacity = String((nightHold ? 1 : nightT) * 0.95);
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
    if (nightT > 0.35) {
      truck.style.filter = "grayscale(1) opacity(0.45)";
    } else if (dawnT > 0.25) {
      truck.style.filter = "drop-shadow(0 0 16px rgba(255,176,96,0.8))";
    } else {
      truck.style.filter = "drop-shadow(0 0 16px rgba(56,189,248,0.95))";
    }
  }, []);

  const onRouteLayout = useCallback(() => {
    paintRoute(visProgress.current);
  }, [paintRoute]);

  const paintNight = useCallback((tVal: number) => {
    const root = nightCardsRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>("[data-night-card]");
    cards.forEach((card, i) => {
      const start = 0.04 + i * (0.78 / Math.max(1, NIGHT_N));
      const u = Math.min(1, Math.max(0, (tVal - start) / 0.16));
      const ease = 1 - (1 - u) ** 3;
      const y = (1 - ease) * -108;
      card.style.opacity = String(ease);
      card.style.transform = `translate3d(0, ${y}px, 0) scale(${0.94 + 0.06 * ease})`;
    });
  }, []);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(COUNT - 1, index));
    targetRef.current = next;
    const panel = scrollerRef.current?.querySelector(`[data-panel="${next}"]`);
    panel?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      if (slide === PITCH_NIGHT_INDEX) {
        const chapter = panels[i];
        const span = Math.max(1, chapter.offsetHeight - root.clientHeight);
        rawNight.current = Math.min(1, Math.max(0, (y - chapter.offsetTop) / span));
      } else {
        rawNight.current = slide > PITCH_NIGHT_INDEX ? 1 : 0;
      }
      setActive((prev) => (prev === slide ? prev : slide));
      targetRef.current = slide;
    };

    const tick = () => {
      if (!running) return;
      visProgress.current += (rawProgress.current - visProgress.current) * 0.08;
      visNight.current += (rawNight.current - visNight.current) * 0.14;
      paintRoute(visProgress.current);
      paintNight(visNight.current);
      if (
        Math.abs(rawProgress.current - visProgress.current) > 0.0004 ||
        Math.abs(rawNight.current - visNight.current) > 0.0004
      ) {
        raf = requestAnimationFrame(tick);
      } else {
        visProgress.current = rawProgress.current;
        visNight.current = rawNight.current;
        paintRoute(visProgress.current);
        paintNight(visNight.current);
        raf = 0;
      }
    };

    const onScroll = () => {
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    read();
    paintRoute(0);
    paintNight(0);
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [paintRoute, paintNight]);

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
        root.scrollTo({
          top: root.scrollTop + (e.shiftKey ? -step : step),
          behavior: "smooth",
        });
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
                    "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.8) 100%)",
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

          {/* Screen 1: Problem */}
          <section
            data-panel={PITCH_NIGHT_INDEX}
            className="relative z-10"
            style={{ height: `calc(100dvh * ${1 + NIGHT_N * 0.32})` }}
          >
            <div className={cn("sticky top-0 flex flex-col justify-center px-5 py-8 sm:px-8 lg:px-12", VIEW)}>
              <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
                <div>
                  <Image
                    src="/brand/zonik-pin.png"
                    alt=""
                    width={48}
                    height={52}
                    className="mb-5 h-10 w-auto object-contain"
                    priority
                  />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    {s.problem.intro}
                  </p>
                  <Eyebrow light>{s.problem.eyebrow}</Eyebrow>
                  <h1 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-[2.75rem] md:leading-[1.08]">
                    {s.problem.headline}
                  </h1>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                    {s.problem.sub}
                  </p>
                </div>
                <AfterHoursBoardVisual boardRef={nightCardsRef} active={active === PITCH_NIGHT_INDEX} />
              </div>
            </div>
          </section>

          {/* Screen 2: Big idea */}
          <Slide index={1}>
            <Card glass>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <Eyebrow light>{s.idea.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl md:leading-[1.1]">
                    {s.idea.headline}
                  </h2>
                  <ul className="mt-6 space-y-2">
                    {s.idea.points.map((point) => (
                      <li key={point} className="text-base leading-snug text-white/75 md:text-lg">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-xl font-semibold tracking-[-0.02em] text-[#a5b4fc] md:text-2xl">
                    {s.idea.payoff}
                  </p>
                </div>
                <Stage fluid className="min-h-[18rem] p-5">
                  <BigIdeaVisual active={active === 1} />
                </Stage>
              </div>
            </Card>
          </Slide>

          {/* Screen 3: How Zonik works */}
          <Slide index={PITCH_HOW_INDEX}>
            <Card glass>
              <Eyebrow light>{s.how.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                {s.how.headline}
              </h2>
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
                          howStep === i ? "bg-white/15" : "text-white/90 hover:bg-white/[0.08]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold",
                            howStep === i
                              ? "bg-secondary text-white"
                              : "border border-white/45 text-white"
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span>
                          <p className="font-mono text-[10px] text-[#c7d2fe]">{step.number}</p>
                          <p className="text-sm font-semibold">{step.title}</p>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid lg:grid-cols-[1fr_280px]">
                  <div className="min-h-[240px] bg-white text-foreground lg:min-h-[280px]">
                    <HowVisual active={active === PITCH_HOW_INDEX} />
                  </div>
                  <div className="flex flex-col justify-center border-t border-white/15 p-6 lg:border-l lg:border-t-0">
                    <p className="text-lg font-semibold text-white">{s.how.steps[howStep].headline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      {s.how.steps[howStep].text}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Slide>

          {/* Screen 4: Load on time */}
          <Slide index={PITCH_LOAD_ONTIME_INDEX}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <Eyebrow>{s.loadOnTime.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.1]">
                    {s.loadOnTime.headline}
                  </h2>
                  <p className="mt-4 max-w-md text-lg text-muted">{s.loadOnTime.sub}</p>
                </div>
                <Stage fluid className="p-5">
                  <LoadOnTimeVisual active={active === PITCH_LOAD_ONTIME_INDEX} />
                </Stage>
              </div>
            </Card>
          </Slide>

          {/* Screen 5: Delay caught */}
          <Slide index={PITCH_LOAD_DELAY_INDEX}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <Eyebrow>{s.loadDelay.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.1]">
                    {s.loadDelay.headline}
                  </h2>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-warning">
                    {s.loadDelay.subhead}
                  </p>
                  <p className="mt-4 max-w-md text-lg text-muted">{s.loadDelay.body}</p>
                </div>
                <Stage fluid className="p-5">
                  <LoadDelayVisual active={active === PITCH_LOAD_DELAY_INDEX} />
                </Stage>
              </div>
            </Card>
          </Slide>

          {/* Screen 6: AI call */}
          <Slide index={PITCH_LOAD_CALL_INDEX}>
            <Card>
              <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
                <div>
                  <Eyebrow>{s.loadCall.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.1]">
                    {s.loadCall.headline}
                  </h2>
                </div>
                <Stage fluid className="min-h-[22rem] p-4 md:p-5">
                  <LoadCallExtractVisual active={active === PITCH_LOAD_CALL_INDEX} />
                </Stage>
              </div>
            </Card>
          </Slide>

          {/* Screen 7: Two paths */}
          <Slide index={6}>
            <Card glass>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <Eyebrow light>{s.paths.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl md:leading-[1.1]">
                    {s.paths.headline}
                  </h2>
                  <p className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#a5b4fc]">
                    {s.paths.keyLine}
                  </p>
                </div>
                <Stage fluid className="min-h-[18rem] bg-white p-4">
                  <PathsVisual active={active === 6} />
                </Stage>
              </div>
            </Card>
          </Slide>

          {/* Screen 8: Division of work */}
          <Slide index={7}>
            <Card glass compact>
              <Eyebrow light>{s.division.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                {s.division.headline}
              </h2>
              <div className="mt-6">
                <DivisionVisual active={active === 7} />
              </div>
              <div className="mt-8 space-y-1 text-center">
                {s.division.footer.map((line, i) => (
                  <p
                    key={line}
                    className={cn(
                      "text-lg font-semibold md:text-xl",
                      i === 0 ? "text-[#a5b4fc]" : "text-success"
                    )}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </Card>
          </Slide>

          {/* Screen 9: Business benefit */}
          <Slide index={PITCH_AFTER_INDEX} tight>
            <Card compact className="border-[#ffd7b0]/35 shadow-[0_24px_80px_rgba(255,150,80,0.18)]">
              <div className="grid items-center gap-6 md:grid-cols-[0.72fr_1.28fr] md:gap-8">
                <div>
                  <Eyebrow>{s.benefit.eyebrow}</Eyebrow>
                  <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl md:leading-[1.08]">
                    {s.benefit.headline}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {s.benefit.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted md:text-[15px]"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-md text-xl font-semibold leading-snug tracking-[-0.02em] text-secondary-dark md:text-2xl">
                    {s.benefit.payoff}
                  </p>
                </div>
                <Stage fluid className="min-h-[18rem] p-3 md:p-4">
                  <BenefitVisual active={active === PITCH_AFTER_INDEX} />
                </Stage>
              </div>
            </Card>
          </Slide>

          {/* Screen 10: Integrations */}
          <Slide index={9}>
            <Eyebrow light>{s.integrations.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              {s.integrations.headline}
            </h2>
            <p className="mt-2 text-sm text-white/55">{s.integrations.sub}</p>
            <div className="mt-5 rounded-[2rem] ring-1 ring-white/10">
              <IntegrationsHub compact />
            </div>
          </Slide>

          {/* Screen 11: Pricing */}
          <Slide index={10}>
            <Card>
              <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <Eyebrow>{s.pricing.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.08]">
                    {s.pricing.headline}
                  </h2>
                  <p className="mt-4 max-w-xl text-lg text-muted">{s.pricing.sub}</p>
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
                        <Check className="h-4 w-4 shrink-0 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-sm font-semibold text-secondary-dark">{s.pricing.note}</p>
                </div>
              </div>
            </Card>
          </Slide>

          {/* Screen 12: Pilot */}
          <Slide index={11}>
            <div className="mx-auto max-w-3xl">
              <Eyebrow light>{s.pilot.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]">
                {s.pilot.headline}
              </h2>
              <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[#a5b4fc]">{s.pilot.sub}</p>
              <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 backdrop-blur-2xl sm:p-7">
                <ol className="space-y-5">
                  {s.pilot.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="font-mono text-sm font-semibold text-[#a5b4fc]">0{i + 1}</span>
                      <div>
                        <p className="text-base font-semibold text-white md:text-lg">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">{step.text}</p>
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
              <p className="mt-5 text-sm text-white/60">
                {s.pilot.footer.join(" · ")}
              </p>
            </div>
          </Slide>

          {/* Transition: Open live dashboard */}
          <Slide index={12}>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow light>{s.transition.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]">
                {s.transition.headline}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-white/70 md:text-lg">{s.transition.sub}</p>
              <div className="mt-10">
                <Button
                  href="https://app.zonikai.com/"
                  variant="accent"
                  size="lg"
                  className="gap-2"
                >
                  {s.transition.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Slide>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex">
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
