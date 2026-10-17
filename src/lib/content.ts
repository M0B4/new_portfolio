import { fallbackCategories, legalPlaceholders, socialLinks, type CategoryInfo } from "../data/site";
import { clientProfiles, fromSanityClient, getClientGroups, type ClientProfile } from "./clients";
import { fromSanityProject, getLocalProjects, isProjectCategory, type PortfolioProject } from "./projects";
import { fetchSanityContent, type SiteSettings } from "./sanity/client";

export type SiteContent = {
  source: "sanity" | "local";
  projects: PortfolioProject[];
  categories: CategoryInfo[];
  /** All known client profiles, including ones without projects yet. */
  clients: ClientProfile[];
  settings: SiteSettings;
  socialLinks: { label: string; url: string }[];
};

const loadCategories = (fromSanity: Awaited<ReturnType<typeof fetchSanityContent>>): CategoryInfo[] => {
  const sanityCategories = fromSanity?.categories ?? [];

  return fallbackCategories
    .map((fallback) => {
      const doc = sanityCategories.find((category) => category.value === fallback.value);
      if (!doc) return fallback;
      return {
        value: fallback.value,
        label: { de: doc.title || fallback.label.de, en: doc.titleEn || doc.title || fallback.label.en },
        intro: { de: doc.introDe || fallback.intro.de, en: doc.introEn || fallback.intro.en },
        order: doc.order ?? fallback.order,
      };
    })
    .filter((category) => isProjectCategory(category.value))
    .sort((a, b) => a.order - b.order);
};

const loadContent = async (): Promise<SiteContent> => {
  if (legalPlaceholders.length > 0) {
    console.warn(`[legal] Impressum/Datenschutz enthalten noch Platzhalter: ${legalPlaceholders.join(", ")} (src/data/site.ts)`);
  }

  const sanity = await fetchSanityContent();
  const sanityProjects = (sanity?.projects ?? [])
    .map((project, index) => fromSanityProject(project, index, fromSanityClient))
    .filter((project): project is PortfolioProject => Boolean(project));

  const useSanity = sanityProjects.length > 0;
  const projects = (useSanity ? sanityProjects : await getLocalProjects()).sort((a, b) => a.order - b.order);
  const clients = useSanity && sanity?.clients.length ? sanity.clients.map(fromSanityClient) : Object.values(clientProfiles);
  const sanitySocial = (sanity?.settings?.socialLinks ?? []).filter(
    (link): link is { label: string; url: string } => Boolean(link.label && link.url),
  );

  return {
    source: useSanity ? "sanity" : "local",
    projects,
    categories: loadCategories(sanity),
    clients,
    settings: sanity?.settings ?? {},
    socialLinks: sanitySocial.length > 0 ? sanitySocial : socialLinks,
  };
};

let contentPromise: Promise<SiteContent> | undefined;

/** Loads all site content once per build and shares it across pages. */
export const getSiteContent = () => (contentPromise ??= loadContent());

export const getClientGroupsWithEmpty = async () => {
  const { projects, clients } = await getSiteContent();
  return getClientGroups(projects, clients);
};

/** Categories that actually contain projects, in display order. */
export const getActiveCategories = async () => {
  const { projects, categories } = await getSiteContent();
  return categories.filter((category) => projects.some((project) => project.category === category.value));
};
