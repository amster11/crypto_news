/**
 * Lead form: shared validation (client + server) and delivery adapter.
 */

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

export const LIMITS = { name: 80, phone: 20, email: 120, service: 120, message: 2000 };

export function validateLead(input: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = input.email.trim();

  if (name.length < 2) errors.name = "Укажите ваше имя.";
  else if (name.length > LIMITS.name) errors.name = "Имя слишком длинное.";

  if (!phone) errors.phone = "Укажите телефон или WhatsApp.";
  else if (!PHONE_RE.test(phone)) errors.phone = "Проверьте формат номера, например +000 00 000 000.";

  if (!email) errors.email = "Укажите email.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    errors.email = "Проверьте адрес электронной почты.";

  if (input.service.length > LIMITS.service) errors.service = "Выберите услугу из списка.";
  if (input.message.length > LIMITS.message)
    errors.message = `Сообщение не должно превышать ${LIMITS.message} символов.`;

  if (!input.consent) errors.consent = "Необходимо согласие с политикой конфиденциальности.";

  return errors;
}

export function normalizeLead(raw: unknown): LeadInput {
  const data = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  return {
    name: str(data.name),
    phone: str(data.phone),
    email: str(data.email),
    service: str(data.service),
    message: str(data.message),
    consent: data.consent === true,
    website: str(data.website),
  };
}

/**
 * Delivery adapter. Configure via environment variables:
 *  - LEAD_WEBHOOK_URL — the lead is POSTed as JSON (Make, Zapier, n8n, CRM, …)
 *  - without it the lead is only logged on the server (development stub).
 * Replace the body of this function to send email (Resend/SMTP) or Telegram.
 */
export async function deliverLead(lead: Omit<LeadInput, "website">): Promise<void> {
  const payload = { ...lead, receivedAt: new Date().toISOString() };
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    console.info("[lead] New lead (no LEAD_WEBHOOK_URL configured):", payload);
    return;
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Lead webhook responded with ${response.status}`);
}
