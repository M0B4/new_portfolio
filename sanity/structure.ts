import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Website-Einstellungen")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("client").title("Partner / Kunden"),
      S.documentTypeListItem("project").title("Projekte"),
      S.documentTypeListItem("category").title("Kategorien"),
    ]);
