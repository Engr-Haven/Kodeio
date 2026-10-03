import { Link } from "react-router-dom";
import { CONTACT, SOCIALS } from "../data/site";

// lucide-react v1 no longer ships brand icons, so the three social marks
// stay as inline SVG (they were hand-drawn in the original markup anyway).
const brandIcons = {
  Instagram: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.76-.79 1.76-1.76 0-.97-.79-1.76-1.76-1.76-.97 0-1.76.79-1.76 1.76 0 .97.79 1.76 1.76 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  ),
  X: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

// Courses, Portfolio, About Us and Contact Us are real routes now. `/#faq` is
// the one entry still pointing at a home-page section, and it needs the leading
// `/`: the footer renders on every route and that id only exists on the home
// page, so a bare hash would leave the link inert on every sub-page. Layout
// resolves the hash once the home page has committed.
const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services/web-development" },
  { label: "Case Studies", to: "/portfolio" },
  { label: "Bootcamps", to: "/courses" },
  { label: "FAQ", to: "/#faq" },
  { label: "Contact Us", to: "/contact" },
];

const forClients = [
  { label: "Brand Identity Design", to: "/services/brand-identity" },
  { label: "Website Development", to: "/services/web-development" },
  { label: "Mobile App Design", to: "/services/mobile-app-design" },
  { label: "E-Commerce Development", to: "/services/ecommerce" },
  { label: "Case Studies", to: "/portfolio" },
];

const forLearners = [
  { label: "Bootcamp", to: "/courses" },
  { label: "Internship Opportunity", to: "/courses" },
];

// Icons are keyed by the `label` in SOCIALS (src/data/site.js), which the
// /contact page reads too, so the two stay in sync.
const socials = SOCIALS;

function LinkColumn({ heading, links }) {
  return (
    <div className="flex flex-col">
      <h4 className="mb-[1.15rem] font-display text-sm font-bold tracking-[-0.01em] text-white">
        {heading}
      </h4>
      <ul className="flex flex-col gap-[0.65rem]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-[0.8125rem] text-[#e9d5ff] transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-brand pt-20 pb-8 text-white"
    >
      <div className="shell-narrow">
        <div className="mb-16 flex justify-between gap-14 max-[900px]:flex-col max-[900px]:gap-10">
          {/* Left Column: Brand */}
          <div className="flex max-w-[360px] flex-col">
            <Link
              to="/"
              aria-label="Kodeio — home"
              className="mb-5 inline-flex items-center"
            >
              {/* The source logo is purple + dark ink (built for a light background),
                  so it is recoloured to solid white to stay legible on the purple
                  footer. brightness-0 flattens every pixel to black, invert flips
                  it to white. */}
              <img
                src="/kodeio-logo.png"
                alt="Kodeio"
                width={1848}
                height={512}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mb-7 text-[0.84rem] leading-[1.7] text-[#e9d5ff]">
              Kodeio Technologies is a technology-driven ecosystem built at the
              intersection of learning, innovation, and real-world product
              development. We exist to cultivate a space where education is not
              separate from practice, but deeply connected to it - where
              learning and building converge to shape the digital future.
            </p>
            <div className="flex items-center gap-[0.65rem]">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30"
                >
                  {brandIcons[label]}
                </a>
              ))}
            </div>
          </div>

          {/* These four columns have to stay on one row. The column area is
              ~656px and the headings plus longest link in each need ~471px,
              so the gap has to fit in what is left: gap-16 (64px) came to
              663px, overflowed by 7px and pushed Contact Info onto its own
              row. gap-10 leaves ~65px of slack. Below 1080px four columns
              genuinely cannot fit, so it becomes a 2x2 grid rather than
              wrapping unpredictably. Keep .verify-footer-row.mjs honest if
              you change either number. */}
          <div className="flex flex-wrap gap-10 max-[1080px]:grid max-[1080px]:grid-cols-2 max-[1080px]:gap-8">
            <LinkColumn heading="Quick Links" links={quickLinks} />
            <LinkColumn heading="For Clients" links={forClients} />
            <LinkColumn heading="For Learners" links={forLearners} />
            <div className="flex flex-col">
              <h4 className="mb-[1.15rem] font-display text-sm font-bold tracking-[-0.01em] text-white">
                Contact Info
              </h4>
              <ul className="flex flex-col gap-[0.65rem]">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-[0.8125rem] text-[#e9d5ff] transition-colors duration-200 hover:text-white"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                {CONTACT.phones.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={phone.href}
                      className="text-[0.8125rem] text-[#e9d5ff] transition-colors duration-200 hover:text-white"
                    >
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal links (Privacy Policy, Terms of Service) were removed rather than
            left pointing at #privacy / #terms, which resolve to nothing. Add
            them back as real routes once those documents exist. */}
        <div className="mb-4 border-t border-white/70 pt-6 text-xs text-[#e9d5ff]">
          <p>
            © {new Date().getFullYear()} Kodeio Technologies Ltd. All rights
            reserved.
          </p>
        </div>

        {/* Giant KODEIO Watermark */}
        <div
          aria-hidden="true"
          className="mt-8 overflow-hidden text-center leading-[0.8] select-none"
        >
          <span className="text-gradient inline-block font-display text-[clamp(4.5rem,16vw,15rem)] font-black tracking-[0.04em] text-white/18">
            KODEIO
          </span>
        </div>
      </div>
    </footer>
  );
}
