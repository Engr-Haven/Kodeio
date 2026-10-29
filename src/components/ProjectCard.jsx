import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProjectGallery from './ProjectGallery';

/**
 * A single project tile used on /portfolio. The whole tile is the link, so the
 * image and the copy share one hover state and one keyboard target.
 */
export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      id={`project-${project.id}`}
      className="group block focus-visible:outline-none"
      aria-label={`Read the ${project.cardTitle} case study`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand/30 group-hover:shadow-lift">
        <div className="flex h-[280px] items-center justify-center p-4 max-[720px]:h-[220px]">
          <ProjectGallery
            images={project.cardImages || project.cardImage}
            alt={`${project.cardTitle} project preview`}
            fit={project.cardImageFit || 'cover'}
            className="h-full w-full"
            imageClassName="max-h-full w-full rounded-lg object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-line bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold text-ink-soft shadow-sm backdrop-blur-sm transition-colors duration-200 group-hover:border-brand/30 group-hover:text-brand">
          Case study
          <ArrowUpRight size={13} strokeWidth={2.2} />
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block rounded-full bg-line px-2.5 py-[0.2rem] text-[0.7rem] font-semibold text-[#4b5563]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="mt-3 font-display text-[1.3rem] font-bold tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-brand">
        {project.cardTitle}
      </h2>
      <p className="mt-1.5 text-[0.84rem] leading-[1.6] text-body">{project.tagline}</p>
    </Link>
  );
}
