import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Bootcamps from './components/Bootcamps';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Seo from './components/Seo';
import { staticRoutes } from './seo/routes';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import PortfolioPage from './pages/PortfolioPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Bootcamps />
      <Portfolio />
      <FAQ />
    </main>
  );
}

/**
 * Chrome shared by every route. It also owns the one piece of per-route state
 * that must not survive a navigation: the scroll offset.
 *
 * ScrollToTop lives here too, so the back-to-top control exists on every route
 * without each page having to render it. Document metadata (title, description,
 * canonical, Open Graph, JSON-LD) is owned by <Seo /> — see src/seo/ for the
 * single source of truth shared with the prerender step.
 */
function Layout() {
  const { pathname, hash } = useLocation();

  // `behavior: 'instant'` is deliberate and load-bearing. index.css sets
  // `scroll-behavior: smooth` on <html>, which a bare scrollTo() would inherit
  // and animate — you would watch the page slide up on every route change.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Anchor targets are section ids that only exist on the home page. Resolving
  // the hash here, after the incoming route has committed, is what makes
  // /services/x -> /#contact actually reach the footer instead of silently
  // doing nothing. `hash` is a dependency in its own right so that clicking the
  // same anchor twice from another page still re-scrolls.
  //
  // getElementById rather than querySelector: a hash is arbitrary user input,
  // and anything that is not a valid CSS selector would throw.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname, hash]);

  return (
    <>
      <Seo />
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
}

/* Static path -> component. The paths themselves come from src/seo/pages.js
   (the one list shared with the SEO resolver and the prerender step), so only
   the component wiring lives here. */
const PAGE_COMPONENTS = {
  '/': HomePage,
  '/about': AboutPage,
  '/courses': CoursesPage,
  '/portfolio': PortfolioPage,
  '/contact': ContactPage,
};

/**
 * The route table, exported separately from `App` so the prerender step
 * (scripts/prerender.mjs, via src/entry-server.jsx) can render the exact same
 * tree through a StaticRouter.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {staticRoutes.map((path) => {
          const Page = PAGE_COMPONENTS[path];
          return <Route key={path} path={path} element={<Page />} />;
        })}
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/portfolio/:projectId" element={<CaseStudyPage />} />
        <Route path="/services" element={<Navigate to="/services/web-development" replace />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
