import type { Metadata } from "next";
import { FaqPageContent } from "@/components/faq/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQ — Zonik AI",
  description:
    "Common questions about Zonik AI after-hours tracking for trucking fleets.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
