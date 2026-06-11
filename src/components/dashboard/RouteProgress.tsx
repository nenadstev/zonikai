"use client";

import { Truck } from "lucide-react";
import type { Load, LoadStop } from "@/lib/dashboard-types";
import { cn } from "@/lib/utils";

const TRACK_INSET = 11;

function stopLabel(type: LoadStop["type"]) {
  if (type === "PICKUP") return "Pickup";
  if (type === "DELIVERY") return "Delivery";
  return "Stop";
}

function resolveNextStopIndex(load: Load): number {
  const idx = load.stops.findIndex(
    (s) =>
      s.location === load.nextStop ||
      s.location.startsWith(load.nextStop) ||
      load.nextStop.startsWith(s.location.split(",")[0])
  );
  return idx >= 0 ? idx : Math.min(load.currentStopIndex, load.stops.length - 1);
}

function getTruckState(load: Load) {
  const { stops, progress, truckStatus } = load;
  const nextIdx = resolveNextStopIndex(load);
  const segFrom = Math.max(0, nextIdx - 1);
  const segTo = Math.min(nextIdx, stops.length - 1);

  let position: number;
  let mode: "at" | "between";

  if (truckStatus === "STATIONARY") {
    position = progress < 0.5 ? segFrom : segTo;
    mode = "at";
  } else {
    position = segFrom + Math.min(1, Math.max(0, progress));
    const frac = position % 1;
    if (frac < 0.04 || frac > 0.96) {
      position = Math.round(position);
      mode = "at";
    } else {
      mode = "between";
    }
  }

  const fromIdx = Math.floor(position);
  const toIdx = Math.min(fromIdx + 1, stops.length - 1);
  const segProgress = position - fromIdx;

  return { position, mode, fromIdx, toIdx, segProgress, atStopIdx: mode === "at" ? Math.round(position) : null };
}

function stopPct(index: number, stopCount: number) {
  if (stopCount <= 1) return 50;
  return (index / (stopCount - 1)) * 100;
}

function trackLeft(pct: number) {
  return `calc(${TRACK_INSET}px + (100% - ${TRACK_INSET * 2}px) * ${pct / 100})`;
}

export function RouteProgress({ load }: { load: Load }) {
  const { stops } = load;

  if (stops.length === 0) {
    return <p className="text-xs text-muted">No stops on this load.</p>;
  }

  const { position, mode, fromIdx, toIdx, segProgress, atStopIdx } = getTruckState(load);
  const truckPct = stopPct(position, stops.length);

  const caption =
    mode === "at" && atStopIdx !== null
      ? `At ${stops[atStopIdx].location}`
      : `Between ${stops[fromIdx].location} and ${stops[toIdx].location} (${Math.round(segProgress * 100)}% of leg)`;

  return (
    <div className="space-y-4">
      <div className="relative h-10 px-0">
        {/* Full track */}
        <div
          className="absolute top-[17px] h-0.5 rounded-full bg-border"
          style={{ left: TRACK_INSET, right: TRACK_INSET }}
        />

        {/* Completed track */}
        <div
          className="absolute top-[17px] h-0.5 rounded-full bg-secondary"
          style={{ left: TRACK_INSET, width: `calc((100% - ${TRACK_INSET * 2}px) * ${truckPct / 100})` }}
        />

        {/* Stop nodes — aligned to track endpoints */}
        {stops.map((stop, i) => {
          const pct = stopPct(i, stops.length);
          const isPast = position > i + 0.05;
          const isTruckHere = mode === "at" && atStopIdx === i;

          return (
            <div
              key={stop.id}
              className="absolute top-0 z-10 -translate-x-1/2"
              style={{ left: trackLeft(pct) }}
            >
              <div
                className={cn(
                  "flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 bg-white",
                  isPast && !isTruckHere && "border-success bg-success",
                  isTruckHere && "border-secondary-dark bg-secondary shadow-md shadow-secondary/30",
                  !isPast && !isTruckHere && "border-border"
                )}
              >
                {isTruckHere ? (
                  <Truck className="h-3.5 w-3.5 text-white" />
                ) : (
                  <span className={cn("text-[9px] font-bold", isPast ? "text-white" : "text-muted")}>
                    {i + 1}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Truck between stops */}
        {mode === "between" && (
          <div
            className="absolute z-20 -translate-x-1/2"
            style={{ left: trackLeft(truckPct), top: "9px" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-secondary-dark bg-secondary shadow-md shadow-secondary/25">
              <Truck className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>

      <p className="rounded-lg bg-accent-soft/50 px-3 py-2 text-center text-xs font-medium text-secondary-dark">
        {caption}
      </p>

      {/* Vertical stop list */}
      <div className="relative space-y-0 pl-1">
        {stops.map((stop, i) => {
          const isPast = position > i;
          const isCurrent =
            atStopIdx === i || (mode === "between" && (i === fromIdx || i === toIdx));
          const isLast = i === stops.length - 1;
          const connectorPast = position > i;

          return (
            <div key={stop.id} className="relative flex gap-3 pb-3">
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-[9px] top-[22px] w-0.5",
                    connectorPast ? "bg-success" : "bg-border"
                  )}
                  style={{ height: "calc(100% - 6px)" }}
                />
              )}
              <div
                className={cn(
                  "relative z-10 mt-1 h-[18px] w-[18px] shrink-0 rounded-full border-2 bg-white",
                  isPast && "border-success bg-success",
                  isCurrent && !isPast && "border-secondary bg-secondary",
                  !isPast && !isCurrent && "border-border"
                )}
              />
              <div
                className={cn(
                  "min-w-0 flex-1 rounded-lg border px-3 py-2 text-xs",
                  isCurrent ? "border-secondary/40 bg-accent-soft/30" : "border-border/50",
                  isPast && !isCurrent && "opacity-55"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">{stopLabel(stop.type)}</span>
                  <span className="text-[10px] text-muted">{stop.stopStatus}</span>
                </div>
                <p className="font-medium leading-snug">{stop.location}</p>
                <p className="text-[10px] text-muted">Appt {stop.appointmentTime} · ETA {stop.eta}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-border/60 pt-3 text-xs">
        <p><span className="text-muted">Near:</span> {load.nearestCity}</p>
        <p><span className="text-muted">ETA:</span> {load.currentEta}</p>
        <p><span className="text-muted">Remaining:</span> {load.remainingMiles} mi</p>
        <p><span className="text-muted">Delay:</span> {load.delayMinutes > 0 ? `+${load.delayMinutes} min` : "None"}</p>
        <p><span className="text-muted">GPS:</span> {load.gpsStatus === "OFFLINE" ? "GPS offline" : load.lastGpsUpdate}</p>
        <p><span className="text-muted">Next stop:</span> {load.nextStop}</p>
      </div>
    </div>
  );
}
