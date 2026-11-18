import type { Region } from "./types";

export const footerContent = {
  uk: {
    homeHref: "/",
    description: "MuseCool offers the most comprehensive and personalized music education in London, blending expert teaching, innovative tech tools, an unmatched motivational student environment, and flexible solutions to nurture every student's musical journey from beginner to advanced levels.",
    address: "124 City Road, London EC1V 2NX",
    phone: { label: "0203 582 0699", href: "tel:02035820699" },
    copyright: "© 2026 MuseCool Ltd. All rights reserved. MuseCool is a London-based music school providing one-to-one instrumental lessons for children, available in-person and online.",
  },
  us: {
    homeHref: "/us",
    description: "MuseCool offers the most comprehensive and personalized music education in NYC, blending expert teaching, innovative tech tools, an unmatched motivational student environment, and flexible solutions to nurture every student's musical journey from beginner to advanced levels.",
    address: "228 Park Avenue South, New York, NY 10003 US",
    phone: { label: "929-388-7090", href: "tel:+19293887090" },
    copyright: "© 2026 MuseCool. All rights reserved. MuseCool provides 1-to-1 music lessons for children in NYC, in person and online.",
  },
} as const satisfies Record<Region, {
  homeHref: string;
  description: string;
  address: string;
  phone: { label: string; href: string };
  copyright: string;
}>;
