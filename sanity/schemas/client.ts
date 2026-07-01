import { defineField, defineType } from "sanity";

export const client = defineType({
  name: "client",
  title: "Kunde / Kontext",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Interner Name",
      type: "string",
      description: "Sollte dem Projekteintrag entsprechen, z. B. Wacken Open Air.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Anzeigename",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "label", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "summary",
      title: "SEO-Kurzbeschreibung",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(180),
    }),
    defineField({
      name: "intro",
      title: "Intro auf Kundenseite",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sortierung",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "title",
      media: "logo",
    },
  },
});
