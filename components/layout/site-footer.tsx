import NextLink from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container, Divider } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="mb-4 text-base font-semibold tracking-[0.08em] text-ink">NOAM</p>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Plataforma global de inteligencia aplicada para decisiones en gobierno, inversion e IA.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-muted">Explorar</p>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <NextLink href={item.href} className="text-sm text-ink/90 transition-colors duration-220 hover:text-accent">
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-muted">Contacto</p>
            <ul className="space-y-2 text-sm text-ink/90">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors duration-220 hover:text-accent">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="transition-colors duration-220 hover:text-accent">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.social.x} target="_blank" rel="noreferrer" className="transition-colors duration-220 hover:text-accent">
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Divider className="my-8" />

        <div className="flex flex-col gap-3 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>(c) {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.</p>
          <p>Hecho para rendimiento, accesibilidad y crecimiento continuo.</p>
        </div>
      </Container>
    </footer>
  );
}
