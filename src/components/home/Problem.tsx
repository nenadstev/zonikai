import { Phone, PhoneOff, Moon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TruckIllustration } from "@/components/ui/TruckIllustration";

const problems = [
  {
    icon: PhoneOff,
    title: "Too many manual check calls",
    description:
      "Tracking teams spend hours calling drivers for loads that are running fine — with no real issues to resolve.",
  },
  {
    icon: Phone,
    title: "Delays noticed too late",
    description:
      "By the time a delay is spotted, pickup or delivery windows are already at risk. Reactive tracking costs trust.",
  },
  {
    icon: Moon,
    title: "No clear overview during nights and weekends",
    description:
      "After hours, visibility drops. Loads move without oversight, and problems escalate before anyone knows.",
  },
];

export function Problem() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="The problem"
            title="Stop manually checking every load after hours."
          />
        </AnimateOnScroll>

        <p className="mx-auto mb-12 max-w-2xl text-center text-base text-muted">
          Tracking teams often spend hours verifying loads with no issues, while
          real risks slip through — especially when coverage is thinnest.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((problem, i) => (
            <AnimateOnScroll key={problem.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-sm">
                <div className="mb-4 icon-chip h-10 w-10">
                  <problem.icon className="h-4 w-4" />
                </div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {problem.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-12 flex items-center justify-center gap-4 opacity-40">
            <TruckIllustration variant="semi" className="max-w-[140px]" />
            <TruckIllustration variant="semi" className="max-w-[140px] scale-90" />
            <TruckIllustration variant="semi" className="max-w-[140px] hidden sm:block" />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
