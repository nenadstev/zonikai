import {
  MapPin,
  Clock,
  AlertCircle,
  PackageCheck,
  WifiOff,
  Shield,
  Bell,
  History,
  PhoneCall,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { HoverCard } from "@/components/ui/HoverCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const features = [
  {
    icon: MapPin,
    title: "Live GPS Tracking",
    description: "Continuous location monitoring for every active truck on the road.",
    featured: true,
  },
  {
    icon: PhoneCall,
    title: "AI Voice Agents",
    description: "Automatic driver calls that confirm status and update your dashboard.",
    featured: true,
  },
  {
    icon: Clock,
    title: "ETA Monitoring",
    description: "Real-time ETA compared against scheduled pickup and delivery windows.",
  },
  {
    icon: AlertCircle,
    title: "Delay Detection",
    description: "Automatic identification of loads falling behind schedule.",
  },
  {
    icon: PackageCheck,
    title: "Pickup & Delivery Validation",
    description: "Confirms stop statuses and flags missed or late appointments.",
  },
  {
    icon: WifiOff,
    title: "GPS Offline Alerts",
    description: "Instant notification when GPS signal is lost or unavailable.",
  },
  {
    icon: Shield,
    title: "Risk Level Detection",
    description: "Smart risk scoring so your team knows what to prioritize first.",
  },
  {
    icon: Bell,
    title: "After-Hours Alerts",
    description: "Proactive notifications during nights, weekends, and holidays.",
  },
  {
    icon: History,
    title: "Load History",
    description: "Full audit trail of GPS events, voice calls, alerts, and status changes.",
  },
];

export function Monitoring() {
  return (
    <SectionShell variant="white" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="Capabilities"
            title="Zonik watches everything."
            titleAccent="You act on exceptions only."
            punchline="GPS, ETAs, voice calls, delays, and risk scores — all automated, all the time."
          />
        </AnimateOnScroll>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimateOnScroll key={feature.title} delay={i * 0.04}>
              <HoverCard
                spotlight={feature.featured}
                accent={feature.featured ? "left" : "top"}
                className={`h-full !p-5 ${feature.featured ? "lg:row-span-1" : ""}`}
              >
                <div className="icon-chip mb-3 h-9 w-9 group-hover:scale-110">
                  <feature.icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.description}</p>
              </HoverCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
