import type { Region } from "../../regions/types";

export const experiences = ["No experience", "Early beginner", "Intermediate", "Proficient"] as const;
export const mainInstruments = ["Piano", "Violin", "Guitar", "Singing", "Flute"] as const;
export const otherInstruments = ["Ukulele", "Cello", "Clarinet", "Drum Kit", "Saxophone", "Trumpet", "Other"] as const;
export const goals = ["Unlock musical talent", "Love music from day one", "Perform on stage", "Build focus & discipline"] as const;
export const musicalDreams = ["Play favorite song", "Perform with friends", "Music for stress relief", "Get back to playing"] as const;
export type InquiryId = string | number;

export function getGoals(age: string): readonly string[] {
  return Number(age) > 14 ? musicalDreams : goals;
}

export type EnquiryDraft = {
  email: string;
  lessonFor: "child" | "myself";
  lessonType: "home" | "online" | "not_sure";
  privacyAccepted: boolean;
  name: string;
  age: string;
  postCode: string;
  phoneNumber: string;
  experience: (typeof experiences)[number];
  instruments: string[];
  otherInstrument: string;
  hasInstrument: boolean;
  goal: string;
  message: string;
};
export type FieldErrors = Partial<Record<keyof EnquiryDraft, string>>;

export function createDraft(): EnquiryDraft {
  return {
    email: "", lessonFor: "child", lessonType: "home", privacyAccepted: false,
    name: "", age: "", postCode: "", phoneNumber: "", experience: "No experience",
    instruments: [], otherInstrument: "", hasInstrument: false, goal: goals[0], message: "",
  };
}

export function validateStep(step: number, draft: EnquiryDraft): FieldErrors {
  const errors: FieldErrors = {};
  if (step === 1) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()) || draft.email.length > 254) errors.email = "Enter a valid email address.";
    if (!draft.privacyAccepted) errors.privacyAccepted = "Please agree to the Privacy Policy to continue.";
  }
  if (step === 2) {
    if (!draft.name.trim() || draft.name.trim().length > 100) errors.name = "Enter the student’s name (up to 100 characters).";
    if (!/^\d{1,2}$/.test(draft.age) || Number(draft.age) < 1 || Number(draft.age) > 99) errors.age = "Enter an age between 1 and 99.";
    const digits = draft.phoneNumber.replace(/\D/g, "");
    if (!/^[+\d\s().-]+$/.test(draft.phoneNumber) || digits.length < 7 || digits.length > 15) errors.phoneNumber = "Enter a valid phone number, including the area code.";
  }
  if (step === 3) {
    if (draft.instruments.length !== 1 || ![...mainInstruments, ...otherInstruments].some((instrument) => instrument === draft.instruments[0])) errors.instruments = "Choose an instrument.";
    if (draft.instruments.includes("Other") && (!draft.otherInstrument.trim() || draft.otherInstrument.length > 80)) errors.otherInstrument = "Tell us which instrument you’d like to learn.";
  }
  if (step === 4) {
    if (!getGoals(draft.age).includes(draft.goal)) errors.goal = "Choose a goal for your lessons.";
    if (draft.message.length > 2000) errors.message = "Please keep your message within 2,000 characters.";
  }
  return errors;
}

export function buildStartPayload(draft: EnquiryDraft, region: Region, formOpenId?: InquiryId) {
  return {
    email: draft.email.trim(), lessonFor: draft.lessonFor, lessonType: draft.lessonType,
    analyticsId: "", source: `musecool.com/${region}`,
    ...(formOpenId === undefined ? {} : { formOpenId }),
  };
}

export function buildStudentPayload(draft: EnquiryDraft, studentId: InquiryId) {
  const selected = draft.instruments[0];
  const instrumentNames: Record<string, string> = { Ukulele: "Guitar", "Drum Kit": "Drums", Saxophone: "Sax" };
  const instrument = selected === "Other" ? draft.otherInstrument.trim() : instrumentNames[selected] ?? selected;
  return {
    studentId,
    childrens: [{
      name: draft.name.trim(), age: draft.age, experience: draft.experience,
      postCode: draft.postCode.trim(), phoneNumber: draft.phoneNumber.trim(),
      hasInstrument: draft.hasInstrument, instrument,
    }],
  };
}

export function buildCompletionPayload(draft: EnquiryDraft, studentId: InquiryId) {
  const adult = Number(draft.age) > 14;
  return {
    studentId, preferredGoal: adult ? "" : draft.goal,
    preferredMusicalDream: adult ? draft.goal : "", message: draft.message.trim(),
  };
}
