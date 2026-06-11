import type {
  AiAction,
  Alert,
  AlertSeverity,
  AttentionItem,
  CallLog,
  CriticalStop,
  EscalationItem,
  GpsHealthItem,
  Load,
  LoadStop,
  LoadStatus,
  RiskCategory,
  StopStatus,
  StopType,
} from "./dashboard-types";

export function getRiskCategory(etaOffsetMinutes: number): RiskCategory {
  if (etaOffsetMinutes > 300) return "majorDelay";
  if (etaOffsetMinutes >= -120 && etaOffsetMinutes <= 300) return "high";
  if (etaOffsetMinutes >= -240 && etaOffsetMinutes < -120) return "medium";
  return "none";
}

export const KPI_TOOLTIPS = {
  activeLoads: "Total loads currently active and monitored by Zonik AI this shift.",
  onTime: "Loads tracking on schedule with no delivery-window risk detected.",
  mediumRisk: "Loads projected to arrive at final delivery 2–4 hours before the scheduled appointment time.",
  highRisk: "Loads projected to arrive from 2 hours before up to 5 hours after the scheduled delivery appointment.",
  majorDelay: "Loads running more than 5 hours past the scheduled delivery appointment time.",
  escalateToDispatch: "Loads requiring human dispatch intervention — unreachable driver, unresolved escalation, or critical delivery risk.",
  openAlerts: "Unresolved system alerts requiring review. GPS issues and operational exceptions live here.",
} as const;

type RawLoad = Omit<Load, "riskCategory"> & { riskCategory?: RiskCategory };

function defaultStops(
  pickup: string,
  delivery: string,
  extras: { location: string; type: StopType; appointmentTime: string; stopStatus?: StopStatus }[] = []
): LoadStop[] {
  return [
    {
      id: "s1",
      type: "PICKUP",
      location: pickup,
      appointmentTime: "6:00 PM",
      eta: "6:05 PM",
      stopStatus: "Completed Confirmed",
    },
    ...extras.map((e, i) => ({
      id: `s${i + 2}`,
      type: e.type,
      location: e.location,
      appointmentTime: e.appointmentTime,
      eta: e.appointmentTime,
      stopStatus: e.stopStatus ?? ("Pending" as StopStatus),
    })),
    {
      id: `s${extras.length + 2}`,
      type: "DELIVERY" as StopType,
      location: delivery,
      appointmentTime: "10:00 PM",
      eta: "10:00 PM",
      stopStatus: "Pending" as StopStatus,
    },
  ];
}

function enrichLoad(raw: RawLoad): Load {
  const riskCategory = raw.riskCategory ?? getRiskCategory(raw.etaOffsetMinutes);
  const trackingStatus =
    riskCategory === "majorDelay" ? "MAJOR DELAY" : raw.trackingStatus;

  return { ...raw, riskCategory, trackingStatus };
}

const multiStopExtras = [
  { location: "Columbus, OH", type: "ADDITIONAL" as StopType, appointmentTime: "8:00 PM" },
  { location: "Louisville, KY", type: "ADDITIONAL" as StopType, appointmentTime: "9:00 PM" },
];

const baseLoads: RawLoad[] = [
  { id: "1", loadNum: "#LD-9842", truckNum: "T-1487", driver: "Michael Johnson", driverPhone: "(614) 555-0142", dispatcher: "Sarah K.", pickup: "Chicago, IL", delivery: "Atlanta, GA", nextStop: "Columbus, OH", nearestCity: "Columbus, OH", currentEta: "8:45 PM", delayMinutes: 18, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "3 min ago", lastGpsMinutesAgo: 3, callStatus: "COMPLETED", lastCallAttempt: "2 hr ago", mapX: 72, mapY: 48, remainingMiles: 187, progress: 0.42, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Chicago, IL", "Atlanta, GA", multiStopExtras), aiSummary: "Truck is moving on schedule. GPS active. Next stop Columbus on time. No action required.", warning: "Monitor — no intervention needed." },
  { id: "2", loadNum: "#LD-2231", truckNum: "T-2291", driver: "Robert Martinez", driverPhone: "(317) 555-0198", dispatcher: "James L.", pickup: "Indianapolis, IN", delivery: "Dallas, TX", nextStop: "St. Louis, MO", nearestCity: "Indianapolis, IN", currentEta: "9:12 PM", delayMinutes: 85, etaOffsetMinutes: 85, trackingStatus: "LATE", riskLevel: "HIGH", gpsStatus: "OFFLINE", truckStatus: "STATIONARY", lastGpsUpdate: "47 min ago", lastGpsMinutesAgo: 47, callStatus: "NO ANSWER", lastCallAttempt: "35 min ago", problem: "GPS offline", mapX: 58, mapY: 52, remainingMiles: 312, progress: 0.28, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Indianapolis, IN", "Dallas, TX"), aiSummary: "Truck is stationary. GPS is offline. Next stop is late by 85 minutes. Delivery status is still pending. Risk level is HIGH. Driver call is recommended.", warning: "Escalate — driver unreachable, GPS offline.", escalatedToDispatch: true, escalationReason: "Driver unreachable after 3 call attempts. GPS offline. Delivery at risk." },
  { id: "3", loadNum: "#LD-3104", truckNum: "T-1042", driver: "David Chen", driverPhone: "(312) 555-0234", dispatcher: "Sarah K.", pickup: "Chicago, IL", delivery: "Nashville, TN", nextStop: "Indianapolis, IN", nearestCity: "Gary, IN", currentEta: "7:30 PM", delayMinutes: 0, etaOffsetMinutes: -180, trackingStatus: "ON TIME", riskLevel: "MEDIUM", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "2 min ago", lastGpsMinutesAgo: 2, callStatus: "NONE", mapX: 62, mapY: 44, remainingMiles: 156, progress: 0.55, currentStopIndex: 2, loadStatus: "Loaded", stops: defaultStops("Chicago, IL", "Nashville, TN"), aiSummary: "Load on schedule. GPS fresh. Approaching Indianapolis stop.", warning: "Arriving 3h early to final delivery — monitor appointment window." },
  { id: "4", loadNum: "#LD-4418", truckNum: "T-3318", driver: "James Wilson", dispatcher: "Mike R.", pickup: "Dallas, TX", delivery: "Chicago, IL", nextStop: "St. Louis, MO", nearestCity: "Tulsa, OK", currentEta: "10:05 PM", delayMinutes: 42, etaOffsetMinutes: 42, trackingStatus: "AT RISK", riskLevel: "MEDIUM", gpsStatus: "STALE", truckStatus: "MOVING", lastGpsUpdate: "22 min ago", lastGpsMinutesAgo: 22, callStatus: "ANSWERED", lastCallAttempt: "1 hr ago", problem: "GPS stale", mapX: 38, mapY: 62, remainingMiles: 445, progress: 0.35, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Dallas, TX", "Chicago, IL"), aiSummary: "GPS data is stale. Driver confirmed moving but ETA slipped 42 min. Monitor closely.", warning: "Watch GPS feed — call if stale exceeds 30 min." },
  { id: "5", loadNum: "#LD-5520", truckNum: "T-2187", driver: "Carlos Rivera", driverPhone: "(404) 555-0311", dispatcher: "James L.", pickup: "Atlanta, GA", delivery: "Pittsburgh, PA", nextStop: "Nashville, TN", nearestCity: "Macon, GA", currentEta: "8:20 PM", delayMinutes: 12, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "4 min ago", lastGpsMinutesAgo: 4, callStatus: "COMPLETED", lastCallAttempt: "3 hr ago", mapX: 78, mapY: 72, remainingMiles: 298, progress: 0.38, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Atlanta, GA", "Pittsburgh, PA"), aiSummary: "On schedule with minor buffer. GPS active.", warning: "No action required." },
  { id: "6", loadNum: "#LD-6612", truckNum: "T-4420", driver: "Unknown", dispatcher: "Sarah K.", pickup: "Columbus, OH", delivery: "Dallas, TX", nextStop: "Indianapolis, IN", nearestCity: "Dayton, OH", currentEta: "9:45 PM", delayMinutes: 0, etaOffsetMinutes: -150, trackingStatus: "UNVERIFIED", riskLevel: "MEDIUM", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "5 min ago", lastGpsMinutesAgo: 5, callStatus: "NONE", problem: "Missing driver phone", mapX: 70, mapY: 50, remainingMiles: 520, progress: 0.15, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Columbus, OH", "Dallas, TX"), aiSummary: "Driver phone missing from TMS. Cannot auto-call if risk escalates.", warning: "Update driver contact info in TMS." },
  { id: "7", loadNum: "#LD-7733", truckNum: "T-5501", driver: "Anthony Brooks", driverPhone: "(615) 555-0445", dispatcher: "Mike R.", pickup: "Nashville, TN", delivery: "Chicago, IL", nextStop: "Indianapolis, IN", nearestCity: "Bowling Green, KY", currentEta: "7:55 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "1 min ago", lastGpsMinutesAgo: 1, callStatus: "NONE", mapX: 68, mapY: 58, remainingMiles: 234, progress: 0.48, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Nashville, TN", "Chicago, IL"), aiSummary: "Load progressing normally.", warning: "No action required." },
  { id: "8", loadNum: "#LD-8844", truckNum: "T-6612", driver: "Kevin O'Brien", driverPhone: "(412) 555-0556", dispatcher: "James L.", pickup: "Pittsburgh, PA", delivery: "Atlanta, GA", nextStop: "Columbus, OH", nearestCity: "Washington, PA", currentEta: "8:30 PM", delayMinutes: 28, etaOffsetMinutes: 28, trackingStatus: "LATE", riskLevel: "HIGH", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "6 min ago", lastGpsMinutesAgo: 6, callStatus: "VOICEMAIL", lastCallAttempt: "45 min ago", problem: "Delivery ETA delayed by 28 minutes", mapX: 82, mapY: 42, remainingMiles: 412, progress: 0.22, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Pittsburgh, PA", "Atlanta, GA"), aiSummary: "ETA slipped 28 min. Voicemail left on last call. Delivery at risk.", warning: "Retry call in 30 min if delay increases.", escalatedToDispatch: true, escalationReason: "Voicemail only — delivery window tightening. Dispatch confirmation needed." },
  { id: "9", loadNum: "#LD-9955", truckNum: "T-7723", driver: "Marcus Thompson", driverPhone: "(214) 555-0667", dispatcher: "Sarah K.", pickup: "Dallas, TX", delivery: "Nashville, TN", nextStop: "Little Rock, AR", nearestCity: "Texarkana, TX", currentEta: "9:00 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "3 min ago", lastGpsMinutesAgo: 3, callStatus: "NONE", mapX: 42, mapY: 68, remainingMiles: 378, progress: 0.31, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Dallas, TX", "Nashville, TN"), aiSummary: "On schedule.", warning: "No action required." },
  { id: "10", loadNum: "#LD-1066", truckNum: "T-8834", driver: "Lisa Park", driverPhone: "(314) 555-0778", dispatcher: "Mike R.", pickup: "St. Louis, MO", delivery: "Indianapolis, IN", nextStop: "Terre Haute, IN", nearestCity: "Effingham, IL", currentEta: "7:15 PM", delayMinutes: 0, etaOffsetMinutes: -200, trackingStatus: "ON TIME", riskLevel: "MEDIUM", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "2 min ago", lastGpsMinutesAgo: 2, callStatus: "NONE", mapX: 55, mapY: 54, remainingMiles: 142, progress: 0.72, currentStopIndex: 2, loadStatus: "Loaded", stops: defaultStops("St. Louis, MO", "Indianapolis, IN"), aiSummary: "Approaching delivery window.", warning: "Arriving 3.3h early — confirm receiver availability." },
  { id: "11", loadNum: "#LD-1177", truckNum: "T-9945", driver: "Brian Foster", driverPhone: "(404) 555-0889", dispatcher: "James L.", pickup: "Atlanta, GA", delivery: "Chicago, IL", nextStop: "Chattanooga, TN", nearestCity: "Dalton, GA", currentEta: "8:50 PM", delayMinutes: 55, etaOffsetMinutes: 55, trackingStatus: "LATE", riskLevel: "HIGH", gpsStatus: "OK", truckStatus: "STATIONARY", lastGpsUpdate: "8 min ago", lastGpsMinutesAgo: 8, callStatus: "ANSWERED", lastCallAttempt: "20 min ago", problem: "Truck stationary near pickup", mapX: 76, mapY: 70, remainingMiles: 589, progress: 0.12, currentStopIndex: 0, loadStatus: "To be loaded", stops: defaultStops("Atlanta, GA", "Chicago, IL"), aiSummary: "Truck stationary 40+ min near pickup zone. Driver reported mechanical issue. High risk for on-time pickup.", warning: "Confirm repair ETA with driver. Alert dispatcher." },
  { id: "12", loadNum: "#LD-1288", truckNum: "T-1056", driver: "Daniel Kim", driverPhone: "(312) 555-0990", dispatcher: "Sarah K.", pickup: "Chicago, IL", delivery: "Dallas, TX", nextStop: "Springfield, IL", nearestCity: "Bloomington, IL", currentEta: "7:40 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "4 min ago", lastGpsMinutesAgo: 4, callStatus: "NONE", mapX: 56, mapY: 48, remainingMiles: 267, progress: 0.45, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Chicago, IL", "Dallas, TX"), aiSummary: "Normal progress.", warning: "No action required." },
  { id: "13", loadNum: "#LD-1399", truckNum: "T-1167", driver: "Steven Wright", driverPhone: "(317) 555-1001", dispatcher: "Mike R.", pickup: "Indianapolis, IN", delivery: "Atlanta, GA", nextStop: "Cincinnati, OH", nearestCity: "Richmond, IN", currentEta: "8:05 PM", delayMinutes: 15, etaOffsetMinutes: 15, trackingStatus: "AT RISK", riskLevel: "MEDIUM", gpsStatus: "STALE", truckStatus: "MOVING", lastGpsUpdate: "18 min ago", lastGpsMinutesAgo: 18, callStatus: "NONE", problem: "No new GPS ping received", mapX: 66, mapY: 50, remainingMiles: 345, progress: 0.33, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Indianapolis, IN", "Atlanta, GA"), aiSummary: "GPS ping delayed. Truck likely moving but unconfirmed.", warning: "Monitor — auto-call if stale exceeds 25 min." },
  { id: "14", loadNum: "#LD-1500", truckNum: "T-1278", driver: "Jason Miller", driverPhone: "(615) 555-1112", dispatcher: "James L.", pickup: "Nashville, TN", delivery: "Pittsburgh, PA", nextStop: "Louisville, KY", nearestCity: "Clarksville, TN", currentEta: "7:25 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "3 min ago", lastGpsMinutesAgo: 3, callStatus: "NONE", mapX: 64, mapY: 60, remainingMiles: 198, progress: 0.58, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Nashville, TN", "Pittsburgh, PA"), aiSummary: "On schedule.", warning: "No action required." },
  { id: "15", loadNum: "#LD-1611", truckNum: "T-1389", driver: "Ryan Cooper", driverPhone: "(214) 555-1223", dispatcher: "Sarah K.", pickup: "Dallas, TX", delivery: "Chicago, IL", nextStop: "Oklahoma City, OK", nearestCity: "Waco, TX", currentEta: "10:30 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "5 min ago", lastGpsMinutesAgo: 5, callStatus: "NONE", mapX: 40, mapY: 72, remainingMiles: 612, progress: 0.18, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Dallas, TX", "Chicago, IL"), aiSummary: "Early in route. GPS active.", warning: "No action required." },
  { id: "16", loadNum: "#LD-1722", truckNum: "T-1490", driver: "Eric Adams", driverPhone: "(412) 555-1334", dispatcher: "Mike R.", pickup: "Pittsburgh, PA", delivery: "Dallas, TX", nextStop: "Columbus, OH", nearestCity: "Zanesville, OH", currentEta: "9:15 PM", delayMinutes: 32, etaOffsetMinutes: 32, trackingStatus: "LATE", riskLevel: "MEDIUM", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "7 min ago", lastGpsMinutesAgo: 7, callStatus: "COMPLETED", lastCallAttempt: "1.5 hr ago", problem: "Pickup stop not verified", mapX: 74, mapY: 46, remainingMiles: 489, progress: 0.25, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Pittsburgh, PA", "Dallas, TX"), aiSummary: "Pickup completion unverified in TMS. Driver confirmed via call but stop status pending.", warning: "Confirm stop status with dispatcher." },
  { id: "17", loadNum: "#LD-1833", truckNum: "T-1501", driver: "Tom Harris", driverPhone: "(314) 555-1445", dispatcher: "James L.", pickup: "St. Louis, MO", delivery: "Atlanta, GA", nextStop: "Memphis, TN", nearestCity: "Cape Girardeau, MO", currentEta: "8:00 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "2 min ago", lastGpsMinutesAgo: 2, callStatus: "NONE", mapX: 52, mapY: 58, remainingMiles: 356, progress: 0.4, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("St. Louis, MO", "Atlanta, GA"), aiSummary: "Normal.", warning: "No action required." },
  { id: "18", loadNum: "#LD-1944", truckNum: "T-1612", driver: "Paul Nguyen", driverPhone: "(404) 555-1556", dispatcher: "Sarah K.", pickup: "Atlanta, GA", delivery: "Indianapolis, IN", nextStop: "Chattanooga, TN", nearestCity: "Chattanooga, TN", currentEta: "7:50 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "4 min ago", lastGpsMinutesAgo: 4, callStatus: "NONE", mapX: 72, mapY: 64, remainingMiles: 278, progress: 0.52, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Atlanta, GA", "Indianapolis, IN"), aiSummary: "On schedule.", warning: "No action required." },
  { id: "19", loadNum: "#LD-2055", truckNum: "T-1723", driver: "Chris Evans", driverPhone: "(312) 555-1667", dispatcher: "Mike R.", pickup: "Chicago, IL", delivery: "Nashville, TN", nextStop: "Louisville, KY", nearestCity: "Jeffersonville, IN", currentEta: "8:10 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "3 min ago", lastGpsMinutesAgo: 3, callStatus: "NONE", mapX: 64, mapY: 46, remainingMiles: 312, progress: 0.38, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Chicago, IL", "Nashville, TN"), aiSummary: "Normal.", warning: "No action required." },
  { id: "20", loadNum: "#LD-2166", truckNum: "T-1834", driver: "Mark Sullivan", driverPhone: "(317) 555-1778", dispatcher: "James L.", pickup: "Indianapolis, IN", delivery: "Dallas, TX", nextStop: "Evansville, IN", nearestCity: "Evansville, IN", currentEta: "7:35 PM", delayMinutes: 22, etaOffsetMinutes: 22, trackingStatus: "LATE", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "2 min ago", lastGpsMinutesAgo: 2, callStatus: "NONE", mapX: 60, mapY: 56, remainingMiles: 445, progress: 0.28, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Indianapolis, IN", "Dallas, TX"), aiSummary: "Minor delay on route.", warning: "Monitor." },
  { id: "21", loadNum: "#LD-2277", truckNum: "T-1945", driver: "Greg Walsh", driverPhone: "(615) 555-1889", dispatcher: "Sarah K.", pickup: "Nashville, TN", delivery: "Chicago, IL", nextStop: "Bowling Green, KY", nearestCity: "Bowling Green, KY", currentEta: "8:25 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "5 min ago", lastGpsMinutesAgo: 5, callStatus: "NONE", mapX: 66, mapY: 58, remainingMiles: 389, progress: 0.35, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Nashville, TN", "Chicago, IL"), aiSummary: "Normal.", warning: "No action required." },
  { id: "22", loadNum: "#LD-2388", truckNum: "T-2056", driver: "Scott Reed", driverPhone: "(214) 555-1990", dispatcher: "Mike R.", pickup: "Dallas, TX", delivery: "Pittsburgh, PA", nextStop: "Memphis, TN", nearestCity: "Little Rock, AR", currentEta: "9:40 PM", delayMinutes: 0, etaOffsetMinutes: 340, trackingStatus: "LATE", riskLevel: "HIGH", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "4 min ago", lastGpsMinutesAgo: 4, callStatus: "NONE", mapX: 48, mapY: 64, remainingMiles: 534, progress: 0.22, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Dallas, TX", "Pittsburgh, PA"), aiSummary: "Severe delay detected — over 5 hours past delivery appointment.", warning: "Immediate dispatch intervention required." },
  { id: "23", loadNum: "#LD-2499", truckNum: "T-2167", driver: "Tim Boyd", driverPhone: "(412) 555-2001", dispatcher: "James L.", pickup: "Pittsburgh, PA", delivery: "Nashville, TN", nextStop: "Columbus, OH", nearestCity: "Cambridge, OH", currentEta: "8:15 PM", delayMinutes: 0, etaOffsetMinutes: 0, trackingStatus: "ON TIME", riskLevel: "LOW", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "3 min ago", lastGpsMinutesAgo: 3, callStatus: "NONE", mapX: 76, mapY: 48, remainingMiles: 367, progress: 0.41, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("Pittsburgh, PA", "Nashville, TN"), aiSummary: "Normal.", warning: "No action required." },
  { id: "24", loadNum: "#LD-2510", truckNum: "T-2278", driver: "Nick Palmer", driverPhone: "(314) 555-2112", dispatcher: "Sarah K.", pickup: "St. Louis, MO", delivery: "Dallas, TX", nextStop: "Springfield, MO", nearestCity: "Springfield, MO", currentEta: "9:05 PM", delayMinutes: 0, etaOffsetMinutes: -130, trackingStatus: "ON TIME", riskLevel: "MEDIUM", gpsStatus: "OK", truckStatus: "MOVING", lastGpsUpdate: "6 min ago", lastGpsMinutesAgo: 6, callStatus: "NONE", mapX: 46, mapY: 56, remainingMiles: 423, progress: 0.3, currentStopIndex: 1, loadStatus: "Loaded", stops: defaultStops("St. Louis, MO", "Dallas, TX"), aiSummary: "On schedule.", warning: "Arriving 2.2h early to final delivery." },
];

export const loads: Load[] = baseLoads.map(enrichLoad);

const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };

export const attentionItems: AttentionItem[] = loads
  .filter((l) => l.problem || l.riskLevel === "HIGH" || l.riskLevel === "MEDIUM")
  .map((l) => ({
    loadId: l.id,
    loadNum: l.loadNum,
    truckNum: l.truckNum,
    driver: l.driver,
    problem: l.problem ?? `${l.trackingStatus} — ${l.riskLevel} risk`,
    severity: (l.riskLevel === "HIGH" ? "HIGH" : l.riskLevel === "MEDIUM" ? "MEDIUM" : "LOW") as AlertSeverity,
    location: l.nearestCity,
    nextStop: l.nextStop,
    eta: l.currentEta,
    delay: l.delayMinutes > 0 ? `+${l.delayMinutes} min` : "—",
    lastGps: l.lastGpsUpdate,
    lastCall: l.lastCallAttempt ?? "—",
  }))
  .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

export const escalationItems: EscalationItem[] = loads
  .filter((l) => l.escalatedToDispatch)
  .map((l) => ({
    loadId: l.id,
    loadNum: l.loadNum,
    truckNum: l.truckNum,
    driver: l.driver,
    loadStatus: l.loadStatus,
    reason: l.escalationReason ?? l.warning,
  }));

export const alerts: Alert[] = [
  { id: "a1", time: "7:42 PM", loadNum: "#LD-2231", truckNum: "T-2291", problem: "GPS offline", severity: "HIGH", status: "OPEN" },
  { id: "a2", time: "7:38 PM", loadNum: "#LD-1177", truckNum: "T-9945", problem: "Truck stationary too long", severity: "HIGH", status: "OPEN" },
  { id: "a3", time: "7:31 PM", loadNum: "#LD-8844", truckNum: "T-6612", problem: "ETA late", severity: "MEDIUM", status: "OPEN" },
  { id: "a4", time: "7:22 PM", loadNum: "#LD-6612", truckNum: "T-4420", problem: "Missing driver phone", severity: "MEDIUM", status: "OPEN" },
  { id: "a5", time: "7:15 PM", loadNum: "#LD-4418", truckNum: "T-3318", problem: "GPS stale", severity: "MEDIUM", status: "OPEN" },
  { id: "a6", time: "6:58 PM", loadNum: "#LD-1722", truckNum: "T-1490", problem: "Stop mismatch", severity: "LOW", status: "OPEN" },
  { id: "a7", time: "6:45 PM", loadNum: "#LD-1399", truckNum: "T-1167", problem: "GPS stale", severity: "LOW", status: "RESOLVED" },
];

export const kpis = {
  activeLoads: loads.length,
  onTime: loads.filter((l) => l.riskCategory === "none" && l.trackingStatus === "ON TIME").length,
  mediumRisk: loads.filter((l) => l.riskCategory === "medium").length,
  highRisk: loads.filter((l) => l.riskCategory === "high").length,
  majorDelay: loads.filter((l) => l.riskCategory === "majorDelay").length,
  escalateToDispatch: escalationItems.length,
  openAlerts: alerts.filter((a) => a.status === "OPEN").length,
};

export const kpiDeltas = {
  activeLoads: "+2",
  onTime: "+1",
  mediumRisk: "+1",
  highRisk: "+2",
  majorDelay: "+1",
  escalateToDispatch: "+1",
  openAlerts: "+3",
};

export const criticalStops: CriticalStop[] = [
  { time: "7:15 PM", loadNum: "#LD-1066", truckNum: "T-8834", stopType: "DELIVERY", location: "Indianapolis, IN", eta: "7:15 PM", status: "On track", risk: "LOW" },
  { time: "7:25 PM", loadNum: "#LD-1500", truckNum: "T-1278", stopType: "PICKUP", location: "Louisville, KY", eta: "7:25 PM", status: "On track", risk: "LOW" },
  { time: "7:30 PM", loadNum: "#LD-3104", truckNum: "T-1042", stopType: "DELIVERY", location: "Indianapolis, IN", eta: "7:30 PM", status: "On track", risk: "LOW" },
  { time: "7:35 PM", loadNum: "#LD-2166", truckNum: "T-1834", stopType: "PICKUP", location: "Evansville, IN", eta: "7:35 PM", status: "On track", risk: "LOW" },
  { time: "7:50 PM", loadNum: "#LD-1944", truckNum: "T-1612", stopType: "DELIVERY", location: "Chattanooga, TN", eta: "7:50 PM", status: "On track", risk: "LOW" },
  { time: "8:00 PM", loadNum: "#LD-1177", truckNum: "T-9945", stopType: "PICKUP", location: "Dalton, GA", eta: "8:50 PM", status: "Delayed", risk: "HIGH", flagged: true },
];

export const gpsHealth = {
  fresh: loads.filter((l) => l.gpsStatus === "OK" && l.lastGpsMinutesAgo <= 10).length,
  stale: loads.filter((l) => l.gpsStatus === "STALE").length,
  offline: loads.filter((l) => l.gpsStatus === "OFFLINE").length,
  unknown: loads.filter((l) => l.truckStatus === "UNKNOWN").length,
};

export const gpsStaleList: GpsHealthItem[] = loads
  .filter((l) => l.gpsStatus !== "OK" || l.lastGpsMinutesAgo > 15)
  .sort((a, b) => b.lastGpsMinutesAgo - a.lastGpsMinutesAgo)
  .slice(0, 8)
  .map((l) => ({
    truckNum: l.truckNum,
    loadNum: l.loadNum,
    loadId: l.id,
    driver: l.driver,
    driverPhone: l.driverPhone,
    minutesAgo: l.lastGpsMinutesAgo,
    status: l.gpsStatus,
  }));

export const aiActions: AiAction[] = [
  { id: "ai1", time: "7:44 PM", text: "Flagged Truck #T-2291 as GPS Offline" },
  { id: "ai2", time: "7:40 PM", text: "Changed Load #LD-2231 risk level from MEDIUM to HIGH" },
  { id: "ai3", time: "7:35 PM", text: "Updated ETA for Load #LD-8844" },
  { id: "ai4", time: "7:28 PM", text: "Recommended driver call for Load #LD-1177" },
  { id: "ai5", time: "7:20 PM", text: "Created alert for delayed pickup — #LD-1177" },
  { id: "ai6", time: "7:12 PM", text: "Updated ETA for Load #LD-9842" },
  { id: "ai7", time: "7:05 PM", text: "Archived completed load #LD-0891" },
  { id: "ai8", time: "6:58 PM", text: "Flagged Load #LD-6612 — missing driver phone" },
];

export const callLogs: CallLog[] = [
  { id: "c1", time: "7:35 PM", loadNum: "#LD-2231", truckNum: "T-2291", driver: "Robert Martinez", reason: "GPS offline + delay", status: "NO ANSWER", outcome: "No answer", summary: "Attempted call — no answer after 3 rings.", driverSaid: "" },
  { id: "c2", time: "7:20 PM", loadNum: "#LD-1177", truckNum: "T-9945", driver: "Brian Foster", reason: "Stationary truck", status: "ANSWERED", outcome: "Status confirmed", summary: "Driver reports mechanical issue. ETA +55 min.", driverSaid: "Yeah I'm pulled over on the shoulder. Got a check engine light — waiting on roadside assist. Probably be moving in about an hour, maybe more." },
  { id: "c3", time: "7:08 PM", loadNum: "#LD-8844", truckNum: "T-6612", driver: "Kevin O'Brien", reason: "ETA delay", status: "VOICEMAIL", outcome: "Voicemail left", summary: "Left voicemail requesting ETA update.", driverSaid: "" },
  { id: "c4", time: "6:55 PM", loadNum: "#LD-4418", truckNum: "T-3318", driver: "James Wilson", reason: "Stale GPS", status: "ANSWERED", outcome: "Moving confirmed", summary: "Driver confirmed moving. Traffic on I-44.", driverSaid: "I'm moving, just slow traffic near Tulsa. Should be in St. Louis around 10. GPS might be lagging." },
  { id: "c5", time: "6:40 PM", loadNum: "#LD-9842", truckNum: "T-1487", driver: "Michael Johnson", reason: "Routine check", status: "COMPLETED", outcome: "On schedule", summary: "Driver confirmed on time. No issues.", driverSaid: "All good here. On I-70 heading to Columbus. Should hit my stop right on time." },
];

export function getLoadById(id: string) {
  return loads.find((l) => l.id === id);
}

export function getCallLogsForLoad(loadNum: string) {
  return callLogs.filter((c) => c.loadNum === loadNum);
}

export function getLoadByTruck(truckNum: string) {
  return loads.find((l) => l.truckNum === truckNum);
}

export const LOAD_STATUSES: LoadStatus[] = ["To be loaded", "Loaded", "Delivered", "Cancelled", "Empty"];
export const STOP_STATUSES: StopStatus[] = ["Pending", "At Stop", "Completed Confirmed", "Cancelled"];
