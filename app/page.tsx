import { ArrowRight, Building2, Landmark, MoveUpRight, Users } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { cookies } from "next/headers";
import { HeroVisitTracker } from "@/components/brand/hero-visit-tracker";
import { InstitutionalCaseCard } from "@/components/brand/institutional-case-card";
import { TerritoryEntry } from "@/components/dataperu/territory-entry";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, ResourceList, Section } from "@/components/ui";
import { serviceLines } from "@/lib/brand-content";
import { getFeaturedContent } from "@/lib/content";
import { getInstitutionalCases } from "@/lib/institutional-cases";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { homeHeroes, resolveHomeHeroIndex } from "@/lib/home-heroes";

export const metadata = buildMetadata({
  title: "Análisis de datos para decisiones públicas y territoriales",
  description:
    "Explora datos municipales, inversión pública y análisis del Perú. Conoce también los estudios y sistemas de datos de NOAM para gobiernos y empresas.",
  path: "/"
});

const entryPoints = [
  {
    icon: Landmark,
    label: "Gobiernos",
    title: "Servicios para gobiernos",
    description: "Para municipalidades, gobiernos regionales, sectores, programas y entidades nacionales.",
    href: "/sectors/public-sector"
  },
  {
    icon: Building2,
    label: "Empresas",
    title: "Servicios para empresas",
    description: "Estudios para conocer mercados, instituciones y las zonas donde opera una empresa.",
    href: "/sectors/companies"
  },
  {
    icon: Users,
    label: "Información abierta",
    title: "Explorar datos y análisis del Perú",
    description: "Perfiles, mapas, indicadores y recursos para ciudadanía, prensa, academia y equipos técnicos.",
    href: "/dataperu"
  }
];

const exploreLinks = [
  { title: "Problemas por departamento", description: "Qué afecta a la población y qué falta atender", href: "/dataperu/agendas-territoriales" },
  { title: "Presupuesto municipal", description: "Consulta recursos y ejecución del gasto", href: "/dataperu/municipios" },
  { title: "Proyectos de inversión", description: "Revisa montos y avance financiero", href: "/dataperu/inversiones" },
  { title: "Análisis por tema", description: "Explora datos, gráficos y resultados", href: "/analisis" }
];

const publications = [
  { title: "DataPerú", label: "Datos del país", description: "Consulta información de municipios, departamentos, presupuesto y servicios públicos.", href: "/dataperu", action: "Explorar DataPerú" },
  { title: "Barómetro ciudadano", label: "Encuestas y opinión", description: "Conoce qué dicen las encuestas y cómo interpretar sus resultados. Consulta el análisis de enero de 2026.", href: "/barometro-ciudadano", action: "Ver encuestas analizadas" },
  { title: "Análisis por tema", label: "Gráficos interactivos", description: "Revisa nuestros análisis de residuos, planeamiento territorial, discapacidad y deporte.", href: "/analisis", action: "Elegir un análisis" }
];

export default async function HomePage() {
  const cookieStore = await cookies();
  const heroIndex = resolveHomeHeroIndex(cookieStore.get("noam_hero_index")?.value);
  const hero = homeHeroes[heroIndex];
  const [insights, indicators, institutionalCases] = await Promise.all([
    getFeaturedContent("insights", 2),
    getFeaturedContent("indicators", 1),
    getInstitutionalCases()
  ]);
  const resources = [...insights, ...indicators]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }])} />

      <section className="overflow-hidden pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.4fr] lg:items-end">
            <div>
              <Eyebrow className="reveal text-rust">Consultoría para gobiernos y empresas</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[15ch]">
                Análisis de datos para decisiones públicas y territoriales
              </Heading>
            </div>
            <div className="reveal reveal-delay-2 lg:pb-2">
              <p className="max-w-xl text-base leading-[1.72] text-ink/72">
                Estudios, encuestas y herramientas de datos para comprender problemas, evaluar resultados y mejorar la gestión.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/contact" analyticsEvent="cta_click" analyticsTarget="home:hero-contact" className="rounded-full px-6">Conversar sobre un problema</Button>
                <Button href="/analisis" variant="ghost" className="gap-2">Ver análisis por tema <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-3 relative mt-12 overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-visual md:mt-16">
            <HeroVisitTracker currentIndex={heroIndex} total={homeHeroes.length} />
            <Image src={hero.src} alt={hero.alt} width={1672} height={941} className="aspect-[1.35/1] w-full object-cover sm:aspect-[1.8/1] lg:aspect-[2.25/1]" priority sizes="(max-width: 768px) 100vw, 1160px" />
          </div>
          <p className="mt-2 text-right text-[10px] text-muted">Imagen ilustrativa</p>

          <div className="draw-line mt-8 h-px bg-border" />
          <div className="grid divide-y divide-border border-b border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {exploreLinks.map((link) => (
              <NextLink key={link.href} href={link.href} className="group py-6 sm:px-6 sm:first:pl-0 lg:py-8">
                <h2 className="flex items-start gap-2 text-lg font-medium leading-6 tracking-tight text-ink group-hover:text-rust">{link.title}<ArrowRight className="mt-1 h-4 w-4 shrink-0" aria-hidden /></h2>
                <p className="mt-3 text-sm leading-6 text-muted">{link.description}</p>
              </NextLink>
            ))}
          </div>
        </Container>
      </section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:gap-8">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-[#15211d] p-7 text-white md:p-10">
              <div className="relative flex h-full min-h-[420px] flex-col">
                <Eyebrow className="text-[#d9a48f]">Agenda de gestión 2026</Eyebrow>
                <h2 className="mt-10 max-w-[13ch] text-4xl font-medium leading-[1.02] tracking-[-0.05em] md:text-5xl">¿Qué necesita tu región o municipio?</h2>
                <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">Información para conocer los problemas locales, preparar la nueva gestión y seguir los compromisos de las autoridades.</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-10">
                  <Button href="/electoral/erm-2026" analyticsEvent="cta_click" analyticsTarget="home:erm-2026" variant="secondary" className="rounded-full border-white bg-white text-ink">Consultar la agenda</Button>
                </div>
              </div>
            </div>
            <TerritoryEntry />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.62fr_1fr] md:items-end">
            <div><Eyebrow>Nuestra experiencia</Eyebrow><Heading size="xl">Conoce el trabajo realizado</Heading></div>
            <div className="md:justify-self-end"><p className="max-w-2xl text-sm leading-7 text-ink/68">Consultorías realizadas por Noam López para CONCYTEC, el IPD y el Gobierno Regional del Cusco.</p><Button href="/cases" variant="ghost" className="mt-4 gap-2">Ver experiencias <ArrowRight className="h-4 w-4" /></Button></div>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">{institutionalCases.map((item, index) => <InstitutionalCaseCard key={item.slug} item={item} index={index} compact />)}</div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div><Eyebrow>Datos y publicaciones</Eyebrow><Heading size="xl" className="max-w-2xl">Consulta nuestros datos y análisis</Heading></div>
            <Button href="/evidence" variant="ghost" className="justify-start gap-2 !text-ink">Ver más publicaciones <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {publications.map((publication) => (
              <article key={publication.href} className="flex flex-col rounded-[1.25rem] border border-border bg-white p-7 md:p-8">
                <Eyebrow>{publication.label}</Eyebrow>
                <h3 className="mt-8 text-3xl font-medium tracking-tight text-ink">{publication.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{publication.description}</p>
                <NextLink href={publication.href} className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-ink hover:text-rust">{publication.action}<ArrowRight className="h-4 w-4" aria-hidden /></NextLink>
              </article>
            ))}
          </div>
          <ResourceList items={resources} variant="rows" className="mt-10" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.48fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Si necesitas un estudio o sistema</Eyebrow>
              <Heading size="xl">Servicios para tu organización</Heading>
              <p className="mt-6 max-w-md text-sm leading-7 text-ink/68">Consulta los servicios para gobiernos y empresas, o sigue explorando la información abierta de DataPerú.</p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {entryPoints.map((entry) => {
                const Icon = entry.icon;
                return (
                  <NextLink key={entry.label} href={entry.href} className="group grid gap-4 py-6 transition-colors hover:text-rust sm:grid-cols-[40px_1fr_auto] sm:items-center md:py-8">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-panel text-ink"><Icon className="h-4 w-4" aria-hidden /></span>
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{entry.label}</span>
                      <span className="mt-1 block text-xl font-medium tracking-[-0.025em] text-ink md:text-2xl">{entry.title}</span>
                      <span className="mt-2 block max-w-2xl text-sm leading-6 text-ink/65">{entry.description}</span>
                    </span>
                    <MoveUpRight className="hidden h-5 w-5 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
                  </NextLink>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="servicios" className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div><Eyebrow>Servicios</Eyebrow><Heading size="xl">Estudios, seguimiento y mejora de procesos</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end md:text-base">Podemos comenzar con datos públicos y ampliar el alcance con información institucional, trabajo de campo o desarrollo tecnológico.</p>
          </div>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {serviceLines.map((service) => (
              <article key={service.slug} className="group grid gap-6 py-8 md:grid-cols-[70px_0.85fr_1fr_auto] md:items-start md:py-11">
                <span className="text-xs font-semibold text-rust">{service.number}</span>
                <div><h2 className="text-2xl font-medium leading-tight tracking-[-0.035em] text-ink md:text-3xl">{service.title}</h2><p className="mt-3 text-sm font-medium text-ink/78">{service.promise}</p></div>
                <div><p className="text-sm leading-6 text-ink/65">{service.description}</p><div className="mt-5 flex flex-wrap gap-2">{service.deliverables.slice(0, 3).map((item) => <Badge key={item}>{item}</Badge>)}</div></div>
                <NextLink href={`/services/${service.slug}`} className="inline-flex min-h-11 max-w-56 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-ink transition-all group-hover:border-rust group-hover:bg-rust group-hover:text-white">Ver {service.title.toLowerCase()} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /></NextLink>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-6 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">Si necesitas apoyo de NOAM</p><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué necesitas estudiar o mejorar</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/solutions" variant="ghost" className="!text-white/90 hover:!text-white">Ver opciones de trabajo</Button><Button href="/diagnostico" variant="ghost" className="!text-white/90 hover:!text-white">Describir mi consulta</Button><Button href="/contact" analyticsEvent="cta_click" analyticsTarget="home:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Contactar a NOAM</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
