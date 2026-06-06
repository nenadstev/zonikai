import { Phone, PhoneOff, Moon, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { HoverCard } from "@/components/ui/HoverCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const problems = [
  {
    icon: PhoneOff,
    title: "Too many manual check calls",
    stat: "Hours wasted nightly",
    description:
      "Your team calls drivers on loads that are running fine — with nothing to fix.",
    accent: false,
  },
  {
    icon: Phone,
    title: "Delays noticed too late",
    stat: "Windows already missed",
    description:
      "By the time someone spots a delay, pickup or delivery is already at risk.",
    accent: true,
  },
  {
    icon: Moon,
    title: "Zero visibility after hours",
    stat: "Nights & weekends blind",
    description:
      "Loads move without oversight. Problems escalate before anyone on shift knows.",
    accent: false,
  },
];

export function Problem() {
  return (
    <SectionShell variant="white" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="The problem"
            title="Your team shouldn't spend the night"
            titleAccent="checking loads that are fine."
            punchline="Most after-hours work is repetitive noise. The real risks are what get missed."
          />
        </AnimateOnScroll>

        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((problem, i) => (
            <AnimateOnScroll key={problem.title} delay={i * 0.08}>
              <HoverCard spotlight={problem.accent} accent="left" className="h-full">
                <div className="flex items-start justify-between">
                  <div className="icon-chip h-10 w-10 group-hover:scale-110">
                    <problem.icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-danger-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-danger">
                    {problem.stat}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-[-0.01em]">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{problem.description}</p>
                <p className="mt-4 flex items-center gap-1 text-xs font-medium text-secondary-dark opacity-0 transition-opacity group-hover:opacity-100">
                  Zonik fixes this <ArrowRight className="h-3 w-3" />
                </p>
              </HoverCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
