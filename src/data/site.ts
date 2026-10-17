import type { ProjectCategory } from "../lib/projects";

export type { ProjectCategory };

/** Single source of truth for the production domain (must match public/CNAME). */
export const SITE_URL = "https://mbarz.de";
export const SITE_HOST = new URL(SITE_URL).host;
export const SITE_NAME = "Moritz Barz Portfolio";
export const OWNER_NAME = "Moritz Barz";

/**
 * Pflichtangaben für Impressum und Datenschutz (§ 5 DDG, Art. 13 DSGVO).
 * TODO: Platzhalter durch echte Daten ersetzen – der Build warnt, solange sie gesetzt sind.
 */
export const legal = {
  name: OWNER_NAME,
  street: "Straße Hausnummer",
  city: "12345 Stadt",
  country: "Deutschland",
  email: "",
  phone: "",
  vatId: "",
};

export const legalPlaceholders = [
  !legal.email && "legal.email",
  legal.street.startsWith("Straße Hausnummer") && "legal.street",
  legal.city.startsWith("12345") && "legal.city",
].filter(Boolean) as string[];

/** Fallback social profiles; Sanity `siteSettings.socialLinks` takes precedence. */
export const socialLinks: { label: string; url: string }[] = [];

export type CategoryInfo = {
  value: ProjectCategory;
  label: { de: string; en: string };
  intro: { de: string; en: string };
  order: number;
};

/** Offline fallback – the live values come from the Sanity `category` documents. */
export const fallbackCategories: CategoryInfo[] = [
  {
    value: "poster",
    label: { de: "Poster", en: "Posters" },
    intro: { de: "Plakative Motive für Bühne, Club und Festival.", en: "Bold visuals for stages, clubs and festivals." },
    order: 10,
  },
  {
    value: "clothing",
    label: { de: "Merch", en: "Merch" },
    intro: {
      de: "Merchandise, der als Motiv und Produkt funktioniert.",
      en: "Merchandise that works as both artwork and product.",
    },
    order: 20,
  },
  {
    value: "event",
    label: { de: "Eventdesign", en: "Event design" },
    intro: { de: "Auftritte mit klarer Hierarchie und Szene-Energie.", en: "Event visuals with clear hierarchy and scene energy." },
    order: 30,
  },
  {
    value: "3d-print",
    label: { de: "3D-Print", en: "3D print" },
    intro: { de: "Funktionale Objekte für echte Nutzung.", en: "Functional objects for real use." },
    order: 40,
  },
  {
    value: "various",
    label: { de: "Objekte", en: "Objects" },
    intro: {
      de: "Sonderformate zwischen Grafik, Objekt und Anwendung.",
      en: "Special formats between graphics, objects and use.",
    },
    order: 50,
  },
];

export const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meeronwg";

/** Optional, cookieless analytics. Set PUBLIC_PLAUSIBLE_DOMAIN (e.g. mbarz.de) to enable. */
export const plausibleDomain: string = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || "";
