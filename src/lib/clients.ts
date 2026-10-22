import { getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import type { PortfolioProject } from "./projects";

export type ClientProfile = {
  slug: string;
  label: string;
  /** Full name, e.g. "Wacken Open Air". */
  title?: string;
  logo?: ImageMetadata;
  summary: string;
  summaryEn?: string;
  intro: string;
  introEn?: string;
  order: number;
};

export type ClientGroup = {
  profile: ClientProfile;
  projects: PortfolioProject[];
  order: number;
};

/** Client profiles from src/content/clients, in display order. Empty texts fall back to a generic one. */
export const loadClients = async (): Promise<ClientProfile[]> => {
  const entries = await getCollection("clients");
  return entries
    .map(({ id, data }) => ({
      slug: id,
      label: data.label,
      title: data.title,
      logo: data.logo ?? undefined,
      summary: data.summary ?? "Ausgewählte Arbeiten aus Portfolio, Szene und Anwendung.",
      summaryEn: data.summaryEn ?? "Selected work from portfolio, scene and application.",
      intro: data.intro ?? "Eine kuratierte Auswahl von Arbeiten mit klarem Fokus auf Wirkung, Lesbarkeit und saubere Umsetzung.",
      introEn:
        data.introEn ?? "A curated selection of work with a clear focus on impact, legibility and clean execution.",
      order: data.order,
    }))
    .sort((a, b) => a.order - b.order);
};

export const getClientGroups = (projects: PortfolioProject[], profiles: ClientProfile[] = []) => {
  const groups = projects.reduce<Record<string, ClientGroup>>((groups, project) => {
    const profile = project.clientProfile;
    groups[profile.slug] ??= { profile, projects: [], order: profile.order };
    groups[profile.slug].projects.push(project);
    return groups;
  }, {});

  profiles.forEach((profile) => {
    groups[profile.slug] ??= { profile, projects: [], order: profile.order };
  });

  return Object.values(groups)
    .map((group) => ({
      ...group,
      projects: group.projects.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => a.order - b.order);
};
