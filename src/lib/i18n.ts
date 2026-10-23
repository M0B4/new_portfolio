export type Lang = "de" | "en";

export const htmlLang: Record<Lang, string> = { de: "de", en: "en" };
export const ogLocale: Record<Lang, string> = { de: "de_DE", en: "en_US" };

/** Localized URL segments. Legal pages exist in German only. */
export const routeSegments = {
  work: { de: "arbeiten", en: "work" },
  client: { de: "kunden", en: "clients" },
  category: { de: "kategorien", en: "categories" },
} as const;

export type Alternates = Partial<Record<Lang, string>>;

/** Root-relative path, prefixed with `/en/` for English. */
export const localizePath = (lang: Lang, path = "") => {
  const clean = path.replace(/^\/+/, "");
  return `/${lang === "en" ? "en/" : ""}${clean}`;
};

export const workPath = (lang: Lang) => localizePath(lang, `${routeSegments.work[lang]}/`);

export const clientPath = (lang: Lang, slug: string) =>
  localizePath(lang, `${routeSegments.client[lang]}/${slug}/`);

export const categoryPath = (lang: Lang, category: string) =>
  localizePath(lang, `${routeSegments.category[lang]}/${category}/`);

export const legalPath = (page: "impressum" | "datenschutz") => `/${page}/`;

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
    home: "Startseite",
    breadcrumb: "Brotkrumen-Navigation",

    // Home
    heroCtaPrimary: "Projekt anfragen",
    heroCtaWork: "Alle Arbeiten",
    trustLabel: "Ausgewählte Kunden",
    selectedKicker: "Ausgewählte Arbeiten",
    selectedTitle: "Ein erster Eindruck.",
    discoverAll: "Alle Arbeiten ansehen",
    clientsKicker: "Kunden & Partner",
    clientsTitle: "Festivals, Bands und Vereine, für die ich gearbeitet habe.",
    clientsText: "Vom Wacken Open Air bis zur Clubnacht im Dorf. Ein Klick aufs Logo zeigt die Arbeiten dazu.",
    clientsListLabel: "Kunden und Partner",
    profileKicker: "Profil",
    profileTitle: "Gestaltet für Bühne, Stoff und Werkbank.",
    profileText:
      "Ich gestalte Motive, die schnell greifen müssen: auf dem Plakat am Ortseingang, auf dem Shirt im Moshpit, auf dem Bändchen am Handgelenk. Und wenn ein Problem kein Bild braucht, sondern ein Bauteil, konstruiere ich es und drucke es in 3D.",
    portraitAlt: "Gitarrist mit Festivalbändchen im Bühnenlicht",

    // Work & clients
    projectCount: (n: number) => (n === 1 ? "1 Arbeit" : `${n} Arbeiten`),
    clientCount: (n: number) => (n === 1 ? "1 Kunde" : `${n} Kunden`),
    viewWorkFor: (label: string) => `Arbeiten für ${label} ansehen`,
    workFor: (label: string) => `${label} Arbeiten`,
    workPageTitle: "Alle Arbeiten",
    workPageText: "Poster, Merch, Eventdesign und 3D-Druck. Filtere nach Kategorie oder Kunde.",
    field: "Kategorie",
    client: "Kunde",
    moreFields: "Weitere Kategorien",
    emptyClient: "Die Arbeiten für diesen Kunden folgen bald.",
    filterLabel: "Nach Kategorie filtern",
    filterClientLabel: "Nach Kunde filtern",
    filterAll: "Alle",
    filterEmpty: "Für diese Kombination gibt es noch keine Arbeit.",
    prevClient: "Vorheriger Kunde",
    nextClient: "Nächster Kunde",
    clientNav: "Weitere Kunden",

    // Contact
    contactKicker: "Kontakt",
    ctaTitle: "Du planst ein Festival, eine Tour oder neues Merch?",
    ctaText: "Schreib mir kurz, worum es geht, bis wann du es brauchst und wo es eingesetzt wird. Ich melde mich mit einer ersten Einschätzung.",
    passTitle: "Backstage-Pass",
    passAccess: "All Access",
    formName: "Name / Band / Veranstaltung",
    formEmail: "E-Mail",
    formType: "Projektart",
    formTypeChoose: "Bitte wählen",
    formTypeOther: "Sonstiges",
    formMessage: "Worum geht's?",
    formSend: "Senden",
    formSending: "Wird gesendet …",
    formOk: "Danke, deine Nachricht ist angekommen. Ich melde mich bald.",
    formBad: "Das hat leider nicht geklappt. Versuch es bitte noch einmal oder schreib mir direkt per E-Mail.",
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
    notFoundText: "Diese Seite gibt es nicht (mehr).",
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
    trustLabel: "Selected clients",
    selectedKicker: "Selected work",
    selectedTitle: "A first look.",
    discoverAll: "See all work",
    clientsKicker: "Clients & partners",
    clientsTitle: "Festivals, bands and clubs I've worked with.",
    clientsText: "From Wacken Open Air to a village club night. Click a logo to see the work behind it.",
    clientsListLabel: "Clients and partners",
    profileKicker: "About",
    profileTitle: "Designed for stage, fabric and workbench.",
    profileText:
      "I design visuals that have to land fast: on the poster at the edge of town, on the shirt in the pit, on the wristband. And when a problem needs a part rather than a picture, I design it and 3D print it.",
    portraitAlt: "Guitarist with festival wristbands in stage light",

    projectCount: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
    clientCount: (n: number) => (n === 1 ? "1 client" : `${n} clients`),
    viewWorkFor: (label: string) => `View work for ${label}`,
    workFor: (label: string) => `${label} work`,
    workPageTitle: "All work",
    workPageText: "Posters, merch, event design and 3D printing. Filter by category or client.",
    field: "Category",
    client: "Client",
    moreFields: "More categories",
    emptyClient: "Work for this client is coming soon.",
    filterLabel: "Filter by category",
    filterClientLabel: "Filter by client",
    filterAll: "All",
    filterEmpty: "No work matches this combination yet.",
    prevClient: "Previous client",
    nextClient: "Next client",
    clientNav: "More clients",

    contactKicker: "Contact",
    ctaTitle: "Planning a festival, a tour or new merch?",
    ctaText: "Tell me briefly what it is, when you need it and where it will be used. I'll get back to you with a first take.",
    passTitle: "Backstage pass",
    passAccess: "All access",
    formName: "Name / band / event",
    formEmail: "Email",
    formType: "Project type",
    formTypeChoose: "Please choose",
    formTypeOther: "Other",
    formMessage: "What's it about?",
    formSend: "Send",
    formSending: "Sending …",
    formOk: "Thanks, your message is in. I'll get back to you soon.",
    formBad: "That didn't work. Please try again or email me directly.",
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
    notFoundText: "This page doesn't exist (anymore).",
    notFoundCta: "Back to home",
  },
} satisfies Record<Lang, Record<string, string | ((...args: never[]) => string)>>;

export const t = (lang: Lang) => ui[lang];
