import Image from "next/image";
import { TutorLink } from "./Hero";

const steps = [
  {
    number: 1,
    description: "Tell us your goals, level, and any preferences or specific needs:",
    blueIcon: { width: 63, height: 62 },
    orangeIcon: { width: 57, height: 57 },
  },
  {
    number: 2,
    description: "We’ll offer a fitting tutor. Review their profile and secure your lessons with payment.",
    blueIcon: { width: 62, height: 63 },
    orangeIcon: { width: 57, height: 56 },
  },
  {
    number: 3,
    description: "We’ll do a quick 10–15-minute call to finalise the schedule and logistics, and arrange an instrument if needed.",
    blueIcon: { width: 62, height: 63 },
    orangeIcon: { width: 57, height: 56 },
  },
  {
    number: 4,
    description: "No upfront payment is taken when you book. You will only get charged after each completed lesson.",
    blueIcon: { width: 62, height: 63 },
    orangeIcon: { width: 57, height: 56 },
  },
] as const;

const assetPath = "/home/how-it-works";

export default function HowItWorks({ tutorHref }: { tutorHref?: string }) {
  return (
    <section
      className="bg-white px-5 pt-5 pb-9 tablet:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-[1332px]">
        <h2
          id="how-it-works-heading"
          className="text-center font-heading text-[30px] leading-[50px] font-normal tracking-[0.2px] text-black tablet:text-4xl"
        >
          How it works
        </h2>
        <ol className="mx-auto mt-12 grid max-w-[420px] list-none gap-8 p-0 tablet:mt-[68px] tablet:max-w-none tablet:grid-cols-2 tablet:gap-x-5 tablet:gap-y-12 desktop:grid-cols-4 desktop:gap-5">
          {steps.map(({ number, description, blueIcon, orangeIcon }) => (
            <li
              key={number}
              className="relative flex min-h-[400px] min-w-0 flex-col items-center rounded-[40px] border border-[#71c8bc] bg-white px-5"
            >
              {number < steps.length && (
                <Image
                  src={`${assetPath}/arrow.svg`}
                  alt=""
                  width={100}
                  height={36}
                  className={`pointer-events-none absolute -top-5 -right-[70px] z-10 hidden ${number === 2 ? "desktop:block" : "tablet:block"}`}
                />
              )}

              <div className="mt-[30px] flex items-center justify-center" aria-hidden="true">
                <div className="flex w-[100px] shrink-0 -rotate-20 items-center justify-center rounded-[20px] bg-[#cff4ff] p-2.5">
                  <Image
                    src={`${assetPath}/step-${number}-blue.svg`}
                    alt=""
                    width={blueIcon.width}
                    height={blueIcon.height}
                    className="block h-auto"
                  />
                </div>
                <div className="relative mt-2.5 -ml-3 flex w-[100px] shrink-0 rotate-10 items-center justify-center rounded-[20px] border-2 border-white bg-[#ffefdb] p-2.5">
                  <Image
                    src={`${assetPath}/step-${number}-orange.svg`}
                    alt=""
                    width={orangeIcon.width}
                    height={orangeIcon.height}
                    className="block h-auto"
                  />
                </div>
              </div>

              <div className="mt-5 flex min-h-[250px] w-full flex-col items-center justify-center text-center">
                <h3 className="font-heading text-xl leading-8 font-normal tracking-[0.2px] text-[#0e92ba]">
                  Step {number}
                </h3>
                <p className="py-5 text-base leading-[22px] text-[#525252]">
                  {description}
                </p>
                {number === 1 && <TutorLink variant="step" href={tutorHref} />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
