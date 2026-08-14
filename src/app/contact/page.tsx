import type { Metadata } from "next";
import { ContactBenefits } from "@/components/contact/ContactForm";
import { CalEmbed } from "@/components/contact/CalEmbed";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Contact — Zonik AI",
  description:
    "Book a 30-minute demo and see how Zonik AI monitors loads 24/7, calls drivers with AI, and alerts your team only when action is needed.",
};

export default function ContactPage() {
  return (
    <>
      <SectionShell
        variant="accent"
        className="relative overflow-hidden pb-10 pt-8 md:pb-16 md:pt-12"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="mx-auto max-w-3xl text-center">
              <span className="section-label">
                <BrandMark size={16} className="h-4 w-4" />
                Book a demo
              </span>
              <h1 className="mt-5 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[2rem] lg:text-[2.35rem]">
                See Zonik run your after-hours tracking.{" "}
                <span className="headline-accent">Pick a 30-minute slot.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
                Live walkthrough of the dashboard, GPS feed, and AI driver calls.
                Your team only steps in when a load actually needs attention.
              </p>

              <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-3 border-t border-border/80 pt-6">
                {[
                  { value: "30 min", label: "Live demo" },
                  { value: "24/7", label: "Monitoring preview" },
                  { value: "Instant", label: "Book a time" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-sm font-bold text-secondary-dark">{item.value}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.08}>
            <div
              id="demo-form"
              className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_70px_rgba(0,0,0,0.08)]"
            >
              <CalEmbed />
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              Prefer email?{" "}
              <a href="mailto:hello@zonikai.com" className="font-medium text-secondary-dark hover:underline">
                hello@zonikai.com
              </a>
            </p>
          </AnimateOnScroll>
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
