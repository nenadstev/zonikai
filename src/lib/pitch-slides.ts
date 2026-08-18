import { FEATURES } from "@/lib/features";

export const pitchSlides = {
  title: {
    eyebrow: "Load #48291",
    headline: "Know when every truck hits the next stop.",
    sub: "Follow this load from the night shift to the next stop.",
  },
  what: {
    eyebrow: "What it is",
    headline: "Zonik watches your trucks 24/7.",
    points: [
      "You see the next stop and the live ETA.",
      "If a truck is late, Zonik calls the driver.",
      "Your team only steps in when it counts.",
    ],
  },
  night: {
    eyebrow: "Tonight, without Zonik",
    headline: "The whole department is stuck on problems.",
    items: [
      {
        title: "That's the whole night.",
        text: "Find what broke. Call. Fix. Repeat. Every person is on it.",
      },
      {
        title: "They only see it after it's late.",
        text: "Then the phones start. The window is already gone.",
      },
      {
        title: "Nobody is building the next loads.",
        text: "All the hours go to what already went wrong.",
      },
    ],
  },
  after: {
    eyebrow: "Same night. With Zonik.",
    headline: "The same team can do much more.",
    items: [
      "They already have the status. Every truck. Right now.",
      "Decisions are fast. The facts are already on the board.",
      "Delays get seen early — and stopped before they land.",
    ],
  },
  how: {
    eyebrow: "How it works",
    headline: "Four things. All day.",
    steps: [
      { number: "01", title: "Connect", text: "TMS and ELD. No new hardware." },
      { number: "02", title: "Watch", text: "Every truck. GPS and time to the next stop." },
      { number: "03", title: "Call", text: "Late drivers get a voice call. You get the answer." },
      { number: "04", title: "Tell the team", text: "Only the loads that need a human." },
    ],
  },
  integrations: {
    eyebrow: "Integrations",
    headline: "Zonik sits in the middle.",
    sub: "Your tools plug in. Live data in one place.",
  },
  features: {
    eyebrow: "Features",
    headline: "What you get.",
    items: FEATURES.map((f, i) => ({
      number: f.number,
      title: f.title,
      text: [
        "Paper time next to live GPS ETA.",
        "Late drivers get a voice call. You get the answer.",
        "The night team works from facts, not hunting trucks.",
        "The same team can line up the next loads.",
        "Truck, load, and every stop on one picture.",
        "The next shift starts with the same facts.",
        "Who runs on time. Dispatchers and drivers, in one place.",
      ][i],
    })),
  },
  pricing: {
    eyebrow: "Pricing",
    headline: "Each fleet gets its own offer.",
    sub: "No public price list. We license Zonik to your company.",
    items: [
      "24/7 tracking and next-stop ETA",
      "AI calls to drivers you added",
      "Seats for dispatch and after-hours",
    ],
    note: "Numbers live on the call. Use the calculator if you want a first pass on hours and cost.",
  },
  close: {
    eyebrow: "Let's start",
    headline: "Try Zonik in your company.",
    accent: "Free 14-day trial.",
    body: "You saw it. Now put it on your trucks.",
    need: "What we need from you",
    items: [
      "ELD access through API.",
      "Driver names, phone numbers, and truck IDs.",
      "Dispatch and after-hours start using Zonik. We stay with them.",
    ],
    cta: "Start the 14-day trial",
    links: [
      {
        label: "Start the 14-day trial",
        href: "mailto:hello@zonikai.com?subject=14-day%20trial",
      },
      { label: "app.zonikai.com", href: "https://app.zonikai.com/" },
      { label: "hello@zonikai.com", href: "mailto:hello@zonikai.com" },
    ],
  },
} as const;

export const PITCH_SLIDE_COUNT = 9;
export const PITCH_NIGHT_INDEX = 2;
export const PITCH_AFTER_INDEX = 3;
export const PITCH_FEATURES_INDEX = 6;
