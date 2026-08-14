import { Phone, PhoneOff, Moon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const problems = [
  {
    icon: PhoneOff,
    title: "Too many night check calls",
    description:
      "Your team calls drivers on loads that are fine. Hours on the phone. Nothing to fix.",
  },
  {
    icon: Phone,
    title: "Delays found too late",
    description:
      "By the time someone sees a problem, the pickup or delivery window is already gone.",
  },
  {
    icon: Moon,
    title: "No one watching overnight",
    description:
      "Trucks keep moving at night. Trouble piles up until the morning shift walks in.",
  },
];

export function Problem() {
  return (
    <SectionShell variant="white" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="The problem"
            title="Night tracking is hard work."
            titleAccent="And easy to get wrong."
            punchline="Most night work is calling drivers who are fine. The loads in real trouble slip through."
          />
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {problems.map((problem, i) => (
            <AnimateOnScroll key={problem.title} delay={i * 0.08}>
              <div className="border-t border-border pt-6">
                <div className="icon-chip h-10 w-10">
                  <problem.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{problem.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
