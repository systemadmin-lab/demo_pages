import Image from "next/image";

// Original illustrations shared by the Home and FAQ panels.
const decorations = [
  { image: "accordion", size: 110, position: "top-3 left-0 desktop:top-20 desktop:left-5" },
  { image: "singer", size: 98, position: "top-20 left-[100px] hidden desktop:block" },
  { image: "maracas", size: 98, position: "top-[60px] left-[30%] hidden desktop:block" },
  { image: "saxophone", size: 80, position: "top-[60px] left-[35%] hidden desktop:block" },
  { image: "ukulele", size: 110, position: "top-0 right-0 desktop:top-10 desktop:right-[60px]" },
  { image: "maracas", size: 98, position: "bottom-10 left-5 hidden desktop:block" },
  { image: "saxophone", size: 80, position: "bottom-[60px] left-[100px] hidden desktop:block" },
  { image: "ukulele", size: 110, position: "bottom-[60px] left-40 hidden desktop:block" },
  { image: "maracas", size: 98, position: "bottom-[70px] left-1/4 hidden desktop:block" },
  { image: "saxophone", size: 80, position: "bottom-[100px] left-[30%] hidden desktop:block" },
  { image: "family", size: 98, position: "right-2 bottom-0 desktop:right-[25px] desktop:bottom-[70px]" },
] as const;

export default function MusicDoodles({ tone = "blue" }: { tone?: "blue" | "peach" }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {decorations.map(({ image, size, position }, index) => (
        <Image
          key={`${image}-${index}`}
          src={tone === "peach"
            ? `/home/pricing/${image === "ukulele" ? "guitar" : image}.svg`
            : `/home/free-instrument/${image}.svg`}
          alt=""
          width={size}
          height={size}
          className={`absolute ${position}`}
        />
      ))}
    </div>
  );
}
