# AstroYoda

Know Your Stars. Understand Yourself.

This is Phase 2 (design system) + Phase 3 (homepage) + Phase 4 (numerology
engine) + Phase 5 (numerology UI) + Phase 7 (astrology calculation engine)
+ Phase 8 (birth-profile UI) + Phase 9 (Nakshatra UI) + Phase 10 (birth
chart visualization) + Phase 11 (Compatibility) + Phase 12 (Daily
Horoscope) + Phase 13 (Educational content) + Phase 14 (SEO) + Phase 15
(legal pages) + Phase 16 (testing and astrology-accuracy validation) +
Phase 17 (deployment) of the AstroYoda build — see the product blueprint doc for
the full plan. The homepage, navigation,
legal pages and the "AstroYoda Wisdom" system are built. `/numerology` is
a real, working calculator. `/astrology/birth-chart` computes your Lagna,
Sun and Moon signs, planetary positions and Moon Nakshatra, and draws a
North Indian style Vedic chart diagram. `/nakshatra` finds your Nakshatra
and Pada, with a browsable list of all 27. `/compatibility` compares two
people's birth details and shows traditional Vedic compatibility
indicators — Moon sign, Sun sign, Ascendant and Nakshatra — explicitly as
qualitative traditional notes, never a percentage match score. `/horoscope`
shows a daily General/Career/Love/Money/Well-being reading plus a lucky
number and color for each of the 12 signs, refreshed every day from a
curated, static content set — never a live AI-generated forecast.
`/learn` has 9 plain-language, fact-checked articles on the ideas behind
Vedic astrology and numerology (what a Nakshatra is, how to read a birth
chart, Vedic vs Western astrology, master numbers, and more), each
linking back to the relevant calculator. All five features run entirely
in your browser — nothing is sent to a server.

## Running it on your computer

You'll need Node.js installed (version 18 or newer). If you're not sure
whether you have it, Step 1 below will tell you.

**STEP 1 — Check you have Node.js**
Open the Terminal app on your Mac (Cmd+Space, type "Terminal", press Enter).
Paste this and press Enter:

    node -v

What should happen: it prints something like `v20.11.0`. If instead you see
"command not found", install Node.js from https://nodejs.org (choose the LTS
version), then come back to Step 1.

**STEP 2 — Install the project's packages**
In the same Terminal window, paste this and press Enter:

    cd ~/Documents/astroyoda && npm install

What should happen: you'll see a progress bar and a list of package names
scroll by, finishing with something like "added 430 packages". This step
needs internet access and can take a minute or two.

If it fails: copy the last 10–15 lines of the error and share them — most
failures are either "no internet connection" or a Node.js version that's too
old (rerun Step 1 to check).

**STEP 3 — Start the site**
Still in the same window, paste this and press Enter:

    npm run dev

What should happen: after a few seconds you'll see a line like
`Local: http://localhost:3000`. Open that address in your web browser — you
should see the AstroYoda homepage.

If it fails: copy the error text from the Terminal and share it. A common
one is "port 3000 is already in use" — if so, press Ctrl+C to stop, then run
`npm run dev -- -p 3001` instead and open http://localhost:3001.

**Running the calculation tests**
The numerology, astrology, location, compatibility and horoscope engines
(plus data-integrity checks over the Learn articles, the SEO
metadata/sitemap helpers, and a check that the legal pages have no
leftover placeholder text) have 179 automated tests combined (leap years,
invalid dates, master numbers, Unicode names, planetary longitudes,
Ascendant math, Nakshatra/pada lookups, city search, timezone lookup,
historical daylight-saving conversions, chart house layout, element
compatibility, daily-horoscope selection, and more). To run them, paste
this in the Terminal (in the project folder):

    npm test

What should happen: you'll see a green checkmark next to each test file and
a line like "Test Files  25 passed (25)" and "Tests  174 passed (174)".

**STEP 4 — Stop the site**
When you're done looking, click into the Terminal window and press Ctrl+C.
This stops the local server; it doesn't delete anything.

## What's in this folder

- `app/` — every page and route (App Router)
- `components/` — reusable UI pieces (Header, Hero, cards, Wisdom banner, etc.)
- `components/astrology/` — the shared birth-details form, city search box,
  birth-chart / Nakshatra / Compatibility result displays, and the SVG
  chart renderer (Phase 8 + 9 + 10 + 11)
- `components/horoscope/` — the daily-horoscope card and the 12-sign
  picker grid used on both the homepage preview and the `/horoscope` hub
  (Phase 12)
- `data/wisdom.ts` — the original "AstroYoda Wisdom" quotes
- `data/nakshatras.ts` — the 27 Nakshatras and their fixed traditional attributes
- `data/interpretations/` — numerology, zodiac-sign and Nakshatra meanings
  shown in the UI
- `data/horoscope/messagePool.ts` — the curated, static bank of daily-horoscope
  lines and lucky colors (Phase 12)
- `data/learn/articles.ts` — the 9 fact-checked Learn articles (Phase 13)
- `data/cities.json` — offline place-name dataset used to resolve a birth
  city to coordinates (see "Location engine notes" below)
- `types/` — shared TypeScript types
- `lib/numerology` — the numerology calculation engine (Phase 4)
- `lib/astrology` — the astrology calculation engine (Phase 7), plus
  `houseLayout.ts` (Phase 10): works out which zodiac sign occupies each of
  the 12 whole-sign houses, and which planets fall in each
- `lib/location` — turns a birth city (or manual coordinates) into
  latitude/longitude, a timezone, and finally a UTC instant the astrology
  engine can use (Phase 8)
- `lib/compatibility` — compares two calculated birth charts into
  qualitative traditional compatibility notes (Phase 11)
- `lib/horoscope` — deterministically picks which curated line each sign
  sees on a given calendar day (Phase 12)
- `lib/seo/buildMetadata.ts` — the shared helper every page uses to build
  its title, description, canonical URL and Open Graph tags consistently
  (Phase 14)

## Before you launch this publicly

The site is already live (see "Deploying AstroYoda (Phase 17)" below),
and `SITE_URL` is already set to the real address. One thing still needs
a real value from you (everything else the legal pages used to flag with
`[add ...]` placeholders was resolved in Phase 15 — see "Legal pages
notes" below):

- `app/contact/page.tsx` — replace the placeholder email
  (`hello@astroyoda.example.com`) with your real support address, then
  commit and push so Netlify redeploys it.

Also worth knowing: `npm install` reports 13 dependency vulnerabilities
(3 moderate, 8 high, 2 critical) from Next.js 14.2.5 itself, and npm's own
install output names a specific one directly: "next@14.2.5: This version
has a security vulnerability. Please upgrade to a patched version." (see
[nextjs.org/blog/security-update-2025-12-11](https://nextjs.org/blog/security-update-2025-12-11)
for the details). Most of these advisories are only fixed in the Next.js
15.5 line, so fully clearing them means a Next.js major-version upgrade
(14 → 15), which has real breaking changes (e.g. some request APIs
becoming async) and needs its own testing pass across every page — not
something to do as a quick patch, but worth scheduling soon given this is
now a live, public site.

Also worth planning for: the horoscope content pool (`data/horoscope/messagePool.ts`)
currently has 20 lines per category (General/Career/Love/Money/Well-being).
With 12 signs drawing from a shared pool, a line can repeat for a given
sign roughly every 2–3 weeks — fine to launch with, but worth periodically
expanding so regular visitors don't notice repeats.

## Astrology engine notes (Phase 7)

- Planetary positions come from `astronomy-engine` (MIT license, free,
  runs in the browser — no paid API, no server calls).
- The Lahiri ayanamsa (used to convert tropical → sidereal/Vedic positions)
  is a custom-fitted formula calibrated against publicly published reference
  values. It is NOT copied from Swiss Ephemeris (which is AGPL-licensed) to
  avoid licensing issues. Phase 16 (testing) independently cross-checked it
  against a held-out reference value and confirmed it's accurate to a
  fraction of a degree (see "Astrology accuracy validation notes (Phase 16)"
  below).
- The Ascendant (Lagna) formula is standard spherical astrology math.
  **Phase 16's validation against a real published chart found and fixed a
  genuine bug here** — see "Astrology accuracy validation notes (Phase 16)"
  below for the full story; this matters if you've looked at any chart
  results from earlier in the build.

## Location engine notes (Phase 8)

Turning "born in Mumbai at 3pm" into the UTC instant + coordinates the
astrology engine needs, with no paid geocoding API:

- **City → coordinates**: `data/cities.json`, a trimmed (population ≥
  15,000; ~24,300 places) offline extract of the `all-the-cities` npm
  package, whose place data ultimately comes from
  [GeoNames](https://www.geonames.org) (credited on the About page, as its
  CC BY 4.0 license requires). It's bundled with the app and only
  downloaded by a visitor's browser when they open the birth-details form
  and start typing (code-split separately, ~1.8MB). A city smaller than
  that population threshold won't be found by search — the form has an
  "enter coordinates manually" fallback for that case.
- **Coordinates → timezone**: the `tz-lookup` npm package (public domain,
  CC0), a small (72KB) offline timezone-boundary dataset — also no network
  call.
- **Local time → UTC**: the `date-fns-tz` npm package (MIT), which reads the
  timezone's real historical rules through the browser's own IANA timezone
  database — verified against the US's brief switch to year-round daylight
  time in early 1974 while building this.

## Nakshatra content notes (Phase 9)

`data/interpretations/nakshatraThemes.ts` — the one-line traditional
"theme" shown for each Nakshatra — was cross-checked against Wikipedia's
Nakshatra article and PanchangBodh's Nakshatra guide. Three entries
(Ashlesha, Jyeshtha, Mula) had a genuine split in tone between sources
during that research pass; those are written conservatively rather than
picking a side, and it's called out in that file's comments if you want to
revisit them later. Yoni and Nadi (two more traditional attributes) are
still left out of `data/nakshatras.ts`, same reason as before — not
confidently cross-checked yet.

## Chart visualization notes (Phase 10)

The birth-chart page draws a **North Indian style** Vedic chart: a square
with houses fixed in position (House 1, the Ascendant, is always the top
diamond) and each house's zodiac sign changing to match the Ascendant.
This is one of a few regional chart styles (North Indian, South Indian,
East Indian all show the same information laid out differently) — North
Indian was picked as the most widely recognized "Vedic chart" shape
internationally; a South Indian style toggle would be a reasonable future
addition if you'd like one.

The chart's geometry (`components/astrology/VedicChartSvg.tsx`) was derived
from the standard construction — a square, its two corner-to-corner
diagonals, and a diamond connecting the midpoints of its four sides —
worked out directly from coordinate geometry (not copied from any
third-party chart image), and checked by actually rendering it and looking
at the result before calling it done.

## Compatibility notes (Phase 11)

`/compatibility` deliberately does **not** implement formal Vedic
"Guna Milan" / Kundli matching (the traditional 36-point, 8-factor scoring
system used for marriage matching) or a Manglik (Mangal Dosha) check — both
are specialist, higher-stakes analyses that a quick free tool shouldn't
claim to do responsibly, and both are explicitly out of this project's V1
scope per the blueprint. Instead it compares two charts' Moon sign, Sun
sign, Ascendant (by the four classical elements — Fire, Earth, Air, Water,
a widely-published astrological classification, not specific to Vedic vs
Western astrology) and Nakshatra (same/different, shared ruling planet,
shared Gana), each with a short qualitative traditional note — no score,
percentage or "chance of success" claim anywhere. The Person A / Person B
forms reuse `BirthDetailsForm`, extended with an `idPrefix` prop so two
instances can render on one page without input-id collisions.

## Daily Horoscope notes (Phase 12)

`/horoscope` and `/horoscope/[sign]` follow the blueprint's V1 content
model exactly: "curated/static content — a rotating or dated content
table, not a live paid AI API." There's no server, no database and no AI
call involved in a horoscope page load — everything is computed in the
visitor's browser from a static file:

- `data/horoscope/messagePool.ts` holds 20 original, hand-written lines
  per category (General, Career, Love, Money, Well-being — 100 lines
  total) plus a pool of 15 traditional-style lucky colors. The lines are
  deliberately generic and hedged ("may", "consider", "could") rather than
  definite predictions, in keeping with the project's "reflective, not
  guaranteed" framing (see the Disclaimer page).
- `lib/horoscope/dailySelection.ts` deterministically picks one line per
  category (plus a lucky number 1–9 and a lucky color) for a given sign
  and calendar date, using a simple string hash of `sign|category|date`.
  No randomness, no state, no storage: the same sign on the same local
  date always gets the same reading, for every visitor, and it changes at
  their local midnight — computed client-side so "today" always matches
  the visitor's own timezone, even on a statically-generated page.
- Because the pool is shared across all 12 signs (rather than 12 separate
  hand-written pools), it stays a genuinely small, honest static content
  set rather than something that reads as sign-specific insight it isn't;
  each sign's own "essence" blurb (from Phase 9's `zodiacSignEssence`)
  supplies the sign-specific flavor instead.
- Both `/horoscope` (the 12-sign hub) and the homepage's "Today's
  Horoscope" preview reuse the same `HoroscopeSignGrid` component, so a
  card's snippet and its full page always agree.
- 5 new tests (154 total project-wide) check determinism (same sign +
  date ⇒ same reading), that every field actually comes from its pool,
  and that readings vary both across signs and across days.

## Educational content notes (Phase 13)

`/learn` and `/learn/[slug]` are 9 plain-language articles, all
hand-written (never AI-generated at request time) and cross-checked
against at least two independent sources per topic before writing:

- What Is Vedic Astrology?, What Is a Nakshatra?, What Is Numerology?,
  What Is a Birth Chart?, How to Read a Birth Chart, What Is Lagna?,
  What Is Vimshottari Dasha?, Vedic vs Western Astrology, and What Are
  Master Numbers?

Two points came back genuinely disputed across sources during research,
and are worded conservatively rather than stated as settled fact, per the
project's no-fabrication rule:

- The historical origin date of Vedic astrology's earliest texts (some
  sources say 1400–1200 BCE, others argue for a much later compilation
  date) — the article says "ancient, exact age debated by scholars"
  rather than picking a date.
- Whether 33 is traditionally recognized as a "master number" alongside
  11 and 22 — some classical schools recognize only 11 and 22, while many
  modern practitioners include 33. AstroYoda's own numerology calculator
  already treats 33 as a master number (see `lib/numerology/reduceNumber.ts`,
  built in Phase 4), so the article says so explicitly and names the
  disagreement, rather than presenting 33 as universally agreed.

Every article ends with a small "Try it yourself" box linking back to the
relevant calculator (birth chart, Nakshatra Finder, numerology, etc.),
matching the blueprint's Journey F ("browse educational articles →
internal links back to relevant calculators"). Each article page also
carries `Article` JSON-LD structured data, per the blueprint's SEO notes
— though the URL inside it still uses the placeholder domain until
that's replaced (see "Before you launch this publicly" above). 5 new
tests (159 total project-wide) check that every article has real content
and that every slug already linked from the homepage resolves.

## SEO notes (Phase 14)

Every page now goes through one shared helper, `lib/seo/buildMetadata.ts`,
that builds its title, meta description, canonical URL and Open Graph
tags together, so they can't drift out of sync with each other:

- **Title tags**: the root layout (`app/layout.tsx`) now uses a Next.js
  title template — each page just sets its own short title (e.g.
  `"About"`) and the template appends `" — AstroYoda"` automatically for
  the `<title>` tag. Open Graph's title doesn't inherit that template
  (Next.js only applies it to the top-level `title` field), so
  `buildMetadata` builds the full `"<title> — AstroYoda"` string for
  `openGraph.title` directly.
- **Meta descriptions**: added to every page that was missing one (About,
  Vedic Astrology hub, Contact, Disclaimer, Privacy Policy, Terms of Use
  previously had none).
- **Canonical URLs**: every page now sets `alternates.canonical`,
  including the two dynamic route families (`/horoscope/[sign]`,
  `/learn/[slug]`).
- **Open Graph tags**: every page now sets matching `openGraph.title`,
  `description`, `url`, `siteName` and `type`, instead of relying on the
  root layout's generic homepage OG tags for every page.
- **`app/sitemap.ts`** now includes the dynamic routes that exist as real
  pages — all 12 `/horoscope/[sign]` and all 9 `/learn/[slug]` pages —
  generated from the same data each page's own `generateStaticParams`
  uses, so the sitemap can't quietly drift out of sync with what's
  actually built. It still doesn't include `/nakshatra/[slug]` or
  `/numerology/life-path-number-[n]`, because — as flagged in Phase
  13 — those route families are named in the blueprint's sitemap (§4)
  but were never built as actual pages; adding them to the sitemap would
  just be advertising 404s.
- **Structured data**: `/learn/[slug]` pages already carry `Article`
  JSON-LD (added in Phase 13). The blueprint also mentions `FAQPage`
  schema "where relevant" (§19) — none of the current pages have genuine
  question-and-answer content, so this was deliberately skipped rather
  than manufacturing an FAQ section just to attach schema to it. Worth
  revisiting if a real FAQ page gets added later.
- **Semantic HTML**: already in good shape from earlier phases — checked
  rather than changed. `Header`/`Footer`/nav all use proper landmark
  elements (`<header>`, `<nav aria-label="...">`, `<main>`, `<footer>`).
- `robots.ts` was already correct (allows all crawlers, points to
  `sitemap.xml`) — left as-is.

9 new tests (168 total project-wide) cover the metadata helper's output
and check the sitemap contains every expected static and dynamic route
with no duplicates.

## Legal pages notes (Phase 15)

Per the blueprint's Privacy Architecture (§20): "Privacy Policy, Terms of
Use, Disclaimer, and Contact pages are written with real, specific
content — not boilerplate placeholders — before launch." The Disclaimer
was already real, specific content from an earlier phase and needed no
changes. Privacy Policy and Terms of Use both had a few bracketed
placeholders (`[add launch date]`, `[Update this section...]`,
`[List any third-party service...]`); these are now resolved with actual,
verified facts about how the site behaves — not filled in with generic
boilerplate:

- **"How it's processed" and "Third-party services"**: I checked the
  actual code (there is no `app/api` directory anywhere in this project,
  and no `fetch()` call exists in `lib/` or `components/`) before writing
  these sections, rather than assuming. The Privacy Policy now states
  plainly that no server-side lookup of any kind happens — city→coordinates,
  coordinates→timezone and local-time→UTC all run from data bundled with
  the site itself (see "Location engine notes" above), and names GeoNames
  as the origin of that bundled place-name data without implying it's a
  live service that sees your searches.
- **"Analytics and ads"**: states plainly that, as of this writing,
  AstroYoda has no analytics and no ads — accurate, since Phase 18
  (Analytics) and Phase 19 (Monetization) haven't happened yet — with a
  note that this section will be updated first if that changes.
- **"Last updated" dates**: both pages now show today's date instead of a
  placeholder. Bump these to your actual launch date once you have one,
  and again whenever you materially change either page (see "Before you
  launch this publicly" above).
- **Contact page**: deliberately left as-is. Its placeholder email is a
  real launch blocker only you can resolve — I can't invent a support
  address for you — so it stays clearly flagged rather than "resolved"
  with something fake.

6 new tests (174 total project-wide) guard against a bracketed
placeholder like `[add ...]` accidentally being reintroduced into these
three pages later, and check that each has a real, dated "Last updated"
line.

## Astrology accuracy validation notes (Phase 16)

Per the blueprint's own flag (see "Astrology engine notes" above), this
phase set out to validate the two hand-coded astronomy formulas -- the
Lahiri ayanamsa and the Ascendant (Lagna) -- against real, independently
published reference data, without using any paid API (still, and always,
off the table). This is a much stronger check than the pre-existing tests,
which mostly verified the code against its own published fit points rather
than against anything outside itself.

**The headline finding: the Ascendant formula had a 180-degree bug, and it
affected every chart the site has ever computed.**

- I found a real, publicly documented Vedic birth chart (a well-known
  public figure, born 17 September 1950, 11:40 IST, in Vadnagar, Gujarat)
  whose Ascendant sign and Nakshatra/pada are independently reported by
  multiple sources as Scorpio, Anuradha nakshatra, pada 2.
- Running AstroYoda's own `calculateBirthChart` on that exact birth data
  produced a Taurus Ascendant -- not Scorpio. Taurus and Scorpio are
  exactly opposite signs on the zodiac wheel (180 degrees / 6 signs apart).
- Digging into the formula, the issue was in `getTropicalAscendant`
  (`lib/astrology/ascendant.ts`): the standard textbook formula
  (`atan2` on a specific numerator/denominator built from sidereal time,
  latitude and the obliquity of the ecliptic) actually returns the
  **Descendant** -- the point directly opposite the Ascendant on the
  horizon -- not the Ascendant itself, unless you add 180 degrees to it.
  The code was using the raw, un-corrected value.
- **This means every birth chart AstroYoda has computed before this fix
  had its Ascendant, and therefore all 12 whole-sign houses (which are
  simply numbered around the zodiac starting from the Ascendant's sign),
  shifted by exactly 6 signs from the correct answer.** Planet sign
  placements themselves (Sun, Moon, etc.) were NOT affected -- only the
  Ascendant and the house numbering built on top of it.
- I double-checked the fix two independent ways before trusting it: (1)
  the corrected value lands Anuradha nakshatra **pada 2** exactly, matching
  the published chart's specific pada, not just its sign; (2) I separately
  re-derived the correct answer from first principles (reasoning about
  what right ascension a rising point must have at the equator, then
  solving backwards for the ecliptic longitude), with no reference to the
  first method, and it produced the identical corrected values. Both
  methods agreeing independently is why I'm confident this fix is right,
  not just a coincidental match to one chart.
- **Fix applied**: `lib/astrology/ascendant.ts` now adds 180 degrees to the
  formula's raw result, with a detailed code comment explaining the bug,
  the fix, and its impact, so this isn't silently lost to a future reader
  of the code.
- `tests/astrology/ascendant.test.ts` was rewritten: the two existing
  "equator special case" tests had their expected values corrected (they
  had been silently encoding the same bug), and four new tests validate
  the whole pipeline (`calculateBirthChart`) against the real published
  chart above -- checking the Ascendant sign, the exact Nakshatra pada, and
  (with looser tolerance, since those specific figures are single-sourced)
  the Sun and Moon positions.

**Separately, the Lahiri ayanamsa formula held up well.** I found an
independent source (not one of the four points the formula's curve was
originally fitted to) describing the "official" Lahiri ayanamsa definition
epoch: 23 degrees 15' 00" at 1956-03-21, 0:00 Eastern Time. AstroYoda's
formula predicts 23.241561 degrees for that same instant -- a difference
of about 30 arcseconds (roughly 0.008 degrees), well within a reasonable
margin of error for a curve-fitted approximation being tested outside its
original fit points. A new test in `tests/astrology/ayanamsa.test.ts`
documents this held-out cross-check with the source and the math.

**What this means for you in practice**: if you (or anyone) looked at a
birth chart, Nakshatra, or house placement generated by AstroYoda before
this fix, the Ascendant and house numbers shown were wrong (planet sign
placements were correct). Everything generated from this point forward is
correct. There's no data to "migrate" -- nothing is stored anywhere; every
chart is recalculated fresh each time someone enters their birth details.

Full verification for this phase: `npx tsc --noEmit` (clean), `npx vitest
run` (179/179 tests passing -- 174 from before, plus 4 new Ascendant tests
and 1 new ayanamsa test), `npx next lint` (clean), and a production build
(`npm run build`, with Google Fonts temporarily stubbed out in a disposable
copy of the project only, since this sandboxed environment can't reach
Google's font server -- your real project's font setup was never touched;
your own `npm run build` will fetch the fonts normally).

## Deploying AstroYoda (Phase 17)

**AstroYoda is now live at: https://exquisite-tiramisu-eccf4f.netlify.app**

The blueprint's Deployment Strategy (§23) called for numbered,
no-assumed-experience steps here -- but with your go-ahead, the site is
already deployed rather than waiting for you to click through it
yourself. Here's what was done, what it costs (nothing), and what you'd
do to change anything going forward.

**What AstroYoda needs from a host, and why it's free:** the whole site
is pre-rendered at build time into plain HTML/CSS/JS files -- there's no
database, no server-side API, and no per-visitor server code (Phase 8's
location lookups, Phase 7's astrology math all run in the visitor's own
browser). That means it qualifies as a fully static site (`npm run
build` now produces a plain `out/` folder, via the `output: "export"`
setting in `next.config.mjs`), which a free static-hosting tier can
serve indefinitely at $0/month.

**Which host, and why:** I researched three free options -- Vercel,
Netlify, and Cloudflare Pages -- specifically checking whether their free
tiers restrict commercial or ad-monetized sites, since the blueprint's
roadmap includes possible Google AdSense later (Phase 19). Vercel's
Hobby plan explicitly names Google AdSense as disqualifying its free
tier ("Fair Use Guidelines," accessed 2026-09-22) -- ruling it out
despite being the most Next.js-native option. **Netlify's free tier**
has no such restriction, official staff guidance confirms
commercial/monetized sites are fine, and it has a beginner-friendly
"connect GitHub, auto-deploy on every push" workflow -- so that's what
AstroYoda uses. No credit card was ever entered anywhere in this
process, and Netlify's free tier has no expiry or trial period -- it's
free indefinitely under its usage limits (currently generous relative to
a small personal site's traffic).

**How it was set up:**
- A GitHub repository was created at
  [github.com/upscdranirban-lang/astroyoda](https://github.com/upscdranirban-lang/astroyoda)
  and the code pushed there (using GitHub's own official device-code
  authorization flow -- you approved it in your browser; your password
  was never seen or typed by anyone but you).
- Netlify was connected to that repository (via Netlify's own "Login
  with GitHub" and its GitHub App installation, both of which you
  clicked through yourself, since creating accounts isn't something I do
  on your behalf).
- Build settings: **Build command** `npm run build`, **Publish
  directory** `out`.
- **Netlify's projects are private by default now** (a newer platform
  change) -- production visibility had to be explicitly switched to
  **Public** under Project configuration > General > Visitor access, or
  every visitor would hit a Netlify login wall instead of the site. Worth
  knowing if you ever create another Netlify project by hand.
- `lib/siteConfig.ts`'s `SITE_URL` is set to the real live address above,
  so canonical URLs, Open Graph tags, and the sitemap are all correct.

**One real bug this phase caught:** the first deploy attempt failed
during "Install dependencies." `package-lock.json` had gotten a
corrupted entry (pinned to `is-core-module@2.17.0` in a way npm's clean
install couldn't resolve) from an earlier, unrelated attempt to run the
dev server in a flaky sandboxed environment. Fixed by deleting and
regenerating `package-lock.json` from scratch and confirming `npm ci`
(what Netlify's build actually runs) succeeds cleanly before pushing
again -- the second deploy succeeded.

**Going forward, publishing an update is just:** commit and push your
changes to the `main` branch (with `git`, or GitHub Desktop's *Commit*
then *Push origin* buttons if you'd rather not use the command line --
download it at [desktop.github.com](https://desktop.github.com)) --
Netlify rebuilds and redeploys automatically within a minute or two of
every push, with zero further action needed.

**If you want a custom domain or to rename the site:** Project
configuration > General lets you rename the Netlify subdomain (e.g. to
`astroyoda.netlify.app`, if free) or connect a domain you own under
Domain management -- both stay free, though owning a custom domain name
itself has its own separate cost from whichever registrar you buy it
from (not from Netlify).

### Verified this phase

`npx tsc --noEmit`, `npx vitest run` (179/179 tests passing), `npx next
lint`, and a full **static export** production build all pass. The live
deploy itself was verified by an independent fetch of the public URL
(outside any logged-in session) confirming the real page content loads
for anyone, not just a login-walled placeholder.

## Next steps

Phase 16 (Testing) and Phase 17 (Deployment) are both complete -- see
"Astrology accuracy validation notes (Phase 16)" and "Deploying AstroYoda
(Phase 17)" above. Per the blueprint's development sequence, remaining
phases include analytics (Phase 18) and monetization/AdSense (Phase 19) --
worth revisiting the Netlify vs. Vercel choice above if that plan changes,
since it was made specifically around Netlify's more permissive
commercial-use terms.
