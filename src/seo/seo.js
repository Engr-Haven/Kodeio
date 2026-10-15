/**
 * seo.js
 *
 * Pure, environment-free SEO resolver. Given a pathname it returns the title,
 * description, canonical URL, robots directive and JSON-LD graph for that page,
 * derived entirely from src/data/*. The same function feeds:
 *
 *   - the runtime <Seo /> component (src/components/Seo.jsx), and
 *   - the build-time prerender step (scripts/prerender.mjs), which bakes these
 *     tags into each static HTML file.
 *
 * It must stay free of DOM/window access so it can run in Node.
 */

import { CONTACT, SOCIALS } from '../data/site';
import { servicesData } from '../data/servicesData';
import { coursesData } from '../data/coursesData';
import { homeFaqs } from '../data/faqsData';
import { staticPages } from './pages';
import { SITE_URL } from './siteUrl';

const MAX_DESCRIPTION = 158;

function normalize(pathname) {
  if (!pathname) return '/';
  let path = pathname.split('?')[0].split('#')[0];
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path || '/';
}

/* Trim to a meta-description-safe length at a word boundary. */
function truncate(text, max = MAX_DESCRIPTION) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const safe = lastSpace > 60 ? cut.slice(0, lastSpace) : cut;
  return `${safe.replace(/[.,;:]+$/, '')}…`;
}

function organizationJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kodeio Technologies',
    alternateName: 'Kodeio',
    url: siteUrl,
    logo: `${siteUrl}/kodeio-logo.png`,
    description:
      'Kodeio Technologies is a technology-driven ecosystem built at the intersection of learning, innovation, and real-world product development.',
    email: CONTACT.email,
    telephone: CONTACT.phones[0]?.label,
    sameAs: SOCIALS.map((social) => social.href),
    areaServed: [
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
  };
}

function webSiteJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kodeio Technologies',
    url: siteUrl,
  };
}

function serviceJsonLd(service, siteUrl, path) {
  const prices = service.plans
    .map((plan) => Number(String(plan.priceNGN || '').replace(/[^\d]/g, '')))
    .filter((value) => value > 0);

  const graph = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.sub,
    url: `${siteUrl}${path}`,
    provider: { '@type': 'Organization', name: 'Kodeio Technologies', url: siteUrl },
    areaServed: [
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
  };

  if (prices.length) {
    graph.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'NGN',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: service.plans.length,
      availability: 'https://schema.org/InStock',
    };
  }

  return graph;
}

function courseJsonLd(course, siteUrl, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.sub,
    url: `${siteUrl}${path}`,
    provider: { '@type': 'Organization', name: 'Kodeio Technologies', url: siteUrl },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        name: course.tag,
        courseMode: 'online',
        courseWorkload: course.duration,
      },
    ],
  };
}

/* Accepts both shapes used in the codebase: { q, a } and { question, answer }. */
function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q ?? faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.a ?? faq.answer },
    })),
  };
}

/* path -> page, from the single declaration in src/seo/pages.js. */
const STATIC_PAGES = Object.fromEntries(staticPages.map((page) => [page.path, page]));

const NOT_FOUND = {
  title: 'Page Not Found | Kodeio Technologies',
  description:
    'The page you are looking for could not be found. Explore Kodeio services, bootcamps or head back to the homepage.',
  robots: 'noindex, follow',
  type: 'website',
  jsonLd: [],
  notFound: true,
};

/**
 * @param {string} pathname  e.g. "/services/web-development"
 * @param {{ siteUrl?: string }} [options]
 */
export function getSeo(pathname, { siteUrl = SITE_URL } = {}) {
  const path = normalize(pathname);
  const canonical = `${siteUrl}${path === '/' ? '/' : path}`;
  const image = `${siteUrl}/og-default.png`;

  const base = { canonical, image, robots: 'index, follow', type: 'website', jsonLd: [] };

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  const courseMatch = path.match(/^\/courses\/([^/]+)$/);

  if (serviceMatch) {
    const service = servicesData[serviceMatch[1]];
    if (!service) return { ...NOT_FOUND, canonical, image };
    return {
      ...base,
      title: `${service.title} | Kodeio Technologies`,
      description: truncate(service.sub),
      jsonLd: [
        organizationJsonLd(siteUrl),
        serviceJsonLd(service, siteUrl, path),
        faqJsonLd(service.faqs),
      ],
    };
  }

  if (courseMatch) {
    const course = coursesData[courseMatch[1]];
    if (!course) return { ...NOT_FOUND, canonical, image };
    return {
      ...base,
      title: `${course.title} Bootcamp | Kodeio Technologies`,
      description: truncate(course.sub),
      jsonLd: [organizationJsonLd(siteUrl), courseJsonLd(course, siteUrl, path)],
    };
  }

  const page = STATIC_PAGES[path];
  if (!page) return { ...NOT_FOUND, canonical, image };

  const jsonLd = [organizationJsonLd(siteUrl)];
  if (path === '/') {
    jsonLd.push(webSiteJsonLd(siteUrl), faqJsonLd(homeFaqs));
  }

  return { ...base, title: page.title, description: page.description, jsonLd };
}

export { normalize as normalizePath };
