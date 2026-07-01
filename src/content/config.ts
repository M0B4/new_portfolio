import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectCategory = z.enum(["event", "poster", "clothing", "3d-print", "various"]);

const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string(),
      category: projectCategory,
      summary: z.string(),
      client: z.string(),
      year: z.string(),
      previewImage: image(),
      order: z.number(),
    }),
});

export const collections = { work };
