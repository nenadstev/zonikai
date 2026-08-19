import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact — Zonik AI",
  description:
    "Book a 30-minute demo and see how Zonik AI monitors loads 24/7, calls drivers with AI, and alerts your team only when action is needed.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
