import { ArrowRight, BarChart3, Building2, Check, Landmark, MoveUpRight } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Public and territorial intelligence in Peru",
  description: "NOAM develops research, decision systems and responsible AI for governments, companies and organizations operating across Peru.",
  path: "/en",
  locale: "en_US",
  languages: { es: siteConfig.url, en: `${siteConfig.url}/en` }
});

const capabilities = [
  {
    number: "01",
    title: "Research, diagnostics and evaluation",
    text: "Understand problems, measure results and establish priorities through territorial, institutional, quantitative and qualitative evidence.",
    href: "/services/estudios-diagnosticos-evaluacion"
  },
  {
    number: "02",
    title: "Observatories and decision systems",
    text: "Connect indicators, projects, budgets and services with alerts, ownership and management routines.",
    href: "/services/observatorios-sistemas-decision"
  },
  {
    number: "03",
    title: "AI and management transformation",
    text: "Improve concrete processes with controlled pilots, human oversight, measurable outcomes and responsible governance.",
    href: "/services/ia-transformacion-gestion"
  }
];

const openWork = [
  { label: "Territorial data", title: "DataPerú", text: "1,891 municipal profiles, maps, investment portfolios and contextual indicators.", href: "/dataperu" },
  { label: "Flagship study", title: "Peru Municipal Landscape 2025", text: "An executive reading of capacity, resources and institutional variation across local governments.", href: "/dataperu/panorama-municipal-2025" },
  { label: "Electoral intelligence", title: "Planómetro 2026", text: "An auditable corpus for exploring 36 government plans and 2,742 operational proposals.", href: "/electoral/planometro-2026" },
  { label: "Responsible AI", title: "AI Governance Lab", text: "A practical tool to assess value, readiness, risk and controls before building a pilot.", href: "/products/ai-governance-lab" }
];

const method = [
  ["01", "Frame the decision", "Define the question, users, constraints and outcome before selecting a method."],
  ["02", "Build the evidence", "Combine public sources, institutional data, fieldwork and domain knowledge."],
  ["03", "Design for use", "Translate analysis into a report, map, dashboard, protocol or working system."],
  ["04", "Transfer capacity", "Document sources, rules and operating routines so teams can sustain the result."]
];

export default function EnglishLandingPage() {
  return (
    <div lang="en">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "English overview", path: "/en" }])} />

      <section className="overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16">
        <Container>
          <div className="mb-12 flex items-center justify-between border-b border-border pb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            <span>English overview</span>
            <NextLink href="/" className="transition-colors hover:text-ink">Versión en español</NextLink>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.4fr] lg:items-end">
            <div><Eyebrow className="text-rust">Applied intelligence for institutions</Eyebrow><Heading as="h1" size="display" className="max-w-[15ch]">Evidence for decisions that shape territories.</Heading></div>
            <div><p className="text-base leading-8 text-ink/70">NOAM is a Peru-based intelligence and consulting firm. We combine research, data, strategy and digital products for institutions navigating public, territorial and organizational complexity.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="mailto:hola@noam.pe?subject=International%20inquiry%20for%20NOAM" className="rounded-full">Start a conversation</Button><Button href="/evidence" variant="ghost" className="gap-2">Explore our evidence <ArrowRight className="h-4 w-4" /></Button></div></div>
          </div>
          <figure className="group relative mt-14 overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-visual md:mt-20">
            <Image src="/images/noam-decision-room.jpg" alt="A decision team reviewing a territorial map and management indicators" width={1672} height={941} priority sizes="(max-width: 768px) 100vw, 1160px" className="aspect-[1.15/1] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018] sm:aspect-[1.9/1] lg:aspect-[2.35/1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/86 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 grid gap-3 p-5 text-white sm:grid-cols-[1fr_auto] sm:items-end md:p-8"><span className="max-w-xl text-lg font-medium tracking-[-0.025em] md:text-2xl">Territory is not background. It is part of the decision.</span><span className="text-[8px] uppercase tracking-[0.14em] text-white/46">Representative editorial scene</span></figcaption>
          </figure>

          <div className="mt-8 grid divide-y divide-border border-y border-border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {[["1,891", "municipal profiles"], ["9,429", "visible projects"], ["36", "government plans"], ["25", "department profiles"]].map(([value, label]) => <div key={label} className="py-6 sm:px-6 sm:first:pl-0"><p className="text-3xl font-medium tracking-[-0.055em] text-ink">{value}</p><p className="mt-2 text-xs text-ink/62">{label}</p></div>)}
          </div>
        </Container>
      </section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Eyebrow>What we do</Eyebrow><Heading size="xl">Three capabilities. One standard.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">We do not sell isolated technology. We configure evidence, method and product around a decision.</p></div><div className="divide-y divide-border border-y border-border">{capabilities.map((capability) => <NextLink key={capability.number} href={capability.href} className="group grid gap-4 py-7 sm:grid-cols-[42px_0.55fr_1fr_auto] sm:items-start"><span className="font-mono text-[10px] text-rust">{capability.number}</span><h2 className="text-xl font-medium tracking-[-0.025em] text-ink">{capability.title}</h2><p className="text-sm leading-6 text-ink/65">{capability.text}</p><MoveUpRight className="hidden h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" /></NextLink>)}</div></div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Eyebrow>Who we work for</Eyebrow><Heading size="xl">Public purpose. Operational context.</Heading></div><div className="grid gap-4 sm:grid-cols-2"><article className="rounded-[1.25rem] bg-[#15211d] p-7 text-white md:p-8"><Landmark className="h-5 w-5 text-[#d9a48f]" /><h2 className="mt-12 text-3xl font-medium tracking-[-0.04em]">Governments and public programs</h2><p className="mt-4 text-sm leading-7 text-white/62">From small municipalities to regional governments and national implementation systems.</p><ul className="mt-7 space-y-3 text-sm text-white/72">{["Territorial priorities", "Investment and service monitoring", "Evaluation and public management"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 h-3.5 w-3.5 text-[#d9a48f]" />{item}</li>)}</ul></article><article className="rounded-[1.25rem] bg-rust p-7 text-white md:p-8"><Building2 className="h-5 w-5 text-white/70" /><h2 className="mt-12 text-3xl font-medium tracking-[-0.04em]">Companies and organizations</h2><p className="mt-4 text-sm leading-7 text-white/68">For investment, expansion, infrastructure, services, impact and territorial risk decisions.</p><ul className="mt-7 space-y-3 text-sm text-white/78">{["Territorial intelligence", "Market and stakeholder research", "Environment and impact monitoring"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 h-3.5 w-3.5 text-white/75" />{item}</li>)}</ul></article></div></div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><Eyebrow className="text-[#d9a48f]">Open work</Eyebrow><Heading size="xl" className="max-w-3xl text-white">Examine how we think before engaging us.</Heading></div><p className="max-w-lg text-sm leading-7 text-white/56">Our current public products are published in Spanish and include sources, methods and explicit limitations.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md bg-white/12 sm:grid-cols-2">{openWork.map((item) => <NextLink key={item.href} href={item.href} className="group bg-[#1b2d27] p-6 transition-colors hover:bg-[#20372f] md:p-8"><div className="flex items-center justify-between"><span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#d9a48f]">{item.label}</span><BarChart3 className="h-4 w-4 text-white/35" /></div><h2 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-white">{item.title}</h2><p className="mt-3 text-sm leading-6 text-white/55">{item.text}</p><span className="mt-7 inline-flex items-center gap-2 text-sm text-white/75">Open in Spanish <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></NextLink>)}</div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><Eyebrow>How we work</Eyebrow><Heading size="xl">From a question to an operating capability.</Heading></div><ol className="divide-y divide-border border-y border-border">{method.map(([number, title, text]) => <li key={number} className="grid gap-4 py-6 sm:grid-cols-[46px_0.4fr_1fr]"><span className="font-mono text-[10px] text-rust">{number}</span><h2 className="text-lg font-medium text-ink">{title}</h2><p className="text-sm leading-6 text-ink/65">{text}</p></li>)}</ol></div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#ded9cc]">
        <Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:items-end lg:gap-20"><div><Eyebrow>Our standard</Eyebrow><Heading size="xl">Useful evidence must remain examinable.</Heading></div><div><p className="max-w-2xl text-base leading-8 text-ink/68">Sources, transformations, assumptions and limitations should be visible. We distinguish observed data, derived indicators, estimates and editorial demonstrations, and we do not invent clients, results or testimonials.</p><div className="mt-7 flex flex-wrap gap-3"><Button href="/transparency" variant="secondary">Read our transparency standard</Button><Button href="mailto:hola@noam.pe?subject=International%20inquiry%20for%20NOAM" variant="ghost" className="gap-2">Contact NOAM <ArrowRight className="h-4 w-4" /></Button></div></div></div></Container>
      </Section>
    </div>
  );
}
