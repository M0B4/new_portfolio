import { ClockIcon } from "@sanity/icons/Clock";
import { CogIcon } from "@sanity/icons/Cog";
import { FolderIcon } from "@sanity/icons/Folder";
import { ImagesIcon } from "@sanity/icons/Images";
import { StarIcon } from "@sanity/icons/Star";
import { TagsIcon } from "@sanity/icons/Tags";
import { UsersIcon } from "@sanity/icons/Users";
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import type { StructureResolver } from "sanity/structure";
import { categoryOptions } from "./schemas/categoryOptions";

const byWebsiteOrder = [{ field: "order", direction: "asc" as const }];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Website-Einstellungen")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Website-Einstellungen")),
      S.divider(),

      S.listItem()
        .title("Alle Projekte")
        .icon(ImagesIcon)
        .child(S.documentTypeList("project").title("Alle Projekte").defaultOrdering(byWebsiteOrder)),

      // Pick a client first – "+" then creates a project with that client already set.
      S.listItem()
        .title("Projekte nach Kunde")
        .icon(FolderIcon)
        .child(
          S.documentTypeList("client")
            .title("Kunde wählen")
            .defaultOrdering(byWebsiteOrder)
            .child((clientId) =>
              S.documentList()
                .title("Projekte")
                .schemaType("project")
                .filter('_type == "project" && client._ref == $clientId')
                .params({ clientId })
                .defaultOrdering(byWebsiteOrder)
                .initialValueTemplates([S.initialValueTemplateItem("project-for-client", { clientId })]),
            ),
        ),

      S.listItem()
        .title("Projekte nach Arbeitsart")
        .icon(TagsIcon)
        .child(
          S.list()
            .title("Arbeitsart wählen")
            .items(
              categoryOptions.map((category) =>
                S.listItem()
                  .id(category.value)
                  .title(category.title)
                  .child(
                    S.documentList()
                      .title(category.title)
                      .schemaType("project")
                      .filter('_type == "project" && category == $category')
                      .params({ category: category.value })
                      .defaultOrdering(byWebsiteOrder)
                      .initialValueTemplates([
                        S.initialValueTemplateItem("project-for-category", { category: category.value }),
                      ]),
                  ),
              ),
            ),
        ),

      S.listItem()
        .title("Hervorgehoben")
        .icon(StarIcon)
        .child(
          S.documentList()
            .title("Hervorgehoben")
            .schemaType("project")
            .filter('_type == "project" && featured == true')
            .defaultOrdering(byWebsiteOrder),
        ),

      S.listItem()
        .title("Zuletzt bearbeitet")
        .icon(ClockIcon)
        .child(
          S.documentList()
            .title("Zuletzt bearbeitet")
            .schemaType("project")
            .filter('_type == "project"')
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
        ),

      // To-do list: what is still missing for accessibility, English version and print specs.
      S.listItem()
        .title("Unvollständig")
        .icon(WarningOutlineIcon)
        .child(
          S.list()
            .title("Unvollständig")
            .items([
              S.listItem()
                .id("missing-alt")
                .title("Ohne Alt-Text")
                .child(
                  S.documentList()
                    .title("Ohne Alt-Text")
                    .schemaType("project")
                    .filter('_type == "project" && (!defined(previewImage.alt) || previewImage.alt == "")'),
                ),
              S.listItem()
                .id("missing-en")
                .title("Ohne englischen Text")
                .child(
                  S.documentList()
                    .title("Ohne englischen Text")
                    .schemaType("project")
                    .filter('_type == "project" && !defined(summaryEn)'),
                ),
              S.listItem()
                .id("missing-specs")
                .title("Ohne Druckangaben")
                .child(
                  S.documentList()
                    .title("Ohne Druckangaben")
                    .schemaType("project")
                    .filter('_type == "project" && !defined(specs)'),
                ),
            ]),
        ),
      S.divider(),

      S.documentTypeListItem("client").title("Kunden").icon(UsersIcon),
      S.documentTypeListItem("category").title("Arbeitsarten").icon(TagsIcon),
    ]);
