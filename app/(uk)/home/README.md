# Home

`app/(uk)/page.tsx` renders `Home.tsx`. Home-specific sections live in `components/`,
with Tailwind utility classes in each component and editable copy/links in `content.ts`.
Shared colors, fonts, and responsive breakpoints are defined in `app/globals.css`.
The shared footer lives in `app/components/Footer.tsx` and is rendered once by
`app/(uk)/layout.tsx`, after the page content, so UK routes inherit it.

- `SiteHeader`: logo, contact links, account link, and the shared `NavigationMenu`
  from `app/components/`. The menu uses a native modal dialog, the original UK/US
  flag SVGs and link destinations, four desktop columns, and mobile accordions.
  Closing with the X, Escape, a link or the backdrop restores focus to its trigger;
  the page cannot scroll while the menu is open.
- `Hero.tsx`: re-exports the shared `app/components/Hero.tsx`, which holds the hero
  markup, statistics, benefits, photos, decorations, rating, testimonial, and
  reusable `TutorLink` used by the header. `SiteHeader.tsx` likewise re-exports
  `app/components/SiteHeader.tsx`. UK defaults live in `app/regions/uk.ts`;
  the US homepage passes its own content from `app/regions/us.ts`.
  Its optional `images` tuple, `title` and `titleId` also let About Us reuse this
  exact layout while changing its heading and one photo. Defaults stay intact.
- Hero-only helpers and asset placement data stay inside `Hero.tsx`; there are
  no separate hero component files or CSS modules.
- `FeaturedOn.tsx`: the Music Lessons in London heading and original Forbes,
  BBC Radio London, Classic FM, and Tech.eu logos from `public/home/`. All markup
  and logo data stay in this one section file. Logos wrap into two columns on mobile.
  `showLessonsHeading={false}` hides the introductory heading and promotes
  As Featured On to an h2 on Private Music Lessons; Home keeps the default.
- `FreeInstrument.tsx`: the free instrument offer, overlapping original photos,
  benefits, and return note. Uses the original PNGs and pink music-note SVG in
  `public/home/`, plus the section's original blue SVGs extracted into
  `public/home/free-instrument/`. All layout and decoration data stay in this file.
- `HowItWorks.tsx`: four reusable step cards with the original illustrations and
  arrow copied into `public/home/how-it-works/`. Uses the shared `TutorLink` with
  its step-button size. Cards use four columns on desktop, two on tablet, and
  one on mobile; arrows only connect cards in the same row.
- `Pricing.tsx`: online and in-person lesson prices, shared tutor buttons, and
  the three payment steps. Both pricing columns use the same internal component.
  Prices and bundle/payment copy reproduce the supplied screenshots. The section
  uses original lesson photos, pricing SVGs, payment-card icon, and MuseCool mascot.
  The saved calendar and gift PNGs contain bot-check HTML, and their source URLs
  also return that page. `book-lesson.svg` and `cashback.svg` are matching vector
  replacements; replace these two assets when the original PNGs are available.
- `Reviews.tsx`: nine review cards after pricing, with the first three copied from
  the screenshot and six clearly labelled demo reviews, as requested. Review data,
  reusable card, original star SVG and carousel controls all stay in this file.
  Shows three cards on desktop, two on tablet and one on mobile, with clickable
  pagination, native touch scrolling, arrow/Home/End keys and reduced-motion support.
  Replace the six demo entries and remove their `demo` flags when real copy is ready.
- `TheMuse.tsx`: the blue video/benefits section after reviews, using the local
  `public/home/The-Muse-Presentation-1.mp4`, the existing pink music-note icon,
  original blue illustrations in `public/home/the-muse/`, and shared `TutorLink`.
  Its poster is the gold reward frame at 98 seconds from the same video. The video
  loads on playback, loops muted when visible, pauses offscreen, respects manual
  pauses and reduced-motion preferences, and keeps native playback controls.
  Desktop uses two columns; smaller screens place the video above the copy.
  Playback lives in the shared `app/components/MuseVideo.tsx` client component;
  the section itself is rendered on the server and keeps its original layout.
- `Achievements.tsx`: the cream statistics section after The Muse, with reusable
  rows for the supplied 97% and 92% figures. Percentage badges align with each
  orange bar; mobile spacing keeps badges clear of wrapping descriptions. Original
  stick figures remain separate SVGs, reusing three matching pricing assets and
  extracting the other four into `public/home/achievements/`. All data and Tailwind
  styling stay in this one server-rendered section file.
- `MoreOffers.tsx`: five linked offerings after achievements, arranged in a row
  of two and a row of three on larger screens, with a single column on mobile.
  Uses one reusable card, the original purple heading/captions, rounded photos,
  and the shared tutor button. All five original images are in `public/home/offers/`.
  The two saved concert JPGs contained HTML, so their valid 1536px versions were
  downloaded from the image URLs in the saved source. Card destinations also
  match that source, including `/uk/workshops/` for Students’ Competition.
  The Workshops and Concerts card now links to the local `/workshops-concerts` page.
- `MuseCoolNumbers.tsx`: the 90000+, 3000+ and 300+ figures from the screenshot,
  over the original winter-concert background in `public/home/numbers/`. Uses
  three columns on larger screens and stacked figures on mobile.
- `Faq.tsx`: five original questions and answers, original plus/minus SVG paths,
  and the shared tutor button. Native `details`/`summary` elements support mouse
  and keyboard interaction without client JavaScript. The shared `name` keeps
  one answer open at a time; the second answer starts open to match the screenshot.

The two original photos are in `public/homehero/`. Original stick figures,
sketch music notes, interface icons, and the bottom wave are extracted from
the MuseCool HTML saved in `public/home/` into `public/homehero/decorations/`.
These are the original SVG paths, not redrawn approximations. Only whitespace,
an invalid namespace space, SVG attribute casing, and page-specific classes
were normalized for standalone use. Decorative images have empty alt text.

The reference is the supplied MuseCool UK homepage screenshot.
Shared "Meet your tutor" buttons use `/our-tutors`, keeping navigation on the
current site. The MuseCool app login remains external.
The displayed statistics and Oliver S testimonial reproduce the latest screenshot.

The original logo is from
https://musecool.com/page/uk/images/brand/musecool-logo.webp.
Anton and Roboto are self-hosted Google Fonts; licenses are in `public/fonts/`.
