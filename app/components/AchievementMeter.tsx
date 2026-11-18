"use client";

import { useEffect, useRef } from "react";

export default function AchievementMeter({
  percentage,
  labelledBy,
  describedBy,
}: {
  percentage: number;
  labelledBy: string;
  describedBy: string;
}) {
  const meterRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const meter = meterRef.current;
    const fill = fillRef.current;
    const marker = markerRef.current;
    const number = numberRef.current;
    if (!meter || !fill || !marker || !number) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    let frame = 0;
    let startedAt: number | undefined;

    function display(value: number) {
      fill!.style.transform = `scaleX(${value / 100})`;
      marker!.style.transform = `translateX(max(47px, ${value}%))`;
      number!.textContent = `${Math.round(value)}%`;
    }

    function animate(timestamp: number) {
      startedAt ??= timestamp;
      const progress = Math.min((timestamp - startedAt) / 1400, 1);
      display(percentage * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.5 });

    function finishForReducedMotion() {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(frame);
      observer.disconnect();
      display(percentage);
    }

    display(0);
    observer.observe(meter);
    reducedMotion.addEventListener("change", finishForReducedMotion);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", finishForReducedMotion);
      display(percentage);
    };
  }, [percentage]);

  return (
    <div
      ref={meterRef}
      role="meter"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-valuetext={`${percentage}% of students`}
      className="relative h-[14px] w-full rounded-full bg-[#9ca3af]/30"
    >
      <div
        ref={fillRef}
        aria-hidden="true"
        className="absolute inset-0 origin-left rounded-full bg-[linear-gradient(97deg,#ff9800_0%,#f57c00_100%)]"
        style={{ transform: `scaleX(${percentage / 100})` }}
      />
      <div
        ref={markerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ transform: `translateX(max(47px, ${percentage}%))` }}
      >
        <span
          ref={numberRef}
          className="absolute top-[-40px] left-0 w-[47px] -translate-x-full rounded-md bg-[linear-gradient(97deg,#ff9800_0%,#f57c00_100%)] px-2 text-center text-sm leading-7 font-semibold text-white tabular-nums after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-x-[4.5px] after:border-t-8 after:border-x-transparent after:border-t-[#f57c00] after:content-['']"
        >
          {percentage}%
        </span>
      </div>
    </div>
  );
}
