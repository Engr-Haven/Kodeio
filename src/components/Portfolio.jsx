import { ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

// Swap the `image` value on any card to use a different screenshot.
// Files are served from the /public folder. Spaces must be URL-encoded as %20.
const projects = [
  {
    id: 1,
    image: '/case%20study%20img.png',
    tag: 'UI/UX Design',
    title: 'FastAI - AI Design website',
    description:
      'Learn how to design modern websites, mobile apps, and digital products through practical live classes, design challenges, and real client-style projects while leveraging on AI.',
  },
  {
    id: 2,
    image: '/case%20study%20img.png',
    tag: 'UI/UX Design',
    title: 'FastAI - AI Design website',
    description:
      'Learn how to design modern websites, mobile apps, and digital products through practical live classes, design challenges, and real client-style projects while leveraging on AI.',
  },
  {
    id: 3,
    image: '/case%20study%20img.png',
    tag: 'UI/UX Design',
    title: 'FastAI - AI Design website',
    description:
      'Learn how to design modern websites, mobile apps, and digital products through practical live classes, design challenges, and real client-style projects while leveraging on AI.',
  },
  {
    id: 4,
    image: '/case%20study%20img.png',
    tag: 'UI/UX Design',
    title: 'FastAI - AI Design website',
    description:
      'Learn how to design modern websites, mobile apps, and digital products through practical live classes, design challenges, and real client-style projects while leveraging on AI.',
  },
];

export default function Portfolio() {
  const head = useInView();
  const grid = useInView(0.05);

  return (
    <section id="portfolio" className="bg-white pt-20 pb-24">
      <div className="shell">
        <div
          ref={head.ref}
          className="reveal mb-12 flex flex-wrap items-end justify-between gap-8"
        >
          <div className="max-w-[600px]">
            <h2 className="mb-2 font-display text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold tracking-[-0.02em] text-ink">
              What We&apos;ve Built
            </h2>
            <p className="text-[0.95rem] leading-[1.6] text-body">
              From client websites to app interfaces and student projects, here&apos;s a glimpse of
              the work happening at Kodeio.
            </p>
          </div>
          <a
            href="#contact"
            id="btn-view-all-projects"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-brand px-[1.4rem] py-[0.65rem] text-sm font-semibold whitespace-nowrap text-white transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark"
          >
            View All Projects
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>

        <div
          ref={grid.ref}
          className="stagger grid grid-cols-2 gap-8 max-[800px]:grid-cols-1"
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              id={`project-${proj.id}`}
              className="flex flex-col rounded-lg bg-surface-4 p-6 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_35px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-6 flex h-[200px] items-center justify-center overflow-hidden rounded-card border border-line bg-white p-2">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full rounded-lg object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="mb-[0.65rem] inline-block self-start rounded-full bg-line px-2.5 py-[0.2rem] text-[0.75rem] font-semibold text-[#4b5563]">
                  {proj.tag}
                </span>
                <h3 className="mb-2 font-display text-[1.15rem] font-bold text-ink">
                  {proj.title}
                </h3>
                <p className="text-[0.8125rem] leading-[1.6] text-body">{proj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
