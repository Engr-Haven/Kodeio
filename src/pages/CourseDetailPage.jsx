import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Video, ChevronUp, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import NotFound from './NotFound';
import { coursesData, courseList } from '../data/coursesData';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const course = courseId ? coursesData[courseId] : null;

  // Default all curriculum weeks to open, matching Courses-1, 2, 3 mockups
  const [openWeeks, setOpenWeeks] = useState(() => {
    if (!course) return {};
    const initial = {};
    course.curriculum.forEach((_, idx) => {
      initial[idx] = true;
    });
    return initial;
  });

  if (!course) return <NotFound />;

  const toggleWeek = (idx) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const areAllExpanded = course.curriculum.every((_, idx) => openWeeks[idx]);

  const toggleAll = () => {
    const nextState = !areAllExpanded;
    const updated = {};
    course.curriculum.forEach((_, idx) => {
      updated[idx] = nextState;
    });
    setOpenWeeks(updated);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── Sub-page Hero Section ── */}
      <section className="relative overflow-hidden pt-[115px] pb-12 text-center">
        {/* Subtle purple radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-brand opacity-[0.08] blur-[90px]"
        />

        <div className="shell">
          <Reveal threshold={0.1} className="mx-auto max-w-[760px]">
            {/* Live Cohort Learning Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface-2 px-4 py-1.5 text-xs font-semibold text-body shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{course.tag}</span>
            </div>

            {/* Course Title */}
            <h1 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink">
              {course.headline}
            </h1>

            {/* Course Subtitle */}
            <p className="mx-auto mb-7 max-w-[680px] text-[0.9375rem] leading-[1.75] text-body">
              {course.sub}
            </p>

            {/* Metadata Pill Bar */}
            <div className="mx-auto mb-8 inline-flex flex-wrap items-center justify-center gap-3.5 rounded-full border border-line bg-surface-2 px-5 py-2 text-xs md:text-sm text-body shadow-sm">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock size={15} className="text-muted" strokeWidth={1.75} />
                <span>Duration: {course.duration}</span>
              </span>
              <span className="text-line-soft">|</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Calendar size={15} className="text-muted" strokeWidth={1.75} />
                <span>{course.startDate}</span>
              </span>
              <span className="text-line-soft">|</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Video size={15} className="text-muted" strokeWidth={1.75} />
                <span>{course.mode}</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-7 py-2.5 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand-lg"
              >
                Register Now
              </Link>
              <a
                href="#curriculum"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand bg-white px-7 py-2.5 text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-tint"
              >
                Download Curriculum
              </a>
            </div>

            {/* Quick Switcher Between All Bootcamps */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-line-soft/80">
              <span className="w-full text-[0.72rem] font-bold uppercase tracking-wider text-muted mb-1">
                Explore Tracks:
              </span>
              {courseList.map((item) => {
                const isActive = item.slug === course.slug;
                return (
                  <Link
                    key={item.slug}
                    to={`/courses/${item.slug}`}
                    className={`rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-brand text-white shadow-brand'
                        : 'border border-line bg-white text-ink-soft hover:border-brand/50 hover:bg-brand-tint hover:text-brand'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Curriculum / Weeks Section ── */}
      <section id="curriculum" className="py-14 bg-surface/40 border-t border-line-soft">
        <div className="shell">
          <Reveal threshold={0.05}>
            <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">
              <h2 className="font-display text-[clamp(1.4rem,3vw,1.95rem)] font-bold tracking-[-0.02em] text-ink">
                {course.curriculumTitle}
              </h2>
              <button
                type="button"
                onClick={toggleAll}
                className="text-xs font-semibold text-brand hover:underline cursor-pointer"
              >
                {areAllExpanded ? 'Collapse All Weeks' : 'Expand All Weeks'}
              </button>
            </div>

            <div className="mx-auto flex max-w-[840px] flex-col gap-3.5">
              {course.curriculum.map((item, idx) => {
                const isOpen = openWeeks[idx] ?? true;
                return (
                  <div
                    key={item.week + item.title}
                    className="overflow-hidden rounded-2xl border border-line-soft/80 bg-[#f5f5f7] transition-all duration-200 hover:border-line hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggleWeek(idx)}
                      className="flex w-full cursor-pointer items-start sm:items-center justify-between gap-4 p-5 sm:p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0 flex-1">
                        <span className="font-display text-xl sm:text-2xl font-bold text-[#8e8e93] w-8 shrink-0 pt-0.5 sm:pt-0">
                          {item.week}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-[0.98rem] sm:text-[1.08rem] font-bold text-ink leading-snug">
                            {item.title}
                          </h3>
                          {isOpen && (
                            <p className="mt-2 text-xs sm:text-[0.875rem] leading-[1.65] text-body">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>

                      <div
                        className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#71717a] text-white shadow-sm transition-transform duration-200 ${
                          isOpen ? 'rotate-0' : 'rotate-180 bg-[#52525b]'
                        }`}
                        title={isOpen ? 'Collapse' : 'Expand'}
                      >
                        <ChevronUp size={18} strokeWidth={2.4} />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Bottom Call To Action Banner ── */}
      <section className="py-20 bg-white">
        <div className="shell">
          <Reveal threshold={0.1}>
            <div className="mx-auto max-w-[760px] rounded-3xl bg-brand-muted/70 px-8 py-12 text-center border border-brand/15 sm:px-12">
              <h2 className="mb-4 font-display text-[clamp(1.3rem,2.8vw,1.75rem)] font-bold text-ink">
                Ready to Accelerate Your Career with Kodeio?
              </h2>
              <p className="mx-auto mb-8 max-w-[600px] text-[0.9375rem] leading-[1.75] text-body">
                Join our next live cohort and learn directly from industry professionals with
                hands-on projects and career mentorship.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand-lg"
                >
                  <span>Register for Bootcamp</span>
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  <span>All Bootcamps</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
