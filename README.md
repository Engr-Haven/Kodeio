# Kodeio — Marketing Site

Marketing website for **Kodeio**, a web design / development and bootcamp
company. It sells two things: the agency's services, and its training
programmes.

## Stack

| Concern    | Choice                                                 |
| ---------- | ------------------------------------------------------ |
| Build tool | Vite 8.3                                               |
| UI         | React 18.3 (JSX, no TypeScript)                        |
| Routing    | react-router-dom 7 (`BrowserRouter`)                   |
| Styling    | Tailwind CSS 4.3 via `@tailwindcss/vite`               |
| Icons      | lucide-react                                           |
| Fonts      | Bricolage Grotesque + Roboto, loaded from Google Fonts |
| Lint       | ESLint 10 (flat config) + `eslint-plugin-react-hooks`  |
| Format     | Prettier 3 (`.prettierrc.json`, `singleQuote: true`)   |

No state library, no CSS-in-JS, and no test runner. Developed against Node 22.x.

## Getting started

```bash
npm install
npm run dev            # dev server with HMR
npm run build          # optimize images -> vite build -> prerender -> verify -> dist/
npm run preview        # serve the built output locally
npm run optimize:images # regenerate WebP + og-default.png only
npm run prerender      # re-run the prerender step only (dist/ must exist)
npm run verify:build   # re-run the post-build checks only (dist/ must exist)
npm run lint           # ESLint
npm run format         # Prettier --write
npm run format:check   # Prettier --check (used in CI)
```

`npm run build` runs four steps: `prebuild` optimizes images
(`scripts/optimize-images.mjs`), then `vite build`, then
`scripts/prerender.mjs`, then `scripts/verify-build.mjs`, which fails the build
if any prerendered page is missing its title, description, canonical, JSON-LD or
rendered markup (see [SEO & prerendering](#seo--prerendering)).

`dist/` is generated — don't edit anything in it by hand.

### CI

`.github/workflows/ci.yml` runs `npm ci`, `npm run lint`,
`npm run format:check`, and `npm run build` on every push to `master` and on
every pull request. There is still no test runner, but the build now ends in
`scripts/verify-build.mjs`, so a broken prerender or SEO regression fails CI
instead of shipping silently.

### Hosting (prerendered static site)

`npm run build` prerenders every route to a real HTML file, so each URL is
served as static content and no SPA rewrite to `index.html` is needed. Unknown
URLs should return a genuine 404 (`dist/404.html`) instead of the HTTP 200
"soft 404" that an SPA fallback produces. Configs are checked in per host —
only the one matching your host is read:

- **Hostinger (Apache)** — `public/.htaccess`, copied into `dist/`. Serves the
  prerendered route directories and answers anything else with `404.html` + a
  real 404 status. This is the production host.
- `public/_redirects` — Netlify / Cloudflare Pages equivalent.
- `vercel.json` — Vercel equivalent (filesystem handle, then 404).

For any other host (nginx, S3), replicate the same behaviour: serve existing
files, then return 404 rather than rewriting everything to `index.html`.

## SEO & prerendering

The site is a client-side SPA, which on its own ships an empty
`<div id="root">` to crawlers. `scripts/prerender.mjs` fixes that: after
`vite build` it renders every route to HTML and writes a static file per route,
so each URL ships real markup plus its own `<head>`.

**One source of truth for routes.** `src/seo/pages.js` declares every static
page (path + title + description) once. `src/seo/routes.js` derives the
prerender/sitemap list from it (plus one entry per service and course), and
`src/App.jsx` maps those paths to components. Adding a static page is a one-file
change (`pages.js`) plus its component in the `PAGE_COMPONENTS` map.

**One source of truth for metadata.** `src/seo/seo.js` (`getSeo(pathname)`)
derives the title, description, canonical URL, robots directive and a JSON-LD
graph (Organization, WebSite, Service + AggregateOffer, Course, FAQPage)
entirely from `src/data/*`. It is used by both:

- `src/entry-server.jsx` — renders the route tree through a `StaticRouter` at
  build time; `src/seo/head.js` serialises the tags into each HTML file.
- `src/components/Seo.jsx` — applies the same values on the client for SPA
  navigations and the dev server (updating tags in place, not appending).

So page metadata can never drift between the static HTML and the running app.
The prerender is **not hydrated** — `src/main.jsx` still uses `createRoot`, which
replaces the static markup on load.

**Files emitted into `dist/`:** one `index.html` per route, `404.html`,
`sitemap.xml` and `robots.txt` (both generated from `src/seo/routes.js`, so a new
service/course is listed automatically). `scripts/verify-build.mjs` then checks
all of them, and `npm run build` fails if any is wrong.

**Retired course slugs** (`/courses/uiux`, `/courses/ui-ux`,
`/courses/wordpress`, `/courses/frontend`) are 301-redirected to their canonical
course at the host level, so they never render a duplicate page.

**Changing the domain:** set `VITE_SITE_URL` in `.env` (default
`https://kodeiotechnologies.com`). Everything absolute — canonical tags,
`og:url`, the sitemap, JSON-LD — is built from it.

**Images:** `scripts/optimize-images.mjs` (the `prebuild` step, needs `sharp`)
emits WebP siblings into `public/optimized/` and a 1200×630 `og-default.png`.
`Hero` and the portfolio components (`ProjectImage`) reference them through
`<picture>` with the PNG as fallback; the largest hero image is preloaded from
`index.html`.

## Routes

| Path                    | Renders                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `/`                     | `HomePage` — Hero, Services, Bootcamps, Portfolio, FAQ      |
| `/about`                | `AboutPage` — story, mission & vision, services, tools, FAQ |
| `/courses`              | `CoursesPage` — course listing from `coursesData`           |
| `/courses/:courseId`    | `CourseDetailPage` — hero, curriculum accordion, CTA        |
| `/portfolio`            | `PortfolioPage` — hero and selected-work grid               |
| `/portfolio/:projectId` | `CaseStudyPage` — overview, process, outcomes, next project |
| `/contact`              | `ContactPage` — enquiry form, contact rail, CTAs            |
| `/services`             | Redirects to `/services/web-development`                    |
| `/services/:serviceId`  | `ServiceDetailPage` — hero, pricing, FAQ, CTA               |
| anything else           | `NotFound`                                                  |

`serviceId` is a key of `servicesData`, `courseId` is a key of `coursesData`, and
`projectId` is a key of `portfolioData`. An unknown slug renders the 404 page
rather than falling back to a default.

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

## Built-out pages

There are no placeholder routes left. `/portfolio` now renders a hero and a
responsive selected-work grid from `src/data/portfolioData.js`; each tile links
to a `/portfolio/:projectId` case study using the same shared template.

`/about` is a full page (story, mission & vision, what we do, tools, FAQ, CTAs)
built to the same house style as the rest of the site. It is the one route with
a palette of its own — see the `--color-about-*` tokens below.

`/courses` lists the tracks from `coursesData` and `CourseDetailPage` renders
each one.

`src/components/PlaceholderPage.jsx` is no longer referenced by any route but is
kept for future use.

`/contact` is more than a stub: it shows the email, phone numbers and socials
from `src/data/site.js`, which the footer also reads, so the two cannot drift
apart, and it carries the enquiry form described below.

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
  or course page (read from `servicesData` / `coursesData`, so it cannot drift)
  and back to the site default everywhere else.

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

## Enquiry form

`/contact` carries a real enquiry form. There is **no backend yet**, so
`handleSubmit` in `src/pages/ContactPage.jsx` has two paths:

1. **`VITE_CONTACT_ENDPOINT` is set** — the form POSTs the payload as JSON
   (`{ name, email, company, phone, subject, budget, timeline, message, updates }`)
   to that URL. A non-2xx response surfaces as an error message.
2. **`VITE_CONTACT_ENDPOINT` is empty** — the message is handed to the visitor's
   own mail app through a `mailto:` link, pre-filled with the field values.

The fallback exists so a submission is never silently dropped while the backend
is being built. The status message says so honestly rather than claiming the
enquiry was received.

To switch over, set the variable in `.env` (see `.env.example`) and rebuild —
Vite inlines `import.meta.env` at build time, so the endpoint has to be present
when the site is built, not when it is served.

The "What do you need?" dropdown is generated from `serviceList` and
`courseList`, so the form can never offer a service or bootcamp that does not
exist. Budget bands follow the real starting prices in `servicesData`.

## Content: `src/data/`

Three data modules are the source of truth for page content:

- **`servicesData.js`** — one key per service, each holding `headline`, `sub`,
  `plans`, `faqs`, `tag`, `packagesTitle`, `faqTitle`, the CTA block, and
  `navLabel` / `navDesc` for the navbar dropdown. `serviceList` exports them in
  display order and drives the sub-page switcher, the 404 shortcuts, **and the
  navbar dropdown** (which pairs each entry with an icon by slug), so a new
  service only has to be added in one place.
- **`coursesData.js`** — one key per bootcamp, holding `title`, `tag`,
  `headline`, `sub`, `duration`, `startDate`, `mode`, and `curriculum[]`.
  `courseList` exports them in display order and drives the `/courses` listing,
  the course switcher tabs, **and the home-page Bootcamps cards** (which read
  title/duration/description from here and keep only presentation extras — badge,
  slots, price — in a local map).
- **`site.js`** — `CONTACT` and `SOCIALS`, shared by the footer and `/contact`.

Content lives here rather than in JSX so pricing and copy can be edited without
touching layout. When adding a service or course, add the object **and** push it
into the matching list.

> Copy-paste hazard: these blocks are structurally identical, so a copy can
> silently leave one entry wearing another's `tag`, `headline`, `sub`, or
> `faqTitle` (this has happened — see git history). Check every field for each
> entry you touch.

## Design system

All tokens live in the `@theme` block in `src/index.css` and generate Tailwind
utilities automatically. There are no ad-hoc hex values in components; if you
need a colour, add a token rather than hardcoding it.

- **Colours** — `brand` purple `#7d2eff`, plus `ink`, `body`, `muted`, `line`
  neutrals and the `surface-*` scale. Generates `bg-brand`, `text-ink`, etc.
- **About palette** — a `about-*` set measured pixel-by-pixel from the
  `AboutUs.png` mockup and used only by `/about`. Still tokens, not hex:
  `bg-about-mission`, `bg-about-card-pink-strong`, `text-about-vision-ink`.
- **Banner gradient** — `banner-top` / `banner-bottom` drive the closing CTA
  banner (`bg-gradient-to-b from-banner-top to-banner-bottom`). A lilac-to-grey
  blend that sits on the page as a colour wash. Shared by `/about` and
  `/contact`; the old `about-banner-*` pair was promoted out of the about
  namespace when a second route needed it.
- **Type** — `--font-display` (Bricolage Grotesque) for headings, `--font-sans`
  (Roboto) for body copy. `h1`–`h6` pick up the display face automatically from
  the base layer, so most headings need no font utility at all.
- **Layout** — see the container note below.
- **Radii / shadows / animations** — `rounded-card`, `shadow-lift`,
  `animate-hero-float`, and friends.

### Container widths

| Class           | Width  | Used by                             |
| --------------- | ------ | ----------------------------------- |
| `.shell`        | 1128px | Every section, including the navbar |
| `.shell-narrow` | 1120px | The footer only                     |

> **Do not rename `.shell` to `.container`.** Tailwind 4 ships its own
> `.container` utility in the `utilities` layer, which outranks the
> `components` layer this file defines its classes in. Its responsive
> `max-width: 80rem` would silently win at viewports ≥1280px and pin the
> layout to the wrong width. The name is load-bearing.

### Scroll reveal

`src/hooks/useInView.js` adds a `reveal-visible` class the first time an element
scrolls into view, then disconnects. The transitions themselves are CSS
(`.reveal`, `.stagger`) in `src/index.css`.

**Use `src/components/Reveal.jsx`, not the raw hook.** `<Reveal>` and
`<Stagger>` attach the observer ref and the animation class to the same element,
which is the only way it works:

```jsx
import { Reveal, Stagger } from '../components/Reveal';

<Reveal threshold={0.05} className="mx-auto max-w-[700px]">
  ...
</Reveal>

<Stagger className="grid gap-6 md:grid-cols-2">
  ...
</Stagger>
```

`.stagger` hides its **children** (`opacity: 0`) until the container itself gets
`reveal-visible`, so a `.stagger` element with no observer ref leaves the whole
grid permanently invisible — it renders as an empty gap with no console error.
That shipped once on `/contact` and blanked two entire sections. The components
make the mistake impossible; if you need the raw hook, attach `ref` to the same
element that carries `.reveal` or `.stagger`, never to a sibling.

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
src: '/case%20study%20img.png'; // correct
src: '/case study img.png'; // 404
```

Always supply real `width` and `height` to prevent layout shift.

**Tool logos are PNGs.** The stack icons on `/about` (`figma.png`, `css.png`,
`react.png`, …) are 264×264 transparent squares in `public/`, rendered through
a `<picture>` with the WebP sibling from `public/optimized/` and the PNG as the
fallback. `scripts/optimize-images.mjs` picks up any new PNG in `public/`
automatically — no registration needed.

**Do not put reference material in `public/`.** Everything there is copied
verbatim into `dist/` and deployed. The `services-1..4.png` design captures
belong next to `DESIGN-MEASUREMENTS.md` in the repo root, not in the app; when
they were in `public/` they added 3.1 MB to every deploy while nothing referenced
them. The same applies to the `AboutUs.png` mockup — it lives in the repo root,
not in `public/`.

## Adding a section

1. Create `src/components/YourSection.jsx`.
2. Give the root element a stable `id` and a `.shell` wrapper.
3. Import and render it in `HomePage` in `src/App.jsx`, in order. If it should
   appear on every route rather than the home page only, render it in `Layout`
   instead.
4. If it needs a nav entry, add a label/`to` to the `navLinks` array in
   `src/components/Navbar.jsx`. A real page is just its path (`/about`); a home
   page section needs the `/` prefix (`/#faq`).
5. Use `<Reveal>` / `<Stagger>` from `src/components/Reveal.jsx` for scroll
   reveal and a local `useState` for UI state. Keep static data as a
   module-level array at the top of the component, matching the other sections.

## Known gaps

- **No test runner.** CI (`.github/workflows/ci.yml`) runs lint, format check,
  and build, but there is no functional test coverage.
- Portfolio case-study copy and metrics are drawn from the FastAI template and
  the live project sites; confirm client-approved wording and numbers before
  publishing.
- No Privacy Policy or Terms of Service. The footer links were removed rather
  than left pointing at `#privacy` / `#terms`, which resolved to nothing. Add
  them as real routes when the documents exist.
- `/contact` has a full enquiry form, but **no backend yet** — it falls back to
  a `mailto:` link until `VITE_CONTACT_ENDPOINT` is set. See "Enquiry form"
  below.
- `LogoKodeio.svg` is unreferenced.
- Bricolage Grotesque tops out at weight 800, so `font-black` (900) in the
  footer wordmark renders as 800.
- Hero images are all `loading="eager"`; only the largest is preloaded and
  hinted with `fetchpriority="high"`. WebP output drops the set from ~1.6 MB to
  ~360 KB, but the untouched PNG fallbacks are still shipped for old browsers.
- SEO structure is in place (prerendered HTML, per-route title/description/
  canonical, Open Graph/Twitter, sitemap, robots, JSON-LD). What still limits
  ranking is **content**, not plumbing: the FAQ/service copy is thin and the
  case-study metrics still need client verification. Enrich those before
  expecting competitive positions.

## Code style

Prettier owns formatting: `.prettierrc.json` sets `singleQuote: true`, `semi`,
`printWidth: 100`, and `trailingComma: es5`. Run `npm run format` before
committing; CI's `format:check` fails otherwise.

ESLint (`eslint.config.js`, flat config) uses `@eslint/js` recommended,
`eslint-plugin-react-hooks` (classic `rules-of-hooks` / `exhaustive-deps`), and
`eslint-plugin-react-refresh`. The React Compiler rules shipped in
`eslint-plugin-react-hooks` v7 (`react-hooks/refs`, `react-hooks/set-state-in-effect`)
are turned **off** with a comment — they flag the established `useInView`
pattern (a hook that returns a ref callers spread onto elements, and an observer
that sets state after mount) as errors, and would produce ~21 false positives.
