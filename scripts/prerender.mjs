/**
 * prerender.mjs
 *
 * Post-build step. For every crawlable route it renders the app (via
 * src/entry-server.jsx) to HTML and writes a real static file into dist/:
 *
 *   /                       -> dist/index.html
 *   /about                  -> dist/about/index.html
 *   /services/web-development -> dist/services/web-development/index.html
 *
 * It also bakes the per-route SEO tags into <head>, and emits 404.html,
 * sitemap.xml and robots.txt.
 *
 * Runs after `vite build` (see the build script in package.json) so the hashed
 * asset <script>/<link> in dist/index.html can be reused as the template.
 */
import { createServer, loadEnv } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');

/* Read VITE_SITE_URL from .env / environment; fall back to the production origin. */
const env = loadEnv(process.env.NODE_ENV || 'production', root, 'VITE_');
const SITE_URL = (
  process.env.VITE_SITE_URL ||
  env.VITE_SITE_URL ||
  'https://kodeiotechnologies.com'
).replace(/\/+$/, '');

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');
const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--seo-end-->/;
const ROOT_DIV = '<div id="root"></div>';

if (!SEO_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
  console.error('[prerender] dist/index.html is missing the <!--seo-start--> block or #root div.');
  process.exit(1);
}

function inject(templateHtml, { body, head }) {
  return templateHtml
    .replace(SEO_BLOCK, `<!--seo-start-->\n    ${head}\n    <!--seo-end-->`)
    .replace(ROOT_DIV, `<div id="root">${body}</div>`);
}

function writeRoute(route, html) {
  const outDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

function buildSitemap(routes) {
  // Deliberately no <lastmod>: we have no per-page content date, and stamping
  // every URL with the build date on every deploy is a lie that teaches
  // crawlers to ignore the field. <priority> is likewise omitted (Google
  // ignores it). Add lastmod only if a real modified date becomes available.
  const urls = routes
    .map((route) => {
      const loc = `${SITE_URL}${route === '/' ? '/' : route}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
  const { allRoutes } = await vite.ssrLoadModule('/src/seo/routes.js');

  for (const route of allRoutes) {
    const html = inject(template, render(route, SITE_URL));
    writeRoute(route, html);
  }

  /* 404 shell for the host's error handler (see public/.htaccess). */
  fs.writeFileSync(path.join(distDir, '404.html'), inject(template, render('/404', SITE_URL)));

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap(allRoutes));
  fs.writeFileSync(path.join(distDir, 'robots.txt'), buildRobots());

  console.log(
    `[prerender] rendered ${allRoutes.length} routes + 404.html, sitemap.xml, robots.txt (origin: ${SITE_URL})`
  );
} finally {
  await vite.close();
}
