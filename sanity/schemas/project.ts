import { ImagesIcon } from "@sanity/icons/Images";
import { defineField, defineType } from "sanity";
import { categoryOptions } from "./categoryOptions";

export const project = defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  icon: ImagesIcon,
  groups: [
    { name: "basics", title: "Basis", default: true },
    { name: "media", title: "Bilder & Details" },
    { name: "english", title: "Englisch" },
    { name: "internal", title: "Intern" },
  ],
  fields: [
    // --- Basis: everything needed for a new project ---
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      group: "basics",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Kunde / Kontext",
      type: "reference",
      to: [{ type: "client" }],
      group: "basics",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Arbeitsart",
      type: "string",
      group: "basics",
      options: { layout: "radio", direction: "horizontal", list: categoryOptions },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Jahr",
      type: "string",
      group: "basics",
      initialValue: () => String(new Date().getFullYear()),
      validation: (Rule) => Rule.required().regex(/^\d{4}$/, { name: "Jahreszahl" }),
    }),
    defineField({
      name: "previewImage",
      title: "Hauptbild",
      type: "image",
      group: "basics",
      description: "Das Bild in den Rastern der Website. Hochformat oder Quadrat, mindestens 1600 px breit.",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Alt-Text",
          type: "string",
          description: "Was ist zu sehen? z. B. „Poster mit Totenkopf und Line-up in Rot“. Wichtig für Screenreader und Google.",
          validation: (Rule) => Rule.required().warning("Ein Alt-Text macht das Bild barrierefrei."),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kurztext",
      type: "text",
      rows: 3,
      group: "basics",
      description: "Ein bis zwei Sätze. Erscheint in der Großansicht.",
      validation: (Rule) => Rule.required().max(220),
    }),

    // --- Bilder & Details ---
    defineField({
      name: "gallery",
      title: "Weitere Bilder",
      type: "array",
      group: "media",
      description: "Fotos im Einsatz (Shirt am Stand, Poster an der Wand) oder Details. Mehrere Dateien auf einmal hineinziehen.",
      options: { layout: "grid" },
      of: [
        {
          type: "image",
          options: { hotspot: false },
          fields: [
            defineField({
              name: "alt",
              title: "Alt-Text",
              type: "string",
              validation: (Rule) => Rule.required().warning("Ein Alt-Text macht das Bild barrierefrei."),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "specs",
      title: "Druckangaben",
      type: "string",
      group: "media",
      description: "Kurz und technisch, z. B. „A2 · Siebdruck“ oder „PETG · 3D-Druck“. Erscheint unter dem Bild.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "featured",
      title: "Hervorheben",
      type: "boolean",
      group: "media",
      description:
        "Das erste hervorgehobene Projekt wird Hero-Bild und Highlight der Startseite; alle hervorgehobenen stehen in „Ausgewählte Arbeiten“ vorne.",
      initialValue: false,
    }),
    defineField({
      name: "shortTitle",
      title: "Kurztitel",
      type: "string",
      group: "media",
      description: "Optional: kürzerer Titel für die Kachel. Ohne Eintrag wird der Titel verwendet.",
      validation: (Rule) => Rule.max(60),
    }),

    // --- Englisch (all optional, German is the fallback) ---
    defineField({
      name: "titleEn",
      title: "Titel Englisch",
      type: "string",
      group: "english",
      description: "Optional. Ohne Eintrag wird der deutsche Text verwendet.",
    }),
    defineField({
      name: "shortTitleEn",
      title: "Kurztitel Englisch",
      type: "string",
      group: "english",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "summaryEn",
      title: "Kurztext Englisch",
      type: "text",
      rows: 3,
      group: "english",
      validation: (Rule) => Rule.max(220),
    }),

    // --- Intern ---
    defineField({
      name: "order",
      title: "Sortierung",
      type: "number",
      group: "internal",
      description:
        "Kleinere Zahlen erscheinen weiter vorne. Neue Projekte bekommen automatisch die kleinste Zahl und stehen damit ganz vorne.",
      initialValue: async (_params, { getClient }) => {
        const min = await getClient({ apiVersion: "2026-07-01" }).fetch<number | null>(
          `*[_type == "project" && defined(order)] | order(order asc)[0].order`,
        );
        return typeof min === "number" ? min - 10 : 100;
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "internal",
      description: "Technische Kennung, wird nicht in einer URL verwendet. Optional.",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "notes",
      title: "Interne Notizen",
      type: "text",
      rows: 3,
      group: "internal",
      description: "Nur für dich, erscheint nicht auf der Website.",
    }),
  ],
  orderings: [
    { title: "Reihenfolge auf der Website", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Jahr, neueste zuerst", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Zuletzt bearbeitet", name: "updatedDesc", by: [{ field: "_updatedAt", direction: "desc" }] },
  ],
  preview: {
    select: {
      title: "title",
      shortTitle: "shortTitle",
      client: "client.label",
      category: "category",
      year: "year",
      featured: "featured",
      media: "previewImage",
    },
    prepare({ title, shortTitle, client, category, year, featured, media }) {
      const categoryLabel = categoryOptions.find((option) => option.value === category)?.title;
      return {
        title: `${featured ? "★ " : ""}${shortTitle || title || "Neues Projekt"}`,
        subtitle: [client, categoryLabel, year].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
