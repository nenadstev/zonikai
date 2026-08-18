import type { Metadata } from "next";
import { FeaturesPageContent } from "@/components/features/FeaturesPageContent";

export const metadata: Metadata = {
  title: "Features list — Zonik AI",
  description:
    "Next-stop ETA, AI driver calls, and a clean shift handoff for after-hours trucking teams.",
};

export default function FeaturesListPage() {
  return <FeaturesPageContent />;
}
