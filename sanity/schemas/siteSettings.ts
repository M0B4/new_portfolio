import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Seitentitel",
      type: "string",
      initialValue: "Moritz Barz Portfolio",
    }),
    defineField({
      name: "description",
      title: "SEO-Beschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroKickerDe",
      title: "Hero Kicker Deutsch",
      type: "string",
    }),
    defineField({
      name: "heroTitleDe",
      title: "Hero Titel Deutsch",
      type: "string",
    }),
    defineField({
      name: "heroTextDe",
      title: "Hero Text Deutsch",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroKickerEn",
      title: "Hero Kicker Englisch",
      type: "string",
    }),
    defineField({
      name: "heroTitleEn",
      title: "Hero Titel Englisch",
      type: "string",
    }),
    defineField({
      name: "heroTextEn",
      title: "Hero Text Englisch",
      type: "text",
      rows: 3,
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
