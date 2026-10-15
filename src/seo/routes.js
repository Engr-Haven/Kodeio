/**
 * routes.js
 *
 * The canonical list of crawlable paths, derived from the same data that drives
 * the router and the markup. Used by scripts/prerender.mjs to decide which HTML
 * files to emit and which URLs to put in sitemap.xml, so a new service or course
 * is picked up automatically.
 */

// Explicit .js extensions: this module is imported directly by the Node build
// scripts (scripts/prerender.mjs, scripts/verify-build.mjs), and Node's ESM
// resolver requires them. Vite resolves them just as happily on the client.
import { staticPages } from './pages.js';
import { serviceList } from '../data/servicesData.js';
import { courseList } from '../data/coursesData.js';

/* Pages with no dynamic segment — declared once in src/seo/pages.js. */
export const staticRoutes = staticPages.map((page) => page.path);

/* Crawlable dynamic paths, one per service and per course. */
export const detailRoutes = [
  ...serviceList.map((service) => `/services/${service.slug}`),
  ...courseList.map((course) => `/courses/${course.slug}`),
];

/* Everything that should exist as a prerendered file and appear in the sitemap. */
export const allRoutes = [...staticRoutes, ...detailRoutes];
