import type { Metadata } from "next";
import { FeaturesPageContent } from "@/components/features/FeaturesPageContent";

export const metadata: Metadata = {
  title: "Features — Zonik AI",
  description:
    "GPS tracking, AI driver calls, and a clear board for your trucking fleet.",
};

export default function FeaturesPage() {
  return <FeaturesPageContent />;
}
