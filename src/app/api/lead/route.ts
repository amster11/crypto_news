import { deliverLead, normalizeLead, validateLead } from "@/lib/leads";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Некорректный запрос." }, { status: 400 });
  }

  const lead = normalizeLead(body);

  // Honeypot filled → silently accept to avoid tipping off bots.
  if (lead.website) return Response.json({ ok: true });

  const errors = validateLead(lead);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const { website: _honeypot, ...data } = lead;
    void _honeypot;
    await deliverLead(data);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[lead] Delivery failed:", error);
    return Response.json(
      { ok: false, message: "Не удалось отправить заявку. Попробуйте ещё раз." },
      { status: 502 },
    );
  }
}
