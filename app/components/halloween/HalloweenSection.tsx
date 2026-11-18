import type { ReactNode } from "react";
import type { Season } from "../seasonal/SeasonProvider";
import { Pumpkin } from "./HalloweenDecorations";
import { Cobweb, Ghost, WitchHat } from "./HalloweenArtwork";
import HalloweenBat from "./HalloweenBat";
import HalloweenBatFlights from "./HalloweenBatFlights";
import styles from "./HalloweenSection.module.css";

type Touch = "ghost" | "hat" | "web" | "pumpkin";

export default function HalloweenSection({ children, season = "halloween", touch, side = "left", bats = false, night = false }: {
  children: ReactNode;
  season?: Season;
  touch: Touch;
  side?: "left" | "right";
  bats?: boolean;
  night?: boolean;
}) {
  if (season !== "halloween") return children;
  return <div className={styles.section} data-side={side} data-night={night} data-halloween-touch={touch}>
    <div className={styles.decoration} aria-hidden="true">
      <span className={styles.mainArt}>
        {touch === "ghost" && <Ghost />}
        {touch === "hat" && <WitchHat />}
        {touch === "web" && <Cobweb />}
        {touch === "pumpkin" && <Pumpkin sizes="70px" />}
      </span>
      <span className={styles.companion}>
        {touch === "ghost" || touch === "pumpkin" ? <WitchHat sizes="60px" /> : <Ghost sizes="60px" />}
      </span>
      {!bats && <span className={styles.perchedBat}><HalloweenBat /></span>}
    </div>
    {bats && <HalloweenBatFlights />}
    {children}
  </div>;
}
