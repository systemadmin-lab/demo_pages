import Image from "next/image";
import { ukRegion } from "../regions/uk";
import { TutorLink } from "./TutorLink";
import FestiveHeroFigures from "./christmas/FestiveHeroFigures";
import { HalloweenHeroDecorations } from "./halloween/HalloweenDecorations";
import type { Season } from "./seasonal/SeasonProvider";

export { TutorLink } from "./TutorLink";

const homeContent = ukRegion.hero;

const decorationPath = "/homehero/decorations";

type HeroImage = { src: string; alt: string };
export type HeroImages = readonly [HeroImage | null, HeroImage | null];
export type HeroTestimonial = { quote: string; author: string };

export const homeHeroImages = ukRegion.hero.images satisfies HeroImages;

const photoFrames = [
  {
    id: "primary",
    position: "left-0 tablet:left-3",
    frame: "-rotate-6 bg-[#71c8bc]",
    rotation: "-rotate-4",
  },
  {
    id: "secondary",
    position: "left-[47%] tablet:left-1/2",
    frame: "rotate-6 bg-[#ff9800]",
    rotation: "rotate-8",
  },
] as const;

function RatingCard({ score, count }: { score: number; count: number }) {
  return (
    <div
      className="order-6 mx-auto mt-9 inline-flex items-center gap-3.5 rounded-[17px] bg-white px-[18px] py-[13px] shadow-[0_4px_10px_#5c3f1910] tablet:mx-0 tablet:mt-[30px]"
      aria-label={`Rated ${score} out of 5 on Google, based on ${count} reviews`}
    >
      <Image src={`${decorationPath}/google.svg`} width={40} height={40} alt="" />
      <div>
        <div className="flex items-center gap-2 text-[17px] leading-[1.3] text-[#f5a623]">
          <strong className="font-bold">{score.toFixed(1)}</strong>
          <span className="inline-flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <span className="relative block size-[18px]" key={index}>
                <Image src={`${decorationPath}/star.svg`} width={18} height={18} alt="" className="brightness-0 opacity-[0.125]" />
                <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${Math.max(0, Math.min(1, score - index)) * 100}%` }}>
                  <Image src={`${decorationPath}/star.svg`} width={18} height={18} alt="" className="max-w-none" />
                </span>
              </span>
            ))}
          </span>
        </div>
        <p className="mt-1 text-[13px]"><strong>{count}</strong> reviews</p>
      </div>
    </div>
  );
}

export default function Hero({
  images = homeHeroImages,
  titleId = "home-title",
  title = homeContent.title,
  testimonial = homeContent.testimonial,
  stats = homeContent.stats,
  benefits = homeContent.benefits,
  reassurance = homeContent.reassurance,
  rating = homeContent.rating,
  tutorHref = ukRegion.tutorHref,
  season = "christmas",
}: {
  images?: HeroImages;
  titleId?: string;
  title?: string;
  testimonial?: HeroTestimonial;
  stats?: readonly { value: string; label: string }[];
  benefits?: readonly string[];
  reassurance?: string;
  rating?: { score: number; count: number };
  tutorHref?: string;
  season?: Season;
}) {
  return (
    <section
      className="relative pt-2 pb-[130px] tablet:pt-[75px] tablet:pb-[130px] desktop:pt-[99px] desktop:pb-[162px]"
      aria-labelledby={titleId}
    >
      {season === "halloween" ? <HalloweenHeroDecorations /> : <FestiveHeroFigures />}
      <div className="relative mx-auto grid w-[calc(100%-40px)] max-w-[540px] grid-cols-1 phone:w-[calc(100%-48px)] tablet:w-auto tablet:max-w-[calc(100%-64px)] tablet:grid-cols-[55%_45%] desktop:max-w-[calc(100%-112px)] desktop:grid-cols-2 wide:max-w-[1260px]">
        <div className="contents tablet:relative tablet:z-2 tablet:block">
          <h1
            id={titleId}
            className="order-2 m-0 mt-12 max-w-full text-center font-heading text-[clamp(30px,8.3vw,42px)] leading-[1.3] font-normal tracking-[0.1px] text-balance whitespace-normal text-heading tablet:mt-0 tablet:text-left tablet:text-[37px] tablet:leading-[1.25] tablet:text-wrap desktop:text-[clamp(36px,3.15vw,48px)] wide:text-5xl"
          >
            {title}
          </h1>
          <ul className="order-3 mt-6 grid list-none grid-cols-2 gap-2 p-0 tablet:flex tablet:flex-wrap tablet:gap-2.5 desktop:gap-4">
            {stats.map(({ value, label }) => (
              <li key={label} className="flex min-w-0 items-center justify-center gap-2 rounded-[15px] bg-white px-3 py-3.5 text-[clamp(12px,3.5vw,16px)] leading-[1.3] font-medium shadow-[0_2px_2px_#62471b06] tablet:block tablet:rounded-[13px] tablet:py-3 tablet:text-[13px] tablet:leading-[1.15] tablet:whitespace-nowrap desktop:px-4 desktop:text-[15px]">
                <strong className="shrink-0 font-bold text-[#0798bf]">{value}</strong>{" "}
                <span className="max-w-[76px] text-center tablet:max-w-none">{label}</span>
              </li>
            ))}
          </ul>
          <ul className="order-4 mt-8 grid list-none gap-6 p-0 text-base leading-[1.5] tablet:mt-9 tablet:gap-[18px] tablet:text-[17px] tablet:leading-[1.3]">
            {benefits.map((benefit) => (
              <li className="flex items-start justify-center gap-2.5 text-center tablet:justify-start tablet:text-left" key={benefit}>
                <span className="w-[15px] shrink-0 text-2xl leading-[0.9] font-bold text-muse-blue" aria-hidden="true">♪</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="order-7 mt-7 flex flex-col items-center gap-6 tablet:mt-8 tablet:items-start tablet:gap-4 desktop:mt-[47px] desktop:flex-row desktop:items-center">
            <TutorLink href={tutorHref} />
            <p className="m-0 flex max-w-[390px] items-start gap-3 text-center text-base leading-[1.5] font-medium text-heading tablet:max-w-[315px] tablet:gap-1.5 tablet:text-left tablet:text-sm tablet:leading-[1.35] desktop:max-w-none desktop:text-[15px]">
              <Image src={`${decorationPath}/info.svg`} alt="" width={14} height={14} className="mt-0.5 shrink-0" />
              <span>{reassurance}</span>
            </p>
          </div>
          <RatingCard {...rating} />
        </div>
        <div className="contents tablet:relative tablet:mt-[110px] tablet:ml-6 tablet:block tablet:min-w-0 desktop:mt-[88px] desktop:ml-[52px]">
          <div data-hero-photos className="relative order-1 mx-3 aspect-[1.75] tablet:mx-0 tablet:aspect-auto tablet:h-[357px]">
            <Image src={`${decorationPath}/sketch-clef.svg`} alt="" width={72} height={206} className="pointer-events-none absolute top-2 -left-10 hidden -rotate-2 tablet:-left-12 tablet:block" />
            <Image src={`${decorationPath}/sketch-notes.svg`} alt="" width={108} height={202} className="pointer-events-none absolute top-3 -right-[72px] hidden opacity-80 tablet:block wide:-right-24" />
            <Image src={`${decorationPath}/sketch-clef-mobile.svg`} alt="" width={32} height={116} className="pointer-events-none absolute top-7 -left-6 -rotate-2 tablet:hidden" />
            <Image src={`${decorationPath}/sketch-notes-mobile.svg`} alt="" width={48} height={90} className="pointer-events-none absolute top-3 -right-9 opacity-80 tablet:hidden" />
            {photoFrames.map(({ id, position, frame, rotation }, index) => (
              <div key={id} className={`absolute top-3 h-full w-[52%] tablet:h-[280px] desktop:h-[322px] desktop:w-[56%] ${position}`}>
                <div className={`absolute inset-0 rounded-[28px] phone:rounded-[32px] desktop:rounded-[42px] ${frame}`} aria-hidden="true" />
                <div className={`absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_25px_28px_#422f2226] phone:rounded-[32px] desktop:rounded-[42px] ${rotation}`}>
                  {images[index] && (
                    <Image src={images[index].src} alt={images[index].alt} fill sizes="(max-width: 760px) 48vw, (max-width: 1150px) 24vw, 340px" loading="eager" className="object-cover" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <figure className="relative z-2 order-5 mx-auto mt-9 w-[94%] rounded-[17px] bg-white px-5 py-6 text-center shadow-[0_5px_11px_#51381820] tablet:mt-[-62px] tablet:mr-0 tablet:ml-auto tablet:w-[min(330px,100%)] tablet:px-[17px] tablet:pt-[18px] tablet:pb-[17px] tablet:text-left desktop:mt-[-78px] desktop:-mr-3 desktop:w-[360px] wide:-mr-[42px]">
            <blockquote className="m-0 text-base leading-[1.65] text-[#009bc2] italic tablet:text-[15px]">
              &quot; {testimonial.quote} &quot;
            </blockquote>
            <figcaption className="mt-3 text-[13px] leading-[1.4] font-semibold text-heading tablet:text-right tablet:text-[15px] tablet:leading-[1.35] tablet:font-medium">
              - {testimonial.author}
            </figcaption>
          </figure>
        </div>
      </div>
      <Image src={`${decorationPath}/wave.svg`} alt="" width={1440} height={58} className="pointer-events-none absolute inset-x-0 -bottom-px hidden h-auto w-full phone:block" />
      <Image src={`${decorationPath}/wave-mobile.svg`} alt="" width={375} height={28} className="pointer-events-none absolute inset-x-0 -bottom-px h-7 w-full phone:hidden" />
    </section>
  );
}
