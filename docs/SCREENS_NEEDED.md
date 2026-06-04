# Quiet Sky — Marketing Site Screen Assets Needed

Spec for the phone-screen images used across the marketing site. Hand this to whoever
renders the assets. **The pixel-perfect source for every screen is the `aurora-reset`
design system** (`aurora-reset/Reset.html` → the named React comps). Render those, not the
older `uploads/` captures (those show the *outdated* Home layout with the now-removed
"NOW" card + "Today Outlook").

---

## Global delivery standard (applies to every screen)

| Property | Spec |
|---|---|
| **Format** | PNG (lossless, UI stays crisp). sRGB. |
| **Orientation** | Portrait |
| **Aspect ratio** | **9 : 20** (the site frame is `960 × 2142` ≈ 0.448). Deliver at this ratio so nothing cover-crops. |
| **Target resolution** | **1080 × 2400 px** (3× of the 360 dp design). Acceptable minimum 900 × 2000. |
| **Device chrome** | **None.** No phone bezel, no rounded corners, no drop shadow, no notch/hole-punch — the website adds its own Android frame, corner radius, shadow, and a hole-punch dot overlay near top-center. |
| **In-app chrome** | **Include** the app's own Android status bar (top) and bottom nav bar (bottom), exactly as the app renders them. Keep the very top-center relatively clear (the site overlays a small camera dot there). |
| **Background** | Full-bleed screen content (opaque). |
| **Color/mode** | As specified per screen below. The site is light/airy; most screens are **Light mode**, with the Privacy Dashboard intentionally **Dark** (reads as "forensic"). |
| **File size** | Optimize to < 500 KB each where possible. |
| **Filenames** | Use the exact names below so they drop straight into `site/assets/`. |

> Cards rendered **natively** by the site (`cards.js`) — Sunset, Nowcast, Widgets — do **not**
> require image assets. They're listed at the end as *optional* in case you'd rather ship real
> app captures than the HTML rebuilds.

---

## PRIMARY SET — required by the canonical page (`Quiet Sky Bold v2.html`)

### 1. `screen-home-light.png` — Home (hero) ⭐ most important
- **Source comp:** `HomeCalm` mode `light` (canonical) — *or* `HomeGreatSunset` mode `light` if you want the sunset card visible in-frame.
- **Must show, top-to-bottom:** Android status bar → hero (painterly partly-cloudy sky, "Bellevue", **"Private" badge top-right**, "52°", "Partly Cloudy") → the **"No rain expected in the next 6 hours"** chip → top of the Hourly / 10-day. 
- **Must NOT show:** the old "NOW" card or "Today Outlook" (removed in the reset).
- **Critical:** the **Private badge must be clearly legible** — it's the one privacy cue in the hero.
- **Mode:** Light · **1080 × 2400**.

### 2. `screen-privacy.png` — Privacy Dashboard
- **Source comp:** `PrivacyDashboardFull` mode `dark`.
- **Must show:** trust hero claim grounded by the 30-pt numeric (e.g. "112 private weather checks"), the three numeric stat tiles, and the start of the receipts list.
- **Mode:** Dark · **1080 × 2400**.

### 3. `screen-wind.png` — Details · Wind
- **Source comp:** `wind-detail.jsx` → Details, metric `wind`, mode `light` (the dedicated wind detail screen).
- **Must show:** the hourly **wind chart** with peak / low callouts (e.g. peak 5 mph, low 0 mph), metric header.
- **Mode:** Light · **1080 × 2400**.

### 4. `screen-10day.png` — 10-day forecast
- **Source comp:** `HomeCalm` light scrolled to the **10-day card**, or a dedicated forecast screen showing the full 10-day list.
- **Must show:** the **gradient temperature-range bars** (cool low → warm high) per day, ideally the hourly strip above it for context.
- **Mode:** Light · **1080 × 2400**.

### 5. `screen-radar.png` — Radar
- **Source comp:** Radar screen from `screens.jsx` (mode `light` preferred to match the light site; dark acceptable if light isn't built).
- **Must show:** map-first layout, quiet basemap, the **time scrubber**, Puget Sound region.
- **Mode:** Light preferred · **1080 × 2400**.

---

## SECONDARY SET — used by the alternate layout pages
*(`Quiet Sky.html`, `Quiet Sky Bold.html`, `Features Carousel/Parallax/Pinned.html`). Only needed if those stay in play.)*

### 6. `screen-readiness.png` — Glanceable (AQI + Outdoor Readiness)
- **Source comp:** `HomeAqiConcern` mode `light` (or an expanded `AqiCard` + `OutdoorReadiness`).
- **Must show:** AQI card (12-bar chart) and the Outdoor Readiness rows.
- **Mode:** Light · **1080 × 2400**.

### 7. `screen-home-dark.png` — Home (dark) *(optional)*
- **Source comp:** `HomeCalm` mode `dark` — supports the "dark-first by design" line.
- **Mode:** Dark · **1080 × 2400**.

---

## OPTIONAL — native card surfaces (only if you prefer real captures over the HTML rebuilds)
These are currently drawn by `site/cards.js` and need no assets. If you'd rather use real app
captures, deliver them as **transparent-background PNG crops of just the card** (not full screens),
at **2× (≈ 720 px wide)**:

- `card-sunset.png` — `SunsetCard` variant `featured`, quality `great` (gradient sky strip, "Great sunset expected", best-at 8:32 / sunset 8:41).
- `card-nowcast.png` — `NextCard` variant `rain-starting` (the "Rain in 8 minutes" minute-cast with the 30-column intensity strip).
- `widgets-cluster.png` — the widget gallery: the Sunset 2×2, Rain-in-30 2×2, and a wide 4×2 conditions widget. Could also be three separate transparent PNGs.

---

## Quick reference

| Filename | Screen | Mode | Source comp | Size |
|---|---|---|---|---|
| `screen-home-light.png` | Home / hero | Light | `HomeCalm` light | 1080×2400 |
| `screen-privacy.png` | Privacy Dashboard | Dark | `PrivacyDashboardFull` dark | 1080×2400 |
| `screen-wind.png` | Details · Wind | Light | `wind-detail.jsx` wind/light | 1080×2400 |
| `screen-10day.png` | 10-day forecast | Light | `HomeCalm` light → 10-day card | 1080×2400 |
| `screen-radar.png` | Radar | Light | `screens.jsx` Radar | 1080×2400 |
| `screen-readiness.png` | AQI + Readiness | Light | `HomeAqiConcern` light | 1080×2400 |
| `screen-home-dark.png` *(opt)* | Home dark | Dark | `HomeCalm` dark | 1080×2400 |
| `card-sunset.png` *(opt)* | Sunset card | — | `SunsetCard` featured/great | 720 wide, transparent |
| `card-nowcast.png` *(opt)* | Nowcast card | — | `NextCard` rain-starting | 720 wide, transparent |
| `widgets-cluster.png` *(opt)* | Widgets | — | widget gallery | 720 wide, transparent |
