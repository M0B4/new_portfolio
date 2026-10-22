import { collection, config, fields, singleton } from "@keystatic/core";

// Content is edited locally (`npm run dev` → /keystatic) and committed as YAML plus images.
// The collections in src/content.config.ts read the same files at build time.

const categoryOptions = [
  { label: "Poster", value: "poster" },
  { label: "Shirts / Merch", value: "clothing" },
  { label: "Eventdesign", value: "event" },
  { label: "3D-Print", value: "3d-print" },
  { label: "Objekte", value: "various" },
] as const;

const projectImage = (label: string, description?: string) =>
  fields.image({
    label,
    description,
    directory: "src/assets/projects",
    publicPath: "../../assets/projects/",
  });

const category = (label: string) =>
  fields.object(
    {
      title: fields.text({ label: "Name", validation: { isRequired: true } }),
      titleEn: fields.text({ label: "Name Englisch" }),
      intro: fields.text({
        label: "Intro",
        multiline: true,
        description: "Ein Satz, erscheint auf der Startseite und der Kategorieseite.",
      }),
      introEn: fields.text({ label: "Intro Englisch", multiline: true }),
      order: fields.integer({
        label: "Sortierung",
        description: "Kleinere Zahlen erscheinen weiter vorne.",
        defaultValue: 100,
      }),
    },
    { label },
  );

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Moritz Barz" },
    navigation: {
      Inhalte: ["projects", "clients"],
      Einstellungen: ["site", "categories"],
    },
  },
  collections: {
    projects: collection({
      label: "Projekte",
      slugField: "title",
      path: "src/content/projects/*",
      format: { data: "yaml" },
      columns: ["title", "year"],
      schema: {
        title: fields.slug({
          name: { label: "Titel", validation: { isRequired: true } },
          slug: {
            label: "Dateiname",
            description: "Technische Kennung, erscheint nicht in einer URL.",
          },
        }),
        client: fields.relationship({
          label: "Kunde / Kontext",
          collection: "clients",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Arbeitsart",
          options: categoryOptions,
          defaultValue: "poster",
        }),
        year: fields.text({
          label: "Jahr",
          defaultValue: String(new Date().getFullYear()),
          validation: { isRequired: true, pattern: { regex: /^\d{4}$/, message: "Bitte eine Jahreszahl eingeben." } },
        }),
        previewImage: projectImage(
          "Hauptbild",
          "Das Bild in den Rastern der Website. Hochformat oder Quadrat, mindestens 1600 px breit.",
        ),
        alt: fields.text({
          label: "Alt-Text Hauptbild",
          description: "Was ist zu sehen? z. B. „Poster mit Totenkopf und Line-up in Rot“. Wichtig für Screenreader und Google.",
        }),
        summary: fields.text({
          label: "Kurztext",
          multiline: true,
          description: "Ein bis zwei Sätze. Erscheint in der Großansicht.",
          validation: { isRequired: true, length: { max: 220 } },
        }),
        gallery: fields.array(
          fields.object({
            image: projectImage("Bild"),
            alt: fields.text({ label: "Alt-Text" }),
          }),
          {
            label: "Weitere Bilder",
            description: "Fotos im Einsatz (Shirt am Stand, Poster an der Wand) oder Details.",
            itemLabel: (props) => props.fields.alt.value || "Bild",
          },
        ),
        specs: fields.text({
          label: "Druckangaben",
          description: "Kurz und technisch, z. B. „A2 · Siebdruck“. Erscheint unter dem Bild.",
          validation: { length: { max: 60 } },
        }),
        featured: fields.checkbox({
          label: "Hervorheben",
          description:
            "Das erste hervorgehobene Projekt wird Hero-Bild der Startseite; alle hervorgehobenen stehen in „Ausgewählte Arbeiten“ vorne.",
        }),
        shortTitle: fields.text({
          label: "Kurztitel",
          description: "Optional: kürzerer Titel für die Kachel.",
          validation: { length: { max: 60 } },
        }),
        titleEn: fields.text({ label: "Titel Englisch", description: "Optional. Ohne Eintrag wird der deutsche Text verwendet." }),
        shortTitleEn: fields.text({ label: "Kurztitel Englisch", validation: { length: { max: 60 } } }),
        summaryEn: fields.text({ label: "Kurztext Englisch", multiline: true, validation: { length: { max: 220 } } }),
        order: fields.integer({
          label: "Sortierung",
          description: "Kleinere Zahlen erscheinen weiter vorne.",
          defaultValue: 100,
        }),
        notes: fields.text({
          label: "Interne Notizen",
          multiline: true,
          description: "Nur für dich, erscheint nicht auf der Website.",
        }),
      },
    }),
    clients: collection({
      label: "Kunden",
      slugField: "label",
      path: "src/content/clients/*",
      format: { data: "yaml" },
      schema: {
        label: fields.slug({
          name: {
            label: "Name",
            description: "So erscheint der Kunde auf der Website, z. B. „Wacken“.",
            validation: { isRequired: true },
          },
          slug: {
            label: "Adresse (Slug)",
            description: "Teil der URL: mbarz.de/kunden/<slug>/. Später nicht mehr ändern, sonst brechen Links.",
          },
        }),
        title: fields.text({ label: "Vollständiger Name", description: "Optional, z. B. „Wacken Open Air“." }),
        logo: fields.image({
          label: "Logo",
          description: "Am besten weiß oder hell auf transparentem Hintergrund (PNG/WebP). Wird automatisch in Graustufen gezeigt.",
          directory: "src/assets/logos",
          publicPath: "../../assets/logos/",
        }),
        intro: fields.text({
          label: "Intro auf der Kundenseite",
          multiline: true,
          description: "Zwei, drei Sätze zu deiner Rolle für diesen Kunden.",
        }),
        summary: fields.text({
          label: "Kurzbeschreibung für Google",
          multiline: true,
          description: "Ein Satz, max. 180 Zeichen.",
          validation: { length: { max: 180 } },
        }),
        introEn: fields.text({ label: "Intro Englisch", multiline: true }),
        summaryEn: fields.text({ label: "Kurzbeschreibung Englisch", multiline: true, validation: { length: { max: 180 } } }),
        order: fields.integer({
          label: "Sortierung",
          description: "Reihenfolge der Kunden-Kacheln. Kleinere Zahlen erscheinen weiter vorne.",
          defaultValue: 100,
        }),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: "Website",
      path: "src/content/settings/site",
      format: { data: "yaml" },
      schema: {
        heroKickerDe: fields.text({ label: "Hero Kicker", description: "Kleine Zeile über der Überschrift." }),
        heroTitleDe: fields.text({ label: "Hero Titel" }),
        heroTextDe: fields.text({ label: "Hero Text", multiline: true }),
        heroKickerEn: fields.text({ label: "Hero Kicker Englisch" }),
        heroTitleEn: fields.text({ label: "Hero Titel Englisch" }),
        heroTextEn: fields.text({ label: "Hero Text Englisch", multiline: true }),
        aboutTextDe: fields.text({ label: "Profiltext", multiline: true, description: "Absätze mit einer Leerzeile trennen." }),
        aboutTextEn: fields.text({ label: "Profiltext Englisch", multiline: true }),
        description: fields.text({ label: "SEO-Beschreibung", multiline: true }),
        descriptionEn: fields.text({ label: "SEO-Beschreibung Englisch", multiline: true }),
        backgroundTextureOpacity: fields.number({
          label: "Hintergrund-Intensität",
          description: "0 ist fast unsichtbar, 1 ist deutlich sichtbar.",
          defaultValue: 0.1,
          step: 0.05,
          validation: { min: 0, max: 1 },
        }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({
              label: "Plattform",
              description: "Instagram, Facebook, YouTube, TikTok, Behance oder LinkedIn bekommen ein Icon; andere Namen erscheinen als Text.",
              validation: { isRequired: true },
            }),
            url: fields.url({ label: "URL", validation: { isRequired: true } }),
          }),
          { label: "Social Links", itemLabel: (props) => props.fields.label.value || "Link" },
        ),
      },
    }),
    categories: singleton({
      label: "Arbeitsarten",
      path: "src/content/settings/categories",
      format: { data: "yaml" },
      schema: {
        poster: category("Poster"),
        clothing: category("Shirts / Merch"),
        event: category("Eventdesign"),
        "3d-print": category("3D-Print"),
        various: category("Objekte"),
      },
    }),
  },
});
