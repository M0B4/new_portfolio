export function GET({ site }: { site?: URL }) {
  const base = site?.toString().replace(/\/$/, "") ?? "https://moritzbarz.de";

  return new Response(`User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
