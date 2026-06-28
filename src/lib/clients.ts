import type { CollectionEntry } from "astro:content";

export type WorkProject = CollectionEntry<"work">;

type ClientProfile = {
  slug: string;
  label: string;
  logo?: string;
  summary: string;
  intro: string;
};

export const clientProfiles: Record<string, ClientProfile> = {
  "Wacken Open Air": {
    slug: "wacken-open-air",
    label: "Wacken",
    logo: "images/logos/woa.webp",
    summary: "Merchandise, Objekte und Festivalgrafik für eine internationale Metal-Community.",
    intro: "Arbeiten für Wacken Open Air verbinden Festival-Symbolik, Fernwirkung und Merchandise-Tauglichkeit. Jedes Motiv muss auf Textil, Objekt und im schnellen Blick funktionieren.",
  },
  "Metal im Dorf": {
    slug: "metal-im-dorf",
    label: "Metal im Dorf",
    logo: "images/logos/mid.webp",
    summary: "Poster und Eventgrafik für lokale Bühnen mit klarer Heavy-Metal-Kante.",
    intro: "Für Metal im Dorf entstehen Arbeiten, die Szene-Energie und klare Information zusammenbringen: plakativ, rau und schnell lesbar.",
  },
  "DLRG Duisburg": {
    slug: "dlrg-duisburg",
    label: "DLRG",
    logo: "images/logos/dlrg.webp",
    summary: "Funktionale 3D-Drucklösungen für Ausrüstung im Einsatzkontext.",
    intro: "Für die DLRG stehen robuste Funktion, schnelle Zuordnung und zuverlässige Nutzung im Vordergrund. Gestaltung wird hier Teil der Ausrüstung.",
  },
  "Poseidon Roses": {
    slug: "poseidon-roses",
    label: "Poseidon Roses",
    logo: "images/logos/poseidon.webp",
    summary: "3D-gedruckte Marker und Kennzeichnungen für Tauchausrüstung.",
    intro: "Für Poseidon Roses liegt der Fokus auf Wiedererkennbarkeit, Materialtauglichkeit und praktischer Nutzung an Ausrüstung und Boot.",
  },
  "Full Metal Army": {
    slug: "full-metal-army",
    label: "Full Metal Army",
    logo: "images/logos/fma.webp",
    summary: "Festival-Branding mit Sammlerwert und Community-Bezug.",
    intro: "Für Full Metal Army entstehen Arbeiten, die Zugehörigkeit sichtbar machen und als Erinnerungsstück über den Einsatzmoment hinaus funktionieren.",
  },
  "Headbangers Night": {
    slug: "headbangers-night",
    label: "Headbangers Night",
    logo: "images/logos/metalheads.webp",
    summary: "Posterdesign für Clubnächte mit klassischer Metal-Wucht.",
    intro: "Für Headbangers Night zählt direkte Wirkung: ein Motiv, das laut genug für die Szene ist und trotzdem sauber als Veranstaltungskommunikation funktioniert.",
  },
};

const fallbackSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getClientProfile = (client: string): ClientProfile =>
  clientProfiles[client] ?? {
    slug: fallbackSlug(client),
    label: client,
    summary: "Ausgewählte Arbeiten aus Portfolio, Szene und Anwendung.",
    intro: "Eine kuratierte Auswahl von Arbeiten mit klarem Fokus auf Wirkung, Lesbarkeit und saubere Umsetzung.",
  };

export const getClientGroups = (projects: WorkProject[]) =>
  Object.values(
    projects.reduce<Record<string, { profile: ClientProfile; projects: WorkProject[]; order: number }>>((groups, project) => {
      const profile = getClientProfile(project.data.client);
      groups[profile.slug] ??= { profile, projects: [], order: project.data.order };
      groups[profile.slug].projects.push(project);
      groups[profile.slug].order = Math.min(groups[profile.slug].order, project.data.order);
      return groups;
    }, {}),
  )
    .map((group) => ({
      ...group,
      projects: group.projects.sort((a, b) => a.data.order - b.data.order),
    }))
    .sort((a, b) => a.order - b.order);
