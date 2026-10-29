import { Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';
import { Reveal, Stagger } from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import { portfolioList } from '../data/portfolioData';

/**
 * /portfolio
 *
 * The selected-work page. Every card links to its own case study; the copy and
 * imagery come from src/data/portfolioData.js, which is also what generates the
 * case-study routes and their sitemap entries.
 */
export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-[115px] pb-12 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-brand opacity-[0.08] blur-[90px]"
        />

        <div className="shell">
          <Reveal threshold={0.1} className="mx-auto max-w-[820px]">
            {/* <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface-2 px-4 py-1.5 text-xs font-semibold text-body shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="h-2 w-2 rounded-full bg-brand" />
              Selected work · {portfolioList.length} projects
            </span> */}

            <h1 className="mb-5 font-display text-[clamp(2.1rem,4.8vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink">
              Showcasing some of what we&apos;ve built
            </h1>

            <p className="mx-auto mb-8 max-w-[620px] text-[0.9375rem] leading-[1.75] text-body">
              Websites, products, and brand experiences built for businesses, nonprofits, and the
              next generation of designers.
            </p>

            <Link
              to="/contact"
              id="btn-portfolio-book-call"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand-lg"
            >
              <PhoneCall size={15} strokeWidth={2.2} />
              Book a Call
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Work grid ── */}
      <section className="pb-24 pt-8">
        <div className="shell">
          <Stagger
            threshold={0.05}
            className="grid grid-cols-2 gap-x-8 gap-y-14 max-[800px]:grid-cols-1 max-[800px]:gap-y-12"
          >
            {portfolioList.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Stagger>
        </div>
      </section>
    </main>
  );
}
