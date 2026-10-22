# Moritz Barz Portfolio

Astro-Portfolio (statisch, Cloudflare Pages) unter **https://mbarz.de**. Alle Inhalte liegen als YAML-Dateien
und Bilder im Repo und werden lokal mit [Keystatic](https://keystatic.com) bearbeitet.

## Entwicklung

```bash
npm install
npm run dev        # Website auf http://127.0.0.1:4321, Keystatic auf http://127.0.0.1:4321/keystatic
npm run check      # Typecheck (läuft auch in CI)
npm run build      # Statischer Build nach dist/
```

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `src/views/` | Seitenlayouts (Start, Kunde, Kategorie), sprachunabhängig |
| `src/pages/` | Routen: Deutsch unter `/`, Englisch unter `/en/` |
| `src/content/` | Inhalte: `projects/`, `clients/`, `settings/site.yaml`, `settings/categories.yaml` |
| `src/assets/projects/`, `src/assets/logos/` | Projektbilder und Kundenlogos |
| `src/lib/content.ts` | Lädt alle Inhalte einmal pro Build |
| `src/lib/i18n.ts` | UI-Texte DE/EN, lokalisierte Pfade |
| `src/data/site.ts` | Domain, Impressumsdaten |
| `keystatic.config.ts` | Felder und Beschriftungen der Keystatic-Oberfläche |

### URLs

| Deutsch | Englisch |
| --- | --- |
| `/` | `/en/` |
| `/kunden/<slug>/` | `/en/clients/<slug>/` |
| `/kategorien/<kategorie>/` | `/en/categories/<kategorie>/` |
| `/impressum/`, `/datenschutz/` | – (nur Deutsch) |

## Inhalte pflegen

1. `npm run dev` starten und http://127.0.0.1:4321/keystatic öffnen.
2. Projekte, Kunden, Arbeitsarten oder Website-Texte bearbeiten und **Save** klicken. Keystatic schreibt die
   Änderungen direkt in `src/content/` und `src/assets/`.
3. Committen und auf `main` pushen. Cloudflare baut die Seite neu.

Englische Felder sind optional, ohne Eintrag wird der deutsche Text verwendet. Keystatic läuft nur mit
`npm run dev`, der Build für Cloudflare bleibt rein statisch. Jedes Projekt verweist auf einen Kunden in
`src/content/clients/`; fehlt er, bricht der Build mit einer Meldung ab.

## Impressum & Datenschutz

Die Pflichtangaben stehen in `src/data/site.ts` (`legal`). Solange Platzhalter gesetzt sind, gibt der Build
eine Warnung aus.

## Umgebungsvariablen

Siehe `.env.example`. Im Cloudflare-Pages-Projekt:

- `PUBLIC_FORMSPREE_ENDPOINT` – Formspree-Endpunkt des Kontaktformulars
- `PUBLIC_PLAUSIBLE_DOMAIN` – optional, aktiviert cookielose Statistik mit Plausible
  (der Datenschutz-Abschnitt dazu erscheint dann automatisch)

## Cloudflare Pages

Cloudflare baut jeden Push selbst: `main` geht live, jeder andere Branch bekommt eine Vorschau unter
`*.pages.dev` (per `X-Robots-Tag` von der Indexierung ausgeschlossen).

- Build-Befehl `npm run build`, Ausgabeordner `dist`, Node-Version aus `.node-version` (zusätzlich
  `NODE_VERSION=24` im Dashboard setzen, damit auch Builds ohne diese Datei npm 11 bekommen)
- Umgebungsvariablen: `PUBLIC_FORMSPREE_ENDPOINT`, optional `PUBLIC_PLAUSIBLE_DOMAIN`,
  `ASTRO_TELEMETRY_DISABLED=1`. `PUBLIC_SITE_URL` und `PUBLIC_BASE_PATH` nicht setzen, die Standardwerte passen.
- Cache- und Sicherheits-Header stehen in `public/_headers`.

## Lighthouse

`.github/workflows/lighthouse.yml` prüft Pull Requests mit `astro check` und Lighthouse (Schwellenwerte in
`lighthouserc.json`).
