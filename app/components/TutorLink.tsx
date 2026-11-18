"use client";

import type { ReactNode } from "react";
import { useTutorEnquiry } from "./tutor-enquiry/TutorEnquiryProvider";
import { FestiveButtonContent, festiveButtonClass } from "./christmas/festive-button-content";
import { useSeason } from "./seasonal/SeasonProvider";
import HalloweenButtonContent, { halloweenButtonClass } from "./halloween/HalloweenButtonContent";

export function TutorLink({ variant = "hero", href = "/our-tutors", children = "Meet your tutor" }: {
  variant?: "hero" | "header" | "step" | "mobile";
  href?: string;
  children?: ReactNode;
}) {
  const openEnquiry = useTutorEnquiry();
  const halloween = useSeason() === "halloween";
  const sizeClasses = {
    hero: "min-h-[58px] min-w-[197px] px-5 py-3.5 text-[19px] tablet:px-7 tablet:py-[15px]",
    header: "min-h-[54px] min-w-[165px] px-5 py-3.5 text-[18px] tablet:min-h-[52px] tablet:min-w-40 tablet:py-3",
    step: "min-h-[66px] min-w-[197px] px-7 py-4 text-[19px]",
    mobile: "min-h-[60px] w-full px-6 py-4 text-[22px]",
  }[variant];
  const className = `muse-button ${halloween ? halloweenButtonClass : festiveButtonClass} inline-flex shrink-0 items-center justify-center gap-3 rounded-[21px] font-heading leading-[1.4] shadow-[0_10px_24px_#ff87001a] hover:shadow-none focus-visible:shadow-none ${sizeClasses}`;
  const content = halloween
    ? <HalloweenButtonContent>{children}</HalloweenButtonContent>
    : <FestiveButtonContent>{children}</FestiveButtonContent>;

  return openEnquiry
    ? <button type="button" className={className} data-variant={variant} aria-haspopup="dialog" onClick={(event) => openEnquiry(event.currentTarget)}>{content}</button>
    : <a className={className} data-variant={variant} href={href}>{content}</a>;
}
