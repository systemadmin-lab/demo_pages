import type { ReactNode } from "react";
import Footer from "../components/Footer";
import MobileTutorBar from "../components/MobileTutorBar";
import TutorEnquiryProvider from "../components/tutor-enquiry/TutorEnquiryProvider";
import SeasonProvider from "../components/seasonal/SeasonProvider";
import HalloweenAtmosphere from "../components/halloween/HalloweenAtmosphere";
import HalloweenSection from "../components/halloween/HalloweenSection";
import { ukRegion } from "../regions/uk";

export default function HalloweenLayout({ children }: { children: ReactNode }) {
  return <SeasonProvider season="halloween">
    <TutorEnquiryProvider region="uk">
      <HalloweenAtmosphere />
      <div className="pb-[calc(92px+env(safe-area-inset-bottom))] tablet:pb-0">
        {children}
        <HalloweenSection touch="web" night><Footer /></HalloweenSection>
      </div>
      <MobileTutorBar href={ukRegion.tutorHref} />
    </TutorEnquiryProvider>
  </SeasonProvider>;
}
