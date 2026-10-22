# Moritz Barz Portfolio

Astro-Portfolio (statisch, GitHub Pages) unter **https://mbarz.de**. Inhalte kommen aus Sanity; lokale
Markdown-Dateien dienen als Offline-Fallback.

## Entwicklung

```bash
npm install
npm run dev        # Website auf http://127.0.0.1:4321
npm run studio     # Sanity Studio lokal
npm run check      # Typecheck (läuft auch in CI)
npm run build      # Statischer Build nach dist/
```

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `src/views/` | Seitenlayouts (Start, Kunde, Kategorie), sprachunabhängig |
| `src/pages/` | Routen: Deutsch unter `/`, Englisch unter `/en/` |
| `src/lib/content.ts` | Lädt alle Inhalte einmal pro Build (Sanity → Fallback Markdown) |
| `src/lib/i18n.ts` | UI-Texte DE/EN, lokalisierte Pfade |
| `src/data/site.ts` | Domain, Impressumsdaten, Fallback-Kategorien, Social Links |
| `sanity/schemas/` | Sanity-Schemas |

### URLs

| Deutsch | Englisch |
| --- | --- |
| `/` | `/en/` |
| `/kunden/<slug>/` | `/en/clients/<slug>/` |
| `/kategorien/<kategorie>/` | `/en/categories/<kategorie>/` |
| `/impressum/`, `/datenschutz/` | – (nur Deutsch) |

## Inhalte pflegen

Projekte, Kunden, Kategorien, Startseiten-/Profiltexte und Social Links werden im Sanity Studio gepflegt
(siehe [sanity/README.md](sanity/README.md)). Englische Felder sind optional – ohne Eintrag wird der deutsche
Text verwendet.

Ist Sanity nicht erreichbar oder leer, baut die Seite aus `src/content/work/*.md` und den Fallback-Daten in
`src/lib/clients.ts` / `src/data/site.ts`. Ein Build ohne Sanity lässt sich mit
`PUBLIC_SANITY_PROJECT_ID= npm run build` erzwingen.

## Impressum & Datenschutz

Die Pflichtangaben stehen in `src/data/site.ts` (`legal`). Solange Platzhalter gesetzt sind, gibt der Build
eine Warnung aus.

## Sanity → automatischer Rebuild

Der Deploy-Workflow reagiert auf das `repository_dispatch`-Event `sanity-content-changed`:

1. GitHub: Fine-grained Personal Access Token mit Berechtigung **Contents: Read and write** für dieses Repo
   erstellen.
2. Sanity → Project → API → Webhooks → **Create webhook**:
   - URL: `https://api.github.com/repos/<owner>/<repo>/dispatches`
   - Trigger on: Create, Update, Delete · Filter: `_type in ["project", "client", "category", "siteSettings"]`
   - HTTP method: `POST`
   - HTTP headers: `Authorization: Bearer <token>`, `Accept: application/vnd.github+json`
   - Projection: `{"event_type": "sanity-content-changed"}`

## Umgebungsvariablen

Siehe `.env.example`. Für GitHub Pages:

- Secret `PUBLIC_FORMSPREE_ENDPOINT` – Formspree-Endpunkt des Kontaktformulars
- Variable `PUBLIC_PLAUSIBLE_DOMAIN` – optional, aktiviert cookielose Statistik mit Plausible
  (der Datenschutz-Abschnitt dazu erscheint dann automatisch)

## Cloudflare Pages

Ziel-Hosting (ersetzt GitHub Pages, sobald die Domain umgestellt ist). Cloudflare baut jeden Push selbst:
`main` geht live, jeder andere Branch bekommt eine Vorschau unter `*.pages.dev` (per `X-Robots-Tag` von der
Indexierung ausgeschlossen).

- Build-Befehl `npm run build`, Ausgabeordner `dist`, Node-Version aus `.node-version` (zusätzlich
  `NODE_VERSION=24` im Dashboard setzen, damit auch Builds ohne diese Datei npm 11 bekommen)
- Umgebungsvariablen: `PUBLIC_FORMSPREE_ENDPOINT`, optional `PUBLIC_PLAUSIBLE_DOMAIN`,
  `ASTRO_TELEMETRY_DISABLED=1`. `PUBLIC_SITE_URL` und `PUBLIC_BASE_PATH` nicht setzen, die Standardwerte passen.
- Cache- und Sicherheits-Header stehen in `public/_headers`.

## GitHub Pages

`.github/workflows/deploy.yml` baut und deployt bei jedem Push auf `main`, bei Sanity-Änderungen und manuell.
Die Domain kommt aus `public/CNAME`. `.github/workflows/lighthouse.yml` prüft Pull Requests mit Lighthouse
(Schwellenwerte in `lighthouserc.json`).
