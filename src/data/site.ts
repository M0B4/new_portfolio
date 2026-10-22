import type { ProjectCategory } from "../lib/projects";

export type { ProjectCategory };

/** Single source of truth for the production domain (also the custom domain of the Cloudflare Pages project). */
export const SITE_URL = "https://mbarz.de";
export const SITE_HOST = new URL(SITE_URL).host;
export const SITE_NAME = "Moritz Barz Portfolio";
export const OWNER_NAME = "Moritz Barz";

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

export type CategoryInfo = {
  value: ProjectCategory;
  label: { de: string; en: string };
  intro: { de: string; en: string };
  order: number;
};

export const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meeronwg";

/** Optional, cookieless analytics. Set PUBLIC_PLAUSIBLE_DOMAIN (e.g. mbarz.de) to enable. */
export const plausibleDomain: string = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || "";
