type EnquiryApiOptions = { apiKey?: string; fetch?: typeof fetch };
type EnquiryAction = "open" | "start" | "student" | "complete";
type EnquiryRequest = {
  region: "uk" | "us";
  action: EnquiryAction;
  data: Record<string, unknown>;
};

const MAX_REQUEST_BYTES = 16_384;
const MAX_RESPONSE_BYTES = 65_536;
const EXPERIENCES = ["No experience", "Early beginner", "Intermediate", "Proficient"];
const GOALS = ["Unlock musical talent", "Love music from day one", "Perform on stage", "Build focus & discipline"];
const DREAMS = ["Play favorite song", "Perform with friends", "Music for stress relief", "Get back to playing"];

class InputError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, max: number, allowEmpty = false): value is string {
  return typeof value === "string" && value.length <= max && (allowEmpty || value.trim().length > 0);
}

function sourceKey(value: unknown): value is string {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(value);
}

function identifier(value: unknown): value is string | number {
  return sourceKey(value) || (typeof value === "number" && Number.isSafeInteger(value) && value > 0);
}

function oneOf(value: unknown, values: readonly string[]): boolean {
  return typeof value === "string" && values.includes(value);
}

function fields(value: Record<string, unknown>, required: string[], optional: string[] = []): boolean {
  return required.every((key) => Object.hasOwn(value, key))
    && Object.keys(value).every((key) => required.includes(key) || optional.includes(key));
}

function validStudent(value: unknown): boolean {
  if (!record(value) || !fields(value, ["name", "age", "experience", "postCode", "hasInstrument", "instrument", "phoneNumber"])) return false;
  return text(value.name, 100)
    && typeof value.age === "string" && /^\d{1,2}$/.test(value.age) && Number(value.age) >= 1 && Number(value.age) <= 99
    && oneOf(value.experience, EXPERIENCES)
    && typeof value.postCode === "string"
    && typeof value.hasInstrument === "boolean"
    && text(value.instrument, 80)
    && text(value.phoneNumber, 30) && /^[+\d\s().-]+$/.test(value.phoneNumber)
    && /^\d{7,15}$/.test(value.phoneNumber.replace(/\D/g, ""));
}

function validate(value: unknown): EnquiryRequest {
  const invalid = () => { throw new InputError(400, "Please check your enquiry details and try again."); };
  if (!record(value) || !fields(value, ["region", "action", "data"])) return invalid();
  if ((value.region !== "uk" && value.region !== "us") || !record(value.data)) return invalid();
  const { region, data } = value;
  let valid = false;
  switch (value.action) {
    case "open":
      valid = fields(data, ["analyticsId", "source", "sourceKey"])
        && text(data.analyticsId, 256, true) && data.source === `musecool.com/${region}`
        && sourceKey(data.sourceKey);
      break;
    case "start":
      valid = fields(data, ["email", "lessonFor", "lessonType", "analyticsId", "source"], ["formOpenId"])
        && text(data.email, 254) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
        && oneOf(data.lessonFor, ["child", "myself"])
        && oneOf(data.lessonType, ["home", "online", "not_sure"])
        && text(data.analyticsId, 256, true) && data.source === `musecool.com/${region}`
        && (!Object.hasOwn(data, "formOpenId") || identifier(data.formOpenId));
      break;
    case "student":
      valid = fields(data, ["studentId", "childrens"]) && identifier(data.studentId)
        && Array.isArray(data.childrens) && data.childrens.length > 0 && data.childrens.length <= 10
        && data.childrens.every(validStudent);
      break;
    case "complete":
      valid = fields(data, ["studentId", "preferredGoal", "preferredMusicalDream", "message"])
        && identifier(data.studentId) && text(data.message, 2000, true)
        && ((oneOf(data.preferredGoal, GOALS) && data.preferredMusicalDream === "")
          || (data.preferredGoal === "" && oneOf(data.preferredMusicalDream, DREAMS)));
      break;
    default:
      return invalid();
  }
  if (!valid) return invalid();
  return { region, action: value.action as EnquiryAction, data };
}

async function readJson(message: Request | Response, maxBytes: number): Promise<unknown> {
  if (Number(message.headers.get("content-length")) > maxBytes) {
    throw new InputError(413, "This enquiry is too large. Please shorten your message.");
  }
  const reader = message.body?.getReader();
  if (!reader) throw new InputError(400, "Please provide your enquiry details.");
  const decoder = new TextDecoder();
  let length = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        throw new InputError(413, "This enquiry is too large. Please shorten your message.");
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return JSON.parse(body);
  } catch (error) {
    if (error instanceof SyntaxError) throw new InputError(400, "Please provide valid enquiry details.");
    throw error;
  } finally {
    reader.releaseLock();
  }
}

function safeRedirect(value: unknown): value is string {
  if (!text(value, 8192)) return false;
  try {
    const url = new URL(value);
    return url.origin === "https://app.musecool.com" && !url.username && !url.password;
  } catch {
    return false;
  }
}

function sameOrigin(request: Request, origin: string): boolean {
  try {
    const requestUrl = new URL(request.url);
    // Next may build request.url using its configured hostname (localhost in dev).
    // Host retains the browser-facing authority; proxies must preserve it.
    const host = request.headers.get("host") ?? requestUrl.host;
    const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim()
      ?? requestUrl.protocol.slice(0, -1);
    if ((protocol !== "http" && protocol !== "https") || !host || /[\s/@?#\\,]/.test(host)) return false;
    const expectedOrigin = new URL(`${protocol}://${host}`).origin;
    return origin === expectedOrigin;
  } catch {
    return false;
  }
}

/** Server boundary for the four stages of the existing Lycaeum inquiry contract. */
export async function handleTutorEnquiryRequest(
  request: Request,
  options: EnquiryApiOptions = {},
): Promise<Response> {
  let enquiry: EnquiryRequest;
  try {
    const origin = request.headers.get("origin");
    if (origin && !sameOrigin(request, origin)) {
      return json({ error: "Please submit this form from the MuseCool website." }, 403);
    }
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return json({ error: "Please send enquiry details as JSON." }, 415);
    }
    enquiry = validate(await readJson(request, MAX_REQUEST_BYTES));
  } catch (error) {
    if (error instanceof InputError) return json({ error: error.message }, error.status);
    return json({ error: "We could not read your enquiry. Please try again." }, 400);
  }

  if (!options.apiKey?.trim()) {
    return json({ error: "Online enquiries are temporarily unavailable. Please contact MuseCool." }, 503);
  }

  const suffix = enquiry.action === "open" ? "/formOpen" : enquiry.action === "student" ? "/child" : "";
  const endpoint = new URL(`https://api.lycaeumapp.com/inquiry/v4${suffix}`);
  endpoint.searchParams.set("key", options.apiKey);
  endpoint.searchParams.set("country", enquiry.region === "us" ? "usa" : "uk");

  try {
    const response = await (options.fetch ?? fetch)(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(enquiry.data),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(enquiry.action === "complete" ? 120_000 : 20_000),
    });
    if (!response.ok) throw new Error("Upstream request failed");
    const result = await readJson(response, MAX_RESPONSE_BYTES);
    if (!record(result) || result.error) throw new Error("Invalid upstream response");

    switch (enquiry.action) {
      case "open": {
        const formOpenId = result.formOpenId ?? result.studentId;
        if (!identifier(formOpenId)) throw new Error("Missing form identifier");
        return json({ formOpenId });
      }
      case "start":
        if (!identifier(result.studentId)) throw new Error("Missing student identifier");
        return json({ studentId: result.studentId });
      case "student":
        return json({ saved: true });
      case "complete":
        if (!safeRedirect(result.redirectUrl)) throw new Error("Invalid handoff URL");
        return json({ redirectUrl: result.redirectUrl });
    }
  } catch (error) {
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      return json({ error: "This is taking longer than expected. Please try again." }, 504);
    }
    return json({ error: "We could not save your enquiry right now. Please try again." }, 502);
  }
}
