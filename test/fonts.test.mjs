import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const pages = ['index.html', 'Privacy.html', 'Terms.html', 'Story.html'];
const css = await readFile(new URL('fonts.css', root), 'utf8');
const manifest = JSON.parse(await readFile(new URL('assets/fonts/manifest.json', root), 'utf8'));
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

test('every page loads the local fonts before the visual styles', async () => {
  for (const page of pages) {
    const html = await readFile(new URL(page, root), 'utf8');
    const fontLinks = [...html.matchAll(/<link\b[^>]*href="fonts\.css"[^>]*>/g)];
    assert.equal(fontLinks.length, 1, page);
    assert.match(fontLinks[0][0], /rel="stylesheet"/, page);
    assert.ok(fontLinks[0].index < html.indexOf('href="styles-bold.css"'), page);
    assert.doesNotMatch(html, /fonts\.(?:googleapis|gstatic)\.com/i, page);
  }
});

test('font declarations retain both families, requested weights, Unicode subsets and swap', () => {
  const faces = [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].map((match) => match[1]);
  assert.equal(faces.length, 10);
  assert.equal(manifest.fonts.length, 10);
  const coverage = new Map([
    ['Hanken Grotesk', ['cyrillic-ext', 'vietnamese', 'latin-ext', 'latin']],
    ['JetBrains Mono', ['cyrillic-ext', 'cyrillic', 'greek', 'vietnamese', 'latin-ext', 'latin']],
  ]);
  for (const [family, subsets] of coverage) {
    assert.deepEqual(manifest.fonts.filter((font) => font.family === family).map((font) => font.subset), subsets);
  }
  for (const font of manifest.fonts) {
    const face = faces.find((block) => block.includes(`url(assets/fonts/${font.file})`));
    assert.ok(face, font.file);
    assert.ok(face.includes(`font-family: '${font.family}';`), font.file);
    assert.ok(face.includes(`font-weight: ${font.family === 'Hanken Grotesk' ? '400 800' : '400 600'};`), font.file);
    assert.ok(face.includes(`unicode-range: ${font.unicodeRange};`), font.file);
    assert.match(face, /font-style: normal;/, font.file);
    assert.match(face, /font-display: swap;/, font.file);
    assert.match(face, /format\('woff2'\)/, font.file);
  }
});

test('font files and licenses match their recorded upstream bytes', async () => {
  assert.equal(manifest.licenses.length, 2);
  const fontNames = [];
  for (const entry of [...manifest.fonts, ...manifest.licenses]) {
    assert.match(entry.file, /^[a-zA-Z0-9.-]+$/);
    const bytes = await readFile(new URL(`assets/fonts/${entry.file}`, root));
    assert.equal(sha256(bytes), entry.sha256, entry.file);
    if (entry.file.endsWith('.woff2')) {
      fontNames.push(entry.file);
      assert.match(entry.source, /^https:\/\/fonts\.gstatic\.com\/s\/(?:hankengrotesk|jetbrainsmono)\/v\d+\/[^/]+\.woff2$/);
      assert.equal(bytes.toString('ascii', 0, 4), 'wOF2', entry.file);
      assert.equal(bytes.readUInt32BE(8), bytes.length, entry.file);
      assert.ok(bytes.length > 1000, entry.file);
    } else {
      assert.match(entry.source, /^https:\/\/raw\.githubusercontent\.com\/google\/fonts\/[a-f0-9]{40}\/ofl\/(?:hankengrotesk|jetbrainsmono)\/OFL\.txt$/);
      assert.match(bytes.toString('utf8'), /SIL OPEN FONT LICENSE Version 1\.1/);
      assert.match(bytes.toString('utf8'), /Copyright/);
    }
  }
  const actual = (await readdir(new URL('assets/fonts/', root))).filter((file) => file.endsWith('.woff2'));
  assert.deepEqual(actual.sort(), fontNames.sort());
});

test('runtime stylesheets cannot request external fonts', async () => {
  const stylesheets = (await readdir(fileURLToPath(root))).filter((file) => file.endsWith('.css'));
  for (const stylesheet of stylesheets) {
    const source = await readFile(new URL(stylesheet, root), 'utf8');
    assert.doesNotMatch(source, /@import\b/i, stylesheet);
    assert.doesNotMatch(source, /fonts\.(?:googleapis|gstatic)\.com/i, stylesheet);
  }
  const urls = [...css.matchAll(/url\(([^)]+)\)/g)].map((match) => match[1]);
  assert.equal(urls.length, manifest.fonts.length);
  for (const url of urls) assert.match(url, /^assets\/fonts\/[a-z0-9-]+\.woff2$/);
});
