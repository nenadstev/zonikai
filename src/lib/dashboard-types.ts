export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type TrackingStatus = "ON TIME" | "LATE" | "AT RISK" | "UNVERIFIED" | "MAJOR DELAY";
export type GpsStatus = "OK" | "STALE" | "OFFLINE";
export type TruckStatus = "MOVING" | "STATIONARY" | "UNKNOWN";
export type CallStatus = "NONE" | "STARTED" | "ANSWERED" | "NO ANSWER" | "VOICEMAIL" | "FAILED" | "COMPLETED";
export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH";
export type StopType = "PICKUP" | "DELIVERY" | "ADDITIONAL";
export type LoadStatus = "To be loaded" | "Loaded" | "Delivered" | "Cancelled" | "Empty";
export type StopStatus = "Pending" | "At Stop" | "Completed Confirmed" | "Cancelled";
export type RiskCategory = "medium" | "high" | "majorDelay" | "none";

export type LoadStop = {
  id: string;
  type: StopType;
  location: string;
  appointmentTime: string;
  eta: string;
  stopStatus: StopStatus;
};

export type Load = {
  id: string;
  loadNum: string;
  truckNum: string;
  driver: string;
  driverPhone?: string;
  dispatcher: string;
  pickup: string;
  delivery: string;
  nextStop: string;
  nearestCity: string;
  currentEta: string;
  delayMinutes: number;
  etaOffsetMinutes: number;
  trackingStatus: TrackingStatus;
  riskLevel: RiskLevel;
  riskCategory: RiskCategory;
  gpsStatus: GpsStatus;
  truckStatus: TruckStatus;
  lastGpsUpdate: string;
  lastGpsMinutesAgo: number;
  callStatus: CallStatus;
  lastCallAttempt?: string;
  problem?: string;
  mapX: number;
  mapY: number;
  remainingMiles: number;
  progress: number;
  currentStopIndex: number;
  loadStatus: LoadStatus;
  stops: LoadStop[];
  aiSummary: string;
  warning: string;
  escalatedToDispatch?: boolean;
  escalationReason?: string;
  humanInput?: { text: string; addedAt: string };
  voiceCheckIn?: boolean;
};

export type EscalationItem = {
  loadId: string;
  loadNum: string;
  truckNum: string;
  driver: string;
  loadStatus: LoadStatus;
  reason: string;
};

export type AttentionItem = {
  loadId: string;
  loadNum: string;
  truckNum: string;
  driver: string;
  problem: string;
  severity: AlertSeverity;
  location: string;
  nextStop: string;
  eta: string;
  delay: string;
  lastGps: string;
  lastCall: string;
};

export type CriticalStop = {
  time: string;
  loadNum: string;
  truckNum: string;
  stopType: StopType;
  location: string;
  eta: string;
  status: string;
  risk: RiskLevel;
  flagged?: boolean;
};

export type Alert = {
  id: string;
  time: string;
  loadNum: string;
  truckNum: string;
  problem: string;
  severity: AlertSeverity;
  status: "OPEN" | "RESOLVED";
};

export type AiAction = {
  id: string;
  time: string;
  text: string;
};

export type CallLog = {
  id: string;
  time: string;
  loadNum: string;
  truckNum: string;
  driver: string;
  reason: string;
  status: CallStatus;
  outcome: string;
  summary: string;
  driverSaid: string;
};

export type GpsHealthItem = {
  truckNum: string;
  loadNum: string;
  loadId: string;
  driver: string;
  driverPhone?: string;
  minutesAgo: number;
  status: GpsStatus;
};
