/**
 * pages.js
 *
 * The static (non-parameterised) pages: their path and metadata copy. This is
 * the single declaration point for those routes. It feeds:
 *
 *   - src/App.jsx        (the route table, via src/seo/routes.js)
 *   - src/seo/seo.js     (title / description lookup)
 *   - src/seo/routes.js  (the prerender + sitemap list)
 *
 * so the three can never disagree about which pages exist. Adding a page here
 * (plus its component in App.jsx's PAGE_COMPONENTS map) is all that is needed.
 *
 * Keep this module DOM- and JSX-free: it is imported directly by Node scripts.
 */

export const staticPages = [
  {
    path: '/',
    title: 'Kodeio Technologies — The Architecture of Innovation',
    description:
      'Kodeio designs and builds websites, mobile apps and digital products that generate leads and convert, and runs live tech bootcamps with internship opportunities.',
  },
  {
    path: '/about',
    title: 'About Kodeio Technologies',
    description:
      'Kodeio Technologies is a technology-driven ecosystem built at the intersection of learning, innovation and real-world product development.',
  },
  {
    path: '/courses',
    title: 'Live Tech Bootcamps & Courses | Kodeio Technologies',
    description:
      'Join Kodeio live tech bootcamps in UI/UX design, WordPress and frontend development. Learn with mentors, build real projects and access internships.',
  },
  {
    path: '/portfolio',
    title: 'Portfolio — Websites, Apps & Product Design | Kodeio',
    description:
      'Explore websites, mobile apps and product design work delivered by Kodeio for startups, brands and businesses.',
  },
  {
    path: '/contact',
    title: 'Contact Kodeio — Start a Project',
    description:
      'Tell Kodeio what you want to achieve. Book a call, request a quote or discuss a partnership — we usually respond within 24 hours.',
  },
];
