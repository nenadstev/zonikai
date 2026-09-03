import type { Metadata } from "next";
import { PitchDeck2 } from "@/components/pitch/PitchDeck2";

export const metadata: Metadata = {
  title: "Pitch 2 — Zonik AI",
  description: "Zonik AI demo walkthrough.",
  robots: { index: false, follow: false },
};

export default function Pitch2Page() {
  return <PitchDeck2 />;
}
