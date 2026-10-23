import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import type { ClientProfile } from "./clients";

export type ProjectCategory = "event" | "poster" | "clothing" | "3d-print" | "various";

export const projectCategories: ProjectCategory[] = ["event", "poster", "clothing", "3d-print", "various"];

export const isProjectCategory = (value: unknown): value is ProjectCategory =>
  projectCategories.includes(value as ProjectCategory);

export type PortfolioImage = ImageMetadata;

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  shortTitle: string;
  shortTitleEn?: string;
  category: ProjectCategory;
  summary: string;
  summaryEn?: string;
  /** Full client name, e.g. "Wacken Open Air". */
  client: string;
  year: string;
  previewImage: PortfolioImage;
  alt: string;
  order: number;
  featured: boolean;
  clientProfile: ClientProfile;
};

const fromEntry = (project: CollectionEntry<"projects">, clientProfile: ClientProfile): PortfolioProject => {
  const { data } = project;
  return {
    id: project.id,
    slug: project.id,
    title: data.title,
    titleEn: data.titleEn,
    shortTitle: data.shortTitle ?? data.title,
    shortTitleEn: data.shortTitleEn,
    category: data.category,
    summary: data.summary,
    summaryEn: data.summaryEn,
    client: clientProfile.title ?? clientProfile.label,
    year: data.year,
    previewImage: data.previewImage,
    alt: data.alt ?? data.title,
    order: data.order,
    featured: data.featured,
    clientProfile,
  };
};

/** All projects in display order; each one's client must exist in src/content/clients. */
export const loadProjects = async (clients: ClientProfile[]) => {
  const entries = await getCollection("projects");
  return entries
    .map((entry) => {
      const profile = clients.find((client) => client.slug === entry.data.client);
      if (!profile) throw new Error(`Projekt „${entry.id}“: Kunde „${entry.data.client}“ fehlt in src/content/clients.`);
      return fromEntry(entry, profile);
    })
    .sort((a, b) => a.order - b.order);
};
