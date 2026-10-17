import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Titel Englisch",
      type: "string",
      description: "Optional. Ohne Eintrag wird der deutsche Titel verwendet.",
    }),
    defineField({
      name: "shortTitle",
      title: "Kurztitel",
      type: "string",
      description: "Kurzer Titel für Kacheln und Overlays.",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "shortTitleEn",
      title: "Kurztitel Englisch",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Kunde / Kontext",
      type: "reference",
      to: [{ type: "client" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        layout: "radio",
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
      name: "year",
      title: "Jahr",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kurztext",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "summaryEn",
      title: "Kurztext Englisch",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "previewImage",
      title: "Hauptbild",
      type: "image",
      description: "Das eine Bild, das im Portfolio-Raster gezeigt wird.",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Alt-Text",
          type: "string",
          description: "Beschreibt das Motiv für Screenreader, z. B. „Poster mit Totenkopf und Line-up“.",
          validation: (Rule) => Rule.warning().required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sortierung",
      type: "number",
      description: "Steuert die Reihenfolge in Kunden- und Kategorie-Rastern. Kleinere Zahlen erscheinen weiter vorne.",
      initialValue: 100,
    }),
    defineField({
      name: "featured",
      title: "Hervorheben",
      type: "boolean",
      description: "Hervorgehobene Projekte erscheinen in der Bildcollage auf der Startseite (max. 3).",
      initialValue: false,
    }),
    defineField({
      name: "notes",
      title: "Interne Notizen",
      type: "text",
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: "Sortierung",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Jahr absteigend",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "shortTitle",
      client: "client.label",
      year: "year",
      media: "previewImage",
    },
    prepare({ title, client, year, media }) {
      return {
        title,
        subtitle: [client, year].filter(Boolean).join(" / "),
        media,
      };
    },
  },
});
