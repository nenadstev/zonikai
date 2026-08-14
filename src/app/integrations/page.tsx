import type { Metadata } from "next";
import { IntegrationsPageContent } from "@/components/integrations/IntegrationsPageContent";

export const metadata: Metadata = {
  title: "Integrations — Zonik AI",
  description:
    "Connect Samsara, Motive, Geotab, and other ELDs. Live GPS into Zonik with no rip and replace.",
};

export default function IntegrationsPage() {
  return <IntegrationsPageContent />;
}
