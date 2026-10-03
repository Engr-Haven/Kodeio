import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PRIMARY =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-[0.9375rem] font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark hover:shadow-brand-lg';

const OUTLINE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-[1.5px] border-brand bg-white px-7 py-[0.72rem] text-[0.9375rem] font-semibold text-brand transition-all duration-200 hover:-translate-y-px hover:bg-brand-tint';

/**
 * Shared shell for pages that are linked from the nav and footer but whose
 * content has not been written yet.
 *
 * Every page here is a real route, so nothing in the nav or footer is a dead
 * anchor. Each one renders an honest notice plus links to whatever already
 * works, rather than placeholder prose or invented numbers.
 *
 * Replace a page's contents with the finished design when it is ready — nothing
 * outside `src/pages/` needs to change. See `src/App.jsx` for the route list.
 *
 * @param title   Page heading, also used for the document title.
 * @param lede    One honest sentence about the page's status.
 * @param actions Optional CTAs. `variant` is "primary" (default) or "outline".
 *                `arrow` adds the trailing chevron.
 */
export default function PlaceholderPage({ title, lede, actions = [] }) {
  return (
    <main className="flex min-h-screen items-center bg-white pt-[105px] pb-24">
      <div className="shell flex w-full flex-col items-center text-center">
        <h1 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)] font-extrabold tracking-[-0.03em] text-ink">
          {title}
        </h1>

        <p className="mb-9 max-w-[620px] text-[0.9375rem] leading-[1.75] text-body">{lede}</p>

        {actions.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {actions.map(({ label, to, variant = 'primary', arrow = false }) => (
              <Link key={label} to={to} className={variant === 'outline' ? OUTLINE : PRIMARY}>
                {label}
                {arrow && <ArrowRight size={15} strokeWidth={2.2} />}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}