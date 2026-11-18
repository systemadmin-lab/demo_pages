"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type PointerEvent } from "react";
import { regions, type Region } from "../../regions";
import { lessonPricing } from "../../regions/pricing";
import { lockBodyScroll } from "../scroll-lock";
import EnquiryArtwork from "./EnquiryArtwork";
import { Arrow, Check, Field, RadioGroup, StepProgress } from "./FormControls";
import { buildCompletionPayload, buildStartPayload, buildStudentPayload, createDraft, experiences, getGoals, mainInstruments, otherInstruments, validateStep, type EnquiryDraft, type FieldErrors, type InquiryId } from "./model";
import { getSourceKey, sendInquiry } from "./client";
import styles from "./TutorEnquiry.module.css";

const stepTitles = ["General Information", "Student profile", "Choose the instrument", "Set Your Goal"];

export default function TutorEnquiryDialog({ region, open, onClose }: { region: Region; open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const formOpenRequest = useRef<Promise<InquiryId | undefined> | null>(null);
  const startedInquiry = useRef<{ signature: string; studentId: InquiryId } | null>(null);
  const pendingRef = useRef(false);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<EnquiryDraft>(createDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showOther, setShowOther] = useState(false);
  const [pending, setPending] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const goalOptions = getGoals(draft.age);
  const pricing = lessonPricing[region];
  const contact = regions[region];
  const pointerDownOnBackdrop = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    dialog.showModal();
    if (!formOpenRequest.current) {
      formOpenRequest.current = sendInquiry(region, "open", {
        analyticsId: "", source: `musecool.com/${region}`, sourceKey: getSourceKey(),
      }).then((result) => result.formOpenId).catch(() => undefined);
    }
    const unlock = lockBodyScroll();
    return () => {
      dialog.close();
      unlock();
    };
  }, [open, region]);

  useEffect(() => {
    if (!open) return;
    headingRef.current?.focus({ preventScroll: true });
    dialogRef.current?.scrollTo({ top: 0 });
  }, [open, step]);

  useEffect(() => {
    if (open && redirectUrl) window.location.replace(redirectUrl);
  }, [open, redirectUrl]);

  function update<Key extends keyof EnquiryDraft>(key: Key, value: EnquiryDraft[Key]) {
    setDraft((previous) => {
      const updated = { ...previous, [key]: value };
      if (key === "age" && !getGoals(updated.age).includes(updated.goal)) updated.goal = getGoals(updated.age)[0];
      return updated;
    });
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setSubmissionError("");
  }

  function selectInstrument(instrument: string) {
    update("instruments", [instrument]);
  }

  async function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current || redirectUrl) return;
    const nextErrors = validateStep(step, draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.otherInstrument) setShowOther(true);
      requestAnimationFrame(() => {
        const invalid = dialogRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        const field = invalid?.matches("fieldset") ? invalid.querySelector<HTMLElement>("input, button") : invalid;
        field?.focus();
      });
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    pendingRef.current = true;
    setPending(true);
    setSubmissionError("");
    try {
      if (step === 1) {
        const payload = buildStartPayload(draft, region, (await formOpenRequest.current) ?? undefined);
        const signature = JSON.stringify(payload);
        if (startedInquiry.current?.signature !== signature) {
          const { studentId } = await sendInquiry(region, "start", payload);
          startedInquiry.current = { signature, studentId };
        }
        setStep(2);
      } else {
        const studentId = startedInquiry.current?.studentId;
        if (studentId === undefined) {
          setStep(1);
          throw new Error("Please confirm your email to continue.");
        }
        if (step === 3) {
          await sendInquiry(region, "student", buildStudentPayload(draft, studentId));
          setStep(4);
        } else {
          const result = await sendInquiry(region, "complete", buildCompletionPayload(draft, studentId));
          setRedirectUrl(result.redirectUrl);
        }
      }
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "We couldn’t save your enquiry. Please try again.");
      requestAnimationFrame(() => statusRef.current?.focus());
    } finally {
      pendingRef.current = false;
      setPending(false);
    }
  }

  function back() {
    setErrors({});
    setSubmissionError("");
    setStep(step - 1);
  }

  function close() {
    dialogRef.current?.close();
    onClose();
  }

  function isBackdrop(event: PointerEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return false;
    const rect = event.currentTarget.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  }

  function keepFocusInDialog(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
    )).filter((element) => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === headingRef.current || active === event.currentTarget)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="tutor-enquiry-heading"
      onKeyDown={keepFocusInDialog}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onPointerDown={(event) => { pointerDownOnBackdrop.current = isBackdrop(event); }}
      onPointerUp={(event) => { if (pointerDownOnBackdrop.current && isBackdrop(event)) close(); }}
    >
      <div className={styles.layout}>
        <button type="button" aria-label="Close enquiry form" onClick={close} className={styles.close}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
        </button>
        <EnquiryArtwork step={step} />
        <div className={`${styles.formContent} ${step === 1 ? styles.firstStep : ""}`}>
          {step > 1 && <StepProgress step={step} />}
          <h2 ref={headingRef} tabIndex={-1} id="tutor-enquiry-heading" className={styles.title}>{stepTitles[step - 1]}</h2>
          <form onSubmit={next} noValidate aria-busy={pending}>
            <fieldset className={styles.group} disabled={pending || !!redirectUrl}>
            <legend className={styles.srOnly}>{stepTitles[step - 1]}</legend>
            {step === 1 && (
              <div className={styles.stack}>
                <Field name="email" label="Enter your email" type="email" autoComplete="email" maxLength={254} required value={draft.email} onChange={(event) => update("email", event.target.value)} error={errors.email} />
                <RadioGroup name="lessonFor" legend="Who are these lessons for?" value={draft.lessonFor} onChange={(value) => update("lessonFor", value)} options={[{ value: "child", label: "For my child" }, { value: "myself", label: "For myself" }]} />
                <RadioGroup name="lessonType" legend="How would you like to take your 1-on-1 lessons?" value={draft.lessonType} onChange={(value) => update("lessonType", value)} options={[
                  { value: "home", label: "At my home", caption: `FROM ${pricing.currencySymbol}${pricing.inPerson[0].price}` },
                  { value: "online", label: "Online", caption: `FROM ${pricing.currencySymbol}${pricing.online[0].price}` },
                  { value: "not_sure", label: "Not sure yet" },
                ]} />
                <div>
                  <label className={styles.consent}>
                    <input type="checkbox" name="privacyAccepted" checked={draft.privacyAccepted} onChange={(event) => update("privacyAccepted", event.target.checked)} required aria-invalid={!!errors.privacyAccepted} aria-describedby={errors.privacyAccepted ? "enquiry-privacy-error" : undefined} />
                    <span>By clicking Let’s go you agree to the <a href={contact.privacyPolicyHref} target="_blank" rel="noopener noreferrer">Privacy Policy<span className={styles.srOnly}> (opens in a new tab)</span></a></span>
                  </label>
                  <p className={styles.privacyHint}>We keep your information private and secure, and only use it to find the perfect tutor for you.</p>
                  {errors.privacyAccepted && <p className={styles.error} id="enquiry-privacy-error">{errors.privacyAccepted}</p>}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className={styles.stack}>
                <Field name="name" label="Name of student" autoComplete="off" maxLength={100} required value={draft.name} onChange={(event) => update("name", event.target.value)} error={errors.name} />
                <Field name="age" label="Age" inputMode="numeric" maxLength={2} required value={draft.age} onChange={(event) => update("age", event.target.value)} error={errors.age} />
                <Field name="postCode" label={region === "us" ? "ZIP Code" : "Postcode"} autoComplete="postal-code" value={draft.postCode} onChange={(event) => update("postCode", event.target.value)} />
                <Field name="phoneNumber" label="Your phone number for lesson updates" type="tel" autoComplete="tel" maxLength={30} required value={draft.phoneNumber} onChange={(event) => update("phoneNumber", event.target.value)} error={errors.phoneNumber} />
                <RadioGroup name="experience" legend="Musical experience" value={draft.experience} onChange={(value) => update("experience", value)} options={experiences.map((experience) => ({ value: experience, label: experience }))} />
              </div>
            )}
            {step === 3 && (
              <div className={styles.stack}>
                <fieldset className={styles.group} aria-invalid={!!errors.instruments} aria-describedby={errors.instruments ? "enquiry-instruments-error" : undefined}>
                  <legend className={styles.srOnly}>Choose an instrument</legend>
                  <div className={styles.instrumentGrid}>
                    {mainInstruments.map((instrument) => (
                      <label className={styles.instrument} key={instrument}>
                        <input type="radio" name="instruments" value={instrument} checked={draft.instruments.includes(instrument)} onChange={() => selectInstrument(instrument)} />
                        <span><Image src={`/tutor-enquiry/${instrument.toLowerCase()}.svg`} alt="" width={44} height={44} />{instrument}</span>
                      </label>
                    ))}
                    <button type="button" className={styles.otherToggle} aria-expanded={showOther} aria-controls="enquiry-other-instruments" onClick={() => setShowOther(!showOther)}>
                      <span aria-hidden="true">•••</span>Other<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showOther ? "rotate(180deg)" : undefined }}><path d="m5 9 7 7 7-7" /></svg>
                    </button>
                  </div>
                  <div id="enquiry-other-instruments" hidden={!showOther} className={styles.otherPanel}>
                    <div className={styles.otherGrid}>
                      {otherInstruments.map((instrument) => (
                        <label key={instrument}><input type="radio" name="instruments" value={instrument} checked={draft.instruments.includes(instrument)} onChange={() => selectInstrument(instrument)} />{instrument}</label>
                      ))}
                    </div>
                    {draft.instruments.includes("Other") && <Field name="otherInstrument" label="Which instrument?" maxLength={80} required value={draft.otherInstrument} onChange={(event) => update("otherInstrument", event.target.value)} error={errors.otherInstrument} />}
                  </div>
                  {!showOther && draft.instruments.some((instrument) => (otherInstruments as readonly string[]).includes(instrument)) && <p className={styles.selectedOther}>Selected: {draft.instruments.filter((instrument) => (otherInstruments as readonly string[]).includes(instrument)).join(", ")}</p>}
                  {errors.instruments && <p className={styles.error} id="enquiry-instruments-error">{errors.instruments}</p>}
                  {errors.otherInstrument && !showOther && <p className={styles.error}>Open “Other” and tell us which instrument you’d like to learn.</p>}
                </fieldset>
                <RadioGroup name="hasInstrument" legend="Do you have a musical instrument?" value={draft.hasInstrument ? "yes" : "no"} onChange={(value) => update("hasInstrument", value === "yes")} options={[{ value: "yes", label: "Already have one" }, { value: "no", label: "Not yet" }]} />
              </div>
            )}
            {step === 4 && (
              <div className={styles.stack}>
                <fieldset className={styles.group}>
                  <legend>What do you (or your child) want from lessons?</legend>
                  <div className={styles.goalGrid}>
                    {goalOptions.map((goal, index) => (
                      <label className={styles.goal} key={goal}>
                        <input type="radio" name="goal" value={goal} checked={draft.goal === goal} onChange={() => update("goal", goal)} />
                        <span><Image src={`/tutor-enquiry/${Number(draft.age) > 14 ? "dream" : "goal"}-${index + 1}.svg`} alt="" width={64} height={64} /><span>{goal}</span><span className={styles.goalCheck}><Check /></span></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className={styles.message}>
                  <label htmlFor="enquiry-message" className={styles.subtitle}>Anything we should know? (optional)</label>
                  <p id="enquiry-message-hint">Please share any info that could help us give you or your child the best experience</p>
                  <textarea id="enquiry-message" name="message" rows={5} maxLength={2000} value={draft.message} onChange={(event) => update("message", event.target.value)} aria-describedby="enquiry-message-hint" placeholder="e.g. My child is very energetic, so a patient approach would be appreciated. We would also prefer lessons in Spanish if possible, ideally with a female tutor." />
                </div>
              </div>
            )}
            </fieldset>
            {(submissionError || (pending && step === 4) || redirectUrl) && (
              <div ref={statusRef} tabIndex={-1} role={submissionError ? "alert" : "status"} className={`${styles.completion} ${submissionError ? styles.submissionError : ""}`}>
                {submissionError || (redirectUrl ? "Your enquiry is saved. Opening your tutor recommendations…" : "Your musical journey starts here! Finding your tutor recommendations…")}
              </div>
            )}
            <div className={`${styles.actions} ${step === 4 ? styles.finalActions : ""}`}>
              {step > 1 && <button type="button" className={styles.back} disabled={pending || !!redirectUrl} onClick={back}><Arrow back /><span className={step === 4 ? styles.srOnly : undefined}>Back</span></button>}
              <button type="submit" disabled={pending || !!redirectUrl} className={`${styles.next} ${step === 1 ? styles.fullWidth : ""}`}>
                {redirectUrl ? "Opening recommendations…" : pending ? (step === 4 ? "Finding Rhythm…" : "Saving…") : step === 1 ? "Let’s go" : step === 4 ? "Start Your Musical Journey" : "Next"}
                {step < 4 && !pending && <Arrow />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
