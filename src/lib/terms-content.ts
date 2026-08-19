import type { Locale } from "@/lib/i18n/dictionary";

export type TermsBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type TermsSection = {
  id: string;
  title: string;
  blocks: TermsBlock[];
};

export type TermsCopy = {
  label: string;
  title: string;
  titleAccent: string;
  updated: string;
  intro: string;
  contactCta: string;
  sections: TermsSection[];
};

const en: TermsCopy = {
  label: "Legal",
  title: "Terms of Use",
  titleAccent: "Rules for the site and the product.",
  updated: "Last updated: 19 August 2026",
  intro:
    "These Terms are the standard rules of use for Zonik. They cover zonikai.com and the Zonik product at app.zonikai.com. If your company signs a custom offer, order, license, or MSA with us, that signed document controls if it conflicts with this page.",
  contactCta: "Questions about these Terms",
  sections: [
    {
      id: "who",
      title: "1. Who we are",
      blocks: [
        {
          type: "p",
          text: "These Terms are between you and Lead Agents LLC, a Wyoming limited liability company, doing business as Zonik AI (“Zonik”, “we”, “us”). Registered office: 30 North Gould St, Sheridan, WY 82801, USA. We operate zonikai.com and app.zonikai.com.",
        },
        {
          type: "p",
          text: "Contact: hello@zonikai.com.",
        },
      ],
    },
    {
      id: "agreement",
      title: "2. Agreement and custom contracts",
      blocks: [
        {
          type: "p",
          text: "By using the website, booking a demo, creating an account, or accessing the Service, you agree to these Terms and to our Privacy Policy.",
        },
        {
          type: "p",
          text: "We sell to companies under a custom offer and license. Fees, term, seats, support, and any SLA are set in the signed order, quote, license, or master agreement (the “Order”).",
        },
        {
          type: "p",
          text: "If an Order conflicts with these Terms, the Order wins for that conflict. These Terms fill any gap the Order does not cover. This page is not a quote and not a signed license by itself.",
        },
      ],
    },
    {
      id: "b2b",
      title: "3. Business customers only",
      blocks: [
        {
          type: "p",
          text: "Zonik is for businesses (fleets, brokers, dispatch teams, and similar companies). It is not for personal or household use. You represent that you are acting for a company and that you have authority to bind that company.",
        },
        {
          type: "p",
          text: "If you do not have that authority, do not use the Service and do not accept an Order.",
        },
      ],
    },
    {
      id: "website",
      title: "4. Website use",
      blocks: [
        {
          type: "p",
          text: "You may browse zonikai.com, use the calculator, and book a demo for a lawful business purpose. You may not:",
        },
        {
          type: "ul",
          items: [
            "Scrape, copy, or resell the site in bulk",
            "Probe, overload, or break security",
            "Post unlawful, misleading, or harmful content",
            "Use the site to send spam",
          ],
        },
        {
          type: "p",
          text: "Demo bookings go through Cal.com. Information you give there is also covered by our Privacy Policy.",
        },
        {
          type: "p",
          text: "Website content is for information. It is not a promise that your fleet will get a specific result. This site does not publish other companies’ reviews or testimonials. We do not invent customer quotes.",
        },
        {
          type: "p",
          text: "The calculator is an estimate only. Figures it shows are not a quote, not an invoice, and not a guarantee of savings or results.",
        },
      ],
    },
    {
      id: "trial",
      title: "5. Trial and how to stop",
      blocks: [
        {
          type: "p",
          text: "A 14-day trial is available only if we agree to it by email. This website does not take a card, does not start a paid plan by itself, and does not auto-charge when a trial ends.",
        },
        {
          type: "p",
          text: "If we do not sign an Order before the trial ends, access stops. Moving to paid use happens only with a signed Order — never by keeping a card on file from this site.",
        },
        {
          type: "p",
          text: "To cancel a trial, or to tell us not to continue after it, send one email to hello@zonikai.com. That is the same step as writing to us, and it is not harder than booking a demo.",
        },
        {
          type: "p",
          text: "Paid access follows the Order. To cancel paid access, follow the Order; you may also write to hello@zonikai.com and we will treat that as notice.",
        },
      ],
    },
    {
      id: "service",
      title: "6. The Service",
      blocks: [
        {
          type: "p",
          text: "The “Service” is the Zonik product: 24/7 load tracking, next-stop and ETA views, alerts, and AI voice calls to drivers your company has added, plus related dashboards and integrations.",
        },
        {
          type: "p",
          text: "Zonik is a dispatch tool. It does not replace your people, your safety process, your insurance, or your duty to run the fleet. Your team decides what to do with every alert.",
        },
        {
          type: "p",
          text: "We may change features as we improve the product. If a change removes a material feature you paid for, we will handle it as the Order says, or we will give reasonable notice.",
        },
      ],
    },
    {
      id: "accounts",
      title: "7. Accounts and access",
      blocks: [
        {
          type: "p",
          text: "Your company is responsible for every user it invites, every admin it names, and every credential it issues. Keep passwords safe. Tell us promptly if you think an account was misused.",
        },
        {
          type: "p",
          text: "You must keep company, user, and driver records accurate. You may only give access to people who are allowed to see your fleet data.",
        },
      ],
    },
    {
      id: "data",
      title: "8. Customer data and third-party tools",
      blocks: [
        {
          type: "p",
          text: "You keep all rights in the data you (or your TMS, ELD, or other systems) send us (“Customer Data”). You grant us a limited right to host, process, and display that data only to provide the Service, to secure it, and to follow the law.",
        },
        {
          type: "p",
          text: "GPS, hours, load status, location, and similar signals often come from third-party ELD, TMS, and telematics tools. We buy or receive that information from those systems. We do not control them. They can be late, incomplete, offline, or wrong.",
        },
        {
          type: "p",
          text: "AI in the Service may summarize, score, or act on Customer Data. AI can make mistakes. You must not treat Zonik output as the only check before a pickup, delivery, safety call, or customer promise.",
        },
        {
          type: "p",
          text: "You represent that you have the right to connect those tools and to send us that data, including data about drivers and loads.",
        },
      ],
    },
    {
      id: "calls",
      title: "9. AI driver calls and consent",
      blocks: [
        {
          type: "p",
          text: "Zonik places AI voice calls only to drivers your company has added to the Service. We do not pick numbers from the open web or call drivers you have not loaded. Calls ask about load status — for example where a driver is and whether they will make a window. They are not medical, mental-health, or legal advice. They are not a 911 or crisis line.",
        },
        {
          type: "p",
          text: "Voice and call content may be processed by subprocessors, including Twilio and Vapi for voice, and a language-model provider that drafts or summarizes what was said. Zonik is a logistics tool for dispatch. We do not offer a consumer chatbot crisis protocol. If a driver or anyone else is in danger, they must use local emergency services. Your dispatch team stays responsible for how you act on call results.",
        },
        {
          type: "p",
          text: "By adding a driver, phone number, or similar contact, your company represents and warrants that:",
        },
        {
          type: "ul",
          items: [
            "The person is your driver, contractor, or other contact you are allowed to reach about a load",
            "You have all notices, consents, and authority required by law for automated or AI calls, texts, and recordings to that number",
            "Calling that number for status, ETA, and delay reasons is allowed in the places where the driver and your company operate",
          ],
        },
        {
          type: "p",
          text: "You are responsible for keeping that list current, for removing people who should not be called, and for how your team uses call results. We are not the employer or motor carrier.",
        },
      ],
    },
    {
      id: "use",
      title: "10. Acceptable use",
      blocks: [
        {
          type: "p",
          text: "You may not use the Service to:",
        },
        {
          type: "ul",
          items: [
            "Break the law, including call, privacy, or transport rules",
            "Harass drivers or third parties, or call numbers you are not allowed to call",
            "Probe, reverse engineer, or overload the Service except as the law allows",
            "Resell Zonik or give access to a competitor except as the Order allows",
            "Upload malware or infringing content",
          ],
        },
        {
          type: "p",
          text: "We may suspend access if we reasonably believe you are misusing the Service or putting others at risk. We will try to notify the admin on the Order, unless the law or safety says we must act first.",
        },
      ],
    },
    {
      id: "fees",
      title: "11. Fees and licenses",
      blocks: [
        {
          type: "p",
          text: "There is no public price on this site. Each company receives a custom offer and a license to use the Service for its own internal operations, on the terms in the Order. A trial under section 5 is not a fee and is not a charge.",
        },
        {
          type: "p",
          text: "You pay the fees in the Order. Unless the Order says otherwise, fees paid under an Order are non-refundable, and unpaid invoices may lead to suspension. That sentence does not turn a trial into a paid invoice.",
        },
        {
          type: "p",
          text: "The license is not exclusive, is not transferable except as the Order allows, and does not sell you the software. When the Order ends, the license ends, except for any survival clauses in the Order or in these Terms.",
        },
      ],
    },
    {
      id: "ip",
      title: "12. Intellectual property",
      blocks: [
        {
          type: "p",
          text: "Zonik, the software, models, prompts, call flows, dashboards, and the site are owned by Lead Agents LLC and its licensors. These Terms do not transfer that ownership.",
        },
        {
          type: "p",
          text: "Customer Data stays yours. Feedback you send us (ideas, bug reports, suggestions) may be used to improve the Service without paying you, and without naming you.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "13. Confidentiality",
      blocks: [
        {
          type: "p",
          text: "Each party may see the other’s non-public business information. The receiving party will use it only to perform under the Order and these Terms, and will not share it except with people who need it and are bound to keep it secret, or if the law requires disclosure.",
        },
        {
          type: "p",
          text: "This does not cover information that is public, already known, independently developed, or received from someone who had the right to share it.",
        },
      ],
    },
    {
      id: "disclaimer",
      title: "14. Disclaimer of warranties",
      blocks: [
        {
          type: "p",
          text: "THE SITE AND THE SERVICE ARE PROVIDED “AS IS” AND “AS AVAILABLE”. TO THE FULLEST EXTENT THE LAW ALLOWS, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.",
        },
        {
          type: "p",
          text: "We do not warrant that:",
        },
        {
          type: "ul",
          items: [
            "GPS, ELD, TMS, or other third-party data is accurate, complete, or on time",
            "ETAs, delay flags, or AI summaries are correct",
            "An AI call will connect, be understood, or produce a true driver answer",
            "A load will pick up, deliver, or arrive on time",
            "The Service will be uninterrupted, error-free, or always available",
          ],
        },
        {
          type: "p",
          text: "You accept that a level of error can happen when we process third-party feeds and AI. Your company remains responsible for dispatch, safety, and customer commitments.",
        },
      ],
    },
    {
      id: "liability",
      title: "15. Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "TO THE FULLEST EXTENT THE LAW ALLOWS, LEAD AGENTS LLC AND ITS PEOPLE WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, LOST LOADS, MISSED WINDOWS, CARGO CLAIMS, FINES, OR BUSINESS INTERRUPTION, EVEN IF WE WERE TOLD THEY WERE POSSIBLE.",
        },
        {
          type: "p",
          text: "OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING OUT OF THE SITE, THE SERVICE, OR THESE TERMS IS LIMITED TO THE FEES YOU PAID US FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM. IF YOU ONLY USED THE PUBLIC WEBSITE AND PAID US NOTHING, OUR TOTAL LIABILITY IS LIMITED TO ONE HUNDRED U.S. DOLLARS (US $100).",
        },
        {
          type: "p",
          text: "These caps are a core part of the deal. We would not offer the Service on the same terms without them. Some places do not allow some limits; in those places, we limit liability to the maximum the law allows.",
        },
      ],
    },
    {
      id: "indemnity",
      title: "16. Indemnity",
      blocks: [
        {
          type: "p",
          text: "You will defend and indemnify Lead Agents LLC, its members, and its people against claims, damages, and reasonable legal fees that arise from:",
        },
        {
          type: "ul",
          items: [
            "Customer Data you provide",
            "Drivers, phone numbers, or contacts you add, and any AI or other calls to them",
            "Your lack of consent, notice, or authority to call or to process that data",
            "Your misuse of the Service, or your breach of these Terms or an Order",
            "Your dispute with a driver, shipper, receiver, or other third party",
          ],
        },
      ],
    },
    {
      id: "term",
      title: "17. Term, suspension, and termination",
      blocks: [
        {
          type: "p",
          text: "These Terms start when you first use the site or the Service and continue until you stop, or until the Order ends.",
        },
        {
          type: "p",
          text: "We may suspend or end access for material breach, non-payment under the Order, legal risk, or harm to the Service or to others. You may stop using the site at any time. To end a trial, email hello@zonikai.com (section 5). Paid access follows the Order; the same email is enough as fallback notice.",
        },
        {
          type: "p",
          text: "Sections that should survive (including IP, confidentiality, disclaimers, liability limits, indemnity, and governing law) stay in effect after the relationship ends.",
        },
      ],
    },
    {
      id: "changes",
      title: "18. Changes to these Terms",
      blocks: [
        {
          type: "p",
          text: "We may update this page. The new version applies when we post it, with a new “last updated” date. If a change is material and you have an active paid Order, we will give reasonable notice (for example by email to the admin on the Order or a note in the product).",
        },
        {
          type: "p",
          text: "If you do not agree, stop using the site and, where the Order allows, end the Service. Continued use after the effective date is acceptance of the new Terms, except where the Order says otherwise.",
        },
      ],
    },
    {
      id: "law",
      title: "19. Governing law",
      blocks: [
        {
          type: "p",
          text: "These Terms are governed by the laws of the State of Wyoming, United States, without regard to conflict-of-law rules. The state and federal courts located in Wyoming have exclusive jurisdiction, except that we may seek injunctive relief in any court to protect our IP or confidential information.",
        },
        {
          type: "p",
          text: "If a signed Order sets a different law or venue, that Order controls for the paid Service.",
        },
        {
          type: "p",
          text: "If a part of these Terms is unenforceable, the rest still applies. We do not waive a right unless we say so in writing. You may not assign these Terms without our consent, except to a successor of your company. We may assign them as part of a reorganization or sale.",
        },
        {
          type: "p",
          text: "These Terms, the Privacy Policy, and any Order are the full agreement on this subject. They replace prior discussions about the same subject, except as an Order keeps them.",
        },
      ],
    },
  ],
};

const sr: TermsCopy = {
  label: "Pravno",
  title: "Uslovi korišćenja",
  titleAccent: "Pravila za sajt i proizvod.",
  updated: "Poslednja izmena: 19. avgust 2026.",
  intro:
    "Ovo su standardna pravila korišćenja Zonika. Važe za zonikai.com i za proizvod na app.zonikai.com. Ako vaša firma sa nama potpiše ponudu, nalog, licencu ili MSA, taj potpisani dokument važi ako se sukobi sa ovom stranicom.",
  contactCta: "Pitanja o ovim uslovima",
  sections: [
    {
      id: "who",
      title: "1. Ko smo",
      blocks: [
        {
          type: "p",
          text: "Ovi uslovi su između vas i Lead Agents LLC, društva sa ograničenom odgovornošću iz Wyoming-a, koje posluje kao Zonik AI („Zonik“, „mi“). Registrovana adresa: 30 North Gould St, Sheridan, WY 82801, USA. Vodimo zonikai.com i app.zonikai.com.",
        },
        {
          type: "p",
          text: "Kontakt: hello@zonikai.com.",
        },
      ],
    },
    {
      id: "agreement",
      title: "2. Ugovor i posebni ugovori",
      blocks: [
        {
          type: "p",
          text: "Korišćenjem sajta, zakazivanjem dema, otvaranjem naloga ili pristupom Servisu prihvatate ove uslove i Politiku privatnosti.",
        },
        {
          type: "p",
          text: "Firmama prodajemo po posebnoj ponudi i licenci. Cena, rok, broj korisnika, podrška i eventualni SLA stoje u potpisanom nalogu, ponudi, licenci ili okvirnom ugovoru („Nalog“).",
        },
        {
          type: "p",
          text: "Ako se Nalog sukobi sa ovim uslovima, važi Nalog. Ovi uslovi popunjavaju ono što Nalog ne pokriva. Ova stranica nije ponuda i nije potpisana licenca sama po sebi.",
        },
      ],
    },
    {
      id: "b2b",
      title: "3. Samo za firme",
      blocks: [
        {
          type: "p",
          text: "Zonik je za firme (flote, brokere, dispečere i slične kompanije). Nije za ličnu ili kućnu upotrebu. Izjavljujete da radite u ime firme i da imate ovlašćenje da je obavežete.",
        },
        {
          type: "p",
          text: "Ako nemate to ovlašćenje, ne koristite Servis i ne prihvatate Nalog.",
        },
      ],
    },
    {
      id: "website",
      title: "4. Korišćenje sajta",
      blocks: [
        {
          type: "p",
          text: "Sajt zonikai.com, kalkulator i zakazivanje dema smete da koristite u zakonite poslovne svrhe. Ne smete da:",
        },
        {
          type: "ul",
          items: [
            "Skrejujete, masovno kopirate ili preprodajete sajt",
            "Ispitujete, preopterećujete ili rušite zaštitu",
            "Objavljujete nezakonit, obmanjujući ili štetan sadržaj",
            "Koristite sajt za spam",
          ],
        },
        {
          type: "p",
          text: "Demo se zakazuje preko Cal.com. Podaci koje tamo date pokriveni su i Politikom privatnosti.",
        },
        {
          type: "p",
          text: "Sadržaj sajta je informacija. Nije obećanje da će vaša flota dobiti konkretan rezultat. Na sajtu nema tuđih recenzija ni izjava klijenata. Ne izmišljamo citate.",
        },
        {
          type: "p",
          text: "Kalkulator je samo procena. Brojevi koje pokaže nisu ponuda, nisu račun i nisu garancija uštede ni rezultata.",
        },
      ],
    },
    {
      id: "trial",
      title: "5. Probni period i kako da ga zaustavite",
      blocks: [
        {
          type: "p",
          text: "Probni period od 14 dana važi samo ako se tako dogovorimo mejlom. Ovaj sajt ne uzima karticu, sam ne pokreće plaćeni plan i ne naplaćuje automatski kad probni period istekne.",
        },
        {
          type: "p",
          text: "Ako do kraja probnog perioda ne potpišemo Nalog, pristup prestaje. Prelazak na plaćeno ide samo potpisanim Nalogom — nikad tako što na sajtu ostane kartica.",
        },
        {
          type: "p",
          text: "Da otkažete probni period, ili da kažete da nećete da nastavite posle njega, pošaljite jedan mejl na hello@zonikai.com. To je isti korak kao da nam pišete, i nije teži od zakazivanja dema.",
        },
        {
          type: "p",
          text: "Plaćeni pristup prati Nalog. Da ga otkažete, radite kako piše Nalog; smete i da pišete na hello@zonikai.com i to tretiramo kao obaveštenje.",
        },
      ],
    },
    {
      id: "service",
      title: "6. Servis",
      blocks: [
        {
          type: "p",
          text: "„Servis“ je Zonik proizvod: praćenje tovara 24/7, sledeći stop i ETA, alarmi i AI pozivi vozačima koje je vaša firma ubacila, plus povezani paneli i integracije.",
        },
        {
          type: "p",
          text: "Zonik je alat za dispečere. Ne zamenjuje ljude, bezbednosni postupak, osiguranje ni dužnost da vodite flotu. Vaš tim odlučuje šta da radi sa svakim alarmom.",
        },
        {
          type: "p",
          text: "Funkcije možemo da menjamo kako proizvod raste. Ako uklonimo bitnu funkciju za koju ste platili, uradićemo kako piše u Nalogu, ili ćemo dati razuman rok.",
        },
      ],
    },
    {
      id: "accounts",
      title: "7. Nalozi i pristup",
      blocks: [
        {
          type: "p",
          text: "Vaša firma odgovara za svakog korisnika kog pozove, za admine koje imenuje i za pristupne podatke koje izda. Čuvajte lozinke. Odmah nam javite ako mislite da je nalog zloupotrebljen.",
        },
        {
          type: "p",
          text: "Podaci o firmi, korisnicima i vozačima moraju da budu tačni. Pristup smete da date samo onima koji smeju da vide podatke flote.",
        },
      ],
    },
    {
      id: "data",
      title: "8. Vaši podaci i tuđi alati",
      blocks: [
        {
          type: "p",
          text: "Sva prava na podatke koje vi (ili vaš TMS, ELD ili drugi sistemi) pošaljete nama ostaju vaša („Podaci klijenta“). Dajete nam ograničeno pravo da ih hostujemo, obrađujemo i prikazujemo samo da bismo pružili Servis, čuvali ga i poštovali zakon.",
        },
        {
          type: "p",
          text: "GPS, sati, status tovara, lokacija i slični signali često dolaze iz tuđih ELD, TMS i telematskih alata. Te informacije kupujemo ili primamo od tih sistema. Mi ih ne kontrolišemo. Mogu da kasne, da fale, da padnu ili da budu pogrešni.",
        },
        {
          type: "p",
          text: "AI u Servisu može da sažima, ocenjuje ili reaguje na Podatke klijenta. AI može da pogreši. Zonik izlaz ne sme da bude jedina provera pre utovara, istovara, bezbednosnog poziva ili obećanja klijentu.",
        },
        {
          type: "p",
          text: "Izjavljujete da imate pravo da povežete te alate i da nam pošaljete te podatke, uključujući podatke o vozačima i tovarima.",
        },
      ],
    },
    {
      id: "calls",
      title: "9. AI pozivi vozačima i pristanak",
      blocks: [
        {
          type: "p",
          text: "Zonik AI-jem zove samo vozače koje je vaša firma ubacila u Servis. Ne biramo brojeve sa interneta i ne zovemo vozače koje niste učitali. Pozivi pitaju za status tovara — npr. gde je vozač i stiže li na vreme. To nije medicinski, psihološki ni pravni savet. Nije 911 ni krizna linija.",
        },
        {
          type: "p",
          text: "Glas i sadržaj poziva mogu da obrađuju podobrađivači, uključujući Twilio i Vapi za glas, i provajdera jezičkog modela koji piše ili sažima šta je rečeno. Zonik je logistički alat za dispeč. Ne nudimo protokol krizne linije kao potrošački četbot. Ako je vozač ili bilo ko u opasnosti, treba da zove hitne službe. Vaš dispeč i dalje odgovara za to kako reagujete na rezultat poziva.",
        },
        {
          type: "p",
          text: "Kad dodate vozača, broj ili sličan kontakt, vaša firma izjavljuje i garantuje da:",
        },
        {
          type: "ul",
          items: [
            "Ta osoba je vaš vozač, saradnik ili drugi kontakt kog smete da zovete u vezi sa tovarom",
            "Imate sve obaveštenja, pristanke i ovlašćenja koje zakon traži za automatizovane ili AI pozive, poruke i snimanje na taj broj",
            "Poziv na taj broj zbog statusa, ETA i kašnjenja je dozvoljen tamo gde vozač i vaša firma rade",
          ],
        },
        {
          type: "p",
          text: "Vi ste odgovorni da lista bude ažurna, da sklonite one koje ne treba zvati, i za to kako tim koristi rezultate poziva. Mi nismo poslodavac ni prevoznik.",
        },
      ],
    },
    {
      id: "use",
      title: "10. Dozvoljena upotreba",
      blocks: [
        {
          type: "p",
          text: "Servis ne smete da koristite da:",
        },
        {
          type: "ul",
          items: [
            "Kršite zakon, uključujući pravila o pozivima, privatnosti ili transportu",
            "Uznemiravate vozače ili treća lica, ili zovete brojeve koje ne smete",
            "Ispitujete, rastavljate ili preopterećujete Servis, osim koliko zakon dozvoljava",
            "Preprodajete Zonik ili dajete pristup konkurenciji, osim ako Nalog to dozvoli",
            "Kačite malver ili tuđi sadržaj",
          ],
        },
        {
          type: "p",
          text: "Pristup možemo da suspendujemo ako razumno smatramo da zloupotrebljavate Servis ili da ugrožavate druge. Pokušaćemo da obavestimo admina sa Naloga, osim ako zakon ili bezbednost traže da reagujemo odmah.",
        },
      ],
    },
    {
      id: "fees",
      title: "11. Cene i licence",
      blocks: [
        {
          type: "p",
          text: "Na sajtu nema javne cene. Svaka firma dobija posebnu ponudu i licencu da Servis koristi za svoj unutrašnji rad, po uslovima iz Naloga. Probni period iz odeljka 5 nije naknada i nije naplata.",
        },
        {
          type: "p",
          text: "Plaćate iznose iz Naloga. Osim ako Nalog kaže drugačije, naknade plaćene po Nalogu se ne vraćaju, a neplaćeni računi mogu da dovedu do suspenzije. Ta rečenica ne pretvara probni period u plaćeni račun.",
        },
        {
          type: "p",
          text: "Licenca nije ekskluzivna, nije prenosiva osim kako Nalog dozvoli, i ne prodaje vam softver. Kad Nalog prestane, prestaje i licenca, osim odredbi koje po Nalogu ili ovim uslovima ostaju na snazi.",
        },
      ],
    },
    {
      id: "ip",
      title: "12. Intelektualna svojina",
      blocks: [
        {
          type: "p",
          text: "Zonik, softver, modeli, promptovi, tokovi poziva, paneli i sajt pripadaju Lead Agents LLC i njenim davalacima licence. Ovi uslovi to vlasništvo ne prenose.",
        },
        {
          type: "p",
          text: "Podaci klijenta ostaju vaši. Povratne informacije koje nam pošaljete (ideje, bagovi, predlozi) smemo da koristimo da unapredimo Servis, bez naknade i bez navođenja vašeg imena.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "13. Poverljivost",
      blocks: [
        {
          type: "p",
          text: "Svaka strana može da vidi nejavne poslovne podatke druge. Primajuća strana sme da ih koristi samo da izvrši Nalog i ove uslove, i ne sme da ih deli osim sa onima koj su potrebni i koji su dužni da ćute, ili ako to zakon nalaže.",
        },
        {
          type: "p",
          text: "Ovo ne važi za podatke koji su javni, već poznati, nezavisno razvijeni, ili primljeni od nekoga ko je imao pravo da ih da.",
        },
      ],
    },
    {
      id: "disclaimer",
      title: "14. Odricanje od garancija",
      blocks: [
        {
          type: "p",
          text: "SAJT I SERVIS SE DAJU „KAKVI JESU“ I „KAKVI SU DOSTUPNI“. U NAJVEĆOJ MERI KOJU ZAKON DOZVOLJAVA, ODRIČEMO SE SVIH GARANCIJA, IZRIČITIH ILI PREĆUTNIH, UKLJUČUJUĆI POGODNOST ZA PRODAJU, POGODNOST ZA ODREĐENU NAMENU, PRAVNI OSNOV I NEPOVREDU PRAVA.",
        },
        {
          type: "p",
          text: "Ne garantujemo da:",
        },
        {
          type: "ul",
          items: [
            "su GPS, ELD, TMS ili drugi tuđi podaci tačni, potpuni ili na vreme",
            "su ETA, oznake kašnjenja ili AI sažeci tačni",
            "će se AI poziv javiti, biti shvaćen ili dati istinit odgovor vozača",
            "će se tovar utovariti, istovariti ili stići na vreme",
            "Servis radi bez prekida, bez greške i da je uvek dostupan",
          ],
        },
        {
          type: "p",
          text: "Prihvatate da pri obradi tuđih feedova i AI-ja postoji nivo greške. Vaša firma i dalje odgovara za dispeč, bezbednost i obećanja klijentima.",
        },
      ],
    },
    {
      id: "liability",
      title: "15. Ograničenje odgovornosti",
      blocks: [
        {
          type: "p",
          text: "U NAJVEĆOJ MERI KOJU ZAKON DOZVOLJAVA, LEAD AGENTS LLC I NJENI LJUDI NE ODGOVARAJU ZA INDIREKTNU, SLUČAJNU, POSEBNU, POSLEDIČNU, PRIMERNU ILI KAZNENU ŠTETU, NITI ZA IZGUBLJENU DOBIT, IZGUBLJENE TOVARE, PROPUŠTENE TERMINE, ODŠTETE NA ROBI, KAZNE ILI PREKID RADA, ČAK I AKO SMO UPOZORENI DA JE TO MOGUĆE.",
        },
        {
          type: "p",
          text: "UKUPNA ODGOVORNOST ZA SVE ZAHTEVE PO OSNOVU SAJTA, SERVISA ILI OVIH USLOVA OGRANIČENA JE NA NAKNADE KOJE STE NAM PLATILI ZA SERVIS U DVANAEST (12) MESECI PRE ZAHTEVA. AKO STE KORISTILI SAMO JAVNI SAJT I NISTE NAM NIŠTA PLATILI, UKUPNA ODGOVORNOST JE OGRANIČENA NA STO AMERIČKIH DOLARA (US $100).",
        },
        {
          type: "p",
          text: "Ovi limiti su bitan deo dogovora. Bez njih Servis ne bismo davali pod istim uslovima. Neka mesta ne dozvoljavaju neka ograničenja; tamo odgovornost svodimo na maksimum koji zakon dozvoljava.",
        },
      ],
    },
    {
      id: "indemnity",
      title: "16. Naknada štete",
      blocks: [
        {
          type: "p",
          text: "Branićete i obeštetićete Lead Agents LLC, njene članove i ljude od zahteva, štete i razumnih troškova zastupanja koji nastanu zbog:",
        },
        {
          type: "ul",
          items: [
            "Podataka klijenta koje date",
            "Vozača, brojeva ili kontakata koje dodate, i AI ili drugih poziva ka njima",
            "Nedostatka pristanka, obaveštenja ili ovlašćenja da zovete ili obrađujete te podatke",
            "Zloupotrebe Servisa, ili kršenja ovih uslova ili Naloga",
            "Spora sa vozačem, nalogodavcem, prijemnikom ili trećim licem",
          ],
        },
      ],
    },
    {
      id: "term",
      title: "17. Trajanje, suspenzija i prestanak",
      blocks: [
        {
          type: "p",
          text: "Ovi uslovi počinju kad prvi put koristite sajt ili Servis i traju dok ne prestanete, ili dok Nalog ne istekne.",
        },
        {
          type: "p",
          text: "Pristup možemo da suspendujemo ili prekinemo zbog bitnog kršenja, neplaćanja po Nalogu, pravnog rizika ili štete po Servis ili druge. Sajt možete da prestanete da koristite kad hoćete. Da prekinete probni period, pišite na hello@zonikai.com (odeljak 5). Plaćeni pristup prati Nalog; isti mejl važi i kao rezervno obaveštenje.",
        },
        {
          type: "p",
          text: "Odredbe koje treba da ostanu (uključujući IP, poverljivost, odricanja, limite odgovornosti, naknadu štete i merodavno pravo) ostaju na snazi i posle kraja odnosa.",
        },
      ],
    },
    {
      id: "changes",
      title: "18. Izmene ovih uslova",
      blocks: [
        {
          type: "p",
          text: "Ovu stranicu možemo da ažuriramo. Nova verzija važi kad je objavimo, sa novim datumom. Ako je izmena bitna i imate aktivan plaćeni Nalog, daćemo razumno obaveštenje (npr. mejl adminu sa Naloga ili poruka u proizvodu).",
        },
        {
          type: "p",
          text: "Ako se ne slažete, prestanite da koristite sajt i, gde Nalog dozvoli, ugasite Servis. Nastavak korišćenja posle datuma stupanja na snagu je prihvatanje novih uslova, osim ako Nalog kaže drugačije.",
        },
      ],
    },
    {
      id: "law",
      title: "19. Merodavno pravo",
      blocks: [
        {
          type: "p",
          text: "Za ove uslove važi pravo države Wyoming, Sjedinjene Američke Države, bez pravila o sukobu zakona. Isključivo su nadležni državni i savezni sudovi u Wyoming-u, osim što možemo da tražimo privremenu meru pred bilo koj sudom da zaštitimo IP ili poverljive podatke.",
        },
        {
          type: "p",
          text: "Ako potpisani Nalog stavi drugo pravo ili sud, taj Nalog važi za plaćeni Servis.",
        },
        {
          type: "p",
          text: "Ako je deo ovih uslova neprimenjiv, ostali deo i dalje važi. Pravo ne odlažemo osim ako to kažemo pismeno. Ove uslove ne smete da ustupite bez naše saglasnosti, osim nasledniku vaše firme. Mi smemo da ih ustupimo u okviru reorganizacije ili prodaje.",
        },
        {
          type: "p",
          text: "Ovi uslovi, Politika privatnosti i svaki Nalog čine ceo dogovor o ovoj temi. Zamenjuju ranije razgovore o istoj temi, osim onoga što Nalog zadrži.",
        },
      ],
    },
  ],
};

export const termsCopy: Record<Locale, TermsCopy> = { en, sr };
