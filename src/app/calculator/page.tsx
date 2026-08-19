import type { Metadata } from "next";
import { CalculatorPage } from "@/components/calculator/CalculatorPage";

export const metadata: Metadata = {
  title: "Zonik Impact Calculator - Zonik AI",
  description:
    "Type your team and loads. See the hours spent chasing trucks, and what Zonik can give back.",
};

export default function ImpactCalculatorPage() {
  return <CalculatorPage />;
}
