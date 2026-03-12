export const siteConfig = {
  name: "NOAM",
  legalName: "NOAM Global Intelligence",
  description:
    "Gobierno, inversion e IA con evidencia aplicada para acelerar decisiones de alto impacto.",
  url: "https://www.noam.global",
  locale: "es",
  email: "hola@noam.global",
  social: {
    x: "https://x.com/noamglobal",
    linkedin: "https://linkedin.com/company/noamglobal"
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/insights", label: "Insights" },
    { href: "/indicators", label: "Indicators" },
    { href: "/toolkits", label: "Toolkits" },
    { href: "/services", label: "Servicios" },
    { href: "/cases", label: "Casos" },
    { href: "/about", label: "Sobre NOAM" }
  ]
} as const;

export const topicLabels = {
  gobierno: "Gobierno",
  inversion: "Inversion",
  ia: "IA"
} as const;
