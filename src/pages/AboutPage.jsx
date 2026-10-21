import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, ArrowRight, Target, Eye, PhoneCall } from 'lucide-react';
import { Reveal, Stagger } from '../components/Reveal';

/* ─── shared primitives ───────────────────────────────────────────────────── */

/* Buttons follow the house style: a full-radius pill, brand-filled for the
   primary action, outlined for the secondary. */
const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand-lg';

const BTN_OUTLINE =
  'inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-brand bg-white px-7 py-3.5 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-tint';

const BTN_NEUTRAL =
  'inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-brand';

function Eyebrow({ children, className = '' }) {
  return <p className={`text-sm font-semibold text-brand ${className}`}>{children}</p>;
}

function SectionTitle({ children, className = '' }) {
  return (
    <h2
      className={`font-display text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

/* ─── page copy ───────────────────────────────────────────────────────────── */

const STORY_PARAGRAPHS = [
  {
    text: 'Technology is shaping the future, but too many great ideas never become reality, and too many aspiring designers and developers struggle to gain the practical experience needed to build them.',
  },
  {
    lead: 'Kodeio was founded to bridge that gap.',
  },
  {
    text: 'We are a digital product studio and technology learning platform that helps businesses design and build modern websites, mobile apps, and digital products while preparing future designers and developers with hands-on, industry-ready skills.',
  },
  {
    text: "What makes us different is simple: we don't separate learning from real work. Every client project informs what we teach, and every bootcamp is built around the tools, workflows, and challenges used by modern product teams. This keeps our services innovative, our curriculum relevant, and our students prepared for real careers.",
  },
  {
    text: "At Kodeio, we're building more than digital products — we're building the people who will create the future.",
  },
];

const PURPOSE_CARDS = [
  {
    title: 'Mission',
    text: 'We help businesses build exceptional websites, apps, and digital products while training the next generation of designers and developers through real-world projects. Every product we create strengthens our teaching, creating a continuous cycle of innovation, learning, and growth.',
    Icon: Target,
    bg: 'bg-about-mission',
    iconBg: 'bg-about-icon-lilac',
    iconFg: 'text-brand',
  },
  {
    title: 'Vision',
    text: 'To cultivate a vibrant ecosystem where learning and building converge, empowering a new generation of creators and engineers to shape the digital future.',
    Icon: Eye,
    bg: 'bg-about-vision',
    iconBg: 'bg-about-icon-blue',
    iconFg: 'text-about-vision-ink',
  },
];

const SERVICES = [
  {
    num: '01',
    title: 'UI/UX & Product Design',
    bg: 'bg-about-card-pink',
    deep: 'bg-about-card-pink-strong',
    link: '/services/ui-ux-product-design',
  },
  {
    num: '02',
    title: 'Web Development',
    bg: 'bg-about-card-blue',
    deep: 'bg-about-card-blue-strong',
    link: '/services/web-development',
  },
  {
    num: '03',
    title: 'Frontend Development',
    bg: 'bg-about-card-amber',
    deep: 'bg-about-card-amber-strong',
    link: '/courses/frontend-development',
  },
  {
    num: '04',
    title: 'Project-Based Learning',
    bg: 'bg-about-card-peach',
    deep: 'bg-about-card-peach-strong',
    link: '/courses',
  },
];

/* Tool logos ship as PNGs in /public. The prebuild step (scripts/
   optimize-images.mjs) emits a WebP sibling into /optimized/, so each mark is
   served through <picture> with the PNG as the fallback. */
const TOOLS = [
  { name: 'Figma', file: 'figma' },
  { name: 'Framer', file: 'framer' },
  { name: 'Claude AI', file: 'claude' },
  { name: 'JavaScript', file: 'javascript' },
  { name: 'React', file: 'react' },
  { name: 'CSS3', file: 'css' },
  { name: 'HTML5', file: 'html' },
  { name: 'WordPress', file: 'wordpress' },
  { name: 'Python', file: 'python' },
];

const FAQ_ITEMS = [
  {
    q: 'What is Kodeio?',
    a: 'Kodeio is a digital product studio and technology learning platform. We help businesses design and build websites, mobile apps, and digital products, while training future designers and developers with practical, hands-on bootcamps.',
  },
  {
    q: 'What services does Kodeio offer?',
    a: 'We offer UI/UX design, web development, frontend development (React, Next.js), backend development (Node.js, Express.js), mobile app development, and project-based learning bootcamps for aspiring designers and developers.',
  },
  {
    q: 'Who do you work with?',
    a: 'We work with startups, SMEs, and entrepreneurs who need high-quality digital products, as well as individuals who want to build real-world tech skills through our bootcamps.',
  },
  {
    q: 'Do I need experience to join a bootcamp?',
    a: 'No prior experience is required for most of our bootcamps. We design our programs to take you from beginner to job-ready, with step-by-step guidance and real project experience.',
  },
  {
    q: 'Will I receive a certificate after completing a course?',
    a: 'Yes. All participants who complete a Kodeio bootcamp receive a certificate of completion, along with portfolio projects they can showcase to employers or clients.',
  },
  {
    q: 'Do you offer internships?',
    a: 'Yes. We offer internship opportunities for top-performing bootcamp graduates to work on real client projects under the mentorship of our experienced team.',
  },
  {
    q: 'How do I get started with Kodeio?',
    a: 'You can book a free discovery call through our website, explore our services, or sign up for an upcoming bootcamp. Our team will guide you from there.',
  },
  {
    q: 'Can Kodeio help build my business website or mobile app?',
    a: 'Absolutely. Our studio team handles everything from strategy and design to development and launch. Reach out to discuss your project and get a custom quote.',
  },
  {
    q: 'Where is Kodeio located, and can I work with you remotely?',
    a: 'Kodeio is based in Lagos Nigeria, but we work with clients and students globally. All our services and bootcamps are available online.',
  },
];

/* ─── tool mark ───────────────────────────────────────────────────────────── */

function ToolMark({ file, name }) {
  return (
    <picture>
      <source srcSet={`/optimized/${file}.webp`} type="image/webp" />
      <img
        src={`/${file}.png`}
        alt={`${name} logo`}
        width={264}
        height={264}
        loading="lazy"
        decoding="async"
        className="h-11 w-11 object-contain"
      />
    </picture>
  );
}

/* One logo tile in the scrolling strip. The duplicate copy of the row passes
   `aria-hidden` so assistive tech hears each tool once, not twice. */
function ToolTile({ tool, 'aria-hidden': ariaHidden }) {
  return (
    <li
      aria-hidden={ariaHidden}
      className="flex h-[119px] w-[119px] shrink-0 flex-col items-center justify-center gap-2.5 rounded-xl bg-surface-2 p-3 text-center"
    >
      <ToolMark file={tool.file} name={tool.name} />
      <span className="text-[0.75rem] font-semibold leading-tight text-ink-soft">{tool.name}</span>
    </li>
  );
}

/* ─── FAQ accordion ────────────────────────────────────────────────────────── */

function FaqAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <div className="mx-auto flex max-w-[820px] flex-col gap-3">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        const triggerId = `about-faq-trigger-${i}`;
        const panelId = `about-faq-panel-${i}`;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-card border transition-colors duration-200 ${
              isOpen
                ? 'border-line bg-surface-3'
                : 'border-line-soft bg-surface-2 hover:border-line hover:bg-surface-3'
            }`}
          >
            <button
              type="button"
              id={triggerId}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-[1.15rem] text-left"
            >
              <span className="font-sans text-[0.9375rem] font-semibold text-ink-soft">
                {item.q}
              </span>
              <div
                className={`shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-brand' : 'text-body'
                }`}
              >
                <ChevronDown size={16} strokeWidth={2} />
              </div>
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="animate-fade-in border-t border-line/40 px-6 pb-5 pt-1 text-sm leading-[1.7] text-body"
              >
                <p>{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── page ────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-[115px] pb-16 text-center">
        {/* Subtle purple radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-brand opacity-[0.08] blur-[90px]"
        />

        <div className="shell">
          <Reveal className="mx-auto max-w-[860px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-about-pill px-4 py-1.5 text-xs font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-about-green" />
              <span>About Kodeio</span>
            </div>

            <h1 className="mx-auto mb-5 max-w-[860px] font-display text-[clamp(2.1rem,4.5vw,3.3rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink">
              Building Better Digital Products. Developing Future Tech Talent.
            </h1>

            <p className="mx-auto mb-8 max-w-[780px] text-[0.9375rem] leading-[1.75] text-body">
              We design and build websites, mobile apps, and digital products for businesses while
              helping aspiring designers and developers gain practical, job-ready skills through
              hands-on bootcamps. Whether you&rsquo;re launching your next digital product or
              starting your journey in tech, Kodeio combines real client work with{' '}
              <span className="font-semibold text-ink">
                practical learning to deliver solutions that create lasting impact.
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className={BTN_PRIMARY}>
                <PhoneCall size={15} strokeWidth={2.2} />
                <span>Book a Call</span>
              </Link>
              <Link to="/courses" className={BTN_OUTLINE}>
                <span>Explore Courses</span>
                <ArrowRight size={15} strokeWidth={2.2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-white pt-20 pb-24">
        <div className="shell">
          <Reveal className="text-center">
            <Eyebrow>Our Story</Eyebrow>
            <SectionTitle className="mx-auto mt-3 max-w-[820px]">
              We&rsquo;re Building The Kind Of Tech Company We Wish Existed
            </SectionTitle>
          </Reveal>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_527px] lg:gap-x-16">
            <Reveal className="max-w-[520px] space-y-[18px]">
              {STORY_PARAGRAPHS.map((para) => (
                <p
                  key={para.lead ?? para.text}
                  className={
                    para.lead
                      ? 'font-display text-[1.0625rem] font-semibold text-brand'
                      : 'text-[0.9375rem] leading-[1.75] text-body'
                  }
                >
                  {para.lead ?? para.text}
                </p>
              ))}
            </Reveal>

            <Reveal delay={120} className="flex items-start justify-center gap-6">
              <figure className="w-[251px] shrink-0 overflow-hidden rounded-2xl">
                <picture>
                  <source srcSet="/optimized/aboutUs1.webp" type="image/webp" />
                  <img
                    src="/aboutUs1.png"
                    alt="Kodeio students working together at laptops"
                    width={756}
                    height={1140}
                    loading="lazy"
                    decoding="async"
                    className="h-[380px] w-full object-cover"
                  />
                </picture>
              </figure>

              <figure className="mt-[43px] w-[253px] shrink-0 overflow-hidden rounded-2xl">
                <picture>
                  <source srcSet="/optimized/aboutUs2.webp" type="image/webp" />
                  <img
                    src="/aboutUs2.png"
                    alt="Kodeio student focused on her work"
                    width={762}
                    height={1140}
                    loading="lazy"
                    decoding="async"
                    className="h-[379px] w-full object-cover"
                  />
                </picture>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="border-t border-line-soft bg-surface/40 py-20">
        <div className="shell">
          <Reveal className="text-center">
            <Eyebrow>Our Purpose</Eyebrow>
            <SectionTitle className="mx-auto mt-3 max-w-[700px]">Mission and Vision</SectionTitle>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {PURPOSE_CARDS.map((card) => {
              const Icon = card.Icon;
              return (
                <div
                  key={card.title}
                  className={`flex flex-col rounded-2xl border border-line-soft p-7 ${card.bg}`}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} ${card.iconFg}`}
                    >
                      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[1.25rem] font-bold text-ink">{card.title}</h3>
                  </div>

                  <p className="text-[0.9375rem] leading-[1.75] text-body">{card.text}</p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-white pt-20 pb-24">
        <div className="shell">
          <Reveal className="text-center">
            <SectionTitle className="mx-auto max-w-[760px]">What We Do</SectionTitle>
            <p className="mx-auto mt-4 max-w-[820px] text-[0.9375rem] leading-[1.75] text-body">
              We help businesses build exceptional digital products and equip aspiring tech
              professionals with practical skills through real-world projects, expert mentorship,
              and hands-on training.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <div
                key={service.num}
                className={`flex flex-col rounded-2xl border border-line-soft p-7 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lift ${service.bg}`}
              >
                <span className="font-display text-[1rem] font-bold text-muted">{service.num}</span>
                <h3 className="mt-2 mb-6 font-display text-[1.0625rem] font-bold leading-[1.3] text-ink">
                  {service.title}
                </h3>

                <Link
                  to={service.link}
                  className={`mt-auto inline-flex items-center justify-center rounded-full border-[1.5px] border-brand px-5 py-2.5 text-[0.8125rem] font-semibold text-brand transition-all duration-200 hover:bg-brand hover:text-white ${service.deep}`}
                >
                  Learn More
                </Link>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-white pb-20">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-[820px] rounded-3xl border border-brand/15 bg-gradient-to-b from-banner-top to-banner-bottom px-8 py-12 text-center">
              <h2 className="mb-4 font-display text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold text-ink">
                Ready to Build, Launch, or Learn?
              </h2>
              <p className="mx-auto mb-8 max-w-[640px] text-[0.9375rem] leading-[1.75] text-body">
                Whether you&rsquo;re growing a business or building your career, Kodeio gives you
                the tools, expertise, and practical experience to move forward with confidence.
                Let&rsquo;s create exceptional products or help you develop the skills to build them
                yourself.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className={BTN_PRIMARY}>
                  <span>Start Your Project</span>
                </Link>
                <Link to="/courses" className={BTN_NEUTRAL}>
                  <span>Explore Our Bootcamps</span>
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-t border-line-soft bg-surface/40 py-20">
        <div className="shell">
          <Reveal className="text-center">
            <SectionTitle className="mx-auto max-w-[760px]">
              The Tools Behind Every Great Product
            </SectionTitle>
            <p className="mx-auto mt-4 max-w-[820px] text-[0.9375rem] leading-[1.75] text-body">
              We use industry-leading design, development, and AI tools to create high-quality
              websites, mobile apps, and digital products while equipping our students with
              practical, job-ready skills.
            </p>
          </Reveal>

          {/* The strip scrolls continuously to the left. The track is `w-max`
              and holds the list twice, so the -50% translate lands exactly on
              the seam and the loop never shows a jump. `Reveal` rather than
              `Stagger` here: `.stagger` sets a transform on its direct child,
              and the marquee animates `transform` on exactly that element —
              the two would fight over the same property. */}
          <Reveal className="mt-12">
            <div className="tools-marquee rounded-2xl border border-line-soft bg-white p-7">
              <ul className="animate-tools-marquee flex w-max items-center gap-4 will-change-transform hover:[animation-play-state:paused]">
                {TOOLS.map((tool) => (
                  <ToolTile key={tool.name} tool={tool} />
                ))}

                {/* Second copy — the seam filler. Hidden from assistive tech so
                    each tool is announced once. */}
                {TOOLS.map((tool) => (
                  <ToolTile key={`loop-${tool.name}`} tool={tool} aria-hidden="true" />
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white pt-20 pb-24">
        <div className="shell">
          <Reveal className="text-center">
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <SectionTitle className="mx-auto mt-3 max-w-[760px]">
              Everything you need to know about Kodeio.
            </SectionTitle>
            <p className="mx-auto mt-4 max-w-[820px] text-[0.9375rem] leading-[1.75] text-body">
              Learn more about who we are, how we work, and how we help businesses build digital
              products while preparing the next generation of designers and developers through
              practical, hands-on learning.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section className="bg-white pb-24">
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-[820px] rounded-3xl border border-line-soft bg-surface px-8 py-12 text-center">
              <h2 className="mb-4 font-display text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold text-ink">
                Still Have Questions?
              </h2>
              <p className="mx-auto mb-8 max-w-[640px] text-[0.9375rem] leading-[1.75] text-body">
                Whether you&rsquo;re looking to build a digital product or start your journey in
                tech, our team is here to help. Reach out to us, and we&rsquo;ll guide you toward
                the best solution for your goals.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact" className={BTN_PRIMARY}>
                  <span>Contact Us</span>
                </Link>
                <Link to="/services/web-development" className={BTN_NEUTRAL}>
                  <span>Explore Our Services</span>
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
