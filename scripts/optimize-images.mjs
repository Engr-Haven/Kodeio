/**
 * optimize-images.mjs
 *
 * Pre-build step (npm `prebuild`). Generates WebP siblings for every raster
 * image in public/ under public/optimized/, and a 1200x630 social share image
 * at public/og-default.png. Components reference these through <picture>, with
 * the original PNG kept as the fallback.
 *
 * Output is git-ignored and rebuilt on demand; each file is skipped when its
 * .webp is already newer than the source, so repeat builds are cheap.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');
const outDir = path.join(publicDir, 'optimized');
const SOURCE_RE = /\.(png|jpe?g)$/i;

if (!fs.existsSync(publicDir)) {
  console.error('[images] public/ not found.');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const sources = fs
  .readdirSync(publicDir)
  .filter((file) => SOURCE_RE.test(file))
  // og-default.png is generated below from the logo; never WebP it.
  .filter((file) => file !== 'og-default.png')
  .filter((file) => fs.statSync(path.join(publicDir, file)).isFile());

let generated = 0;
let skipped = 0;

for (const file of sources) {
  const src = path.join(publicDir, file);
  const dest = path.join(outDir, `${path.parse(file).name}.webp`);

  if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) {
    skipped += 1;
    continue;
  }

  await sharp(src).rotate().webp({ quality: 82 }).toFile(dest);
  generated += 1;
}

/* Social share image: brand logo centred on white with a purple accent bar. */
const logoPath = path.join(publicDir, 'kodeio-logo.png');
if (fs.existsSync(logoPath)) {
  const logo = await sharp(logoPath).resize({ width: 760 }).toBuffer();
  const bar = Buffer.from(
    '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="0" y="600" width="1200" height="30" fill="#7d2eff"/></svg>'
  );

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      { input: logo, gravity: 'center' },
      { input: bar, top: 0, left: 0 },
    ])
    .png()
    .toFile(path.join(publicDir, 'og-default.png'));
}

console.log(
  `[images] ${generated} WebP generated, ${skipped} up to date, og-default.png refreshed`
);
