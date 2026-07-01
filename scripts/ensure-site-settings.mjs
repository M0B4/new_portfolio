import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-01" });

await client.createIfNotExists({
  _id: "siteSettings",
  _type: "siteSettings",
  title: "Moritz Barz Portfolio",
  description:
    "Portfolio von Moritz Barz: Poster, Merchandise, Eventdesign und funktionale 3D-Prints für Metal-Szene, Festivals und Tauchsport.",
  accentDark: "#e1262f",
  accentLight: "#b40f1d",
  backgroundTextureOpacity: 0.1,
  heroKickerDe: "Moritz Barz / Portfolio",
  heroTitleDe: "Grafik, Merch und Objekte für laute Kontexte.",
  heroTextDe:
    "Visuelle Arbeiten für Festivals, Events, Szene-Marken und funktionale Anwendungen: rau im Charakter, sauber in der Umsetzung.",
  heroKickerEn: "Moritz Barz / Portfolio",
  heroTitleEn: "Graphics, merch and objects for loud contexts.",
  heroTextEn:
    "Visual work for festivals, events, scene brands and functional use: rough in character, precise in execution.",
});

console.log("Site settings ready.");
