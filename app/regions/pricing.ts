import type { Region } from "./types";

type LessonRate = { minutes: number; price: number };

export type LessonPricing = {
  currencySymbol: "£" | "$";
  online: readonly [LessonRate, LessonRate, LessonRate];
  inPerson: readonly [LessonRate, LessonRate, LessonRate];
};

export const lessonPricing = {
  uk: {
    currencySymbol: "£",
    online: [
      { minutes: 30, price: 17 },
      { minutes: 45, price: 22 },
      { minutes: 60, price: 28 },
    ],
    inPerson: [
      { minutes: 30, price: 44 },
      { minutes: 45, price: 52 },
      { minutes: 60, price: 59 },
    ],
  },
  us: {
    currencySymbol: "$",
    online: [
      { minutes: 30, price: 29 },
      { minutes: 45, price: 37 },
      { minutes: 60, price: 41 },
    ],
    inPerson: [
      { minutes: 30, price: 71 },
      { minutes: 45, price: 79 },
      { minutes: 60, price: 87 },
    ],
  },
} as const satisfies Record<Region, LessonPricing>;
