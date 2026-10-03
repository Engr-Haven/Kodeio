import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { CONTACT, SOCIALS } from '../data/site';

/**
 * The contact form is still to be built — nothing here posts anywhere yet.
 *
 * The details below are real and shared with the footer via `src/data/site.js`,
 * so this page is useful as-is. Add the form when it is ready.
 */
export default function ContactPage() {
  return (
    <main className="bg-white pt-[105px] pb-24">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)] font-extrabold tracking-[-0.03em] text-ink">
            Contact Us
          </h1>
          <p className="mb-12 text-[0.9375rem] leading-[1.75] text-body">
            Our enquiry form is on its way. Until then, reach the team directly using any of the
            details below.
          </p>
        </div>

        <div className="mx-auto grid max-w-[860px] grid-cols-2 gap-6 max-[760px]:grid-cols-1">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-start gap-4 rounded-card border border-line-soft bg-surface-2 p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-line hover:bg-surface-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
              <Mail size={18} strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.72rem] font-bold uppercase tracking-wider text-muted">
                Email
              </span>
              <span className="mt-1 block break-all text-[0.9375rem] font-semibold text-ink">
                {CONTACT.email}
              </span>
            </span>
          </a>

          <div className="flex flex-col gap-6">
            {CONTACT.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="flex items-start gap-4 rounded-card border border-line-soft bg-surface-2 p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-line hover:bg-surface-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
                  <Phone size={18} strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.72rem] font-bold uppercase tracking-wider text-muted">
                    Phone
                  </span>
                  <span className="mt-1 block text-[0.9375rem] font-semibold text-ink">
                    {phone.label}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[860px] border-t border-line-soft pt-10 text-center">
          <h2 className="mb-5 font-display text-[1.25rem] font-bold text-ink">Follow Kodeio</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-px hover:border-brand hover:bg-brand-tint hover:text-brand"
              >
                {label}
              </a>
            ))}
          </div>

          <p className="mt-8 text-sm text-body">
            Or browse{' '}
            <Link to="/services/web-development" className="font-semibold text-brand hover:underline">
              our services and pricing
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}