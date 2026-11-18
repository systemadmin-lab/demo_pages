"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import styles from "./HalloweenAtmosphere.module.css";

function subscribe(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const getHidden = () => document.hidden;
const getServerHidden = () => false;
const motes = Array.from({ length: 12 }, (_, i) => ({
  "--x": `${(i * 37 + 11) % 100}%`,
  "--duration": `${20 + (i * 3) % 14}s`,
  "--delay": `${-i * 2.3}s`,
}));

export default function HalloweenAtmosphere() {
  const hidden = useSyncExternalStore(subscribe, getHidden, getServerHidden);
  return <div className={styles.root} data-page-hidden={hidden} aria-hidden="true">
    {motes.map((style, index) => <span className={styles.mote} key={index} style={style as CSSProperties} />)}
  </div>;
}
