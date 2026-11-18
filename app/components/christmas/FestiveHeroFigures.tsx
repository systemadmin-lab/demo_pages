import type { CSSProperties } from "react";
import SeasonalMotion from "./SeasonalMotion";
import styles from "./FestiveHeroFigures.module.css";

type Figure = {
  frame: number;
  height: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};
type FigureStyle = CSSProperties & { "--frame": string; "--delay": string };

// Five Santa-hat musicians from the original Christmas artwork atlas.
const desktopFigures: Figure[] = [
  { frame: 0, left: "14%", top: "0px", height: 98 },
  { frame: 1, left: "22%", top: "0px", height: 98 },
  { frame: 2, left: "50%", top: "8px", height: 92 },
  { frame: 4, left: "69%", top: "-4px", height: 98 },
  { frame: 3, right: "7%", top: "0px", height: 92 },
  { frame: 0, right: "0px", top: "0px", height: 94 },
  { frame: 2, left: "0px", bottom: "42px", height: 108 },
  { frame: 1, left: "10%", bottom: "50px", height: 98 },
  { frame: 4, left: "26%", bottom: "34px", height: 80 },
  { frame: 3, left: "36%", bottom: "26px", height: 98 },
  { frame: 0, left: "51%", bottom: "37px", height: 110 },
];

const mobileFigures: Figure[] = [
  { frame: 0, right: "20px", top: "-20px", height: 74 },
  { frame: 1, left: "20px", bottom: "36px", height: 74 },
  { frame: 4, right: "42%", bottom: "36px", height: 60 },
  { frame: 3, right: "16px", bottom: "32px", height: 74 },
];

function Figures({ figures }: { figures: Figure[] }) {
  return figures.map(({ frame, height, ...position }, index) => {
    const style: FigureStyle = {
      ...position,
      height,
      width: height * 0.6,
      "--frame": `${frame * 25}%`,
      "--delay": `${index * -0.7}s`,
    };
    return (
      <span key={index} className={styles.figure} data-bottom={Boolean(position.bottom)} style={style}>
        <span className={styles.musician} />
      </span>
    );
  });
}

export default function FestiveHeroFigures() {
  return (
    <SeasonalMotion className={styles.root}>
      <div className={styles.desktop} aria-hidden="true"><Figures figures={desktopFigures} /></div>
      <div className={styles.mobile} aria-hidden="true"><Figures figures={mobileFigures} /></div>
    </SeasonalMotion>
  );
}
