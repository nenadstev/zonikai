import { Plug } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { IntegrationLogo } from "@/components/ui/IntegrationLogo";

const eldIntegrations = [
  { name: "Samsara", logo: "/integrations/samsara.svg" },
  { name: "Geotab", logo: "/integrations/geotab.svg" },
  { name: "Motive", logo: "/integrations/motive.svg" },
  { name: "Omnitracs", logo: "/integrations/omnitracs.svg" },
  { name: "Platform Science", logo: "/integrations/platform-science.svg" },
  { name: "Trimble", logo: "/integrations/trimble.svg" },
  { name: "Verizon Connect", logo: "/integrations/verizon-connect.svg" },
];

const secondaryIntegrations = [
  "TMS systems",
  "Slack & Teams",
  "Email & SMS alerts",
  "Webhooks & API",
];

export function Integrations() {
  return (
    <section id="integrations" className="border-t border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeader
            label="ELD Integrations"
            title="Connect your ELD. Zonik handles the rest."
            subtitle="Plug into the GPS and telematics platforms you already use. Live location, speed, and vehicle data flow straight into Zonik AI."
          />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-b from-accent-soft/80 to-white p-6 md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="icon-chip h-10 w-10">
                <Plug className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary-dark">
                  ELD &amp; GPS Providers
                </p>
                <p className="text-xs text-muted">
                  Primary integrations — live GPS feed into Zonik AI
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {eldIntegrations.map((item, i) => (
                <div
                  key={item.name}
                  className="group flex h-24 flex-col items-center justify-center rounded-xl border border-border bg-white px-4 py-5 transition-all hover:border-secondary/30 hover:shadow-sm"
                >
                  <IntegrationLogo
                    name={item.name}
                    src={item.logo}
                    className="h-7 opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <span className="mt-3 text-[11px] font-medium text-muted group-hover:text-secondary-dark">
                    {item.name}
                  </span>
                </div>
              ))}

              <div className="flex h-24 flex-col items-center justify-center rounded-xl border border-dashed border-secondary/25 bg-accent-soft/40 px-4">
                <span className="text-2xl font-light text-secondary">+</span>
                <span className="mt-1 text-[11px] font-medium text-secondary-dark">
                  More ELD providers
                </span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <div className="mt-6 rounded-xl border border-border bg-surface/40 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Also connects with
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {secondaryIntegrations.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
