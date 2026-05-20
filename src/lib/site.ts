export const brand = {
  name: "INNOVA INDUSTRIES AMERICA SAC",
  shortName: "Innova America",
  email: "a.rios@innovaindustriesperu.com",
  domain: "www.innovaindustriesperu.com",
  whatsappNumber: "51999999999",
  colors: {
    blue: "#1C6DB5",
    gray: "#878787",
    black: "#1D1D1B",
    white: "#FFFFFF"
  }
};

export const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Comunicados y Calidad", href: "#comunicados-calidad" },
  { label: "Contacto", href: "#contacto" }
];

export const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
  "Hola, quiero contactar con INNOVA INDUSTRIES AMERICA SAC."
)}`;
