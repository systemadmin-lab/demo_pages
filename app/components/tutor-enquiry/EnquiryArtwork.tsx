import Image from "next/image";
import styles from "./TutorEnquiry.module.css";

const introductions = [
  { title: "Let’s get started", description: <>We will recommend you our <strong>most inspiring</strong> tutor for <strong>your needs</strong></> },
  { title: "Student profile", description: <>Answer a few questions to be matched with your best-fit tutor</> },
  { title: "Choose the instrument", description: <>No instrument yet? We’ll help with that.</> },
  { title: "Almost there", description: <>Tell us more about your goals and specific situation, so that we can really tailor the experience for your needs</> },
];

export default function EnquiryArtwork({ step }: { step: number }) {
  const introduction = introductions[step - 1];
  return (
    <aside className={styles.artwork} aria-hidden="true">
      <div className={styles.introduction}>
        <p className={styles.artworkTitle}>{introduction.title}</p>
        <p>{introduction.description}</p>
      </div>
      <Image src="/tutor-enquiry/monkey.svg" alt="" width={250} height={220} className={styles.monkey} />
      <div className={styles.photos}>
        {[1, 2, 3, 4].map((number) => (
          <div key={number} className={styles.photo}>
            <Image src={`/tutor-enquiry/student-${number}.webp`} alt="" width={150} height={150} sizes="150px" />
            <span className={styles.photoNote}>{number % 2 ? "♫" : "♪"}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
