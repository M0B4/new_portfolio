import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const workDir = path.join(root, "src", "content", "work");
const publicDir = path.join(root, "public");

const client = getCliClient({ apiVersion: "2026-07-01" });

const categories = [
  {
    _id: "category-poster",
    title: "Poster",
    value: "poster",
    introDe: "Plakative Motive für Bühne, Club und Festival.",
    introEn: "Bold visuals for stages, clubs and festivals.",
    order: 10,
  },
  {
    _id: "category-clothing",
    title: "Merch",
    value: "clothing",
    introDe: "Merchandise, der als Motiv und Produkt funktioniert.",
    introEn: "Merchandise that works as both artwork and product.",
    order: 20,
  },
  {
    _id: "category-event",
    title: "Eventdesign",
    value: "event",
    introDe: "Auftritte mit klarer Hierarchie und Szene-Energie.",
    introEn: "Event visuals with clear hierarchy and scene energy.",
    order: 30,
  },
  {
    _id: "category-3d-print",
    title: "3D-Print",
    value: "3d-print",
    introDe: "Funktionale Objekte für echte Nutzung.",
    introEn: "Functional objects for real use.",
    order: 40,
  },
  {
    _id: "category-various",
    title: "Objekte",
    value: "various",
    introDe: "Sonderformate zwischen Grafik, Objekt und Anwendung.",
    introEn: "Special formats between graphics, objects and use.",
    order: 50,
  },
];

const clientProfiles = {
  "Wacken Open Air": {
    slug: "wacken-open-air",
    label: "Wacken",
    logo: "images/logos/woa.webp",
    summary: "Merchandise, Objekte und Festivalgrafik für eine internationale Metal-Community.",
    intro:
      "Arbeiten für Wacken Open Air verbinden Festival-Symbolik, Fernwirkung und Merchandise-Tauglichkeit. Jedes Motiv muss auf Textil, Objekt und im schnellen Blick funktionieren.",
  },
  "Metal im Dorf": {
    slug: "metal-im-dorf",
    label: "Metal im Dorf",
    logo: "images/logos/mid.webp",
    summary: "Poster und Eventgrafik für lokale Bühnen mit klarer Heavy-Metal-Kante.",
    intro:
      "Für Metal im Dorf entstehen Arbeiten, die Szene-Energie und klare Information zusammenbringen: plakativ, rau und schnell lesbar.",
  },
  "DLRG Duisburg": {
    slug: "dlrg-duisburg",
    label: "DLRG",
    logo: "images/logos/dlrg.webp",
    summary: "Funktionale 3D-Drucklösungen für Ausrüstung im Einsatzkontext.",
    intro:
      "Für die DLRG stehen robuste Funktion, schnelle Zuordnung und zuverlässige Nutzung im Vordergrund. Gestaltung wird hier Teil der Ausrüstung.",
  },
  "Poseidon Roses": {
    slug: "poseidon-roses",
    label: "Poseidon Roses",
    logo: "images/logos/poseidon.webp",
    summary: "3D-gedruckte Marker und Kennzeichnungen für Tauchausrüstung.",
    intro:
      "Für Poseidon Roses liegt der Fokus auf Wiedererkennbarkeit, Materialtauglichkeit und praktischer Nutzung an Ausrüstung und Boot.",
  },
  "Full Metal Army": {
    slug: "full-metal-army",
    label: "Full Metal Army",
    logo: "images/logos/fma.webp",
    summary: "Festival-Branding mit Sammlerwert und Community-Bezug.",
    intro:
      "Für Full Metal Army entstehen Arbeiten, die Zugehörigkeit sichtbar machen und als Erinnerungsstück über den Einsatzmoment hinaus funktionieren.",
  },
  "Headbangers Night": {
    slug: "metalheads-remigiusland",
    label: "Metalheads Remigiusland",
    logo: "images/logos/metalheads.webp",
    summary: "Eventgrafik und Posterdesign für Metalheads Remigiusland und Headbangers Night.",
    intro:
      "Für Metalheads Remigiusland zählt direkte Wirkung: Motive für Clubnächte und Szenekommunikation, die laut genug für Metal sind und trotzdem sauber informieren.",
  },
  "Metal Merch": {
    slug: "metal-merch",
    label: "Metal Merch",
    logo: "images/logos/metalmerch.webp",
    summary: "Merchandise-Kontext für Motive, Produkte und Szene-Artikel.",
    intro: "Metal Merch steht für Arbeiten rund um Produkte, Motive und Merchandise mit klarer Szene-Anbindung.",
  },
  "Full Metal Mayrhofen": {
    slug: "full-metal-mayrhofen",
    label: "Full Metal Mayrhofen",
    logo: "images/logos/fmm.webp",
    summary: "Festival- und Eventkontext mit alpiner Metal-Kante.",
    intro: "Full Metal Mayrhofen steht für Festival- und Szenekommunikation mit klarer Heavy-Metal-Prägung.",
  },
};

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const readFrontmatter = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`No frontmatter found in ${filePath}`);
  const yaml = match[1];

  const get = (key) => {
    const value = yaml.match(new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\r\\n]+))`, "m"));
    return value ? (value[1] ?? value[2] ?? value[3]).trim() : undefined;
  };

  return {
    title: get("title"),
    shortTitle: get("shortTitle"),
    category: get("category"),
    summary: get("summary"),
    client: get("client"),
    year: get("year"),
    previewImage: get("previewImage"),
    order: Number(get("order") ?? 100),
  };
};

const imageField = async (filePath, existingImage, alt) => {
  if (existingImage?.asset?._ref) return existingImage;
  if (!filePath || !fs.existsSync(filePath)) return undefined;

  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
    ...(alt ? { alt } : {}),
  };
};

const upsertCategories = async () => {
  for (const category of categories) {
    await client.createOrReplace({
      _type: "category",
      ...category,
    });
  }
  console.log(`Categories migrated: ${categories.length}`);
};

const ensureSiteSettings = async () => {
  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Moritz Barz Portfolio",
    description:
      "Portfolio von Moritz Barz: Poster, Merchandise, Eventdesign und funktionale 3D-Prints für Metal-Szene, Festivals und Tauchsport.",
    accentDark: "#e1262f",
    accentLight: "#b40f1d",
    backgroundTextureOpacity: 0.1,
    heroKickerDe: "Moritz Barz / Portfolio",
    heroTitleDe: "Grafik, Merch und Objekte für laute Kontexte.",
    heroTextDe:
      "Visuelle Arbeiten für Festivals, Events, Szene-Marken und funktionale Anwendungen: rau im Charakter, sauber in der Umsetzung.",
    heroKickerEn: "Moritz Barz / Portfolio",
    heroTitleEn: "Graphics, merch and objects for loud contexts.",
    heroTextEn:
      "Visual work for festivals, events, scene brands and functional use: rough in character, precise in execution.",
  });

  console.log("Site settings ensured.");
};

const upsertClients = async () => {
  const entries = Object.entries(clientProfiles);

  for (const [title, profile] of entries) {
    const id = `client-${profile.slug}`;
    const existing = await client.fetch(`*[_id == $id][0]{logo}`, { id });
    const logoPath = profile.logo ? path.join(publicDir, profile.logo) : undefined;

    await client.createOrReplace({
      _id: id,
      _type: "client",
      title,
      label: profile.label,
      slug: {
        _type: "slug",
        current: profile.slug,
      },
      logo: await imageField(logoPath, existing?.logo, `${profile.label} Logo`),
      summary: profile.summary,
      intro: profile.intro,
      order: entries.findIndex(([key]) => key === title) + 10,
    });
  }

  console.log(`Clients migrated: ${entries.length}`);
};

const upsertProjects = async () => {
  const files = fs.readdirSync(workDir).filter((file) => file.endsWith(".md")).sort();
  let count = 0;

  for (const file of files) {
    const filePath = path.join(workDir, file);
    const data = readFrontmatter(filePath);
    const slug = file.replace(/\.md$/, "");
    const profile = clientProfiles[data.client] ?? {
      slug: slugify(data.client),
      label: data.client,
    };
    const id = `project-${slug}`;
    const existing = await client.fetch(`*[_id == $id][0]{previewImage}`, { id });
    const previewPath = data.previewImage ? path.resolve(path.dirname(filePath), data.previewImage) : undefined;

    await client.createOrReplace({
      _id: id,
      _type: "project",
      title: data.title,
      shortTitle: data.shortTitle,
      slug: {
        _type: "slug",
        current: slug,
      },
      client: {
        _type: "reference",
        _ref: `client-${profile.slug}`,
      },
      category: data.category,
      year: data.year,
      summary: data.summary,
      previewImage: await imageField(previewPath, existing?.previewImage, data.title),
      order: data.order,
      featured: false,
    });

    count += 1;
  }

  console.log(`Projects migrated: ${count}`);
};

await ensureSiteSettings();
await upsertCategories();
await upsertClients();
await upsertProjects();
console.log("Migration complete.");
