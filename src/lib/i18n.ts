import { basePath as base } from "./url";

export const languages = ["de", "en"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "de";

export const htmlLang: Record<Lang, string> = { de: "de", en: "en" };
export const ogLocale: Record<Lang, string> = { de: "de_DE", en: "en_US" };

/** Localized URL segments. Legal pages exist in German only. */
export const routeSegments = {
  work: { de: "arbeiten", en: "work" },
  client: { de: "kunden", en: "clients" },
  category: { de: "kategorien", en: "categories" },
} as const;

export type Alternates = Partial<Record<Lang, string>>;

/** Builds a base-aware path, prefixed with `/en/` for English. */
export const localizePath = (lang: Lang, path = "") => {
  const clean = path.replace(/^\/+/, "");
  return `${base}${lang === "en" ? "en/" : ""}${clean}`;
};

export const workPath = (lang: Lang) => localizePath(lang, `${routeSegments.work[lang]}/`);

export const clientPath = (lang: Lang, slug: string) =>
  localizePath(lang, `${routeSegments.client[lang]}/${slug}/`);

export const categoryPath = (lang: Lang, category: string) =>
  localizePath(lang, `${routeSegments.category[lang]}/${category}/`);

export const legalPath = (page: "impressum" | "datenschutz") => `${base}${page}/`;

/** Picks the English value when available, otherwise falls back to German. */
export const pick = (lang: Lang, de: string, en?: string) => (lang === "en" && en ? en : de);

export const ui = {
  de: {
    // Navigation & chrome
    skip: "Zum Inhalt springen",
    navLabel: "Hauptnavigation",
    navWork: "Arbeiten",
    navClients: "Kunden",
    navAbout: "Profil",
    navContact: "Kontakt",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    switchLanguage: "Switch to English",
    themeToLight: "Hellen Modus aktivieren",
    themeToDark: "Dunklen Modus aktivieren",
    home: "Start",
    breadcrumb: "Brotkrumen-Navigation",

    // Home
    heroCtaPrimary: "Projekt anfragen",
    heroCtaWork: "Alle Arbeiten",
    trustLabel: "Gearbeitet für",
    selectedKicker: "Ausgewählt",
    selectedTitle: "Drei Arbeiten, die zeigen, wie es klingt.",
    discoverAll: "Alle Arbeiten entdecken",
    clientsKicker: "Kunden & Partner",
    clientsTitle: "Vertrauen von der Szene.",
    clientsText: "Vom größten Metal-Festival der Welt bis zur Clubnacht im Dorf – jedes Logo führt zu den Arbeiten dahinter.",
    clientsListLabel: "Kunden und Partner",
    profileKicker: "Profil",
    profileTitle: "Gestaltung mit Druck, Kante und Funktion.",
    profileText:
      "Ich gestalte für Orte, an denen Motive schnell greifen müssen: auf Stoff, Plakat, Bühne, Ausrüstung und im Feed.",
    portraitAlt: "Gitarrist mit Festivalbändchen im Bühnenlicht",

    // Work & clients
    projectCount: (n: number) => (n === 1 ? "1 Arbeit" : `${n} Arbeiten`),
    clientCount: (n: number) => (n === 1 ? "1 Kunde" : `${n} Kunden`),
    viewWorkFor: (label: string) => `Arbeiten für ${label} ansehen`,
    workFor: (label: string) => `${label} Arbeiten`,
    workPageTitle: "Alle Arbeiten",
    workPageText: "Poster, Merch, Eventdesign und 3D-Drucke – nach Arbeitsart oder Kunde filtern.",
    field: "Arbeitsart",
    client: "Kunde",
    moreFields: "Weitere Arbeitsarten",
    emptyClient: "Arbeiten für diesen Kunden werden noch kuratiert.",
    filterLabel: "Nach Arbeitsart filtern",
    filterClientLabel: "Nach Kunde filtern",
    filterAll: "Alle",
    filterEmpty: "Keine Arbeit passt zu dieser Kombination.",
    prevClient: "Vorheriger Kunde",
    nextClient: "Nächster Kunde",
    clientNav: "Weitere Kunden",

    // Lightbox
    openProjectHint: "– vergrößert ansehen",
    lightboxClose: "Schließen",
    lightboxPrev: "Vorherige Arbeit",
    lightboxNext: "Nächste Arbeit",
    imageCount: (current: number, total: number) => `Bild ${current} / ${total}`,

    // Contact
    contactKicker: "Kontakt",
    ctaTitle: "Dein Motiv. Laut genug?",
    ctaText: "Poster, Shirt, Bändchen oder Bauteil – erzähl mir, was es werden soll. Kurzer Kontext reicht.",
    passTitle: "Backstage-Pass",
    passAccess: "All Access",
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
    emailLabel: "E-Mail",
    phoneLabel: "Telefon",
    privacy: "Datenschutzerklärung",
    imprint: "Impressum",
    footerNav: "Fußzeile",
    social: "Social Media",
    backToTop: "Nach oben",

    // 404
    notFoundTitle: "Seite nicht gefunden",
    notFoundText: "Diese Seite existiert nicht (mehr). Vielleicht hilft der Weg zurück zum Portfolio.",
    notFoundCta: "Zur Startseite",
  },
  en: {
    skip: "Skip to content",
    navLabel: "Main navigation",
    navWork: "Work",
    navClients: "Clients",
    navAbout: "About",
    navContact: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchLanguage: "Auf Deutsch wechseln",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    home: "Home",
    breadcrumb: "Breadcrumb",

    heroCtaPrimary: "Start a project",
    heroCtaWork: "All work",
    trustLabel: "Worked for",
    selectedKicker: "Selected",
    selectedTitle: "Three pieces that show how it sounds.",
    discoverAll: "Discover all work",
    clientsKicker: "Clients & partners",
    clientsTitle: "Trusted by the scene.",
    clientsText: "From the biggest metal festival in the world to a village club night – every logo leads to the work behind it.",
    clientsListLabel: "Clients and partners",
    profileKicker: "About",
    profileTitle: "Design with impact, edge and function.",
    profileText:
      "I design for places where visuals need to hit fast: on fabric, posters, stages, equipment and feeds.",
    portraitAlt: "Guitarist with festival wristbands in stage light",

    projectCount: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
    clientCount: (n: number) => (n === 1 ? "1 client" : `${n} clients`),
    viewWorkFor: (label: string) => `View work for ${label}`,
    workFor: (label: string) => `${label} work`,
    workPageTitle: "All work",
    workPageText: "Posters, merch, event design and 3D prints – filter by field or client.",
    field: "Field",
    client: "Client",
    moreFields: "More fields",
    emptyClient: "Work for this client is still being curated.",
    filterLabel: "Filter by field",
    filterClientLabel: "Filter by client",
    filterAll: "All",
    filterEmpty: "No project matches this combination.",
    prevClient: "Previous client",
    nextClient: "Next client",
    clientNav: "More clients",

    openProjectHint: "– view enlarged",
    lightboxClose: "Close",
    lightboxPrev: "Previous project",
    lightboxNext: "Next project",
    imageCount: (current: number, total: number) => `Image ${current} / ${total}`,

    contactKicker: "Contact",
    ctaTitle: "Your motif. Loud enough?",
    ctaText: "Poster, shirt, wristband or part – tell me what it should become. A short context is enough.",
    passTitle: "Backstage pass",
    passAccess: "All access",
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
    emailLabel: "Email",
    phoneLabel: "Phone",
    privacy: "privacy policy (German)",
    imprint: "Legal notice (German)",
    footerNav: "Footer",
    social: "Social media",
    backToTop: "Back to top",

    notFoundTitle: "Page not found",
    notFoundText: "This page does not exist (anymore). The way back to the portfolio might help.",
    notFoundCta: "Back to home",
  },
} satisfies Record<Lang, Record<string, string | ((...args: never[]) => string)>>;

export const t = (lang: Lang) => ui[lang];
