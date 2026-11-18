import Image from "next/image";
import { FestiveButtonContent, festiveButtonClass } from "./festive-button-content";
import SeasonalMotion from "./SeasonalMotion";
import styles from "./ChristmasCtaBanner.module.css";

const ornaments = [
  { image: "christmas-bauble-2d.webp", width: 160, height: 160 },
  { image: "christmas-bells-2d.webp", width: 400, height: 400 },
  { image: "christmas-gift-2d.webp", width: 400, height: 400 },
];

export default function ChristmasCtaBanner() {
  return (
    <section className={styles.section} aria-labelledby="christmas-music-heading">
      <SeasonalMotion className={styles.banner}>
        <div className={styles.copy}>
          <h2 id="christmas-music-heading">Give your child <span>the gift of music</span></h2>
          <p>Learn a carol on three instruments this December.</p>
          <div className={styles.facts}>For children aged 5–11 <span aria-hidden="true">·</span> Beginners welcome</div>
          <div className={styles.action}>
            <a
              href="https://musecool.com/christmas26/#christmas-events"
              className={`muse-button ${festiveButtonClass} ${styles.cta}`}
              data-variant="hero"
            >
              <FestiveButtonContent>Book your date &amp; location</FestiveButtonContent>
            </a>
          </div>
        </div>

        <div className={styles.scene} aria-hidden="true">
          <span className={styles.moon} />
          <svg className={styles.stars} viewBox="0 0 480 360" fill="none" focusable="false">
            <g fill="currentColor"><circle cx="134" cy="35" r="2" /><circle cx="343" cy="104" r="2" /><circle cx="38" cy="211" r="2" /><circle cx="453" cy="74" r="2" /></g>
          </svg>
          <span className={styles.flightLane}>
            <span className={styles.flightRunner}><span className={styles.sleigh} /></span>
          </span>
          <div className={styles.ornaments}>
            {ornaments.map(({ image, width, height }, index) => (
              <span className={styles.ornament} data-position={index} key={image}>
                <span className={styles.thread} />
                <Image src={`/christmas/${image}`} alt="" width={width} height={height} sizes="44px" />
              </span>
            ))}
          </div>
          <Image
            className={styles.illustration}
            src="/christmas/christmas-corner-2d.webp"
            alt=""
            width={800}
            height={635}
            sizes="(max-width: 760px) calc(100vw - 60px), (max-width: 1150px) 44vw, 480px"
          />
        </div>
        <svg className={styles.snowbank} viewBox="0 0 1200 50" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 34C160 50 280 22 440 36S720 42 880 22S1090 38 1200 14V50H0Z" fill="currentColor" />
        </svg>
      </SeasonalMotion>
    </section>
  );
}
