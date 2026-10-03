# Kodeio — Marketing Site

Marketing website for **Kodeio**, a web design / development and bootcamp
company. It sells two things: the agency's services, and its training
programmes.

## Stack

| Concern | Choice |
| --- | --- |
| Build tool | Vite 8.3 |
| UI | React 18.3 (JSX, no TypeScript) |
| Routing | react-router-dom 7 (`BrowserRouter`) |
| Styling | Tailwind CSS 4.3 via `@tailwindcss/vite` |
| Icons | lucide-react |
| Fonts | Bricolage Grotesque + Roboto, loaded from Google Fonts |

No state library, no CSS-in-JS. There is no test runner and no linter
configured. Developed against Node 22.x.

## Getting started

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build -> dist/
npm run preview  # serve the built output locally
```

`dist/` is generated — don't edit anything in it by hand.

## Routes

| Path | Renders |
| --- | --- |
| `/` | `HomePage` — Hero, Services, Bootcamps, Portfolio, FAQ |
| `/about` | `AboutPage` — **placeholder, content still to be written** |
| `/courses` | `CoursesPage` — **placeholder, content still to be written** |
| `/portfolio` | `PortfolioPage` — **placeholder, content still to be written** |
| `/contact` | `ContactPage` — real contact details, **enquiry form still to be built** |
| `/services` | Redirects to `/services/web-development` |
| `/services/:serviceId` | `ServiceDetailPage` — hero, pricing, FAQ, CTA |
| anything else | `NotFound` |

`serviceId` is a key of `servicesData`. An unknown slug renders the 404 page
rather than falling back to a default service.

## Chrome

`Layout` (in `src/App.jsx`) renders the shared chrome for every route: `Navbar`,
the page, `Footer`, and `ScrollToTop`. Anything that must appear on all pages
belongs here rather than in a page component.

`ScrollToTop` is a floating back-to-top control. It appears as the footer comes
into view — a `rootMargin` of 45% of the viewport means it is already there
"almost at" the footer instead of popping in after it, and the same observer
hides it again on the way up. It watches the footer's `id="contact"`, which also
renders on every route.

It is styled light rather than brand-purple on purpose: it is only visible once
the purple footer is on screen, so a white button with a purple arrow is the
contrast-safe choice. It also respects `prefers-reduced-motion` by scrolling with
`behavior: 'instant'` — `'auto'` would inherit the `scroll-behavior: smooth` set
on `<html>` in `index.css`, which is the opposite of what is wanted there.

## Placeholder pages

`/about`, `/courses` and `/portfolio` exist as real routes so the navbar and
footer links resolve to something today instead of being dead anchors. Each one
renders an honest "on its way" notice plus links to whatever already works —
there is no placeholder prose or invented copy. Replace a page's contents when
it is ready; nothing outside `src/pages/` needs to change.

The three share `src/components/PlaceholderPage.jsx`, which takes `title`, `lede`
and an `actions` array. Add a fourth by copying one of the pages — it is a few
lines.

`/contact` is more than a stub: it shows the email, phone numbers and socials
from `src/data/site.js`, which the footer also reads, so the two cannot drift
apart. Only the enquiry form is missing.

`/#faq` is the one remaining home-section link in the nav or footer. It needs the
leading `/` because the footer renders on every route and that id only exists on
the home page.

### The `Layout` route

`src/App.jsx` wraps every route in a `<Route element={<Layout />}>`, which owns
the shared chrome (`Navbar`, `Footer`) plus the two pieces of state that must not
survive a navigation:

- **Scroll offset.** Reset on every `pathname` change, with
  `behavior: 'instant'`. This is load-bearing: `index.css` sets
  `scroll-behavior: smooth` on `<html>`, which a bare `scrollTo()` would inherit
  and animate, so you would watch the page slide up on every route change.
- **`document.title`.** Set to `"<Service> | Kodeio Technologies"` on a service
  page and back to the site default everywhere else.

A new page therefore cannot forget to reset either. Put pages in `src/pages/`
and return a bare `<main>` — do **not** render `Navbar` or `Footer` yourself.

### Linking to home-page sections

Section ids only exist on the home page, so section links must be written as
`/#courses`, **not** `#courses`. A bare hash does not change the route, so on
`/services/*` it would silently do nothing. `Layout` resolves the hash after the
incoming route has committed, so `/services/x` → `/#contact` reaches the footer.

Use `<Link to="/#contact">`, not `<a href="#contact">` with a `preventDefault`
handler. The `Link` version gives a real URL, so middle-click and "open in new
tab" work.

`Layout` uses `getElementById(hash.slice(1))`, not `querySelector` — a hash is
arbitrary user input and anything that is not a valid CSS selector would throw.

## Content: `src/data/servicesData.js`

Single source of truth for every service page. One key per service, each holding
`headline`, `sub`, `plans`, `faqs`, `tag`, `packagesTitle`, `faqTitle`, and the
CTA block. `serviceList` exports them in display order and drives the
sub-page switcher and the 404 shortcuts, so a new service only has to be added
in one place.

Content lives here rather than in JSX so pricing can be edited without touching
layout. When adding a service, add the object **and** push it into
`serviceList`.

> Copy-paste hazard: these blocks are structurally identical, so a copy can
> silently leave one service wearing another's `tag`, `headline`, `sub`, or
> `faqTitle`. Check all five fields for every service you touch.

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

`src/hooks/useInView.js` adds a `reveal-visible` class the first time an element
scrolls into view, then disconnects. The transitions themselves are CSS
(`.reveal`, `.stagger`) in `src/index.css`.

```js
const { ref, visible } = useInView(threshold, { repeat, onEnter });
```

- `ref` — attach to the element that carries `.reveal`.
- `visible` — use when you also need to fire a one-shot animation.
- `repeat` — keep observing after the first entry, for animations that replay on
  every visit (the Hero bounce).
- `onEnter` — fired on every qualifying entry. Read through a ref internally, so
  an inline arrow will not tear down and rebuild the observer.

`.stagger` delays its first six children by 100ms each; a seventh and beyond get
a single 0.6s fallback delay rather than staying at `opacity: 0`.

## Motion

- **Hero images float continuously** (`animate-hero-float`), never on hover.
  Each image gets its own duration and a negative `animation-delay` so they bob
  out of phase. Configured in the `FLOAT` map in `src/components/Hero.jsx`.
  **These class strings must stay complete literals** — Tailwind scans raw
  source text, so building them with string interpolation silently produces
  classes that are never generated.
- **Hero entrance bounce** is one-shot and replays on every entry into view.
- Under `prefers-reduced-motion: reduce` the infinite float is disabled and
  scroll reveals become an instant opacity change with no travel. Short one-shot
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

**Do not put reference material in `public/`.** Everything there is copied
verbatim into `dist/` and deployed. The `services-1..4.png` design captures
belong next to `DESIGN-MEASUREMENTS.md` in the repo root, not in the app; when
they were in `public/` they added 3.1 MB to every deploy while nothing referenced
them.

## Adding a section

1. Create `src/components/YourSection.jsx`.
2. Give the root element a stable `id` and a `.shell` wrapper.
3. Import and render it in `HomePage` in `src/App.jsx`, in order. If it should
   appear on every route rather than the home page only, render it in `Layout`
   instead.
4. If it needs a nav entry, add a label/`to` to the `navLinks` array in
   `src/components/Navbar.jsx`. A real page is just its path (`/about`); a home
   page section needs the `/` prefix (`/#faq`).
5. Reuse `useInView` for reveal and a local `useState` for UI state. Keep static
   data as a module-level array at the top of the component, matching the other
   sections.

## Known gaps

- **No test, lint, or CI setup.** Changes are verified by `npm run build` and
  manual review only.
- **`services-*.png` deletions are uncommitted.** They were committed in
  `3f2d5e9` and then removed from the working tree, but the removal has not been
  committed, so they are still in the repository.
- All four Portfolio entries are identical placeholder copy ("FastAI - AI Design
  website"), and all four point at the same image.
- `Services` row 02 ("UI/UX Design") has `serviceHref: null` — there is no
  `/services/ui-ux-design` page, so its panel renders without a pricing link
  instead of duplicating row 04's destination. Either add the page or merge rows
  02 and 04.
- No Privacy Policy or Terms of Service. The footer links were removed rather
  than left pointing at `#privacy` / `#terms`, which resolved to nothing. Add
  them as real routes when the documents exist.
- `/about`, `/courses` and `/portfolio` are placeholders — the real pages are
  still to be written. See "Placeholder pages" above.
- `/contact` has no enquiry form yet; it only lists contact details.
- `LogoKodeio.svg` is unreferenced.
- Bricolage Grotesque tops out at weight 800, so `font-black` (900) in the
  footer wordmark renders as 800.
- Hero images total ~1.6 MB and are all `loading="eager"`; there is no preload on
  the LCP image.

## Style drift

Quote style is inconsistent: `src/components/Footer.jsx` uses double quotes
while every other file uses single quotes. Something reformatted that one file —
most likely an editor's format-on-save, which will keep reformatting it until
the setting matches. There is no Prettier or ESLint config in the repo to make
this deterministic. Adding one (`.prettierrc` with `singleQuote: true`) plus a
`format` script would settle it; until then, match the file you are editing.