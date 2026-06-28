export type ProjectCategory = "event" | "poster" | "clothing" | "3d-print" | "various";

export const categoryLabels: Record<"all" | ProjectCategory, string> = {
  all: "Alle",
  event: "Eventdesign",
  poster: "Poster",
  clothing: "Merch",
  "3d-print": "3D-Print",
  various: "Objekte",
};

export const partners = [
  { name: "Metal im Dorf", logo: "images/logos/mid.webp" },
  { name: "Wacken Open Air", logo: "images/logos/woa.webp" },
  { name: "DLRG", logo: "images/logos/dlrg.webp" },
  { name: "Metal Merch", logo: "images/logos/metalmerch.webp" },
  { name: "Poseidon Roses", logo: "images/logos/poseidon.webp" },
  { name: "Metal Heads Remigiusland", logo: "images/logos/metalheads.webp" },
  { name: "Full Metal Army", logo: "images/logos/fma.webp" },
];

export const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/meeronwg";
