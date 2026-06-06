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
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const features = [
  {
    icon: MapPin,
    title: "Live GPS Tracking",
    description: "Continuous location monitoring for every active truck on the road.",
  },
  {
    icon: PhoneCall,
    title: "AI Voice Agents",
    description: "Automatic driver calls that confirm status and update your dashboard.",
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
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="Capabilities"
            title="Automated monitoring. Clear actions."
          />
        </AnimateOnScroll>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimateOnScroll key={feature.title} delay={i * 0.04}>
              <div className="group h-full rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-sm">
                <div className="mb-3 icon-chip h-9 w-9">
                  <feature.icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
