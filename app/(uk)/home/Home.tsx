import Hero from "./components/Hero";
import FeaturedOn from "./components/FeaturedOn";
import FreeInstrument from "./components/FreeInstrument";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Reviews from "./components/Reviews";
import SiteHeader from "./components/SiteHeader";
import TheMuse from "./components/TheMuse";
import Achievements from "./components/Achievements";
import MoreOffers from "./components/MoreOffers";
import MuseCoolNumbers from "./components/MuseCoolNumbers";
import Faq from "./components/Faq";
import DesktopChristmasTrim from "@/app/components/christmas/desktop-christmas-trim";
import ChristmasCtaBanner from "@/app/components/christmas/ChristmasCtaBanner";
import HalloweenCtaBanner from "@/app/components/halloween/HalloweenCtaBanner";
import { HalloweenTrim } from "@/app/components/halloween/HalloweenDecorations";
import HalloweenSection from "@/app/components/halloween/HalloweenSection";
import type { Season } from "@/app/components/seasonal/SeasonProvider";

export default function Home({ season = "christmas" }: { season?: Season }) {
  const halloween = season === "halloween";
  return (
    <div className="relative overflow-x-clip bg-cream" data-season={season}>
      {halloween ? <HalloweenTrim /> : <DesktopChristmasTrim />}
      <a
        className="fixed top-3 left-3 z-20 -translate-y-[160%] bg-white px-5 py-3 focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero season={season} />
        <HalloweenSection season={season} touch="ghost"><FeaturedOn /></HalloweenSection>
        {halloween ? <HalloweenCtaBanner /> : <ChristmasCtaBanner />}
        <HalloweenSection season={season} touch="hat" side="right"><FreeInstrument /></HalloweenSection>
        <HalloweenSection season={season} touch="web" bats><HowItWorks /></HalloweenSection>
        <HalloweenSection season={season} touch="ghost" side="right"><Pricing /></HalloweenSection>
        <HalloweenSection season={season} touch="pumpkin"><Reviews /></HalloweenSection>
        <HalloweenSection season={season} touch="hat" side="right"><TheMuse /></HalloweenSection>
        <HalloweenSection season={season} touch="ghost"><Achievements /></HalloweenSection>
        <HalloweenSection season={season} touch="web" side="right"><MoreOffers /></HalloweenSection>
        <HalloweenSection season={season} touch="hat" bats><MuseCoolNumbers /></HalloweenSection>
        <HalloweenSection season={season} touch="ghost" side="right"><Faq /></HalloweenSection>
      </main>
    </div>
  );
}
