import { notFound, redirect } from "next/navigation";
import { Container, Section } from "@/components/ui";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";
import { dateLabel, money, statusLabel } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import type { Invoice } from "@/types/commercial";

interface InvoicePrintPageProps {
  params: Promise<{ id: string }>;
}

interface InvoicePrint extends Invoice {
  proposal_title: string | null;
  client_name: string | null;
  client_organization: string | null;
  client_email: string | null;
}

async function getInvoicePrint(id: string) {
  const db = getDb();

  if (!db) return null;

  const rows = (await db`
    select
      invoices.id,
      invoices.client_id,
      invoices.proposal_id,
      invoices.invoice_number,
      invoices.official_document_url,
      invoices.subtotal,
      invoices.tax,
      invoices.total,
      invoices.currency,
      invoices.status,
      invoices.issued_at,
      invoices.paid_at,
      invoices.created_at,
      proposals.title as proposal_title,
      clients.name as client_name,
      clients.organization as client_organization,
      clients.email as client_email
    from invoices
    left join proposals on proposals.id = invoices.proposal_id
    left join clients on clients.id = invoices.client_id
    where invoices.id = ${id}
    limit 1
  `) as unknown as InvoicePrint[];

  return rows[0] ?? null;
}

export default async function InvoicePrintPage({ params }: InvoicePrintPageProps) {
  const authenticated = await isAdminAuthenticated(["owner", "editor"], true);

  if (!authenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const invoice = await getInvoicePrint(id);

  if (!invoice) {
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
              <h1 className="text-3xl font-medium tracking-[-0.03em]">Documento de cobro</h1>
              <p className="mt-2 text-sm text-neutral-600">{invoice.invoice_number ?? invoice.id.slice(0, 8)}</p>
            </div>
          </div>

          <div className="mb-10 grid gap-8 border-y border-neutral-200 py-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Cliente</p>
              <p className="mt-3 font-medium">{invoice.client_organization ?? invoice.client_name ?? "Cliente"}</p>
              {invoice.client_email ? <p className="mt-1 text-sm text-neutral-600">{invoice.client_email}</p> : null}
            </div>
            <div className="md:text-right">
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Estado</p>
              <p className="mt-3 text-sm">{statusLabel(invoice.status)}</p>
              <p className="mt-1 text-sm">Emitida: {dateLabel(invoice.issued_at)}</p>
              <p className="mt-1 text-sm">Pagada: {dateLabel(invoice.paid_at)}</p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-medium tracking-[-0.02em]">{invoice.proposal_title ?? "Servicios NOAM"}</h2>
          </div>

          <div className="ml-auto max-w-sm space-y-3">
            <div className="flex justify-between border-b border-neutral-200 pb-3 text-sm">
              <span>Subtotal</span>
              <span>{money(invoice.subtotal, invoice.currency)}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-3 text-sm">
              <span>Impuesto</span>
              <span>{money(invoice.tax, invoice.currency)}</span>
            </div>
            <div className="flex justify-between text-xl font-medium">
              <span>Total</span>
              <span>{money(invoice.total, invoice.currency)}</span>
            </div>
          </div>

          {invoice.official_document_url ? (
            <p className="mt-10 text-sm">
              Comprobante oficial: <span className="text-neutral-600">{invoice.official_document_url}</span>
            </p>
          ) : null}

          <p className="mt-14 text-xs leading-relaxed text-neutral-500">
            Documento interno generado por NOAM. No reemplaza comprobantes oficiales si la normativa tributaria exige emisión por otro canal.
          </p>
        </div>
      </Container>
    </Section>
  );
}
