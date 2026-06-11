"use client";

import { Truck } from "lucide-react";
import type { Load } from "@/lib/dashboard-types";
import { cn } from "@/lib/utils";

export function RouteProgress({ load }: { load: Load }) {
  const { stops, currentStopIndex, progress } = load;
  const segmentCount = stops.length - 1;
  const overallProgress =
    segmentCount > 0
      ? (currentStopIndex + progress) / segmentCount
      : progress;

  return (
    <div className="space-y-3">
      <div className="relative flex items-start justify-between gap-1">
        {stops.map((stop, i) => {
          const isPast = i < currentStopIndex;
          const isCurrent = i === currentStopIndex;
          const isFuture = i > currentStopIndex;

          return (
            <div key={stop.id} className="relative z-10 flex flex-1 flex-col items-center gap-1">
              <div
                className={cn(
                  "h-3 w-3 rounded-full border-2",
                  isPast && "border-success bg-success",
                  isCurrent && "border-secondary bg-secondary",
                  isFuture && "border-border bg-white"
                )}
              />
              <span className="text-center text-[9px] font-medium uppercase text-muted">
                {stop.type === "PICKUP" ? "Pickup" : stop.type === "DELIVERY" ? "Delivery" : "Stop"}
              </span>
              <span className="text-center text-[9px] font-medium leading-tight">{stop.location}</span>
              {isCurrent && (
                <span className="text-center text-[9px] text-secondary-dark">Current</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative mx-4 h-1.5 rounded-full bg-border">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-secondary transition-all"
          style={{ width: `${Math.min(100, overallProgress * 100)}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${Math.min(98, overallProgress * 100)}%` }}
        >
          <Truck className="h-4 w-4 -translate-x-1/2 text-secondary-dark" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
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
