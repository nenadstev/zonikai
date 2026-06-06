import type { Metadata } from "next";
import { ContactForm, ContactBenefits } from "@/components/contact/ContactForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Contact — Zonik AI",
  description:
    "Book a demo and see how Zonik AI can improve your after-hours tracking operations.",
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactBenefits />

          <AnimateOnScroll delay={0.15} direction="right">
            <ContactForm />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
