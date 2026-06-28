export type ProjectCategory = "event" | "poster" | "clothing" | "3d-print" | "various";

export const categoryLabels: Record<"all" | ProjectCategory, string> = {
  all: "Alle",
  event: "Eventdesign",
  poster: "Poster",
  clothing: "Merch",
  "3d-print": "3D-Print",
  various: "Objekte",
};

export const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meeronwg";
