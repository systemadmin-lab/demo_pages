import { handleTutorEnquiryRequest } from "@/app/lib/tutor-enquiry-api";

export async function POST(request: Request): Promise<Response> {
  return handleTutorEnquiryRequest(request, { apiKey: "SuperSecretKey" });
}
