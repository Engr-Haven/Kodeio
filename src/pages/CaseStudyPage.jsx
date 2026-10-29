import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  CircleArrowRight,
  Compass,
  Heart,
  Layers,
  LayoutTemplate,
  Library,
  MapPin,
  MousePointerClick,
  PenTool,
  Play,
  RefreshCw,
  Search,
  Sparkles,
  Upload,
  Users,
  Wand2,
} from 'lucide-react';
import { Reveal, Stagger } from '../components/Reveal';
import ProjectGallery from '../components/ProjectGallery';
import ProjectImage from '../components/ProjectImage';
import NotFound from './NotFound';
import { getNextProject, portfolioData, portfolioList } from '../data/portfolioData';

const ICONS = {
  sparkles: Sparkles,
  wand: Wand2,
  layout: LayoutTemplate,
  upload: Upload,
  calendar: Calendar,
  refresh: RefreshCw,
  heart: Heart,
  users: Users,
  arrow: CircleArrowRight,
  library: Library,
  book: BookOpen,
  map: MapPin,
  search: Search,
  pen: PenTool,
  layers: Layers,
  check: CheckCircle2,
  click: MousePointerClick,
  compass: Compass,
  play: Play,
};

const PROCESS_ICONS = ['search', 'pen', 'layers', 'check'];
const JOURNEY_ICONS = ['click', 'compass', 'sparkles', 'wand'];

const TOTAL = String(portfolioList.length).padStart(2, '0');

function SectionLabel({ children, dark = false, className = '' }) {
  return (
    <p
      className={`mb-6 text-[0.68rem] font-bold uppercase tracking-[0.18em] ${
        dark ? 'text-[#cbb8ff]' : 'text-brand'
      } ${className}`}
    >
      {children}
    </p>
  );
}

function FeatureVisual({ icon }) {
  const Icon = ICONS[icon] || Sparkles;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#f5eafb]">
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-brand/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-brand/10 blur-2xl"
      />

      <div className="absolute inset-x-6 top-8 bottom-0 overflow-hidden rounded-t-xl border border-line bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
        <div className="flex h-9 items-center gap-1.5 border-b border-line-soft bg-surface-2 px-4">
          <span className="h-2 w-2 rounded-full bg-[#f2b2d7]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbc01]" />
          <span className="h-2 w-2 rounded-full bg-[#1bb15c]" />
          <span className="ml-3 h-1.5 w-24 rounded-full bg-line" />
        </div>

        <div className="p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-brand">
            <Icon size={22} strokeWidth={2} />
          </div>
          <div className="mb-3 h-2.5 w-2/3 rounded-full bg-surface-3" />
          <div className="mb-2 h-2 w-full rounded-full bg-surface-3" />
          <div className="mb-8 h-2 w-5/6 rounded-full bg-surface-3" />

          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 rounded-lg border border-line-soft bg-brand-tint" />
            <div className="h-16 rounded-lg border border-line-soft bg-surface-2" />
            <div className="h-16 rounded-lg border border-line-soft bg-surface-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureIntro({ feature, dark }) {
  const isGallery = feature.layout === 'gallery';
  const titleWidth = isGallery ? 'max-w-[640px]' : 'max-w-[420px]';
  const titleSize = isGallery
    ? 'text-[2.65rem] leading-[1.1]'
    : 'text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.16]';
  const bodyLayout = isGallery ? 'lg:pl-0 lg:pt-[85px]' : 'lg:pl-4 lg:pt-9';

  return (
    <div
      className={`grid gap-8 lg:gap-24 ${
        isGallery ? 'lg:grid-cols-[1.64fr_1fr]' : 'lg:grid-cols-[1fr_0.8fr]'
      }`}
    >
      <div>
        <span
          className={`text-[0.68rem] font-bold uppercase tracking-[0.18em] ${
            dark ? 'text-[#ff966e]' : 'text-[#ff5300]'
          }`}
        >
          {feature.eyebrow}
        </span>
        <h2
          className={`mt-1.5 ${titleWidth} font-display ${titleSize} font-extrabold tracking-[-0.025em] ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          {feature.title}
        </h2>
      </div>
      <p
        className={`max-w-[460px] text-[0.95rem] leading-[1.75] ${bodyLayout} ${
          dark ? 'text-white/70' : 'text-body'
        }`}
      >
        {feature.body}
      </p>
    </div>
  );
}

function FlowMock({ index }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-1.5 bg-white/65 p-2">
      <div className="flex items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-black/15" />
        <span className="h-1 w-1 rounded-full bg-black/15" />
        <span className="h-1 w-1 rounded-full bg-black/15" />
        <span className="ml-1 h-1 w-8 rounded-full bg-black/10" />
      </div>

      {index === 0 && (
        <div className="mt-1 grid flex-1 grid-cols-3 gap-1">
          <div className="rounded bg-[#7d2eff]/15" />
          <div className="rounded bg-black/5" />
          <div className="rounded bg-black/5" />
        </div>
      )}

      {index === 1 && (
        <div className="mt-1 flex flex-1 flex-col justify-center gap-1.5">
          <div className="h-1.5 w-4/5 rounded-full bg-black/15" />
          <div className="flex gap-1">
            <span className="h-2.5 w-8 rounded bg-[#ff5300]/20" />
            <span className="h-2.5 w-6 rounded bg-black/10" />
            <span className="h-2.5 w-7 rounded bg-black/10" />
          </div>
          <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
        </div>
      )}

      {index === 2 && (
        <div className="mt-1 grid flex-1 grid-cols-2 gap-1">
          <div className="rounded border border-black/5 bg-white/70" />
          <div className="rounded border border-[#7d2eff]/20 bg-[#7d2eff]/10" />
        </div>
      )}

      {index === 3 && (
        <div className="mt-1 flex flex-1 items-center gap-1.5">
          <div className="h-full flex-1 rounded bg-[#7d2eff]/15" />
          <div className="flex h-full w-1.5 flex-col justify-center gap-1">
            <span className="h-1 w-1 rounded-full bg-black/20" />
            <span className="h-1 w-1 rounded-full bg-black/10" />
          </div>
        </div>
      )}
    </div>
  );
}

function FlowStrip({ items }) {
  if (!items?.length) return null;

  return (
    <section className="pb-24">
      <div className="shell max-w-[1176px]">
        <Reveal className="rounded-2xl bg-[#181818] px-6 pt-5 pb-10">
          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {items.map((item, index) => (
              <div
                key={item.label}
                className="flex h-[199px] flex-col rounded-lg bg-[#f4f4f4] px-4 pt-12 pb-4"
              >
                <div
                  className={`relative mb-4 h-[100px] overflow-hidden rounded-md ${
                    item.tone === 'peach' ? 'bg-[#ffe2d4]' : 'bg-[#e7e7e7]'
                  }`}
                >
                  <FlowMock index={index} />
                </div>
                <p className="mt-auto text-[0.8rem] font-semibold leading-tight text-[#1e1e1e]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SolutionFeature({ feature, index }) {
  const layout = feature.layout || (feature.image ? 'split' : 'icon');
  const theme = feature.theme || 'white';
  const dark = theme === 'dark';
  const light = theme === 'light';

  const band = dark ? 'bg-[#181818]' : light ? 'bg-[#eceded]' : 'bg-white';

  if (layout === 'gallery') {
    return (
      <section className={`${band} pt-[6.5rem] pb-[5.5rem]`}>
        <div className="shell max-w-[1176px]">
          <Reveal>
            <FeatureIntro feature={feature} dark={dark} />
          </Reveal>

          <Stagger
            threshold={0.05}
            className="mt-3 grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1"
          >
            {feature.gallery.map((item) => (
              <div
                key={item.label}
                className="group relative aspect-[269/357] overflow-hidden rounded-xl bg-[#262626]"
              >
                <ProjectImage
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent"
                />
                <p className="absolute inset-x-4 bottom-4 text-[0.8rem] font-semibold text-white">
                  {item.label}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>
    );
  }

  if (layout === 'full') {
    return (
      <section className={`${band} pt-20 pb-20`}>
        <div className="shell max-w-[1176px]">
          <Reveal>
            <FeatureIntro feature={feature} dark={dark} />
          </Reveal>

          {feature.image && (
            <Reveal
              delay={80}
              className="mt-5 overflow-hidden rounded-2xl border border-black/5 bg-white"
            >
              <ProjectGallery
                images={feature.image}
                alt={`${feature.title} — ${feature.eyebrow}`}
                fit={feature.imageFit || 'cover'}
                className="aspect-[1128/640] w-full"
                imageClassName="aspect-[1128/640] w-full object-cover object-top"
              />
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  const imageLeft = feature.imageSide ? feature.imageSide === 'left' : index % 2 === 0;

  return (
    <section className={`${band} pt-24 pb-24 lg:pt-40`}>
      <div
        className={`shell max-w-[1176px] grid items-start gap-12 ${
          feature.image
            ? 'lg:grid-cols-[minmax(0,720px)_minmax(0,276px)] lg:justify-between lg:gap-0'
            : 'lg:grid-cols-2 lg:gap-16'
        }`}
      >
        <Reveal className={imageLeft ? 'lg:order-1' : 'lg:order-2'} delay={80}>
          {feature.image ? (
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
              <ProjectGallery
                images={feature.image}
                alt={`${feature.title} — ${feature.eyebrow}`}
                fit={feature.imageFit || 'cover'}
                className="aspect-[720/517] w-full"
                imageClassName="aspect-[720/517] w-full rounded-xl object-cover object-top"
              />
            </div>
          ) : (
            <FeatureVisual icon={feature.icon} />
          )}
        </Reveal>

        <Reveal className={imageLeft ? 'lg:order-2 lg:pt-3' : 'lg:order-1 lg:pt-3'}>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#ff5300]">
            {feature.eyebrow}
          </span>
          <h2 className="mt-8 font-display text-[1.55rem] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink">
            {feature.title}
          </h2>
          <p className="mt-3 text-[0.9rem] leading-[1.7] text-body">{feature.body}</p>

          {feature.points?.length > 0 && (
            <div className="mt-8 flex flex-col gap-10">
              {feature.points.map((point) => (
                <div key={point.title}>
                  <h3 className="font-display text-[1rem] font-bold text-ink">{point.title}</h3>
                  <p className="mt-4 text-[0.84rem] leading-[1.75] text-body">{point.body}</p>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function OutcomeCard({ stat }) {
  return (
    <div className="flex min-h-[236px] flex-col rounded-2xl bg-[#f5f5f5] p-7">
      <p className="font-display text-[2.2rem] font-extrabold leading-none tracking-[-0.03em] text-brand">
        {stat.value}
      </p>
      <p className="mt-auto pt-10 text-sm font-bold leading-snug text-ink">{stat.label}</p>
      {stat.note && <p className="mt-1.5 text-xs leading-relaxed text-muted">{stat.note}</p>}
    </div>
  );
}

export default function CaseStudyPage() {
  const { projectId } = useParams();
  const project = projectId ? portfolioData[projectId] : null;

  if (!project) return <NotFound />;

  const next = getNextProject(project.slug);
  const nextName = next.cardTitle?.split('—')[0].trim() || next.cardTitle;
  const { overview, challenge, process, journey, solution, outcomes, learnings } = project;

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-[150px] pb-20 sm:pt-[166px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-brand opacity-[0.05] blur-[100px]"
        />

        <div className="shell max-w-[1176px]">
          <Reveal threshold={0.05}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full bg-[#f5eafb] px-3 py-1.5 text-[0.7rem] font-semibold text-brand"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#a0a0a0]">
                Case study {project.number} / {TOTAL}
              </p>
            </div>

            <h1 className="mt-6 max-w-[1000px] font-display text-[clamp(2.5rem,4.6vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink">
              {project.title}
            </h1>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-10">
              <div>
                <p className="max-w-[640px] text-[1.2rem] leading-[1.6] text-body">
                  {project.summary}
                </p>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand-lg"
                  >
                    Visit live site
                    <ArrowUpRight size={15} strokeWidth={2.2} />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-3 gap-5 lg:pt-8">
                {project.meta.map((item) => (
                  <div key={item.label}>
                    <p className="mb-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#a0a0a0]">
                      {item.label}
                    </p>
                    <p className="font-display text-[0.95rem] font-bold leading-snug text-ink">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={100}
            className="mt-14 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
          >
            <ProjectGallery
              images={project.heroImages || project.heroImage}
              alt={`${project.title} hero`}
              loading="eager"
              fit={project.heroImageFit || 'cover'}
              className="aspect-[1128/650] w-full"
              imageClassName="aspect-[1128/650] w-full object-cover object-top"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="pt-32 pb-[105px]">
        <div className="shell max-w-[1176px] grid gap-12 lg:grid-cols-2 lg:gap-0">
          <Reveal>
            <SectionLabel>Project overview</SectionLabel>
            <h2 className="-mt-2.5 max-w-[440px] font-display text-[clamp(1.8rem,2.9vw,2.6rem)] font-extrabold leading-[1.39] tracking-[-0.025em] text-ink">
              {overview.heading}
            </h2>
            <p className="mt-4 max-w-[450px] text-[0.95rem] leading-[1.75] text-body">
              {overview.body}
            </p>

            <div className="mt-9 flex flex-wrap gap-2">
              {overview.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.72rem] font-semibold text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Stagger threshold={0.08} className="flex flex-col gap-14 lg:pt-8">
            {overview.steps.map((step) => (
              <div key={step.number} className="grid grid-cols-[20px_1fr] gap-11">
                <span className="pt-0.5 font-display text-[0.72rem] font-bold text-brand">
                  {step.number}
                </span>
                <div>
                  <h3 className="mb-4 font-display text-[1rem] font-bold text-ink">{step.title}</h3>
                  <p className="text-[0.875rem] leading-[1.65] text-body">{step.body}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Challenge ── */}
      <section className="bg-[#181818] pt-20 pb-24 text-white">
        <div className="shell max-w-[1176px]">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_490px] lg:gap-16">
            <div>
              <SectionLabel dark>The challenge</SectionLabel>
              <h2 className="max-w-[560px] font-display text-[clamp(1.8rem,2.9vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white">
                {challenge.heading}
              </h2>
              <p className="mt-8 max-w-[540px] text-[0.95rem] leading-[1.75] text-white/70">
                {challenge.body}
              </p>

              {challenge.question && (
                <div className="mt-8 max-w-[580px] border-l-2 border-brand pl-9">
                  <p className="font-display text-[0.95rem] font-bold leading-[1.45] text-white">
                    {challenge.question}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-[18px] lg:pt-2">
              {challenge.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="grid min-h-[74px] grid-cols-[100px_1fr] items-center gap-4 rounded-xl bg-[#242424] px-6 py-4"
                >
                  <p className="font-display text-[1.7rem] font-extrabold leading-none tracking-[-0.02em] text-white">
                    {stat.value}
                  </p>
                  <p className="text-[0.82rem] leading-[1.35] text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="mt-20 rounded-2xl bg-[#fff1ea] px-11 pt-24 pb-12 text-[#1e1e1e]"
          >
            <p className="max-w-[1000px] font-display text-[clamp(1.15rem,1.7vw,1.5rem)] font-bold leading-[1.4] tracking-[-0.01em] text-[#1e1e1e]">
              {challenge.principle}
            </p>
            <p className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#1e1e1e]/50">
              Core product principle • Defined after discovery synthesis
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="pt-28 pb-14">
        <div className="shell max-w-[1176px]">
          <Reveal>
            <SectionLabel>Process</SectionLabel>
            <h2 className="-mt-2 max-w-[560px] font-display text-[clamp(1.8rem,2.9vw,2.6rem)] font-extrabold leading-[1.3] tracking-[-0.025em] text-ink">
              {process.heading}
            </h2>
            <p className="mt-6 max-w-[720px] text-[0.95rem] leading-[1.75] text-body">
              {process.body}
            </p>
          </Reveal>

          <Stagger
            threshold={0.05}
            className="mt-21 grid grid-cols-4 gap-6 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1"
          >
            {process.steps.map((step, index) => {
              const Icon =
                ICONS[step.icon] || ICONS[PROCESS_ICONS[index % PROCESS_ICONS.length]] || Sparkles;

              return (
                <div
                  key={step.number}
                  className="flex min-h-[282px] flex-col rounded-2xl bg-[#f5f5f5] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-[0.7rem] font-bold text-brand">
                      {step.number}
                    </span>
                    <Icon size={18} strokeWidth={1.8} className="text-brand" />
                  </div>
                  <h3 className="mt-8 font-display text-[1.05rem] font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.82rem] leading-[1.65] text-body">{step.body}</p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ── Journey ── */}
      <section className="pb-16">
        <div className="shell max-w-[1176px] grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal className="rounded-2xl bg-[#eceded] px-8 pt-8 pb-24">
            <SectionLabel>{journey.label || 'The journey'}</SectionLabel>

            <Stagger
              threshold={0.05}
              className="mt-17 grid grid-cols-4 gap-0 rounded-xl bg-white px-3 py-3 max-[760px]:grid-cols-2 max-[760px]:gap-y-4 max-[760px]:px-4"
            >
              {journey.steps.map((step, index) => {
                const Icon =
                  ICONS[step.icon] ||
                  ICONS[JOURNEY_ICONS[index % JOURNEY_ICONS.length]] ||
                  Sparkles;
                const highlight = index === 1;

                return (
                  <div key={step.title} className="relative px-3 py-3">
                    {highlight && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 inset-x-1 rounded-xl bg-[#fff1ea]"
                      />
                    )}
                    <div className="relative flex h-full flex-col">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                          highlight ? 'text-[#ff5300]' : 'bg-[#f5eafb] text-brand'
                        }`}
                      >
                        <Icon size={20} strokeWidth={2} />
                      </span>
                      <span
                        aria-hidden="true"
                        className="my-4 h-12 w-px bg-line-soft max-[760px]:hidden"
                      />
                      <h3 className="mt-auto font-display text-[0.95rem] font-bold text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[0.78rem] leading-[1.55] text-body">{step.body}</p>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </Reveal>

          {journey.insights?.length > 0 && (
            <Reveal delay={100} className="lg:pt-9">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink">
                What shaped the experience
              </p>
              <div className="mt-12 flex flex-col gap-5 pl-7">
                {journey.insights.map((insight) => (
                  <div key={insight.title}>
                    <h3 className="mb-4 font-display text-[0.92rem] font-bold text-ink">
                      {insight.title}
                    </h3>
                    <p className="text-[0.8rem] leading-[1.65] text-body">{insight.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <FlowStrip items={project.flow} />

      {/* ── Solution ── */}
      <section className="pt-32 pb-16">
        <div className="shell max-w-[1176px]">
          <Reveal className="grid gap-8 lg:grid-cols-[1.49fr_0.51fr] lg:items-end">
            <div className="max-w-[760px]">
              <SectionLabel>The solution</SectionLabel>
              <h2 className="max-w-[600px] font-display text-[clamp(1.8rem,2.9vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink">
                {solution.heading}
              </h2>
              <p className="mt-8 max-w-[700px] text-[0.95rem] leading-[1.75] text-body">
                {solution.body}
              </p>
            </div>
            {solution.note && (
              <p className="max-w-[180px] text-[0.82rem] leading-[1.7] text-[#8f8f8f] lg:-ml-2 lg:pb-1">
                {solution.note}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {solution.features.map((feature, index) => (
        <SolutionFeature key={feature.title} feature={feature} index={index} />
      ))}

      {/* ── Motion / video ── */}
      {project.video && (
        <section className="py-20">
          <div className="shell max-w-[1176px]">
            <Reveal className="grid gap-8 rounded-3xl border border-line bg-surface-2 p-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-8">
              <div>
                <SectionLabel>Motion</SectionLabel>
                <h2 className="mb-4 max-w-[360px] font-display text-[clamp(1.55rem,2.9vw,2.05rem)] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink">
                  {project.video.heading}
                </h2>
                <p className="max-w-[420px] text-[0.9rem] leading-[1.75] text-body">
                  {project.video.body}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-line bg-black p-2 shadow-lift">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={project.video.poster}
                  aria-label={project.video.heading}
                  className="w-full rounded-xl"
                >
                  <source src={project.video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Outcomes ── */}
      <section className="pt-28 pb-14">
        <div className="shell max-w-[1176px]">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <SectionLabel>Outcomes</SectionLabel>
              <h2 className="max-w-[590px] font-display text-[clamp(1.8rem,2.9vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink">
                {outcomes.heading}
              </h2>
              <p className="mt-8 max-w-[740px] text-[0.95rem] leading-[1.75] text-body">
                {outcomes.body}
              </p>
            </div>
            {outcomes.note && (
              <p className="max-w-[280px] text-[0.78rem] leading-[1.7] text-[#8f8f8f] lg:mt-36 lg:mr-5">
                {outcomes.note}
              </p>
            )}
          </Reveal>

          <Stagger
            threshold={0.05}
            className="mt-16 grid grid-cols-3 gap-6 max-[860px]:grid-cols-1"
          >
            {outcomes.stats.map((stat) => (
              <OutcomeCard key={stat.label} stat={stat} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Learnings ── */}
      <section className="pt-4 pb-22">
        <div className="shell max-w-[1176px] grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <Reveal>
            <SectionLabel>What I learned</SectionLabel>
            <h2 className="-mt-3 max-w-[360px] font-display text-[clamp(1.8rem,2.9vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink">
              {learnings.heading}
            </h2>
          </Reveal>

          <Stagger threshold={0.05} className="flex flex-col gap-12 lg:pt-7">
            {learnings.items.map((item) => (
              <div key={item.number} className="grid grid-cols-[auto_1fr] gap-9">
                <span className="pt-0.5 font-display text-[0.72rem] font-bold text-brand">
                  {item.number}
                </span>
                <div>
                  <h3 className="mb-4 font-display text-[1rem] font-bold text-ink">{item.title}</h3>
                  <p className="text-[0.875rem] leading-[1.65] text-body">{item.body}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Reflection ── */}
      {project.reflection && (
        <section className="pb-24">
          <div className="shell max-w-[1176px]">
            <Reveal className="rounded-2xl bg-[#fff1ea] px-11 pt-24 pb-12 text-[#1e1e1e]">
              <blockquote className="max-w-[1000px] font-display text-[clamp(1.3rem,2.2vw,1.85rem)] font-bold leading-[1.38] tracking-[-0.02em] text-[#1e1e1e]">
                “{project.reflection.quote}”
              </blockquote>
              <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#1e1e1e]/50">
                {project.reflection.label}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Next project ── */}
      <section className="bg-[#eceded] pt-24 pb-24">
        <div className="shell max-w-[1176px]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-[700px]">
                <SectionLabel>Continue exploring</SectionLabel>
                <h2 className="max-w-[640px] font-display text-[clamp(1.8rem,2.9vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink">
                  Next project — {nextName}
                </h2>
                <p className="mt-6 max-w-[700px] text-[0.95rem] leading-[1.75] text-body">
                  {next.tagline}
                </p>
              </div>

              <Link
                to={`/portfolio/${next.slug}`}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand-lg"
              >
                View next project
                <ArrowRight
                  size={15}
                  strokeWidth={2.2}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <Link
              to={`/portfolio/${next.slug}`}
              className="mt-12 block overflow-hidden rounded-2xl border border-black/5 bg-white"
            >
              <ProjectGallery
                images={next.cardImage}
                alt={`${next.cardTitle} project preview`}
                fit="cover"
                className="aspect-[1128/320] w-full"
                imageClassName="aspect-[1128/320] w-full object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
