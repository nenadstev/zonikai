import type { Locale } from "@/lib/i18n/dictionary";

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type PrivacySection = {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
};

export type PrivacyCopy = {
  label: string;
  title: string;
  titleAccent: string;
  updated: string;
  intro: string;
  contactCta: string;
  sections: PrivacySection[];
};

const en: PrivacyCopy = {
  label: "Legal",
  title: "Privacy Policy",
  titleAccent: "How we handle your data.",
  updated: "Last updated: 14 August 2026",
  intro:
    "This policy explains how Zonik AI collects and uses personal data on zonikai.com. It is written to meet the EU GDPR and Serbia’s Law on Personal Data Protection. If you have questions, email hello@zonikai.com.",
  contactCta: "Email privacy requests to",
  sections: [
    {
      id: "who",
      title: "1. Who is responsible",
      blocks: [
        {
          type: "p",
          text: "The controller for this website is Lead Agents LLC, a Wyoming limited liability company doing business as Zonik AI (“Zonik”, “we”, “us”), operator of zonikai.com and app.zonikai.com. Registered office: 30 North Gould St, Sheridan, WY 82801, USA.",
        },
        {
          type: "p",
          text: "For privacy requests, write to hello@zonikai.com. We will reply within one month.",
        },
      ],
    },
    {
      id: "scope",
      title: "2. What this policy covers",
      blocks: [
        {
          type: "p",
          text: "This policy covers the public website zonikai.com: browsing, language settings, demo booking, and email to us.",
        },
        {
          type: "p",
          text: "The Zonik product (live GPS, TMS/ELD data, AI driver calls) is different. There, your company is usually the controller. We act as a processor under the customer contract. If you are a driver and a carrier uses Zonik, ask that company first.",
        },
      ],
    },
    {
      id: "data",
      title: "3. What data we collect",
      blocks: [
        {
          type: "h3",
          text: "When you book a demo",
        },
        {
          type: "p",
          text: "The booking runs through Cal.com. We may receive:",
        },
        {
          type: "ul",
          items: [
            "Name and email",
            "Company name, if you add it",
            "Time zone and chosen slot",
            "Notes you type into the booking",
            "Meeting metadata (time, status, no-show)",
          ],
        },
        {
          type: "h3",
          text: "When you email us",
        },
        {
          type: "p",
          text: "We keep the address you use and whatever you send. Do not send extra personal data we do not need.",
        },
        {
          type: "h3",
          text: "When you visit the site",
        },
        {
          type: "ul",
          items: [
            "Technical logs from our host (IP address, browser, device, pages, time) — needed to run and protect the site",
            "Your language choice (EN/SR), stored only in your browser (localStorage)",
          ],
        },
        {
          type: "p",
          text: "This website does not use advertising pixels, marketing cookies, or analytics tools. We do not collect GPS, ELD, voice, or load data here.",
        },
      ],
    },
    {
      id: "bases",
      title: "4. Why we use it, and the legal basis",
      blocks: [
        {
          type: "p",
          text: "We only process personal data when GDPR Article 6 allows it:",
        },
        {
          type: "ul",
          items: [
            "Demo booking and follow-up: steps before a contract (Art. 6(1)(b)).",
            "Answering email: our legitimate interest to reply, or steps before a contract (Art. 6(1)(f) or 6(1)(b)).",
            "Hosting, security, and abuse prevention: legitimate interest (Art. 6(1)(f)).",
            "Remembering language: legitimate interest in showing the site in your language (Art. 6(1)(f)). This is not used to identify you.",
          ],
        },
        {
          type: "p",
          text: "We do not send marketing email unless you clearly ask for it. If we ever do, we will use consent (Art. 6(1)(a)), and you can withdraw it any time.",
        },
        {
          type: "p",
          text: "You may object to processing based on legitimate interest. Email hello@zonikai.com. If we have no overriding grounds, we will stop.",
        },
      ],
    },
    {
      id: "sharing",
      title: "5. Who we share it with",
      blocks: [
        {
          type: "p",
          text: "We do not sell personal data. We share it only with people and tools that need it to run the site or a demo:",
        },
        {
          type: "ul",
          items: [
            "Cal.com — demo scheduling (see cal.com/privacy)",
            "Netlify — website hosting (see netlify.com/privacy)",
            "Email providers — if you write to hello@zonikai.com",
            "Professional advisers or authorities — only if the law requires it",
          ],
        },
        {
          type: "p",
          text: "These providers act as processors or separate controllers for their own systems. They may only use the data as their terms and our instructions allow.",
        },
      ],
    },
    {
      id: "transfers",
      title: "6. Transfers outside the EEA / Serbia",
      blocks: [
        {
          type: "p",
          text: "Some providers (including Cal.com and Netlify) may process data in the United States or other countries. Where GDPR or Serbian law requires a safeguard, we rely on an adequacy decision or Standard Contractual Clauses, plus extra measures where needed.",
        },
        {
          type: "p",
          text: "You can ask us for more detail on these safeguards at hello@zonikai.com.",
        },
      ],
    },
    {
      id: "retention",
      title: "7. How long we keep it",
      blocks: [
        {
          type: "ul",
          items: [
            "Demo bookings: as long as needed to hold the call and a reasonable follow-up, usually up to 12 months, unless you become a customer or ask us to delete sooner.",
            "Email: while the thread is active, then a limited archive for legal or accounting reasons.",
            "Server logs: a short period, usually under 90 days, unless we need them to investigate an incident.",
            "Language setting: until you clear site data in your browser.",
          ],
        },
        {
          type: "p",
          text: "When we no longer need the data, we delete it or strip it so it no longer identifies you.",
        },
      ],
    },
    {
      id: "rights",
      title: "8. Your rights",
      blocks: [
        {
          type: "p",
          text: "If GDPR or Serbian data-protection law applies to you, you can:",
        },
        {
          type: "ul",
          items: [
            "Get a copy of your data (access)",
            "Fix data that is wrong (rectification)",
            "Ask us to delete it (erasure), where the law allows",
            "Ask us to limit how we use it (restriction)",
            "Receive it in a portable format (portability), where it applies",
            "Object to processing based on legitimate interest",
            "Withdraw consent, if we ever rely on it — this does not undo past lawful use",
            "File a complaint with a supervisory authority",
          ],
        },
        {
          type: "p",
          text: "This website does not make automated decisions that produce legal or similarly significant effects about you (GDPR Art. 22).",
        },
        {
          type: "p",
          text: "To use these rights, email hello@zonikai.com. Tell us what you want and enough detail to find your data (for example the email you used to book). We may need to confirm who you are. We respond within one month, or we will tell you if we need more time.",
        },
      ],
    },
    {
      id: "authority",
      title: "9. Complaints",
      blocks: [
        {
          type: "p",
          text: "You can complain to your local data-protection authority. You do not have to talk to us first, but we would like the chance to help.",
        },
        {
          type: "ul",
          items: [
            "EEA: your national authority, listed at edpb.europa.eu",
            "Serbia: the Commissioner for Information of Public Importance and Personal Data Protection (poverenik.rs)",
            "United Kingdom: the Information Commissioner’s Office (ico.org.uk)",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "10. Cookies and similar storage",
      blocks: [
        {
          type: "p",
          text: "You can browse this site without advertising cookies. We use only what we need to run the page:",
        },
        {
          type: "ul",
          items: [
            "Cal.com may set cookies in the booking embed so you can pick a time. Those cookies are needed for that feature. See Cal.com’s policy for details.",
            "localStorage key zonik-locale remembers EN or SR. It is not a cookie and is not sent to our servers.",
          ],
        },
        {
          type: "p",
          text: "Your browser can block cookies or clear site data. If you block Cal.com cookies, the calendar may not work. You can still email hello@zonikai.com.",
        },
      ],
    },
    {
      id: "security",
      title: "11. Security",
      blocks: [
        {
          type: "p",
          text: "We use HTTPS, limit who can see personal data, and work with hosts that apply their own security controls. No online service is fully risk-free. If we learn of a breach that must be reported, we will follow the law, including notice to authorities and to you where required.",
        },
      ],
    },
    {
      id: "children",
      title: "12. Children",
      blocks: [
        {
          type: "p",
          text: "This site is for business users in trucking. It is not aimed at children under 16. We do not knowingly collect their data. If you think we have, email us and we will delete it.",
        },
      ],
    },
    {
      id: "changes",
      title: "13. Changes",
      blocks: [
        {
          type: "p",
          text: "We may update this policy when the site, the law, or our tools change. The new version will be posted on this page with a new “last updated” date. If a change is material, we will make it easy to see on the site.",
        },
      ],
    },
  ],
};

const sr: PrivacyCopy = {
  label: "Pravno",
  title: "Politika privatnosti",
  titleAccent: "Kako tretiramo tvoje podatke.",
  updated: "Poslednja izmena: 14. avgust 2026.",
  intro:
    "Ova politika objašnjava kako Zonik AI prikuplja i koristi lične podatke na zonikai.com. Pisana je u skladu sa GDPR-om i Zakonom o zaštiti podataka o ličnosti Republike Srbije. Pitanja šalji na hello@zonikai.com.",
  contactCta: "Zahteve u vezi sa podacima šalji na hello@zonikai.com",
  sections: [
    {
      id: "who",
      title: "1. Ko je odgovoran",
      blocks: [
        {
          type: "p",
          text: "Rukovalac podacima za ovaj sajt je Lead Agents LLC, društvo sa ograničenom odgovornošću iz Wyoming-a koje posluje kao Zonik AI („Zonik“, „mi“), i vodi zonikai.com i app.zonikai.com. Registrovana adresa: 30 North Gould St, Sheridan, WY 82801, USA.",
        },
        {
          type: "p",
          text: "Zahteve u vezi sa privatnošću šalji na hello@zonikai.com. Odgovaramo u roku od mesec dana.",
        },
      ],
    },
    {
      id: "scope",
      title: "2. Šta ova politika pokriva",
      blocks: [
        {
          type: "p",
          text: "Ova politika važi za javni sajt zonikai.com: pregledanje, izbor jezika, zakazivanje dema i mejlove koje nam pošalješ.",
        },
        {
          type: "p",
          text: "Zonik proizvod (GPS, TMS/ELD, AI pozivi vozačima) je druga priča. Tu je tvoja firma obično rukovalac, a mi obrađivač po ugovoru. Ako si vozač i prevoznik koristi Zonik, prvo se javi toj firmi.",
        },
      ],
    },
    {
      id: "data",
      title: "3. Koje podatke prikupljamo",
      blocks: [
        {
          type: "h3",
          text: "Kad zakažeš demo",
        },
        {
          type: "p",
          text: "Zakazivanje ide preko Cal.com. Možemo da dobijemo:",
        },
        {
          type: "ul",
          items: [
            "Ime i imejl",
            "Naziv firme, ako ga uneseš",
            "Vremensku zonu i izabrani termin",
            "Napomene koje upišeš",
            "Podatke o sastanku (vreme, status, izostanak)",
          ],
        },
        {
          type: "h3",
          text: "Kad nam pišeš mejl",
        },
        {
          type: "p",
          text: "Čuvamo adresu sa koje pišeš i sadržaj poruke. Ne šalji podatke koji nam nisu potrebni.",
        },
        {
          type: "h3",
          text: "Kad otvoriš sajt",
        },
        {
          type: "ul",
          items: [
            "Tehnički logovi hostinga (IP adresa, pregledač, uređaj, stranice, vreme) — da sajt radi i da bude bezbedan",
            "Izbor jezika (EN/SR), samo u tvom pregledaču (localStorage)",
          ],
        },
        {
          type: "p",
          text: "Na ovom sajtu nema reklamnih piksela, marketinških kolačića ni alata za analitiku. Ovde ne prikupljamo GPS, ELD, glas ni podatke o tovaru.",
        },
      ],
    },
    {
      id: "bases",
      title: "4. Zašto ih koristimo i na kom osnovu",
      blocks: [
        {
          type: "p",
          text: "Lične podatke obrađujemo samo kad to GDPR član 6 dozvoljava:",
        },
        {
          type: "ul",
          items: [
            "Zakazivanje dema i dogovor oko njega: koraci pre ugovora (čl. 6(1)(b)).",
            "Odgovor na mejl: naš legitimni interes da odgovorimo, ili koraci pre ugovora (čl. 6(1)(f) ili 6(1)(b)).",
            "Hosting, bezbednost i sprečavanje zloupotrebe: legitimni interes (čl. 6(1)(f)).",
            "Pamćenje jezika: legitimni interes da sajt bude na tvom jeziku (čl. 6(1)(f)). Time te ne identifikujemo.",
          ],
        },
        {
          type: "p",
          text: "Ne šaljemo marketinške mejlove osim ako to jasno zatražiš. Ako to ikad uvedemo, koristićemo pristanak (čl. 6(1)(a)), koji možeš da povučeš u svakom trenutku.",
        },
        {
          type: "p",
          text: "Možeš da se usprotiviš obradi na osnovu legitimnog interesa. Piši na hello@zonikai.com. Ako nemamo jači osnov, staćemo.",
        },
      ],
    },
    {
      id: "sharing",
      title: "5. Kome ih dajemo",
      blocks: [
        {
          type: "p",
          text: "Ne prodajemo lične podatke. Delimo ih samo sa onima koj su potrebni da sajt i demo rade:",
        },
        {
          type: "ul",
          items: [
            "Cal.com — zakazivanje dema (cal.com/privacy)",
            "Netlify — hosting sajta (netlify.com/privacy)",
            "Imejl servisi — ako pišeš na hello@zonikai.com",
            "Savetnici ili organi — samo ako to zakon nalaže",
          ],
        },
        {
          type: "p",
          text: "Ovi pružaoci su obrađivači ili samostalni rukovaoci za svoje sisteme. Podatke smeju da koriste samo po svojim uslovima i našim uputstvima.",
        },
      ],
    },
    {
      id: "transfers",
      title: "6. Prenos van EGP-a / Srbije",
      blocks: [
        {
          type: "p",
          text: "Neki pružaoci (uključujući Cal.com i Netlify) mogu da obrađuju podatke u SAD ili drugim zemljama. Gde GDPR ili srpski zakon traže zaštitu, oslanjamo se na odluku o adekvatnosti ili standardne ugovorne klauzule, plus dodatne mere gde treba.",
        },
        {
          type: "p",
          text: "Više o ovim merama možeš da pitaš na hello@zonikai.com.",
        },
      ],
    },
    {
      id: "retention",
      title: "7. Koliko dugo čuvamo podatke",
      blocks: [
        {
          type: "ul",
          items: [
            "Zakazani demoi: dok se sastanak održi i dok traje razuman follow-up, obično do 12 meseci, osim ako postaneš klijent ili zatražiš brisanje ranije.",
            "Imejlovi: dok je prepiska aktivna, zatim ograničena arhiva zbog zakona ili knjigovodstva.",
            "Server logovi: kratko, obično ispod 90 dana, osim ako trebaju zbog incidenta.",
            "Izbor jezika: dok ne obrišeš podatke sajta u pregledaču.",
          ],
        },
        {
          type: "p",
          text: "Kad nam podaci više ne trebaju, brišemo ih ili ih svedemo tako da se iz njih ne vidi ko si.",
        },
      ],
    },
    {
      id: "rights",
      title: "8. Tvoja prava",
      blocks: [
        {
          type: "p",
          text: "Ako se na tebe primenjuje GDPR ili srpski zakon o zaštiti podataka, možeš da:",
        },
        {
          type: "ul",
          items: [
            "Dobiješ kopiju svojih podataka (pravo na pristup)",
            "Ispraviš netačne podatke",
            "Tražiš brisanje, gde zakon to dozvoljava",
            "Tražiš da ograničimo korišćenje",
            "Dobiješ podatke u prenosivom obliku, gde to važi",
            "Prigovoriš obradi na osnovu legitimnog interesa",
            "Povuciš pristanak, ako ga ikad budemo koristili — to ne poništava raniju zakonitu obradu",
            "Podneseš pritužbu nadzornom organu",
          ],
        },
        {
          type: "p",
          text: "Ovaj sajt ne donosi automatizovane odluke koje proizvode pravno ili slično značajno dejstvo po tebe (GDPR čl. 22).",
        },
        {
          type: "p",
          text: "Za ostvarivanje prava piši na hello@zonikai.com. Reci šta želiš i daj dovoljno podataka da te nađemo (npr. imejl kojim si zakazao demo). Možda ćemo morati da potvrdimo identitet. Odgovaramo u roku od mesec dana, ili ćemo reći ako nam treba više vremena.",
        },
      ],
    },
    {
      id: "authority",
      title: "9. Pritužbe",
      blocks: [
        {
          type: "p",
          text: "Možeš da se žališ lokalnom organu za zaštitu podataka. Ne moraš prvo nama, ali volimo da stignemo da pomognemo.",
        },
        {
          type: "ul",
          items: [
            "EGP: nacionalni organ, spisak na edpb.europa.eu",
            "Srbija: Poverenik za informacije od javnog značaja i zaštitu podataka o ličnosti (poverenik.rs)",
            "Ujedinjeno Kraljevstvo: Information Commissioner’s Office (ico.org.uk)",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "10. Kolačići i slično skladištenje",
      blocks: [
        {
          type: "p",
          text: "Sajt možeš da gledaš bez reklamnih kolačića. Koristimo samo ono što treba da stranica radi:",
        },
        {
          type: "ul",
          items: [
            "Cal.com može da postavi kolačiće u kalendaru da bi mogao da izabereš termin. Ti kolačići su potrebni za tu funkciju. Detalje vidi u politici Cal.com-a.",
            "localStorage ključ zonik-locale pamti EN ili SR. To nije kolačić i ne šalje se našim serverima.",
          ],
        },
        {
          type: "p",
          text: "U pregledaču možeš da blokiraš kolačiće ili obrišeš podatke sajta. Ako blokiraš Cal.com, kalendar možda neće raditi. I dalje možeš da pišeš na hello@zonikai.com.",
        },
      ],
    },
    {
      id: "security",
      title: "11. Bezbednost",
      blocks: [
        {
          type: "p",
          text: "Koristimo HTTPS, ograničavamo ko vidi lične podatke i radimo sa hostingom koji ima svoje mere zaštite. Nijedna onlajn usluga nije bez rizika. Ako saznamo za incident koji mora da se prijavi, postupićemo po zakonu, uključujući obaveštenje organa i tebe gde je to obavezno.",
        },
      ],
    },
    {
      id: "children",
      title: "12. Deca",
      blocks: [
        {
          type: "p",
          text: "Sajt je namenjen firmama u transportu. Nije za decu mlađu od 16 godina. Namerno ne prikupljamo njihove podatke. Ako misliš da ih imamo, javi nam da ih obrišemo.",
        },
      ],
    },
    {
      id: "changes",
      title: "13. Izmene",
      blocks: [
        {
          type: "p",
          text: "Politiku možemo da ažuriramo kad se promeni sajt, zakon ili alati koje koristimo. Nova verzija ide na ovu stranicu, sa novim datumom. Ako je izmena bitna, to će na sajtu biti lako da se vidi.",
        },
      ],
    },
  ],
};

export const privacyCopy: Record<Locale, PrivacyCopy> = { en, sr };
