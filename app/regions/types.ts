export type Region = "uk" | "us";

export type RegionConfig = {
  id: Region;
  homeHref: string;
  aboutHref: string;
  musicImportanceHref: string;
  testimonialsHref: string;
  musicOnWheelsHref: string;
  whatWeDoHref: string;
  privateLessonsAtHomeHref: string;
  privateLessonsOnlineHref: string;
  workshopsConcertsHref: string;
  onlineGroupCoursesHref: string;
  abrsmExamTrainingHref: string;
  eventsGalleryHref: string;
  privacyPolicyHref: string;
  blogHref: string;
  glossaryHref: string;
  podcastsHref: string;
  phone: { label: string; href: string };
  email: { label: string; href: string };
  headerCta: { label: string; href: string };
  tutorHref: string;
  hero: {
    title: string;
    images: readonly [{ src: string; alt: string }, { src: string; alt: string }];
    stats: readonly { value: string; label: string }[];
    benefits: readonly string[];
    reassurance: string;
    testimonial: { quote: string; author: string };
    rating: { score: number; count: number };
  };
};
