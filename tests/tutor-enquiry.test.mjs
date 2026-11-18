import assert from "node:assert/strict";
import test from "node:test";
import { createDraft, validateStep } from "../app/components/tutor-enquiry/model.ts";
import * as enquiry from "../app/components/tutor-enquiry/model.ts";

const validDraft = (overrides = {}) => ({
  ...createDraft(),
  email: "parent@example.com",
  privacyAccepted: true,
  name: "Alex",
  age: "10",
  postCode: "SW7 2BS",
  phoneNumber: "+44 20 7946 0123",
  instruments: ["Piano"],
  ...overrides,
});

test("an enquiry needs a valid email and explicit consent before continuing", () => {
  const empty = validateStep(1, createDraft());
  assert.ok(empty.email);
  assert.ok(empty.privacyAccepted);
  assert.ok(validateStep(1, validDraft({ email: "parent@" })).email);
  assert.ok(validateStep(1, validDraft({ privacyAccepted: false })).privacyAccepted);
  assert.deepEqual(validateStep(1, validDraft({ email: " parent@example.com " })), {});
});

test("the student profile accepts blank and unrestricted postcode text", () => {
  for (const postCode of ["", "   ", "sw7 2bs", "10001", "10001-1234", "123", "Any location text longer than ten characters"]) {
    assert.deepEqual(validateStep(2, validDraft({ postCode })), {});
  }
});

test("the student profile rejects blank names, invalid ages and non-phone text", () => {
  assert.ok(validateStep(2, validDraft({ name: "   " })).name);
  for (const age of ["", "0", "100", "121", "-5", "1.5", "ten"]) {
    assert.ok(validateStep(2, validDraft({ age })).age, age);
  }
  for (const phoneNumber of ["", "123", "call me tomorrow", "+44 20 test 0123"]) {
    assert.ok(validateStep(2, validDraft({ phoneNumber })).phoneNumber, phoneNumber);
  }
});

test("instrument selection is required, including a name for a custom instrument", () => {
  assert.ok(validateStep(3, validDraft({ instruments: [] })).instruments);
  assert.ok(validateStep(3, validDraft({ instruments: ["Other"], otherInstrument: " " })).otherInstrument);
  assert.deepEqual(validateStep(3, validDraft({ instruments: ["Other"], otherInstrument: "Harp" })), {});
  assert.ok(validateStep(3, validDraft({ instruments: ["Piano", "Cello"] })).instruments);
  assert.ok(validateStep(3, validDraft({ instruments: ["Unknown"] })).instruments);
});

test("students over 14 choose a musical dream, while younger students choose a goal", () => {
  assert.deepEqual(validateStep(4, validDraft({ age: "14" })), {});
  assert.ok(validateStep(4, validDraft({ age: "15" })).goal);
  assert.deepEqual(validateStep(4, validDraft({ age: "30", goal: "Play favorite song" })), {});
  assert.ok(validateStep(4, validDraft({ age: "10", goal: "Play favorite song" })).goal);
});

test("the final step accepts an optional note and limits overly long messages", () => {
  assert.deepEqual(validateStep(4, validDraft()), {});
  assert.ok(validateStep(4, validDraft({ message: "a".repeat(2001) })).message);
  assert.ok(validateStep(4, validDraft({ goal: "" })).goal);
});

test("start payload preserves UK/US attribution and optional form-open ID", () => {
  assert.equal(typeof enquiry.buildStartPayload, "function");
  assert.deepEqual(enquiry.buildStartPayload(validDraft({ email: " parent@example.com " }), "us", 123), {
    email: "parent@example.com", lessonFor: "child", lessonType: "home", analyticsId: "", source: "musecool.com/us", formOpenId: 123,
  });
  assert.deepEqual(enquiry.buildStartPayload(validDraft(), "uk"), {
    email: "parent@example.com", lessonFor: "child", lessonType: "home", analyticsId: "", source: "musecool.com/uk",
  });
});

test("student payload uses backend instrument names and string age", () => {
  assert.equal(typeof enquiry.buildStudentPayload, "function");
  for (const [label, instrument] of [["Ukulele", "Guitar"], ["Drum Kit", "Drums"], ["Saxophone", "Sax"], ["Piano", "Piano"], ["Other", "Harp"]]) {
    assert.deepEqual(enquiry.buildStudentPayload(validDraft({ name: " Alex ", instruments: [label], otherInstrument: " Harp " }), 456), {
      studentId: 456, childrens: [{ name: "Alex", age: "10", experience: "No experience", postCode: "SW7 2BS", phoneNumber: "+44 20 7946 0123", hasInstrument: false, instrument }],
    });
  }
});

test("completion sends exactly one age-appropriate goal field", () => {
  assert.equal(typeof enquiry.buildCompletionPayload, "function");
  assert.deepEqual(enquiry.buildCompletionPayload(validDraft({ age: "14", message: " Hello " }), 456), {
    studentId: 456, preferredGoal: "Unlock musical talent", preferredMusicalDream: "", message: "Hello",
  });
  assert.deepEqual(enquiry.buildCompletionPayload(validDraft({ age: "15", goal: "Play favorite song" }), 456), {
    studentId: 456, preferredGoal: "", preferredMusicalDream: "Play favorite song", message: "",
  });
});
