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
  updated: "Last updated: 19 August 2026",
  intro:
    "Zonik AI collects and uses personal data. This policy explains what we collect on zonikai.com, and how we process driver and load data as a processor when a company uses the product. It is written to meet the EU GDPR and Serbia’s Law on Personal Data Protection. If you have questions, email hello@zonikai.com.",
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
          type: "p",
          text: "We collect personal data. On this website that includes the information below. In the product, we also process driver, truck, and load data as a processor for your company — see section 2.",
        },
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
            "Google Tag Manager may collect page views, device and browser data, and similar measurement signals (see Google’s privacy policy)",
          ],
        },
        {
          type: "p",
          text: "We do not collect GPS, ELD, voice, or load data on the public site. Google Tag Manager loads with the page.",
        },
      ],
    },
    {
      id: "ai",
      title: "4. We use AI",
      blocks: [
        {
          type: "p",
          text: "We use AI. The public website does not make AI decisions about you as a visitor. The Zonik product does use AI: it can place voice calls to drivers your company added, ask for load status, and summarize what it hears for dispatch.",
        },
        {
          type: "p",
          text: "When we do that, phone numbers, call audio, transcripts, and related load facts may be sent to voice and language-model providers so the call can happen and the status can be written back to your board. Those providers currently include Twilio and Vapi for voice, and a language-model provider that drafts or summarizes call content.",
        },
        {
          type: "p",
          text: "AI can be wrong or incomplete. Zonik output is a dispatch aid. It is not the only check before a pickup, delivery, or safety decision. Your company remains the controller for driver data in the product.",
        },
      ],
    },
    {
      id: "bases",
      title: "5. Why we use it, and the legal basis",
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
            "Google Tag Manager and tags it loads: legitimate interest in understanding how the public site is used (Art. 6(1)(f)). You can object by emailing hello@zonikai.com or by blocking cookies in your browser.",
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
      title: "6. Who we share it with",
      blocks: [
        {
          type: "p",
          text: "We do not sell personal data. We share it only with people and tools that need it to run the site, a demo, or the Service:",
        },
        {
          type: "ul",
          items: [
            "Cal.com — demo scheduling (see cal.com/privacy)",
            "Netlify — website hosting (see netlify.com/privacy)",
            "Google Tag Manager / Google — site measurement (see policies.google.com/privacy)",
            "Twilio — voice calls in the product (see twilio.com/legal/privacy)",
            "Vapi — AI voice agents in the product (see vapi.ai/privacy)",
            "A language-model provider — drafts or summarizes call content in the product",
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
      title: "7. Transfers outside the EEA / Serbia",
      blocks: [
        {
          type: "p",
          text: "Some providers (including Cal.com, Netlify, Google, Twilio, and Vapi) may process data in the United States or other countries. Where GDPR or Serbian law requires a safeguard, we rely on an adequacy decision or Standard Contractual Clauses, plus extra measures where needed.",
        },
        {
          type: "p",
          text: "You can ask us for more detail on these safeguards at hello@zonikai.com.",
        },
      ],
    },
    {
      id: "retention",
      title: "8. How long we keep it, and how to delete it",
      blocks: [
        {
          type: "ul",
          items: [
            "Demo bookings: as long as needed to hold the call and a reasonable follow-up, usually up to 12 months, unless you become a customer or ask us to delete sooner.",
            "Email: while the thread is active, then a limited archive for legal or accounting reasons.",
            "Server logs: a short period, usually under 90 days, unless we need them to investigate an incident.",
            "Language setting: until you clear site data in your browser.",
            "Product data (GPS, loads, driver numbers, call audio and transcripts): for as long as the customer contract says. When that ends, or when the customer asks us to delete it, we delete it from our systems and tell our processors to do the same, except where the law requires a short archive.",
          ],
        },
        {
          type: "p",
          text: "To ask us to delete data we control (for example a demo booking or an email you sent), write to hello@zonikai.com. Say what you want deleted and how we can find it. Where the law allows, we delete it. We do not keep copies we promised to delete after that request is done, except a legal or security log that no longer holds the content.",
        },
        {
          type: "p",
          text: "If you are a driver and a carrier uses Zonik, that company is usually the controller. Ask them first. We will help them delete or correct data we hold as their processor.",
        },
      ],
    },
    {
      id: "rights",
      title: "9. Your rights",
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
      title: "10. Complaints",
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
      title: "11. Cookies and similar storage",
      blocks: [
        {
          type: "p",
          text: "A short notice on the site tells you about measurement and storage. We use:",
        },
        {
          type: "ul",
          items: [
            "localStorage key zonik-site-consent remembers that you accepted this notice. It is not sent to our servers.",
            "localStorage key zonik-locale remembers EN or SR. It is not a cookie and is not sent to our servers.",
            "Google Tag Manager (GTM-WR2NJPC3) loads with the page. It may set cookies and load other Google or third-party tags configured in GTM. See policies.google.com/privacy.",
            "Cal.com may set cookies in the booking calendar after you accept, so you can pick a time. Those cookies are needed for that feature. See Cal.com’s policy for details. Until you accept, we do not load the calendar.",
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
      title: "12. Security",
      blocks: [
        {
          type: "p",
          text: "We use HTTPS, limit who can see personal data, and work with hosts that apply their own security controls. Customer Data in the product — including GPS, phone numbers, and call recordings — is not stored in a public bucket or at a public URL. No online service is fully risk-free. If we learn of a breach that must be reported, we will follow the law, including notice to authorities and to you where required.",
        },
      ],
    },
    {
      id: "children",
      title: "13. Children",
      blocks: [
        {
          type: "p",
          text: "This site is for business users in trucking. It is not aimed at children under 16. We do not knowingly collect their data. If you think we have, email us and we will delete it.",
        },
      ],
    },
    {
      id: "changes",
      title: "14. Changes",
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
  updated: "Poslednja izmena: 19. avgust 2026.",
  intro:
    "Zonik AI prikuplja i koristi lične podatke. Ova politika objašnjava šta skupljamo na zonikai.com i kako, kao obrađivač, obrađujemo podatke vozača i tovara kad firma koristi proizvod. Pisana je u skladu sa GDPR-om i Zakonom o zaštiti podataka o ličnosti Republike Srbije. Pitanja šalji na hello@zonikai.com.",
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
          type: "p",
          text: "Prikupljamo lične podatke. Na ovom sajtu to su podaci ispod. U proizvodu, kao obrađivač za tvoju firmu, obrađujemo i podatke vozača, kamiona i tovara — vidi odeljak 2.",
        },
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
            "Google Tag Manager može da skuplja preglede stranica, podatke o uređaju i pregledaču i slične signale merenja (vidi Googleovu politiku privatnosti)",
          ],
        },
        {
          type: "p",
          text: "Na javnom sajtu ne prikupljamo GPS, ELD, glas ni podatke o tovaru. Google Tag Manager se učitava sa stranicom.",
        },
      ],
    },
    {
      id: "ai",
      title: "4. Koristimo AI",
      blocks: [
        {
          type: "p",
          text: "Koristimo AI. Javni sajt ne donosi AI odluke o tebi kao posetiocu. Zonik proizvod AI koristi: može da zove vozače koje je firma ubacila, da pita za status tovara i da to sažme za dispeč.",
        },
        {
          type: "p",
          text: "Tada broj, snimak poziva, transkript i povezani podaci o tovaru mogu da idu provajderima glasa i jezičkog modela, da bi se poziv desio i da bi status stigao na tablu. Za glas trenutno koristimo Twilio i Vapi, a jezički model piše ili sažima sadržaj poziva.",
        },
        {
          type: "p",
          text: "AI može da pogreši ili da nešto preskoči. Zonik je pomoć dispeču. Nije jedina provera pre utovara, istovara ili bezbednosne odluke. Za podatke vozača u proizvodu i dalje je rukovalac tvoja firma.",
        },
      ],
    },
    {
      id: "bases",
      title: "5. Zašto ih koristimo i na kom osnovu",
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
            "Google Tag Manager i tagovi koje on učita: legitimni interes da vidimo kako se javni sajt koristi (čl. 6(1)(f)). Možeš da se usprotiviš mejlom na hello@zonikai.com ili blokiranjem kolačića u pregledaču.",
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
      title: "6. Kome ih dajemo",
      blocks: [
        {
          type: "p",
          text: "Ne prodajemo lične podatke. Delimo ih samo sa onima koji su potrebni da sajt, demo ili Servis rade:",
        },
        {
          type: "ul",
          items: [
            "Cal.com — zakazivanje dema (cal.com/privacy)",
            "Netlify — hosting sajta (netlify.com/privacy)",
            "Google Tag Manager / Google — merenje sajta (policies.google.com/privacy)",
            "Twilio — glasovni pozivi u proizvodu (twilio.com/legal/privacy)",
            "Vapi — AI glasovni agenti u proizvodu (vapi.ai/privacy)",
            "Provajder jezičkog modela — piše ili sažima sadržaj poziva u proizvodu",
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
      title: "7. Prenos van EGP-a / Srbije",
      blocks: [
        {
          type: "p",
          text: "Neki pružaoci (uključujući Cal.com, Netlify, Google, Twilio i Vapi) mogu da obrađuju podatke u SAD ili drugim zemljama. Gde GDPR ili srpski zakon traže zaštitu, oslanjamo se na odluku o adekvatnosti ili standardne ugovorne klauzule, plus dodatne mere gde treba.",
        },
        {
          type: "p",
          text: "Više o ovim merama možeš da pitaš na hello@zonikai.com.",
        },
      ],
    },
    {
      id: "retention",
      title: "8. Koliko dugo čuvamo podatke i kako se brišu",
      blocks: [
        {
          type: "ul",
          items: [
            "Zakazani demoi: dok se sastanak održi i dok traje razuman follow-up, obično do 12 meseci, osim ako postaneš klijent ili zatražiš brisanje ranije.",
            "Imejlovi: dok je prepiska aktivna, zatim ograničena arhiva zbog zakona ili knjigovodstva.",
            "Server logovi: kratko, obično ispod 90 dana, osim ako trebaju zbog incidenta.",
            "Izbor jezika: dok ne obrišeš podatke sajta u pregledaču.",
            "Podaci u proizvodu (GPS, tovari, brojevi vozača, snimci i transkripti): onoliko koliko piše u ugovoru sa klijentom. Kad ugovor prestane, ili kad klijent zatraži brisanje, brišemo ih iz naših sistema i kažemo obrađivačima da urade isto, osim kratke arhive koju zakon traži.",
          ],
        },
        {
          type: "p",
          text: "Da obrišemo podatke kojima mi rukujemo (npr. zakazan demo ili mejl koji si poslao), piši na hello@zonikai.com. Reci šta da se obriše i kako da te nađemo. Gde zakon dozvoljava, brišemo. Posle toga ne držimo kopije koje smo rekli da ćemo obrisati, osim pravnog ili bezbednosnog zapisa u kom više nema samog sadržaja.",
        },
        {
          type: "p",
          text: "Ako si vozač i prevoznik koristi Zonik, ta firma je obično rukovalac. Prvo se javi njima. Mi ćemo im pomoći da obrišu ili isprave ono što držimo kao njihov obrađivač.",
        },
      ],
    },
    {
      id: "rights",
      title: "9. Tvoja prava",
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
      title: "10. Pritužbe",
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
      title: "11. Kolačići i slično skladištenje",
      blocks: [
        {
          type: "p",
          text: "Kratko obaveštenje na sajtu kaže šta merimo i šta čuvamo. Koristimo:",
        },
        {
          type: "ul",
          items: [
            "localStorage ključ zonik-site-consent pamti da si prihvatio ovo obaveštenje. Ne šalje se našim serverima.",
            "localStorage ključ zonik-locale pamti EN ili SR. To nije kolačić i ne šalje se našim serverima.",
            "Google Tag Manager (GTM-WR2NJPC3) se učitava sa stranicom. Može da postavi kolačiće i da učita druge Google ili treće tagove podešene u GTM-u. Vidi policies.google.com/privacy.",
            "Cal.com može da postavi kolačiće u kalendaru posle prihvatanja, da bi mogao da izabereš termin. Ti kolačići su potrebni za tu funkciju. Detalje vidi u politici Cal.com-a. Dok ne prihvatiš, kalendar ne učitavamo.",
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
      title: "12. Bezbednost",
      blocks: [
        {
          type: "p",
          text: "Koristimo HTTPS, ograničavamo ko vidi lične podatke i radimo sa hostingom koji ima svoje mere zaštite. Podaci klijenta u proizvodu — GPS, telefoni, snimci poziva — nisu na javnom bucketu niti na javnom URL-u. Nijedna onlajn usluga nije bez rizika. Ako saznamo za incident koji mora da se prijavi, postupićemo po zakonu, uključujući obaveštenje organa i tebe gde je to obavezno.",
        },
      ],
    },
    {
      id: "children",
      title: "13. Deca",
      blocks: [
        {
          type: "p",
          text: "Sajt je namenjen firmama u transportu. Nije za decu mlađu od 16 godina. Namerno ne prikupljamo njihove podatke. Ako misliš da ih imamo, javi nam da ih obrišemo.",
        },
      ],
    },
    {
      id: "changes",
      title: "14. Izmene",
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
