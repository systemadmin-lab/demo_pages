import type { InputHTMLAttributes } from "react";
import styles from "./TutorEnquiry.module.css";

export function Field({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { name: string; label: string; error?: string }) {
  const id = `enquiry-${props.name}`;
  return (
    <div>
      <div className={styles.field}>
        <input {...props} id={id} placeholder=" " aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && <p className={styles.error} id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export function RadioGroup<Value extends string>({ name, legend, value, options, onChange }: {
  name: string;
  legend: string;
  value: Value;
  options: readonly { value: Value; label: string; caption?: string }[];
  onChange: (value: Value) => void;
}) {
  return (
    <fieldset className={styles.group}>
      <legend>{legend}</legend>
      <div className={`${styles.choices} ${options.length === 3 ? styles.threeChoices : ""}`}>
        {options.map((option) => (
          <label className={styles.choice} key={option.value}>
            <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} />
            <span className={styles.pill}><span aria-hidden="true" className={styles.note}>♫</span>{option.label}</span>
            {option.caption && <span className={styles.price}>{option.caption}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Arrow({ back = false }: { back?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" className={back ? styles.backArrow : undefined}><path d="M3 12h17M13 4l8 8-8 8" /></svg>;
}

export function Check() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>;
}

const stepNames = ["General information", "Student profile", "Choose the instrument", "Set your goal"];

export function StepProgress({ step }: { step: number }) {
  return (
    <ol className={styles.progress} aria-label="Enquiry progress">
      {stepNames.map((name, index) => (
        <li key={name} aria-current={step === index + 1 ? "step" : undefined}>
          <span aria-hidden="true">{index + 1 < step ? <Check /> : `0${index + 1}`}</span>
          <span className={styles.srOnly}>{name}: {index + 1 < step ? "complete" : index + 1 === step ? "current step" : "upcoming"}</span>
        </li>
      ))}
    </ol>
  );
}
