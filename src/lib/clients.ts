import type { PortfolioProject } from "./projects";
import type { SanityClientProfile } from "./sanity/client";

export type ClientProfile = {
  slug: string;
  label: string;
  logo?: string;
  /** Intrinsic logo size, known for Sanity assets. */
  logoWidth?: number;
  logoHeight?: number;
  summary: string;
  summaryEn?: string;
  intro: string;
  introEn?: string;
  order?: number;
};

export type ClientGroup = {
  profile: ClientProfile;
  projects: PortfolioProject[];
  order: number;
};

/** Offline fallback – the live values come from the Sanity `client` documents. */
export const clientProfiles: Record<string, ClientProfile> = {
  "Wacken Open Air": {
    slug: "wacken-open-air",
    label: "Wacken",
    logo: "images/logos/woa.webp",
    summary: "Merchandise, Objekte und Festivalgrafik für eine internationale Metal-Community.",
    summaryEn: "Merchandise, objects and festival graphics for an international metal community.",
    intro: "Arbeiten für Wacken Open Air verbinden Festival-Symbolik, Fernwirkung und Merchandise-Tauglichkeit. Jedes Motiv muss auf Textil, Objekt und im schnellen Blick funktionieren.",
    introEn: "Work for Wacken Open Air combines festival symbolism, long-distance impact and merchandise suitability. Every motif has to work on fabric, on objects and at a glance.",
    order: 10,
  },
  "DLRG Duisburg": {
    slug: "dlrg-duisburg",
    label: "DLRG",
    logo: "images/logos/dlrg.webp",
    summary: "Funktionale 3D-Drucklösungen für Ausrüstung im Einsatzkontext.",
    summaryEn: "Functional 3D-printed solutions for rescue equipment.",
    intro: "Für die DLRG stehen robuste Funktion, schnelle Zuordnung und zuverlässige Nutzung im Vordergrund. Gestaltung wird hier Teil der Ausrüstung.",
    introEn: "For the DLRG, robust function, quick identification and reliable use come first. Here, design becomes part of the equipment.",
    order: 11,
  },
  "Metal im Dorf": {
    slug: "metal-im-dorf",
    label: "Metal im Dorf",
    logo: "images/logos/mid.webp",
    summary: "Poster und Eventgrafik für lokale Bühnen mit klarer Heavy-Metal-Kante.",
    summaryEn: "Posters and event graphics for local stages with a clear heavy metal edge.",
    intro: "Für Metal im Dorf entstehen Arbeiten, die Szene-Energie und klare Information zusammenbringen: plakativ, rau und schnell lesbar.",
    introEn: "Work for Metal im Dorf brings scene energy and clear information together: bold, raw and quick to read.",
    order: 12,
  },
  "Poseidon Roses": {
    slug: "poseidon-roses",
    label: "Poseidon Roses",
    logo: "images/logos/poseidon.webp",
    summary: "3D-gedruckte Marker und Kennzeichnungen für Tauchausrüstung.",
    summaryEn: "3D-printed markers and labels for diving equipment.",
    intro: "Für Poseidon Roses liegt der Fokus auf Wiedererkennbarkeit, Materialtauglichkeit und praktischer Nutzung an Ausrüstung und Boot.",
    introEn: "For Poseidon Roses, the focus is on recognisability, material suitability and practical use on equipment and boat.",
    order: 13,
  },
  "Full Metal Army": {
    slug: "full-metal-army",
    label: "Full Metal Army",
    logo: "images/logos/fma.webp",
    summary: "Festival-Branding mit Sammlerwert und Community-Bezug.",
    summaryEn: "Festival branding with collector value and community spirit.",
    intro: "Für Full Metal Army entstehen Arbeiten, die Zugehörigkeit sichtbar machen und als Erinnerungsstück über den Einsatzmoment hinaus funktionieren.",
    introEn: "Work for Full Metal Army makes belonging visible and lasts as a keepsake beyond the moment.",
    order: 14,
  },
  "Headbangers Night": {
    slug: "metalheads-remigiusland",
    label: "Metalheads Remigiusland",
    logo: "images/logos/metalheads.webp",
    summary: "Eventgrafik und Posterdesign für Metalheads Remigiusland und Headbangers Night.",
    summaryEn: "Event graphics and poster design for Metalheads Remigiusland and Headbangers Night.",
    intro: "Für Metalheads Remigiusland zählt direkte Wirkung: Motive für Clubnächte und Szenekommunikation, die laut genug für Metal sind und trotzdem sauber informieren.",
    introEn: "For Metalheads Remigiusland, direct impact counts: visuals for club nights and scene communication that are loud enough for metal and still inform clearly.",
    order: 15,
  },
  "Metal Merch": {
    slug: "metal-merch",
    label: "Metal Merch",
    logo: "images/logos/metalmerch.webp",
    summary: "Merchandise-Kontext für Motive, Produkte und Szene-Artikel.",
    summaryEn: "Merchandise context for motifs, products and scene articles.",
    intro: "Metal Merch steht für Arbeiten rund um Produkte, Motive und Merchandise mit klarer Szene-Anbindung.",
    introEn: "Metal Merch stands for work around products, motifs and merchandise with a clear scene connection.",
    order: 16,
  },
  "Full Metal Mayrhofen": {
    slug: "full-metal-mayrhofen",
    label: "Full Metal Mayrhofen",
    logo: "images/logos/fmm.webp",
    summary: "Festival- und Eventkontext mit alpiner Metal-Kante.",
    summaryEn: "Festival and event context with an alpine metal edge.",
    intro: "Full Metal Mayrhofen steht für Festival- und Szenekommunikation mit klarer Heavy-Metal-Prägung.",
    introEn: "Full Metal Mayrhofen stands for festival and scene communication with a clear heavy metal character.",
    order: 17,
  },
};

const fallbackSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getClientProfile = (client: string): ClientProfile =>
  clientProfiles[client] ?? {
    slug: fallbackSlug(client),
    label: client,
    summary: "Ausgewählte Arbeiten aus Portfolio, Szene und Anwendung.",
    summaryEn: "Selected work from portfolio, scene and application.",
    intro: "Eine kuratierte Auswahl von Arbeiten mit klarem Fokus auf Wirkung, Lesbarkeit und saubere Umsetzung.",
    introEn: "A curated selection of work with a clear focus on impact, legibility and clean execution.",
  };

/** Merges a Sanity client document over the local fallback profile. */
export const fromSanityClient = (client: SanityClientProfile): ClientProfile => {
  const fallback = getClientProfile(client.title ?? client.label ?? "Portfolio");
  return {
    slug: client.slug || fallback.slug,
    label: client.label || fallback.label,
    logo: client.logo || undefined,
    logoWidth: client.logoWidth,
    logoHeight: client.logoHeight,
    summary: client.summary || fallback.summary,
    summaryEn: client.summaryEn || fallback.summaryEn,
    intro: client.intro || fallback.intro,
    introEn: client.introEn || fallback.introEn,
    order: client.order ?? fallback.order,
  };
};

export const getClientGroups = (projects: PortfolioProject[], extraProfiles: ClientProfile[] = []) => {
  const groups = projects.reduce<Record<string, ClientGroup>>((groups, project) => {
    const profile = project.clientProfile ?? getClientProfile(project.client);
    groups[profile.slug] ??= { profile, projects: [], order: profile.order ?? project.order };
    groups[profile.slug].projects.push(project);
    groups[profile.slug].order = profile.order ?? Math.min(groups[profile.slug].order, project.order);
    return groups;
  }, {});

  extraProfiles.forEach((profile, index) => {
    groups[profile.slug] ??= { profile, projects: [], order: profile.order ?? 900 + index };
  });

  return Object.values(groups)
    .map((group) => ({
      ...group,
      projects: group.projects.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => a.order - b.order);
};
