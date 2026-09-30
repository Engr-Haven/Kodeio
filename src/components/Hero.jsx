import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

const mockups = {
  pcTopLeft: {
    src: '/FAST%20HERO%20PC.png',
    alt: 'Website design project preview',
    width: 1407,
    height: 984,
  },
  pcBottomLeft: {
    src: '/FAST%20HERO%20PC%20(1).png',
    alt: 'Student training programme preview',
    width: 1360,
    height: 895,
  },
  phone: {
    src: '/iPhone.png',
    alt: 'Mobile app design preview',
    width: 447,
    height: 900,
  },
  pcTopRight: {
    src: '/FAST%20HERO%20PC%20(2).png',
    alt: 'Frontend development project preview',
    width: 1360,
    height: 895,
  },
  dashboard: {
    src: '/Dashboard%20filled.png',
    alt: 'Project performance dashboard preview',
    width: 704,
    height: 577,
  },
};

const dropShadow = '[filter:drop-shadow(0_18px_22px_rgba(0,0,0,0.13))]';

/* Endless float timings. These MUST stay complete literal strings — Tailwind
   scans source text, so an interpolated `[animation-duration:${d}s]` would be
   invisible to it and the override would silently never apply.
   The negative delay starts each image mid-cycle, so on first paint the five
   mockups sit at different heights instead of rising in lockstep. */
const FLOAT = {
  left: 'animate-hero-float [animation-duration:5.4s] [animation-delay:-0.6s]',
  phone: 'animate-hero-float [animation-duration:4.4s] [animation-delay:-2.1s]',
  right: 'animate-hero-float [animation-duration:5.8s] [animation-delay:-3.7s]',
};

export default function Hero() {
  const text = useInView(0.1);
  const { ref: mockupsRef, visible: mockupsVisible } = useInView(0.1);

  // Replays the bounce on every entry into view, not just the first.
  // Bumping `bounceTick` remounts the grid, which restarts the CSS animations
  // (a class toggle alone will not re-run an animation that already finished).
  const [bounceTick, setBounceTick] = useState(0);
  useEffect(() => {
    const el = mockupsRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBounceTick((t) => t + 1);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mockupsRef]);

  // Staggered entrance, re-applied on each new tick.
  const bounce = (delay) =>
    mockupsVisible ? `animate-hero-bounce [animation-delay:${delay}ms]` : '';
  const bouncePhone = mockupsVisible
    ? 'animate-hero-bounce-phone [animation-delay:180ms]'
    : '';

  const figure = (media, animation, floatKey, className = '') => (
    <figure className={`m-0 ${animation} ${className}`}>
      {/* Float lives here, not on the figure: the outer figure already owns
          `transform` for the entrance bounce, and two animations fighting over
          one property would clobber each other. */}
      <div className={`will-change-transform ${FLOAT[floatKey]}`}>
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="eager"
          decoding="async"
          className={`block h-auto w-full ${dropShadow}`}
        />
      </div>
    </figure>
  );

  return (
    <section id="home" className="relative flex flex-col items-center overflow-hidden bg-white pt-[105px] pb-20">
      <div className="shell flex w-full flex-col items-center text-center">
        {/* ── Top announcement badge pill ───────── */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-[1.1rem] py-[0.4rem] text-[0.8125rem] font-medium text-gray-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <span>Book a call</span>
            <span className="text-[0.75rem] font-light text-muted">&gt;</span>
            <span>Finish project</span>
            <span className="text-[0.75rem] font-light text-muted">&gt;</span>
            <span>Get more leads</span>
          </div>
        </div>

        {/* ── Main centered headline & subtitle ─── */}
        <div ref={text.ref} className="reveal mx-auto flex max-w-[820px] flex-col items-center">
          <h1 className="mb-5 font-display text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.12] font-extrabold tracking-[-0.035em] text-ink">
            Kodeio builds Websites.
          </h1>
          <p className="mb-8 max-w-[680px] text-[clamp(0.95rem,1.6vw,1.0625rem)] leading-[1.65] font-normal text-body">
            From branding to design to development, we build websites, mobile apps, and product
            that generate leads, drive performance and converts.
            <br />
            We train students through bootcamps with internship opportunities for top performers.
          </p>
          <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              id="hero-cta-audit"
              className="inline-block rounded-full bg-brand px-7 py-3 text-[0.9375rem] font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_6px_20px_rgba(125,46,255,0.35)]"
            >
              Request Free Audit
            </a>
            <a
              href="#courses"
              id="hero-cta-bootcamp"
              className="inline-block rounded-full border-[1.5px] border-[#9657ff] bg-white px-7 py-[0.72rem] text-[0.9375rem] font-semibold text-brand transition-all duration-200 hover:-translate-y-px hover:border-brand hover:bg-brand-tint"
            >
              Join a Bootcamp
            </a>
          </div>
        </div>

        {/* ── Showcase imagery ──────────────────── */}
        <div
          ref={mockupsRef}
          className={`relative flex w-full max-w-[1128px] items-center justify-center px-0 pt-4 pb-8 transition-opacity duration-700 ${
            mockupsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* key remounts the grid on each entry so the bounce replays */}
          <div
            key={bounceTick}
            className="grid w-full grid-cols-[1fr_300px_1fr] items-center gap-6 max-[960px]:mx-auto max-[960px]:max-w-[420px] max-[960px]:grid-cols-1"
          >
            {/* ── Left column ──────────────────── */}
            <div className="flex flex-col gap-5">
              {figure(mockups.pcTopLeft, bounce(0), 'left')}
              {figure(mockups.pcBottomLeft, bounce(90), 'left')}
            </div>

            {/* ── Center: phone ────────────────── */}
            <div className="flex items-center justify-center">
              {/* capped so it doesn't dominate the single-column mobile stack */}
              {figure(mockups.phone, bouncePhone, 'phone', 'mx-auto w-full max-w-[280px]')}
            </div>

            {/* ── Right column ─────────────────── */}
            <div className="flex flex-col gap-5">
              {figure(mockups.pcTopRight, bounce(270), 'right')}
              {figure(mockups.dashboard, bounce(360), 'right')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
