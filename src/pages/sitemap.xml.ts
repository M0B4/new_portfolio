import { SITE_URL } from "../data/site";
import { getActiveCategories, getClientGroupsWithEmpty } from "../lib/content";
import { categoryPath, clientPath, legalPath, localizePath, type Alternates } from "../lib/i18n";

type SitemapEntry = { alternates: Alternates; priority: string; lastmod?: string };

const latest = (dates: (string | undefined)[]) =>
  dates.filter((date): date is string => Boolean(date)).sort().at(-1)?.slice(0, 10);

export async function GET({ site }: { site?: URL }) {
  const origin = site ?? new URL(SITE_URL);
  const clients = await getClientGroupsWithEmpty();
  const categories = await getActiveCategories();
  const allProjects = clients.flatMap((group) => group.projects);

  const entries: SitemapEntry[] = [
    {
      alternates: { de: localizePath("de"), en: localizePath("en") },
      priority: "1.0",
      lastmod: latest(allProjects.map((project) => project.updatedAt)),
    },
    ...clients.map((group) => ({
      alternates: { de: clientPath("de", group.profile.slug), en: clientPath("en", group.profile.slug) },
      priority: "0.8",
      lastmod: latest(group.projects.map((project) => project.updatedAt)),
    })),
    ...categories.map((category) => ({
      alternates: { de: categoryPath("de", category.value), en: categoryPath("en", category.value) },
      priority: "0.7",
      lastmod: latest(allProjects.filter((p) => p.category === category.value).map((project) => project.updatedAt)),
    })),
    { alternates: { de: legalPath("impressum") }, priority: "0.2" },
    { alternates: { de: legalPath("datenschutz") }, priority: "0.2" },
  ];

  const absolute = (path: string) => new URL(path, origin).toString();
  const urls = entries.flatMap(({ alternates, priority, lastmod }) => {
    const links = Object.entries(alternates).map(
      ([lang, path]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${absolute(path!)}" />`,
    );
    if (alternates.de && Object.keys(alternates).length > 1) {
      links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(alternates.de)}" />`);
    }
    return Object.values(alternates).map(
      (path) => `  <url>
    <loc>${absolute(path!)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <priority>${priority}</priority>
${links.join("\n")}
  </url>`,
    );
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
