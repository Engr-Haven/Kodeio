import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services', hasDropdown: true },
  { label: 'Courses', href: '#courses' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-1000 border-b backdrop-blur-[16px] transition-all duration-300 ${scrolled
          ? 'border-line bg-white/98 shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
          : 'border-transparent bg-white/92'
        }`}
    >
      <div className="shell grid h-[68px] grid-cols-[1fr_auto] items-center gap-4 max-[900px]:grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr]">
        {/* ── Left: Logo ────────────────── */}
        <a
          href="/"
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
        </a>

        {/* ── Center: Nav links ─────────── */}
        <nav
          id="nav-links"
          aria-label="Main navigation"
          className="hidden items-center justify-self-center gap-1 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="group/link flex items-center gap-1 rounded-chip px-[0.85rem] py-[0.45rem] text-sm font-medium whitespace-nowrap text-gray-700 transition-all duration-200 hover:bg-brand-muted hover:text-brand"
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown
                  size={13}
                  strokeWidth={1.6}
                  className="opacity-60 transition-opacity group-hover/link:opacity-100"
                />
              )}
            </a>
          ))}
        </nav>

        {/* ── Right: CTA button ─────────── */}
        <div className="hidden items-center justify-end gap-3 lg:flex">
          <a
            href="#contact"
            id="nav-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn btn-primary px-[1.35rem] py-[0.55rem] text-sm font-semibold shadow-[0_4px_14px_rgba(125,46,255,0.25)]"
          >
            start a project
          </a>
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
            className={`block h-0.5 w-[22px] rounded bg-ink transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
          />
          <span
            className={`block h-0.5 w-[22px] rounded bg-ink transition-all duration-300 ${menuOpen ? 'scale-x-0 opacity-0' : ''
              }`}
          />
          <span
            className={`block h-0.5 w-[22px] rounded bg-ink transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
          />
        </button>
      </div>

      {/* Mobile dropdown menu.
          Padding and the top border must be toggled WITH the max-height:
          `max-h-0` only clamps the content box, so fixed pt-4/pb-6 and the
          1px border kept the closed panel 41px tall — which left the first
          link ("services") painted and hit-testable on top of the hero. */}
      <div
        id="nav-mobile-menu"
        className={`flex flex-col gap-1.5 overflow-hidden bg-white px-6 transition-all duration-400 lg:hidden ${menuOpen
            ? 'max-h-[400px] border-t border-line pt-4 pb-6'
            : 'max-h-0 border-t-0 pt-0 pb-0'
          }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="block rounded-chip px-4 py-[0.7rem] text-[0.95rem] font-medium text-gray-700 transition-all duration-200 hover:bg-brand-muted hover:text-brand"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="btn btn-primary mt-1 w-full min-h-11 py-[0.7rem]"
        >
          start a project
        </a>
      </div>
    </header>
  );
}
