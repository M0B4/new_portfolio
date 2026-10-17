import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "21kc2n82",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Hosted at https://mbarz.sanity.studio – keep in sync with SANITY_STUDIO_URL in src/data/site.ts
  studioHost: "mbarz",
  deployment: {
    appId: "et6azy5fznqey1yrihd91jlt",
  },
});
