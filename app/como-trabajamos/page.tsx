import { ArrowRight, Check, FileSearch, Landmark, LockKeyhole, Route, Scale, Waypoints } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion, Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { deliverySteps } from "@/lib/brand-content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cómo trabajamos",
  description: "Cómo NOAM estructura estudios, diagnósticos, observatorios e iniciativas de IA para gobiernos y empresas en el Perú.",
  path: "/como-trabajamos"
});

const startModes = [
  { number: "01", title: "Alcance breve", description: "Para ordenar un problema, revisar evidencia disponible y definir una agenda priorizada antes de comprometer una intervención mayor.", output: "Diagnóstico, brief o diseño de alcance" },
  { number: "02", title: "Proyecto definido", description: "Para producir un estudio, evaluación, encuesta, observatorio, visor o piloto con entregables, responsables y criterios de aceptación.", output: "Producto listo para usar y transferir" },
  { number: "03", title: "Capacidad continua", description: "Para actualizar información, monitorear señales, acompañar decisiones y mejorar un sistema durante un periodo acordado.", output: "Operación, actualización y aprendizaje" }
];

const qualityPrinciples = [
  { icon: FileSearch, title: "Trazabilidad", text: "Fuentes, supuestos, transformaciones y límites quedan documentados." },
  { icon: Scale, title: "Proporcionalidad", text: "El método y la tecnología responden al riesgo y a la decisión, no al efecto demostración." },
  { icon: LockKeyhole, title: "Confidencialidad", text: "El acceso, la circulación y la publicación de información se acuerdan desde el inicio." },
  { icon: Waypoints, title: "Transferencia", text: "El equipo recibe criterios, documentación y una ruta para sostener el resultado." }
];

const faq = [
  { title: "¿Pueden responder a términos de referencia existentes?", content: "Sí. Revisamos objetivos, productos, fuentes, plazos y criterios de aceptación para confirmar el encaje y formular una propuesta técnica coherente." },
  { title: "¿Ayudan a definir un alcance antes de contratar?", content: "Podemos realizar una conversación inicial y proponer preguntas de delimitación. Cuando se requiere investigación o diseño sustantivo, esa etapa puede convertirse en un primer encargo independiente." },
  { title: "¿Trabajan con equipos pequeños o presupuestos acotados?", content: "Sí. Priorizamos una decisión y un producto mínimo útil. Reducir alcance no significa eliminar trazabilidad, calidad o transferencia." },
  { title: "¿Pueden trabajar con información reservada?", content: "El tratamiento depende del tipo de información y de los controles disponibles. Antes de recibir datos revisamos necesidad, acceso, almacenamiento, responsabilidades y reglas de eliminación." },
  { title: "¿El resultado puede seguir funcionando después del proyecto?", content: "Ese es un criterio de diseño. Definimos quién actualizará, qué capacidades necesita, qué documentación queda y qué componentes requieren soporte posterior." }
];

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Cómo trabajamos", path: "/como-trabajamos" }])} />
      <JsonLd data={faqJsonLd(faq)} />

      <section className="overflow-hidden bg-[#15211d] pb-20 pt-14 text-white md:pb-28 md:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.68fr] lg:items-end lg:gap-20">
            <div><Eyebrow className="text-[#d9a48f]">Cómo trabajamos</Eyebrow><Heading as="h1" size="display" className="max-w-[13ch] text-white">Un encargo claro empieza antes de la propuesta.</Heading></div>
            <div><p className="text-base leading-8 text-white/68">Definimos la decisión, el usuario, la evidencia y el uso esperado. Después elegimos el método, el producto y la tecnología.</p><Button href="/contact" analyticsEvent="cta_click" analyticsTarget="how-we-work:hero-contact" variant="secondary" className="mt-7 rounded-full border-white bg-white text-ink">Plantear un encargo</Button></div>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.25rem] border border-white/15 bg-white/15 sm:grid-cols-3">
            {["Local, regional o nacional", "Gobiernos y empresas", "Estudio, sistema o acompañamiento"].map((item, index) => <div key={item} className="bg-[#192823] p-6 md:p-8"><span className="font-mono text-[10px] text-[#d9a48f]">0{index + 1}</span><p className="mt-10 max-w-[18ch] text-lg font-medium leading-6 tracking-[-0.02em] text-white/86">{item}</p></div>)}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
            <div><Eyebrow>Puntos de partida</Eyebrow><Heading size="xl">El alcance correcto para la decisión actual.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">No todos los problemas necesitan un proyecto grande. Sí necesitan una frontera clara y un resultado utilizable.</p></div>
            <div className="divide-y divide-border border-y border-border">
              {startModes.map((mode) => <article key={mode.number} className="grid gap-5 py-7 sm:grid-cols-[42px_0.46fr_1fr]"><span className="font-mono text-[10px] text-rust">{mode.number}</span><div><h2 className="text-xl font-medium tracking-[-0.025em] text-ink">{mode.title}</h2><p className="mt-3 text-xs font-medium text-rust">{mode.output}</p></div><p className="text-sm leading-7 text-ink/65">{mode.description}</p></article>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-panel/45">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
            <div><Route className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Proceso</Eyebrow><Heading size="xl">Decisiones de control en cada etapa.</Heading></div>
            <ol className="divide-y divide-border border-y border-border">
              {deliverySteps.map((step) => <li key={step.number} className="grid gap-4 py-6 sm:grid-cols-[48px_0.36fr_1fr]"><span className="font-mono text-[10px] text-rust">{step.number}</span><h2 className="text-lg font-medium text-ink">{step.title}</h2><p className="text-sm leading-6 text-ink/65">{step.description}</p></li>)}
              <li className="grid gap-4 py-6 sm:grid-cols-[48px_0.36fr_1fr]"><span className="font-mono text-[10px] text-rust">05</span><h2 className="text-lg font-medium text-ink">Transferir y aprender</h2><p className="text-sm leading-6 text-ink/65">Documentamos el sistema, acordamos responsabilidades y dejamos una agenda de mejora basada en el uso.</p></li>
            </ol>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-[0.7fr_1fr] md:items-end"><div><Eyebrow>Estándar de entrega</Eyebrow><Heading size="xl">Calidad visible en el producto.</Heading></div><p className="max-w-2xl text-sm leading-7 text-ink/65 md:justify-self-end">La confianza no depende de promesas abstractas. Se construye dejando evidencia de cómo se produjo, revisó y debe utilizarse cada resultado.</p></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {qualityPrinciples.map(({ icon: Icon, title, text }) => <article key={title} className="min-h-[240px] bg-canvas p-6"><Icon className="h-5 w-5 text-rust" aria-hidden /><h2 className="mt-12 text-xl font-medium tracking-[-0.03em] text-ink">{title}</h2><p className="mt-4 text-sm leading-6 text-ink/62">{text}</p></article>)}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Landmark className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Entidades públicas</Eyebrow><Heading size="xl" className="text-white">Un alcance que pueda convertirse en contratación y gestión.</Heading></div>
            <div className="grid gap-6 sm:grid-cols-2">
              {["Objetivo y decisión que debe mejorar", "Productos y criterios de aceptación", "Fuentes, accesos y responsabilidades", "Cronograma, hitos y transferencia"].map((item) => <p key={item} className="flex items-start gap-3 border-t border-white/15 pt-5 text-sm leading-6 text-white/68"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[#d9a48f]" />{item}</p>)}
              <p className="sm:col-span-2 text-sm leading-7 text-white/56">Podemos revisar términos de referencia existentes o estructurar una propuesta de alcance. La modalidad contractual y los requisitos aplicables corresponden a cada entidad y proceso.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow"><Eyebrow>Preguntas frecuentes</Eyebrow><Heading size="xl">Antes de solicitar una propuesta.</Heading><Accordion items={faq} className="mt-8" /></Container>
      </Section>

      <Section className="pb-0">
        <Container>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-rust px-7 py-12 text-white md:px-12 md:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[56px] border-white/10" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow className="text-white/55">Primer paso</Eyebrow><h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Describe la decisión, el territorio y el plazo. Nosotros ayudamos a ordenar lo demás.</h2></div><Button href="/contact" analyticsEvent="cta_click" analyticsTarget="how-we-work:final-contact" variant="secondary" className="rounded-full border-white bg-white px-6 text-ink">Iniciar conversación <ArrowRight className="ml-2 h-4 w-4" /></Button></div>
          </div>
        </Container>
      </Section>
    </>
  );
}
