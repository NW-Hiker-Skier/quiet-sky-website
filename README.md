# Quiet Sky Website

Public marketing website for Quiet Sky, built as a separate static site repo so it stays independent from the Android app code.

## Files

- `index.html` - production home page, based on the canonical `Quiet Sky Bold v3` design.
- `Privacy.html` - plain-language privacy and terms page.
- `styles-bold.css`, `feature-cards.css`, `cards.js` - shared visual system and native feature-card rendering.
- `assets/` - sky imagery, social preview, and app screen captures.
- `docs/DESIGN_SPEC.md` - design/product spec from the site package.
- `docs/SCREENS_NEEDED.md` - replacement spec for future app screen assets.

## Updating Screen Assets

The site is intentionally wired to stable filenames. When final app screens arrive, replace the matching files in `assets/` and keep these names:

- `screen-home-light.webp`
- `screen-privacy.webp`
- `screen-wind.webp`
- `screen-10day.webp`
- `screen-radar.webp`

The phone frame is provided by the website, so replacement captures should not include device chrome.

## Local Preview

Open `index.html` directly in a browser, or serve this folder with any simple static server.

## Privacy

No analytics, cookies, tracking pixels, or third-party scripts beyond Google Fonts are included.