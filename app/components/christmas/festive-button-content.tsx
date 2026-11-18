import type { ReactNode } from "react";
import styles from "./festive-button-content.module.css";

export const festiveButtonClass = styles.button;

export function FestiveButtonContent({ children }: { children: ReactNode }) {
  return <>
    <span className={styles.label}>{children}</span>
    <span className={styles.track} aria-hidden="true">
      <span className={styles.journey}><span className={styles.sleigh}/></span>
    </span>
  </>;
}
