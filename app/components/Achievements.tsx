import Image from "next/image";
import AchievementMeter from "./AchievementMeter";

const achievements = [
  {
    id: "right-tutor",
    title: "The Right Tutor",
    description: "97% of our students continue with their recommended tutors after the first session.",
    percentage: 97,
  },
  {
    id: "play-well",
    title: "Learn To Play Well",
    description: "92% of our students who take ABRSM exams pass with Merit or Distinction",
    percentage: 92,
  },
] as const;

// These three pricing illustrations have identical SVG paths in this section.
// The remaining original illustrations live in the achievements asset folder.
const decorations = [
  { src: "/home/pricing/guitar.svg", size: 98, position: "top-4 left-0 w-[74px] desktop:top-16 desktop:w-[98px]" },
  { src: "/home/achievements/ukulele.svg", size: 110, position: "top-16 left-16 hidden desktop:block" },
  { src: "/home/achievements/family.svg", size: 98, position: "top-4 right-0 w-[74px] desktop:top-16 desktop:w-[98px]" },
  { src: "/home/achievements/maracas.svg", size: 98, position: "top-[15%] right-20 hidden desktop:block" },
  { src: "/home/achievements/saxophone.svg", size: 80, position: "top-16 left-3/4 hidden desktop:block" },
  { src: "/home/pricing/reader.svg", size: 112, position: "-bottom-2 left-0 w-[84px] desktop:w-[112px]" },
  { src: "/home/pricing/singer.svg", size: 98, position: "right-0 bottom-0 w-[74px] desktop:w-[98px]" },
] as const;

function Achievement({ achievement }: { achievement: (typeof achievements)[number] }) {
  return (
    <div>
      <h3
        id={`${achievement.id}-heading`}
        className="mb-5 text-lg leading-[26px] font-bold text-[#525252]"
      >
        {achievement.title}
      </h3>
      <p
        id={`${achievement.id}-description`}
        className="mb-12 text-base leading-6 text-[#525252] tablet:mb-5 tablet:w-3/4"
      >
        {achievement.description}
      </p>
      <AchievementMeter
        percentage={achievement.percentage}
        labelledBy={`${achievement.id}-heading`}
        describedBy={`${achievement.id}-description`}
      />
    </div>
  );
}

export default function Achievements() {
  return (
    <section className="bg-white px-5 pt-3 pb-8" aria-labelledby="achievements-heading">
      <div className="relative mx-auto max-w-[1352px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#ffefdb_0%,#fff_100%)] px-5 pt-24 pb-28 tablet:px-10 desktop:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          {decorations.map(({ src, size, position }) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={size}
              height={size}
              className={`absolute h-auto ${position}`}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-[1130px]">
          <h2
            id="achievements-heading"
            className="mb-8 text-center font-heading text-2xl leading-9 font-normal text-[#2b2b2b] tablet:mb-5 tablet:leading-[50px]"
          >
            We Are Good At What We Do
          </h2>
          <div className="grid gap-10 tablet:gap-8">
            {achievements.map((achievement) => (
              <Achievement key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
