import { ArrowRight, Building2, Landmark, MoveUpRight, Users } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { cookies } from "next/headers";
import { CaseProofCard } from "@/components/brand/case-proof-card";
import { HeroVisitTracker } from "@/components/brand/hero-visit-tracker";
import { InstitutionalCaseCard } from "@/components/brand/institutional-case-card";
import { TerritoryEntry } from "@/components/dataperu/territory-entry";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge, Button, Container, Eyebrow, Heading, ResourceList, Section } from "@/components/ui";
import { serviceLines } from "@/lib/brand-content";
import { getFeaturedContent } from "@/lib/content";
import { getInstitutionalCases } from "@/lib/institutional-cases";
import { productProofs } from "@/lib/product-proofs";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { homeHeroes, resolveHomeHeroIndex } from "@/lib/home-heroes";

export const metadata = buildMetadata({
  title: "Análisis de datos para decisiones públicas y territoriales",
  description:
    "NOAM desarrolla estudios, líneas de base, evaluaciones, observatorios y sistemas de datos para gobiernos y empresas en todo el Perú.",
  path: "/"
});

const entryPoints = [
  {
    icon: Landmark,
    label: "Gobiernos",
    title: "Diseñar, priorizar y evaluar",
    description: "Para municipalidades, gobiernos regionales, sectores, programas y entidades nacionales.",
    href: "/sectors/public-sector"
  },
  {
    icon: Building2,
    label: "Empresas",
    title: "Invertir y operar con contexto",
    description: "Para organizaciones que necesitan entender mercados, instituciones, actores y territorio.",
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

const proofSignals = [
  { value: "1,891", label: "perfiles municipales", source: "DataPerú", href: "/dataperu/municipios" },
  { value: "9,429", label: "proyectos visibles", source: "MEF 2025", href: "/dataperu/inversiones" },
  { value: "36", label: "planes procesados", source: "Planómetro 2026", href: "/electoral/planometro-2026" },
  { value: "1,300", label: "entrevistas analizadas", source: "Barómetro 2026", href: "/electoral/barometro-enero-2026" }
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
              <Eyebrow className="reveal text-rust">Consultora peruana de datos y políticas públicas</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[15ch]">
                Análisis de datos para decisiones públicas y territoriales.
              </Heading>
            </div>
            <div className="reveal reveal-delay-2 lg:pb-2">
              <p className="max-w-xl text-base leading-[1.72] text-ink/72">
                Estudios, líneas de base, evaluaciones y sistemas de información para gobiernos y empresas que necesitan diseñar, priorizar o medir una intervención.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/contact" analyticsEvent="cta_click" analyticsTarget="home:hero-contact" className="rounded-full px-6">Plantear un encargo</Button>
                <Button href="/solutions" variant="ghost" className="gap-2">Ver soluciones <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-3 relative mt-12 overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-visual md:mt-16">
            <HeroVisitTracker currentIndex={heroIndex} total={homeHeroes.length} />
            <Image src={hero.src} alt={hero.alt} width={1672} height={941} className="aspect-[1.35/1] w-full object-cover sm:aspect-[1.8/1] lg:aspect-[2.25/1]" priority sizes="(max-width: 768px) 100vw, 1160px" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid gap-5 p-5 text-white sm:grid-cols-[1fr_auto] sm:items-end md:p-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">{hero.eyebrow}</p>
                <p className="mt-2 max-w-xl text-lg font-medium leading-snug tracking-[-0.025em] md:text-2xl">{hero.caption}</p>
              </div>
              <div className="hidden gap-2 sm:flex">
                {["Local", "Regional", "Nacional"].map((scale) => <span key={scale} className="rounded-full border border-white/25 bg-black/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] backdrop-blur">{scale}</span>)}
              </div>
            </div>
          </div>

          <div className="draw-line mt-8 h-px bg-border" />
          <div className="grid divide-y divide-border border-b border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {proofSignals.map((signal) => (
              <NextLink key={signal.label} href={signal.href} className="group py-6 sm:px-6 sm:first:pl-0 lg:py-8">
                <p className="text-3xl font-medium tracking-[-0.055em] text-ink transition-colors duration-200 group-hover:text-rust md:text-4xl">{signal.value}</p>
                <p className="mt-2 text-xs font-medium text-ink/72">{signal.label}</p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">{signal.source}</p>
              </NextLink>
            ))}
          </div>
        </Container>
      </section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:gap-8">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-[#15211d] p-7 text-white md:p-10">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-rust/18" />
              <div className="relative flex h-full min-h-[420px] flex-col">
                <div className="flex items-center justify-between gap-4">
                  <Eyebrow className="text-[#d9a48f]">Agenda ERM 2026</Eyebrow>
                  <span className="rounded-full border border-white/14 px-3 py-1.5 font-mono text-[9px] text-white/52">04 OCT 2026</span>
                </div>
                <h2 className="mt-10 max-w-[13ch] text-4xl font-medium leading-[1.02] tracking-[-0.05em] md:text-5xl">Entender la elección. Preparar la gestión.</h2>
                <p className="mt-6 max-w-xl text-sm leading-7 text-white/62">Perfiles territoriales, propuestas, transferencia y primeros 100 días para convertir la coyuntura electoral en decisiones que puedan ejecutarse.</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-10">
                  <Button href="/electoral/erm-2026" analyticsEvent="cta_click" analyticsTarget="home:erm-2026" variant="secondary" className="rounded-full border-white bg-white text-ink">Abrir especial ERM 2026</Button>
                  <Button href="/electoral/planometro-2026" variant="ghost" className="!text-white/64 hover:!text-white">Explorar Planómetro</Button>
                </div>
              </div>
            </div>
            <TerritoryEntry />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.48fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Encuentra tu entrada</Eyebrow>
              <Heading size="xl">Una plataforma. Tres formas de usarla.</Heading>
              <p className="mt-6 max-w-md text-sm leading-7 text-ink/68">El punto de partida cambia según la decisión, no según la herramienta.</p>
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
            <div><Eyebrow>Servicios</Eyebrow><Heading size="xl">Tres capacidades para encargos concretos.</Heading></div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end md:text-base">Podemos comenzar con datos públicos y ampliar el alcance con información institucional, trabajo de campo o desarrollo tecnológico.</p>
          </div>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {serviceLines.map((service) => (
              <article key={service.slug} className="group grid gap-6 py-8 md:grid-cols-[70px_0.85fr_1fr_auto] md:items-start md:py-11">
                <span className="text-xs font-semibold text-rust">{service.number}</span>
                <div><h2 className="text-2xl font-medium leading-tight tracking-[-0.035em] text-ink md:text-3xl">{service.title}</h2><p className="mt-3 text-sm font-medium text-ink/78">{service.promise}</p></div>
                <div><p className="text-sm leading-6 text-ink/65">{service.description}</p><div className="mt-5 flex flex-wrap gap-2">{service.deliverables.slice(0, 3).map((item) => <Badge key={item}>{item}</Badge>)}</div></div>
                <NextLink href={`/services/${service.slug}`} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-all group-hover:border-rust group-hover:bg-rust group-hover:text-white" aria-label={`Ver ${service.title}`}><ArrowRight className="h-4 w-4" /></NextLink>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.62fr_1fr] md:items-end">
            <div><Eyebrow>Experiencia institucional</Eyebrow><Heading size="xl">Tres consultorías. Problemas y entregables verificables.</Heading></div>
            <div className="md:justify-self-end"><p className="max-w-2xl text-sm leading-7 text-ink/68">Experiencia desarrollada para CONCYTEC, el Instituto Peruano del Deporte y el Gobierno Regional del Cusco, publicada sin información reservada.</p><Button href="/cases" variant="ghost" className="mt-4 gap-2">Ver todos los casos <ArrowRight className="h-4 w-4" /></Button></div>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">{institutionalCases.map((item, index) => <InstitutionalCaseCard key={item.slug} item={item} index={index} />)}</div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div><Eyebrow>Productos y evidencia</Eyebrow><Heading size="xl" className="max-w-2xl">Abre el producto antes de conversar con nosotros.</Heading></div>
            <Button href="/evidence" variant="ghost" className="justify-start gap-2 !text-ink">Ver biblioteca completa <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <CaseProofCard proof={productProofs.dataperu} />
            <CaseProofCard proof={productProofs.planometro} />
            <CaseProofCard proof={productProofs.barometro} />
          </div>
          <ResourceList items={resources} variant="rows" className="mt-10" />
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-6 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">Comienza por la pregunta</p><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Cuéntanos qué necesitas comprender, construir o evaluar.</h2></div>
              <div className="flex flex-wrap gap-3"><Button href="/diagnostico" variant="ghost" className="!text-white/90 hover:!text-white">Diseñar un alcance</Button><Button href="/contact" analyticsEvent="cta_click" analyticsTarget="home:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Plantear un encargo</Button></div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
