import type { Metadata } from "next";
import { ContactForm, ContactBenefits } from "@/components/contact/ContactForm";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Contact — Zonik AI",
  description:
    "Book a demo and see how Zonik AI monitors loads 24/7, calls drivers with AI, and alerts your team only when action is needed.",
};

export default function ContactPage() {
  return (
    <>
      <SectionShell
        variant="accent"
        className="relative overflow-hidden pb-14 pt-8 md:pb-20 md:pt-12"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            {/* Form first — primary focus on load */}
            <AnimateOnScroll>
              <ContactForm prominent />
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1} direction="right">
              <div className="lg:pt-4">
                <span className="section-label">
                  <BrandMark size={16} className="h-4 w-4" />
                  Book a demo
                </span>
                <h1 className="mt-5 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[2rem] lg:text-[2.25rem]">
                  See Zonik run your after-hours tracking.{" "}
                  <span className="headline-accent">Your team only steps in when it matters.</span>
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Fill out the form and we&apos;ll schedule a live walkthrough — dashboard,
                  automations, and how one operator can cover an overnight team.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border/80 pt-8">
                  {[
                    { value: "30 min", label: "Live demo" },
                    { value: "24/7", label: "Monitoring preview" },
                    { value: "1 day", label: "Response time" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-sm font-bold text-secondary-dark">{item.value}</p>
                      <p className="mt-0.5 text-[11px] font-medium text-muted">{item.label}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 hidden text-sm leading-relaxed text-muted lg:block">
                  No sales pitch — just a freight-native look at how Zonik monitors loads,
                  calls drivers with AI, and alerts your team only on exceptions.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </SectionShell>

      <SectionShell variant="muted" bordered>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ContactBenefits />
        </div>
      </SectionShell>
    </>
  );
}
