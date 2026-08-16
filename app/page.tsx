import { ArrowRight, Building2, Check, Landmark, MoveUpRight, Route, Users } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { cookies } from "next/headers";
import { CaseProofCard } from "@/components/brand/case-proof-card";
import { DataVisual } from "@/components/brand/data-visual";
import { HeroVisitTracker } from "@/components/brand/hero-visit-tracker";
import { InstitutionalCaseCard } from "@/components/brand/institutional-case-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Badge, Button, Container, Eyebrow, Heading, ResourceList, Section } from "@/components/ui";
import { deliverySteps, privateIndustries, publicInstitutionTypes, serviceLines } from "@/lib/brand-content";
import { getFeaturedContent } from "@/lib/content";
import { productProofs } from "@/lib/product-proofs";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { panoramaFindings } from "@/lib/dataperu-panorama";
import { getLatestBriefEdition } from "@/lib/brief";
import { getInstitutionalCases } from "@/lib/institutional-cases";
import { homeHeroes, resolveHomeHeroIndex } from "@/lib/home-heroes";

export const metadata = buildMetadata({
  title: "Inteligencia pública y territorial",
  description:
    "NOAM desarrolla estudios, sistemas de decisión e inteligencia artificial para gobiernos, empresas y organizaciones en todo el Perú.",
  path: "/"
});

const entryPoints = [
  {
    icon: Landmark,
    label: "Gobiernos",
    title: "Decidir y ejecutar con mejor evidencia",
    description: "Para municipalidades, gobiernos regionales, entidades nacionales y programas públicos.",
    href: "/sectors/public-sector"
  },
  {
    icon: Building2,
    label: "Empresas",
    title: "Entender mercados, instituciones y territorio",
    description: "Para organizaciones que evalúan inversiones, expansión, impacto o riesgos.",
    href: "/sectors/companies"
  },
  {
    icon: Users,
    label: "Ciudadanía y conocimiento",
    title: "Explorar el país con datos comprensibles",
    description: "Indicadores, mapas, análisis y recursos abiertos para entender decisiones públicas.",
    href: "/dataperu"
  }
];

const faqItems = [
  {
    title: "¿Trabajan con municipalidades pequeñas?",
    content:
      "Sí. Podemos comenzar con información pública y un módulo acotado: perfil territorial, diagnóstico rápido, tablero de inversión o brief de prioridades. El alcance se adapta a la capacidad y necesidad de cada institución."
  },
  {
    title: "¿También trabajan con empresas privadas?",
    content:
      "Sí. Aplicamos inteligencia territorial, estudios de mercado y opinión, evaluación, monitoreo e IA en organizaciones que necesitan comprender el entorno público, social o económico de sus decisiones."
  },
  {
    title: "¿La entidad necesita tener sus datos ordenados?",
    content:
      "No. Podemos iniciar con fuentes públicas y archivos existentes. Como parte del proyecto documentamos fuentes, indicadores y procesos para dejar una base más ordenada y sostenible."
  },
  {
    title: "¿NOAM entrega informes o también construye sistemas?",
    content:
      "Ambos. Según la decisión, el resultado puede ser un estudio, un diagnóstico, un dashboard, un visor georreferenciado, una automatización o un sistema de seguimiento con acompañamiento."
  }
];

const proofSignals = [
  { value: "1,891", label: "perfiles municipales", source: "DataPerú", href: "/dataperu/municipios" },
  { value: "9,429", label: "proyectos visibles", source: "MEF 2025", href: "/cases/dataperu-platform-case" },
  { value: "36", label: "planes procesados", source: "Planómetro 2026", href: "/electoral/planometro-2026" },
  { value: "1,300", label: "entrevistas analizadas", source: "Barómetro 2026", href: "/electoral/barometro-enero-2026" }
];

export default async function HomePage() {
  const cookieStore = await cookies();
  const heroIndex = resolveHomeHeroIndex(cookieStore.get("noam_hero_index")?.value);
  const hero = homeHeroes[heroIndex];
  const latestBrief = getLatestBriefEdition();
  const [insights, indicators, cases, institutionalCases] = await Promise.all([
    getFeaturedContent("insights", 2),
    getFeaturedContent("indicators", 1),
    getFeaturedContent("cases", 1),
    getInstitutionalCases()
  ]);
  const resources = [...insights, ...indicators, ...cases]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 4);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }])} />

      <section className="overflow-hidden pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.38fr] lg:items-end">
            <div>
              <Eyebrow className="reveal text-rust">Consultora de inteligencia pública y territorial</Eyebrow>
              <Heading as="h1" size="display" className="reveal reveal-delay-1 max-w-[16ch]">
                Decisiones más claras. Territorios mejor entendidos.
              </Heading>
            </div>
            <div className="reveal reveal-delay-2 lg:pb-2">
              <p className="max-w-xl text-base leading-[1.72] text-ink/72">
                Estudios, sistemas de decisión e inteligencia artificial para gobiernos, empresas y organizaciones que necesitan convertir evidencia en acción.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/contact" analyticsEvent="cta_click" analyticsTarget="home:hero-contact" className="rounded-full px-6">Plantear un desafío</Button>
                <Button href="/solutions" variant="ghost" className="gap-2">
                  Ver soluciones <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-3 relative mt-12 overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-visual md:mt-16">
            <HeroVisitTracker currentIndex={heroIndex} total={homeHeroes.length} />
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1672}
              height={941}
              className="aspect-[1.35/1] w-full object-cover sm:aspect-[1.8/1] lg:aspect-[2.25/1]"
              priority
              sizes="(max-width: 768px) 100vw, 1160px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid gap-5 p-5 text-white sm:grid-cols-[1fr_auto] sm:items-end md:p-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">{hero.eyebrow}</p>
                <p className="mt-2 max-w-xl text-lg font-medium leading-snug tracking-[-0.025em] md:text-2xl">
                  {hero.caption}
                </p>
              </div>
              <div className="hidden gap-2 sm:flex">
                {["Local", "Regional", "Nacional"].map((scale) => (
                  <span key={scale} className="rounded-full border border-white/25 bg-black/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] backdrop-blur">
                    {scale}
                  </span>
                ))}
              </div>
            </div>
            <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/15 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-white/58 backdrop-blur-sm">Imagen editorial</span>
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

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.52fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Encuentra tu entrada</Eyebrow>
              <Heading size="xl">Una plataforma, distintas decisiones.</Heading>
              <p className="mt-6 max-w-md text-sm leading-7 text-ink/68">
                Partimos de la necesidad del usuario. La tecnología y el método se eligen después.
              </p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {entryPoints.map((entry) => {
                const Icon = entry.icon;
                return (
                  <NextLink key={entry.label} href={entry.href} className="group grid gap-4 py-6 transition-colors hover:text-rust sm:grid-cols-[40px_1fr_auto] sm:items-center md:py-8">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-canvas text-ink">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
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

      <Section id="servicios">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-end">
            <div>
              <Eyebrow>Qué hacemos</Eyebrow>
              <Heading size="xl">Tres capacidades. Una misma exigencia.</Heading>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-ink/68 md:justify-self-end md:text-base">
              Cada encargo combina conocimiento sectorial, método y producto. No vendemos herramientas aisladas: construimos la respuesta adecuada para la decisión.
            </p>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {serviceLines.map((service) => (
              <article key={service.slug} className="group grid gap-6 py-8 md:grid-cols-[70px_0.85fr_1fr_auto] md:items-start md:py-11">
                <span className="text-xs font-semibold text-rust">{service.number}</span>
                <div>
                  <h2 className="text-2xl font-medium leading-tight tracking-[-0.035em] text-ink md:text-3xl">{service.title}</h2>
                  <p className="mt-3 text-sm font-medium text-ink/78">{service.promise}</p>
                </div>
                <div>
                  <p className="text-sm leading-6 text-ink/65">{service.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.deliverables.slice(0, 3).map((item) => <Badge key={item}>{item}</Badge>)}
                  </div>
                </div>
                <NextLink href={`/services/${service.slug}`} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-all group-hover:border-rust group-hover:bg-rust group-hover:text-white" aria-label={`Ver ${service.title}`}>
                  <ArrowRight className="h-4 w-4" />
                </NextLink>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.62fr_1fr] md:items-end">
            <div>
              <Eyebrow>Experiencia institucional</Eyebrow>
              <Heading size="xl">Trabajo real, presentado con evidencia y límites.</Heading>
            </div>
            <div className="md:justify-self-end">
              <p className="max-w-2xl text-sm leading-7 text-ink/68">Consultorías desarrolladas para entidades públicas por el fundador de NOAM. Publicamos el problema, el método y los productos sin exponer información reservada.</p>
              <Button href="/cases" variant="ghost" className="mt-4 gap-2">Ver toda la experiencia <ArrowRight className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {institutionalCases.map((item, index) => <InstitutionalCaseCard key={item.slug} item={item} index={index} />)}
          </div>
        </Container>
      </Section>

      <Section className="overflow-hidden bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Eyebrow className="text-[#d9a48f]">DataPerú</Eyebrow>
              <Heading size="xl" className="text-white">El país, convertido en una herramienta de decisión.</Heading>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                Una plataforma para explorar territorios, indicadores, inversiones, brechas y señales públicas. La capa abierta informa; los módulos institucionales ayudan a gestionar.
              </p>
              <ul className="mt-8 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
                {["Perfiles territoriales", "Mapas y comparadores", "Observatorios temáticos", "Briefs ejecutivos"].map((item) => (
                  <li key={item} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#d9a48f]" /> {item}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/dataperu" analyticsEvent="cta_click" analyticsTarget="home:dataperu-explore" variant="secondary" className="rounded-full border-white/20 bg-white text-ink">Explorar DataPerú</Button>
                <Button href="/contact?interest=dataperu" analyticsEvent="cta_click" analyticsTarget="home:dataperu-contact" variant="ghost" className="text-white/70 hover:text-white">Crear un módulo institucional</Button>
              </div>
            </div>
            <DataVisual className="min-h-[430px] border-white/10 bg-[#1b2d27]" />
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border bg-[#ded9cc]">
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.68fr_1fr] md:items-end">
            <div>
              <Eyebrow>Productos y casos</Eyebrow>
              <Heading size="xl" className="max-w-2xl">Capacidad que se puede abrir, usar y auditar.</Heading>
            </div>
            <div className="md:justify-self-end">
              <p className="max-w-2xl text-sm leading-7 text-ink/68">Antes de una conversación comercial puedes revisar el producto, sus fuentes, el método y los límites de lectura.</p>
              <div className="mt-4 flex flex-wrap gap-5"><Button href="/dataperu/panorama-municipal-2025" variant="ghost" className="justify-start gap-2 !text-ink hover:!text-rust">Leer estudio insignia <ArrowRight className="h-4 w-4" /></Button><Button href="/cases" variant="ghost" className="justify-start gap-2 !text-ink hover:!text-rust">Ver casos <ArrowRight className="h-4 w-4" /></Button></div>
            </div>
          </div>
          <NextLink href="/dataperu/panorama-municipal-2025" className="group mt-12 grid gap-8 overflow-hidden rounded-md border border-ink/15 bg-[#15211d] p-6 text-white transition-all hover:-translate-y-0.5 hover:shadow-visual md:grid-cols-[0.8fr_1fr] md:p-8">
            <div><span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9a48f]">Panorama municipal del Perú 2025</span><h3 className="mt-5 max-w-xl text-3xl font-medium leading-[1.08] tracking-[-0.04em] md:text-4xl">El Perú municipal no cabe en un promedio.</h3><p className="mt-5 max-w-xl text-sm leading-7 text-white/58">Una lectura ejecutiva de 1,891 gobiernos locales, con tabla departamental, método y datos descargables.</p><span className="mt-7 inline-flex items-center gap-2 text-sm text-white/75">Abrir estudio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span></div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/12">{panoramaFindings.map((finding) => <div key={finding.number} className="min-h-[145px] bg-[#1b2d27] p-5"><span className="font-mono text-[9px] text-[#d9a48f]">{finding.number}</span><p className="mt-7 text-2xl font-medium tracking-[-0.045em]">{finding.value}</p><p className="mt-2 text-[10px] leading-4 text-white/55">{finding.label}</p></div>)}</div>
          </NextLink>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <CaseProofCard proof={productProofs.dataperu} />
            <CaseProofCard proof={productProofs.planometro} />
            <CaseProofCard proof={productProofs.barometro} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Gobiernos y empresas</Eyebrow>
              <Heading size="xl">Capacidad nacional. Respuesta situada.</Heading>
              <p className="mt-6 text-sm leading-7 text-ink/68">
                Una municipalidad pequeña y una operación nacional no necesitan el mismo alcance. Comparten la necesidad de evidencia clara y soluciones que puedan sostener.
              </p>
              <Button href="/sectors" variant="ghost" className="mt-7 gap-2">Ver todos los sectores <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <NextLink href="/sectors/public-sector" className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[1.25rem] bg-[#15211d] p-7 text-white shadow-visual md:p-8">
                <Image src="/images/noam-public-sector.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover opacity-65 transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15211d] via-[#15211d]/48 to-[#15211d]/12" />
                <div className="relative flex items-center justify-between"><Landmark className="h-5 w-5 text-white/70" /><span className="text-[10px] uppercase tracking-[0.16em] text-white/60">Sector público</span></div>
                <div className="relative mt-auto pt-20">
                  <h3 className="text-3xl font-medium leading-tight tracking-[-0.04em]">Gestionar mejor cada territorio.</h3>
                  <p className="mt-4 text-sm leading-6 text-white/62">De una municipalidad distrital a un programa nacional.</p>
                  <div className="mt-6 flex flex-wrap gap-2">{publicInstitutionTypes.slice(0, 3).map((item) => <span key={item.slug} className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/55">{item.label}</span>)}</div>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm">Ver gobiernos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </NextLink>
              <NextLink href="/sectors/companies" className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[1.25rem] bg-rust p-7 text-white shadow-visual md:p-8">
                <Image src="/images/noam-private-sector.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover opacity-68 transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6d2a1d] via-[#7f3929]/52 to-[#15211d]/10" />
                <div className="relative flex items-center justify-between"><Building2 className="h-5 w-5 text-white/70" /><span className="text-[10px] uppercase tracking-[0.16em] text-white/65">Empresas</span></div>
                <div className="relative mt-auto pt-20">
                  <h3 className="text-3xl font-medium leading-tight tracking-[-0.04em]">Invertir y operar con contexto.</h3>
                  <p className="mt-4 text-sm leading-6 text-white/68">Mercado, instituciones, actores y territorio en una sola lectura.</p>
                  <div className="mt-6 flex flex-wrap gap-2">{privateIndustries.slice(0, 3).map((item) => <span key={item.slug} className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] text-white/65">{item.title}</span>)}</div>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm">Ver empresas <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </NextLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative overflow-hidden rounded-[1.25rem] bg-[#ddd8cb] p-7 md:p-10">
              <div className="absolute right-[-12%] top-[-18%] h-64 w-64 rounded-full border-[40px] border-rust/15" />
              <div className="relative">
                <Eyebrow>Elecciones y gobierno</Eyebrow>
                <Heading size="lg">Electoral es una puerta hacia mejores gestiones.</Heading>
                <p className="mt-5 max-w-xl text-sm leading-7 text-ink/68">
                  Planómetro, opinión pública y perfiles territoriales antes de la elección. Transferencia, agenda de 100 días y seguimiento de compromisos después.
                </p>
                <Button href="/electoral" analyticsEvent="cta_click" analyticsTarget="home:electoral-explore" variant="secondary" className="mt-8 rounded-full bg-canvas">Entrar a Electoral</Button>
              </div>
              <div className="relative mt-12 grid grid-cols-4 gap-2">
                {[42, 67, 54, 81].map((value, index) => (
                  <div key={value} className="flex h-28 items-end bg-canvas/45 p-2">
                    <span className="w-full bg-ink/75" style={{ height: `${value}%` }} />
                    <span className="sr-only">Serie {index + 1}: {value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>Cómo trabajamos</Eyebrow>
              <Heading size="xl">Del problema al uso real.</Heading>
              <div className="mt-8 divide-y divide-border border-y border-border">
                {deliverySteps.map((step) => (
                  <div key={step.number} className="grid grid-cols-[36px_1fr] gap-4 py-5">
                    <span className="text-xs font-semibold text-rust">{step.number}</span>
                    <div>
                      <h3 className="text-base font-medium text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink/65">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Evidencia abierta</Eyebrow>
              <Heading size="xl" className="max-w-2xl">Pensar en público. Trabajar con rigor.</Heading>
            </div>
            <Button href="/evidence" variant="ghost" className="justify-start gap-2">Ver biblioteca <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <ResourceList items={resources} variant="rows" className="mt-10" />
          <NextLink href={`/brief/${latestBrief.slug}`} className="group mt-10 grid overflow-hidden rounded-[1.25rem] border border-border bg-[#15211d] text-white transition-all hover:-translate-y-0.5 hover:shadow-subtle lg:grid-cols-[0.72fr_1fr]">
            <div className="flex min-h-[260px] flex-col p-7 md:p-9"><div className="flex items-center justify-between font-mono text-[9px] text-[#d9a48f]"><span>BRIEF NOAM · N.º {latestBrief.issue}</span><span>{latestBrief.readingTime}</span></div><h2 className="mt-auto max-w-xl pt-12 text-3xl font-medium leading-[1.06] tracking-[-0.045em] md:text-4xl">{latestBrief.title}</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/55">{latestBrief.description}</p><span className="mt-7 inline-flex items-center gap-2 text-xs text-white/75">Leer edición <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden /></span></div>
            <div className="grid grid-cols-3 gap-px bg-white/14">{latestBrief.signals.map((signal) => <div key={signal.number} className="flex min-h-[150px] flex-col bg-[#1b2d27] p-4 lg:min-h-[260px] lg:p-6"><span className="font-mono text-[9px] text-[#d9a48f]">{signal.number}</span><div className="mt-auto pt-10"><p className="text-2xl font-medium tracking-[-0.055em] md:text-3xl">{signal.value}</p><p className="mt-2 text-[8px] font-semibold uppercase leading-4 tracking-[0.12em] text-white/55">{signal.label}</p></div></div>)}</div>
          </NextLink>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-20">
            <div><Route className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Herramienta abierta</Eyebrow><Heading size="xl" className="max-w-[13ch] text-white">Si todavía no existe un TDR, comienza por el alcance.</Heading><p className="mt-6 max-w-xl text-sm leading-7 text-white/62 md:text-base">Cuatro decisiones generan una recomendación, fases y entregables iniciales. Puedes descargar el brief sin registrarte ni enviar información.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="/diagnostico" analyticsEvent="cta_click" analyticsTarget="home:scope-builder" variant="secondary" className="rounded-full border-white bg-white text-ink">Diseñar un alcance</Button><Button href="/contact" analyticsEvent="cta_click" analyticsTarget="home:scope-direct-contact" variant="ghost" className="!text-white/65 hover:!text-white">Ya tengo un encargo claro</Button></div></div>
            <div className="grid gap-px overflow-hidden rounded-md bg-white/14 sm:grid-cols-2">{[["01", "Organización"], ["02", "Decisión"], ["03", "Evidencia"], ["04", "Horizonte"]].map(([number, label], index) => <div key={number} className={`min-h-[150px] p-6 ${index === 3 ? "bg-[#20372f]" : "bg-[#15211d]"}`}><span className="font-mono text-[9px] text-[#d9a48f]">{number}</span><p className="mt-12 text-xl font-medium tracking-[-0.025em] text-white">{label}</p></div>)}</div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container size="narrow">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <Heading size="xl">Antes de comenzar.</Heading>
          <Accordion items={faqItems} className="mt-8" />
        </Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-6 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">Conversemos</p>
                <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">
                  Cuéntanos qué decisión necesitas tomar. Diseñaremos el punto de partida.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/como-trabajamos" variant="ghost" className="!text-white/90 hover:!text-white">Cómo trabajamos</Button>
                <Button href="/contact" analyticsEvent="cta_click" analyticsTarget="home:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Plantear un desafío</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
