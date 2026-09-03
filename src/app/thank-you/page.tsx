import type { Metadata } from "next";
import { ThankYouPageContent } from "@/components/contact/ThankYouPageContent";

export const metadata: Metadata = {
  title: "Thank you — Zonik AI",
  description: "Your Zonik demo is booked. Check your email for the calendar invite.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouPageContent />;
}
