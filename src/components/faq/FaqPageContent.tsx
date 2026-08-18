"use client";

import {
  BarChart3,
  Moon,
  PhoneCall,
  Plug,
  MapPin,
  Truck,
} from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { BrandMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

type Faq = { question: string; answer: string };

const groups: {
  title: string;
  hint: string;
  icon: typeof Truck;
  items: Faq[];
}[] = [
  {
    title: "The product",
    hint: "What Zonik is",
    icon: Truck,
    items: [
      {
        question: "What is Zonik?",
        answer:
          "Zonik watches your trucks 24/7. You see the next stop and the live ETA. If a truck is late, Zonik calls the driver. Your team only steps in when it counts.",
      },
      {
        question: "Who is it for?",
        answer:
          "Trucking companies. Dispatch and after-hours teams that need to know what is going on with every load.",
      },
      {
        question: "Does it replace my dispatchers?",
        answer:
          "No. Zonik does the watching and the calling. Your people still decide what to do.",
      },
      {
        question: "Is it only for nights?",
        answer:
          "No. It runs all day. Night teams feel it most, because that is when catching a late truck is hardest.",
      },
    ],
  },
  {
    title: "Tracking",
    hint: "GPS and ETA",
    icon: MapPin,
    items: [
      {
        question: "Is this just a map pin?",
        answer:
          "No. You see where the truck is and how long to the next pickup or delivery.",
      },
      {
        question: "What is paper time vs live ETA?",
        answer:
          "Paper time is when the load should arrive. Live ETA is when it will arrive, from GPS. If they don't match, the team can act before the window is gone.",
      },
      {
        question: "How does it catch delays?",
        answer:
          "It compares GPS to the stop times. When a truck starts falling behind, it gets flagged.",
      },
      {
        question: "What if GPS goes dark?",
        answer:
          "Zonik flags the truck right away. If it stays dark, it calls the driver.",
      },
      {
        question: "Can I see the whole load, not just one stop?",
        answer:
          "Yes. Truck, load, and every stop. One picture. No guessing.",
      },
    ],
  },
  {
    title: "Driver calls",
    hint: "Who gets a call",
    icon: PhoneCall,
    items: [
      {
        question: "When does Zonik call a driver?",
        answer:
          "When a truck is late, or looks like it will miss the next stop.",
      },
      {
        question: "Who does it call?",
        answer:
          "Only drivers your company added. We do not pick numbers from the internet.",
      },
      {
        question: "What do the calls sound like?",
        answer:
          "Short and clear. Zonik asks where they are and if they will make the stop. The answer goes on your board.",
      },
      {
        question: "Can it call in other languages?",
        answer:
          "Yes. Drivers hear a language they understand. You get a clearer answer.",
      },
      {
        question: "Does my team hear every call?",
        answer:
          "No. They see the status. They only jump in if the load still needs a human.",
      },
    ],
  },
  {
    title: "Night team",
    hint: "After hours",
    icon: Moon,
    items: [
      {
        question: "How does this help after hours?",
        answer:
          "Zonik does the busy work. The night team spends time on loads that need them, not on hunting every truck.",
      },
      {
        question: "Can one person cover the night?",
        answer:
          "Yes. Zonik watches and calls. One dispatcher handles the few loads that need a person.",
      },
      {
        question: "What about shift handoff?",
        answer:
          "Zonik hands off every truck. The next shift starts with the same facts. Less “I thought you knew.”",
      },
      {
        question: "Can the night team do more than put out fires?",
        answer:
          "Yes. When status is already done, they can set up tomorrow's loads instead of only chasing problems.",
      },
    ],
  },
  {
    title: "Reports",
    hint: "Who runs on time",
    icon: BarChart3,
    items: [
      {
        question: "What reports do I get?",
        answer:
          "Pay per mile. Dispatchers whose loads run the cleanest. Drivers with the fewest delays. All in one place.",
      },
    ],
  },
  {
    title: "Setup",
    hint: "Start and price",
    icon: Plug,
    items: [
      {
        question: "Do I need new hardware?",
        answer:
          "No. Zonik connects to your TMS and ELD. You don't type loads in by hand.",
      },
      {
        question: "Which ELDs and TMS work?",
        answer:
          "We connect to the tools fleets already use, like Samsara, Geotab, Motive, Omnitracs, and others. Ask us about yours.",
      },
      {
        question: "Is the GPS always right?",
        answer:
          "We use your ELD, TMS, and GPS. Those tools can be late or wrong. Zonik helps you see it fast. Your team still makes the call.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Each company gets its own offer. There is no public price list. Book a demo and we'll walk through what fits.",
      },
      {
        question: "How do we start?",
        answer:
          "Book a demo. We show you the board, the ETAs, and the driver calls. Then we help you connect your TMS and ELD.",
      },
      {
        question: "Where do I log in?",
        answer: "The tool is at app.zonikai.com. Use Login in the menu.",
      },
    ],
  },
];

export function FaqPageContent() {
  return (
    <>
      <SectionShell variant="accent" className="!pb-12 !pt-16 md:!pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <span className="section-label mb-4 inline-flex">
              <BrandMark size={16} className="h-4 w-4" />
              FAQ
            </span>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.12]">
              Straight answers.
            </h1>
          </AnimateOnScroll>
        </div>
      </SectionShell>

      <SectionShell variant="white" bordered className="!pt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {groups.map((group, i) => {
              const Icon = group.icon;
              return (
                <AnimateOnScroll key={group.title} delay={(i % 2) * 0.05}>
                  <section className="h-full overflow-hidden rounded-3xl border border-border bg-white">
                    <div className="flex items-center gap-3 bg-[#0b1b3a] px-6 py-5 md:px-8">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.625rem] bg-white/10 text-[#a5b4fc]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h2 className="text-lg font-semibold tracking-[-0.02em] text-white">
                          {group.title}
                        </h2>
                        <p className="text-xs text-white/55">{group.hint}</p>
                      </div>
                    </div>
                    <div className="divide-y divide-border px-6 md:px-8">
                      {group.items.map((faq) => (
                        <div key={faq.question} className="py-5">
                          <h3 className="text-[15px] font-semibold leading-snug">
                            {faq.question}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </AnimateOnScroll>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted">Still have a question?</p>
            <Button href="/contact" variant="accent" size="lg" className="mt-4">
              Book a Demo
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
