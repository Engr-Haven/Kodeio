# Kodeio — Marketing Site

Single-page marketing website for **Kodeio**, a web design / development and
bootcamp company. The page sells two things: the agency's services, and its
training programmes.

> This README describes the site as it stands today. It is updated as pages
> and sections are added — see [Adding a page](#adding-a-page).

## Stack

| Concern | Choice |
| --- | --- |
| Build tool | Vite 8.3 |
| UI | React 18.3 (JSX, no TypeScript) |
| Styling | Tailwind CSS 4.3 via `@tailwindcss/vite` |
| Icons | lucide-react |
| Fonts | Bricolage Grotesque + Roboto, loaded from Google Fonts |

No router, no state library, no CSS-in-JS. There is no test runner and no
linter configured.

Developed against Node 22.x.

## Getting started

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build -> dist/
npm run preview  # serve the built output locally
```

`dist/` is generated — don't edit anything in it by hand.

## Page structure

Everything is one scrolling page. `src/App.jsx` composes it in order:

| Order | Component | Anchor id | Purpose |
| --- | --- | --- | --- |
| — | `Navbar` | — | Fixed header, logo, nav links, CTA |
| 1 | `Hero` | `#home` | Headline, sub-copy, dual CTA, five floating mockup images |
| 2 | `Services` | `#services` | Service offering cards |
| 3 | `Bootcamps` | `#courses` | Training programmes |
| 4 | `Portfolio` | `#portfolio` | "What We've Built" project grid |
| 5 | `FAQ` | `#faq` | Accordion, split by client / learner tabs |
| — | `Footer` | `#contact` | Contact details and the oversized wordmark |

The footer is not a `<main>` section — `#contact` is the anchor both the
header CTA and the hero CTAs scroll to.

## Design system

All tokens live in the `@theme` block in `src/index.css` and generate Tailwind
utilities automatically. There are no ad-hoc hex values in components; if you
need a colour, add a token rather than hardcoding it.

- **Colours** — `brand` purple `#7d2eff`, plus `ink`, `body`, `muted`, `line`
  neutrals and the `surface-*` scale. Generates `bg-brand`, `text-ink`, etc.
- **Type** — `--font-display` (Bricolage Grotesque) for headings, `--font-sans`
  (Roboto) for body copy. `h1`–`h6` pick up the display face automatically from
  the base layer, so most headings need no font utility at all.
- **Layout** — see the container note below.
- **Radii / shadows / animations** — `rounded-card`, `shadow-lift`,
  `animate-hero-float`, and friends.

### Container widths

| Class | Width | Used by |
| --- | --- | --- |
| `.shell` | 1128px | Every section, including the navbar |
| `.shell-narrow` | 1120px | The footer only |

> **Do not rename `.shell` to `.container`.** Tailwind 4 ships its own
> `.container` utility in the `utilities` layer, which outranks the
> `components` layer this file defines its classes in. Its responsive
> `max-width: 80rem` would silently win at viewports ≥1280px and pin the
> layout to the wrong width. The name is load-bearing.

### Scroll reveal

`src/hooks/useInView.js` adds a `reveal-visible` class the first time an
element scrolls into view, then disconnects. The transitions themselves are CSS
(`.reveal`, `.stagger`) in `src/index.css`.

`useInView()` returns `{ ref, visible }` — use `ref` for the class-driven
fade-up, and `visible` when you also need to fire a one-shot animation.

`.stagger` delays its first six children by 100ms each. If you add a seventh
staggered child it will not get a delay.

## Motion

- **Hero images float continuously** (`animate-hero-float`), never on hover.
  Each image gets its own duration and a negative `animation-delay` so they
  bob out of phase. Configured in the `FLOAT` map in `src/components/Hero.jsx`.
  **These class strings must stay complete literals** — Tailwind scans raw
  source text, so building them with string interpolation silently produces
  classes that are never generated.
- **Hero entrance bounce** is one-shot and replays on every entry into view.
- Infinite motion is disabled under `prefers-reduced-motion`. Short one-shot
  entrance animations are intentionally left in.

## Images

Images live in `public/` and are referenced by absolute path — there are no
import statements for them. The convention is a module-level object holding
`{ src, alt, width, height }`, consumed by a small render helper.

**Filenames with spaces must be URL-encoded** (`%20`):

```jsx
src: '/case%20study%20img.png'   // correct
src: '/case study img.png'       // 404
```

Always supply real `width` and `height` to prevent layout shift.

To swap the Portfolio images, edit the `image` field on each project object in
`src/components/Portfolio.jsx` — each card has its own value.

## Adding a page

For a new section on the existing page:

1. Create `src/components/YourSection.jsx`.
2. Give the root element a stable `id` and a `.shell` wrapper.
3. Import and render it in `src/App.jsx` in the position you want.
4. If it needs a nav entry, add a label/href to the `navLinks` array in
   `src/components/Navbar.jsx` — the `id` must match the section's `id`.
5. Reuse an existing hook: `useInView` for reveal, and your own `useState`
   for local UI state. Keep data as a module-level array at the top of the
   component, matching the other sections.

For a genuinely separate multi-page site, this project has no router yet. Add
`react-router-dom`, swap the flat composition in `App.jsx` for `<Routes>`, and
pull the navbar and footer out into a shared layout. Do this before the section
count grows much further — the current single-page structure does not scale
past roughly a dozen sections.

## Known gaps

- The nav has an **"about us" link to `#about`, but no section with that id
  exists** — the link is a dead anchor.
- All four Portfolio entries are identical placeholder copy ("FastAI - AI Design
  website"), and all four point at the same image.
- `LogoKodeio.svg` and `case study img.png` — the latter is now referenced, the
  former is still unused.
- Bricolage Grotesque tops out at weight 800, so `font-black` (900) in the
  footer wordmark renders as 800.
- No test, lint, or CI setup.
