import type { ProjectCategory } from "../lib/projects";

export type { ProjectCategory };

export const categoryOrder: ProjectCategory[] = [
  "poster",
  "clothing",
  "event",
  "3d-print",
  "various",
];

export const categoryIntros: Record<
  ProjectCategory,
  { de: string; en: string }
> = {
  poster: {
    de: "Plakative Motive für Bühne, Club und Festival.",
    en: "Bold visuals for stages, clubs and festivals.",
  },
  clothing: {
    de: "Merchandise, der als Motiv und Produkt funktioniert.",
    en: "Merchandise that works as both artwork and product.",
  },
  event: {
    de: "Auftritte mit klarer Hierarchie und Szene-Energie.",
    en: "Event visuals with clear hierarchy and scene energy.",
  },
  "3d-print": {
    de: "Funktionale Objekte für echte Nutzung.",
    en: "Functional objects for real use.",
  },
  various: {
    de: "Sonderformate zwischen Grafik, Objekt und Anwendung.",
    en: "Special formats between graphics, objects and use.",
  },
};

export const categoryLabels: Record<"all" | ProjectCategory, string> = {
  all: "Alle",
  event: "Eventdesign",
  poster: "Poster",
  clothing: "Merch",
  "3d-print": "3D-Print",
  various: "Objekte",
};

export const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meeronwg";
