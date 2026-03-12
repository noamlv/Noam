import NextLink from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Button, Container } from "@/components/ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-canvas/95 backdrop-blur">
      <Container as="nav" className="flex h-[4.5rem] items-center justify-between">
        <NextLink href="/" className="text-base font-semibold tracking-[0.08em] text-ink" aria-label="NOAM Inicio">
          NOAM
        </NextLink>

        <ul className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.slice(1, 6).map((item) => (
            <li key={item.href}>
              <NextLink href={item.href} className="text-sm font-medium tracking-[-0.01em] text-muted transition-colors duration-220 hover:text-ink">
                {item.label}
              </NextLink>
            </li>
          ))}
        </ul>

        <Button href="/contact" variant="secondary" className="px-4 py-2 text-[13px]">
          Contacto
        </Button>
      </Container>
    </header>
  );
}
