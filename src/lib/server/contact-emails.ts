type ContactEmailData = {
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
};

const siteUrl = "https://www.innovaindustriesperu.com";
const logoUrl = `${siteUrl}/assets/innova-america-logo-footer-white.png`;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailShell(content: string, preview: string) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <title>${escapeHtml(preview)}</title>
  </head>
  <body style="margin:0;background:#f3f5f7;color:#15191e;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f5f7;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border:1px solid #e3e7eb;border-radius:18px;overflow:hidden;box-shadow:0 10px 32px rgba(13,22,33,.08);">
            <tr>
              <td style="background:#080a0c;padding:27px 36px;border-bottom:3px solid #2584d8;">
                <a href="${siteUrl}" style="text-decoration:none;">
                  <img src="${logoUrl}" width="194" alt="Innova Industries America" style="display:block;width:194px;max-width:100%;height:auto;border:0;">
                </a>
              </td>
            </tr>
            ${content}
            <tr>
              <td style="padding:24px 36px;background:#0d1115;color:#aeb7c0;font-size:12px;line-height:19px;">
                <div style="color:#ffffff;font-size:13px;font-weight:700;margin-bottom:4px;">INNOVA Industries America</div>
                Soluciones especializadas para minería, construcción e industria.<br>
                <a href="${siteUrl}" style="color:#69b7ff;text-decoration:none;">www.innovaindustriesperu.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function visitorConfirmationEmail(data: ContactEmailData) {
  const name = escapeHtml(data.name);
  const company = escapeHtml(data.company);
  const subject = escapeHtml(data.subject);

  return {
    subject: "Hemos recibido tu solicitud | Innova Industries America",
    text: [
      `Hola, ${data.name}:`,
      "",
      "Gracias por comunicarte con Innova Industries America.",
      "Hemos recibido tu solicitud correctamente. Nuestro equipo revisará la información y se pondrá en contacto contigo a la brevedad.",
      "",
      `Empresa: ${data.company}`,
      `Asunto: ${data.subject}`,
      "",
      "Este es un mensaje automático de confirmación.",
      "https://www.innovaindustriesperu.com"
    ].join("\n"),
    html: emailShell(
      `<tr>
        <td style="padding:42px 36px 18px;">
          <div style="font-size:12px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:#2584d8;font-weight:700;">Solicitud recibida</div>
          <h1 style="margin:12px 0 18px;font-size:30px;line-height:38px;color:#11161b;font-weight:700;">Gracias por contactarnos</h1>
          <p style="margin:0 0 14px;font-size:16px;line-height:26px;color:#303841;">Hola, <strong>${name}</strong>.</p>
          <p style="margin:0;font-size:16px;line-height:26px;color:#4d5761;">Hemos recibido tu solicitud correctamente. Nuestro equipo revisará la información y se pondrá en contacto contigo a la brevedad.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 36px 34px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f8fa;border:1px solid #e3e8ed;border-radius:12px;">
            <tr><td style="padding:22px 24px 8px;font-size:12px;letter-spacing:1.3px;text-transform:uppercase;color:#77818c;font-weight:700;">Resumen de tu solicitud</td></tr>
            <tr><td style="padding:10px 24px;font-size:14px;line-height:21px;color:#69737e;border-bottom:1px solid #e3e8ed;">Empresa<br><strong style="color:#161b20;font-size:15px;">${company}</strong></td></tr>
            <tr><td style="padding:14px 24px 22px;font-size:14px;line-height:21px;color:#69737e;">Asunto<br><strong style="color:#161b20;font-size:15px;">${subject}</strong></td></tr>
          </table>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;">
            <tr><td style="background:#1676c7;border-radius:999px;"><a href="${siteUrl}" style="display:inline-block;padding:13px 24px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">Visitar nuestro sitio</a></td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;line-height:19px;color:#89929b;">Este es un mensaje automático de confirmación. No es necesario responderlo.</p>
        </td>
      </tr>`,
      "Hemos recibido tu solicitud y nos pondremos en contacto contigo."
    )
  };
}

export function internalContactEmail(data: ContactEmailData) {
  const name = escapeHtml(data.name);
  const company = escapeHtml(data.company);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replaceAll("\n", "<br>");

  return {
    subject: `Nueva consulta web: ${data.subject}`,
    text: [
      "Nueva consulta desde la web de INNOVA",
      "",
      `Nombre: ${data.name}`,
      `Empresa: ${data.company}`,
      `Correo: ${data.email}`,
      `Asunto: ${data.subject}`,
      "",
      "Mensaje:",
      data.message
    ].join("\n"),
    html: emailShell(
      `<tr>
        <td style="padding:38px 36px 16px;">
          <div style="font-size:12px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:#2584d8;font-weight:700;">Nueva consulta web</div>
          <h1 style="margin:12px 0 0;font-size:28px;line-height:36px;color:#11161b;">Un contacto solicita información</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 36px 34px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f8fa;border:1px solid #e3e8ed;border-radius:12px;">
            <tr><td style="padding:20px 24px 10px;font-size:14px;line-height:22px;color:#68727c;">Nombre<br><strong style="color:#151a1f;font-size:16px;">${name}</strong></td></tr>
            <tr><td style="padding:10px 24px;font-size:14px;line-height:22px;color:#68727c;">Empresa<br><strong style="color:#151a1f;font-size:16px;">${company}</strong></td></tr>
            <tr><td style="padding:10px 24px;font-size:14px;line-height:22px;color:#68727c;">Correo<br><a href="mailto:${email}" style="color:#1676c7;font-size:15px;font-weight:700;text-decoration:none;">${email}</a></td></tr>
            <tr><td style="padding:10px 24px 20px;font-size:14px;line-height:22px;color:#68727c;">Asunto<br><strong style="color:#151a1f;font-size:16px;">${subject}</strong></td></tr>
          </table>
          <div style="margin-top:20px;padding:22px 24px;border-left:3px solid #2584d8;background:#ffffff;border-top:1px solid #e7ebef;border-right:1px solid #e7ebef;border-bottom:1px solid #e7ebef;border-radius:4px 12px 12px 4px;">
            <div style="font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:#77818c;font-weight:700;margin-bottom:10px;">Mensaje</div>
            <div style="font-size:15px;line-height:24px;color:#303841;">${message}</div>
          </div>
        </td>
      </tr>`,
      `Nueva consulta de ${data.name} (${data.company}).`
    )
  };
}
