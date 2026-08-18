import type { Metadata } from "next";
import { TermsPageContent } from "@/components/legal/TermsPageContent";

export const metadata: Metadata = {
  title: "Terms of Use — Zonik AI",
  description:
    "Terms of use for zonikai.com and the Zonik product, including custom B2B licenses from Lead Agents LLC.",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
