import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { createPageMetadata } from "@/lib/seo";
import { brand } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Términos de uso",
  description: "Condiciones aplicables al acceso y uso del sitio web de Innova Industries America.",
  path: "/terminos-de-uso"
});

export default function TermsOfUsePage() {
  const sections = [
    {
      title: "1. Alcance y aceptación",
      content: (
        <p>
          Estos términos regulan el acceso y uso de {brand.domain}, administrado por {brand.name}. Al navegar por el sitio aceptas estas condiciones. Si no estás de acuerdo, debes abstenerte de utilizarlo.
        </p>
      )
    },
    {
      title: "2. Finalidad del sitio",
      content: (
        <p>
          El sitio ofrece información corporativa y canales para consultas, contacto comercial y postulaciones laborales. Su contenido es informativo y no constituye por sí mismo una oferta, garantía, asesoría técnica ni relación contractual. Cualquier propuesta se formalizará por los canales correspondientes.
        </p>
      )
    },
    {
      title: "3. Uso permitido",
      content: (
        <p>
          Debes proporcionar información veraz y utilizar el sitio de forma lícita. No está permitido interferir con su funcionamiento, intentar acceder sin autorización, introducir código malicioso, suplantar identidades ni utilizar sus formularios para contenido fraudulento, ofensivo o ajeno a su finalidad.
        </p>
      )
    },
    {
      title: "4. Propiedad intelectual",
      content: (
        <p>
          Los textos, diseños, logotipos, imágenes, marcas y demás contenidos propios del sitio están protegidos por la normativa aplicable. No se autoriza su reproducción, modificación, distribución o explotación comercial sin consentimiento previo y escrito, salvo los usos permitidos por ley.
        </p>
      )
    },
    {
      title: "5. Disponibilidad y enlaces externos",
      content: (
        <>
          <p>
            Procuramos mantener información correcta y el sitio disponible, pero podemos actualizar, suspender o retirar contenidos y funcionalidades sin previo aviso. No garantizamos que el acceso sea continuo o que el contenido esté libre de errores.
          </p>
          <p>
            Los enlaces a servicios de terceros se facilitan como referencia. Sus contenidos, disponibilidad y prácticas se rigen por sus propias condiciones y políticas.
          </p>
        </>
      )
    },
    {
      title: "6. Responsabilidad",
      content: (
        <p>
          En la medida permitida por la ley, Innova no será responsable por daños derivados del uso indebido del sitio, interrupciones fuera de su control o decisiones tomadas únicamente con base en información general publicada aquí. Nada en estos términos limita derechos que legalmente no puedan excluirse.
        </p>
      )
    },
    {
      title: "7. Legislación y modificaciones",
      content: (
        <p>
          Estos términos se interpretan conforme a las leyes de la República del Perú. Podemos modificarlos para reflejar cambios legales, técnicos o del servicio; la versión vigente será la publicada en esta página con su fecha de actualización.
        </p>
      )
    }
  ];

  return (
    <>
      <Header />
      <LegalDocument
        eyebrow="Legal"
        title="Términos de uso"
        introduction="Condiciones esenciales para utilizar este sitio y sus canales de contacto de manera segura y responsable."
        updatedAt="7 de agosto de 2026"
        sections={sections}
      />
      <Footer />
    </>
  );
}
