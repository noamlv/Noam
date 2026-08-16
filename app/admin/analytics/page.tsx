import { redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button, Card, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAnalyticsSummary } from "@/lib/analytics";

function ratio(numerator: number, denominator: number) {
  if (!denominator) return "Sin base";
  return `${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format((numerator / denominator) * 100)}%`;
}

function RankedList({
  items,
  empty
}: {
  items: Array<{ label: string; count: number }>;
  empty: string;
}) {
  return (
    <div className="divide-y divide-border">
      {items.length ? items.map((item, index) => (
        <div key={item.label} className="grid grid-cols-[32px_minmax(0,1fr)_auto] gap-3 py-4">
          <span className="font-mono text-[10px] text-rust">{String(index + 1).padStart(2, "0")}</span>
          <span className="truncate text-sm text-ink/72" title={item.label}>{item.label}</span>
          <span className="text-sm font-medium text-ink">{item.count}</span>
        </div>
      )) : <p className="py-8 text-sm text-muted">{empty}</p>}
    </div>
  );
}

export default async function AnalyticsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const summary = await getAnalyticsSummary(30);
  const maximumPageViews = Math.max(...summary.topPages.map((item) => item.count), 1);

  return (
    <Section className="pt-14 md:pt-20">
      <Container>
        <Button href="/admin" variant="ghost" className="mb-8 gap-2"><ArrowLeft className="h-4 w-4" /> Volver al panel</Button>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div><Eyebrow>NOAM OS · 30 días</Eyebrow><Heading as="h1" size="xl">Demanda y conversión.</Heading></div>
          <p className="max-w-md text-sm leading-6 text-ink/65">Medición propia sin cookies, perfiles de usuario ni proveedores externos. Los ratios comparan eventos, no personas únicas.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Páginas vistas", summary.pageViews],
            ["Clics de intención", summary.ctaClicks],
            ["Descargas", summary.downloads],
            ["Consultas enviadas", summary.leads],
            ["Solicitudes de brief", summary.newsletterSignups]
          ].map(([label, value]) => <Card key={label}><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{label}</p><p className="mt-4 text-4xl font-medium tracking-[-0.04em] text-ink">{value}</p></Card>)}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Vista → clic de intención</p><p className="mt-3 text-2xl font-medium text-ink">{ratio(summary.ctaClicks, summary.pageViews)}</p></Card>
          <Card><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Clic → consulta</p><p className="mt-3 text-2xl font-medium text-ink">{ratio(summary.leads, summary.ctaClicks)}</p></Card>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section>
            <div className="flex items-center justify-between border-b border-border pb-4"><h2 className="text-xl font-medium tracking-[-0.025em] text-ink">Páginas con más vistas</h2><span className="font-mono text-[10px] text-muted">TOP 10</span></div>
            <div className="divide-y divide-border">
              {summary.topPages.length ? summary.topPages.map((item) => <div key={item.path} className="py-4"><div className="flex items-center justify-between gap-4"><span className="truncate font-mono text-xs text-ink/72">{item.path}</span><span className="text-sm font-medium text-ink">{item.count}</span></div><div className="mt-3 h-1 overflow-hidden rounded-full bg-border"><span className="block h-full bg-rust" style={{ width: `${(item.count / maximumPageViews) * 100}%` }} /></div></div>) : <p className="py-8 text-sm text-muted">La línea base comenzará con las primeras visitas.</p>}
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between border-b border-border pb-4"><h2 className="text-xl font-medium tracking-[-0.025em] text-ink">Intenciones más frecuentes</h2><ArrowUpRight className="h-4 w-4 text-muted" /></div>
            <RankedList items={summary.topTargets.map((item) => ({ label: item.target, count: item.count }))} empty="Todavía no hay clics de intención registrados." />
          </section>
        </div>

        <div className="mt-16 border-t border-ink pt-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end">
            <Eyebrow>Señales comerciales</Eyebrow>
            <p className="max-w-xl text-sm leading-6 text-ink/65">Qué contenido inicia una consulta, qué necesidad declara el contacto y qué dominios externos aportan visitas.</p>
          </div>
          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            <section>
              <div className="border-b border-border pb-4"><h2 className="text-lg font-medium tracking-[-0.025em] text-ink">Origen de consultas</h2></div>
              <RankedList items={summary.topLeadSources.map((item) => ({ label: item.path, count: item.count }))} empty="Aún no hay páginas de origen registradas." />
            </section>
            <section>
              <div className="border-b border-border pb-4"><h2 className="text-lg font-medium tracking-[-0.025em] text-ink">Intereses que convierten</h2></div>
              <RankedList items={summary.topLeadInterests.map((item) => ({ label: item.target, count: item.count }))} empty="Aún no hay intereses asociados a consultas." />
            </section>
            <section>
              <div className="border-b border-border pb-4"><h2 className="text-lg font-medium tracking-[-0.025em] text-ink">Referencias externas</h2></div>
              <RankedList items={summary.topReferrers.map((item) => ({ label: item.referrer, count: item.count }))} empty="Aún no hay referencias externas registradas." />
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
