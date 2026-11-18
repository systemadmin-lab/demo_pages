import type { ReactNode } from "react";
import HalloweenBat from "./HalloweenBat";
import styles from "./HalloweenButtonContent.module.css";

export const halloweenButtonClass = styles.button;

export default function HalloweenButtonContent({ children }: { children: ReactNode }) {
  return <>
    <span className={styles.label}>{children}</span>
    <span className={styles.track} aria-hidden="true">
      <span className={styles.journey}><HalloweenBat className={styles.bat} /></span>
    </span>
  </>;
}
