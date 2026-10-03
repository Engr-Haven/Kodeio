import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

// Each row links to its route on /services. `serviceHref: null` means the row
// has no dedicated pricing page yet, and its panel renders without the
// "See pricing & details" link rather than pointing somewhere misleading.
const services = [
  {
    number: '01',
    title: 'Brand Identity Design',
    description:
      'We craft distinctive brand identities that communicate your values and resonate with your audience.',
    tags: ['Logo Design', 'Typography Systems', 'Brand Colors', 'Visual Guidelines'],
    serviceHref: '/services/brand-identity',
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description:
      'User-centered design solutions that are beautiful, intuitive, and conversion-focused.',
    tags: ['User Research', 'Prototypes', 'Wireframes', 'UX Audit'],
    // No /services/ui-ux-design page exists. This used to point at
    // /services/mobile-app-design — the same destination as row 04 — so two
    // differently-named rows advertised one page.
    serviceHref: null,
  },
  {
    number: '03',
    title: 'Web Development',
    description:
      'Modern, fast websites and web applications built with the latest technologies.',
    tags: [
      'Business Websites',
      'Landing Pages',
      'Responsive Development',
      'SEO Optimization',
      'CMS Integration',
    ],
    serviceHref: '/services/web-development',
  },
  {
    number: '04',
    title: 'Mobile App Design & Prototyping',
    description:
      'End-to-end mobile design for iOS and Android with pixel-perfect prototypes.',
    tags: ['iOS & Android Design', 'App Prototypes', 'App Poster Design'],
    serviceHref: '/services/mobile-app-design',
  },
  {
    number: '05',
    title: 'E-Commerce Development',
    description:
      'High-converting online stores built to drive sales and enhance user experience.',
    tags: ['Online Store Design', 'Product Pages', 'Payment Integration'],
    serviceHref: '/services/ecommerce',
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState(-1);
  const head = useInView();
  const list = useInView();

  return (
    <section id="services" className="bg-white pt-20 pb-24">
      <div className="shell">
        {/* ── Heading + "View All" link ── */}
        <div ref={head.ref} className="reveal mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-[0.35rem] block text-sm font-medium text-body">Our Services</span>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold tracking-[-0.02em] text-ink">
              What we Offer
            </h2>
          </div>
          <Link
            to="/services/web-development"
            className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-brand bg-white px-5 py-2 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-px hover:bg-brand-tint"
          >
            View All Services
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>

        {/* ── Accordion list ── */}
        <div ref={list.ref} className="reveal flex flex-col gap-[0.85rem]">
          {services.map((svc, i) => (
            <div
              key={svc.number}
              id={`service-${svc.number}`}
              className={`group overflow-hidden rounded-card border transition-all duration-200 ${
                openIndex === i
                  ? 'border-line bg-surface-3'
                  : 'border-line-soft bg-surface-2 hover:border-line hover:bg-surface-3'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
                className="flex w-full cursor-pointer items-center gap-6 bg-none px-7 py-5 text-left max-[768px]:gap-4 max-[768px]:px-5 max-[768px]:py-4"
              >
                <span className="w-7 shrink-0 text-lg font-semibold text-muted">{svc.number}</span>

                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="font-display text-[1.0625rem] font-bold text-ink">{svc.title}</h3>
                  <div className="flex flex-wrap gap-3 text-[0.8125rem] text-body max-[768px]:hidden">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="whitespace-nowrap">
                        • {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                    openIndex === i
                      ? 'rotate-180 bg-brand'
                      : 'bg-[#4b5563] group-hover:bg-gray-700'
                  }`}
                >
                  <ChevronDown size={14} strokeWidth={2} className="text-white" />
                </div>
              </button>

              {openIndex === i && (
                <div className="animate-fade-in px-7 pb-5 text-sm leading-[1.6] text-body max-[768px]:px-5 max-[768px]:pb-4">
                  <p className={svc.serviceHref ? 'mb-4' : undefined}>{svc.description}</p>
                  {svc.serviceHref && (
                    <Link
                      to={svc.serviceHref}
                      className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-brand transition-colors hover:text-brand-dark"
                    >
                      See pricing & details
                      <ArrowRight size={12} strokeWidth={2.5} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
