/** Production domain (also the custom domain of the Cloudflare Pages project). Keep in sync with astro.config.mjs. */
export const SITE_URL = "https://mbarz.de";
export const SITE_HOST = new URL(SITE_URL).host;
export const SITE_NAME = "Moritz Barz Portfolio";
export const OWNER_NAME = "Moritz Barz";

/** Pflichtangaben für Impressum und Datenschutz (§ 5 DDG, Art. 13 DSGVO). */
export const legal = {
  name: OWNER_NAME,
  street: "Ober dem Reiterweg 3",
  city: "66885 Altenglan",
  country: "Deutschland",
  email: "kontakt@mbarz.de",
  phone: "",
  vatId: "",
};

export const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meeronwg";

/** Optional, cookieless analytics. Set PUBLIC_PLAUSIBLE_DOMAIN (e.g. mbarz.de) to enable. */
export const plausibleDomain: string = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || "";
