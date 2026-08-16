import { ExternalLink, LockKeyhole } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Privacidad",
  description: "Información sobre el tratamiento de datos personales en NOAM.PE.",
  path: "/privacy"
});

const sections = [
  {
    title: "Datos que recopilamos",
    body: "Cuando envías una consulta podemos registrar nombre, email, organización, cargo, tipo de organización, territorio, solución de interés, horizonte, rango referencial, mensaje, página de origen y fecha de consentimiento. Al solicitar el Brief NOAM registramos email, nombre opcional, preferencias editoriales, origen, estado y fechas de consentimiento, confirmación o baja. No solicitamos datos sensibles; evita incluirlos en campos abiertos."
  },
  {
    title: "Para qué los utilizamos",
    body: "Usamos la información para revisar y responder tu solicitud, comprender el posible encargo, preparar preguntas o una propuesta, mantener el historial de la relación y proteger el formulario frente a uso abusivo. No realizamos decisiones automatizadas con efectos jurídicos ni vendemos datos personales."
  },
  {
    title: "Base del tratamiento",
    body: "El formulario solicita tu consentimiento antes del envío. Puedes retirarlo para tratamientos futuros escribiendo al correo de contacto, sin afectar el tratamiento realizado previamente. Si una consulta se convierte en relación contractual, determinados datos podrán conservarse para ejecutar el servicio o cumplir obligaciones aplicables."
  },
  {
    title: "Brief NOAM",
    body: "La solicitud editorial permanece pendiente hasta que confirmes el enlace enviado por correo. Utilizamos la dirección y las preferencias únicamente para gestionar la suscripción y preparar comunicaciones relacionadas con los temas elegidos. Puedes darte de baja mediante el enlace incluido en cada envío. Una dirección dada de baja no vuelve a activarse sin una nueva solicitud y confirmación."
  },
  {
    title: "Proveedores y transferencias",
    body: "La plataforma puede utilizar proveedores de hosting, correo, almacenamiento, seguridad o infraestructura que procesen información bajo instrucciones de NOAM. Cuando el correo transaccional esté activo, Resend podrá procesar la dirección para entregar confirmaciones y comunicaciones solicitadas. Algunos proveedores podrían operar fuera del Perú. Antes de activarlos en producción verificaremos sus condiciones de tratamiento, seguridad y transferencias aplicables."
  },
  {
    title: "Conservación",
    body: "Las consultas que no se conviertan en una relación contractual se conservarán, como regla interna, hasta 24 meses desde la última interacción y luego se eliminarán o anonimizarán, salvo que exista una obligación legal o una necesidad legítima sustentada. Las solicitudes editoriales pendientes se depurarán periódicamente; las activas se conservan mientras exista consentimiento y las bajas mantienen sólo el registro mínimo necesario para respetar la exclusión."
  },
  {
    title: "Tus derechos",
    body: "Puedes solicitar información, acceso, actualización, rectificación, cancelación, oposición o, cuando corresponda, portabilidad. Escribe desde una dirección que permita verificar tu identidad e indica con claridad la solicitud. También puedes acudir a la Autoridad Nacional de Protección de Datos Personales."
  },
  {
    title: "Seguridad",
    body: "Aplicamos controles proporcionales como HTTPS, encabezados de seguridad, acceso restringido al panel, validación de entradas y copias de respaldo cuando la infraestructura esté en producción. Ningún sistema es infalible; documentaremos y atenderemos incidentes conforme a las obligaciones aplicables."
  },
  {
    title: "Cookies y medición",
    body: "Utilizamos medición propia para contar páginas vistas, clics en llamadas a la acción, descargas, envíos del formulario y, cuando existe, el dominio de referencia. Esta medición no instala cookies, no crea perfiles entre sesiones y no conserva direcciones IP ni identificadores de dispositivo. Respetamos las señales Do Not Track y Global Privacy Control. No utilizamos analítica publicitaria de terceros."
  }
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Privacidad", path: "/privacy" }])} />
      <Section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div><Eyebrow className="text-rust">Privacidad</Eyebrow><Heading as="h1" size="display" className="max-w-[13ch]">Datos personales, con propósito y límites.</Heading></div>
            <div className="border-l border-border pl-6"><LockKeyhole className="h-5 w-5 text-rust" aria-hidden /><p className="mt-4 text-sm leading-7 text-ink/68">Última actualización: 17 de julio de 2026. Este aviso describe el tratamiento de consultas y suscripciones editoriales en NOAM.PE.</p></div>
          </div>
        </Container>
      </Section>

      <section className="border-y border-border bg-panel/45 py-8">
        <Container>
          <div className="grid gap-5 text-sm leading-7 md:grid-cols-[0.28fr_1fr]">
            <p className="font-medium text-ink">Responsable y contacto</p>
            <p className="text-ink/68">{siteConfig.legalName} · Perú · <a href={`mailto:${siteConfig.email}`} className="font-medium text-rust underline decoration-border underline-offset-4">{siteConfig.email}</a></p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:gap-20">
            <div><Eyebrow>Tratamiento</Eyebrow><Heading size="xl">Información clara antes de enviar.</Heading><p className="mt-5 text-sm leading-7 text-ink/65">Este aviso se actualizará cuando cambien las finalidades, proveedores o infraestructura de producción.</p></div>
            <div className="divide-y divide-border border-y border-border">
              {sections.map((section, index) => (
                <article key={section.title} className="grid gap-4 py-7 sm:grid-cols-[42px_0.42fr_1fr]">
                  <span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="text-lg font-medium leading-6 tracking-[-0.02em] text-ink">{section.title}</h2>
                  <p className="text-sm leading-7 text-ink/66">{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-[#15211d] text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div><Eyebrow className="text-[#d9a48f]">Marco de referencia</Eyebrow><Heading size="xl" className="text-white">Protección de datos en el Perú.</Heading></div>
            <div className="space-y-5 text-sm leading-7 text-white/62">
              <p>Este aviso toma como referencia la Ley N.° 29733 y su Reglamento aprobado mediante Decreto Supremo N.° 016-2024-JUS. La versión final de producción debe revisarse junto con la configuración efectiva del banco de datos, proveedores y operación de NOAM.</p>
              <div className="flex flex-wrap gap-5">
                <a href="https://www.gob.pe/institucion/congreso-de-la-republica/normas-legales/243470-29733" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-white/80 hover:text-white">Ley N.° 29733 <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href="https://www.gob.pe/institucion/anpd/normas-legales/6554453-n-016-2024-jus" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-white/80 hover:text-white">Reglamento vigente <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
