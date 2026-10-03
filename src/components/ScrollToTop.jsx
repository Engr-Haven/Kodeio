import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating "back to top" control. Rendered once by Layout (see App.jsx), so it
 * exists on every route without any per-page wiring.
 *
 * It appears as the footer comes into view rather than at an arbitrary scroll
 * depth. The rootMargin gives a band of 45% of the viewport below the fold, so
 * the button is already there by the time you reach the footer instead of
 * popping in after it. The same observer hides it again on the way back up,
 * which is why there is no separate scroll listener to keep in sync.
 *
 * The footer it watches is `id="contact"` and also renders on every route.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('contact');
    if (!footer) return;

    // Fallback for the rare browser without IntersectionObserver: show the
    // button once the page is scrolled to the very bottom, which is at least
    // the case this control exists for.
    if (typeof IntersectionObserver === 'undefined') {
      const onScroll = () =>
        setVisible(
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
        );
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '0px 0px 45% 0px' }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 'instant', not 'auto': index.css sets scroll-behavior: smooth on <html>,
    // so 'auto' would inherit the animation we are trying to skip.
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <button
      type="button"
      id="scroll-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      // Kept mounted while hidden so it can fade, but taken out of the tab order
      // and the accessibility tree: a focusable aria-hidden control is a trap,
      // and an invisible-but-focusable one is worse.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-5 bottom-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-brand shadow-brand transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:shadow-brand-lg max-[640px]:right-4 max-[640px]:bottom-4 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp size={20} strokeWidth={2.2} />
    </button>
  );
}