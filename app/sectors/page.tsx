import { ArrowRight, Building2, Landmark } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { privateIndustries, publicInstitutionTypes, serviceLines } from "@/lib/brand-content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sectores",
  description: "Inteligencia pública y territorial para gobiernos, empresas y organizaciones que toman decisiones en el Perú.",
  path: "/sectors"
});

const sectorEntries = [
  {
    icon: Landmark,
    eyebrow: "Gobiernos",
    title: "Capacidad para gestionar cada territorio.",
    description: "Municipalidades, gobiernos regionales, entidades nacionales y programas que necesitan priorizar, ejecutar y mostrar resultados.",
    href: "/sectors/public-sector",
    action: "Explorar sector público",
    color: "bg-[#15211d] text-white",
    meta: ["4 escalas institucionales", "8 agendas de gestión"]
  },
  {
    icon: Building2,
    eyebrow: "Empresas y organizaciones",
    title: "Contexto para invertir, operar y crecer.",
    description: "Organizaciones que necesitan leer mercados, instituciones, actores, riesgos e impacto en territorios concretos.",
    href: "/sectors/companies",
    action: "Explorar sector privado",
    color: "bg-rust text-white",
    meta: ["6 industrias iniciales", "8 decisiones frecuentes"]
  }
];

export default function SectorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectors" }])} />

      <Section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.48fr] lg:items-end lg:gap-20">
            <div>
              <Eyebrow className="reveal text-rust">Gobiernos y empresas</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[14ch]">La misma exigencia. Decisiones distintas.</Heading>
            </div>
            <div className="reveal reveal-delay-2">
              <p className="text-base leading-8 text-ink/68">Trabajamos donde se cruzan territorio, instituciones y datos. Adaptamos el alcance a una municipalidad pequeña, una región o una operación nacional.</p>
              <Button href="/diagnostico?from=/sectors" analyticsEvent="cta_click" analyticsTarget="sectors:scope" variant="ghost" className="mt-7 gap-2">Cuéntanos tu contexto <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </Container>
      </Section>

      <section>
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {sectorEntries.map((entry) => {
              const Icon = entry.icon;
              return (
                <NextLink key={entry.href} href={entry.href} className={`group relative min-h-[500px] overflow-hidden rounded-[1.5rem] p-7 shadow-visual md:p-10 ${entry.color}`}>
                  <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[52px] border-white/10 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute bottom-[-8rem] left-[-5rem] h-72 w-72 rounded-full border border-white/10" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-white/60" aria-hidden />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">{entry.eyebrow}</span>
                    </div>
                    <div className="mt-auto pt-28">
                      <h2 className="max-w-xl text-3xl font-medium leading-[1.05] tracking-[-0.045em] md:text-5xl">{entry.title}</h2>
                      <p className="mt-5 max-w-lg text-sm leading-7 text-white/68">{entry.description}</p>
                      <div className="mt-7 flex flex-wrap gap-2">
                        {entry.meta.map((item) => <span key={item} className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/60">{item}</span>)}
                      </div>
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">{entry.action} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </div>
                </NextLink>
              );
            })}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Escalas públicas</Eyebrow>
              <Heading size="xl">Desde el distrito hasta la política nacional.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">No reducimos el alcance pequeño a una versión inferior. Diseñamos una intervención que el equipo pueda usar y sostener.</p>
              <Button href="/sectors/public-sector" variant="ghost" className="mt-7 gap-2">Ver gobiernos <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {publicInstitutionTypes.map((institution, index) => (
                <NextLink key={institution.slug} href={`/sectors/public-sector/${institution.slug}`} className="group grid gap-4 py-6 md:grid-cols-[40px_0.58fr_1fr_auto]">
                  <span className="font-mono text-[10px] text-rust">0{index + 1}</span>
                  <h2 className="text-lg font-medium leading-snug text-ink">{institution.label}</h2>
                  <div><p className="text-sm leading-6 text-ink/65">{institution.description}</p><p className="mt-3 text-xs font-medium text-rust">Entrada: {institution.entry}</p></div>
                  <ArrowRight className="hidden h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rust md:block" />
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Prácticas empresariales</Eyebrow>
              <Heading size="xl">Industrias donde territorio e instituciones importan.</Heading>
              <p className="mt-5 text-sm leading-7 text-ink/65">El repertorio crecerá con evidencia sectorial, no con etiquetas vacías. Estas son las decisiones para las que ya existe una base metodológica común.</p>
              <Button href="/sectors/companies" variant="ghost" className="mt-7 gap-2">Ver empresas <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
              {privateIndustries.map((industry, index) => (
                <NextLink key={industry.slug} href={`/sectors/companies/${industry.slug}`} className="group min-h-[220px] bg-canvas p-6 transition-colors hover:bg-panel">
                  <span className="font-mono text-[10px] text-rust">0{index + 1}</span>
                  <h2 className="mt-7 text-xl font-medium tracking-[-0.03em] text-ink">{industry.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{industry.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-rust">Ver práctica <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow>Capacidades transversales</Eyebrow><Heading size="xl">Tres formas de convertir contexto en acción.</Heading></div>
            <div className="divide-y divide-border border-y border-border">
              {serviceLines.map((service) => (
                <NextLink key={service.slug} href={`/services/${service.slug}`} className="group grid gap-4 py-6 sm:grid-cols-[44px_0.7fr_1fr_auto] sm:items-center">
                  <span className="font-mono text-[10px] text-rust">{service.number}</span>
                  <h2 className="text-lg font-medium leading-snug text-ink">{service.title}</h2>
                  <p className="text-sm leading-6 text-ink/62">{service.promise}</p>
                  <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-rust" />
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="rounded-[1.5rem] bg-[#15211d] px-6 py-12 text-white md:px-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><Eyebrow className="text-[#d9a48f]">Una consulta, no un formulario genérico</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Descríbenos la decisión, el territorio y el plazo.</h2></div>
              <Button href="/contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Iniciar conversación</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
