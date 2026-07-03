import type { Metadata } from "next";
import { CalculatorPage } from "@/components/calculator/CalculatorPage";

export const metadata: Metadata = {
  title: "After-Hours Cost Calculator - Zonik AI",
  description:
    "Calculate the hidden monthly cost of manual after-hours tracking and estimate the potential monthly impact with Zonik AI.",
};

export default function AfterHoursCostCalculatorPage() {
  return <CalculatorPage />;
}
