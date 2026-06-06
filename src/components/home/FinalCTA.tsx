import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TruckIllustration } from "@/components/ui/TruckIllustration";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white px-6 py-16 text-center md:px-12 md:py-20">
            <div className="absolute -right-8 -top-8 opacity-[0.04]">
              <TruckIllustration variant="semi" className="max-w-[280px]" />
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              Let AI monitor every load.
              <br />
              <span className="text-highlight">Your team handles what matters.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted">
              Book a demo and see how Zonik AI improves your after-hours
              tracking — with GPS monitoring and AI voice agents built in.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Book a Demo
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
