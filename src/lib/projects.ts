import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import type { ClientProfile } from "./clients";
import type { SanityImage, SanityProject } from "./sanity/client";

export type ProjectCategory = "event" | "poster" | "clothing" | "3d-print" | "various";

export const projectCategories: ProjectCategory[] = ["event", "poster", "clothing", "3d-print", "various"];

export const isProjectCategory = (value: unknown): value is ProjectCategory =>
  projectCategories.includes(value as ProjectCategory);

export type PortfolioImage = ImageMetadata | SanityImage;

export const isSanityImage = (image: PortfolioImage): image is SanityImage => "assetId" in image;

export type GalleryImage = { image: PortfolioImage; alt: string };

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
  client: string;
  year: string;
  previewImage: PortfolioImage;
  alt: string;
  /** Print/production specs, e.g. "A2 · Siebdruck". */
  specs?: string;
  /** Additional images (in use, details) shown in the lightbox after the main image. */
  gallery: GalleryImage[];
  order: number;
  featured: boolean;
  updatedAt?: string;
  clientProfile?: ClientProfile;
};

const toSlug = (id: string) => id.replace(/\.md$/, "");

const fromContentProject = (project: CollectionEntry<"work">): PortfolioProject => ({
  id: project.id,
  slug: toSlug(project.id),
  title: project.data.title,
  titleEn: project.data.titleEn,
  shortTitle: project.data.shortTitle,
  shortTitleEn: project.data.shortTitleEn,
  category: project.data.category,
  summary: project.data.summary,
  summaryEn: project.data.summaryEn,
  client: project.data.client,
  year: project.data.year,
  previewImage: project.data.previewImage,
  alt: project.data.alt ?? project.data.title,
  specs: project.data.specs,
  gallery: (project.data.gallery ?? [])
    .filter((item) => item.image.src !== project.data.previewImage.src)
    .map((item) => ({ image: item.image, alt: item.title ?? project.data.title })),
  order: project.data.order,
  featured: project.data.featured ?? false,
});

export const getLocalProjects = async () => {
  const projects = await getCollection("work");
  return projects.map(fromContentProject).sort((a, b) => a.order - b.order);
};

export const fromSanityProject = (
  project: SanityProject,
  index: number,
  toClientProfile: (client: NonNullable<SanityProject["client"]>) => ClientProfile,
): PortfolioProject | null => {
  const { title, category, client, previewImage } = project;
  if (!title || !isProjectCategory(category) || !client?.title || !previewImage?.assetId) return null;

  return {
    id: project._id,
    slug: project.slug ?? project._id,
    title,
    titleEn: project.titleEn,
    shortTitle: project.shortTitle ?? title,
    shortTitleEn: project.shortTitleEn,
    category,
    summary: project.summary ?? "",
    summaryEn: project.summaryEn,
    client: client.title,
    year: project.year ?? "",
    previewImage,
    alt: previewImage.alt || title,
    specs: project.specs,
    gallery: (project.gallery ?? [])
      .filter((image) => image.assetId && image.assetId !== previewImage.assetId)
      .map((image) => ({ image, alt: image.alt || title })),
    order: project.order ?? index + 1,
    featured: project.featured ?? false,
    updatedAt: project._updatedAt,
    clientProfile: toClientProfile(client),
  };
};
