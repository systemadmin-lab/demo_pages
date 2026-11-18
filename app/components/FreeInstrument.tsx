import Image from "next/image";
import type { ReactNode } from "react";
import MusicDoodles from "@/app/components/MusicDoodles";

const benefits = [
  {
    title: "Instrument provided",
    description: "We purchase the instrument for you and deliver it to your home.",
  },
  {
    title: "Interest-free payment plan",
    description: "You can repay the cost in interest-free instalments over 3 months.",
  },
  {
    title: "Hassle-free start",
    description: "Begin playing immediately without the upfront cost.",
  },
] as const;

export default function FreeInstrument({
  title = "Free instrument for 1st month",
  introduction = "To help you start your musical journey, we offer a free instrument for the first month with select instruments, including piano keyboards, brass & woodwind instruments, guitars, and double basses.",
}: {
  title?: string;
  introduction?: ReactNode;
}) {
  return (
    <section
      className="bg-white px-5 pt-[30px] pb-[52px] tablet:px-8"
      aria-labelledby="free-instrument-heading"
    >
      <div className="relative mx-auto max-w-[1352px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#cff4ff_0%,#fff_100%)] px-5 pt-20 pb-24 tablet:px-8 desktop:px-5 desktop:py-[140px]">
        <MusicDoodles />

        <div className="relative grid items-center gap-10 desktop:grid-cols-2 desktop:gap-5">
          <div className="mx-auto flex w-full max-w-[540px] items-center py-6 desktop:max-w-none desktop:py-0">
            <div className="-mr-5 w-3/5 shrink-0 desktop:-mr-[60px]">
              <Image
                src="/home/FreeInstrument1.png"
                alt="Close-up of a musician playing the violin"
                width={359}
                height={359}
                sizes="(max-width: 760px) 60vw, 359px"
                className="mx-auto block h-auto max-w-full -rotate-10"
              />
            </div>
            <div className="w-2/5 shrink-0">
              <Image
                src="/home/FreeInstrument2.png"
                alt="A child learning to play the piano with a teacher"
                width={256}
                height={256}
                sizes="(max-width: 760px) 40vw, 256px"
                className="mx-auto block h-auto max-w-full rotate-[4.5deg]"
              />
            </div>
          </div>

          <div className="mx-auto w-full max-w-[640px] text-[#2b2b2b] desktop:max-w-none desktop:pt-7">
            <h2
              id="free-instrument-heading"
              className="font-heading text-[28px] leading-[1.4] font-normal tablet:text-[32px] wide:text-4xl"
            >
              {title}
            </h2>
            <p className="text-base leading-[1.55] wide:text-[17px]">
              {introduction}
            </p>
            <ul className="grid list-none gap-2 p-0 text-base leading-[1.55] wide:text-[17px]">
              {benefits.map(({ title, description }) => (
                <li key={title} className="flex items-start gap-1.5">
                  <Image
                    src="/home/download.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="mt-0.5 shrink-0"
                  />
                  <span><strong className="font-bold">{title}</strong> – {description}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-start gap-2.5 text-sm leading-[22px] tracking-[0.2px] text-[#525252] desktop:gap-[11px]">
              <Image
                src="/home/free-instrument/info.svg"
                alt=""
                width={20}
                height={20}
                className="mt-0.5 shrink-0"
              />
              <span>
                You can return the instrument for free within the 1st month, if you decide that it is not for you for any reason!
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
