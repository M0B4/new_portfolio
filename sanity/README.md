# Sanity Setup

Dieses Projekt ist so vorbereitet, dass Astro lokal weiter mit den vorhandenen Markdown-Projekten baut. Sobald die Sanity-Variablen gesetzt sind und dort Projekte existieren, nutzt die Website Sanity als Quelle.

## Bereiche im Studio

- `Projekt`: Portfolio-Kachel mit Titel, Kunde, Kategorie, Jahr, Kurztext, Hauptbild und Sortierung.
- `Kunde / Kontext`: Wacken, Metal im Dorf, DLRG usw. mit Logo, Intro und SEO-Kurztext.
- `Kategorie`: Poster, Merch, Eventdesign, 3D-Print und Objekte.
- `Website-Einstellungen`: Grundlage für spätere Pflege von Startseiten-Texten und SEO.

## Projekt Anlegen

1. Zuerst einen `Kunde / Kontext` anlegen.
2. Danach ein `Projekt` anlegen.
3. Als Kategorie einen der festen Werte wählen.
4. Ein Hauptbild hochladen.
5. `Sortierung` setzen. Kleinere Zahlen erscheinen weiter vorne.

Die Website zeigt weiterhin nur ein Bild pro Projekt. Projekt-Unterseiten sind bewusst nicht aktiv.

## Lokale Befehle

```bash
npm run studio
npm run build
```

## Benötigte Umgebungswerte

```bash
PUBLIC_SANITY_PROJECT_ID=...
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-07-01
SANITY_STUDIO_PROJECT_ID=...
SANITY_STUDIO_DATASET=production
```

Für GitHub Pages müssen die `PUBLIC_...` Werte als Repository-Secrets oder Build-Environment gesetzt werden, wenn live aus Sanity gebaut werden soll.
