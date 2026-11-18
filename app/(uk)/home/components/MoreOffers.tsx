import Image from "next/image";
import { TutorLink } from "./Hero";

type Offer = {
  title: string;
  image: string;
  alt: string;
  href: string;
  width: number;
  height: number;
  compactTitle?: boolean;
};

const featuredOffers: Offer[] = [
  {
    title: "Workshops and Concerts at Royal Academy of Music",
    image: "workshops-concerts.jpg",
    alt: "Young musicians holding their certificates at the Royal Academy of Music summer concert",
    href: "/workshops-concerts",
    width: 1536,
    height: 864,
    compactTitle: true,
  },
  {
    title: "Students’ Competition",
    image: "students-competition.jpg",
    alt: "A young violinist receiving applause after a performance",
    href: "https://musecool.com/uk/workshops/",
    width: 1536,
    height: 864,
  },
];

const additionalOffers: Offer[] = [
  {
    title: "ABRSM Exam Training",
    image: "exam-training.jpg",
    alt: "Music exams welcome sign outside an examination room",
    href: "/abrsm-exam-training",
    width: 464,
    height: 310,
  },
  {
    title: "MusicOnWheels Musical Bus for Children",
    image: "musiconwheels.jpg",
    alt: "The colourful MusicOnWheels double-decker music bus beside the Cutty Sark",
    href: "/musiconwheels",
    width: 464,
    height: 310,
  },
  {
    title: "Online Group Courses",
    image: "online-group-courses.jpg",
    alt: "A child wearing headphones and waving during an online lesson",
    href: "https://musecool.com/uk/online-group-courses/",
    width: 464,
    height: 310,
  },
];

function OfferCard({ offer, featured = false }: { offer: Offer; featured?: boolean }) {
  return (
    <a href={offer.href} className="group block min-w-0 rounded-[30px]">
      <figure>
        <div className="overflow-hidden rounded-[30px]">
          <Image
            src={`/home/offers/${offer.image}`}
            alt={offer.alt}
            width={offer.width}
            height={offer.height}
            sizes={featured
              ? "(max-width: 760px) calc(100vw - 40px), (max-width: 1392px) calc((100vw - 86px) / 2), 640px"
              : "(max-width: 760px) calc(100vw - 40px), (max-width: 1392px) calc((100vw - 120px) / 3), 418px"}
            className="block h-auto w-full transition-transform duration-300 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        </div>
        <figcaption className="mt-5 text-center tablet:mt-8">
          <h3 className={`text-base leading-7 font-bold text-[#1a0046] ${offer.compactTitle ? "" : "tablet:text-lg"}`}>
            {offer.title}
          </h3>
        </figcaption>
      </figure>
    </a>
  );
}

export default function MoreOffers() {
  return (
    <section className="bg-white px-5 pt-5 pb-5" aria-labelledby="more-offers-heading">
      <div className="mx-auto max-w-[1332px]">
        <h2
          id="more-offers-heading"
          className="mb-8 text-center font-heading text-[32px] leading-[1.25] font-normal tracking-[0.2px] text-[#1a0046] tablet:mb-11 tablet:text-[40px] tablet:leading-[50px] desktop:text-[55px] desktop:leading-[65px]"
        >
          More Of The Things We Offer
        </h2>
        <div className="mx-auto grid max-w-[640px] gap-10 tablet:max-w-[1326px] tablet:grid-cols-2 tablet:gap-[46px]">
          {featuredOffers.map((offer) => (
            <OfferCard key={offer.image} offer={offer} featured />
          ))}
        </div>
        <div className="mx-auto mt-10 grid max-w-[640px] gap-10 tablet:mt-12 tablet:max-w-none tablet:grid-cols-3">
          {additionalOffers.map((offer) => (
            <OfferCard key={offer.image} offer={offer} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <TutorLink variant="step" />
        </div>
      </div>
    </section>
  );
}
