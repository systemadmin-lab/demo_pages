"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import type { Region } from "../../regions/types";

const TutorEnquiryDialog = dynamic(() => import("./TutorEnquiryDialog"), { ssr: false });
const EnquiryContext = createContext<((trigger: HTMLElement) => void) | null>(null);

export function useTutorEnquiry() { return useContext(EnquiryContext); }

export default function TutorEnquiryProvider({ region, children }: { region: Region; children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const openEnquiry = useCallback((trigger: HTMLElement) => {
    returnFocus.current = trigger.closest("dialog")
      ? document.querySelector<HTMLButtonElement>('[aria-controls="site-navigation-dialog"]')
      : trigger;
    setLoaded(true);
    setOpen(true);
  }, []);
  const closeEnquiry = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus({ preventScroll: true });
  }, []);

  return (
    <EnquiryContext value={openEnquiry}>
      {children}
      {loaded && <TutorEnquiryDialog region={region} open={open} onClose={closeEnquiry} />}
    </EnquiryContext>
  );
}
