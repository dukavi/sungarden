# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Aurinkopuutarha Mustio — a multilingual static website for an apple orchard farm in Mustio, Raasepori. Built with Astro 5. Company name: Mustion Hedelmät.

## Commands

```bash
npm run dev       # Dev server (localhost:4321)
npm run build     # Production build to ./dist/
npm run preview   # Preview production build
```

## Architecture

### i18n

Three languages: Finnish (default, no URL prefix), Swedish (`/sv/`), English (`/en/`). Configured in `astro.config.mjs` with `prefixDefaultLocale: false`.

All translations live in `src/i18n/translations.ts` as a single `Record<Lang, Record<string, string>>`. Helper functions in `src/i18n/utils.ts`:
- `t(lang, key)` — translate a key
- `getLangFromUrl(url)` — extract lang from pathname
- `getLocalePath(lang, path)` — build localized URL
- `getAlternateUrls(path)` — get all language variants (for language switcher)

Each page file has a hardcoded `const lang = 'fi'|'sv'|'en'` and uses `t()` for all strings. Language variants are separate files in `src/pages/`, `src/pages/sv/`, `src/pages/en/`.

### Blog

Content collection defined in `src/content.config.ts`. Posts are Markdown/MDX files in `src/content/blog/` with frontmatter: `title`, `description`, `pubDate`, optional `updatedDate` and `heroImage`.

Blog posts are language-neutral — a single `src/pages/blog/[...slug].astro` route serves all posts at `/blog/<id>/`. The blog listing pages in each language directory all show the same posts.

### Styling

Global CSS variables in `src/styles/global.css` with light/dark mode via `@media (prefers-color-scheme: dark)`. Earthy palette: sage greens, warm cream, amber accents. Fonts: Playfair Display (headings) + Lora (body) from Google Fonts. Breakpoint at 720px.

Key variables: `--green`, `--cream`, `--brown`, `--amber`, `--border`, `--card-bg`, `--footer-bg`. Components use scoped `<style>` blocks referencing these variables.

### Images

Source images in `src/images/`. Imported in Astro files and rendered with `<Image>` component from `astro:assets` for automatic optimization via sharp.

## Adding Content

**New blog post:** Create `.md` file in `src/content/blog/` with required frontmatter. Automatically appears in all blog listings.

**New translation key:** Add to all three language objects in `src/i18n/translations.ts`, then use `t(lang, 'key')` in templates.

**New page:** Create in `src/pages/` (Finnish), then duplicate in `sv/` and `en/` subdirectories with appropriate `lang` constant.
