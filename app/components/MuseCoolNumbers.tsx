import Image from "next/image";
import CountUpNumber from "./CountUpNumber";

const statistics = [
  { value: 90000, label: "1on1 lessons delivered" },
  { value: 3000, label: "Students taught in London" },
  { value: 300, label: "MuseCool tutors" },
] as const;

export default function MuseCoolNumbers() {
  return (
    <section className="bg-white px-5 pt-5 pb-14 tablet:px-[30px]" aria-labelledby="numbers-heading">
      <h2
        id="numbers-heading"
        className="mb-[30px] text-center font-heading text-[30px] leading-[54px] font-normal tracking-[0.3px] text-[#2b2b2b] tablet:text-4xl"
      >
        MuseCool in Numbers
      </h2>
      <div className="relative isolate overflow-hidden rounded-xl bg-[#465b65] py-12 tablet:py-24">
        <Image
          src="/home/numbers/piano-concert.jpg"
          alt=""
          fill
          sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 60px)"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[#465b65]/70" aria-hidden="true" />
        <dl className="mx-auto grid max-w-[1352px] gap-10 px-4 text-center text-white tablet:grid-cols-3 tablet:gap-[30px] tablet:text-left">
          {statistics.map(({ value, label }) => (
            <div key={label} className="flex min-w-0 flex-col">
              <dt className="order-2 text-lg leading-7 tablet:text-xl tablet:leading-8 desktop:text-2xl">
                {label}
              </dt>
              <dd className="order-1 mb-4 whitespace-nowrap text-[50px] leading-[60px] font-medium tabular-nums tablet:text-[60px] tablet:leading-[74px] desktop:text-[85px] desktop:leading-[94px]">
                <CountUpNumber value={value} /><span className="text-4xl desktop:text-[60px]">+</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
