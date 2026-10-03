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
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import { servicesData } from './data/servicesData';

const DEFAULT_TITLE = 'Kodeio Technologies - The Architecture of Innovation';
const SERVICES_PREFIX = '/services/';

// Titles for routes that are neither the home page nor a service page. Service
// titles come from servicesData instead, so they can never drift from the data.
const SECTION_TITLES = {
  '/about': 'About Us',
  '/courses': 'Courses',
  '/portfolio': 'Portfolio',
  '/contact': 'Contact Us',
};

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
 * Chrome shared by every route. It also owns the two pieces of per-route state
 * that must not survive a navigation: the scroll offset and the document title.
 * Centralising them here means a new page cannot forget to reset either.
 *
 * ScrollToTop lives here too, so the back-to-top control exists on every route
 * without each page having to render it.
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

  useEffect(() => {
    const slug = pathname.startsWith(SERVICES_PREFIX)
      ? pathname.slice(SERVICES_PREFIX.length)
      : null;
    const service = slug ? servicesData[slug] : null;
    const label = service?.title || SECTION_TITLES[pathname];
    document.title = label ? `${label} | Kodeio Technologies` : DEFAULT_TITLE;
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/services"
            element={<Navigate to="/services/web-development" replace />}
          />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}