import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "hero", title: "Startseite", default: true },
    { name: "about", title: "Profil" },
    { name: "social", title: "Social Media" },
    { name: "seo", title: "SEO" },
    { name: "design", title: "Design" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Seitentitel",
      type: "string",
      initialValue: "Moritz Barz Portfolio",
      group: "seo",
    }),
    defineField({
      name: "description",
      title: "SEO-Beschreibung",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "descriptionEn",
      title: "SEO-Beschreibung Englisch",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "accentDark",
      title: "Highlightfarbe Dark Mode",
      type: "string",
      description: "Hex-Farbe, z. B. #e1262f.",
      initialValue: "#e1262f",
      group: "design",
      validation: (Rule) => Rule.regex(/^#[0-9a-fA-F]{6}$/, { name: "Hex-Farbe" }),
    }),
    defineField({
      name: "accentLight",
      title: "Highlightfarbe Light Mode",
      type: "string",
      description: "Hex-Farbe, z. B. #b40f1d.",
      initialValue: "#b40f1d",
      group: "design",
      validation: (Rule) => Rule.regex(/^#[0-9a-fA-F]{6}$/, { name: "Hex-Farbe" }),
    }),
    defineField({
      name: "backgroundTextureOpacity",
      title: "Hintergrund-Intensität",
      type: "number",
      description: "0 ist fast unsichtbar, 1 ist deutlich sichtbar.",
      initialValue: 0.1,
      group: "design",
      validation: (Rule) => Rule.min(0).max(1),
    }),
    defineField({
      name: "heroKickerDe",
      title: "Hero Kicker Deutsch",
      type: "string",
      group: "hero",
      description: "Kleine Zeile über der Überschrift. Alle Startseiten-Felder: leer lassen = Standardtext.",
    }),
    defineField({
      name: "heroTitleDe",
      title: "Hero Titel Deutsch",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTextDe",
      title: "Hero Text Deutsch",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroKickerEn",
      title: "Hero Kicker Englisch",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitleEn",
      title: "Hero Titel Englisch",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTextEn",
      title: "Hero Text Englisch",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "aboutTextDe",
      title: "Profiltext Deutsch",
      type: "text",
      rows: 6,
      description: "Absätze mit einer Leerzeile trennen.",
      group: "about",
    }),
    defineField({
      name: "aboutTextEn",
      title: "Profiltext Englisch",
      type: "text",
      rows: 6,
      group: "about",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "label",
              title: "Plattform",
              type: "string",
              options: { list: ["Instagram", "Facebook", "YouTube", "TikTok", "Behance", "LinkedIn"] },
              description: "Für diese Plattformen erscheint ein Icon; eigene Namen werden als Text gezeigt.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Website-Einstellungen",
      };
    },
  },
});
