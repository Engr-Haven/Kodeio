import { useEffect, useRef, useState } from 'react';

/**
 * Adds the `reveal-visible` class to the element once it scrolls into view.
 * Returns the ref plus the boolean, so callers can also drive
 * one-shot animations off the same trigger.
 *
 * @param threshold  Fraction of the element that must be visible to trigger.
 * @param repeat     Keep observing after the first entry instead of
 *                   disconnecting, for animations that replay on every visit.
 * @param onEnter    Called on every qualifying entry. Read through a ref so an
 *                   inline arrow does not tear down and rebuild the observer.
 */
export function useInView(threshold = 0.15, { repeat = false, onEnter } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const onEnterRef = useRef(onEnter);

  useEffect(() => {
    onEnterRef.current = onEnter;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('reveal-visible');
        setVisible(true);
        onEnterRef.current?.();
        if (!repeat) observer.disconnect();
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  return { ref, visible };
}