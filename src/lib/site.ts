export const brand = {
  name: "INNOVA INDUSTRIES AMERICA SAC",
  shortName: "Innova America",
  email: "a.rios@innovaindustriesperu.com",
  domain: "www.innovaindustriesperu.com",
  whatsappNumber: "51986023382",
  colors: {
    blue: "#1C6DB5",
    gray: "#878787",
    black: "#1D1D1B",
    white: "#FFFFFF"
  }
};

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Comunicados", href: "/comunicados" },
  { label: "Portal proveedores", href: "/proveedores" },
  { label: "Contacto", href: "/contacto" }
] as const;

export function getWhatsappHref(locale: "es" | "en" = "es") {
  const message = locale === "es"
    ? "Hola, quiero contactar con INNOVA INDUSTRIES AMERICA SAC."
    : "Hello, I would like to contact INNOVA INDUSTRIES AMERICA SAC.";

  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappHref = getWhatsappHref();
