import { ExternalLink, FileText, Scale, ShieldCheck } from "lucide-react";
import NextLink from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Términos de uso",
  description: "Condiciones generales para consultar y reutilizar el sitio, los contenidos y las herramientas públicas de NOAM.",
  path: "/terms"
});

const terms = [
  {
    title: "Alcance del sitio",
    body: "Estos términos regulan el acceso a NOAM.PE, sus publicaciones, visualizaciones, descargas y herramientas abiertas. Al utilizar el sitio aceptas estas condiciones. Una contratación de servicios se rige por la propuesta, orden, contrato o términos de referencia que las partes acuerden por separado."
  },
  {
    title: "Información para decidir, no decisión automática",
    body: "Los contenidos organizan evidencia y preguntas para apoyar análisis. No constituyen asesoría legal, financiera, tributaria o de inversión, ni reemplazan fuentes oficiales, expedientes, opiniones especializadas o decisiones de la autoridad competente."
  },
  {
    title: "Fuentes y datos de terceros",
    body: "Algunos productos transforman datos públicos o materiales de terceros. Cada módulo identifica, cuando corresponde, fuente, periodo, cobertura y límites. La presencia de una fuente no implica respaldo institucional a NOAM. Las condiciones de reutilización de la fuente original siguen siendo aplicables."
  },
  {
    title: "Propiedad intelectual",
    body: "La marca, arquitectura editorial, textos, código, diseños y visualizaciones originales pertenecen a sus respectivos titulares. Salvo que una descarga indique una licencia específica, no se autoriza reproducir, vender, modificar o presentar estos materiales como propios. Sí puedes enlazar páginas públicas y citar extractos breves con atribución y URL."
  },
  {
    title: "Uso responsable",
    body: "No debes intentar vulnerar el sitio, interferir con su disponibilidad, extraer datos de forma abusiva, eludir controles, introducir código malicioso, usar el contenido para suplantación o atribuir a NOAM conclusiones que no publica. El acceso automatizado debe respetar límites técnicos, derechos y condiciones de las fuentes."
  },
  {
    title: "Herramientas y resultados",
    body: "Los puntajes, simulaciones, modelos y señales son instrumentos analíticos con supuestos y error. No certifican cumplimiento, calidad, viabilidad o desempeño futuro. Antes de usar un resultado en una decisión material debes revisar definiciones, fecha, denominador, metodología y contexto."
  },
  {
    title: "Enlaces y servicios externos",
    body: "El sitio puede integrar o enlazar plataformas externas. NOAM no controla su disponibilidad, seguridad, contenido ni cambios. Abrir un enlace externo implica aceptar las condiciones del proveedor correspondiente."
  },
  {
    title: "Disponibilidad y cambios",
    body: "Podemos corregir, actualizar, retirar o reorganizar contenidos para mejorar precisión, seguridad o utilidad. Procuramos mantener URLs estables y documentar cambios materiales, pero no garantizamos disponibilidad ininterrumpida ni ausencia absoluta de errores."
  },
  {
    title: "Privacidad y consultas",
    body: "El tratamiento del formulario se explica en el aviso de privacidad. No envíes secretos, datos sensibles, credenciales ni información reservada antes de acordar un canal y controles apropiados."
  },
  {
    title: "Contacto y ley aplicable",
    body: "Estos términos se interpretan conforme al marco aplicable en el Perú. Para consultas sobre uso, atribución o correcciones escribe a hola@noam.pe. La contraparte legal de cada servicio será identificada expresamente en su documentación contractual."
  }
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Términos de uso", path: "/terms" }])} />
      <Section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div><Eyebrow className="text-rust">Términos de uso</Eyebrow><Heading as="h1" size="display" className="max-w-[13ch]">Información abierta. Responsabilidades claras.</Heading></div>
            <div className="border-l border-border pl-6"><Scale className="h-5 w-5 text-rust" aria-hidden /><p className="mt-4 text-sm leading-7 text-ink/68">Última actualización: 17 de julio de 2026. Versión inicial para el lanzamiento público de NOAM.PE.</p></div>
          </div>
        </Container>
      </Section>

      <section className="border-y border-border bg-panel/45 py-8">
        <Container><div className="grid gap-5 text-sm leading-7 md:grid-cols-[0.28fr_1fr]"><p className="font-medium text-ink">Titular del sitio</p><p className="text-ink/68">{siteConfig.legalName} es la denominación pública del proyecto NOAM. La identidad de la contraparte contractual se precisará en cada propuesta o contrato · <a href={`mailto:${siteConfig.email}`} className="font-medium text-rust underline decoration-border underline-offset-4">{siteConfig.email}</a></p></div></Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <div><FileText className="h-5 w-5 text-rust" aria-hidden /><Eyebrow className="mt-6">Condiciones</Eyebrow><Heading size="xl">Lee el alcance antes de reutilizar.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Un producto abierto puede orientar una pregunta. Una decisión material requiere revisar la evidencia y su contexto.</p></div>
            <div className="divide-y divide-border border-y border-border">
              {terms.map((term, index) => <article key={term.title} className="grid gap-4 py-7 sm:grid-cols-[42px_0.38fr_1fr]"><span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span><h2 className="text-lg font-medium leading-6 tracking-[-0.02em] text-ink">{term.title}</h2><p className="text-sm leading-7 text-ink/66">{term.body}</p></article>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20"><div><ShieldCheck className="h-5 w-5 text-[#d9a48f]" aria-hidden /><Eyebrow className="mt-6 text-[#d9a48f]">Referencias</Eyebrow><Heading size="xl" className="text-white">Derechos y tratamiento responsable.</Heading></div><div className="space-y-5 text-sm leading-7 text-white/62"><p>La publicación toma como referencia el marco peruano sobre derecho de autor y protección de datos. Estos términos necesitan revisión profesional antes de operaciones contractuales de mayor complejidad.</p><div className="flex flex-wrap gap-5"><a href="https://www.gob.pe/institucion/pcm/normas-legales/1670023-822" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-white/80 hover:text-white">Decreto Legislativo N.° 822 <ExternalLink className="h-3.5 w-3.5" /></a><NextLink href="/privacy" className="font-medium text-white/80 hover:text-white">Aviso de privacidad</NextLink><NextLink href="/transparency" className="font-medium text-white/80 hover:text-white">Estándar de transparencia</NextLink></div></div></div></Container>
      </Section>
    </>
  );
}
