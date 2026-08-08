import type { Metadata } from "next";
import Link from "next/link";

import { LegalDocument } from "@/components/legal-document";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { createPageMetadata } from "@/lib/seo";
import { brand } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Política de privacidad",
  description: "Conoce cómo Innova Industries America trata y protege los datos personales recibidos mediante su sitio web.",
  path: "/politica-de-privacidad"
});

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Responsable del tratamiento",
      content: (
        <p>
          {brand.name} es responsable del tratamiento de los datos personales recabados en este sitio. Nuestro domicilio de contacto es Mza. B1 Lote 3B, Z.I. Lotización Industrial Hua (Alt. Petramas), San Antonio, Huarochirí, Lima, Perú.
        </p>
      )
    },
    {
      title: "2. Datos que recopilamos",
      content: (
        <>
          <p>
            En el formulario de contacto solicitamos nombre, empresa, correo electrónico, asunto y mensaje. En postulaciones laborales podemos solicitar, además, teléfono, ciudad, área de interés, experiencia, perfil profesional, enlace de LinkedIn o portafolio y currículum vitae.
          </p>
          <p>
            También procesamos información técnica indispensable para la seguridad y operación del sitio, como dirección IP, encabezados de la solicitud y preferencias locales de idioma, tema y aviso de cookies.
          </p>
        </>
      )
    },
    {
      title: "3. Finalidades y autorización",
      content: (
        <>
          <p>
            Utilizamos los datos de contacto para responder consultas, evaluar requerimientos y mantener las comunicaciones relacionadas. Los datos de postulación se utilizan exclusivamente para evaluar perfiles y contactar candidatos en procesos compatibles.
          </p>
          <p>
            El envío de cada formulario requiere una autorización expresa. No utilizamos estos datos para publicidad ni tomamos decisiones automatizadas con efectos legales sobre las personas.
          </p>
        </>
      )
    },
    {
      title: "4. Destinatarios y conservación",
      content: (
        <>
          <p>
            El acceso se limita al personal autorizado de Innova y a proveedores tecnológicos indispensables para alojar el sitio, protegerlo y entregar correos. Estos proveedores actúan bajo obligaciones de confidencialidad y seguridad; algunos pueden procesar información fuera del Perú con las salvaguardas aplicables.
          </p>
          <p>
            Conservamos la información solo durante el tiempo razonablemente necesario para atender la consulta o gestionar procesos de selección, y posteriormente durante los plazos exigidos para cumplir obligaciones legales o atender eventuales responsabilidades. Luego se elimina o anonimiza de forma segura.
          </p>
        </>
      )
    },
    {
      title: "5. Tus datos y tus derechos",
      content: (
        <>
          <p>
            Conforme a la Ley N.º 29733 y su reglamento, puedes solicitar acceso a tus datos, su rectificación, cancelación u oponerte a su tratamiento (derechos ARCO), así como revocar tu consentimiento cuando corresponda.
          </p>
          <p>
            Envía tu solicitud mediante nuestro <Link href="/contacto" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">formulario de contacto</Link>, indicando el derecho que deseas ejercer y la información necesaria para verificar tu identidad. Si consideras que tu solicitud no fue atendida adecuadamente, puedes acudir a la Autoridad Nacional de Protección de Datos Personales.
          </p>
        </>
      )
    },
    {
      title: "6. Seguridad, cookies y cambios",
      content: (
        <>
          <p>
            Aplicamos medidas técnicas y organizativas razonables para prevenir el acceso, alteración, pérdida o divulgación no autorizada. Ningún sistema es absolutamente infalible, por lo que revisamos estas medidas de forma periódica.
          </p>
          <p>
            El uso de almacenamiento local se detalla en la <Link href="/politica-de-cookies" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">Política de cookies</Link>. Podemos actualizar esta política cuando cambien nuestras prácticas o la normativa; la fecha publicada identifica la versión vigente.
          </p>
        </>
      )
    }
  ];

  return (
    <>
      <Header />
      <LegalDocument
        eyebrow="Privacidad"
        title="Política de privacidad"
        introduction="Explicamos de forma clara qué datos recibimos, para qué los utilizamos y cómo puedes ejercer tus derechos."
        updatedAt="7 de agosto de 2026"
        sections={sections}
      />
      <Footer />
    </>
  );
}
