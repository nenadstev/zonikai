import { marketingEn, marketingSr } from "@/lib/i18n/marketing";

export const en = {
  nav: {
    howItWorks: "How it works",
    features: "Features",
    integrations: "Integrations",
    calculator: "Impact",
    faq: "FAQ",
    contact: "Contact",
    bookDemo: "Book a Demo",
    login: "Login",
    toggleMenu: "Toggle menu",
    language: "Language",
  },
  footer: {
    blurb:
      "Zonik watches your trucks 24/7. It calls drivers when something looks wrong. Your team sees every load on one screen.",
    product: "Product",
    company: "Company",
    rights: "All rights reserved.",
    tagline: "24/7 load tracking for trucking",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
  hero: {
    eyebrow: "24/7 tracking for trucking",
    headline: "Know when every truck hits the next stop.",
    subhead:
      "Zonik watches every truck. You see the next stop and the ETA. If a truck is late, Zonik calls the driver. Your team only steps in when it counts.",
    bookDemo: "Book a Demo",
    seeHowItWorks: "See How It Works",
    imageAlt: "Freight truck on the highway at dusk",
    stats: [
      { value: "Next-stop ETA", label: "Pickup or delivery" },
      { value: "Calls late drivers", label: "You get the answer" },
      { value: "The work is done", label: "Your team does the rest" },
    ],
    dash: {
      calling: "AI calling driver",
      callingSub: "Getting status for your team",
      breakdown: "Breakdown on I-70. New ETA 20:45.",
      nextStop: "Next stop",
      unload: "Unload",
      eta: "ETA",
      status: "Status",
      onTime: "On Time",
      atRisk: "At Risk",
      liveGps: "I-80, NE · Live GPS",
    },
  },
  problem: {
    label: "What problem Zonik solves",
    title: "At night, the team waits for problems.",
    titleAccent: "They don't stop them early.",
    punchline:
      "Tracking is slow. They find out late. The whole shift goes to fixing what already went wrong.",
    items: [
      {
        hook: "They wait until a truck is late.",
        versus: "Then the phones start.",
        description:
          "A pickup or delivery window is already gone. Now the night team is calling drivers and catching up.",
      },
      {
        hook: "They check one truck at a time.",
        versus: "The late one is easy to miss.",
        description:
          "Open the ELD. Check this load. Then the next. By the time they see a delay, it's too late to fix.",
      },
      {
        hook: "The whole night goes to problems.",
        versus: "Nobody plans the next loads.",
        description:
          "They stay on what already broke. They don't have time to set up tomorrow's tours or make money for the company.",
      },
    ],
  },
  howItWorks: {
    label: "How it works",
    title: "Zonik knows every truck and every load.",
    titleAccent: "Tracks them 24/7.",
    punchline: "Here's what it does to help your after-hours and dispatch teams.",
    step: "Step",
    aiCall: "AI call",
    steps: [
      {
        shortTitle: "Connected to your TMS and ELD",
        title: "Zonik is connected to your TMS and ELD",
        description:
          "It pulls your loads and live GPS. You don't type anything in. No new hardware.",
      },
      {
        shortTitle: "Watches every truck",
        title: "Zonik watches every truck",
        description:
          "It tracks GPS and the time to the next pickup or delivery. All day, every day. Nobody has to refresh a screen.",
      },
      {
        shortTitle: "Calls drivers who are late",
        title: "Zonik calls drivers who are late",
        description:
          "If a truck is late, Zonik calls the driver. It asks what happened. The answer goes to your team.",
      },
      {
        shortTitle: "Tells your team the status",
        title: "Zonik tells your team the status",
        description: "They only hear about trucks in trouble. The rest stays quiet.",
      },
    ],
  },
  visuals: {
    tmsSub: "Active loads",
    eldSub: "Live location",
    connectedCaption: "Connected. Loads fill in on their own.",
    everyTruck: "Every truck",
    watching: "Watching",
    onTime: "On time",
    atRisk: "At risk",
    critical: "Critical",
    zonikCalling: "Zonik calling",
    callScript: "Hi, this is Zonik. Can you confirm your status?",
    driver: "Driver",
    callInProgress: "Call in progress…",
    driverReply: "Breakdown on I-70. ETA +2 hr.",
    teamUpdated: "Your team updated · Late +2 hr",
    yourTeam: "Your team",
    trucksFine: "4 trucks fine",
    needsYou: "Needs you",
    alertDetail: "GPS off · Truck stopped · Next stop late",
    openThis: "Open this",
  },
  proof: {
    label: "What changes",
    title: "You used to depend on people to notice.",
    titleAccent: "Now the work is already done.",
    punchline:
      "Zonik tracks every truck, 24/7. It calculates the next stop. It calls late drivers. Your team focuses on what matters.",
    before: "Before",
    withZonik: "With Zonik",
    beforeTitle: "People have to notice. Then they have to count.",
    afterTitle: "It's done. Your team works on what matters.",
    flips: [
      {
        before: "Someone has to notice a truck is late.",
        after: "Zonik already saw it.",
      },
      {
        before: "Someone has to figure out the ETA.",
        after: "The next stop and the time are already there.",
      },
      {
        before: "Someone has to call the driver.",
        after: "Zonik already called. You have the answer.",
      },
    ],
    bookDemo: "Book a Demo",
    seeFeatures: "See features",
    mapAlt: "Zonik fleet map of trucks across the United States",
  },
  cta: {
    label: "Book a demo",
    title: "Let Zonik do the watching.",
    titleAccent: "Your team works on what matters.",
    body: "Zonik watches every truck. You see the next stop and the ETA. Late drivers get a call. Your team only steps in when it counts.",
    bookDemo: "Book a Demo",
  },
};

export type Locale = "en" | "sr";

export const sr: typeof en = {
  nav: {
    howItWorks: "Kako radi",
    features: "Mogućnosti",
    integrations: "Integracije",
    calculator: "Uticaj",
    faq: "FAQ",
    contact: "Kontakt",
    bookDemo: "Zakaži demo",
    login: "Uloguj se",
    toggleMenu: "Otvori meni",
    language: "Jezik",
  },
  footer: {
    blurb:
      "Zonik prati kamione 24/7. Zove vozača čim nešto nije u redu. Sav tovar je na jednom ekranu.",
    product: "Proizvod",
    company: "Firma",
    rights: "Sva prava zadržana.",
    tagline: "Praćenje kamiona 24/7",
    privacy: "Politika privatnosti",
    terms: "Uslovi korišćenja",
  },
  hero: {
    eyebrow: "Praćenje kamiona 24/7",
    headline: "Znaš kad svaki kamion stiže na sledeći stop.",
    subhead:
      "Zonik prati sve kamione. Vidiš gde ide i kad stiže. Ako kasni, Zonik sam zove vozača. Ti se javljaš samo kad moraš.",
    bookDemo: "Zakaži demo",
    seeHowItWorks: "Kako radi",
    imageAlt: "Kamion na putu u sumrak",
    stats: [
      { value: "Kad stiže na stop", label: "Utovar ili istovar" },
      { value: "Sam zove ko kasni", label: "Ti dobiješ odgovor" },
      { value: "Posao je odrađen", label: "Tim radi svoje" },
    ],
    dash: {
      calling: "AI zove vozača",
      callingSub: "Traži status za tim",
      breakdown: "Kvar na I-70. Novi ETA 20:45.",
      nextStop: "Sledeći stop",
      unload: "Istovar",
      eta: "ETA",
      status: "Status",
      onTime: "Na vreme",
      atRisk: "Kasni",
      liveGps: "I-80, NE · GPS uživo",
    },
  },
  problem: {
    label: "Šta Zonik rešava",
    title: "Noću se čeka da krene po zlu.",
    titleAccent: "Niko to ne uhvati na vreme.",
    punchline:
      "Praćenje kasni. Saznaju kad je već kasno. Cela smena ode na gašenje požara.",
    items: [
      {
        hook: "Čekaju da kamion zakasni.",
        versus: "Onda kreću telefoni.",
        description:
          "Termin za utovar ili istovar je već prošao. Noćna smena zove vozače i gasi požar.",
      },
      {
        hook: "Gledaju kamion po kamion.",
        versus: "Ko kasni, lako se preskoči.",
        description:
          "Otvore ELD. Ovaj tovar. Pa onaj. Dok vide da kasni, već je kasno.",
      },
      {
        hook: "Cela noć ode na probleme.",
        versus: "Niko ne planira sutrašnje ture.",
        description:
          "Svi su na onome što je već puklo. Nema vremena za sutrašnje ture, ni da se zaradi.",
      },
    ],
  },
  howItWorks: {
    label: "Kako radi",
    title: "Zonik zna svaki kamion i svaki tovar.",
    titleAccent: "Prati ih 24/7.",
    punchline: "Evo kako pomaže noćnoj smeni i dispečerima.",
    step: "Korak",
    aiCall: "AI poziv",
    steps: [
      {
        shortTitle: "Veza sa TMS i ELD",
        title: "Poveže se na TMS i ELD",
        description:
          "Sam povuče tovare i GPS. Ništa ne unosiš. Ne treba novi uređaj.",
      },
      {
        shortTitle: "Prati svaki kamion",
        title: "Zonik prati svaki kamion",
        description:
          "Gleda GPS i koliko ima do utovara ili istovara. Non-stop. Niko ne mora da osvežava ekran.",
      },
      {
        shortTitle: "Zove ko kasni",
        title: "Zonik zove vozače koji kasne",
        description:
          "Ako kamion kasni, Zonik zove vozača. Pita šta je. Tim odmah dobije odgovor.",
      },
      {
        shortTitle: "Javi timu šta je",
        title: "Zonik javi timu šta se dešava",
        description: "Čuju samo za kamione koji kasne. Ostali ne smetaju.",
      },
    ],
  },
  visuals: {
    tmsSub: "Aktivni tovari",
    eldSub: "Gde je sad",
    connectedCaption: "Povezano. Tovari ulaze sami.",
    everyTruck: "Svaki kamion",
    watching: "Prati",
    onTime: "Na vreme",
    atRisk: "Kasni",
    critical: "Kritično",
    zonikCalling: "Zonik zove",
    callScript: "Zdravo, ovde Zonik. Možeš da kažeš gde si?",
    driver: "Vozač",
    callInProgress: "Poziv u toku…",
    driverReply: "Kvar na I-70. ETA +2 sata.",
    teamUpdated: "Tim obavešten · Kasni +2 sata",
    yourTeam: "Tim",
    trucksFine: "4 kamiona OK",
    needsYou: "Čeka tebe",
    alertDetail: "GPS ugašen · Kamion stoji · Sledeći stop kasni",
    openThis: "Otvori",
  },
  proof: {
    label: "Šta se menja",
    title: "Sve je zavisilo od toga da neko primeti.",
    titleAccent: "Sad to Zonik odradi sam.",
    punchline:
      "Zonik prati svaki kamion, 24/7. Računa kad stiže. Zove ko kasni. Tim radi ono što vredi.",
    before: "Pre",
    withZonik: "Sa Zonikom",
    beforeTitle: "Neko mora da vidi. Pa da računa.",
    afterTitle: "Već je urađeno. Tim radi bitne stvari.",
    flips: [
      {
        before: "Neko mora da vidi da kamion kasni.",
        after: "Zonik je to već video.",
      },
      {
        before: "Neko mora da izračuna kad stiže.",
        after: "Sledeći stop i vreme su već tu.",
      },
      {
        before: "Neko mora da zove vozača.",
        after: "Zonik je već zvao. Ti imaš odgovor.",
      },
    ],
    bookDemo: "Zakaži demo",
    seeFeatures: "Pogledaj mogućnosti",
    mapAlt: "Zonik mapa flote kamiona širom Amerike",
  },
  cta: {
    label: "Zakaži demo",
    title: "Pusti Zonika da prati.",
    titleAccent: "Ti radi ono što vredi.",
    body: "Zonik prati sve kamione. Vidiš gde ide i kad stiže. Ko kasni, dobije poziv. Ti se javljaš samo kad moraš.",
    bookDemo: "Zakaži demo",
  },
};

export const dictionaries: Record<Locale, typeof en & typeof marketingEn> = {
  en: { ...en, ...marketingEn },
  sr: { ...sr, ...marketingSr },
};

export type Dictionary = (typeof dictionaries)["en"];
