import type { RegionConfig } from "./types";
import { lessonPricing } from "./pricing";

export const usRegion = {
  id: "us",
  homeHref: "/us",
  aboutHref: "/us/about-us",
  musicImportanceHref: "/us/why-music-is-important",
  testimonialsHref: "/us/testimonials",
  musicOnWheelsHref: "/us/musiconwheels",
  whatWeDoHref: "/us/what-we-do",
  privateLessonsAtHomeHref: "/us/private-lessons-at-home",
  privateLessonsOnlineHref: "/us/private-lessons-online",
  workshopsConcertsHref: "/us/workshops-concerts",
  onlineGroupCoursesHref: "/us/online-group-courses",
  abrsmExamTrainingHref: "/us/abrsm-exam-training",
  eventsGalleryHref: "/us/events-gallery",
  privacyPolicyHref: "/us/privacy-policy",
  blogHref: "/us/blog",
  glossaryHref: "/us/glossary",
  podcastsHref: "/us/podcasts",
  phone: { label: "+1 929-388-7090", href: "tel:+19293887090" },
  email: { label: "info@musecool.com", href: "mailto:info@musecool.com" },
  headerCta: { label: "Start with a trial lesson", href: "/us/our-tutors" },
  tutorHref: "/us/our-tutors",
  hero: {
    title: "Music Lessons in New York",
    images: [
      { src: "/homehero/New-banner-Sec.jpg", alt: "Young MuseCool student standing beside a piano after a performance" },
      { src: "/us/home/hero.webp", alt: "MuseCool student playing an acoustic guitar at a concert" },
    ],
    stats: [
      { value: "1,500+", label: "verified tutors" },
      { value: "2,000+", label: "lessons monthly" },
    ],
    benefits: [
      "1-to-1 lessons - home or online",
      "Free instrument for the first month",
      `From $${lessonPricing.us.online[0].price} online / $${lessonPricing.us.inPerson[0].price} in person`,
      "Background-checked, professional tutors",
    ],
    reassurance: "Have your first lesson and see how it goes - and only pay afterwards if you liked it.",
    testimonial: {
      quote: "The lessons are engaging, flexible, and perfectly suited to my daughter’s pace. We couldn't have asked for a better experience.",
      author: "Michael H, father of an 11-year-old daughter",
    },
    rating: { score: 5, count: 68 },
  },
} as const satisfies RegionConfig;
