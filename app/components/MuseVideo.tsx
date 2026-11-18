"use client";

import { useEffect, useRef } from "react";

type MuseVideoProps = {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  className: string;
  controls?: boolean;
};

export default function MuseVideo({ src, poster, width, height, label, className, controls = true }: MuseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let userPaused = false;

    const rememberPause = () => {
      if (inView) userPaused = true;
    };
    const rememberPlay = () => { userPaused = false; };
    const playWhenVisible = () => {
      if (inView && !reducedMotion.matches && !userPaused) {
        // Keep the poster visible if the browser blocks autoplay.
        void video.play().catch(() => {});
      }
    };
    const handleMotionPreference = () => {
      if (reducedMotion.matches) video.pause();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) playWhenVisible();
      else video.pause();
    }, { threshold: 0.1 });

    video.addEventListener("pause", rememberPause);
    video.addEventListener("play", rememberPlay);
    reducedMotion.addEventListener("change", handleMotionPreference);
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", rememberPause);
      video.removeEventListener("play", rememberPlay);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      controls={controls}
      disablePictureInPicture={!controls}
      preload="none"
      aria-label={label}
      className={className}
    >
      Your browser does not support this video. <a href={src}>Watch {label}</a>.
    </video>
  );
}
