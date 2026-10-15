/**
 * entry-server.jsx
 *
 * Server entry used only by scripts/prerender.mjs. It renders the app's route
 * tree to static HTML through a StaticRouter, so every URL ships real markup in
 * its initial response instead of an empty <div id="root">.
 *
 * This is not a hydrated server-render: the client still mounts with
 * createRoot (see src/main.jsx), which discards and re-renders this markup. The
 * prerendered HTML exists for crawlers and first paint, so no hydration
 * contract has to be honoured.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { getSeo } from './seo/seo';
import { renderHeadTags } from './seo/head';

/**
 * @param {string} url       Path to render, e.g. "/services/web-development".
 * @param {string} siteUrl   Canonical origin (no trailing slash).
 */
export function render(url, siteUrl) {
  const seo = getSeo(url, { siteUrl });
  const body = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  return { body, seo, head: renderHeadTags(seo) };
}
