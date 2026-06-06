import { TrendingDown, PhoneCall, Zap, Eye, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { HoverCard } from "@/components/ui/HoverCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const benefits = [
  {
    icon: Users,
    title: "One operator, full after-hours coverage",
    description: "Replace a 10-person overnight team with one skilled dispatcher backed by Zonik AI.",
    featured: true,
    wide: true,
  },
  {
    icon: PhoneCall,
    title: "No more check calls",
    description: "AI voice agents call drivers and update the dashboard — your team skips the 2 AM phone tag.",
    featured: false,
    wide: false,
  },
  {
    icon: Zap,
    title: "Catch delays earlier",
    description: "Get alerted when a load starts slipping — not after the delivery window has passed.",
    featured: false,
    wide: false,
  },
  {
    icon: Eye,
    title: "Full after-hours visibility",
    description: "Maintain GPS and load oversight during nights, weekends, and holidays.",
    featured: false,
    wide: false,
  },
  {
    icon: TrendingDown,
    title: "Less repetitive work",
    description: "Stop manually checking loads that are running fine. Focus only on exceptions.",
    featured: false,
    wide: false,
  },
];

export function Benefits() {
  return (
    <SectionShell variant="white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="Benefits"
            title="Your team handles exceptions."
            titleAccent="Zonik handles everything else."
            punchline="Less noise. Faster reactions. Smaller overnight team."
          />
        </AnimateOnScroll>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <AnimateOnScroll
              key={benefit.title}
              delay={i * 0.06}
              className={benefit.wide ? "sm:col-span-2 lg:col-span-3" : ""}
            >
              <HoverCard
                spotlight={benefit.featured}
                accent="left"
                className={`h-full ${benefit.wide ? "lg:flex lg:items-center lg:gap-8 lg:!p-8" : ""}`}
              >
                <div className={`icon-chip h-10 w-10 group-hover:scale-110 ${benefit.wide ? "lg:h-14 lg:w-14" : "mb-4"}`}>
                  <benefit.icon className={benefit.wide ? "h-6 w-6" : "h-4 w-4"} />
                </div>
                <div>
                  <h3 className={`font-bold tracking-[-0.01em] ${benefit.wide ? "text-xl" : "text-[15px]"}`}>
                    {benefit.title}
                  </h3>
                  <p className={`mt-2 leading-relaxed text-muted ${benefit.wide ? "text-base" : "text-sm"}`}>
                    {benefit.description}
                  </p>
                </div>
              </HoverCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
