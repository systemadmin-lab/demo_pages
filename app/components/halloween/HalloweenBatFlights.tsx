"use client";

import { useEffect, useRef } from "react";
import HalloweenBat from "./HalloweenBat";
import { flapPhase, flightPose, glideAmount, wingPath } from "./batMotion";
import styles from "./HalloweenBatFlights.module.css";

type Variant = "hero" | "banner" | "section";

export default function HalloweenBatFlights({ variant = "section" }: { variant?: Variant }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const planes = Array.from(element.querySelectorAll<HTMLSpanElement>("[data-flight]")).map(plane => ({
      plane,
      near: plane.querySelector<SVGPathElement>('[data-bat-wing="near"]')!,
      far: plane.querySelector<SVGPathElement>('[data-bat-wing="far"]')!,
      body: plane.querySelector<SVGGElement>("[data-bat-body]")!,
      size: 65,
    }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let width = element.clientWidth;
    let height = element.clientHeight;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;

    const resizePlanes = () => planes.forEach((bat, index) => {
      bat.size = (variant === "section" ? 42 : variant === "banner" ? 72 : 65) * (index === 0 ? 1 : index === 1 ? .78 : .55) * (width < 600 ? .8 : 1);
      bat.plane.style.width = `${bat.size}px`;
    });
    resizePlanes();

    const draw = (now: number) => {
      elapsed += previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      planes.forEach(({ plane, near, far, body, size }, index) => {
        if (index === 2 && width < 600) { plane.style.opacity = "0"; return; }
        const duration = Math.max(4.2, width / (145 - index * 23));
        const cycle = duration + 1.8 + index * .7;
        const clock = elapsed + [duration * .2, duration * .62, duration * .86][index];
        const pass = Math.floor(clock / cycle);
        const time = clock % cycle;
        if (time > duration) { plane.style.opacity = "0"; return; }
        const progress = time / duration;
        const pose = flightPose(progress, width, height, index, pass);
        const phase = flapPhase(elapsed, index);
        const glide = glideAmount(elapsed, index);
        plane.style.opacity = String(index === 2 ? .45 : .85);
        plane.style.transform = `translate3d(${pose.x - size / 2}px,${pose.y - size * .4}px,0) rotate(${pose.angle}deg) scaleX(${pose.direction})`;
        near.setAttribute("d", wingPath(phase, false, glide));
        far.setAttribute("d", wingPath(phase, true, glide));
        body.setAttribute("transform", `translate(0 ${(.35 * Math.sin(phase * Math.PI * 2) * (1 - glide)).toFixed(2)})`);
      });
      frame = requestAnimationFrame(draw);
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden && !reduced.matches && width > 0 && height > 0) frame = requestAnimationFrame(draw);
      if (reduced.matches) planes.forEach(({ plane }) => { plane.style.opacity = "0"; });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .05 });
    const resize = new ResizeObserver(([entry]) => { width = entry.contentRect.width; height = entry.contentRect.height; resizePlanes(); sync(); });
    observer.observe(element);
    resize.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [variant]);

  return <div ref={root} className={`${styles.flights} ${styles[variant]}`} aria-hidden="true">
    {[0, 1, 2].map(index => <span key={index} className={styles.bat} data-flight={index}><HalloweenBat driven /></span>)}
  </div>;
}
