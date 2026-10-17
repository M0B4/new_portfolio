import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projectCategory = z.enum(["event", "poster", "clothing", "3d-print", "various"]);

// Offline fallback for Sanity. Additional frontmatter (gallery, challenge, …) is kept
// in the Markdown files as an archive but is not rendered.
const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      titleEn: z.string().optional(),
      shortTitle: z.string(),
      shortTitleEn: z.string().optional(),
      category: projectCategory,
      summary: z.string(),
      summaryEn: z.string().optional(),
      client: z.string(),
      year: z.string(),
      previewImage: image(),
      alt: z.string().optional(),
      featured: z.boolean().optional(),
      order: z.number(),
    }),
});

export const collections = { work };
