import { getCollection, type CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import type { ClientProfile } from "./clients";

export type ProjectCategory = CollectionEntry<"projects">["data"]["category"];

export type PortfolioProject = {
  title: string;
  titleEn?: string;
  shortTitle: string;
  shortTitleEn?: string;
  category: ProjectCategory;
  summary: string;
  summaryEn?: string;
  year: string;
  previewImage: ImageMetadata;
  alt: string;
  order: number;
  featured: boolean;
  clientProfile: ClientProfile;
};

/** All projects in display order; each one's client must exist in src/content/clients. */
export const loadProjects = async (clients: ClientProfile[]): Promise<PortfolioProject[]> => {
  const entries = await getCollection("projects");
  return entries
    .map(({ id, data }) => {
      const clientProfile = clients.find((client) => client.slug === data.client);
      if (!clientProfile) throw new Error(`Projekt „${id}“: Kunde „${data.client}“ fehlt in src/content/clients.`);
      return {
        title: data.title,
        titleEn: data.titleEn,
        shortTitle: data.shortTitle ?? data.title,
        shortTitleEn: data.shortTitleEn,
        category: data.category,
        summary: data.summary,
        summaryEn: data.summaryEn,
        year: data.year,
        previewImage: data.previewImage,
        alt: data.alt ?? data.title,
        order: data.order,
        featured: data.featured,
        clientProfile,
      };
    })
    .sort((a, b) => a.order - b.order);
};
