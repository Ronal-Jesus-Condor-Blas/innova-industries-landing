import { Resend } from "resend";

import {
  internalContactEmail,
  visitorConfirmationEmail
} from "@/lib/server/contact-emails";
import { reserveContactSubmission } from "@/lib/server/contact-rate-limit";

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

    const reservation = await reserveContactSubmission(payload.email);
    if (!reservation.allowed) {
      return jsonNoStore(
        {
          success: false,
          code: "EMAIL_RATE_LIMIT",
          error: "Este correo ya alcanzó el máximo permitido de 2 consultas."
        },
        { status: 429 }
      );
    }

    let submissionSucceeded = false;

    try {
      const resend = new Resend(apiKey);
      const from =
        process.env.RESEND_FROM_EMAIL ??
        "Innova Industries America <contacto@mail.innovaindustriesperu.com>";
      const internalEmail = internalContactEmail(payload);
      const confirmationEmail = visitorConfirmationEmail(payload);
      const response = await resend.batch.send([
        {
          from,
          to:
            process.env.INNOVA_CONTACT_TO_EMAIL ??
            "a.rios@innovaindustriesperu.com",
          replyTo: payload.email,
          ...internalEmail
        },
        {
          from,
          to: payload.email,
          ...confirmationEmail
        }
      ]);

      if (response.error) {
        return jsonNoStore(
          {
            success: false,
            error: "No se pudo enviar la consulta. Inténtalo nuevamente."
          },
          { status: 502 }
        );
      }

      submissionSucceeded = true;
      return jsonNoStore({ success: true });
    } finally {
      if (!submissionSucceeded) {
        await reservation.release().catch(() => undefined);
      }
    }
  } catch (error) {
    return securityErrorResponse(error);
  }
}
