import type { Region } from "../../regions/types";
import type { InquiryId } from "./model";

type InquiryResponses = {
  open: { formOpenId: InquiryId };
  start: { studentId: InquiryId };
  student: { saved: true };
  complete: { redirectUrl: string };
};

export async function sendInquiry<Action extends keyof InquiryResponses>(
  region: Region, action: Action, data: object,
): Promise<InquiryResponses[Action]> {
  let response: Response;
  try {
    response = await fetch("/api/tutor-enquiry", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ region, action, data }), cache: "no-store",
      signal: AbortSignal.timeout(action === "complete" ? 125_000 : 25_000),
    });
  } catch {
    throw new Error("We couldn’t connect. Please check your connection and try again.");
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) {
    throw new Error(result?.error || "We couldn’t save your enquiry. Please try again.");
  }
  return result;
}

export function getSourceKey(): string {
  // Only an anonymous visit identifier is persisted; form details stay in memory.
  try {
    const existing = localStorage.getItem("musecool_enquiry_source_key");
    if (existing && /^sk_[a-f0-9-]{36}$/.test(existing)) return existing;
    const key = `sk_${crypto.randomUUID()}`;
    localStorage.setItem("musecool_enquiry_source_key", key);
    return key;
  } catch {
    return `sk_${crypto.randomUUID()}`;
  }
}
