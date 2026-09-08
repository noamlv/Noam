import { siteConfig } from "./site-config.ts";

export const noamProfile = {
  name: "Noam López Villanes",
  role: "Fundador y director, NOAM",
  headline: "Doctor en Ciencia Política y Gobierno. Investigación, datos y tecnología para decisiones públicas.",
  bio: [
    "Noam López Villanes es doctor en Ciencia Política y Gobierno por la PUCP y fundador de NOAM. Integra investigación social, analítica de datos y producto digital para convertir evidencia compleja en decisiones públicas y estratégicas.",
    "Durante más de quince años ha trabajado entre el Estado, la academia y la consultoría. Ha dirigido unidades de investigación socioeconómica, gestión del conocimiento y análisis estratégico en el Ministerio de Trabajo, el Ministerio del Interior y el Ministerio Público.",
    "Su trabajo reciente comprende análisis electoral para la Misión de Observación Electoral de la Unión Europea en Perú, prioridades de ciencia y tecnología para CONCYTEC, evaluación de resultados para el Gobierno Regional del Cusco y análisis estadístico para el IPD. También ha desarrollado investigación y docencia con la PUCP, John Jay College y centros académicos de Alemania y México."
  ],
  credentials: [
    "Doctor en Ciencia Política y Gobierno, PUCP (2026)",
    "Maestro en Ciencias con Mención en Proyectos de Inversión, UNI (2015)",
    "Licenciado en Ciencia Política y Gobierno, PUCP",
    "Advanced Methods for Text as Data: NLP, Essex Summer School"
  ],
  researchAndTeaching: [
    "Analista de datos y tecnología electoral, Misión de Observación Electoral de la Unión Europea en Perú (2026)",
    "Asesor técnico para Perú, Proyecto Justicia Forense de GTH-DNA",
    "Investigador asociado, John Jay College of Criminal Justice",
    "Investigador asociado, PULSO PUCP",
    "Profesor y coordinador académico, Escuela de Gobierno y Políticas Públicas de la PUCP"
  ],
  publicLeadership: [
    "Ex Director de Investigación Socioeconómica Laboral, MTPE",
    "Ex Director de Gestión del Conocimiento para la Seguridad, MININTER",
    "Ex Jefe de la Oficina de Análisis Estratégico contra la Criminalidad, Ministerio Público"
  ],
  expertise: [
    "Estudios, encuestas y evaluación",
    "Seguridad, justicia y criminalidad",
    "Inversión y análisis territorial",
    "Opinión pública y análisis electoral",
    "Productos de datos e IA aplicada"
  ],
  highlights: [
    "Más de quince años entre Estado, academia y consultoría",
    "Dirección y asesoría en instituciones públicas de alta complejidad",
    "Investigación aplicada en seguridad, territorio, inversión y procesos electorales",
    "Productos analíticos, evaluaciones y sistemas de decisión con evidencia trazable"
  ],
  email: siteConfig.email,
  cvPdf: "/docs/noam-cv-public.pdf",
  fullCvPdf: "/docs/noam-cv.pdf",
  photo: "/images/noam-profile.jpg",
  socials: [
    { label: "LinkedIn", href: siteConfig.social.linkedin, kind: "linkedin" },
    { label: "GitHub", href: siteConfig.social.github, kind: "github" },
    { label: "WhatsApp", href: `https://wa.me/${siteConfig.whatsappNumber}`, kind: "whatsapp" },
    { label: "Email", href: `mailto:${siteConfig.email}`, kind: "mail" }
  ]
} as const;
