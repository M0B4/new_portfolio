import { getCollection } from "astro:content";

export async function GET({ site }: { site?: URL }) {
  const base = site?.toString().replace(/\/$/, "") ?? "https://moritzbarz.de";
  const projects = await getCollection("work");
  const urls = ["", ...projects.map((project) => `work/${project.id.replace(/\.md$/, "")}/`)];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${base}/${url}</loc>
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
