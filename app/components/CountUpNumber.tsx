"use client";

import { useEffect, useRef } from "react";

export default function CountUpNumber({ value }: { value: number }) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const number = numberRef.current;
    if (!number) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    let frame = 0;
    let started = false;
    let startedAt: number | undefined;

    function display(current: number) {
      number!.textContent = String(Math.round(current));
    }

    function animate(timestamp: number) {
      startedAt ??= timestamp;
      const progress = Math.min((timestamp - startedAt) / 1400, 1);
      display(value * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver((entries) => {
      if (started || !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return;
      started = true;
      observer.disconnect();
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.5 });

    function finishForReducedMotion() {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(frame);
      observer.disconnect();
      display(value);
    }

    display(0);
    observer.observe(number);
    reducedMotion.addEventListener("change", finishForReducedMotion);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", finishForReducedMotion);
      display(value);
    };
  }, [value]);

  return (
    <span className="inline-grid">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">{value}</span>
      <span ref={numberRef} aria-hidden="true" className="col-start-1 row-start-1">{value}</span>
    </span>
  );
}
