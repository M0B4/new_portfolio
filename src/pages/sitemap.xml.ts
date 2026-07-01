import { type ProjectCategory } from "../data/site";
import { getClientGroups } from "../lib/clients";
import { getPortfolioProjects } from "../lib/projects";

export async function GET({ site }: { site?: URL }) {
  const base = site?.toString().replace(/\/$/, "") ?? "https://moritzbarz.de";
  const projects = await getPortfolioProjects();
  const clients = getClientGroups(projects, true);
  const categoryOrder: ProjectCategory[] = ["poster", "clothing", "event", "3d-print", "various"];
  const categories = categoryOrder.filter((category) => projects.some((project) => project.category === category));
  const urls = [
    { path: "", priority: "1.0" },
    ...clients.map((client) => ({ path: `kunden/${client.profile.slug}/`, priority: "0.8" })),
    ...categories.map((category) => ({ path: `kategorien/${category}/`, priority: "0.7" })),
    { path: "impressum/", priority: "0.2" },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority }) => `  <url>
    <loc>${base}/${path}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
