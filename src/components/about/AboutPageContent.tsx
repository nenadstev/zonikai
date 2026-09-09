"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Mail, Moon, Truck } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { aboutContent as c } from "@/lib/about-content";

const problemIcons = [Flame, Moon, Mail];

function TeamPortrait({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#eeedff]">
      <Image
        src={src}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-top"
      />
    </div>
  );
}

export function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1B3A] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(78,70,252,0.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.18),transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <motion.div
            className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-[#4E46FC]/25 blur-3xl"
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e0e7ff]">
              <BrandMark size={14} className="h-3.5 w-3.5" />
              {c.hero.label}
            </span>
            <p className="mt-8 text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl md:leading-[0.95]">
              {c.hero.brand}
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
              {c.hero.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              {c.hero.sub}
            </p>
          </motion.div>

          <motion.div
            className="mt-14 flex items-center gap-3 text-[#e0e7ff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <Truck className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              From the after hours desk
            </span>
            <motion.span
              className="h-px flex-1 max-w-[8rem] bg-gradient-to-r from-[#e0e7ff]/60 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Origin */}
      <SectionShell variant="white" bordered className="!py-16 md:!py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <AnimateOnScroll>
            <span className="section-label mb-4 inline-flex">{c.origin.label}</span>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.1]">
              {c.origin.headline}
            </h2>
            <div className="mt-6 space-y-4">
              {c.origin.body.map((p) => (
                <p key={p} className="text-base leading-relaxed text-[#3f3f46] md:text-lg">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-8 border-l-2 border-secondary pl-4 text-lg font-semibold tracking-[-0.02em] text-foreground">
              {c.origin.callout}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="right">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0B1B3A] p-8 text-white md:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#4E46FC]/40 blur-3xl" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e0e7ff]">
                Night desk reality
              </p>
              <ul className="relative mt-8 space-y-5">
                {[
                  "Refresh GPS again",
                  "Call the driver",
                  "Update the ETA",
                  "Broker already calling",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 text-base font-medium"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                  >
                    <span className="font-mono text-xs text-[#a5b4fc]">0{i + 1}</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <p className="relative mt-10 text-sm font-medium text-white/70">
                Then do it for every active truck.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      {/* Problem */}
      <SectionShell variant="muted" bordered>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="max-w-3xl">
              <span className="section-label mb-4 inline-flex">{c.problem.label}</span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.1]">
                {c.problem.headline}
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {c.problem.items.map((item, i) => {
              const Icon = problemIcons[i];
              return (
                <AnimateOnScroll key={item.title} delay={i * 0.08}>
                  <div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-secondary shadow-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <p className="mt-5 font-mono text-xs font-semibold tracking-[0.16em] text-secondary">
                      0{i + 1}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#3f3f46] md:text-base">
                      {item.text}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* Opportunity */}
      <SectionShell variant="dark" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(78,70,252,0.22),transparent_55%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="max-w-3xl">
              <span className="section-label mb-4 inline-flex">{c.opportunity.label}</span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl md:leading-[1.1]">
                {c.opportunity.headline}
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {c.opportunity.points.map((point, i) => (
              <AnimateOnScroll key={point.title} delay={i * 0.1}>
                <div className="h-full border-t border-white/15 pt-6">
                  <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                    {point.text}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* What we built */}
      <SectionShell variant="white" bordered>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <AnimateOnScroll>
              <span className="section-label mb-4 inline-flex">{c.build.label}</span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.1]">
                {c.build.headline}
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.08}>
              <div className="space-y-4">
                {c.build.body.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-[#3f3f46] md:text-lg">
                    {p}
                  </p>
                ))}
                <p className="pt-2 text-xl font-semibold tracking-[-0.02em] text-secondary-dark">
                  {c.build.payoff}
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </SectionShell>

      {/* Team */}
      <SectionShell
        variant="accent"
        id="team"
        className="relative overflow-hidden !py-16 md:!py-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-secondary/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="max-w-2xl">
              <span className="section-label mb-4 inline-flex">
                <BrandMark size={16} className="h-4 w-4" />
                {c.team.label}
              </span>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl md:leading-[1.1]">
                {c.team.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#3f3f46] md:text-lg">
                {c.team.sub}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {c.team.members.map((member, i) => (
              <AnimateOnScroll key={member.name} delay={i * 0.08}>
                <article>
                  <TeamPortrait src={member.photo} name={member.name} />
                  <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary-dark">
                      {member.title}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#3f3f46]">
                      {member.bio}
                    </p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell variant="dark" className="overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(78,70,252,0.28),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <span className="section-label mb-4 inline-flex">{c.cta.label}</span>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]">
              {c.cta.headline}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80">
              {c.cta.body}
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="accent" size="lg" className="gap-2">
                {c.cta.button}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </SectionShell>
    </>
  );
}
