import { Headphones, PhoneCall, Zap, Eye, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const benefits = [
  {
    icon: Users,
    title: "One operator, full after-hours coverage",
    description:
      "Replace a 10-person overnight tracking team with one skilled operator backed by Zonik AI monitoring every load.",
  },
  {
    icon: Headphones,
    title: "Orchestrate, don't babysit",
    description:
      "Your operator handles exceptions only — Zonik runs GPS checks, voice calls, and dashboard updates automatically.",
  },
  {
    icon: PhoneCall,
    title: "Replace manual check calls",
    description:
      "AI voice agents call drivers and update the dashboard — no more 2 AM phone tag across the team.",
  },
  {
    icon: Zap,
    title: "Catch delays earlier",
    description:
      "Get alerted when a load starts slipping — not after the delivery window has passed.",
  },
  {
    icon: Eye,
    title: "Improve after-hours visibility",
    description:
      "Maintain full GPS and load oversight during nights, weekends, and holidays.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="Benefits"
            title="Your team focuses on exceptions. Zonik AI handles the rest."
          />
        </AnimateOnScroll>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <AnimateOnScroll key={benefit.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-white p-6 transition-shadow hover:border-secondary/20 hover:shadow-sm">
                <div className="mb-4 icon-chip h-9 w-9">
                  <benefit.icon className="h-4 w-4" />
                </div>
                <h3 className="text-[15px] font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
