import styles from "./desktop-christmas-trim.module.css";

const lights = Array.from({ length: 20 }, (_, index) => {
  const progress = ((index % 5) + 0.5) / 5;
  return {
    x: Math.floor(index / 5) * 400 + progress * 400,
    y: 2 + 20 * progress * (1 - progress),
  };
});

export default function DesktopChristmasTrim() {
  return <div className={styles.trim} aria-hidden="true" data-desktop-christmas-trim>
    <span className={styles.left} />
    <span className={styles.right} />
    <svg className={styles.lights} viewBox="0 0 1600 18" preserveAspectRatio="none" fill="none" focusable="false">
      <path d="M0 2Q200 12 400 2Q600 12 800 2Q1000 12 1200 2Q1400 12 1600 2" stroke="#b68c48" strokeOpacity=".65" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {lights.map((light, index) => <g key={index}>
        <path d={`M${light.x} ${light.y}v2`} stroke="#b68c48" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <ellipse cx={light.x} cy={light.y + 4} rx="3.3" ry="3.2" fill="#fff8dc" stroke="#d7aa55" strokeWidth="1" />
      </g>)}
    </svg>
  </div>;
}
