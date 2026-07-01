import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "21kc2n82";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "moritz-barz-portfolio",
  title: "Moritz Barz Portfolio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
