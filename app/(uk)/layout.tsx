import Footer from "../components/Footer";
import MobileTutorBar from "../components/MobileTutorBar";
import { ukRegion } from "../regions/uk";
import TutorEnquiryProvider from "../components/tutor-enquiry/TutorEnquiryProvider";
import Snowfall from "../components/christmas/snowfall";

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return (
    <TutorEnquiryProvider region="uk">
      <Snowfall />
      <div className="pb-[calc(92px+env(safe-area-inset-bottom))] tablet:pb-0">{children}<Footer /></div>
      <MobileTutorBar href={ukRegion.tutorHref} />
    </TutorEnquiryProvider>
  );
}
