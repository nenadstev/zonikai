import { Plug } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { IntegrationLogo } from "@/components/ui/IntegrationLogo";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/Logo";

const eldIntegrations = [
  { name: "Samsara", logo: "/integrations/samsara.svg" },
  { name: "Geotab", logo: "/integrations/geotab.svg" },
  { name: "Motive", logo: "/integrations/motive.svg" },
  { name: "Omnitracs", logo: "/integrations/omnitracs.png" },
  { name: "Platform Science", logo: "/integrations/platform-science.png" },
  { name: "Trimble", logo: "/integrations/trimble.svg" },
  { name: "ELD Rider", logo: "/integrations/eld-rider.svg" },
  { name: "Verizon Connect", logo: "/integrations/verizon-connect.svg" },
];

const alsoConnects = ["TMS systems", "Slack & Teams", "Email & SMS", "Webhooks & API"];

export function IntegrationsPageContent() {
  return (
    <>
      <SectionShell variant="accent" className="!pb-12 !pt-16 md:!pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <span className="section-label mb-4 inline-flex">
              <BrandMark size={16} className="h-4 w-4" />
              Integrations
            </span>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.12]">
              Works with the ELD you already use.
              <br />
              <span className="headline-accent">Nothing to rip out.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Plug in once. Live GPS flows into Zonik. Samsara, Motive, Geotab, and more.
            </p>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="mb-8 flex items-center gap-3">
              <div className="icon-chip h-10 w-10">
                <Plug className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">ELD &amp; GPS providers</p>
                <p className="text-xs text-muted">Live location feed into Zonik</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
              {eldIntegrations.map((item) => (
                <div
                  key={item.name}
                  className="flex h-32 flex-col items-center justify-center bg-white px-5 py-6 transition-colors hover:bg-surface/80"
                >
                  <IntegrationLogo name={item.name} src={item.logo} />
                  <span className="mt-3 text-[11px] font-medium text-muted">{item.name}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <div className="mt-10 border-t border-border pt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Also connects with
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {alsoConnects.map((item) => (
                  <li key={item} className="text-sm text-foreground">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            <div className="mt-12 text-center">
              <Button href="/contact" variant="accent" size="lg">
                Ask about your stack
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </SectionShell>
    </>
  );
}
