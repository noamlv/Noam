import { Menu, Search } from "lucide-react";
import NextLink from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui";

export function SiteHeader() {
  const primaryNav = siteConfig.nav.filter((item) => item.href !== "/");

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur-xl print:hidden">
      <Container as="nav" className="flex min-h-[4.75rem] items-center justify-between gap-6">
        <NextLink href="/" className="group inline-flex min-h-11 items-center gap-3" aria-label="NOAM, inicio">
          <span className="text-lg font-semibold tracking-[0.16em] text-ink">NOAM</span>
          <span className="h-4 w-px bg-border-strong transition-colors group-hover:bg-rust" aria-hidden />
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:inline">Gobierno · Datos · IA</span>
        </NextLink>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          <ul className="flex items-center gap-5 xl:gap-7">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NextLink
                  href={item.href}
                  className="whitespace-nowrap text-[13px] font-medium text-ink/70 transition-colors duration-220 hover:text-ink"
                >
                  {item.label}
                </NextLink>
              </li>
            ))}
          </ul>
          <NextLink href="/buscar" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-panel hover:text-ink" aria-label="Buscar en NOAM">
            <Search className="h-4 w-4" aria-hidden />
          </NextLink>
          <NextLink href="/en" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink" aria-label="English overview">EN</NextLink>
          <NextLink
            href="/contact"
            data-analytics-event="cta_click"
            data-analytics-target="header:contact"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-accent px-5 text-[13px] font-medium text-accent-ink transition-all duration-220 hover:-translate-y-px hover:bg-rust"
          >
            Conversemos
          </NextLink>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-border bg-panel text-ink marker:content-none">
            <Menu className="h-4 w-4" aria-hidden />
            <span className="sr-only">Abrir menú</span>
          </summary>
          <div className="absolute right-0 top-14 w-[min(19rem,calc(100vw-2rem))] rounded-md border border-border bg-panel p-3 shadow-visual">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NextLink href={item.href} className="block border-b border-border px-3 py-3 text-sm font-medium text-ink last:border-0">
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
            <NextLink href="/buscar" className="mt-2 flex items-center gap-2 border-b border-border px-3 py-3 text-sm font-medium text-ink"><Search className="h-4 w-4" aria-hidden /> Buscar</NextLink>
            <NextLink href="/en" className="mt-2 block border-b border-border px-3 py-3 text-sm font-medium text-ink">English overview</NextLink>
            <NextLink href="/contact" className="mt-3 flex min-h-11 items-center justify-center rounded-sm bg-accent px-4 text-sm font-medium text-accent-ink">
              Conversemos
            </NextLink>
          </div>
        </details>
      </Container>
    </header>
  );
}
