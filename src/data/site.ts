import type { ProjectCategory } from "../lib/projects";

export type { ProjectCategory };

/** Single source of truth for the production domain (also the custom domain of the Cloudflare Pages project). */
export const SITE_URL = "https://mbarz.de";
export const SITE_HOST = new URL(SITE_URL).host;
export const SITE_NAME = "Moritz Barz Portfolio";
export const OWNER_NAME = "Moritz Barz";

/** Hosted Sanity Studio (`npm run studio:deploy`); mbarz.de/studio/ redirects here. */
export const SANITY_STUDIO_URL = "https://mbarz.sanity.studio/";

/**
 * Pflichtangaben für Impressum und Datenschutz (§ 5 DDG, Art. 13 DSGVO).
 * Der Build warnt, falls hier wieder Platzhalter stehen.
 */
export const legal = {
  name: OWNER_NAME,
  street: "Ober dem Reiterweg 3",
  city: "66885 Altenglan",
  country: "Deutschland",
  email: "kontakt@mbarz.de",
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
    intro: { de: "Plakate für Festivals, Clubnächte und Tribute-Abende.", en: "Posters for festivals, club nights and tribute shows." },
    order: 10,
  },
  {
    value: "clothing",
    label: { de: "Merch", en: "Merch" },
    intro: {
      de: "Shirts, Bändchen und Merch, die man gerne trägt.",
      en: "Shirts, wristbands and merch people actually want to wear.",
    },
    order: 20,
  },
  {
    value: "event",
    label: { de: "Eventdesign", en: "Event design" },
    intro: {
      de: "Alles rund ums Event, vom Line-up bis zum Social-Post.",
      en: "Everything around the event, from line-up to social post.",
    },
    order: 30,
  },
  {
    value: "3d-print",
    label: { de: "3D-Druck", en: "3D printing" },
    intro: { de: "Konstruiert und gedruckt: Teile, die im Alltag benutzt werden.", en: "Designed and printed: parts made for everyday use." },
    order: 40,
  },
  {
    value: "various",
    label: { de: "Objekte", en: "Objects" },
    intro: {
      de: "Sammlerstücke und Sonderanfertigungen jenseits von Papier und Stoff.",
      en: "Collectibles and one-offs beyond paper and fabric.",
    },
    order: 50,
  },
];

export const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meeronwg";

/** Optional, cookieless analytics. Set PUBLIC_PLAUSIBLE_DOMAIN (e.g. mbarz.de) to enable. */
export const plausibleDomain: string = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || "";
