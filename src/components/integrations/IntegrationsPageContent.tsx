import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/home/FinalCTA";
import { IntegrationsHub } from "@/components/integrations/IntegrationsHub";

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
              Zonik sits in the middle.
              <br />
              <span className="headline-accent">Your tools plug in.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              ELD. TMS. Project tools. Chat. One connection. Live data into Zonik.
            </p>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <IntegrationsHub />
          </AnimateOnScroll>
          <p className="mt-10 text-center text-sm text-muted">
            Don&apos;t see your tool? Ask. We add what your fleet already uses.
          </p>
          <div className="mt-6 text-center">
            <Button href="/contact" variant="secondary" size="lg">
              Ask about your stack
            </Button>
          </div>
        </div>
      </SectionShell>

      <FinalCTA />
    </>
  );
}
