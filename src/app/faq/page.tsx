import type { Metadata } from "next";
import { FaqPageContent } from "@/components/faq/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQ — Zonik AI",
  description:
    "Simple answers about Zonik: 24/7 tracking, live ETA, AI driver calls, and after-hours dispatch.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
