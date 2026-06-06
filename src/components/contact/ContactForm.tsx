"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const benefits = [
  "24/7 GPS load monitoring",
  "AI voice agents for driver calls",
  "Clear risk alerts",
  "Less manual tracking work",
];

const loadOptions = [
  "Under 100",
  "100 – 500",
  "500 – 1,000",
  "1,000 – 5,000",
  "5,000+",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-12 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="mt-4 text-xl font-semibold text-foreground">
          Thank you for reaching out!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          We&apos;ve received your request and will be in touch shortly to
          schedule your demo.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-foreground">
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Work Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="loadsPerMonth" className="block text-sm font-medium text-foreground">
            Number of Loads per Month
          </label>
          <select
            id="loadsPerMonth"
            name="loadsPerMonth"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
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
            className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            placeholder="Tell us about your tracking operations..."
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        Book a Demo
      </Button>
    </form>
  );
}

export function ContactBenefits() {
  return (
    <AnimateOnScroll direction="left">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
          See Zonik AI in action
        </h2>
        <p className="mt-4 text-muted leading-relaxed">
          Tell us a little about your tracking operations and we&apos;ll show
          you how Zonik AI can fit into your workflow.
        </p>

        <ul className="mt-8 space-y-4">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-bg">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AnimateOnScroll>
  );
}
