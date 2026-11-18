"use client";

import { type CSSProperties, useSyncExternalStore } from "react";
import styles from "./snowfall.module.css";

// Fixed values keep the server render and hydration identical.
const flakes = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 41 + 7) % 100}%`,
  size: `${[16, 9, 11, 13][index % 4]}px`,
  duration: `${16 + ((index * 7) % 13)}s`,
  delay: `${-((index * 13 + 3) % 29)}s`,
  drift: `${index % 2 === 0 ? 28 : -34}px`,
  opacity: 0.3 + (index % 3) * 0.1,
}));

function subscribeToVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function getHiddenSnapshot() {
  return document.hidden;
}

function getServerHiddenSnapshot() {
  return false;
}

export default function Snowfall() {
  const tabHidden = useSyncExternalStore(
    subscribeToVisibility,
    getHiddenSnapshot,
    getServerHiddenSnapshot,
  );

  return (
    <div className={styles.root} data-page-hidden={tabHidden}>
      <div
        className={styles.flakes}
        data-paused={tabHidden}
        aria-hidden="true"
      >
        {flakes.map((flake, index) => (
          <span
            key={index}
            className={styles.flake}
            style={
              {
                "--flake-left": flake.left,
                "--flake-size": flake.size,
                "--flake-duration": flake.duration,
                "--flake-delay": flake.delay,
                "--flake-drift": flake.drift,
                "--flake-opacity": flake.opacity,
              } as CSSProperties
            }
          >
            <svg viewBox="0 0 20 20" fill="none" focusable="false">
              <path
                d="M10 1v18M2.2 5.5l15.6 9M2.2 14.5l15.6-9M7.5 3.5 10 6l2.5-2.5M7.5 16.5 10 14l2.5 2.5M3.1 9l3.4-.9-.9-3.4M14.4 15.3l-.9-3.4 3.4-.9M3.1 11l3.4.9-.9 3.4M14.4 4.7l-.9 3.4 3.4.9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
