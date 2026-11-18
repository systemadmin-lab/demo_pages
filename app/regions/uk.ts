import type { RegionConfig } from "./types";
import { lessonPricing } from "./pricing";

export const ukRegion = {
  id: "uk",
  homeHref: "/",
  aboutHref: "/about-us",
  musicImportanceHref: "/why-music-is-important",
  testimonialsHref: "/testimonials",
  musicOnWheelsHref: "/musiconwheels",
  whatWeDoHref: "/what-we-do",
  privateLessonsAtHomeHref: "/private-lessons-at-home",
  privateLessonsOnlineHref: "/private-lessons-online",
  workshopsConcertsHref: "/workshops-concerts",
  onlineGroupCoursesHref: "/what-we-do#virtual-group-courses-heading",
  abrsmExamTrainingHref: "/abrsm-exam-training",
  eventsGalleryHref: "/events-gallery",
  privacyPolicyHref: "/privacy-policy",
  blogHref: "/blog",
  glossaryHref: "/glossary",
  podcastsHref: "/podcasts",
  phone: { label: "0203 582 0699", href: "tel:+442035820699" },
  email: { label: "info@musecool.com", href: "mailto:info@musecool.com" },
  headerCta: { label: "Meet your tutor", href: "/our-tutors" },
  tutorHref: "/our-tutors",
  hero: {
    title: "Learn music with MuseCool",
    images: [
      { src: "/homehero/New-banner-Sec.jpg", alt: "Young MuseCool student standing beside a piano after a performance" },
      { src: "/homehero/homeImg.jpg", alt: "Young MuseCool student playing the flute with sheet music" },
    ],
    stats: [
      { value: "1,500+", label: "verified tutors" },
      { value: "2,000+", label: "lessons monthly" },
    ],
    benefits: [
      "1-to-1 lessons - home or online",
      "Free instrument for the first month",
      `From £${lessonPricing.uk.online[0].price} online / £${lessonPricing.uk.inPerson[0].price} in person`,
      "DBS-checked, professional tutors",
    ],
    reassurance: "Have your first lesson and see how it goes - and only pay afterwards if you liked it.",
    testimonial: {
      quote: "The professionalism of the team is outstanding. My daughter has grown not only in skill but also in confidence.",
      author: "Oliver S, father of a 13-year-old daughter",
    },
    rating: { score: 4.5, count: 209 },
  },
} as const satisfies RegionConfig;
