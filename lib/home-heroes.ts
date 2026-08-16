export const homeHeroes = [
  {
    src: "/images/editorial/hero-amazonia-conectividad.jpg",
    alt: "Vista aérea de una ciudad amazónica conectada con un gran río y su actividad local",
    eyebrow: "Amazonía | Conectividad y servicios",
    caption: "El territorio conecta decisiones, economías y vidas."
  },
  {
    src: "/images/editorial/hero-sierra-ciudad-territorio.jpg",
    alt: "Ciudad intermedia andina entre montañas, parcelas agrícolas y corredores viales",
    eyebrow: "Sierra | Ciudades y sistemas territoriales",
    caption: "La geografía cambia el problema y también la respuesta."
  },
  {
    src: "/images/editorial/hero-costa-ciudad-infraestructura.jpg",
    alt: "Vista elevada de una ciudad costera peruana atravesada por infraestructura metropolitana",
    eyebrow: "Costa | Infraestructura y acceso",
    caption: "Cada inversión reorganiza oportunidades y brechas."
  },
  {
    src: "/images/editorial/hero-corredor-productivo.jpg",
    alt: "Corredor productivo que conecta campos, vías, centros poblados y actividad logística",
    eyebrow: "Economía | Corredores productivos",
    caption: "Producción, infraestructura y servicios forman un solo sistema."
  },
  {
    src: "/images/editorial/hero-servicio-agua-territorio.jpg",
    alt: "Equipo técnico inspeccionando infraestructura de agua en una ciudad regional peruana",
    eyebrow: "Gestión | Servicios que llegan al territorio",
    caption: "La capacidad pública se construye en decisiones concretas."
  },
  {
    src: "/images/editorial/hero-equipo-decision.jpg",
    alt: "Equipo multidisciplinario revisando mapas y evidencia territorial alrededor de una mesa",
    eyebrow: "Evidencia | Equipos que deciden",
    caption: "Comprender juntos es el primer paso para actuar mejor."
  }
] as const;

export function resolveHomeHeroIndex(value?: string) {
  const parsed = Number.parseInt(value ?? "", 10);
  if (Number.isInteger(parsed) && parsed >= 0 && parsed < homeHeroes.length) return parsed;
  return Math.floor(Math.random() * homeHeroes.length);
}
