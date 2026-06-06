import {
  Link2,
  Eye,
  PhoneCall,
  Bell,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect your load and GPS data",
    description:
      "Zonik AI pulls active loads and live GPS data from your TMS and ELD providers.",
  },
  {
    number: "02",
    icon: Eye,
    title: "Monitor every load automatically",
    description:
      "The system checks truck location, ETA, stop statuses, and delays — continuously, 24/7.",
  },
  {
    number: "03",
    icon: PhoneCall,
    title: "AI Voice Agent calls when needed",
    description:
      "When a load is at risk, voice agents reach the driver, confirm status, and update the dashboard.",
  },
  {
    number: "04",
    icon: Bell,
    title: "Alert your team only when needed",
    description:
      "Your team gets a clear view of exceptions — and knows exactly which load requires action.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="How it works"
            title="Four steps. Zero manual monitoring."
          />
        </AnimateOnScroll>

        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="icon-chip h-10 w-10">
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs text-secondary-dark">{step.number}</span>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
