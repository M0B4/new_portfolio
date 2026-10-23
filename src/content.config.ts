import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Edited with Keystatic (keystatic.config.ts); both read the same YAML files.

const projectCategory = z.enum(["event", "poster", "clothing", "3d-print", "various"]);
const optionalText = z.string().nullish().transform((value) => value || undefined);

const projects = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      category: projectCategory,
      year: z.string(),
      previewImage: image(),
      alt: optionalText,
      summary: z.string(),
      featured: z.boolean().default(false),
      shortTitle: optionalText,
      titleEn: optionalText,
      shortTitleEn: optionalText,
      summaryEn: optionalText,
      order: z.number().default(100),
    }),
});

const clients = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/clients" }),
  schema: ({ image }) =>
    z.object({
      label: z.string(),
      title: optionalText,
      logo: image().nullish(),
      intro: optionalText,
      summary: optionalText,
      introEn: optionalText,
      summaryEn: optionalText,
      order: z.number().default(100),
    }),
});

const categoryText = z.object({
  title: z.string(),
  titleEn: optionalText,
  intro: optionalText,
  introEn: optionalText,
  order: z.number().default(100),
});

const categories = defineCollection({
  loader: glob({ pattern: "categories.yaml", base: "./src/content/settings" }),
  schema: z.object({
    poster: categoryText,
    clothing: categoryText,
    event: categoryText,
    "3d-print": categoryText,
    various: categoryText,
  }),
});

const site = defineCollection({
  loader: glob({ pattern: "site.yaml", base: "./src/content/settings" }),
  schema: z.object({
    heroKickerDe: optionalText,
    heroTitleDe: optionalText,
    heroTextDe: optionalText,
    heroKickerEn: optionalText,
    heroTitleEn: optionalText,
    heroTextEn: optionalText,
    aboutTextDe: optionalText,
    aboutTextEn: optionalText,
    description: optionalText,
    descriptionEn: optionalText,
    backgroundTextureOpacity: z.number().nullish(),
    socialLinks: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
});

export const collections = { projects, clients, categories, site };
