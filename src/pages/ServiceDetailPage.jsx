import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Check, PhoneCall, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesData, serviceList } from '../data/servicesData';

function PlanCard({ plan, currency }) {
  const price = currency === 'NGN' ? plan.priceNGN : plan.priceUSD;
  const isCustom = price === 'Custom Price';

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${
        plan.highlight
          ? 'border-brand bg-brand-tint/60 shadow-brand'
          : 'border-line bg-white'
      }`}
    >
      <div className="mb-4">
        <h3 className="font-display text-[1.2rem] font-bold text-ink">{plan.name}</h3>
        {plan.subtitle && (
          <p className="mt-1 text-[0.82rem] leading-snug text-body min-h-[2.4rem]">
            {plan.subtitle}
          </p>
        )}
      </div>

      {plan.badge ? (
        <span className="mb-3 inline-block self-start rounded-full bg-brand/10 px-3 py-1 text-[0.72rem] font-semibold text-brand">
          {plan.badge}
        </span>
      ) : (
        <div className="mb-3 h-[25px]" aria-hidden="true" />
      )}

      <div className="mb-5">
        <span className="font-display text-[1.5rem] font-extrabold text-ink">
          {isCustom ? 'Custom Price' : price}
        </span>
      </div>

      <a
        href="#contact"
        className={`mb-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
          plan.ctaStyle === 'brand'
            ? 'bg-brand text-white shadow-brand hover:bg-brand-dark hover:shadow-brand-lg'
            : 'bg-ink text-white hover:bg-ink-soft'
        }`}
      >
        {plan.cta}
      </a>

      <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-wider text-muted">
        What's Included
      </p>
      <ul className="flex flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[0.82rem] leading-[1.55] text-body">
            <Check size={14} strokeWidth={2.5} className="mt-[3px] shrink-0 text-brand" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceDetailPage({ defaultSlug }) {
  const { serviceId } = useParams();
  const activeSlug = serviceId || defaultSlug || 'web-development';
  const service = servicesData[activeSlug] || servicesData['web-development'];

  const [currency, setCurrency] = useState('NGN');
  const [openFaq, setOpenFaq] = useState(-1);

  const heroRef = useInView(0.1);
  const plansRef = useInView(0.05);
  const faqRef = useInView(0.05);
  const ctaRef = useInView(0.1);

  // Scroll to top whenever the service sub-page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpenFaq(-1);
    if (service?.title) {
      document.title = `${service.title} | Kodeio Technologies`;
    }
  }, [activeSlug, service?.title]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* ── Sub-page Hero Section ── */}
        <section className="relative overflow-hidden pt-[115px] pb-14 text-center">
          {/* Subtle purple radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-brand opacity-[0.07] blur-[90px]"
          />

          <div className="shell">
            <div ref={heroRef.ref} className="reveal mx-auto max-w-[740px]">
              {/* Category Pill Tag */}
              <span className="mb-4 inline-block rounded-full border border-line bg-surface-2 px-4 py-1.5 text-xs font-semibold text-body shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                {service.tag}
              </span>

              {/* Page Main Headline */}
              <h1 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)] font-extrabold leading-[1.14] tracking-[-0.03em] text-ink">
                {service.headline}
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mb-9 max-w-[660px] text-[0.9375rem] leading-[1.75] text-body">
                {service.sub}
              </p>

              {/* Quick Sub-page Switcher Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {serviceList.map((item) => {
                  const isActive = item.slug === activeSlug;
                  return (
                    <Link
                      key={item.slug}
                      to={`/services/${item.slug}`}
                      className={`rounded-full px-4 py-2 text-xs md:text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-brand text-white shadow-brand'
                          : 'border border-line bg-white text-ink-soft hover:border-brand/50 hover:bg-brand-tint hover:text-brand'
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing Packages ── */}
        <section className="py-14 bg-surface/50 border-t border-line-soft">
          <div className="shell">
            <div ref={plansRef.ref} className="reveal">
              <h2 className="mb-6 text-center font-display text-[1.4rem] font-bold text-ink">
                {service.packagesTitle}
              </h2>

              {/* Currency Selector (NGN / USD) */}
              <div className="mb-10 flex justify-center">
                <div className="inline-flex rounded-full border border-line bg-surface-2 p-1 shadow-sm">
                  {['NGN', 'USD'].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`rounded-full px-6 py-1.5 text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        currency === curr
                          ? 'bg-brand text-white shadow-brand'
                          : 'text-body hover:text-ink'
                      }`}
                    >
                      {curr === 'NGN' ? 'NGN (₦)' : 'USD($)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Pricing Columns */}
              <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-1 max-[960px]:max-w-[450px] max-[960px]:mx-auto">
                {service.plans.map((plan) => (
                  <PlanCard key={plan.name} plan={plan} currency={currency} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-20 bg-white">
          <div className="shell">
            <div ref={faqRef.ref} className="reveal">
              <h2 className="mb-10 text-center font-display text-[1.45rem] font-bold text-ink">
                {service.faqTitle}
              </h2>

              <div className="mx-auto flex max-w-[760px] flex-col gap-3.5">
                {service.faqs.map((faq, idx) => (
                  <div
                    key={faq.q}
                    className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                      openFaq === idx
                        ? 'border-line bg-white shadow-sm'
                        : 'border-line-soft bg-surface-2 hover:bg-surface-3'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      aria-expanded={openFaq === idx}
                      className="flex w-full cursor-pointer items-center justify-between px-6 py-[1.15rem] text-left"
                    >
                      <span className="font-sans text-[0.9375rem] font-semibold text-ink-soft pr-4">
                        {faq.q}
                      </span>
                      <div
                        className={`shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? 'rotate-180 text-brand' : 'text-body'
                        }`}
                      >
                        <ChevronDown size={16} strokeWidth={2} />
                      </div>
                    </button>

                    {openFaq === idx && (
                      <div className="animate-fade-in px-6 pb-5 pt-1 text-sm leading-[1.7] text-body border-t border-line/40">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom Call To Action Banner ── */}
        <section className="pb-24 pt-6 bg-white">
          <div className="shell">
            <div ref={ctaRef.ref} className="reveal">
              <div className="mx-auto max-w-[760px] rounded-3xl bg-brand-muted/70 px-8 py-12 text-center border border-brand/15 sm:px-12">
                <h2 className="mb-4 font-display text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold text-ink">
                  {service.ctaHeadline}
                </h2>
                <p className="mx-auto mb-8 max-w-[600px] text-[0.9375rem] leading-[1.75] text-body">
                  {service.ctaBody}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand-lg"
                >
                  <PhoneCall size={15} strokeWidth={2.2} />
                  <span>{service.ctaBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
