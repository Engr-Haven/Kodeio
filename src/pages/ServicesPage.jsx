import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Check, PhoneCall } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

/* ─────────────────────────────────────────────
   DATA — extracted from services-1..4.png
───────────────────────────────────────────── */
const services = [
  {
    id: 'brand-identity',
    tag: 'Brand Identity',
    headline: 'Brand Identity Design in Nigeria and for Global Brands',
    sub: 'At Kodeio, we create brand identities that help businesses look professional, stay consistent, and stand out across digital and print touchpoints. Whether you are starting a new company or refreshing an existing one, our brand identity service is built to give you a clear, modern, and usable visual foundation.',
    packagesTitle: 'Brand Identity Design Packages',
    ctaHeadline: 'Ready to work with us?',
    ctaBody: 'At Kodeio, we combines strategy, creativity, and practical execution. We design brand identities that work not just as a logo, but as a complete system for your website, app, pitch deck, and marketing materials.',
    ctaBtn: 'Book a Call',
    faqs: [
      { q: 'How long does a brand identity project take?', a: 'Most brand identity projects take between 2 and 4 weeks depending on the scope and feedback cycles. Rush delivery in 7 days is available on the Starter plan.' },
      { q: 'Do you only design logos?', a: 'No. Our brand identity service covers moodboards, primary logos, secondary logos/wordmarks, color palettes, typography selection, brand guidelines PDF, social media templates, and more.' },
      { q: 'Can you work with an existing brand?', a: 'Yes. We offer brand refresh engagements where we refine and modernise your existing identity without rebuilding it from scratch.' },
      { q: 'Do I get source files?', a: 'Yes. All plans include final files in PNG, JPG, SVG, and PDF. Premium clients also receive editable source files.' },
      { q: 'Can you work with international clients?', a: 'Absolutely. We work with clients across Africa, Europe, and North America. All communication and delivery happens remotely.' },
    ],
    plans: [
      {
        name: 'Starter',
        badge: 'Fast Delivery in 7days',
        badgeColor: true,
        priceNGN: 'from ₦200,000',
        priceUSD: 'from $130',
        cta: 'Get Started',
        ctaStyle: 'dark',
        features: ['Moodboard and visual direction.', 'Primary logo.', 'Secondary logo / wordmark.', 'Color palette.', 'Typography selection.', 'Basic brand guidelines PDF.', '2 revision rounds.', 'Final files in PNG, JPG, SVG, and PDF.'],
        highlight: false,
      },
      {
        name: 'Growth',
        badge: null,
        priceNGN: 'from ₦400,000',
        priceUSD: 'from $260',
        cta: 'Get Started',
        ctaStyle: 'brand',
        features: ['Moodboard and direction strategy.', 'Primary logo and logo variations.', 'Typography system.', 'Color palette.', 'Brand mark or icon.', 'Social media profile assets.', 'Basic brand guidelines PDF.', '2–3 mockups for brand presentation.', '3 revision rounds.', 'Final editable and export files.'],
        highlight: true,
      },
      {
        name: 'Premium',
        badge: null,
        priceNGN: 'Custom Price',
        priceUSD: 'Custom Price',
        cta: 'Contact Us',
        ctaStyle: 'dark',
        features: ['Brand strategy session.', 'Competitor and market research.', 'Moodboard.', 'Primary logo and full logo suite.', 'Color system.', 'Typography hierarchy.', 'Custom brand elements.', 'Brand guidelines.', 'Social media templates.', 'Business card and letterhead mock Ups.', '4 revision rounds.', 'Source files and export package.'],
        highlight: false,
      },
    ],
  },
  {
    id: 'web-development',
    tag: 'Web Development',
    headline: 'Website Development in Nigeria and for Global Brands',
    sub: 'Kodeio develops websites that are reliable, easy to manage, and ready for real business use. Whether you need a company website, landing page, portfolio, or a more advanced web build, we focus on clean execution, speed, and usability.',
    packagesTitle: 'Website Development  Packages',
    ctaHeadline: 'Need a website that is built to grow with your business?',
    ctaBody: 'We combine design awareness with strong development execution. That means your website will not only work properly, but also feel aligned with your brand and business goals. We also make sure the site is built with SEO structure and performance in mind so it can compete in Nigeria and beyond.',
    ctaBtn: 'Book a Call',
    faqs: [
      { q: 'Do you build websites on WordPress or custom code?', a: 'We can work with WordPress, no-code, or custom development depending on your project needs.' },
      { q: 'Will my website be mobile responsive?', a: 'Yes. Every build is designed to work well on mobile, tablet, and desktop.' },
      { q: 'Can you help with SEO?', a: 'Yes. We include basic SEO structure and can support more advanced SEO work if needed.' },
      { q: 'Do you offer post-launch support?', a: 'Yes. Support is included based on the plan, and ongoing maintenance can be added.' },
      { q: 'Can you work with international clients?', a: 'Yes. Kodeio works with clients in Nigeria and outside Nigeria.' },
    ],
    plans: [
      {
        name: 'Starter',
        badge: 'Fast Delivery in 7days',
        badgeColor: true,
        priceNGN: 'from ₦350,000',
        priceUSD: 'from $230',
        cta: 'Get Started',
        ctaStyle: 'dark',
        features: ['Up to 5 pages.', 'Responsive design implementation.', 'Business Emails.', 'Domain & Hosting (1 Year).', 'Basic CMS setup.', 'On-page SEO setup.', 'Google Analytics integration.', '1 round of revision.'],
        highlight: false,
      },
      {
        name: 'Growth',
        badge: null,
        priceNGN: 'from ₦700,000',
        priceUSD: 'from $460',
        cta: 'Get Started',
        ctaStyle: 'brand',
        features: ['Up to 10 pages.', 'Custom responsive development.', 'CMS Integration.', 'Business Emails.', 'SEO-ready page structure.', '2 rounds of revisions.', 'One Month Post-launch support.'],
        highlight: true,
      },
      {
        name: 'Premium',
        badge: null,
        priceNGN: 'from ₦1,000,000',
        priceUSD: 'from $650',
        cta: 'Contact Us',
        ctaStyle: 'dark',
        features: ['Up to 20 pages or custom scope.', 'Fully custom development.', 'Custom page templates.', 'Advanced CMS setup.', 'Speed and security optimization.', 'Blog, landing page, and utility page support.', 'Third-party integrations.', 'SEO setup and technical structure.', 'Testing across devices and browsers.', '3 rounds of revisions.', 'Launch support.'],
        highlight: false,
      },
    ],
  },
  {
    id: 'mobile-app-design',
    tag: 'Mobile App Design',
    headline: 'Mobile App Design in Nigeria and for Global Brands',
    sub: 'We design intuitive, high-converting mobile apps that balance stunning aesthetics with seamless functionality. From planning user flows to crafting every interface component, we build custom mobile experiences that engage users and drive tangible results.',
    packagesTitle: 'Mobile App Design  Packages',
    ctaHeadline: 'Ready to design an app people will actually enjoy using?',
    ctaBody: 'We design mobile apps that feel modern, clear, and easy to use. Our work is built to support both user needs and developer execution, so your app is designed with real product delivery in mind.',
    ctaBtn: 'Book a Call',
    faqs: [
      { q: 'What tools do you use for app design?', a: 'We primarily use Figma for all UI/UX design, prototyping, and handoff, with additional tools for user research and testing.' },
      { q: 'Do you design for iOS and Android?', a: 'Yes. We design with platform conventions in mind for both iOS and Android, and provide separate spec files if needed.' },
      { q: 'Do I need to have development ready before design starts?', a: 'No. We can start with just your idea or brief and work through discovery, user flows, and wireframes together before high-fidelity design.' },
      { q: 'How many screens are included?', a: 'Screen count varies by plan. Starter covers core user flows; Growth adds the full product experience; Premium includes comprehensive component libraries and documentation.' },
      { q: 'Can you work with international clients?', a: 'Yes. We work with clients remotely across Africa, Europe, and North America.' },
    ],
    plans: [
      {
        name: 'Starter',
        badge: 'Fast Delivery in 7days',
        badgeColor: true,
        priceNGN: 'from ₦700,000',
        priceUSD: 'from $460',
        cta: 'Get Started',
        ctaStyle: 'dark',
        features: ['User flow mapping.', 'High-fidelity UI design.', '2 revision rounds.', 'Final Figma files.'],
        highlight: false,
      },
      {
        name: 'Growth',
        badge: null,
        priceNGN: 'from ₦1,000,000',
        priceUSD: 'from $650',
        cta: 'Get Started',
        ctaStyle: 'brand',
        features: ['Full user flow mapping.', 'High-fidelity UI design.', 'Clickable prototype.', 'Design system basics.', 'Developer handoff support.', '3 revision rounds.', 'Final Figma files.'],
        highlight: true,
      },
      {
        name: 'Premium',
        badge: null,
        priceNGN: 'Custom Price',
        priceUSD: 'Custom Price',
        cta: 'Contact Us',
        ctaStyle: 'dark',
        features: ['Detailed user flow mapping.', 'Wireframes.', 'Advanced UI design.', 'Interactive prototype.', 'Component library.', 'Design system documentation.', 'Developer handoff support.', 'Final Figma files.'],
        highlight: false,
      },
    ],
  },
  {
    id: 'ecommerce',
    tag: 'Mobile App Design',
    headline: 'Mobile App Design in Nigeria and for Global Brands',
    sub: 'We design intuitive, high-converting mobile apps that balance stunning aesthetics with seamless functionality. From planning user flows to crafting every interface component, we build custom mobile experiences that engage users and drive tangible results.',
    packagesTitle: 'Mobile App Design  Packages',
    ctaHeadline: 'Ready to launch an online store that is reliable, and built for sales?',
    ctaBody: 'Kodeio designs e-commerce websites that are built to help you sell, not just display products. We combine design, development, SEO, and conversion thinking so your store can perform well in Nigeria and beyond.',
    ctaBtn: 'Start Your Store',
    faqs: [
      { q: 'What platform do you use for e-commerce websites?', a: 'We can work with platforms like WooCommerce, Shopify, or custom solutions depending on your needs.' },
      { q: 'Can you upload my products for me?', a: 'Yes. Product setup is included based on the plan you choose.' },
      { q: 'Do you set up payment gateways?', a: 'Yes. We can integrate payment gateways such as Paystack, Flutterwave, or other supported option.' },
      { q: 'Will my store be mobile responsive?', a: 'Yes. Every e-commerce store we design is mobile-friendly.' },
      { q: 'Can I request extra features later?', a: 'Yes. We can add more features or integrations as your business grows.' },
    ],
    plans: [
      {
        name: 'Starter',
        badge: 'Fast Delivery in 7days',
        badgeColor: true,
        priceNGN: 'from ₦700,000',
        priceUSD: 'from $460',
        cta: 'Get Started',
        ctaStyle: 'dark',
        features: ['Domain and hosting for 1 year.', 'Business emails.', 'Up to 5 pages.', 'Logo design.', 'On-page SEO.', 'Responsive store design.', 'Basic product catalog setup.', '1 week support.'],
        highlight: false,
      },
      {
        name: 'Popular',
        badge: null,
        priceNGN: 'from ₦1,000,000',
        priceUSD: 'from $650',
        cta: 'Get Started',
        ctaStyle: 'brand',
        features: ['Domain and hosting for 1 year.', 'Business emails.', 'Logo design.', 'On-page SEO.', 'Up to 100 products setup.', 'Analytics integration.', 'Mobile responsive design.', 'Payment gateway integration.', 'Cart and checkout setup.', '1 month support.'],
        highlight: true,
      },
      {
        name: 'Premium',
        badge: null,
        priceNGN: 'Custom Price',
        priceUSD: 'Custom Price',
        cta: 'Contact Us',
        ctaStyle: 'dark',
        features: ['Fully custom store design.', 'Unlimited product setup.', 'User and admin dashboard.', 'Payment gateway integration.', 'Content management.', 'Premium theme customization.', 'Social media integration.', 'On-page and off-page SEO.', 'Continuous support.', 'Mobile responsive design.', 'Basic SEO setup.', '1 week training and support.'],
        highlight: false,
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function PlanCard({ plan, currency }) {
  const price = currency === 'NGN' ? plan.priceNGN : plan.priceUSD;
  const isCustom = price === 'Custom Price';

  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${
        plan.highlight
          ? 'border-brand bg-brand-tint shadow-brand'
          : 'border-line bg-white'
      }`}
    >
      {plan.badge && (
        <span className="mb-3 inline-block self-start rounded-full bg-brand/10 px-3 py-1 text-[0.7rem] font-semibold text-brand">
          {plan.badge}
        </span>
      )}
      <h3 className="mb-3 font-display text-[1.05rem] font-bold text-ink">{plan.name}</h3>

      <div className="mb-4">
        {isCustom ? (
          <span className="font-display text-[1.4rem] font-extrabold text-ink">Custom Price</span>
        ) : (
          <span className="font-display text-[1.4rem] font-extrabold text-ink">{price}</span>
        )}
      </div>

      <a
        href="#contact"
        className={`mb-6 inline-flex min-h-10 w-full items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
          plan.ctaStyle === 'brand'
            ? 'bg-brand text-white hover:bg-brand-dark'
            : 'bg-ink text-white hover:bg-ink-soft'
        }`}
      >
        {plan.cta}
      </a>

      <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-wide text-muted">What's Included</p>
      <ul className="flex flex-col gap-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[0.8rem] leading-[1.5] text-body">
            <Check size={13} strokeWidth={2.5} className="mt-[3px] shrink-0 text-brand" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceSection({ svc, index }) {
  const [currency, setCurrency] = useState('NGN');
  const [openFaq, setOpenFaq] = useState(-1);
  const head = useInView(0.1);
  const plans = useInView(0.05);
  const faqRef = useInView(0.05);
  const ctaRef = useInView(0.1);

  const isEven = index % 2 === 0;

  return (
    <section
      id={svc.id}
      className={`py-20 ${isEven ? 'bg-white' : 'bg-surface'}`}
    >
      <div className="shell">
        {/* ── Header ── */}
        <div ref={head.ref} className="reveal mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-line bg-white px-4 py-1 text-xs font-semibold text-body shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            {svc.tag}
          </span>
          <h2 className="mx-auto mb-5 max-w-[700px] font-display text-[clamp(1.7rem,3.5vw,2.7rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink">
            {svc.headline}
          </h2>
          <p className="mx-auto max-w-[620px] text-[0.9375rem] leading-[1.7] text-body">
            {svc.sub}
          </p>
        </div>

        {/* ── Pricing cards ── */}
        <div ref={plans.ref} className="reveal mb-20">
          <h3 className="mb-6 text-center font-display text-[1.15rem] font-bold text-ink">
            {svc.packagesTitle}
          </h3>

          {/* Currency toggle */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-full border border-line bg-surface-2 p-1">
              {['NGN', 'USD'].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                    currency === c
                      ? 'bg-brand text-white shadow-brand'
                      : 'text-body hover:text-ink'
                  }`}
                >
                  {c === 'NGN' ? 'NGN (₦)' : 'USD($)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1 max-[900px]:max-w-[440px] max-[900px]:mx-auto">
            {svc.plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} currency={currency} />
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div ref={faqRef.ref} className="reveal mb-20">
          <h3 className="mb-8 text-center font-display text-[1.3rem] font-bold text-ink">
            {svc.tag} FAQ.
          </h3>
          <div className="mx-auto flex max-w-[760px] flex-col gap-3">
            {svc.faqs.map((faq, i) => (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-card border transition-colors duration-200 ${
                  openFaq === i
                    ? 'border-line bg-white'
                    : 'border-line-soft bg-surface-2 hover:bg-surface-3'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full cursor-pointer items-center justify-between px-6 py-[1.1rem] text-left"
                >
                  <span className="font-sans text-[0.9375rem] font-semibold text-ink-soft">
                    {faq.q}
                  </span>
                  <div
                    className={`shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown size={14} strokeWidth={2} className="text-body" />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="animate-fade-in px-6 pb-5 text-sm leading-[1.65] text-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Card ── */}
        <div ref={ctaRef.ref} className="reveal">
          <div className="mx-auto max-w-[740px] rounded-2xl bg-brand-muted px-10 py-12 text-center">
            <h3 className="mb-4 font-display text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold text-ink">
              {svc.ctaHeadline}
            </h3>
            <p className="mb-7 text-[0.9375rem] leading-[1.7] text-body">
              {svc.ctaBody}
            </p>
            <a
              href="#contact-footer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark hover:shadow-brand-lg"
            >
              <PhoneCall size={15} strokeWidth={2} />
              {svc.ctaBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES NAV SIDEBAR (sticky side tabs)
───────────────────────────────────────────── */
const serviceNav = [
  { label: 'Brand Identity', href: '#brand-identity' },
  { label: 'Web Development', href: '#web-development' },
  { label: 'Mobile App Design', href: '#mobile-app-design' },
  { label: 'E-Commerce', href: '#ecommerce' },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ServicesPage() {
  const hero = useInView(0.1);

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero banner ── */}
        <section className="relative overflow-hidden bg-white pt-[105px] pb-16">
          {/* subtle purple grid blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand opacity-[0.06] blur-[80px]"
          />
          <div className="shell text-center">
            <div ref={hero.ref} className="reveal mx-auto max-w-[680px]">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-tint px-4 py-1.5 text-xs font-semibold text-brand">
                Our Services
              </span>
              <h1 className="mb-5 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink">
                Everything You Need to Build & Grow Online
              </h1>
              <p className="mb-8 text-[0.9375rem] leading-[1.7] text-body">
                From brand identity to web development, mobile app design to e-commerce — Kodeio delivers end-to-end digital solutions with transparent, milestone-based pricing.
              </p>
              {/* Quick-jump nav pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {serviceNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNav(e, item.href)}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 hover:border-brand hover:bg-brand-tint hover:text-brand"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── All service sections ── */}
        {services.map((svc, i) => (
          <ServiceSection key={svc.id} svc={svc} index={i} />
        ))}
      </main>

      <div id="contact-footer">
        <Footer />
      </div>
    </>
  );
}
