import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { ProjectCategory } from "../projects";

// An explicitly empty PUBLIC_SANITY_PROJECT_ID disables Sanity and builds from local Markdown.
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "21kc2n82";
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

const imageBuilder = hasSanityConfig ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Resized, format-negotiated (WebP/AVIF) URL for a Sanity image asset. */
export const sanityImageUrl = (assetId: string, width: number, format?: "jpg" | "webp") => {
  if (!imageBuilder) return "";
  const image = imageBuilder.image(assetId).width(width).fit("max").quality(80);
  return (format ? image.format(format) : image.auto("format")).url();
};

export type SanityImage = {
  assetId: string;
  url: string;
  width: number;
  height: number;
  lqip?: string;
  alt?: string;
};

export type SanityClientProfile = {
  title?: string;
  slug?: string;
  label?: string;
  logo?: string;
  summary?: string;
  summaryEn?: string;
  intro?: string;
  introEn?: string;
  order?: number;
};

export type SanityProject = {
  _id: string;
  _updatedAt?: string;
  slug?: string;
  title?: string;
  titleEn?: string;
  shortTitle?: string;
  shortTitleEn?: string;
  category?: ProjectCategory;
  summary?: string;
  summaryEn?: string;
  year?: string;
  featured?: boolean;
  previewImage?: SanityImage;
  order?: number;
  client?: SanityClientProfile;
};

export type SanityCategory = {
  title?: string;
  titleEn?: string;
  value?: ProjectCategory;
  introDe?: string;
  introEn?: string;
  order?: number;
};

export type SiteSettings = {
  title?: string;
  description?: string;
  descriptionEn?: string;
  accentDark?: string;
  accentLight?: string;
  backgroundTextureOpacity?: number;
  heroKickerDe?: string;
  heroTitleDe?: string;
  heroTextDe?: string;
  heroKickerEn?: string;
  heroTitleEn?: string;
  heroTextEn?: string;
  aboutTextDe?: string;
  aboutTextEn?: string;
  socialLinks?: { label?: string; url?: string }[];
};

export type SanityContent = {
  projects: SanityProject[];
  categories: SanityCategory[];
  clients: SanityClientProfile[];
  settings: SiteSettings | null;
};

const clientProjection = `{
  title,
  "slug": slug.current,
  label,
  "logo": logo.asset->url,
  summary,
  summaryEn,
  intro,
  introEn,
  order
}`;

const contentQuery = `{
  "projects": *[_type == "project" && defined(slug.current)] | order(order asc) {
    _id,
    _updatedAt,
    "slug": slug.current,
    title,
    titleEn,
    shortTitle,
    shortTitleEn,
    category,
    summary,
    summaryEn,
    year,
    featured,
    order,
    "previewImage": previewImage{
      alt,
      "assetId": asset->_id,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    "client": client->${clientProjection}
  },
  "categories": *[_type == "category"] | order(order asc) { title, titleEn, value, introDe, introEn, order },
  "clients": *[_type == "client"] | order(order asc) ${clientProjection},
  "settings": *[_type == "siteSettings"][0] {
    title,
    description,
    descriptionEn,
    accentDark,
    accentLight,
    backgroundTextureOpacity,
    heroKickerDe,
    heroTitleDe,
    heroTextDe,
    heroKickerEn,
    heroTitleEn,
    heroTextEn,
    aboutTextDe,
    aboutTextEn,
    socialLinks[]{ label, url }
  }
}`;

/**
 * Fetches all portfolio content in a single request.
 * Returns null (instead of failing the build) when Sanity is disabled or unreachable.
 */
export const fetchSanityContent = async (): Promise<SanityContent | null> => {
  if (!client) return null;

  try {
    return await client.fetch<SanityContent>(contentQuery);
  } catch (error) {
    console.warn(`[sanity] Content could not be loaded, falling back to local content: ${String(error)}`);
    return null;
  }
};
