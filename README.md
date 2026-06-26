# Moritz Barz Portfolio

Astro portfolio site for static hosting on GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static output is generated in `dist/`.

## Add A Project

1. Add your images to `src/assets/`.
2. Copy one file from `src/content/work/`.
3. Rename the copy to the desired URL slug, for example:

```txt
src/content/work/my-new-project.md
```

4. Update the frontmatter:

```md
---
title: "My New Project"
shortTitle: "New Project"
category: "poster"
summary: "Short teaser for the portfolio card."
client: "Client Name"
year: "2026"
previewImage: "../../assets/poster/my-image.webp"
heroImage: "../../assets/poster/my-image.webp"
details:
  - "Poster Design"
services:
  - "Art Direction"
gallery:
  - image: "../../assets/poster/my-image.webp"
    title: "Poster Artwork"
order: 110
---

Longer project description for the detail page.
```

The detail page is generated automatically at `/work/my-new-project/`.

Valid categories are:

- `event`
- `poster`
- `clothing`
- `3d-print`
- `various`

## Formspree

Set the Formspree endpoint with an environment variable:

```bash
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

For GitHub Pages, add this as a repository secret named:

```txt
PUBLIC_FORMSPREE_ENDPOINT
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site on every push to `main`.

It automatically detects whether the repository is a user page repository (`username.github.io`) or a project page repository and sets Astro's `site` and `base` values accordingly.
