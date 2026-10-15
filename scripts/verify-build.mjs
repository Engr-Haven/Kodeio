/**
 * verify-build.mjs
 *
 * Post-build guard. The whole SEO system (scripts/prerender.mjs) is silent when
 * it half-works: a broken resolver still produces valid-looking HTML, just with
 * the wrong — or default — tags. This fails the build instead of shipping it.
 *
 * Asserts, for every route in the single source (src/seo/routes.js) plus
 * 404.html:
 *   - the file exists,
 *   - <title>, a non-empty meta description, a canonical link and at least one
 *     JSON-LD block are present,
 *   - no literal "undefined" leaked into an attribute (a classic resolver bug),
 *   - <div id="root"> actually contains prerendered markup,
 * and that sitemap.xml lists every route and robots.txt points at it.
 *
 * Run automatically at the end of `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { allRoutes } from '../src/seo/routes.js';

const distDir = path.join(process.cwd(), 'dist');
let failures = 0;

function fail(message) {
  console.error(`[verify] FAIL  ${message}`);
  failures += 1;
}

function fileFor(route) {
  return route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

function checkRoute(route) {
  const file = fileFor(route);
  if (!fs.existsSync(file)) {
    fail(`${route}: missing ${path.relative(distDir, file)}`);
    return;
  }
  const html = fs.readFileSync(file, 'utf-8');

  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${route}: missing/empty <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html))
    fail(`${route}: missing meta description`);
  if (!/<link rel="canonical" href="[^"]+"/.test(html)) fail(`${route}: missing canonical link`);
  if (!/<script type="application\/ld\+json">/.test(html)) fail(`${route}: missing JSON-LD`);
  if (/content="undefined"/.test(html) || /href="undefined"/.test(html))
    fail(`${route}: literal "undefined" in an attribute`);

  // The entry <script> is hoisted into <head> by Vite, so the root div is the
  // last node in <body>: match its contents up to the final </div> before it.
  const body = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<\/body>/);
  if (!body || body[1].trim().length < 500) {
    fail(`${route}: <div id="root"> has no prerendered markup`);
  }
}

for (const route of allRoutes) checkRoute(route);

/* The 404 shell is not in the sitemap and must not be indexed. */
const notFoundPath = path.join(distDir, '404.html');
if (!fs.existsSync(notFoundPath)) {
  fail('404.html not emitted');
} else if (!/name="robots" content="noindex/.test(fs.readFileSync(notFoundPath, 'utf-8'))) {
  fail('404.html is not marked noindex');
}

/* sitemap.xml must list exactly the crawlable routes; robots.txt must point to it. */
const sitemapPath = path.join(distDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  fail('sitemap.xml not emitted');
} else {
  const locs = (fs.readFileSync(sitemapPath, 'utf-8').match(/<loc>/g) || []).length;
  if (locs !== allRoutes.length) {
    fail(`sitemap.xml has ${locs} URLs, expected ${allRoutes.length}`);
  }
}

const robotsPath = path.join(distDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  fail('robots.txt not emitted');
} else if (!/^Sitemap: https?:\/\//m.test(fs.readFileSync(robotsPath, 'utf-8'))) {
  fail('robots.txt does not declare a Sitemap');
}

if (failures > 0) {
  console.error(`[verify] ${failures} check(s) failed.`);
  process.exit(1);
}
console.log(
  `[verify] ok — ${allRoutes.length} routes + 404.html, sitemap.xml, robots.txt all valid`
);
