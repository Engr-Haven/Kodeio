import { Clock, Users, Download } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const courses = [
  {
    id: 'uiux',
    status: 'Live Tech Bootcamps',
    statusType: 'active',
    title: 'UI/UX Design Track',
    duration: '12 Weeks',
    slots: '30 slots',
    description:
      'Learn how to design modern websites, mobile apps, and digital products through practical live classes, design challenges, and real client-style projects while leveraging on AI.',
    price: '₦20,000',
    btnVariant: 'primary',
  },
  {
    id: 'wordpress',
    status: 'Coming soon',
    statusType: 'upcoming',
    title: 'WordPress Development',
    duration: '4 - 6 Weeks',
    slots: '30 slots',
    description:
      'Create business sites, portfolios, and stores with WordPress, no coding required. Setup, customization, plugins, themes, SEO basics, launch confidence.',
    price: '₦20,000',
    btnVariant: 'neutral',
  },
  {
    id: 'frontend',
    status: 'Live Tech Bootcamps',
    statusType: 'active',
    title: 'Frontend Development',
    duration: '10 - 14 Weeks',
    slots: '30 slots',
    description:
      'Learn HTML, CSS, JavaScript, React, and modern workflows to build responsive websites. Responsive sites, React fundamentals, interactive interfaces, deployment.',
    price: '₦20,000',
    btnVariant: 'primary',
  },
];

export default function Bootcamps() {
  const head = useInView();
  const cards = useInView();
  const bottom = useInView();

  return (
    <section id="courses" className="bg-white pt-20 pb-24">
      <div className="shell">
        <div ref={head.ref} className="reveal mb-14 max-w-[780px]">
          <h2 className="mb-3 font-display text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold tracking-[-0.02em] text-ink">
            Live Tech Bootcamps
          </h2>
          <p className="text-[0.95rem] leading-[1.65] text-body">
            Courses are designed to help students build real-world projects, gain industry-ready
            skills, grow strong portfolios, and access internship opportunities.
          </p>
        </div>

        <div
          ref={cards.ref}
          className="reveal mb-[5.5rem] grid grid-cols-3 gap-7 max-[900px]:mx-auto max-[900px]:mb-16 max-[900px]:max-w-[500px] max-[900px]:grid-cols-1"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              id={`course-${course.id}`}
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
                {course.title}
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
                  className={`inline-flex items-center justify-center rounded-lg px-5 py-[0.55rem] text-[0.8125rem] font-semibold transition-all duration-200 ${
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
        </div>

        <div ref={bottom.ref} className="reveal mx-auto flex max-w-[680px] flex-col items-center text-center">
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
        </div>
      </div>
    </section>
  );
}
