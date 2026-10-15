import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo } from '../seo/seo';

/**
 * Applies per-route document metadata on the client. Rendered once by Layout so
 * it runs on every route.
 *
 * In production the same tags are already baked into each prerendered HTML file
 * (see scripts/prerender.mjs), so this mainly matters for client-side
 * navigations and for the dev server, keeping the two in lockstep. It updates
 * the tags in place rather than appending, so repeated navigations never stack
 * duplicate <meta> elements.
 */
function upsertMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeo(pathname);

    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', seo.robots);
    upsertLink('canonical', seo.canonical);

    upsertMeta('property', 'og:type', seo.type);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', seo.canonical);
    upsertMeta('property', 'og:image', seo.image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', seo.image);

    // Rebuild JSON-LD from scratch so stale graphs from the previous route are
    // removed rather than accumulating.
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((node) => node.remove());
    for (const node of seo.jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', '');
      script.textContent = JSON.stringify(node);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
}
