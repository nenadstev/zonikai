import type { Metadata } from "next";
import { FeaturesFullPage } from "@/components/features/FeaturesFullPage";

export const metadata: Metadata = {
  title: "Features — Zonik AI",
  description:
    "Next-stop ETA, AI driver calls, and a clean shift handoff for after-hours trucking teams.",
};

export default function FeaturesPage() {
  return <FeaturesFullPage />;
}
