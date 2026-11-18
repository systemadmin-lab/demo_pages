# Christmas effects

Adapted from `/Users/macbook/Crissmash`:

- `snowfall` uses the original deterministic CSS snowflakes: 24 on desktop and 12 on narrow screens. It pauses in hidden tabs and is hidden for reduced motion and print.
- `desktop-christmas-trim` reuses the original light string and evergreen artwork. The side garlands fit the UK homepage gutters; mobile keeps only the lights.
- `festive-button-content` reuses the eight-frame sleigh sprite and hover/focus animation, with the homepage's existing label sizes, button shapes, and enquiry actions. Touch presses also reveal the effect. Reduced motion keeps the normal button feedback without the sleigh.
- The footer keeps its original layout and divider, with no Christmas garland.
- `FestiveHeroFigures` replaces the hero's decorative musicians with the Santa-hat sprite from the Christmas project. The figures along the lower edge gently sway while visible, with a smaller arrangement on phones.
- `ChristmasCtaBanner` sits immediately after Featured On and uses the homepage's peach, blue, and orange palette. Its heading and booking label come from `Crissmash/app/components/christmas-closing.tsx`; its carol message and age/beginner details come from `christmas-hero.tsx`. The booking link opens the campaign at `https://musecool.com/christmas26/#christmas-events`, using the production location documented in the source project's README. The original Santa, tree, gifts, and ornaments remain. `SeasonalMotion` pauses decorative loops offscreen, and reduced motion keeps a static composition.

All artwork is local in `public/christmas/`. Decorative layers ignore pointer input and are hidden from assistive technology. No animation library is required.

The CTA banner also reuses the source project's reindeer-and-Santa sleigh: eight galloping frames travel across the illustration every nine seconds. The animation scales down on phones, pauses offscreen or in hidden tabs, and becomes a stationary sleigh for reduced motion.
