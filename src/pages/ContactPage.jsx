import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Send,
  Target,
  Layers,
  Calendar,
  Wallet,
  Palette,
  Compass,
  Clock,
  Building2,
  Video,
  Globe,
  Sparkles,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { CONTACT, SOCIALS } from '../data/site';
import { serviceList } from '../data/servicesData';
import { courseList } from '../data/coursesData';
import { Reveal, Stagger } from '../components/Reveal';

/**
 * ContactPage
 *
 * The page carries an enquiry form. There is no backend yet, so the submit
 * handler has two paths (see handleSubmit):
 *
 *   1. If VITE_CONTACT_ENDPOINT is set, the form POSTs JSON to it.
 *   2. If it is not set, the message is handed to the visitor's own mail app
 *      via a mailto: link — so the form is genuinely usable today.
 *
 * Set VITE_CONTACT_ENDPOINT in .env (or the environment) when the backend
 * exists and the second path is never taken. Until then nothing is silently
 * dropped: every submission either reaches the endpoint or opens a real email.
 *
 * The contact details shown here are real and shared with the footer via
 * `src/data/site.js`, so the two cannot drift apart.
 */

/**
 * Where the form POSTs. Empty means "no backend yet" — the mailto fallback
 * takes over. See the note at the top of the file.
 */
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '';

/* ── hero ──────────────────────────────────────────────────────────────────── */

/* Trust points under the headline. Every claim here already appears elsewhere
   in the site copy — the 8-working-hour reply time is the site's existing
   promise (src/seo/pages.js), the free discovery call and the
   3-to-5-business-day kickoff are from the home FAQ, and the global reach is
   from the About FAQ. */
const PROMISES = [
  { label: 'Reply within 8 working hours', Icon: Clock },
  { label: 'Free discovery call', Icon: Sparkles },
  { label: 'Remote, worldwide', Icon: Globe },
];

/* ── form options ─────────────────────────────────────────────────────────── */

/* Built from the data layer, so a new service or bootcamp appears in the
   dropdown automatically and the form can never offer something we do not do. */
const INTERESTS = [
  ...serviceList.map((service) => service.title),
  ...courseList.map((course) => course.title),
  'Something else',
];

/* Bands follow the real starting prices in servicesData. */
const BUDGETS = [
  'Under ₦200,000',
  '₦200,000 – ₦500,000',
  '₦500,000 – ₦1,000,000',
  'Over ₦1,000,000',
  'Not sure yet',
];

const TIMELINES = ['As soon as possible', 'Within 1–2 months', '3+ months away', 'Flexible'];

/* ── what speeds up a reply ───────────────────────────────────────────────── */

/* Deliberately a plain list, not a grid of cards: this sits in a narrow side
   rail, and a list reads faster there than a stack of titled tiles. */
const BRIEF_HINTS = [
  { label: 'The goal', detail: 'what success looks like', Icon: Target },
  { label: 'The scope', detail: 'pages, screens, features', Icon: Layers },
  { label: 'The deadline', detail: 'a launch date to plan around', Icon: Calendar },
  { label: 'The budget range', detail: 'so we can propose the right plan', Icon: Wallet },
  { label: 'Brand assets', detail: 'logo, colours, guidelines', Icon: Palette },
  { label: 'References', detail: 'sites or apps you like', Icon: Compass },
];

/* ── starting prices ─────────────────────────────────────────────────────── */

/* Read straight off the price lists in servicesData — the entry tier of each
   service. No invented numbers, and a service added to the data shows up here
   automatically. The "from " prefix is dropped because the section heading
   already says these are starting prices. */
const _STARTING_PRICES = serviceList.map((service) => {
  const entry = service.plans[0].priceNGN;
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    price: entry.startsWith('from ') ? entry.replace('from ', '') : 'Custom quote',
  };
});

/* ── two audiences ────────────────────────────────────────────────────────── */

const AUDIENCES = [
  {
    eyebrow: 'For clients',
    title: 'Building something?',
    body: 'Brand identity, websites, mobile apps, e-commerce, product design and AI video — delivered by the studio team for startups, brands and businesses.',
    cta: 'Explore our services',
    to: '/services/web-development',
    Icon: Building2,
    surface: 'border-brand/15 bg-brand-tint',
    iconSurface: 'bg-brand text-white shadow-brand',
  },
  {
    eyebrow: 'For learners',
    title: 'Learning to build?',
    body: 'Live cohorts in product design, WordPress and frontend development, taught by working designers and developers — with internship opportunities for top performers.',
    cta: 'See the bootcamps',
    to: '/courses',
    Icon: Video,
    surface: 'border-line-soft bg-surface-2',
    iconSurface: 'bg-ink text-white',
  },
];

/* ── validation ───────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.email.trim()) {
    errors.email = 'Please add an email address so we can reply.';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That email address does not look right.';
  }
  if (!values.message.trim()) {
    errors.message = 'A sentence or two is enough — what are you building?';
  }

  return errors;
}

/* ── form field primitives ────────────────────────────────────────────────── */

const LABEL = 'mb-1.5 block text-[0.8125rem] font-semibold text-ink-soft';

const CONTROL =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors duration-200 placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/15';

function Field({ id, label, error, required = false, children }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
        {required && (
          <span className="ml-0.5 text-accent-orange" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.78rem] text-accent-orange">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { kind, message }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ kind: 'error', message: 'Please check the highlighted fields and try again.' });
      return;
    }

    setStatus({ kind: 'sending', message: 'Sending your message…' });

    /* 1 — a backend is configured: POST the payload as JSON. */
    if (FORM_ENDPOINT) {
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);

        form.reset();
        setErrors({});
        setStatus({
          kind: 'sent',
          message:
            'Thanks — your message is on its way. We reply to every enquiry within 8 working hours.',
        });
      } catch {
        setStatus({
          kind: 'error',
          message:
            'Something went wrong sending that. Please email us directly and we will pick it up.',
        });
      }
      return;
    }

    /* 2 — no backend yet: hand the message to the visitor's own mail app, so
          the form still gets the enquiry in front of a human. */
    const subject = `New enquiry — ${values.subject || 'General'}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : null,
      values.company ? `Company: ${values.company}` : null,
      `Interested in: ${values.subject}`,
      values.budget ? `Budget: ${values.budget}` : null,
      values.timeline ? `Timeline: ${values.timeline}` : null,
      '',
      values.message,
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setStatus({
      kind: 'sent',
      message:
        'Your email app should be opening with the message ready to send. If nothing happened, email us directly and we will pick it up.',
    });
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-[115px] pb-16 text-center">
        {/* The house purple glow, reused from the other sub-page heroes. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-brand opacity-[0.08] blur-[90px]"
        />

        <div className="shell">
          <Reveal threshold={0.1} className="mx-auto max-w-[780px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface-2 px-4 py-1.5 text-xs font-semibold text-body shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Get in Touch</span>
            </div>

            <h1 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink">
              Tell us what you want to build
            </h1>

            <p className="mx-auto mb-8 max-w-[640px] text-[0.9375rem] leading-[1.75] text-body">
              Have an inquiry, need a quote, or just want to talk through an idea? Send us the
              details and we will come back with a clear scope, a realistic timeline, and an honest
              number — usually within 8 working hours.
            </p>

            {/* The two ways to actually reach us, above the fold. */}
            <div className="mb-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="btn btn-primary min-h-12 px-7 text-[0.9375rem]"
              >
                <Mail size={16} strokeWidth={2.2} />
                Email us
              </a>
              <a
                href={`tel:${CONTACT.phones[0].href.replace('tel:', '')}`}
                className="btn btn-secondary min-h-12 px-7 text-[0.9375rem]"
              >
                <Phone size={16} strokeWidth={2.2} />
                Call us
              </a>
            </div>

            {/* A light trust strip rather than a row of chips — it should not
                compete with the buttons above it. */}
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
              {PROMISES.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-body"
                >
                  <Icon size={14} strokeWidth={2} className="text-brand" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Enquiry form + direct contact rail ── */}
      <section id="enquiry" className="border-t border-line-soft bg-surface/40 py-20">
        <div className="shell">
          <Reveal threshold={0.05} className="mx-auto mb-12 max-w-[700px] text-center">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
              Tell us about the project
            </h2>
            <p className="text-[0.9375rem] leading-[1.75] text-body">
              The more you can share, the more useful our first reply can be. Nothing here is
              required except a name, an email, and a line about what you are building.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            {/* ── The form ── */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-line-soft bg-white p-7 shadow-lift sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="contact-name" label="Your name" error={errors.name} required>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Oluwapelumi Hassan"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={CONTROL}
                  />
                </Field>

                <Field id="contact-email" label="Email address" error={errors.email} required>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="pelusan@gmail.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={CONTROL}
                  />
                </Field>

                <Field id="contact-company" label="Company or brand">
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Optional"
                    className={CONTROL}
                  />
                </Field>

                <Field id="contact-phone" label="Phone number">
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Optional"
                    className={CONTROL}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field id="contact-subject" label="What do you need?">
                    <div className="relative">
                      <select
                        id="contact-subject"
                        name="subject"
                        defaultValue=""
                        className={`${CONTROL} appearance-none pr-11`}
                      >
                        <option value="" disabled>
                          Choose a service or bootcamp
                        </option>
                        {INTERESTS.map((interest) => (
                          <option key={interest} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                      />
                    </div>
                  </Field>
                </div>

                <Field id="contact-budget" label="Budget range">
                  <div className="relative">
                    <select
                      id="contact-budget"
                      name="budget"
                      defaultValue=""
                      className={`${CONTROL} appearance-none pr-11`}
                    >
                      <option value="" disabled>
                        Optional
                      </option>
                      {BUDGETS.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                    />
                  </div>
                </Field>

                <Field id="contact-timeline" label="Timeline">
                  <div className="relative">
                    <select
                      id="contact-timeline"
                      name="timeline"
                      defaultValue=""
                      className={`${CONTROL} appearance-none pr-11`}
                    >
                      <option value="" disabled>
                        Optional
                      </option>
                      {TIMELINES.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                    />
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    id="contact-message"
                    label="About the project"
                    error={errors.message}
                    required
                  >
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      placeholder="What are you building, who is it for, and what does success look like?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`${CONTROL} min-h-[150px] resize-y`}
                    />
                  </Field>
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-[1.6] text-body">
                <input
                  id="contact-updates"
                  type="checkbox"
                  name="updates"
                  value="yes"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                />
                <span>
                  Send me occasional updates about new bootcamps and open roles. Optional.
                </span>
              </label>

              <button
                type="submit"
                disabled={status?.kind === 'sending'}
                className="btn btn-primary mt-7 min-h-12 w-full px-7 text-[0.9375rem] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <Send size={16} strokeWidth={2.2} />
                {status?.kind === 'sending' ? 'Sending…' : 'Send the message'}
              </button>

              <p className="mt-4 text-[0.78rem] leading-[1.6] text-muted">
                We use these details only to reply to your enquiry. Nothing is shared with anyone
                else.
              </p>

              {/* The status region is announced to screen readers as it changes. */}
              <div role="status" aria-live="polite" className="mt-4 empty:mt-0">
                {status && (
                  <p
                    className={`rounded-xl border px-4 py-3 text-[0.85rem] leading-[1.6] ${
                      status.kind === 'sent'
                        ? 'border-success/25 bg-success-bg text-success-dark'
                        : status.kind === 'error'
                          ? 'border-accent-orange-line bg-accent-orange-bg text-accent-orange-dark'
                          : 'border-line bg-surface-2 text-body'
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>

            {/* ── Direct contact rail ── */}
            <aside className="flex flex-col gap-6">
              <div className="rounded-3xl border border-line-soft bg-white p-7">
                {/* A card title, not a section heading — the rail is supporting
                    material, so it stays out of the document outline. */}
                <p className="mb-4 font-display text-[1.15rem] font-bold text-ink">
                  Prefer to talk instead?
                </p>

                <ul className="flex flex-col gap-3">
                  {CONTACT.phones.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:text-brand"
                      >
                        <Phone size={15} strokeWidth={2} className="shrink-0 text-brand" />
                        {phone.label}
                      </a>
                    </li>
                  ))}

                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-center gap-2.5 break-all text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:text-brand"
                    >
                      <Mail size={15} strokeWidth={2} className="shrink-0 text-brand" />
                      {CONTACT.email}
                    </a>
                  </li>

                  <li>
                    <a
                      href={`mailto:kodeio.it@gmail.com`}
                      className="flex items-center gap-2.5 break-all text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:text-brand"
                    >
                      <Mail size={15} strokeWidth={2} className="shrink-0 text-brand" />
                      kodeio.it@gmail.com
                    </a>
                  </li>
                </ul>

                <div className="mt-5 flex flex-wrap gap-2.5 border-t border-line-soft pt-5">
                  {SOCIALS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.8125rem] font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint hover:text-brand"
                    >
                      {label}
                      <ArrowUpRight size={13} strokeWidth={2.4} />
                    </a>
                  ))}
                </div>
              </div>

              {/* A plain list, not a grid of titled tiles — in a narrow rail a
                  list reads faster, and the lead-in is enough of a heading. */}
              <div className="rounded-3xl border border-line-soft bg-brand-tint p-7">
                <p className="mb-1 font-display text-[1.15rem] font-bold text-ink">
                  What speeds up a reply
                </p>
                <p className="mb-5 text-[0.85rem] leading-[1.65] text-body">
                  Include any of these and we can go straight to a plan.
                </p>

                <ul className="flex flex-col gap-3">
                  {BRIEF_HINTS.map(({ label, detail, Icon }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-muted text-brand">
                        <Icon size={13} strokeWidth={2.2} />
                      </span>
                      <span className="text-[0.85rem] leading-[1.55] text-body">
                        <span className="font-semibold text-ink">{label}</span> — {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-line-soft bg-white p-7">
                <p className="flex items-start gap-3 text-[0.875rem] leading-[1.7] text-body">
                  <CheckCircle2
                    size={17}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-success"
                  />
                  <span>
                    Every enquiry gets a reply within 8 working hours. If it is outside what we do,
                    we will tell you who does it.
                  </span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Starting prices ── */}
      {/* <section id="pricing" className="bg-white py-20">
        <div className="shell">
          <Reveal threshold={0.05} className="mx-auto mb-10 max-w-[700px] text-center">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
              What it costs to get started
            </h2>
            <p className="text-[0.9375rem] leading-[1.75] text-body">
              Straight from the price list &mdash; these are the entry prices. Select a service to
              see all three tiers.
            </p>
          </Reveal>

          <Reveal threshold={0.05} className="mx-auto max-w-[820px]">
            <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2">
              {STARTING_PRICES.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/services/${item.slug}`}
                    className="group flex items-baseline justify-between gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 hover:bg-surface-2 hover:shadow-lift"
                  >
                    <span className="text-[0.9375rem] font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                      {item.title}
                    </span>
                    <span className="shrink-0 font-display text-[0.9375rem] font-bold text-brand">
                      {item.price}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mx-auto mt-8 max-w-[560px] text-center text-[0.875rem] leading-[1.7] text-body">
              Reply within 8 working hours. Once scope and price are agreed we kick off &mdash;
              usually within 3 to 5 business days.
            </p>
          </Reveal>
        </div>
      </section> */}

      {/* ── Two audiences ── */}
      <section className="border-t border-line-soft bg-surface/40 py-20">
        <div className="shell">
          <Reveal threshold={0.05} className="mx-auto mb-12 max-w-[700px] text-center">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
              Work with us, or learn from us
            </h2>
            <p className="text-[0.9375rem] leading-[1.75] text-body">
              Most people arrive here for one of these. If you are not sure which, that is what the
              call is for.
            </p>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-2">
            {AUDIENCES.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className={`flex flex-col rounded-3xl border p-8 ${item.surface}`}
                >
                  <span
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.iconSurface}`}
                  >
                    <Icon size={22} strokeWidth={1.9} />
                  </span>

                  <span className="mb-2 block text-[0.72rem] font-bold uppercase tracking-wider text-muted">
                    {item.eyebrow}
                  </span>
                  <p className="mb-3 font-display text-[1.4rem] font-bold text-ink">{item.title}</p>
                  <p className="mb-7 flex-1 text-[0.9375rem] leading-[1.75] text-body">
                    {item.body}
                  </p>

                  <Link
                    to={item.to}
                    className="btn btn-primary min-h-11 self-start px-6 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {item.cta}
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="bg-white pb-24 pt-20">
        <div className="shell">
          <Reveal
            threshold={0.1}
            className="mx-auto max-w-[820px] rounded-3xl border border-brand/15 bg-gradient-to-b from-banner-top to-banner-bottom px-8 py-12 text-center"
          >
            <h2 className="mb-4 font-display text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold text-ink">
              Let&rsquo;s talk about your project
            </h2>

            <p className="mx-auto mb-8 max-w-[640px] text-[0.9375rem] leading-[1.75] text-body">
              Send over what you know and we will fill in the rest. Every enquiry gets a reply
              within 8 working hours &mdash; and if it falls outside what we do, we will tell you
              who does.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={`mailto:${CONTACT.email}`} className="btn btn-primary min-h-11 px-8">
                <Mail size={15} strokeWidth={2.2} />
                Email us
              </a>

              <Link
                to="/services/web-development"
                className="btn btn-secondary min-h-11 px-8 hover:-translate-y-0.5"
              >
                See our services
                <ArrowRight size={15} strokeWidth={2.2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
