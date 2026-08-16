import { ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import { WhatsAppLink } from "@/components/commercial/whatsapp-link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui";

const explore = siteConfig.nav.filter((item) => item.href !== "/");

const capabilities = [
  { label: "Diseñar un alcance", href: "/diagnostico" },
  { label: "Muestras de entregables", href: "/muestras" },
  { label: "Recursos y datos abiertos", href: "/resources" },
  { label: "Brief NOAM", href: "/brief" },
  { label: "Recibir el Brief", href: "/newsletter" },
  { label: "Panorama municipal 2025", href: "/dataperu/panorama-municipal-2025" },
  { label: "Cómo trabajamos", href: "/como-trabajamos" },
  { label: "Todas las capacidades", href: "/services" },
  { label: "Estudios y evaluación", href: "/services/estudios-diagnosticos-evaluacion" },
  { label: "Sistemas de decisión", href: "/services/observatorios-sistemas-decision" },
  { label: "IA para la gestión", href: "/services/ia-transformacion-gestion" },
  { label: "ERM 2026", href: "/electoral/erm-2026" },
  { label: "Casos", href: "/cases" }
];

const standards = [
  { label: "Transparencia", href: "/transparency" },
  { label: "Privacidad", href: "/privacy" },
  { label: "Términos de uso", href: "/terms" },
  { label: "Cómo trabajamos", href: "/como-trabajamos" },
  { label: "Fuentes y métodos", href: "/evidence" }
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[#15211d] text-[#f4f1e8] print:hidden">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_0.7fr] md:pb-20">
          <div>
            <p className="text-lg font-semibold tracking-[0.16em]">NOAM</p>
            <p className="mt-6 max-w-lg text-2xl leading-tight tracking-[-0.035em] text-white/92 md:text-3xl">
              Evidencia, sistemas e inteligencia para decisiones que importan.
            </p>
            <a href={`mailto:${siteConfig.email}`} className="mt-8 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white">
              {siteConfig.email} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <WhatsAppLink context="un servicio de NOAM" analyticsTarget="footer:whatsapp" className="mt-3 flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-white">
              {siteConfig.phone}
            </WhatsAppLink>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Estándares</p>
            <ul className="space-y-3">
              {standards.map((item) => <li key={item.href}><NextLink href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">{item.label}</NextLink></li>)}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Explorar</p>
            <ul className="space-y-3">
              {explore.map((item) => (
                <li key={item.href}>
                  <NextLink href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">Capacidades</p>
            <ul className="space-y-3">
              {capabilities.map((item) => (
                <li key={item.href}>
                  <NextLink href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Lima, Perú.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <NextLink href="/en" className="hover:text-white">English</NextLink>
            <NextLink href="/contact" className="hover:text-white">Contacto</NextLink>
            <NextLink href="/privacy" className="hover:text-white">Privacidad</NextLink>
            <NextLink href="/terms" className="hover:text-white">Términos</NextLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
