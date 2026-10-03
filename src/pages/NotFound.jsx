import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { serviceList } from '../data/servicesData';

// Derived from the data file rather than hardcoded, so a service that is added
// or renamed later cannot drift out of sync with this page.
const shortcuts = serviceList.map(({ slug, title }) => ({
  label: title,
  to: `/services/${slug}`,
}));

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-white pt-[105px] pb-24">
      <div className="shell flex w-full flex-col items-center text-center">
        <p className="mb-4 font-display text-[clamp(4rem,12vw,7rem)] font-black leading-none tracking-[-0.04em] text-brand">
          404
        </p>

        <h1 className="mb-4 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold tracking-[-0.02em] text-ink">
          We couldn&apos;t find that page
        </h1>
        <p className="mb-9 max-w-[520px] text-[0.9375rem] leading-[1.7] text-body">
          The link may be broken or the page may have moved. Try one of the services below, or head
          back to the homepage.
        </p>

        <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-[0.9375rem] font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark hover:shadow-brand-lg"
          >
            Back to Home
            <ArrowRight size={15} strokeWidth={2.2} />
          </Link>
        </div>

        <div className="w-full max-w-[760px]">
          <span className="mb-4 block text-sm font-medium text-body">Our Services</span>
          <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
            {shortcuts.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="flex min-h-11 items-center justify-between gap-3 rounded-card border border-line-soft bg-surface-2 px-5 py-3.5 text-left text-sm font-semibold text-ink transition-all duration-200 hover:border-line hover:bg-surface-3 hover:text-brand"
              >
                {label}
                <ArrowRight size={14} strokeWidth={2.2} className="shrink-0 text-brand" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}