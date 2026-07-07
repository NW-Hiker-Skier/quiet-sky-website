# Session Note: Play Store UTM Links

Date: 2026-07-06

Branch: `codex/quietsky-play-utm-links`

## Scope

Add privacy-safe UTM parameters to outbound Quiet Sky Google Play Store links.

No visible website copy, layout, imagery, styling, accessibility labels, privacy messaging, no-ads messaging, no-account messaging, or no-tracking messaging was changed.

No analytics, tracking SDK, tracking pixel, telemetry, cookies, fingerprinting, or redirect service was added.

No deployment was performed. This branch is for review only.

## Build System

The site is plain static HTML/CSS/JS.

Inspected:

- `README.md`
- `docs/CLOUDFLARE_DEPLOY.md`
- repo root file list

There is no `package.json`, `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`.

Configured Cloudflare Pages build command: none. Output directory: repo root.

## Link Implementation

Play links are duplicated directly in HTML page markup. There is no shared config/component/helper for the Play Store URL.

Target package for all links:

`app.getquietsky.android`

Base URL:

`https://play.google.com/store/apps/details?id=app.getquietsky.android`

## Play Links Changed

1. `index.html` nav CTA
   - `utm_source=website`
   - `utm_medium=referral`
   - `utm_campaign=site_launch`
   - `utm_content=nav`

2. `index.html` hero CTA
   - `utm_source=website`
   - `utm_medium=referral`
   - `utm_campaign=site_launch`
   - `utm_content=hero`

3. `index.html` bottom CTA
   - `utm_source=website`
   - `utm_medium=referral`
   - `utm_campaign=site_launch`
   - `utm_content=footer`

4. `Privacy.html` nav CTA
   - `utm_source=website`
   - `utm_medium=referral`
   - `utm_campaign=site_launch`
   - `utm_content=nav`

5. `Story.html` nav CTA
   - `utm_source=website`
   - `utm_medium=referral`
   - `utm_campaign=site_launch`
   - `utm_content=nav`

6. `Terms.html` nav CTA
   - `utm_source=website`
   - `utm_medium=referral`
   - `utm_campaign=site_launch`
   - `utm_content=nav`

## Validation

Commands run:

- `Test-Path -LiteralPath package.json; Test-Path -LiteralPath pnpm-lock.yaml; Test-Path -LiteralPath package-lock.json; Test-Path -LiteralPath yarn.lock`
  - Result: all `False`; no install step, lint, tests, typecheck, or production build command is configured for this static site.

- Static HTML link parser over `index.html`, `Privacy.html`, `Story.html`, and `Terms.html`
  - Result: found 6 Play links.
  - Result: all target `app.getquietsky.android`.
  - Result: all use `utm_source=website`, `utm_medium=referral`, `utm_campaign=site_launch`.
  - Result: content values are `nav`, `hero`, and `footer` as documented above.

- Static visible-text comparison against `HEAD` for modified HTML files
  - Result: visible text unchanged for `index.html`, `Privacy.html`, `Story.html`, and `Terms.html`.

- Diff scan for tracking/cookie/script additions
  - Result: no added Google Analytics, GA4, Firebase Analytics, tracking SDK, tracking pixel, analytics script, cookie, fingerprinting, `gtag`, `googletagmanager`, `google-analytics`, `firebase`, `<script`, or `document.cookie`.

## Deployment

No deployment command was run.

Because this work remains on `codex/quietsky-play-utm-links`, it was not merged to `main`.
