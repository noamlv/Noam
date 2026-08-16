import { notFound, redirect } from "next/navigation";
import { Container, Section } from "@/components/ui";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";
import { dateLabel, money } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import type { Quote } from "@/types/commercial";

interface QuotePrintPageProps {
  params: Promise<{ id: string }>;
}

interface QuotePrint extends Quote {
  proposal_title: string;
  proposal_summary: string;
  client_name: string | null;
  client_organization: string | null;
  client_email: string | null;
}

async function getQuotePrint(id: string) {
  const db = getDb();

  if (!db) return null;

  const rows = (await db`
    select
      quotes.id,
      quotes.proposal_id,
      quotes.quote_number,
      quotes.subtotal,
      quotes.tax,
      quotes.total,
      quotes.currency,
      quotes.status,
      quotes.issued_at,
      quotes.due_at,
      quotes.created_at,
      proposals.title as proposal_title,
      proposals.summary as proposal_summary,
      clients.name as client_name,
      clients.organization as client_organization,
      clients.email as client_email
    from quotes
    left join proposals on proposals.id = quotes.proposal_id
    left join clients on clients.id = proposals.client_id
    where quotes.id = ${id}
    limit 1
  `) as unknown as QuotePrint[];

  return rows[0] ?? null;
}

export default async function QuotePrintPage({ params }: QuotePrintPageProps) {
  const authenticated = await isAdminAuthenticated(["owner", "editor"], true);

  if (!authenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const quote = await getQuotePrint(id);

  if (!quote) {
    notFound();
  }

  return (
    <Section className="bg-white py-10 text-black print:py-0">
      <Container className="max-w-[820px] print:px-0">
        <div className="rounded-md border border-neutral-200 bg-white p-10 shadow-subtle print:border-0 print:shadow-none">
          <div className="mb-12 flex items-start justify-between gap-8">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em]">NOAM</p>
              <p className="mt-2 text-sm text-neutral-600">{siteConfig.legalName}</p>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-medium tracking-[-0.03em]">Cotización</h1>
              <p className="mt-2 text-sm text-neutral-600">{quote.quote_number}</p>
            </div>
          </div>

          <div className="mb-10 grid gap-8 border-y border-neutral-200 py-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Cliente</p>
              <p className="mt-3 font-medium">{quote.client_organization ?? quote.client_name ?? "Cliente"}</p>
              {quote.client_email ? <p className="mt-1 text-sm text-neutral-600">{quote.client_email}</p> : null}
            </div>
            <div className="md:text-right">
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Fechas</p>
              <p className="mt-3 text-sm">Emitida: {dateLabel(quote.issued_at)}</p>
              <p className="mt-1 text-sm">Vence: {dateLabel(quote.due_at)}</p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-medium tracking-[-0.02em]">{quote.proposal_title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">{quote.proposal_summary}</p>
          </div>

          <div className="ml-auto max-w-sm space-y-3">
            <div className="flex justify-between border-b border-neutral-200 pb-3 text-sm">
              <span>Subtotal</span>
              <span>{money(quote.subtotal, quote.currency)}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-3 text-sm">
              <span>Impuesto</span>
              <span>{money(quote.tax, quote.currency)}</span>
            </div>
            <div className="flex justify-between text-xl font-medium">
              <span>Total</span>
              <span>{money(quote.total, quote.currency)}</span>
            </div>
          </div>

          <p className="mt-14 text-xs leading-relaxed text-neutral-500">
            Documento comercial interno generado por NOAM. Los comprobantes tributarios oficiales se emiten por el canal correspondiente cuando aplique.
          </p>
        </div>
      </Container>
    </Section>
  );
}
