import type { CSSProperties } from "react";
import { BAT_BODY, wingPath, wingPoseStyles } from "./batMotion";
import styles from "./HalloweenBat.module.css";

/** Three-quarter side profile: the nose points along the flight path. */
export default function HalloweenBat({ className, driven = false }: { className?: string; driven?: boolean }) {
  return <svg className={`${styles.bat} ${className ?? ""}`} data-driven={driven} viewBox="0 0 100 80" fill="currentColor" aria-hidden="true" focusable="false">
    <path className={styles.farWing} data-bat-wing="far" d={wingPath(0, true)} style={wingPoseStyles(true) as CSSProperties} />
    <g data-bat-body><path d={BAT_BODY} /></g>
    <path className={styles.nearWing} data-bat-wing="near" d={wingPath(0)} style={wingPoseStyles(false) as CSSProperties} />
  </svg>;
}
