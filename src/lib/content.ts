import { getEntry, type CollectionEntry } from "astro:content";
import { loadClients, type ClientGroup } from "./clients";
import { loadProjects, type PortfolioProject, type ProjectCategory } from "./projects";

export type CategoryInfo = {
  value: ProjectCategory;
  label: { de: string; en: string };
  intro: { de: string; en: string };
};

type SiteContent = {
  /** All projects in display order. */
  projects: PortfolioProject[];
  categories: CategoryInfo[];
  /** Every client in display order with its projects, including clients without projects yet. */
  clients: ClientGroup[];
  settings: CollectionEntry<"site">["data"];
};

const loadCategories = async (): Promise<CategoryInfo[]> => {
  const entry = await getEntry("categories", "categories");
  if (!entry) throw new Error("src/content/settings/categories.yaml fehlt.");

  return Object.entries(entry.data)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([value, doc]) => ({
      value: value as ProjectCategory,
      label: { de: doc.title, en: doc.titleEn ?? doc.title },
      intro: { de: doc.intro ?? "", en: doc.introEn ?? doc.intro ?? "" },
    }));
};

const loadContent = async (): Promise<SiteContent> => {
  const profiles = await loadClients();
  const projects = await loadProjects(profiles);
  const site = await getEntry("site", "site");
  if (!site) throw new Error("src/content/settings/site.yaml fehlt.");

  return {
    projects,
    categories: await loadCategories(),
    clients: profiles.map((profile) => ({
      profile,
      projects: projects.filter((project) => project.clientProfile === profile),
    })),
    settings: site.data,
  };
};

let contentPromise: Promise<SiteContent> | undefined;

/** Loads all site content once per build and shares it across pages. */
export const getSiteContent = () => (contentPromise ??= loadContent());

/** Categories that actually contain projects, in display order. */
export const getActiveCategories = async () => {
  const { projects, categories } = await getSiteContent();
  return categories.filter((category) => projects.some((project) => project.category === category.value));
};

/** "2022–2026" (or "2026") from the project years; empty when no year is known. */
export const yearSpan = (projects: PortfolioProject[]) => {
  const years = projects.map((project) => Number.parseInt(project.year, 10)).filter(Number.isFinite);
  if (years.length === 0) return "";
  const first = Math.min(...years);
  const last = Math.max(...years);
  return first === last ? String(first) : `${first}–${last}`;
};
