import Image from "next/image";
import { Ghost, WitchHat } from "./HalloweenArtwork";
import HalloweenBatFlights from "./HalloweenBatFlights";
import styles from "./HalloweenDecorations.module.css";

export function Pumpkin({ className, sizes = "100px" }: { className?: string; sizes?: string }) {
  return <Image src="/halloween/pumpkin.png" alt="" width={1374} height={1145} sizes={sizes} className={className} />;
}

export function HalloweenTrim() {
  return <div className={styles.trim} aria-hidden="true">
    {[0, 1].map(side => <svg key={side} className={side ? styles.webRight : styles.webLeft} viewBox="0 0 100 100" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M0 0v96M0 0l25 92M0 0l49 82M0 0l70 70M0 0l82 49M0 0l92 25M0 0h96" />
        <path d="M0 27q5-5 7-1 2-6 7-2 1-6 6-4 0-6 4-6-2-5 2-7-4-5 1-7M0 53q9-8 14-2 4-10 13-5 1-10 11-8-1-10 8-11-5-9 5-13-7-9 2-14M0 80q13-12 21-3 5-15 20-8 0-16 16-12-4-16 12-16-7-15 8-20-9-13 3-21" />
      </g>
    </svg>)}
  </div>;
}

export function HalloweenHeroDecorations() {
  return <div className={styles.hero}>
    <div aria-hidden="true">
      <Pumpkin className={`${styles.pumpkin} ${styles.heroPumpkinOne}`} />
      <Pumpkin className={`${styles.pumpkin} ${styles.heroPumpkinTwo}`} />
      <Pumpkin className={`${styles.pumpkin} ${styles.heroPumpkinThree}`} sizes="80px" />
      <Ghost className={styles.heroGhost} sizes="104px" />
      <WitchHat className={styles.heroHat} sizes="(max-width: 760px) 52px, 86px" />
    </div>
    <HalloweenBatFlights variant="hero" />
  </div>;
}
