/**
 * head.js
 *
 * Serialises a getSeo() result into the HTML string injected into <head> at
 * prerender time. Kept separate from seo.js so the resolver stays free of
 * markup concerns, and separate from the client <Seo /> component so server and
 * browser agree on wording without sharing DOM code.
 */

const ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ESCAPE[char]);
}

/**
 * @param {ReturnType<import('./seo').getSeo>} seo
 * @returns {string} newline/tab-indented tags, safe to drop inside <head>.
 */
export function renderHeadTags(seo) {
  const lines = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${esc(seo.robots)}" />`,
    `<link rel="canonical" href="${esc(seo.canonical)}" />`,
    `<meta property="og:type" content="${esc(seo.type)}" />`,
    '<meta property="og:site_name" content="Kodeio Technologies" />',
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(seo.canonical)}" />`,
    `<meta property="og:image" content="${esc(seo.image)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(seo.image)}" />`,
  ];

  for (const node of seo.jsonLd) {
    lines.push(
      `<script type="application/ld+json">${JSON.stringify(node).replace(/</g, '\\u003c')}</script>`
    );
  }

  return lines.join('\n    ');
}
