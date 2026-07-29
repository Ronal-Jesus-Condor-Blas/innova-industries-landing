import { Resend } from "resend";

import {
  assertContentType,
  assertSameOrigin,
  cleanText,
  consumeRateLimit,
  isValidEmail,
  jsonNoStore,
  readJsonBody,
  securityErrorResponse
} from "@/lib/server/request-security";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

const maxJsonBytes = 32 * 1024;

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    assertContentType(request, "application/json");
    consumeRateLimit(request, "contact", {
      limit: 5,
      windowMs: 10 * 60 * 1000
    });

    const body = await readJsonBody<ContactPayload>(request, maxJsonBytes);
    const honeypot = cleanText(body.website, 200);

    if (honeypot) {
      return jsonNoStore({ success: true });
    }

    const payload = {
      name: cleanText(body.name, 120),
      company: cleanText(body.company, 160),
      email: cleanText(body.email, 254),
      phone: cleanText(body.phone, 40),
      subject: cleanText(body.subject, 160),
      message: cleanText(body.message, 4000)
    };

    if (
      !payload.name ||
      !payload.company ||
      !payload.email ||
      !payload.subject ||
      !payload.message ||
      !isValidEmail(payload.email)
    ) {
      return jsonNoStore(
        { success: false, error: "Revisa los datos ingresados e inténtalo nuevamente." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return jsonNoStore(
        {
          success: false,
          error: "El servicio de contacto no está disponible temporalmente."
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ??
        "INNOVA Landing <onboarding@resend.dev>",
      to:
        process.env.CONTACT_TO_EMAIL ??
        "a.rios@innovaindustriesperu.com",
      replyTo: payload.email,
      subject: "Nueva consulta desde la web de INNOVA",
      text: [
        "Nueva consulta desde la web de INNOVA",
        "",
        `Nombre: ${payload.name}`,
        `Empresa: ${payload.company}`,
        `Correo: ${payload.email}`,
        `Teléfono: ${payload.phone || "No indicado"}`,
        `Asunto: ${payload.subject}`,
        "",
        "Mensaje:",
        payload.message
      ].join("\n")
    });

    if (response.error) {
      return jsonNoStore(
        {
          success: false,
          error: "No se pudo enviar la consulta. Inténtalo nuevamente."
        },
        { status: 502 }
      );
    }

    return jsonNoStore({ success: true });
  } catch (error) {
    return securityErrorResponse(error);
  }
}
