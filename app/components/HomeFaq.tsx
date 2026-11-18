import FaqAccordion from "@/app/components/FaqAccordion";
import { TutorLink } from "./Hero";

const questions = [
  {
    id: "lesson-types",
    question: "What types of music lessons in London can I take, and are they personalized?",
    answer: "We provide lessons for a variety of instruments, including piano, guitar, violin, and drums. All our lessons are tailored to students of different ages and skill levels, whether you’re a beginner or an advanced player. In addition to one-on-one lessons, we also offer group workshops and specialized training for ABRSM exams. Lessons can take place at your home, online, or at select venues in London for your convenience.",
  },
  {
    id: "find-a-tutor",
    question: "How do I find the right music tutors near me for my learning goals?",
    answer: "Our service ensures that you are matched with the best tutor for your needs. After a brief consultation to discuss your musical preferences, experience, and goals, we carefully select a tutor who aligns with your requirements. You’ll receive their CV and references for review, and if you’re not satisfied after your first lesson, we offer a full refund for packages of four lessons or more.",
  },
  {
    id: "tutor-qualifications",
    question: "How experienced and qualified are music teachers in London?",
    answer: "Our tutors are highly experienced professionals, many of whom hold degrees from prestigious institutions like the Royal Academy of Music. All tutors undergo a rigorous selection process to ensure they meet our high standards. With 97% of students continuing with their recommended tutors after the first session, our team is proven to deliver exceptional results.",
  },
  {
    id: "studying-in-london",
    question: "What are the benefits of choosing to study music in London?",
    answer: "Studying music in London provides access to a vibrant cultural scene and world-class opportunities. With MuseCool, you can participate in workshops at prestigious venues like the Royal Academy of Music, compete in student competitions, and perform in concerts. Our flexible scheduling options and AI-powered teaching assistant ensure you make the most of your musical journey, whether you’re learning for fun or preparing for professional exams.",
  },
  {
    id: "what-makes-us-different",
    question: "What sets music tutors in London apart from others?",
    answer: "Music tutors in London are renowned for their expertise and ability to inspire students. At MuseCool, our tutors go beyond teaching technical skills—they create engaging, tailored lesson plans and use innovative methods to foster creativity and confidence. Whether it’s preparing for ABRSM exams or exploring new musical genres, our tutors ensure every lesson is both productive and enjoyable.",
  },
] as const;

export default function Faq() {
  return (
    <section className="bg-white px-5 pt-8 pb-5 tablet:pt-12" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="mb-6 text-center font-heading text-[30px] leading-[1.4] font-normal tracking-[0.3px] text-[#2b2b2b] tablet:text-4xl tablet:leading-[54px]"
      >
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-[840px]">
        <FaqAccordion questions={questions} name="home-faq" initiallyOpenId="find-a-tutor" />
      </div>
      <div className="mt-7 flex justify-center">
        <TutorLink variant="step" />
      </div>
    </section>
  );
}
