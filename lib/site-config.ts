export const siteConfig = {
  name: "NOAM",
  legalName: "NOAM.PE",
  description:
    "Consultora de inteligencia pública y territorial. Estudios, sistemas de decisión e IA para gobiernos, empresas y organizaciones.",
  url: "https://noam.pe",
  locale: "es",
  email: "hola@noam.pe",
  phone: "+51 996 358 492",
  phoneE164: "+51996358492",
  whatsappNumber: "51996358492",
  social: {
    linkedin: "https://www.linkedin.com/in/noamlv",
    github: "https://github.com/noamlv"
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/services", label: "Servicios" },
    { href: "/sectors", label: "Sectores" },
    { href: "/dataperu", label: "DataPerú" },
    { href: "/electoral", label: "Electoral" },
    { href: "/evidence", label: "Evidencia" },
    { href: "/about", label: "NOAM" }
  ]
} as const;

export const topicLabels = {
  gobierno: "Gobierno",
  inversion: "Inversión",
  ia: "IA"
} as const;
