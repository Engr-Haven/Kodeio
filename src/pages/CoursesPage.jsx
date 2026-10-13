import { Link } from 'react-router-dom';
import { Calendar, Video, ArrowRight, Download, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { courseList } from '../data/coursesData';

export default function CoursesPage() {
  const heroRef = useInView(0.1);
  const cardsRef = useInView(0.05);
  const bottomRef = useInView(0.1);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Courses Page Hero ── */}
      <section className="relative overflow-hidden pt-[115px] pb-14 text-center">
        {/* Subtle purple radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-brand opacity-[0.08] blur-[90px]"
        />

        <div className="shell">
          <div ref={heroRef.ref} className="reveal mx-auto max-w-[760px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface-2 px-4 py-1.5 text-xs font-semibold text-body shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Live Tech Bootcamps</span>
            </div>

            <h1 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink">
              Master In-Demand Tech Skills With Live Mentorship
            </h1>

            <p className="mx-auto mb-6 max-w-[680px] text-[0.9375rem] leading-[1.75] text-body">
              Courses are designed to help students build real-world projects, gain industry-ready
              skills, grow strong portfolios, and access internship opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* ── Courses Cards Grid ── */}
      <section className="py-12 bg-surface/40 border-t border-line-soft">
        <div className="shell">
          <div
            ref={cardsRef.ref}
            className="reveal grid grid-cols-3 gap-7 max-[960px]:grid-cols-1 max-[960px]:max-w-[540px] max-[960px]:mx-auto"
          >
            {courseList.map((course) => (
              <div
                key={course.slug}
                className="group flex flex-col rounded-2xl border border-line-soft bg-white p-7 transition-all duration-200 hover:-translate-y-1.5 hover:border-line hover:shadow-lift"
              >
                {/* Status Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-semibold text-body">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {course.tag}
                  </span>
                  <span className="text-xs font-bold text-brand bg-brand-muted px-2.5 py-1 rounded-full">
                    {course.duration}
                  </span>
                </div>

                {/* Course Title */}
                <h2 className="mb-3 font-display text-[1.28rem] font-bold text-ink group-hover:text-brand transition-colors">
                  {course.title}
                </h2>

                {/* Meta details */}
                <div className="mb-4 flex flex-col gap-1.5 text-xs text-body border-y border-line-soft py-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-muted" />
                    <span>{course.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video size={13} className="text-muted" />
                    <span>{course.mode}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 flex-1 text-[0.84rem] leading-[1.65] text-body line-clamp-4">
                  {course.sub}
                </p>

                {/* Curriculum Preview Highlight */}
                <div className="mb-7 rounded-xl bg-[#f5f5f7] p-3.5 text-xs text-ink-soft">
                  <span className="block font-bold text-ink mb-1.5 flex items-center gap-1">
                    <Sparkles size={12} className="text-brand" />
                    Curriculum Includes ({course.curriculum.length} Weeks):
                  </span>
                  <ul className="flex flex-col gap-1 text-[0.78rem] text-muted">
                    {course.curriculum.slice(0, 3).map((w) => (
                      <li key={w.week} className="truncate">
                        • {w.title}
                      </li>
                    ))}
                    {course.curriculum.length > 3 && (
                      <li className="text-brand font-semibold pt-0.5">
                        + {course.curriculum.length - 3} more modules
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex flex-col gap-2.5">
                  <Link
                    to={`/courses/${course.slug}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-brand transition-all duration-200 hover:bg-brand-dark hover:shadow-brand-lg"
                  >
                    <span>View Full Curriculum</span>
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-line bg-surface-2 px-5 py-2 text-xs font-semibold text-ink-soft transition-all duration-200 hover:border-brand hover:bg-brand-tint hover:text-brand"
                  >
                    Register / Join Cohort
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Call To Action ── */}
      <section className="py-20 bg-white">
        <div className="shell">
          <div
            ref={bottomRef.ref}
            className="reveal mx-auto flex max-w-[680px] flex-col items-center text-center"
          >
            <h3 className="mb-3 font-display text-[clamp(1.4rem,2.5vw,1.85rem)] font-bold text-ink">
              Start Your Journey Into Tech With Real Guidance
            </h3>
            <p className="mb-7 text-[0.9375rem] leading-[1.65] text-body">
              Whether you want to design, develop, or build client websites, Kodeio helps you learn
              practical skills through structured live cohort training.
            </p>
            <Link
              to="/contact"
              id="btn-download-curriculum"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#9657ff] bg-white px-7 py-[0.7rem] text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-px hover:border-brand hover:bg-brand-tint"
            >
              <Download size={15} strokeWidth={2} />
              Enquire About Cohorts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
