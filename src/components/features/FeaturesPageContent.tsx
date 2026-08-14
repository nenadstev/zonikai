import {
  MapPin,
  PhoneCall,
  Moon,
  ShieldCheck,
  Languages,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/Logo";

const features = [
  {
    icon: MapPin,
    title: "GPS tracking 24/7",
    text: "Zonik watches where every truck is. Speed. Route. Stop ETA. If GPS goes dark, you know right away.",
  },
  {
    icon: PhoneCall,
    title: "Voice agents call drivers",
    text: "When a load looks wrong, the AI calls the driver. It asks what happened and puts the answer on your board.",
  },
  {
    icon: Languages,
    title: "Calls in many languages",
    text: "Drivers hear a clear call in a language they understand. Less confusion. Better answers.",
  },
  {
    icon: Moon,
    title: "Always on",
    text: "Zonik does not sleep. Day, night, weekends, holidays. Your fleet stays watched.",
  },
  {
    icon: ShieldCheck,
    title: "Fewer mistakes",
    text: "Missed updates and late finds go down. Your team works from facts, not guesswork.",
  },
  {
    icon: Users,
    title: "Happier customers",
    text: "You know if a truck will make the next stop. You can update the load and tell the customer sooner.",
  },
];

export function FeaturesPageContent() {
  return (
    <>
      <SectionShell variant="accent" className="!pb-12 !pt-16 md:!pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <span className="section-label mb-4 inline-flex">
              <BrandMark size={16} className="h-4 w-4" />
              Features
            </span>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.12]">
              What Zonik does for your fleet
              <br />
              <span className="headline-accent">every hour of the day.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              GPS. Driver calls. A clear board. So your team always knows where
              every truck stands.
            </p>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <AnimateOnScroll key={feature.title} delay={i * 0.05}>
                <div className="border-t border-border pt-6">
                  <div className="icon-chip h-10 w-10">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell variant="muted" bordered>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeader
              label="The value"
              title="Less noise. Clear status."
              titleAccent="Better days for your team."
              punchline="Zonik does not replace your people. It cuts busy work so they can fix real problems and keep customers happy."
            />
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" variant="accent" size="lg">
                Book a Demo
              </Button>
              <Button href="/calculator" variant="secondary" size="lg">
                Cost Calculator
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </SectionShell>
    </>
  );
}
