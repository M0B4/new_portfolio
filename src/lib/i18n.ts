import { basePath as base } from "./url";

export const languages = ["de", "en"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "de";

export const htmlLang: Record<Lang, string> = { de: "de", en: "en" };
export const ogLocale: Record<Lang, string> = { de: "de_DE", en: "en_US" };

/** Localized URL segments. Legal pages exist in German only. */
export const routeSegments = {
  client: { de: "kunden", en: "clients" },
  category: { de: "kategorien", en: "categories" },
} as const;

export type Alternates = Partial<Record<Lang, string>>;

/** Builds a base-aware path, prefixed with `/en/` for English. */
export const localizePath = (lang: Lang, path = "") => {
  const clean = path.replace(/^\/+/, "");
  return `${base}${lang === "en" ? "en/" : ""}${clean}`;
};

export const clientPath = (lang: Lang, slug: string) =>
  localizePath(lang, `${routeSegments.client[lang]}/${slug}/`);

export const categoryPath = (lang: Lang, category: string) =>
  localizePath(lang, `${routeSegments.category[lang]}/${category}/`);

export const legalPath = (page: "impressum" | "datenschutz") => `${base}${page}/`;

/** Picks the English value when available, otherwise falls back to German. */
export const pick = (lang: Lang, de: string, en?: string) => (lang === "en" && en ? en : de);

export const ui = {
  de: {
    skip: "Zum Inhalt springen",
    navLabel: "Hauptnavigation",
    navPortfolio: "Portfolio",
    navAbout: "Profil",
    navContact: "Kontakt",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    switchLanguage: "Switch to English",
    themeToLight: "Hellen Modus aktivieren",
    themeToDark: "Dunklen Modus aktivieren",
    homeLabel: "Moritz Barz – Startseite",
    clientsKicker: "Kunden",
    clientsTitle: "Arbeiten nach Kontext.",
    clientsText:
      "Festival, Clubnacht, Einsatzort oder Community: Der Einstieg führt direkt zu den passenden Projekten.",
    clientsListLabel: "Kunden und Kontexte",
    projectCount: (n: number) => (n === 1 ? "1 Arbeit" : `${n} Arbeiten`),
    viewWorkFor: (label: string) => `Arbeiten für ${label} ansehen`,
    fieldsKicker: "Arbeitsarten",
    fieldsTitle: "Ein Portfolio, mehrere Formen.",
    viewField: (label: string) => `${label} ansehen`,
    profileKicker: "Profil",
    profileTitle: "Gestaltung mit Druck, Kante und Funktion.",
    profileText:
      "Ich gestalte für Orte, an denen Motive schnell greifen müssen: auf Stoff, Plakat, Bühne, Ausrüstung und im Feed.",
    servicesTitle: "Leistungen",
    portraitAlt: "Gitarrist mit Festivalbändchen im Bühnenlicht",
    featuredLabel: "Ausgewählte Arbeiten",
    field: "Arbeitsart",
    workFor: (label: string) => `${label} Arbeiten`,
    emptyClient: "Arbeiten für diesen Kontext werden noch kuratiert.",
    filterLabel: "Nach Arbeitsart filtern",
    filterAll: "Alle",
    breadcrumb: "Brotkrumen-Navigation",
    home: "Start",
    moreClients: "Weitere Kunden",
    moreFields: "Weitere Arbeitsarten",
    openProject: (title: string) => `${title} vergrößert ansehen`,
    lightboxClose: "Schließen",
    lightboxPrev: "Vorherige Arbeit",
    lightboxNext: "Nächste Arbeit",
    contactKicker: "Kontakt",
    contactTitle: "Projekt anfragen",
    contactText: "Kurzer Kontext reicht. Ich melde mich mit einer klaren Einschätzung.",
    formName: "Name / Brand",
    formEmail: "E-Mail",
    formType: "Projektart",
    formTypeChoose: "Bitte wählen",
    formTypeOther: "Sonstiges",
    formMessage: "Projekt",
    formSend: "Senden",
    formSending: "Wird gesendet …",
    formOk: "Nachricht gesendet. Ich melde mich bald.",
    formBad: "Leider ein Fehler beim Senden. Bitte erneut versuchen.",
    formInvalid: "Bitte die markierten Felder ausfüllen.",
    formRequired: "Pflichtfeld",
    formEmailInvalid: "Bitte eine gültige E-Mail-Adresse angeben.",
    formPrivacy: "Mit dem Absenden werden deine Angaben zur Bearbeitung der Anfrage an Formspree übermittelt. Mehr in der",
    privacy: "Datenschutzerklärung",
    imprint: "Impressum",
    footerNav: "Fußzeile",
    social: "Social Media",
    heroCtaPrimary: "Projekt anfragen",
    heroCtaSecondary: "Arbeiten ansehen",
    heroSpec: "Grafikdesign / Merch / Eventdesign / 3D-Print",
    navWork: "Arbeiten",
    workKicker: "Ausgewählte Arbeiten",
    workTitle: "Gedruckt, getragen, benutzt.",
    trustLabel: "Gearbeitet für",
    highlightKicker: "Im Fokus",
    highlightCta: (label: string) => `Alle Arbeiten für ${label}`,
    latestKicker: "Neu",
    latestTitle: "Zuletzt fertig geworden.",
    processKicker: "Ablauf",
    processTitle: "Vom ersten Satz bis zur Druckdatei.",
    processSteps: [
      { title: "Anfrage", text: "Du schilderst kurz Anlass, Format und Termin. Ich melde mich mit einer ehrlichen Einschätzung." },
      { title: "Entwurf", text: "Erste Richtung als Skizze oder Layout – rau genug zum Diskutieren, klar genug zum Entscheiden." },
      { title: "Feinschliff", text: "Details, Typografie und Farben werden auf Druckverfahren und Material abgestimmt." },
      { title: "Druckdaten", text: "Saubere Daten für Siebdruck, Digitaldruck oder 3D-Druck – auf Wunsch inklusive Abstimmung mit der Druckerei." },
    ],
    ctaTitle: "Dein Motiv. Laut genug?",
    ctaText: "Poster, Shirt, Bändchen oder Bauteil – erzähl mir, was es werden soll.",
    emailLabel: "E-Mail",
    phoneLabel: "Telefon",
    backToTop: "Nach oben",
    imageCount: (current: number, total: number) => `Bild ${current} / ${total}`,
    notFoundTitle: "Seite nicht gefunden",
    notFoundText: "Diese Seite existiert nicht (mehr). Vielleicht hilft der Weg zurück zum Portfolio.",
    notFoundCta: "Zur Startseite",
  },
  en: {
    skip: "Skip to content",
    navLabel: "Main navigation",
    navPortfolio: "Portfolio",
    navAbout: "About",
    navContact: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchLanguage: "Auf Deutsch wechseln",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    homeLabel: "Moritz Barz – home",
    clientsKicker: "Clients",
    clientsTitle: "Work by context.",
    clientsText:
      "Festival, club night, field use or community: each entry leads straight to the matching projects.",
    clientsListLabel: "Clients and contexts",
    projectCount: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
    viewWorkFor: (label: string) => `View work for ${label}`,
    fieldsKicker: "Fields",
    fieldsTitle: "One portfolio, several forms.",
    viewField: (label: string) => `View ${label}`,
    profileKicker: "Profile",
    profileTitle: "Design with impact, edge and function.",
    profileText:
      "I design for places where visuals need to hit fast: on fabric, posters, stages, equipment and feeds.",
    servicesTitle: "Services",
    portraitAlt: "Guitarist with festival wristbands in stage light",
    featuredLabel: "Selected work",
    field: "Field",
    workFor: (label: string) => `${label} work`,
    emptyClient: "Work for this context is still being curated.",
    filterLabel: "Filter by field",
    filterAll: "All",
    breadcrumb: "Breadcrumb",
    home: "Home",
    moreClients: "More clients",
    moreFields: "More fields",
    openProject: (title: string) => `View ${title} enlarged`,
    lightboxClose: "Close",
    lightboxPrev: "Previous project",
    lightboxNext: "Next project",
    contactKicker: "Contact",
    contactTitle: "Start a project",
    contactText: "A short context is enough. I will get back with a clear assessment.",
    formName: "Name / Brand",
    formEmail: "Email",
    formType: "Project type",
    formTypeChoose: "Please choose",
    formTypeOther: "Other",
    formMessage: "Project",
    formSend: "Send",
    formSending: "Sending …",
    formOk: "Message sent. I will get back to you soon.",
    formBad: "Something went wrong. Please try again.",
    formInvalid: "Please fill in the highlighted fields.",
    formRequired: "Required",
    formEmailInvalid: "Please enter a valid email address.",
    formPrivacy: "Submitting sends your details to Formspree to process your request. More in the",
    privacy: "privacy policy (German)",
    imprint: "Legal notice (German)",
    footerNav: "Footer",
    social: "Social media",
    heroCtaPrimary: "Start a project",
    heroCtaSecondary: "View work",
    heroSpec: "Graphic design / Merch / Event design / 3D print",
    navWork: "Work",
    workKicker: "Selected work",
    workTitle: "Printed, worn, used.",
    trustLabel: "Worked for",
    highlightKicker: "Spotlight",
    highlightCta: (label: string) => `All work for ${label}`,
    latestKicker: "New",
    latestTitle: "Recently finished.",
    processKicker: "Process",
    processTitle: "From the first line to the print file.",
    processSteps: [
      { title: "Request", text: "Briefly describe occasion, format and deadline. I will reply with an honest assessment." },
      { title: "Draft", text: "A first direction as sketch or layout – rough enough to discuss, clear enough to decide." },
      { title: "Refinement", text: "Details, typography and colours are tuned to the printing method and material." },
      { title: "Print files", text: "Clean files for screen printing, digital printing or 3D printing – coordinated with the printer if needed." },
    ],
    ctaTitle: "Your motif. Loud enough?",
    ctaText: "Poster, shirt, wristband or part – tell me what it should become.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    backToTop: "Back to top",
    imageCount: (current: number, total: number) => `Image ${current} / ${total}`,
    notFoundTitle: "Page not found",
    notFoundText: "This page does not exist (anymore). The way back to the portfolio might help.",
    notFoundCta: "Back to home",
  },
} satisfies Record<
  Lang,
  Record<string, string | { title: string; text: string }[] | ((...args: never[]) => string)>
>;

export const t = (lang: Lang) => ui[lang];
