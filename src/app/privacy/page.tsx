import type { Metadata } from "next";
import { PrivacyPageContent } from "@/components/legal/PrivacyPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy — Zonik AI",
  description:
    "How Zonik AI collects, uses, and protects personal data on zonikai.com, in line with the GDPR.",
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
