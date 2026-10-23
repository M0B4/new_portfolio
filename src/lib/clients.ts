import { getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import type { PortfolioProject } from "./projects";

export type ClientProfile = {
  slug: string;
  label: string;
  logo?: ImageMetadata;
  summary: string;
  summaryEn?: string;
  intro: string;
  introEn?: string;
};

export type ClientGroup = {
  profile: ClientProfile;
  projects: PortfolioProject[];
};

/** Client profiles from src/content/clients, in display order. Empty texts fall back to a generic one. */
export const loadClients = async (): Promise<ClientProfile[]> => {
  const entries = await getCollection("clients");
  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ id, data }) => ({
      slug: id,
      label: data.label,
      logo: data.logo ?? undefined,
      summary: data.summary ?? "Ausgewählte Arbeiten aus Portfolio, Szene und Anwendung.",
      summaryEn: data.summaryEn ?? "Selected work from portfolio, scene and application.",
      intro: data.intro ?? "Eine kuratierte Auswahl von Arbeiten mit klarem Fokus auf Wirkung, Lesbarkeit und saubere Umsetzung.",
      introEn:
        data.introEn ?? "A curated selection of work with a clear focus on impact, legibility and clean execution.",
    }));
};
