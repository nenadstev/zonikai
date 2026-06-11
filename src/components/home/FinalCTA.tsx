import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";

export function FinalCTA() {
  return (
    <SectionShell variant="default" className="pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="section-dark relative overflow-hidden rounded-3xl px-6 py-16 text-center md:px-12 md:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.2),transparent_60%)]" />
            <div className="pointer-events-none absolute -right-8 -top-8 opacity-[0.08]">
              <BrandMark size={280} className="h-64 w-64" />
            </div>

            <div className="relative z-10">
              <span className="section-label mb-6 inline-flex">Ready to start?</span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]">
                Let AI watch every load tonight.
                <br />
                <span className="text-[#a5b4fc]">Your team wakes up to exceptions only.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-neutral-400">
                Book a demo and see how one operator with Zonik AI can run your entire after-hours tracking operation.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/contact" variant="accent" size="lg">
                  Book a Demo
                </Button>
                <Button href="/dashboard" variant="outlineDark" size="lg">
                  See the Dashboard
                </Button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionShell>
  );
}
