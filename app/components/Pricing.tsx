import Image from "next/image";
import { regions, type Region } from "../regions";
import { lessonPricing, type LessonPricing } from "../regions/pricing";
import { TutorLink } from "./Hero";

const lessonOptions = [
  {
    id: "online",
    title: "Online",
    image: "/what we do/private-lessons-online.jpg",
    imageWidth: 736,
    imageHeight: 487,
    imageAlt: "A girl wearing headphones and playing guitar during an online music lesson",
    rateKey: "online",
    decoration: "sketch-left",
    decorationPosition: "-left-[100px]",
  },
  {
    id: "offline",
    title: "Offline at your home",
    image: "/home/pricing/in-person-piano.jpg",
    imageWidth: 741,
    imageHeight: 463,
    imageAlt: "A piano tutor helping a young student read sheet music at home",
    rateKey: "inPerson",
    decoration: "sketch-right",
    decorationPosition: "-right-20",
  },
] as const;

const paymentSteps = [
  {
    title: "Book your lesson",
    description: "Choose your tutor, lesson duration and bundle.",
    image: "book-lesson.svg",
  },
  {
    title: "Pay after each lesson",
    description: "Your card is charged only after each confirmed lesson.",
    image: "pay-after.png",
  },
  {
    title: "Cashback after completing your bundle",
    description: "Complete your bundle on time, and cashback is applied automatically.",
    image: "cashback.svg",
  },
] as const;

const decorations = [
  { image: "guitar", size: 98, position: "top-0 left-5" },
  { image: "singer", size: 98, position: "-top-2.5 left-20" },
  { image: "trumpet", size: 98, position: "-top-2.5 left-[30%]" },
  { image: "saxophone", size: 80, position: "top-0 left-[38%]" },
  { image: "maracas", size: 98, position: "-top-5 right-[60px]" },
  { image: "maracas", size: 98, position: "bottom-5 left-0" },
  { image: "accordion", size: 98, position: "bottom-0 left-[100px]" },
  { image: "reader", size: 112, position: "bottom-0 left-40" },
  { image: "family", size: 98, position: "right-[50px] bottom-[30px]" },
] as const;

type LessonOptionProps = {
  option: (typeof lessonOptions)[number];
  pricing: LessonPricing;
  tutorHref: string;
};

function LessonOption({ option, pricing, tutorHref }: LessonOptionProps) {
  const rates = pricing[option.rateKey];
  const { currencySymbol } = pricing;
  const note = option.rateKey === "online"
    ? `Best value - from ${currencySymbol}${rates[0].price}`
    : "Flexible scheduling";

  return (
    <article className="relative min-w-0" aria-labelledby={`${option.id}-lesson-heading`}>
      <Image
        src={`/home/pricing/${option.decoration}.svg`}
        alt=""
        width={option.id === "online" ? 112 : 113}
        height={202}
        className={`pointer-events-none absolute top-[30px] hidden desktop:block ${option.decorationPosition}`}
      />
      <Image
        src={option.image}
        alt={option.imageAlt}
        width={option.imageWidth}
        height={option.imageHeight}
        sizes="(max-width: 760px) calc(100vw - 80px), (max-width: 1150px) 42vw, 525px"
        className="relative block h-auto w-full rounded-[28px] tablet:rounded-[40px]"
      />

      <div className="px-2 pt-6 pb-5 phone:px-5 desktop:px-10 desktop:pt-[35px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-[#e4e4e4] pb-2.5 font-heading text-xl leading-8 tracking-[0.2px]">
          <h3 id={`${option.id}-lesson-heading`} className="font-normal text-[#0e92ba]">
            {option.title}
          </h3>
          <p className="whitespace-nowrap text-[#2b2b2b]">
            {currencySymbol}{rates[0].price} - {currencySymbol}{rates[2].price}
          </p>
        </div>
        <dl>
          {rates.map(({ minutes, price }) => (
            <div
              key={minutes}
              className="flex min-h-[63px] items-center justify-between gap-3 border-b border-[#e4e4e4] pt-5 pb-2.5 text-base leading-8 tracking-[0.2px] text-[#525252] last:border-0"
            >
              <dt>{minutes}min</dt>
              <dd className="whitespace-nowrap">
                <span className="font-heading text-[#2b2b2b]">{currencySymbol}{price}</span> per session
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-col items-center gap-4 text-center">
        <TutorLink variant="step" href={tutorHref} />
        <p className="flex items-center justify-center gap-1.5 text-sm leading-[22px] tracking-[0.2px] text-[#525252]">
          <Image src="/home/free-instrument/info.svg" alt="" width={20} height={20} />
          {note}
        </p>
      </div>
    </article>
  );
}

export default function Pricing({ region = "uk" }: { region?: Region }) {
  return (
    <section className="bg-white px-5 py-7 tablet:px-8" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-[1352px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#ffefdb_0%,#fff_100%)] pt-10 pb-12 tablet:pt-20 tablet:pb-20">
        <header className="px-5 text-center">
          <h2
            id="pricing-heading"
            className="pt-2.5 pb-5 font-heading text-[28px] leading-[1.4] font-normal tracking-[0.2px] text-[#2b2b2b] tablet:text-4xl tablet:leading-[50px]"
          >
            Pricing Options – Online &amp; Offline Lessons
          </h2>
          <p className="text-sm leading-[26px] text-[#525252] tablet:text-base">
            *Per-lesson prices shown assume a 10-lesson bundle.
          </p>
        </header>

        <div className="relative px-5 pt-12 pb-12 tablet:pt-20 tablet:pb-[60px]">
          <div className="pointer-events-none absolute inset-0 hidden tablet:block" aria-hidden="true">
            {decorations.map(({ image, size, position }, index) => (
              <Image
                key={`${image}-${index}`}
                src={`/home/pricing/${image}.svg`}
                alt=""
                width={size}
                height={size}
                className={`absolute ${position}`}
              />
            ))}
          </div>
          <div className="relative mx-auto grid max-w-[525px] items-center gap-x-5 gap-y-14 tablet:max-w-[1070px] tablet:grid-cols-2">
            {lessonOptions.map((option) => (
              <LessonOption
                key={option.id}
                option={option}
                pricing={lessonPricing[region]}
                tutorHref={regions[region].tutorHref}
              />
            ))}
          </div>
        </div>

        <div className="relative px-5" aria-labelledby="payment-heading">
          <h3 id="payment-heading" className="pt-2.5 text-center font-heading text-xl leading-8 font-normal text-[#0e92ba]">
            How payment works
          </h3>
          <ol className="mt-5 grid list-none gap-5 p-0 desktop:grid-cols-3">
            {paymentSteps.map(({ title, description, image }) => (
              <li key={title} className="flex items-start gap-4 rounded-2xl border border-[#ff9800] bg-white p-4 tablet:min-h-[170px]">
                <Image
                  src={`/home/pricing/${image}`}
                  alt=""
                  width={140}
                  height={140}
                  sizes="(max-width: 430px) 64px, 90px"
                  className="size-16 shrink-0 object-contain phone:size-[90px]"
                />
                <div className="min-w-0 pt-2">
                  <h4 className="font-heading text-lg leading-[26px] font-normal tracking-[0.25px] text-[#0e92ba]">
                    {title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-[22px] font-medium tracking-[0.3px] text-[#525252]">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-[30px] flex max-w-[1180px] items-center justify-center gap-2 text-center font-heading text-lg leading-[1.5] text-[#2b2b2b] tablet:text-xl">
            <Image src="/home/Monkey.svg" alt="" width={43} height={60} className="h-[60px] w-[43px] shrink-0 object-contain" />
            <span>No upfront payment is taken when you book. You will only get charged after each completed lesson.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
