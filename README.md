# demo_pages

The UK homepage copied from `/Users/macbook/porting`, using the original Next.js, React, Tailwind styles, images, fonts, and video.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Dependencies are already copied into this workspace, so the first install can be skipped here.

The separate Halloween homepage is at http://localhost:3000/halloween. It reuses the same UK sections and enquiry flow, with scattered pumpkins, corner cobwebs, flying bats, a matching peach CTA banner, and bat animations on tutor buttons. The original `/` route keeps its Christmas theme. Decorative plus signs have been removed from the Christmas banner.

## Checks

```bash
npm run build
npm test
```

The homepage entry is `app/(uk)/page.tsx`; its sections live in `app/(uk)/home/`. Shared components, the footer, mobile tutor bar, and tutor enquiry dialog/API are included. The original font licenses are in `public/fonts/`.

Christmas effects from `/Users/macbook/Crissmash` are integrated in `app/components/christmas/`: snowfall, header lights and garlands, Santa-hat hero musicians, and the Santa sleigh hover/focus animation on tutor buttons. A peach Christmas banner after Featured On uses the source campaign's message and booking link. The footer has no garland. Effects use local artwork and support reduced motion; tutor buttons keep their original enquiry flow.

Halloween components live in `app/components/halloween/`; `SeasonProvider` selects the button decoration. The Halloween route has its own layout so it does not inherit Christmas snow or garlands. Every homepage section and the footer has a small Halloween accent, alternating pumpkins, ghosts, witch hats and cobwebs. The CTA features a golden full moon behind a crooked haunted house with glowing windows.

The hero, CTA and selected section margins have bats entering from both sides at different speeds. `batMotion.ts` articulates each wing's elbow, wrist and fingertips, with a quick power stroke, folded recovery and brief glides. The flight renderer follows a different shallow curve on each pass and turns the bat along the curve's tangent. It updates SVG paths and transforms directly without React renders per frame. Button bats share the same wing poses through CSS.

All decorative artwork is hidden from assistive technology and ignores pointer events. Flight lanes and reserved decoration space keep text and controls clear. Seasonal loops pause when the page is hidden, section animations pause offscreen, and reduced-motion settings disable flight. Artwork provenance and exact generation prompts are in [public/halloween/README.md](public/halloween/README.md).

This copy contains the UK homepage only. Navigation links keep their original destinations; other UK pages and the US site are not included. The enquiry API retains the original upstream integration. No live enquiries were submitted during verification.
