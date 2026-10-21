import { Link } from 'react-router-dom';
import { Clock, Users, Download } from 'lucide-react';
import { Reveal } from './Reveal';
import { courseList } from '../data/coursesData';

// Card title, duration and description come from coursesData (the single source
// of truth for courses), so the home-page cards can never drift from the
// /courses pages. Only the presentation extras that the course data has no
// concept of live here, keyed by slug.
const CARD_EXTRAS = {
  'product-ui-ux-design': {
    status: 'Live Tech Bootcamps',
    statusType: 'active',
    slots: '30 slots',
    price: '₦20,000',
    btnVariant: 'primary',
  },
  'wordpress-website-design': {
    status: 'Coming soon',
    statusType: 'upcoming',
    slots: '30 slots',
    price: '₦20,000',
    btnVariant: 'neutral',
  },
  'frontend-development': {
    status: 'Live Tech Bootcamps',
    statusType: 'active',
    slots: '30 slots',
    price: '₦20,000',
    btnVariant: 'primary',
  },
};

const courses = courseList.map((course) => ({
  slug: course.slug,
  title: course.title,
  duration: course.duration,
  description: course.sub,
  ...CARD_EXTRAS[course.slug],
}));

export default function Bootcamps() {
  return (
    <section id="courses" className="bg-white pt-20 pb-24">
      <div className="shell">
        <Reveal className="mb-14 max-w-[780px]">
          <h2 className="mb-3 font-display text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold tracking-[-0.02em] text-ink">
            Live Tech Bootcamps
          </h2>
          <p className="text-[0.95rem] leading-[1.65] text-body">
            Courses are designed to help students build real-world projects, gain industry-ready
            skills, grow strong portfolios, and access internship opportunities.
          </p>
        </Reveal>

        <Reveal className="mb-[5.5rem] grid grid-cols-3 gap-7 max-[900px]:mx-auto max-[900px]:mb-16 max-[900px]:max-w-[500px] max-[900px]:grid-cols-1">
          {courses.map((course) => (
            <div
              key={course.slug}
              id={`course-${course.slug}`}
              className="flex flex-col rounded-lg border border-line-soft bg-surface p-7 transition-all duration-200 hover:-translate-y-[3px] hover:border-line hover:shadow-lift"
            >
              <div className="mb-5">
                <span
                  className={`inline-flex items-center gap-[0.45rem] rounded-full border border-line bg-white px-[0.65rem] py-1 text-xs font-semibold ${
                    course.statusType === 'active' ? 'text-body' : 'text-muted'
                  }`}
                >
                  <span
                    className={`h-[7px] w-[7px] rounded-full ${
                      course.statusType === 'active' ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                  {course.status}
                </span>
              </div>

              <h3 className="mb-[0.65rem] font-display text-[1.15rem] font-bold text-ink">
                <Link to={`/courses/${course.slug}`} className="hover:text-brand transition-colors">
                  {course.title}
                </Link>
              </h3>

              <div className="mb-4 flex items-center gap-[0.6rem] text-[0.78rem] text-body">
                <span className="flex items-center gap-[0.35rem]">
                  <Clock size={14} strokeWidth={1.5} />
                  {course.duration}
                </span>
                <span className="text-[#d1d5db]">|</span>
                <span className="flex items-center gap-[0.35rem]">
                  <Users size={14} strokeWidth={1.5} />
                  {course.slots}
                </span>
              </div>

              <p className="mb-8 flex-1 text-[0.8125rem] leading-[1.6] text-body">
                {course.description}
              </p>

              <div className="flex items-center justify-between border-t border-line pt-5">
                <span className="font-sans text-[1.0625rem] font-extrabold text-ink">
                  {course.price}
                </span>
                <a
                  href="#contact"
                  className={`inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-[0.55rem] text-[0.8125rem] font-semibold transition-all duration-200 ${
                    course.btnVariant === 'primary'
                      ? 'bg-brand text-white hover:bg-brand-dark'
                      : 'cursor-default bg-[#d1d5db] text-[#4b5563]'
                  }`}
                >
                  Join Cohort
                </a>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <h3 className="mb-3 font-display text-[clamp(1.4rem,2.5vw,1.85rem)] font-bold text-ink">
            Start Your Journey Into Tech With Real Guidance
          </h3>
          <p className="mb-7 text-[0.9375rem] leading-[1.65] text-body">
            Whether you want to design, develop, or build client websites, Kodeio helps you learn
            practical skills through structured live cohort training.
          </p>
          <a
            href="#contact"
            id="btn-download-curriculum"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#9657ff] bg-white px-7 py-[0.7rem] text-sm font-semibold text-brand transition-all duration-200 hover:-translate-y-px hover:border-brand hover:bg-brand-tint"
          >
            <Download size={15} strokeWidth={2} />
            Download Curriculum
          </a>
        </Reveal>
      </div>
    </section>
  );
}
