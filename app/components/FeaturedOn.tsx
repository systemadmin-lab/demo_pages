import Image from "next/image";

const publications = [
  { name: "Forbes", src: "/home/featre-2.svg", width: 200, height: 54 },
  { name: "BBC Radio London", src: "/home/featre-1.png", width: 1920, height: 634 },
  { name: "Classic FM", src: "/home/feature-3.svg", width: 471.68, height: 107.468 },
  { name: "Tech.eu", src: "/home/techeu-svg.svg", width: 250, height: 187 },
] as const;

const publicationsWithStrad = [
  publications[0],
  publications[2],
  publications[1],
  { name: "The Strad", src: "/images/publications/the-strad.png", width: 1400, height: 1050 },
  publications[3],
] as const;

export default function FeaturedOn({
  showLessonsHeading = true,
  includeStrad = false,
  headingTone = "default",
}: {
  showLessonsHeading?: boolean;
  includeStrad?: boolean;
  headingTone?: "default" | "purple";
}) {
  const FeaturedHeading = showLessonsHeading ? "h3" : "h2";
  const logos = includeStrad ? publicationsWithStrad : publications;

  return (
    <section
      className="bg-white px-6 pt-4 pb-8 text-center tablet:pt-[25px]"
      aria-labelledby={showLessonsHeading ? "lessons-heading" : "featured-heading"}
    >
      <div className="mx-auto max-w-[1260px]">
        {showLessonsHeading && <h2
          id="lessons-heading"
          className="m-0 font-heading text-[30px] leading-[1.4] font-normal text-[#292929] tablet:text-4xl"
        >
          Music Lessons in London
        </h2>}
        <FeaturedHeading
          id="featured-heading"
          className={`font-heading text-[30px] leading-[1.4] font-normal ${headingTone === "purple" ? "text-[#1a0046]" : "text-[#292929]"} tablet:text-4xl ${showLessonsHeading ? "mt-8 tablet:mt-11" : ""}`}
        >
          As Featured On
        </FeaturedHeading>
        <ul
          className={includeStrad
            ? "mx-auto mt-6 grid w-full max-w-[1100px] list-none grid-cols-2 items-center justify-center gap-x-8 gap-y-6 p-0 tablet:grid-cols-5"
            : "mx-auto mt-6 grid w-fit list-none grid-cols-2 items-center justify-center gap-x-8 gap-y-6 p-0 tablet:flex tablet:gap-10"}
          aria-labelledby="featured-heading"
        >
          {logos.map(({ name, src, width, height }) => (
            <li key={name} className={includeStrad
              ? "flex w-full max-w-[160px] items-center justify-center justify-self-center last:col-span-2 tablet:last:col-span-1"
              : "flex w-[120px] items-center justify-center"}>
              <Image
                src={src}
                alt={name}
                width={width}
                height={height}
                sizes={includeStrad ? "(max-width: 430px) 135px, 160px" : "120px"}
                className={includeStrad ? "block h-auto w-full" : "block h-auto w-[120px]"}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
