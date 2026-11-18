"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Season = "christmas" | "halloween";
const SeasonContext = createContext<Season>("christmas");

export function useSeason() { return useContext(SeasonContext); }

export default function SeasonProvider({ season, children }: { season: Season; children: ReactNode }) {
  return <SeasonContext value={season}>{children}</SeasonContext>;
}
