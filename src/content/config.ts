import { defineCollection, z } from "astro:content";

const projectCategory = z.enum(["event", "poster", "clothing", "3d-print", "various"]);

const work = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string(),
      category: projectCategory,
      summary: z.string(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      client: z.string(),
      year: z.string(),
      previewImage: image(),
      heroImage: image(),
      challenge: z.string(),
      approach: z.string(),
      impact: z.string(),
      details: z.array(z.string()),
      services: z.array(z.string()),
      tags: z.array(z.string()).default([]),
      gallery: z.array(
        z.object({
          image: image(),
          title: z.string(),
        }),
      ),
      order: z.number(),
    }),
});

export const collections = { work };
