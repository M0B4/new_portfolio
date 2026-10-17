# Sanity Setup

Sanity ist die Hauptquelle für alle Inhalte. Die Website baut aus den lokalen Markdown-Projekten, wenn Sanity
nicht erreichbar ist oder keine Projekte enthält.

## Bereiche im Studio

- `Website-Einstellungen`: SEO-Texte, Akzentfarben, Hintergrund, Startseiten-Hero, Profiltext und Social Links.
- `Partner / Kunden`: Wacken, Metal im Dorf, DLRG usw. mit Logo, Intro und SEO-Kurztext (jeweils DE/EN).
- `Projekte`: Kachel mit Titel, Kunde, Kategorie, Jahr, Kurztext, Hauptbild (mit Alt-Text) und Sortierung.
  „Hervorheben“ setzt ein Projekt in die Bildcollage auf der Startseite (max. 3).
- `Kategorien`: Name und Intro (DE/EN) sowie Reihenfolge der Arbeitsarten.

Englische Felder sind optional; ohne Eintrag wird der deutsche Text angezeigt.

## Projekt anlegen

1. Zuerst einen `Kunde / Kontext` anlegen.
2. Danach ein `Projekt` anlegen und den Kunden verknüpfen.
3. Kategorie wählen, Hauptbild hochladen und einen **Alt-Text** eintragen (wichtig für Barrierefreiheit).
4. `Sortierung` setzen. Kleinere Zahlen erscheinen weiter vorne.

Die Website zeigt ein Bild pro Projekt; ein Klick öffnet die Großansicht (Lightbox).

## Lokale Befehle

```bash
npm run studio          # Studio lokal
npm run studio:deploy   # Studio unter <name>.sanity.studio veröffentlichen
```

## Benötigte Umgebungswerte

```bash
PUBLIC_SANITY_PROJECT_ID=...
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2026-07-01
SANITY_STUDIO_PROJECT_ID=...
SANITY_STUDIO_DATASET=production
```

Damit Änderungen automatisch live gehen, den Webhook aus der Haupt-README einrichten.
