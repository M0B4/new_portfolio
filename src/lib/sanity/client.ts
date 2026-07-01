import { createClient } from "@sanity/client";
import type { PortfolioProject, ProjectCategory } from "../projects";
import type { ClientProfile } from "../clients";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "21kc2n82";
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || "2026-07-01";

export const hasSanityConfig = Boolean(projectId && dataset);

const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

type SanityProject = {
  _id: string;
  slug?: string;
  title?: string;
  shortTitle?: string;
  category?: ProjectCategory;
  summary?: string;
  client?: string;
  year?: string;
  previewImage?: string;
  order?: number;
  clientProfile?: ClientProfile;
};

export type SiteSettings = {
  title?: string;
  description?: string;
  accentDark?: string;
  accentLight?: string;
  backgroundTextureOpacity?: number;
};

const projectQuery = `*[_type == "project" && defined(slug.current)] | order(order asc) {
  _id,
  "slug": slug.current,
  title,
  shortTitle,
  category,
  summary,
  "client": client->title,
  "clientProfile": {
    "slug": client->slug.current,
    "label": client->label,
    "logo": client->logo.asset->url,
    "summary": client->summary,
    "intro": client->intro,
    "order": client->order
  },
  year,
  "previewImage": previewImage.asset->url,
  order
}`;

export const fetchSanityProjects = async (): Promise<PortfolioProject[]> => {
  if (!client) return [];

  const projects = await client.fetch<SanityProject[]>(projectQuery);

  return projects
    .filter((project) => project.title && project.category && project.client && project.previewImage)
    .map((project, index) => ({
      id: project._id,
      slug: project.slug ?? project._id,
      title: project.title ?? "Untitled",
      shortTitle: project.shortTitle ?? project.title ?? "Untitled",
      category: project.category ?? "various",
      summary: project.summary ?? "",
      client: project.client ?? "Portfolio",
      year: project.year ?? "",
      previewImage: project.previewImage ?? "",
      order: project.order ?? index + 1,
      clientProfile: project.clientProfile,
    }))
    .sort((a, b) => a.order - b.order);
};

export const fetchSiteSettings = async (): Promise<SiteSettings | null> => {
  if (!client) return null;

  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{
      title,
      description,
      accentDark,
      accentLight,
      backgroundTextureOpacity
    }`,
  );
};
