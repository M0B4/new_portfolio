import { SITE_URL } from "../data/site";

export function GET({ site }: { site?: URL }) {
  const sitemap = new URL("/sitemap.xml", site ?? SITE_URL);

  return new Response(`User-agent: *
Allow: /

Sitemap: ${sitemap}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
