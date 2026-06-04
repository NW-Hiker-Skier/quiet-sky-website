# Quiet Sky — Marketing Website Design Spec & PRD

**Product:** Quiet Sky — a privacy-forward Android weather app
**Artifact:** `quietsky.app` marketing + conversion site
**Canonical build:** `site/Quiet Sky Bold v3.html` (+ `Privacy.html`)
**Version:** v3.0 · **Date:** 3 June 2026 · **Status:** Published (review-ready)
**Positioning:** *A trust app that happens to be a weather app.*

---

## 1. Purpose & goals

Quiet Sky is the clean, privacy-first replacement for the weather apps that quietly sell location data. The site exists to convert privacy-minded Android users into installs by making one promise believable: **the forecast is yours, and you are nobody's product.**

### Primary goal
Drive **Google Play installs** ("Start free" trial).

### Secondary goals
- Make the privacy claim *credible* — demonstrate the mechanism, don't just assert it.
- Show the app is genuinely beautiful and capable (a privacy buyer still wants a great forecast).
- Read as light, confident, and considered — never corporate, never alarmist.

### Non-goals
- No pricing tables, feature-comparison grids, testimonials, blog, or newsletter capture.
- No cookie banners, analytics, or trackers (the site practices what it preaches).
- Not a docs site — `Privacy.html` is the only secondary page.

### Success signals
- Install-button click-through from hero and final CTA.
- Scroll-depth through the pinned feature section.
- Time-to-first-CTA under a few seconds (LCP-friendly hero).

---

## 2. Audience & principles

**Audience:** Android users who care about privacy — ex-Dark Sky loyalists, people who read app permissions, the "I don't want to be the product" crowd. Technically literate enough to appreciate a real mechanism; not necessarily engineers.

**Brand principles (carried from the manifesto + design tokens):**
1. **Trust looks more considered than the weather.** Restraint is the brand. Calm chrome, expressive data.
2. **Show, don't claim.** Every privacy statement maps to something the app actually does and the user can audit.
3. **One accent, used with discipline.** Blue is the single interaction accent. Privacy-green from the app is *not* used for marketing/excitement.
4. **Light, airy, editorial.** Big sky photography carries the warmth; type stays solid and confident.
5. **Accuracy is a feature.** On a privacy product, an over-reaching claim is the worst kind of bug.

---

## 3. Voice & copy rules

- **Confident, plain, unhurried.** Short declaratives. "They get the weather. Never you."
- **No em dashes** in body copy (manifesto rule) — use periods/commas.
- **Words to avoid:** "approximate," "coarsen/blur," absolutist claims ("nothing, ever," "couldn't find you if it tried").
- **Privacy framing:** the win is **consent + unlinkability + non-retention**, not "no one ever sees your IP."
- **Platform:** Android is communicated through the Google Play CTA and "Android-native" in the footer — not over-emphasized in headlines.

---

## 4. Privacy claim accuracy (highest-priority constraint)

This governs all privacy copy. The defensible model is **two hops + non-retention**:

| Hop | What happens | What we may say |
|---|---|---|
| You → proxy | The proxy terminates the connection, so it briefly sees your IP. It uses coordinates to fetch the forecast, then discards connection details and logs nothing tied to you. | "Routed, never linked." "We keep no record of your requests." |
| Proxy → provider | A brand-new request carries only location + query. IP, device ID, and app headers are never forwarded. | "Providers never see your IP, your device, or you." |

**Hard rules:**
- ✅ Keep: "They get the weather. Never you." / "providers never see your IP, your device, or you." / "we keep no record of your requests."
- ❌ Never ship: "nothing stored, ever," "couldn't find you if it tried," or any **location-coarsening / ~1 km grid** promise (the app defaults to full precision; coarsening is an optional user setting, not a brand claim).
- The **receipt** strikes only the three things genuinely removed: `ip_address`, `device_id`, `identity` (shown as an em-dash value, framed as "never attached," not "collected then scrubbed").

---

## 5. Information architecture

Single long-scroll page, product-first, with the privacy proof following the demo.

1. **Sticky nav** — wordmark (gradient-sun mark + "QuietSky"), Features / Privacy links, primary Play CTA.
2. **Hero** — full-bleed clear-day sky fading to white; headline "Beautiful weather. / Real privacy."; sub; Play CTA; trust note; the real Android home screenshot.
3. **Features (pinned)** — section intro, then a pinned device that swaps through 6 surfaces as copy panels scroll:
   `01 Sunset quality · 02 Rain to the minute · 03 Details (wind) · 04 10-day · 05 Radar · 06 Widgets`
4. **Statement** — "Most weather apps sell where you are. This one can't."
5. **Privacy moment** — Privacy Dashboard screenshot + "Proof, not promises." with three checks.
6. **Receipt** — animated request card; the mechanism demonstrates itself on scroll.
7. **Final CTA** — "The sky is yours." + Play CTA over sky.
8. **Footer** — wordmark, tagline, Product/Company links (Privacy → `Privacy.html`, Contact → mailto), no-tracking note.

**Privacy page (`Privacy.html`):** plain-language two-hop explainer, "what we never collect," "what the proxy keeps," location-precision choice, "watch it yourself," brief Terms (`#terms` anchor).

---

## 6. Visual design system

### 6.1 Color tokens
| Token | Value | Use |
|---|---|---|
| `--canvas` | `#FFFFFF` | Page background |
| `--cream` / `--paper` | `#FBF7EF` / `#F7F4ED` | Warm alt-section wash (receipt band) |
| `--navy` | `#1F3A5F` | Brand ink, all headlines |
| `--ink` | `#16273D` | Primary body text |
| `--ink-2` | `#44546A` | Secondary text |
| `--ink-3` | `#6B7888` | Tertiary/meta (AA-validated on white) |
| `--trust` | `#0F86C6` | **The one accent** — links, kickers, ticks, checks, kept rows, selection |
| `--trust-deep` | `#0B6A9E` | Accent hover |
| `--trust-tint` | `#E4F1FA` | Accent backgrounds |
| `--sun-2` / `--sun-3` | `#FBC560` / `#E89A44` | Logo mark, warm sky highlight only |
| `--amber-ink` | `#B06A1E` | Text-safe warm (sparingly) |
| `--surface` / `--surface-2` | `#F6F8FB` / `#EEF2F8` | Cards |
| `--line` / `--line-2` / `--line-strong` | `#E5EBF2` / `#CBD6E2` / `#9FB0C2` | Borders/dividers |

> **Discipline rule:** privacy-green (`#1F7A4D` / `#6ED6A7`) from the app is reserved for *confirmed-protection states in-product only*. It must not appear in site chrome or CTAs. The only green on the site is the **aurora easter egg** (intentional night-sky color, not an accent).

### 6.2 Typography
- **Display / UI:** Hanken Grotesk (400–800). Headlines 700–800, tight tracking (-0.04 to -0.05em), line-height ~0.94–0.98.
- **Mono:** JetBrains Mono — kickers, receipt fields, trust notes, meta.
- **Fluid scale:** `clamp()` throughout. Hero `d1` up to ~138px; section heads `d2` ~92px, `d3` ~58px. Body 17–21px.
- **Rules:** `text-wrap: balance` on headings, `pretty` on paragraphs. Privacy words set in solid `--navy` (no gradient).

### 6.3 Layout & spacing
- Max width `--maxw: 1240px`; fluid gutter `clamp(22px, 5vw, 60px)`.
- Generous vertical rhythm: section padding `clamp(60px, 10vw, 150px)`.
- Flex/grid with `gap` for all groupings.
- Radii: cards 22px, large panels 30–34px, pills 999px. Soft navy-tinted shadows (`--shadow`, `--shadow-sm`).
- Easing: `cubic-bezier(0.2, 0, 0, 1)`.

### 6.4 Components
- **Play CTA** — `.btn-primary` (navy) / `.btn-trust` (blue) pill with Play glyph; `.btn-lg` variant.
- **Phone frame** — `.phone`: dark gradient bezel, thin uniform border, centered hole-punch camera dot (Android), aspect-ratio `1080/2640` to match the safe-area-padded screens.
- **App cards (native HTML, `cards.js`)** — Sunset prediction, Nowcast ("Rain in 8 minutes" + minute strip), Widgets cluster. Rendered live, not screenshotted, so they stay crisp. Canonical demo state: **52° Partly Cloudy, Bellevue; sunset best 8:32 / 8:41.**
- **Pinned feature stage** — sticky device + progress ticks on desktop; inline media per panel on mobile (<860px).
- **Receipt card** — mono before/after fields with a staggered strike-through animation on scroll.

### 6.5 Logo
Gradient-sun mark: a radial-gradient sun disc (`#FFF6D8 → #FBC560 → #E89A44`) with a soft highlight, paired with the **Quiet**(navy, 700) **Sky**(slate, 500) wordmark. *Not a shield.*

---

## 7. Motion

- **Scroll reveals** — fade-up via IntersectionObserver; once only.
- **Pinned stage** — card cross-fades driven by which copy panel is centered; ticks track progress.
- **Receipt strike** — IP / device / identity struck one-by-one when the card enters view.
- **Nowcast/packet** — minute-by-minute intensity bars.
- **Aurora easter egg** — clicking the wordmark washes a soft aurora ("clear nights have a secret") across the top, then fades. A surprise, not a feature.
- **Reduced motion** — every animation has a `prefers-reduced-motion` fallback to its end-state (reveals show, stage cross-fades only, receipt shows the struck state instantly). No infinite decorative loops.

---

## 8. Accessibility

- Color contrast meets WCAG AA (tertiary text `--ink-3 #6B7888` ≈ 4.9:1 on white).
- Decorative SVGs `aria-hidden`; all controls carry text or `aria-label`.
- Wordmark easter-egg trigger is keyboard-operable (Enter/Space).
- Respects font scaling (fluid type), reduced-motion, and is fully responsive to 390px.

---

## 9. Performance & SEO

- **Images:** app screens delivered as WebP, < 100 KB each (down from ~1.2 MB PNG). Below-fold images use `loading="lazy"` + explicit `width`/`height` (CLS).
- **Fonts:** Google Fonts with `preconnect`.
- **No JS frameworks** — vanilla; `cards.js` is the only script.
- **Share/meta:** `og:title/description/url/image` (generated `og-image.png` share card), Twitter `summary_large_image`, `rel="canonical"`.
- **Zero tracking** by design (and stated in the footer).

---

## 10. Screen assets

Source of truth is the `aurora-reset` design system (render those, not older captures). Delivery standard and the full per-screen list live in **`site/SCREENS_NEEDED.md`**.

- **Format:** PNG masters → site converts to WebP. Portrait, **1080 × 2400** (3× of 360dp).
- **No device chrome** (the site adds the Android frame); **include** the app's own status bar + bottom nav.
- **Safe area:** masters should bake in a small top safe-area above the status bar. (v3 programmatically pads top/bottom with a matched-color band → working images are 1080 × 2640; frame aspect-ratio matches.)
- **Required set:** `screen-home-light` (hero — must show Private chip, 52°, "no rain in 6 hours"), `screen-privacy` (dark dashboard), `screen-wind`, `screen-10day`, `screen-radar`. Sunset / Nowcast / Widgets are native HTML and need no assets.

---

## 11. CTAs & links

- All three primary CTAs (nav, hero, final) point to the same Play Store URL (`play.google.com/store/apps/details?id=com.quietsky.app`).
- Footer: **Privacy → `Privacy.html`** (a dead privacy link is unacceptable on a privacy product), Terms → `Privacy.html#terms`, **Contact → `mailto:quiet.sky.weather@gmail.com`**.
- Trust note under CTAs: "Start free · no account · no ads."

---

## 12. File map

| File | Role |
|---|---|
| `Quiet Sky Bold v3.html` | **Canonical marketing page** |
| `Privacy.html` | Plain-language privacy + brief terms |
| `styles-bold.css` | Design-system tokens + page styles |
| `feature-cards.css` | Native app-card styles |
| `cards.js` | Renders Sunset / Nowcast / Widgets cards |
| `assets/` | WebP screens, sky backgrounds, `og-image.png` |
| `SCREENS_NEEDED.md` | Screen asset delivery spec |
| *Earlier explorations* | `Quiet Sky.html` (detailed), `Quiet Sky Bold.html` / `v2`, `Features Carousel/Parallax/Pinned.html` — superseded, kept for reference |

---

## 13. Open items / future

- Swap the custom Play badge for the official Google-issued asset before public launch.
- Confirm Play URL package id and final brand-name clearance ("Quiet Sky").
- Optional: wire real third-party audit / transparency-report links when available.
- Fresh home comp with top safe-area baked in (drop into `final-screens/website/` to reprocess).
- Confirm the launch app ships exactly **6 widget sizes** (Play Store accuracy).

---

*This spec documents the as-built v3. Privacy-claim accuracy (§4) is the controlling constraint — when in doubt, under-claim.*
