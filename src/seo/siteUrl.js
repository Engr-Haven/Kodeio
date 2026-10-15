/**
 * siteUrl.js
 *
 * The canonical public origin of the site, with no trailing slash. Every
 * absolute URL we emit (canonical tags, og:url, sitemap, JSON-LD) is built from
 * this so they can never disagree.
 *
 * Override it per environment by setting VITE_SITE_URL in `.env` (or the
 * environment) at build time. The default matches the production domain.
 */
const RAW = import.meta.env?.VITE_SITE_URL || 'https://kodeiotechnologies.com';

export const SITE_URL = RAW.replace(/\/+$/, '');
