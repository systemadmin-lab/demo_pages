"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Keep decorative loops idle until their section is visible. */
export default function SeasonalMotion({ children, className }: { children: ReactNode; className: string }) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!element.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(element.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={element} className={className} data-animate={visible}>{children}</div>;
}
