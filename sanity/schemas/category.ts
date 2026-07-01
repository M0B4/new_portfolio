import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Kategorie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Technischer Wert",
      type: "string",
      description: "Muss zu den Website-Kategorien passen.",
      options: {
        list: [
          { title: "Eventdesign", value: "event" },
          { title: "Poster", value: "poster" },
          { title: "Merch", value: "clothing" },
          { title: "3D-Print", value: "3d-print" },
          { title: "Objekte", value: "various" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introDe",
      title: "Intro Deutsch",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "introEn",
      title: "Intro Englisch",
      type: "text",
      rows: 3,
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
      title: "title",
      subtitle: "value",
    },
  },
});
