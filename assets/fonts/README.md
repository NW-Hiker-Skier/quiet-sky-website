# Website fonts

The website serves Hanken Grotesk and JetBrains Mono from this directory. Visitors do
not need to connect to Google Fonts to render any page. Both families are licensed
under the SIL Open Font License 1.1; the original copyright notices and licenses are
included as `Hanken-Grotesk-OFL.txt` and `JetBrains-Mono-OFL.txt`.

## Provenance and coverage

The WOFF2 files are **unmodified bytes** downloaded on 2026-10-27 from the official
Google Fonts CDN. `manifest.json` records the original stylesheet URL, individual
font URLs, Unicode ranges, requested weight ranges, SHA-256 hashes, and license URLs
pinned to commits in Google's `google/fonts` repository. The original website used
that same stylesheet request, with Hanken Grotesk weights 400/500/600/700/800 and
JetBrains Mono weights 400/500/600. The CDN returned the same variable WOFF2 URL for
each requested weight within a family/subset; `fonts.css` declares the corresponding
continuous ranges (400–800 and 400–600).

All subsets from that stylesheet are retained: Hanken Grotesk Latin, extended Latin,
Vietnamese, and extended Cyrillic; JetBrains Mono adds Cyrillic and Greek. Browser
Unicode selection and `font-display: swap` are preserved. Existing system fallback
stacks and all typography/layout rules remain in `styles-bold.css`.

The filenames include the CDN family version (`v12` / `v24`). When updating font
bytes, use new versioned filenames, update the source/hash manifest and stylesheet,
and retain both licenses. Do not overwrite an existing versioned file: `/assets/*`
has a long-lived cache policy.

## Verification

Run `node --test test/fonts.test.mjs` from the repository root. The tests require no
downloaded packages. Also preview all four pages in a browser with an empty cache;
check that both font families load, that no font decoding errors occur, that font
requests use the site's own origin, and that the layout matches the prior site at
desktop and mobile widths.
