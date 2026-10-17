import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

export const client = defineType({
  name: "client",
  title: "Kunde / Kontext",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "basics", title: "Basis", default: true },
    { name: "english", title: "Englisch" },
    { name: "internal", title: "Intern" },
  ],
  fields: [
    defineField({
      name: "label",
      title: "Name",
      type: "string",
      group: "basics",
      description: "So erscheint der Kunde auf der Website, z. B. „Wacken“.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "basics",
      description: "Am besten weiß oder hell auf transparentem Hintergrund (PNG/WebP). Wird automatisch in Graustufen gezeigt.",
      options: { hotspot: false },
      fields: [defineField({ name: "alt", title: "Alt-Text", type: "string", description: "Optional, z. B. „Wacken Logo“." })],
    }),
    defineField({
      name: "intro",
      title: "Intro auf der Kundenseite",
      type: "text",
      rows: 4,
      group: "basics",
      description: "Zwei, drei Sätze zu deiner Rolle für diesen Kunden.",
    }),
    defineField({
      name: "summary",
      title: "Kurzbeschreibung für Google",
      type: "text",
      rows: 2,
      group: "basics",
      description: "Ein Satz, max. 180 Zeichen. Ohne Eintrag wird ein allgemeiner Text verwendet.",
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "introEn",
      title: "Intro Englisch",
      type: "text",
      rows: 4,
      group: "english",
    }),
    defineField({
      name: "summaryEn",
      title: "Kurzbeschreibung Englisch",
      type: "text",
      rows: 2,
      group: "english",
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "slug",
      title: "Adresse (Slug)",
      type: "slug",
      group: "internal",
      description: "Teil der URL: mbarz.de/kunden/<slug>/. Auf „Generate“ klicken; ohne Eintrag wird er aus dem Namen erzeugt. Später nicht mehr ändern, sonst brechen Links.",
      options: { source: "label", maxLength: 64 },
    }),
    defineField({
      name: "title",
      title: "Vollständiger Name",
      type: "string",
      group: "internal",
      description: "Optional, z. B. „Wacken Open Air“.",
    }),
    defineField({
      name: "order",
      title: "Sortierung",
      type: "number",
      group: "internal",
      description: "Reihenfolge der Kunden-Kacheln. Kleinere Zahlen erscheinen weiter vorne.",
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: "Reihenfolge auf der Website", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Name", name: "labelAsc", by: [{ field: "label", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "title",
      media: "logo",
    },
  },
});
