"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bell, Eye, Link2, PhoneCall, Truck } from "lucide-react";
import {
  PITCH_AFTER_INDEX,
  PITCH_FEATURES_INDEX,
  PITCH_NIGHT_INDEX,
  PITCH_SLIDE_COUNT,
  pitchSlides as s,
} from "@/lib/pitch-slides";
import { FEATURES } from "@/lib/features";
import { Button } from "@/components/ui/Button";
import { RouteMapAnimation } from "@/components/ui/RouteMapAnimation";
import { HeroDashboard } from "@/components/home/Hero";
import {
  AlertVisual,
  ConnectVisual,
  MonitorVisual,
  VoiceVisual,
} from "@/components/home/HowItWorksVisuals";
import { IntegrationsHub } from "@/components/integrations/IntegrationsHub";
import {
  CallStoryVisual,
  EtaStoryVisual,
  FactsStoryVisual,
  HandoffStoryVisual,
  LoadsStoryVisual,
  ReportStoryVisual,
  StatusStoryVisual,
} from "@/components/features/FeatureStoryVisuals";
import { cn } from "@/lib/utils";

const H = "min-h-[100dvh]";
const VIEW = "h-[100dvh]";
const COUNT = PITCH_SLIDE_COUNT;
const FEATURE_N = FEATURES.length;
const FEATURE_GAP_PX = 80;
const howVisuals = [ConnectVisual, MonitorVisual, VoiceVisual, AlertVisual] as const;
const howIcons = [Link2, Eye, PhoneCall, Bell];
const featureVisuals = [
  EtaStoryVisual,
  CallStoryVisual,
  FactsStoryVisual,
  LoadsStoryVisual,
  StatusStoryVisual,
  HandoffStoryVisual,
  ReportStoryVisual,
] as const;

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
    <div
      ref={boxRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
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

const NIGHT_TRUCKS = [
  { id: "T-1042", load: "#48291" },
  { id: "T-2187", load: "#48305" },
  { id: "T-3301", load: "#48312" },
  { id: "T-4410", load: "#48318" },
];

function NightBlindVisual({ active }: { active: boolean }) {
  const [scan, setScan] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setScan((n) => (n + 1) % NIGHT_TRUCKS.length), 1500);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Night board
          </p>
          <p className="text-[11px] text-white/35">Whole desk on problems</p>
        </div>
        {NIGHT_TRUCKS.map((row, i) => {
          const on = active && scan === i;
          return (
            <div
              key={row.id}
              className={cn(
                "flex items-center justify-between px-4 py-3 transition-colors",
                on ? "bg-white/10" : "bg-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-white/35" />
                <div>
                  <p className="font-mono text-sm font-semibold text-white/80">{row.id}</p>
                  <p className="font-mono text-[11px] text-white/35">{row.load}</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-white/40">
                {on ? "Opening ELD…" : "Unknown"}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative overflow-hidden rounded-2xl opacity-50 grayscale">
        <RouteMapAnimation theme="dark" showLabels={false} height="h-28 w-full" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0b1b3a]/40">
          <p className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
            No live ETA
          </p>
        </div>
      </div>
    </div>
  );
}

function peak(p: number, index: number, halfWidth: number) {
  const center = index / (COUNT - 1);
  return Math.max(0, 1 - Math.abs(p - center) / halfWidth);
}

function FeatureReel({
  featureIndex,
  trackRef,
  onSelect,
}: {
  featureIndex: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-end justify-between gap-4">
        <div>
          <Eyebrow light>{s.features.eyebrow}</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
            {s.features.headline}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[#a5b4fc]">
            {FEATURES[featureIndex].number} / 07
          </p>
          <div className="hidden items-center gap-1.5 sm:flex">
            {FEATURES.map((feature, i) => (
              <button
                key={feature.number}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Feature ${feature.number}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === featureIndex ? "w-5 bg-[#a5b4fc]" : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 min-h-0 flex-1 overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ gap: FEATURE_GAP_PX }}
        >
          {FEATURES.map((feature, i) => {
            const Visual = featureVisuals[i];
            return (
              <div
                key={feature.number}
                className="h-full min-w-full shrink-0 overflow-hidden"
                style={{ flex: "0 0 100%" }}
              >
                <div className="grid h-full min-h-0 items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
                  <div className="min-w-0 pr-2">
                    <p className="font-mono text-sm font-semibold tracking-[0.18em] text-[#a5b4fc]">
                      {feature.number} / 07
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white md:text-4xl md:leading-[1.1]">
                      {feature.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                      {feature.text}
                    </p>
                  </div>
                  <div className="flex h-[min(38vh,20rem)] min-h-[220px] items-stretch overflow-hidden rounded-3xl border border-white/15 bg-white p-4 text-foreground shadow-[0_16px_48px_rgba(0,0,0,0.18)] md:p-5">
                    <div className="w-full min-w-0">
                      <Visual compact active={featureIndex === i} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const truckBodyRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const dawnRef = useRef<HTMLDivElement>(null);
  const featureTrackRef = useRef<HTMLDivElement>(null);
  const rawProgress = useRef(0);
  const visProgress = useRef(0);
  const rawFeature = useRef(0);
  const targetRef = useRef(0);
  const [active, setActive] = useState(0);
  const [howStep, setHowStep] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);

  const paintRoute = useCallback((p: number) => {
    const path = pathRef.current;
    const fill = fillRef.current;
    const truck = truckRef.current;
    const truckBody = truckBodyRef.current;
    const night = nightRef.current;
    const dawn = dawnRef.current;
    const nightT = peak(p, PITCH_NIGHT_INDEX, 0.16);
    const dawnT = peak(p, PITCH_AFTER_INDEX, 0.16);
    if (night) night.style.opacity = String(nightT * 0.95);
    if (dawn) dawn.style.opacity = String(dawnT * 0.82);
    if (!path || !fill || !truck || !truckBody) return;
    const len = path.getTotalLength();
    if (!len) return;
    const root = scrollerRef.current;
    const vh = root?.clientHeight ?? 0;
    const targetY = (root?.scrollTop ?? 0) + vh * 0.38;
    const dist = lengthAtY(path, targetY, len);
    const t = Math.min(len * 0.992, Math.max(len * 0.012, dist));
    fill.style.strokeDashoffset = String(1 - t / len);
    const a = path.getPointAtLength(t);
    const b = path.getPointAtLength(Math.min(len, t + Math.max(16, len * 0.006)));
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

  const paintFeature = useCallback((fp: number) => {
    const track = featureTrackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;
    const x = Math.min(FEATURE_N - 1, Math.max(0, fp * (FEATURE_N - 1)));
    const step = viewport.clientWidth + FEATURE_GAP_PX;
    track.style.transform = `translate3d(${-x * step}px, 0, 0)`;
    const idx = Math.round(x);
    setFeatureIndex((prev) => (prev === idx ? prev : idx));
  }, []);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(COUNT - 1, index));
    targetRef.current = next;
    const panel = scrollerRef.current?.querySelector(`[data-panel="${next}"]`);
    panel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToFeature = useCallback((index: number) => {
    const root = scrollerRef.current;
    const chapter = root?.querySelector<HTMLElement>(
      `[data-panel="${PITCH_FEATURES_INDEX}"]`
    );
    if (!root || !chapter) return;
    const next = Math.max(0, Math.min(FEATURE_N - 1, index));
    const span = Math.max(1, chapter.offsetHeight - root.clientHeight);
    root.scrollTo({
      top: chapter.offsetTop + (next / (FEATURE_N - 1)) * span,
      behavior: "smooth",
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
      if (slide === PITCH_FEATURES_INDEX) {
        const chapter = panels[i];
        const span = Math.max(1, chapter.offsetHeight - root.clientHeight);
        rawFeature.current = Math.min(
          1,
          Math.max(0, (y - chapter.offsetTop) / span)
        );
      } else {
        rawFeature.current = slide > PITCH_FEATURES_INDEX ? 1 : 0;
      }
      setActive((prev) => (prev === slide ? prev : slide));
      targetRef.current = slide;
      paintFeature(rawFeature.current);
    };

    const tick = () => {
      if (!running) return;
      visProgress.current += (rawProgress.current - visProgress.current) * 0.08;
      const p = visProgress.current;
      paintRoute(p);
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
    paintFeature(0);
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [paintRoute, paintFeature]);

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

  useEffect(() => {
    if (active !== 4) return;
    const t = setInterval(() => setHowStep((n) => (n + 1) % 4), 4200);
    return () => clearInterval(t);
  }, [active]);

  const HowVisual = howVisuals[howStep];

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className={cn(
          "pitch-scroller relative h-[100dvh] overflow-y-auto overscroll-y-contain bg-[#0b1b3a]"
        )}
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
              <div
                ref={dawnRef}
                className="absolute inset-0 opacity-0 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(ellipse 110% 80% at 50% -8%, rgba(255,196,130,0.95), rgba(255,150,80,0.45) 42%, rgba(255,120,60,0.12) 68%, transparent 82%)",
                }}
              />
            </div>
          </div>

          <Slide index={0}>
            <div className="relative grid items-center gap-8 md:grid-cols-2 md:gap-10">
              <div>
                <Image
                  src="/brand/zonik-pin.png"
                  alt=""
                  width={56}
                  height={61}
                  className="mb-5 h-12 w-auto object-contain"
                  priority
                />
                <Eyebrow light>{s.title.eyebrow}</Eyebrow>
                <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                  {s.title.headline}
                </h1>
                <p className="mt-5 max-w-md text-base text-white/60">{s.title.sub}</p>
                <p className="mt-12 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  Scroll to follow the load
                </p>
              </div>
              <HeroDashboard />
            </div>
          </Slide>

          <Slide index={1}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <Eyebrow>{s.what.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl md:leading-[1.08]">
                    {s.what.headline}
                  </h2>
                  <ul className="mt-8 space-y-4">
                    {s.what.points.map((point) => (
                      <li key={point} className="text-lg leading-snug text-muted md:text-xl">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <Stage>
                  <Image
                    src="/product/fleet-map.png"
                    alt="Zonik fleet map"
                    width={1024}
                    height={580}
                    className="h-full w-full object-cover object-top"
                  />
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={2}>
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
              <div>
                <Eyebrow light>{s.night.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
                  {s.night.headline}
                </h2>
                <div className="mt-8 space-y-4">
                  {s.night.items.map((item) => (
                    <div key={item.title} className="border-l-2 border-white/20 pl-4">
                      <p className="text-lg font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-white/55">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <NightBlindVisual active={active === PITCH_NIGHT_INDEX} />
            </div>
          </Slide>

          <Slide index={3} tight>
            <Card
              compact
              className="border-[#ffd7b0]/35 shadow-[0_24px_80px_rgba(255,150,80,0.18)]"
            >
              <div className="grid items-center gap-5 md:grid-cols-[0.85fr_1.15fr] md:gap-6">
                <div>
                  <Eyebrow>{s.after.eyebrow}</Eyebrow>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.1]">
                    {s.after.headline}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {s.after.items.map((item) => (
                      <li key={item} className="text-base font-semibold text-secondary-dark md:text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Stage fluid className="p-4">
                    <EtaStoryVisual compact active={active === PITCH_AFTER_INDEX} />
                  </Stage>
                  <Stage fluid className="p-4">
                    <CallStoryVisual compact active={active === PITCH_AFTER_INDEX} />
                  </Stage>
                </div>
              </div>
            </Card>
          </Slide>

          <Slide index={4}>
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
                          howStep === i
                            ? "bg-white/15"
                            : "text-white/90 hover:bg-white/[0.08]"
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
                    <HowVisual active={active === 4} />
                  </div>
                  <div className="flex flex-col justify-center border-t border-white/15 p-6 lg:border-l lg:border-t-0">
                    <p className="text-lg font-semibold text-white">{s.how.steps[howStep].title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      {s.how.steps[howStep].text}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Slide>

          <Slide index={5}>
            <Eyebrow light>{s.integrations.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              {s.integrations.headline}
            </h2>
            <p className="mt-2 text-sm text-white/55">{s.integrations.sub}</p>
            <div className="mt-5 ring-1 ring-white/10 rounded-[2rem]">
              <IntegrationsHub compact />
            </div>
          </Slide>

          <section
            data-panel={PITCH_FEATURES_INDEX}
            className="relative z-10"
            style={{ height: `calc(100dvh * ${FEATURE_N})` }}
          >
            <div className={cn("sticky top-0 flex items-center px-5 py-6 sm:px-8 lg:px-12", VIEW)}>
              <div className="relative mx-auto flex h-full w-full max-w-6xl items-stretch">
                <Card compact glass className="flex h-full w-full min-h-0 flex-col overflow-hidden">
                  <FeatureReel
                    featureIndex={featureIndex}
                    trackRef={featureTrackRef}
                    onSelect={goToFeature}
                  />
                </Card>
              </div>
            </div>
          </section>

          <Slide index={7}>
            <Card>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <Eyebrow>{s.pricing.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl md:leading-[1.08]">
                    {s.pricing.headline}
                  </h2>
                  <p className="mt-4 max-w-xl text-lg text-muted">{s.pricing.sub}</p>
                  <ul className="mt-8 space-y-3">
                    {s.pricing.items.map((item) => (
                      <li key={item} className="text-lg font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 max-w-xl text-sm text-muted">{s.pricing.note}</p>
                  <div className="mt-6">
                    <Button href="/calculator" variant="secondary">
                      Open the calculator
                    </Button>
                  </div>
                </div>
                <Stage className="flex h-auto flex-col justify-center p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                    Custom license
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                    Tracking. Calls. Seats.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    The route is the product. Numbers are on the call — not on a public list.
                  </p>
                  <div className="mt-6">
                    <RouteMapAnimation compact showLabels={false} height="h-24 w-full" />
                  </div>
                </Stage>
              </div>
            </Card>
          </Slide>

          <Slide index={8}>
            <div className="mx-auto max-w-3xl">
              <Eyebrow light>{s.close.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]">
                {s.close.headline}
              </h2>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#a5b4fc] md:text-3xl">
                {s.close.accent}
              </p>
              <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">{s.close.body}</p>
              <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 backdrop-blur-2xl sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c7d2fe]">
                  {s.close.need}
                </p>
                <ol className="mt-4 space-y-3">
                  {s.close.items.map((item, i) => (
                    <li key={item} className="flex gap-3 text-base text-white md:text-lg">
                      <span className="font-mono text-sm font-semibold text-[#a5b4fc]">
                        0{i + 1}
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-8">
                <Button href={s.close.links[0].href} variant="accent" size="lg">
                  {s.close.cta}
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/60">
                <a
                  href={s.close.links[1].href}
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.close.links[1].label}
                </a>
                <span className="mx-3">·</span>
                <a href={s.close.links[2].href} className="hover:text-white">
                  {s.close.links[2].label}
                </a>
              </p>
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
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "pointer-events-auto h-2 w-2 rounded-full transition-all",
              active === i
                ? "scale-125 bg-secondary"
                : "bg-white/35 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
}
