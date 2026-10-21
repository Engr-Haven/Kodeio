import { useInView } from '../hooks/useInView';

/**
 * Scroll-reveal primitives.
 *
 * `.reveal` (the element itself) and `.stagger` (its children) both start at
 * opacity 0 and are released when the observer adds `reveal-visible`.
 *
 * THE TRAP: the class has to sit on the SAME element that carries the observer
 * ref. For `.stagger` that is the container, not the section heading next to
 * it — `.stagger > *` is what gets hidden, so a container without a ref keeps
 * its children invisible forever and the section renders as an empty gap.
 *
 * That bug shipped once on /contact (a `.stagger` grid with no ref, plus a
 * `.reveal` list with no ref) and left two whole sections invisible with no
 * error anywhere. Use these components instead of hand-writing the class, and
 * never put `.reveal` or `.stagger` on an element that has no ref.
 */

/**
 * Wraps a block in the site's standard scroll-reveal: the element carries
 * `.reveal` (opacity 0 -> 1) and the observer adds `reveal-visible` on the
 * first entry into view.
 *
 * `delay` staggers the fade for blocks that sit next to each other.
 */
export function Reveal({ children, className = '', delay = 0, threshold = 0.12 }) {
  const { ref } = useInView(threshold);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * `.stagger` hides its children until the container gets `reveal-visible`, so
 * the container itself needs the observer ref — without it the whole grid
 * stays at opacity 0. The container is deliberately NOT `.reveal`: the children
 * already carry the offset, and stacking `.reveal` on the container as well
 * would double the travel.
 */
export function Stagger({ children, className = '', threshold = 0.12 }) {
  const { ref } = useInView(threshold);
  return (
    <div ref={ref} className={`stagger ${className}`}>
      {children}
    </div>
  );
}
