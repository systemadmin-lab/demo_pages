import assert from "node:assert/strict";
import test from "node:test";
import { handleTutorEnquiryRequest } from "../app/lib/tutor-enquiry-api.ts";

const apiKey = "test-only-key";
const studentId = "student-123";
const startData = {
  email: "rejuan@example.com",
  lessonFor: "myself",
  lessonType: "online",
  analyticsId: "",
  source: "musecool.com/uk",
};
const child = {
  name: "Rejuan",
  age: "25",
  experience: "No experience",
  postCode: "SW7 2BS",
  hasInstrument: false,
  instrument: "Piano",
  phoneNumber: "+44 7700 900123",
};
const completeData = {
  studentId,
  preferredGoal: "",
  preferredMusicalDream: "Play favorite song",
  message: "",
};

function request(action, data, region = "uk", headers = {}) {
  return new Request("http://localhost:3000/api/tutor-enquiry", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000", ...headers },
    body: JSON.stringify({ region, action, data }),
  });
}

function captureFetch(responseBody, status = 200) {
  const calls = [];
  return {
    calls,
    fetch: async (url, options) => {
      calls.push({ url: new URL(url), options, data: JSON.parse(options.body) });
      return Response.json(responseBody, { status });
    },
  };
}

test("form opening forwards tracking and only returns its identifier", async () => {
  const upstream = captureFetch({ formOpenId: "open-123", internal: "do not return" });
  const result = await handleTutorEnquiryRequest(request("open", {
    analyticsId: "", source: "musecool.com/us", sourceKey: "sk_123_abc_xyz",
  }, "us"), { apiKey, fetch: upstream.fetch });
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("cache-control"), "no-store");
  assert.deepEqual(await result.json(), { formOpenId: "open-123" });
  assert.equal(upstream.calls[0].url.href, "https://api.lycaeumapp.com/inquiry/v4/formOpen?key=test-only-key&country=usa");
  assert.deepEqual(upstream.calls[0].data, {
    analyticsId: "", source: "musecool.com/us", sourceKey: "sk_123_abc_xyz",
  });
});

test("form opening accepts the legacy studentId response name", async () => {
  const upstream = captureFetch({ studentId: "open-legacy" });
  const result = await handleTutorEnquiryRequest(request("open", {
    analyticsId: "", source: "musecool.com/uk", sourceKey: "sk_123_abc_xyz",
  }), { apiKey, fetch: upstream.fetch });
  assert.deepEqual(await result.json(), { formOpenId: "open-legacy" });
});

test("positive safe integer enquiry identifiers preserve their type across every step", async () => {
  const openData = { analyticsId: "", source: "musecool.com/uk", sourceKey: "sk_123" };
  for (const body of [{ formOpenId: 123 }, { studentId: 123 }]) {
    const upstream = captureFetch(body);
    const result = await handleTutorEnquiryRequest(request("open", openData), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, 200);
    assert.deepEqual(await result.json(), { formOpenId: 123 });
  }

  const start = captureFetch({ studentId: 456 });
  const started = await handleTutorEnquiryRequest(request("start", { ...startData, formOpenId: 123 }), { apiKey, fetch: start.fetch });
  assert.deepEqual(await started.json(), { studentId: 456 });
  assert.equal(start.calls[0].data.formOpenId, 123);

  const student = captureFetch({ studentId: 456 });
  const saved = await handleTutorEnquiryRequest(request("student", { studentId: 456, childrens: [child] }), { apiKey, fetch: student.fetch });
  assert.deepEqual(await saved.json(), { saved: true });
  assert.equal(student.calls[0].data.studentId, 456);

  const complete = captureFetch({ redirectUrl: "https://app.musecool.com/" });
  const completed = await handleTutorEnquiryRequest(request("complete", { ...completeData, studentId: 456 }), { apiKey, fetch: complete.fetch });
  assert.equal(completed.status, 200);
  assert.equal(complete.calls[0].data.studentId, 456);
});

test("non-positive, fractional and unsafe numeric identifiers are rejected, and sourceKey remains a string", async () => {
  const upstream = captureFetch({ studentId });
  for (const value of [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1, Infinity, NaN]) {
    const result = await handleTutorEnquiryRequest(request("start", { ...startData, formOpenId: value }), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, 400);
    const response = captureFetch({ studentId: value });
    const started = await handleTutorEnquiryRequest(request("start", startData), { apiKey, fetch: response.fetch });
    assert.equal(started.status, 502);
  }
  const opened = await handleTutorEnquiryRequest(request("open", { analyticsId: "", source: "musecool.com/uk", sourceKey: 123 }), { apiKey, fetch: upstream.fetch });
  assert.equal(opened.status, 400);
  assert.equal(upstream.calls.length, 0);
});

test("starting an inquiry forwards the consented step-one contract", async () => {
  const upstream = captureFetch({ studentId, ignoredToken: "never return" });
  const result = await handleTutorEnquiryRequest(request("start", { ...startData, formOpenId: "open-123" }), {
    apiKey, fetch: upstream.fetch,
  });
  assert.deepEqual(await result.json(), { studentId });
  assert.equal(upstream.calls[0].url.href, "https://api.lycaeumapp.com/inquiry/v4?key=test-only-key&country=uk");
  assert.deepEqual(upstream.calls[0].data, {
    email: "rejuan@example.com", lessonFor: "myself", lessonType: "online", analyticsId: "",
    source: "musecool.com/uk", formOpenId: "open-123",
  });
  assert.equal(upstream.calls[0].options.method, "POST");
  assert.equal(upstream.calls[0].options.redirect, "error");
  assert.equal(upstream.calls[0].options.cache, "no-store");
});

test("student details preserve postcode text and use the region's child endpoint", async () => {
  for (const region of ["uk", "us"]) {
    for (const postCode of ["", "   ", "SW7 2BS", "10001-1234", "123", "Any location text longer than ten characters"]) {
      const upstream = captureFetch({ studentId });
      const result = await handleTutorEnquiryRequest(request("student", {
        studentId, childrens: [{ ...child, postCode, phoneNumber: "+1 212 555 0123", instrument: "Sax" }],
      }, region), { apiKey, fetch: upstream.fetch });
      assert.equal(result.status, 200);
      assert.deepEqual(await result.json(), { saved: true });
      assert.equal(upstream.calls[0].url.pathname, "/inquiry/v4/child");
      assert.equal(upstream.calls[0].url.searchParams.get("country"), region === "us" ? "usa" : "uk");
      assert.deepEqual(upstream.calls[0].data, {
        studentId: "student-123",
        childrens: [{ name: "Rejuan", age: "25", experience: "No experience", postCode, hasInstrument: false, instrument: "Sax", phoneNumber: "+1 212 555 0123" }],
      });
    }
  }
});

test("completion preserves the app login handoff without exposing other response fields", async () => {
  const redirectUrl = "https://app.musecool.com/login?token=example-only#recommendations";
  const upstream = captureFetch({ redirectUrl, password: "never return" });
  const result = await handleTutorEnquiryRequest(request("complete", completeData), { apiKey, fetch: upstream.fetch });
  assert.deepEqual(await result.json(), { redirectUrl });
  assert.deepEqual(upstream.calls[0].data, {
    studentId: "student-123", preferredGoal: "", preferredMusicalDream: "Play favorite song", message: "",
  });
});

test("US start and completion use the backend's usa country code while preserving website attribution", async () => {
  const start = captureFetch({ studentId });
  const started = await handleTutorEnquiryRequest(request("start", { ...startData, source: "musecool.com/us" }, "us"), { apiKey, fetch: start.fetch });
  assert.equal(started.status, 200);
  assert.equal(start.calls[0].url.searchParams.get("country"), "usa");
  assert.equal(start.calls[0].data.source, "musecool.com/us");

  const complete = captureFetch({ redirectUrl: "https://app.musecool.com/" });
  const completed = await handleTutorEnquiryRequest(request("complete", completeData, "us"), { apiKey, fetch: complete.fetch });
  assert.equal(completed.status, 200);
  assert.equal(complete.calls[0].url.searchParams.get("country"), "usa");
});

test("cross-origin callers cannot send an inquiry", async () => {
  const upstream = captureFetch({ studentId });
  const result = await handleTutorEnquiryRequest(request("start", startData, "uk", { origin: "https://unrelated.example" }), { apiKey, fetch: upstream.fetch });
  assert.equal(result.status, 403);
  assert.equal(upstream.calls.length, 0);
});

test("same-origin requests use the browser Host when Next normalizes request.url to localhost", async () => {
  const upstream = captureFetch({ studentId });
  const result = await handleTutorEnquiryRequest(request("start", startData, "uk", {
    origin: "http://127.0.0.1:3000", host: "127.0.0.1:3000", "x-forwarded-proto": "http",
  }), { apiKey, fetch: upstream.fetch });
  assert.equal(result.status, 200);
  assert.equal(upstream.calls.length, 1);
});

test("same-origin HTTPS requests work behind TLS termination with the public Host", async () => {
  const upstream = captureFetch({ studentId });
  const result = await handleTutorEnquiryRequest(request("start", startData, "uk", {
    origin: "https://musecool.com", host: "musecool.com", "x-forwarded-proto": "https",
  }), { apiKey, fetch: upstream.fetch });
  assert.equal(result.status, 200);
  assert.equal(upstream.calls.length, 1);
});

test("Host-based origin validation still rejects foreign origins, ports, schemes and malformed headers", async () => {
  const upstream = captureFetch({ studentId });
  const cases = [
    { origin: "https://unrelated.example", host: "musecool.com", "x-forwarded-proto": "https" },
    { origin: "http://localhost:3000", host: "127.0.0.1:3000" },
    { origin: "http://127.0.0.1:4000", host: "127.0.0.1:3000" },
    { origin: "https://127.0.0.1:3000", host: "127.0.0.1:3000", "x-forwarded-proto": "http" },
    { origin: "https://unrelated.example", host: "musecool.com", "x-forwarded-host": "unrelated.example", "x-forwarded-proto": "https" },
    { origin: "http://localhost:3000", host: "localhost:3000/path" },
    { origin: "http://localhost:3000", host: "user@localhost:3000" },
    { origin: "http://localhost:3000", host: "localhost:3000", "x-forwarded-proto": "invalid" },
    { origin: "null", host: "localhost:3000" },
  ];
  for (const headers of cases) {
    const result = await handleTutorEnquiryRequest(request("start", startData, "uk", headers), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, 403, JSON.stringify(headers));
  }
  assert.equal(upstream.calls.length, 0);
});

test("malformed JSON, content type, and oversized bodies fail before the upstream call", async () => {
  const upstream = captureFetch({ studentId });
  const cases = [
    { body: "{", contentType: "application/json", status: 400 },
    { body: "{}", contentType: "text/plain", status: 415 },
    { body: " ".repeat(17_000), contentType: "application/json", status: 413 },
  ];
  for (const { body, contentType, status } of cases) {
    const result = await handleTutorEnquiryRequest(new Request("http://localhost:3000/api/tutor-enquiry", {
      method: "POST", headers: { "content-type": contentType }, body,
    }), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, status);
  }
  assert.equal(upstream.calls.length, 0);
});

test("invalid region, source, unknown fields, and step-one enums cannot reach the upstream", async () => {
  const upstream = captureFetch({ studentId });
  const invalid = [
    { region: "ca", action: "start", data: startData },
    { region: "us", action: "start", data: startData },
    { region: "uk", action: "start", data: { ...startData, email: "invalid" } },
    { region: "uk", action: "start", data: { ...startData, lessonFor: "friend" } },
    { region: "uk", action: "start", data: { ...startData, lessonType: "onsite" } },
    { region: "uk", action: "start", data: { ...startData, admin: true } },
    { region: "uk", action: "unknown", data: startData },
    { region: "uk", action: "start", data: startData, endpoint: "https://unrelated.example" },
  ];
  for (const payload of invalid) {
    const result = await handleTutorEnquiryRequest(new Request("http://localhost:3000/api/tutor-enquiry", {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
    }), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, 400, JSON.stringify(payload));
  }
  assert.equal(upstream.calls.length, 0);
});

test("student validation rejects invalid ages, enums, and types", async () => {
  const upstream = captureFetch({ studentId });
  for (const patch of [
    { age: "0" }, { age: "100" }, { age: 8 }, { experience: "advanced" },
    { postCode: 10001 }, { phoneNumber: "call later" }, { hasInstrument: "false" },
    { instrument: "" }, { name: " " }, { secret: "ignored?" },
  ]) {
    const result = await handleTutorEnquiryRequest(request("student", { studentId, childrens: [{ ...child, ...patch }] }), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, 400, JSON.stringify(patch));
  }
  assert.equal(upstream.calls.length, 0);
});

test("completion requires exactly one known goal and bounds the optional message", async () => {
  const upstream = captureFetch({ redirectUrl: "https://app.musecool.com/" });
  for (const patch of [
    { preferredMusicalDream: "" }, { preferredGoal: "Unlock musical talent" },
    { preferredMusicalDream: "unknown" }, { message: "a".repeat(2001) }, { studentId: "" },
  ]) {
    const result = await handleTutorEnquiryRequest(request("complete", { ...completeData, ...patch }), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, 400, JSON.stringify(patch));
  }
  assert.equal(upstream.calls.length, 0);
});

test("configuration errors do not call the service", async () => {
  const upstream = captureFetch({ studentId });
  const result = await handleTutorEnquiryRequest(request("start", startData), { fetch: upstream.fetch });
  assert.equal(result.status, 503);
  assert.equal(upstream.calls.length, 0);
});

test("upstream errors are redacted and never automatically retried", async () => {
  const upstream = captureFetch({ error: "Sensitive details token=private parent@example.com" }, 500);
  const result = await handleTutorEnquiryRequest(request("start", startData), { apiKey, fetch: upstream.fetch });
  assert.equal(result.status, 502);
  assert.equal(upstream.calls.length, 1);
  assert.doesNotMatch(await result.text(), /private|parent@example|test-only-key/);
});

test("missing identifiers and malformed service responses are not treated as saved", async () => {
  for (const response of [{}, null, { studentId: {} }, { studentId: "" }]) {
    const upstream = captureFetch(response);
    const result = await handleTutorEnquiryRequest(request("start", startData), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, 502);
  }
});

test("network timeouts produce a recoverable error without exposing exception details", async () => {
  const result = await handleTutorEnquiryRequest(request("complete", completeData), {
    apiKey, fetch: async () => { throw new DOMException("token=private", "TimeoutError"); },
  });
  assert.equal(result.status, 504);
  assert.doesNotMatch(await result.text(), /private/);
});

test("handoff URLs reject external hosts, credentials, insecure schemes, and alternate ports", async () => {
  for (const redirectUrl of [
    "https://app.musecool.com.unrelated.example/", "http://app.musecool.com/", "javascript:alert(1)",
    "https://user:secret@app.musecool.com/", "https://app.musecool.com:444/", "/login",
  ]) {
    const upstream = captureFetch({ redirectUrl });
    const result = await handleTutorEnquiryRequest(request("complete", completeData), { apiKey, fetch: upstream.fetch });
    assert.equal(result.status, 502, redirectUrl);
    assert.doesNotMatch(await result.text(), /secret|alert\(1\)/);
  }
});
