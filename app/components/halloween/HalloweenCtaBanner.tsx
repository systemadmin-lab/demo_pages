import Image from "next/image";
import { TutorLink } from "../TutorLink";
import HalloweenBatFlights from "./HalloweenBatFlights";
import styles from "./HalloweenCtaBanner.module.css";

export default function HalloweenCtaBanner() {
  return <section className={styles.section} aria-labelledby="halloween-music-heading">
    <div className={styles.banner}>
      <div className={styles.copy}>
        <h2 id="halloween-music-heading">Treat them to <span>the joy of music.</span></h2>
        <p>Make this Halloween a little more musical with one-to-one lessons at home or online.</p>
        <div className={styles.action}><TutorLink>Find your tutor</TutorLink></div>
      </div>
      <div className={styles.scene} aria-hidden="true">
        <Image className={styles.artwork} src="/halloween/moon-house.png" alt="" width={1448} height={1086} sizes="(max-width: 760px) 500px, 660px" />
        <HalloweenBatFlights variant="banner" />
      </div>
    </div>
  </section>;
}
