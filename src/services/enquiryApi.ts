import { BUSINESS } from "../constants/business";

export interface EnquiryPayload {
  fullName: string;
  whatsappNumber: string;
  garmentType: string;
  occasion?: string;
  requiredBy?: string;
  fabricPreference?: string;
  notes?: string;
}

export async function sendEnquiry(payload: EnquiryPayload): Promise<{ ok: boolean }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${BUSINESS.apiBaseUrl}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return { ok: response.ok };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timeout);
  }
}
