import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

// Keep in sync with SITE_URL in src/data/site.ts.
const productionUrl = "https://mbarz.de";

// The Keystatic admin (/keystatic) edits local files and needs server routes, so it only runs in `astro dev`;
// the production build stays fully static.
const isDev = process.argv.includes("dev");

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || productionUrl,
  base: process.env.PUBLIC_BASE_PATH || "/",
  // Keystatic's admin and API routes have no trailing slash, so dev accepts both forms.
  trailingSlash: isDev ? "ignore" : "always",
  integrations: isDev ? [react(), keystatic()] : [],
  // The single stylesheet is small (~6 KB gzip); inlining removes the render-blocking request.
  build: {
    inlineStylesheets: "always",
  },
});
