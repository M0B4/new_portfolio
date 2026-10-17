import { defineConfig } from "astro/config";

// Keep in sync with SITE_URL in src/data/site.ts and public/CNAME.
const productionUrl = "https://mbarz.de";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || productionUrl,
  base: process.env.PUBLIC_BASE_PATH || "/",
  trailingSlash: "always",
  // The single stylesheet is small (~6 KB gzip); inlining removes the render-blocking request.
  build: {
    inlineStylesheets: "always",
  },
});
