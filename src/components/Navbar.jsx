import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Palette, Globe, Smartphone, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const servicesList = [
  {
    title: 'Brand Identity Design',
    desc: 'Logos, color palettes & visual systems',
    href: '/services/brand-identity',
    icon: Palette,
  },
  {
    title: 'Website Development',
    desc: 'Fast, responsive websites & CMS solutions',
    href: '/services/web-development',
    icon: Globe,
  },
  {
    title: 'Mobile App Design',
    desc: 'iOS & Android UI/UX & prototypes',
    href: '/services/mobile-app-design',
    icon: Smartphone,
  },
  {
    title: 'E-Commerce Development',
    desc: 'High-converting online stores & payments',
    href: '/services/ecommerce',
    icon: ShoppingBag,
  },
];

// Explicit `to` per entry. Courses, Portfolio, About Us and Contact Us are real
// routes; `/#faq` is the one entry still pointing at a home-page section, which
// needs the leading `/` because a bare hash does not change the route and would
// be inert on /services/* and the other sub-pages. Layout resolves the hash
// after the home page has committed.
const navLinks = [
  { label: 'Courses', to: '/courses' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const isServicesPage = location.pathname.startsWith('/services');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // Close both menus on Escape. Bound to the document rather than to the
  // header so it works no matter where focus currently sits.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      setServicesDropdownOpen(false);
      setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const linkClass =
    'group/link flex items-center gap-1 rounded-chip px-[0.85rem] py-[0.45rem] text-sm font-medium whitespace-nowrap text-gray-700 transition-all duration-200 hover:bg-brand-muted hover:text-brand';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-1000 border-b backdrop-blur-[16px] transition-all duration-300 ${
        scrolled
          ? 'border-line bg-white/98 shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
          : 'border-transparent bg-white/92'
      }`}
    >
      <div className="shell grid h-[68px] grid-cols-[1fr_auto] items-center gap-4 max-[900px]:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr]">
        {/* ── Left: Logo ────────────────── */}
        <Link
          to="/"
          id="nav-logo"
          aria-label="Kodeio — home"
          className="flex items-center justify-self-start"
        >
          <img
            src="/kodeio-logo.png"
            alt="Kodeio"
            width={1848}
            height={512}
            className="h-7 w-auto shrink-0"
          />
        </Link>

        {/* ── Center: Nav links ─────────── */}
        <nav
          id="nav-links"
          aria-label="Main navigation"
          className="hidden items-center justify-self-center gap-1 lg:flex"
        >
          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
            /* Focus handlers mirror the hover ones so the menu is reachable by
               keyboard. onBlur only closes when focus leaves the wrapper
               entirely, otherwise tabbing from the trigger into the panel
               would close it out from under the user. */
            onFocus={() => setServicesDropdownOpen(true)}
            onBlur={(e) => {
              if (!dropdownRef.current?.contains(e.relatedTarget)) {
                setServicesDropdownOpen(false);
              }
            }}
          >
            <Link
              to="/services/web-development"
              id="nav-services-trigger"
              aria-haspopup="true"
              aria-expanded={servicesDropdownOpen}
              aria-controls="nav-services-menu"
              className={`${linkClass} ${isServicesPage ? 'text-brand bg-brand-muted font-semibold' : ''}`}
              /* The trigger is also a real link: activating it navigates to
                 the default service rather than being a dead menu button. */
              onClick={() => setServicesDropdownOpen(false)}
            >
              <span>Services</span>
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-brand' : 'opacity-60 group-hover/link:opacity-100'
                }`}
              />
            </Link>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div
                id="nav-services-menu"
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fade-in"
                style={{ width: '380px' }}
              >
                <div className="rounded-2xl border border-line bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                  <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-line-soft pb-2">
                    <span className="text-[0.72rem] font-bold uppercase tracking-wider text-muted">
                      Our Services
                    </span>
                    <span className="text-[0.72rem] text-brand font-medium">4 Core Disciplines</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    {servicesList.map((svc) => {
                      const Icon = svc.icon;
                      const isCurrent = location.pathname === svc.href;

                      return (
                        <Link
                          key={svc.title}
                          to={svc.href}
                          className={`group flex items-start gap-3.5 rounded-xl p-2.5 transition-all duration-200 ${
                            isCurrent
                              ? 'bg-brand-tint border border-brand/20'
                              : 'hover:bg-surface-2'
                          }`}
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isCurrent
                                ? 'bg-brand text-white shadow-sm'
                                : 'bg-brand-muted text-brand group-hover:bg-brand group-hover:text-white'
                            }`}
                          >
                            <Icon size={17} strokeWidth={2.2} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4
                                className={`text-[0.88rem] font-semibold transition-colors ${
                                  isCurrent ? 'text-brand' : 'text-ink group-hover:text-brand'
                                }`}
                              >
                                {svc.title}
                              </h4>
                              <ArrowRight
                                size={12}
                                className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-brand"
                              />
                            </div>
                            <p className="text-[0.75rem] text-body line-clamp-1 leading-normal">
                              {svc.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-2 border-t border-line-soft pt-2 px-1">
                    <Link
                      to="/services/web-development"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-center gap-1.5 py-1 text-center text-xs font-semibold text-brand hover:underline"
                    >
                      <span>Explore Web Development</span>
                      <ArrowRight size={11} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Standard Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setServicesDropdownOpen(false)}
              id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              /* Only the route entries can be "current" — a section link's `to`
                 carries a hash and will never equal a bare pathname. */
              className={`${linkClass} ${
                location.pathname === link.to ? 'text-brand bg-brand-muted font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Right: CTA button ─────────── */}
        <div className="hidden items-center justify-end gap-3 lg:flex">
          <Link
            to="/contact"
            id="nav-cta"
            onClick={() => setServicesDropdownOpen(false)}
            className="btn btn-primary px-[1.35rem] py-[0.55rem] text-sm font-semibold shadow-[0_4px_14px_rgba(125,46,255,0.25)]"
          >
            start a project
          </Link>
        </div>

        {/* ── Mobile: Hamburger ─────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          id="nav-hamburger"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-chip lg:hidden"
        >
          <span
            className={`block h-0.5 w-[22px] rounded bg-ink transition-all duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-[22px] rounded bg-ink transition-all duration-300 ${
              menuOpen ? 'scale-x-0 opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-[22px] rounded bg-ink transition-all duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="nav-mobile-menu"
        className={`flex flex-col gap-1 overflow-y-auto bg-white px-5 transition-all duration-300 lg:hidden ${
          menuOpen
            ? 'max-h-[85vh] border-t border-line pt-3 pb-6 shadow-xl'
            : 'max-h-0 border-t-0 pt-0 pb-0 overflow-hidden'
        }`}
      >
        {/* Mobile Services Accordion */}
        <div className="border-b border-line-soft pb-2 mb-1">
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="flex w-full items-center justify-between rounded-chip px-3 py-2.5 text-[0.95rem] font-bold text-ink hover:bg-brand-muted"
          >
            <span className={isServicesPage ? 'text-brand' : ''}>Services</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-brand' : ''}`}
            />
          </button>

          {mobileServicesOpen && (
            <div className="mt-1 flex flex-col gap-1 pl-3">
              {servicesList.map((svc) => {
                const Icon = svc.icon;
                const isCurrent = location.pathname === svc.href;

                return (
                  <Link
                    key={svc.title}
                    to={svc.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                      isCurrent
                        ? 'bg-brand-tint text-brand'
                        : 'text-gray-700 hover:bg-surface-2 hover:text-brand'
                    }`}
                  >
                    <Icon size={14} className="text-brand shrink-0" />
                    <span>{svc.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Regular Mobile Links */}
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            onClick={() => setMenuOpen(false)}
            className={`block rounded-chip px-3 py-2 text-[0.92rem] font-medium transition-all duration-200 ${
              location.pathname === link.to
                ? 'bg-brand-muted text-brand'
                : 'text-gray-700 hover:bg-brand-muted hover:text-brand'
            }`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
          className="btn btn-primary mt-3 w-full min-h-11 py-[0.7rem]"
        >
          start a project
        </Link>
      </div>
    </header>
  );
}
