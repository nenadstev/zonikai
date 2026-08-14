import { Clock, Flame, Route } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const problems = [
  {
    icon: Flame,
    hook: "They wait until a truck is late.",
    versus: "Then the phones start.",
    description:
      "A pickup or delivery window is already gone. Now the night team is calling drivers and catching up.",
  },
  {
    icon: Clock,
    hook: "They check one truck at a time.",
    versus: "The late one is easy to miss.",
    description:
      "Open the ELD. Check this load. Then the next. By the time they see a delay, it's too late to fix.",
  },
  {
    icon: Route,
    hook: "The whole night goes to problems.",
    versus: "Nobody plans the next loads.",
    description:
      "They stay on what already broke. They don't have time to set up tomorrow's tours or make money for the company.",
  },
];

export function Problem() {
  return (
    <SectionShell variant="white" bordered>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="The problem"
            title="At night, the team waits for problems."
            titleAccent="They don't stop them early."
            punchline="Tracking is slow. They find out late. The whole shift goes to fixing what already went wrong."
          />
        </AnimateOnScroll>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {problems.map((problem, i) => (
            <AnimateOnScroll key={problem.hook} delay={i * 0.08}>
              <div className="flex h-full flex-col bg-white p-7 md:p-8">
                <problem.icon className="h-8 w-8 text-secondary" strokeWidth={1.75} />
                <p className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-foreground md:text-[1.65rem] md:leading-tight">
                  {problem.hook}
                </p>
                <p className="mt-2 text-sm font-medium text-secondary-dark">{problem.versus}</p>
                <p className="mt-6 text-sm leading-relaxed text-muted">{problem.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
