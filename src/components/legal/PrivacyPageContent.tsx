"use client";

import Link from "next/link";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { privacyCopy } from "@/lib/privacy-content";

export function PrivacyPageContent() {
  const { locale, t } = useI18n();
  const copy = privacyCopy[locale];

  return (
    <>
      <SectionShell variant="accent" className="!pb-12 !pt-16 md:!pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <span className="section-label mb-4 inline-flex">
              <BrandMark size={16} className="h-4 w-4" />
              {copy.label}
            </span>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.12]">
              {copy.title}
              <br />
              <span className="headline-accent">{copy.titleAccent}</span>
            </h1>
            <p className="mt-4 text-sm text-muted">{copy.updated}</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              {copy.intro}
            </p>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="space-y-12">
            {copy.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.blocks.map((block, i) => {
                    if (block.type === "h3") {
                      return (
                        <h3
                          key={`${section.id}-h3-${i}`}
                          className="pt-2 text-base font-semibold text-foreground"
                        >
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === "ul") {
                      return (
                        <ul
                          key={`${section.id}-ul-${i}`}
                          className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted"
                        >
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={`${section.id}-p-${i}`}
                        className="text-[15px] leading-relaxed text-muted"
                      >
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </article>

          <p className="mt-16 border-t border-border pt-8 text-sm text-foreground">
            {copy.contactCta}:{" "}
            <a
              href="mailto:hello@zonikai.com"
              className="font-medium text-secondary-dark hover:underline"
            >
              hello@zonikai.com
            </a>
            {" · "}
            <Link href="/terms" className="font-medium text-secondary-dark hover:underline">
              {t.footer.terms}
            </Link>
          </p>
        </div>
      </SectionShell>
    </>
  );
}
