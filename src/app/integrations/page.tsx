import type { Metadata } from "next";
import { IntegrationsPageContent } from "@/components/integrations/IntegrationsPageContent";

export const metadata: Metadata = {
  title: "Integrations — Zonik AI",
  description:
    "Zonik connects your ELD, TMS, project tools, and chat. Live GPS and load data in one place.",
};

export default function IntegrationsPage() {
  return <IntegrationsPageContent />;
}
