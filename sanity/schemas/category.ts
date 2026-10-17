import { TagsIcon } from "@sanity/icons/Tags";
import { defineField, defineType } from "sanity";
import { categoryOptions } from "./categoryOptions";

// The five categories are fixed (the website relies on their technical values);
// only names, intros and order are editable. Creating/deleting is disabled in sanity.config.ts.
export const category = defineType({
  name: "category",
  title: "Arbeitsart",
  type: "document",
  icon: TagsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introDe",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "Ein Satz, erscheint auf der Startseite und der Kategorieseite.",
    }),
    defineField({
      name: "titleEn",
      title: "Name Englisch",
      type: "string",
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
      description: "Reihenfolge auf der Website. Kleinere Zahlen erscheinen weiter vorne.",
      initialValue: 100,
    }),
    defineField({
      name: "value",
      title: "Technischer Wert",
      type: "string",
      readOnly: true,
      description: "Fest vorgegeben, nicht änderbar.",
      options: { list: categoryOptions },
    }),
  ],
  orderings: [{ title: "Reihenfolge auf der Website", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: {
      title: "title",
      subtitle: "introDe",
    },
  },
});
