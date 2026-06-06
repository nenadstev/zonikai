"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Clock, ClipboardList, MapPin, PhoneCall, Radio } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HoverCard } from "@/components/ui/HoverCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: MapPin,
    title: "24/7 GPS monitoring",
    description: "Every active load tracked — location, ETA, and stop status without manual refresh.",
  },
  {
    icon: PhoneCall,
    title: "AI voice agents",
    description: "Drivers get called automatically when something looks off. No overnight check calls.",
  },
  {
    icon: Radio,
    title: "Exception-only alerts",
    description: "Your after-hours team hears from Zonik only when a load actually needs attention.",
  },
  {
    icon: Clock,
    title: "One operator, full coverage",
    description: "Replace repetitive tracking work with a dashboard that tells you what happened overnight.",
    featured: true,
  },
];

const loadOptions = [
  "Under 100",
  "100 – 500",
  "500 – 1,000",
  "1,000 – 5,000",
  "5,000+",
];

const MAKE_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL ??
  "https://hook.eu2.make.com/6x37yj57geky92rr4nza1u9g50lystcp";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/20";

export function ContactForm({ prominent = false }: { prominent?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      fullName: String(data.get("fullName") ?? ""),
      companyName: String(data.get("companyName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      loadsPerMonth: String(data.get("loadsPerMonth") ?? ""),
      message: String(data.get("message") ?? ""),
      source: "zonikai-contact",
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Something went wrong sending your request. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        id="demo-form"
        className={cn(
          "card-clean feature-spotlight flex flex-col items-center justify-center p-10 text-center sm:p-12",
          prominent && "shadow-[0_24px_70px_rgba(99,102,241,0.18)] ring-2 ring-secondary/25"
        )}
      >
        <div className="icon-chip h-14 w-14">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </div>
        <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-foreground">
          You&apos;re on the list.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          We&apos;ve received your request and will reach out shortly to schedule your
          personalized demo of the Zonik after-hours tracking dashboard.
        </p>
        <Button href="/" variant="secondary" size="md" className="mt-8">
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <div className="relative" id="demo-form">
      {prominent && (
        <div className="mb-3 flex items-center justify-center gap-2 lg:justify-start">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-secondary/30">
            <ClipboardList className="h-3.5 w-3.5" />
            Start here
          </span>
          <span className="text-xs font-medium text-muted">Fill out the form to book your demo</span>
        </div>
      )}

      <div
        className={cn(
          "card-clean overflow-hidden bg-white",
          prominent
            ? "shadow-[0_24px_70px_rgba(0,0,0,0.12)] ring-2 ring-secondary/30"
            : "shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
        )}
      >
        <div className="border-b border-white/10 bg-primary px-6 py-5 sm:px-8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <ClipboardList className="h-5 w-5 text-[#a5b4fc]" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#a5b4fc]">
                Demo request form
              </p>
              <h2 className="mt-0.5 text-lg font-bold tracking-[-0.02em] text-white">
                Book your Zonik AI demo
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Complete the fields below — we&apos;ll reach out to schedule your walkthrough.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <p className="mx-6 mb-0 rounded-xl border border-danger/20 bg-danger-bg px-4 py-3 text-sm text-danger sm:mx-8">
            {error}
          </p>
        )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
              Full Name
            </label>
            <input id="fullName" name="fullName" type="text" required className={inputClass} />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
              Company Name
            </label>
            <input id="companyName" name="companyName" type="text" required className={inputClass} />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Work Email
            </label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground">
              Phone Number
            </label>
            <input id="phone" name="phone" type="tel" className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="loadsPerMonth" className="block text-sm font-medium text-foreground">
              Number of Loads per Month
            </label>
            <select id="loadsPerMonth" name="loadsPerMonth" required className={inputClass}>
              <option value="">Select range</option>
              {loadOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="TMS, ELD provider, team size, biggest after-hours pain point..."
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="mt-6 w-full"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Book a Demo"}
        </Button>

        <p className="mt-4 text-center text-[11px] text-muted">
          No spam. Freight operations only — we respond within one business day.
        </p>
      </form>
      </div>
    </div>
  );
}

export function ContactBenefits() {
  return (
    <AnimateOnScroll direction="left">
      <div>
        <span className="section-label mb-4 inline-flex">What you&apos;ll see</span>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          A dashboard that monitors for you.{" "}
          <span className="headline-accent">Alerts only when it&apos;s urgent.</span>
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
          In the demo we show the full loop — GPS feed, risk detection, AI driver calls,
          and the exact moment your after-hours team gets pulled in.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <HoverCard
              key={benefit.title}
              spotlight={benefit.featured}
              accent="left"
              className={benefit.featured ? "sm:col-span-2" : ""}
            >
              <div className="flex gap-3">
                <div className="icon-chip h-9 w-9 shrink-0 group-hover:scale-110">
                  <benefit.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-[-0.01em]">{benefit.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{benefit.description}</p>
                </div>
              </div>
            </HoverCard>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
