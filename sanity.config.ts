import { defineConfig, type InitialValueResolverContext, type SanityClient } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "21kc2n82";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const websiteUrl = "https://mbarz.de";
const apiVersion = "2026-07-01";

/** Fixed documents: editable, but never created, duplicated or deleted from the Studio. */
const fixedTypes = new Set(["siteSettings", "category"]);
const lockedActions = new Set(["delete", "duplicate", "unpublish"]);

/** New projects get the current year and the smallest order number, so they show up first. */
const newProjectDefaults = async (getClient: (options: { apiVersion: string }) => SanityClient) => {
  const smallest = await getClient({ apiVersion }).fetch<number | null>(
    `*[_type == "project" && defined(order)] | order(order asc)[0].order`,
  );
  return {
    year: String(new Date().getFullYear()),
    order: typeof smallest === "number" ? smallest - 10 : 100,
    featured: false,
  };
};

export default defineConfig({
  name: "moritz-barz-portfolio",
  title: "Moritz Barz Portfolio",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (previous) => [
      ...previous.filter((template) => !fixedTypes.has(template.schemaType)),
      {
        id: "project-for-client",
        title: "Projekt für diesen Kunden",
        schemaType: "project",
        parameters: [{ name: "clientId", type: "string" }],
        value: async ({ clientId }: { clientId: string }, { getClient }: InitialValueResolverContext) => ({
          ...(await newProjectDefaults(getClient)),
          client: { _type: "reference", _ref: clientId },
        }),
      },
      {
        id: "project-for-category",
        title: "Projekt dieser Arbeitsart",
        schemaType: "project",
        parameters: [{ name: "category", type: "string" }],
        value: async ({ category }: { category: string }, { getClient }: InitialValueResolverContext) => ({
          ...(await newProjectDefaults(getClient)),
          category,
        }),
      },
    ],
  },
  document: {
    // Only offer plain "Projekt" and "Kunde" in the global "+ Neu" menu.
    newDocumentOptions: (previous, { creationContext }) =>
      creationContext.type === "global"
        ? previous.filter((item) => ["project", "client"].includes(item.templateId))
        : previous,
    actions: (previous, { schemaType }) =>
      fixedTypes.has(schemaType) ? previous.filter(({ action }) => !action || !lockedActions.has(action)) : previous,
    // "Open preview" in the document menu jumps to the matching page on mbarz.de.
    productionUrl: async (previous, { document, getClient }) => {
      const doc = document as { _type: string; slug?: { current?: string }; value?: string; client?: { _ref?: string } };
      if (doc._type === "siteSettings") return `${websiteUrl}/`;
      if (doc._type === "category" && doc.value) return `${websiteUrl}/kategorien/${doc.value}/`;
      if (doc._type === "client" && doc.slug?.current) return `${websiteUrl}/kunden/${doc.slug.current}/`;
      if (doc._type === "project" && doc.client?._ref) {
        const slug = await getClient({ apiVersion }).fetch<string | null>(`*[_id == $id][0].slug.current`, {
          id: doc.client._ref,
        });
        if (slug) return `${websiteUrl}/kunden/${slug}/`;
      }
      return previous;
    },
  },
});
