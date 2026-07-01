import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import { fetchSanityProjects, hasSanityConfig } from "./sanity/client";
import type { ClientProfile } from "./clients";

export type ProjectCategory = "event" | "poster" | "clothing" | "3d-print" | "various";

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  summary: string;
  client: string;
  year: string;
  previewImage: ImageMetadata | string;
  order: number;
  clientProfile?: ClientProfile;
};

const toSlug = (id: string) => id.replace(/\.md$/, "");

const fromContentProject = (project: CollectionEntry<"work">): PortfolioProject => ({
  id: project.id,
  slug: toSlug(project.id),
  title: project.data.title,
  shortTitle: project.data.shortTitle,
  category: project.data.category,
  summary: project.data.summary,
  client: project.data.client,
  year: project.data.year,
  previewImage: project.data.previewImage,
  order: project.data.order,
});

export const getLocalProjects = async () => {
  const projects = await getCollection("work");
  return projects.map(fromContentProject).sort((a, b) => a.order - b.order);
};

export const getPortfolioProjects = async () => {
  if (hasSanityConfig) {
    const projects = await fetchSanityProjects();
    if (projects.length > 0) return projects;
  }

  return getLocalProjects();
};

export const getProjectImageUrl = (project: PortfolioProject, origin: string | URL) => {
  const image = project.previewImage;
  if (typeof image === "string") return image;
  return new URL(image.src, origin).toString();
};
