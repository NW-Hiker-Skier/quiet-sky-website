# Quiet Sky Website — Cloudflare Pages Deploy Runbook

Canonical domain: **getquietsky.app** (apex). `www.getquietsky.app` 301-redirects to apex.
Hosting: **Cloudflare Pages**, Git-connected to `NW-Hiker-Skier/quiet-sky-website` (branch `main`).
Account: Cloudflare account `Coldironguard@msn.com` (same account as the app proxy + maps).

## How deploys work (important)

This site uses **Git-connected Pages**. That means:

- **Every push to `main` on GitHub auto-deploys.** You do not run any deploy command,
  and you do not need to tell the assistant to deploy. Push and Cloudflare builds it.
- Pushes to other branches / PRs create **preview deployments** (separate URLs), not production.
- `_redirects` and `_headers` in the repo root are applied automatically on each deploy.

So: **edit → commit → push to `main` → live in ~1 minute.** Nothing manual.

## One-time setup (dashboard — the only step the CLI cannot do)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub, select repo **NW-Hiker-Skier/quiet-sky-website**.
3. Settings:
   - Production branch: **main**
   - Framework preset: **None**
   - Build command: **(leave empty)**
   - Build output directory: **/** (repo root — the site is plain static HTML/CSS/JS)
4. **Save and Deploy.** First deploy lands on a `*.pages.dev` URL.

## Custom domain (after the project exists)

1. In the Pages project → **Custom domains** → add **getquietsky.app**.
2. Add **www.getquietsky.app** as well (the `_redirects` file 301s it to the apex).
3. Cloudflare provisions DNS + TLS automatically because the zone is already on this
   Cloudflare account. Wait for the cert to go active.
4. Confirm no Worker route intercepts the apex: dashboard → the zone → **Workers Routes**;
   only `maps.getquietsky.app/*` (or similar) should be routed, NOT `getquietsky.app/*`.

## Files that control behavior

- `_redirects` — host canonicalization (www → apex, 301).
- `_headers` — security headers (HSTS, nosniff, frame-deny, permissions-policy) and
  cache policy. `/assets/*` cached hard; CSS/JS cached 1h w/ revalidation (filenames are
  stable, not content-hashed, so they must NOT be immutable); HTML always revalidates.

## Updating the site

- Normal content/asset edits: edit files, `git commit`, `git push origin main`. Auto-deploys.
- Replacing app screen captures: keep the stable filenames in `assets/` (see README).
- **Legal pages (Privacy.html / Terms.html):** these must stay verbatim-synced to the
  canonical `quietsky-privacy` repo (live public privacy policy + terms). Do not hand-edit
  legal prose here; update canonical first, then re-sync this site.

## Rollback

- Pages keeps every deployment. Dashboard → the project → **Deployments** → pick a prior
  good build → **Rollback to this deployment**. Or revert the commit and push.
