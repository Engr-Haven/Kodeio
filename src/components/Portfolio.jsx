import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger } from './Reveal';
import ProjectGallery from './ProjectGallery';
import { homePortfolioList } from '../data/portfolioData';

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-white pb-24 pt-20">
      <div className="shell">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[600px]">
            <h2 className="mb-2 font-display text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold tracking-[-0.02em] text-ink">
              What We&apos;ve Built
            </h2>
            <p className="text-[0.95rem] leading-[1.6] text-body">
              From client websites to app interfaces and student projects, here&apos;s a glimpse of
              the work happening at Kodeio.
            </p>
          </div>
          <Link
            to="/portfolio"
            id="btn-view-all-projects"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-brand px-[1.4rem] py-[0.65rem] text-sm font-semibold whitespace-nowrap text-white transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark"
          >
            View All Projects
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-8 max-[800px]:grid-cols-1">
          {homePortfolioList.map((project) => (
            <Link
              key={project.slug}
              to={`/portfolio/${project.slug}`}
              id={`home-project-${project.id}`}
              className="group flex flex-col rounded-lg bg-surface-4 p-6 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_35px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-6 flex h-[200px] items-center justify-center overflow-hidden rounded-card border border-line bg-white p-2">
                <ProjectGallery
                  images={project.cardImages || project.cardImage}
                  alt={`${project.cardTitle} project preview`}
                  fit={project.cardImageFit || 'cover'}
                  className="h-full w-full"
                  imageClassName="max-h-full w-full rounded-lg object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <span className="mb-[0.65rem] inline-block self-start rounded-full bg-line px-2.5 py-[0.2rem] text-[0.75rem] font-semibold text-[#4b5563]">
                  {project.tags[0]}
                </span>
                <h3 className="mb-2 font-display text-[1.15rem] font-bold text-ink transition-colors group-hover:text-brand">
                  {project.cardTitle}
                </h3>
                <p className="text-[0.8125rem] leading-[1.6] text-body">
                  {project.cardDescription}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-brand">
                  View case study
                  <ArrowRight
                    size={13}
                    strokeWidth={2.2}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
