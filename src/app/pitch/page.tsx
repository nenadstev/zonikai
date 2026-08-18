import type { Metadata } from "next";
import { PitchDeck } from "@/components/pitch/PitchDeck";

export const metadata: Metadata = {
  title: "Pitch — Zonik AI",
  description: "Zonik AI demo walkthrough.",
  robots: { index: false, follow: false },
};

export default function PitchPage() {
  return <PitchDeck />;
}
