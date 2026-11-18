import Image from "next/image";
import MuseVideo from "@/app/components/MuseVideo";
import { TutorLink } from "./Hero";

const videoPath = "/home/The-Muse-Presentation-1.mp4";

const benefits = [
  "Our proprietary, patent-pending, world's first lesson understanding technology!",
  "Your child’s home practice is based directly on what their tutor worked on in the lesson, so they always know exactly what to focus on.",
  "Short, structured musical tasks keep things moving during the week, without turning practice into pressure.",
  "You can see clear first-of-the-kind progress stats and updates, to inform your learning decisions",
  "Tricky sections are broken down into manageable steps, helping your child feel capable instead of overwhelmed.",
] as const;

// Original blue illustrations extracted from this section of the saved homepage.
const decorations = [
  { image: "drummer", size: 98, position: "top-4 left-0 desktop:top-16" },
  { image: "microphone", size: 108, position: "top-16 left-16 hidden desktop:block" },
  { image: "guitar", size: 98, position: "top-4 right-0 desktop:top-16" },
  { image: "singer", size: 98, position: "top-[15%] right-16 hidden desktop:block" },
  { image: "reader", size: 124, position: "top-16 left-1/2 hidden desktop:block" },
  { image: "maracas", size: 98, position: "top-16 left-3/4 hidden desktop:block" },
  { image: "maracas-bottom", size: 120, position: "-bottom-2 left-0" },
  { image: "family", size: 150, position: "right-0 bottom-0" },
] as const;

export default function TheMuse() {
  return (
    <section className="bg-white px-5 pb-6" aria-labelledby="the-muse-heading">
      <div className="relative mx-auto max-w-[1352px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#cff4ff_0%,#fff_100%)] px-5 pt-20 pb-28 tablet:px-10 desktop:pt-[126px] desktop:pr-12 desktop:pl-[78px]">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          {decorations.map(({ image, size, position }) => (
            <Image
              key={image}
              src={`/home/the-muse/${image}.svg`}
              alt=""
              width={size}
              height={size}
              className={`absolute ${position}`}
            />
          ))}
        </div>

        <div className="relative grid items-center gap-10 desktop:grid-cols-[0.9fr_1fr] desktop:gap-[60px]">
          <MuseVideo
            src={videoPath}
            poster="/home/the-muse/poster.jpg"
            width={720}
            height={1280}
            label="The Muse: music learning and home practice presentation"
            className="mx-auto block aspect-[9/16] h-auto w-full max-w-[420px] rounded-xl bg-[#1b7d91] object-contain desktop:max-w-none"
          />
          <div className="mx-auto w-full max-w-[640px] text-base leading-[26px] text-[#545454] tablet:text-lg tablet:leading-7 desktop:max-w-none">
            <h2
              id="the-muse-heading"
              className="mb-6 text-center font-heading text-[28px] leading-10 font-normal text-[#2b2b2b] tablet:mb-8 tablet:text-[32px]"
            >
              The Muse - To The Future And Beyond
            </h2>
            <p className="mb-8">
              At MuseCool, lessons don’t end when your child walks out of the room.
              The Muse quietly supports the learning that happens at home - so practice feels clearer, more structured, and far less of a struggle.
            </p>
            <ul className="grid list-none gap-4 p-0">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-0.5">
                  <Image
                    src="/home/download.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="mt-0.5 shrink-0"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center desktop:justify-start">
              <TutorLink />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
