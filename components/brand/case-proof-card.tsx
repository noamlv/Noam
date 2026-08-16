import { ArrowRight, MoveUpRight } from "lucide-react";
import NextLink from "next/link";
import { ProductProofVisual } from "@/components/brand/product-proof-visual";
import type { ProductProof } from "@/lib/product-proofs";
import { cn } from "@/lib/utils";

type CaseProofCardProps = {
  proof: ProductProof;
  layout?: "compact" | "featured";
  className?: string;
};

const productRoutes: Record<ProductProof["slug"], string> = {
  dataperu: "/dataperu",
  planometro: "/electoral/planometro-2026",
  barometro: "/electoral/barometro-enero-2026"
};

export function CaseProofCard({ proof, layout = "compact", className }: CaseProofCardProps) {
  const featured = layout === "featured";

  return (
    <article className={cn("min-w-0 overflow-hidden rounded-[1.25rem] border border-border bg-panel shadow-hairline", className)}>
      <div className={cn("grid h-full min-w-0", featured && "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]")}>
        <div className={cn("flex min-w-0 flex-col p-6 md:p-8", featured && "lg:p-10")}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-rust/25 bg-rust/5 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-rust">Producto NOAM</span>
            <span className="rounded-full border border-border px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">Método visible</span>
          </div>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">{proof.eyebrow}</p>
          <h3 className={cn("mt-3 font-medium leading-none tracking-[-0.045em] text-ink", featured ? "text-4xl md:text-5xl" : "text-3xl")}>{proof.title}</h3>
          <p className="mt-5 text-sm leading-7 text-ink/65">{proof.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
            {proof.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label} className="bg-canvas p-4">
                <p className="text-2xl font-medium tracking-[-0.045em] text-ink">{metric.value}</p>
                <p className="mt-1 text-[10px] leading-4 text-muted">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 pt-8 text-sm font-medium">
            <NextLink href={proof.caseHref} className="inline-flex items-center gap-2 text-ink transition-colors duration-200 hover:text-rust">
              Ver caso y método <ArrowRight className="h-4 w-4" aria-hidden />
            </NextLink>
            <NextLink href={productRoutes[proof.slug]} className="inline-flex items-center gap-2 text-muted transition-colors duration-200 hover:text-ink">
              Abrir producto <MoveUpRight className="h-3.5 w-3.5" aria-hidden />
            </NextLink>
          </div>
        </div>

        <div className={cn("min-w-0 p-4 pt-0 md:p-5 md:pt-0", featured && "lg:p-5")}>
          <ProductProofVisual kind={proof.slug} className={cn("h-full min-h-[310px]", featured && "lg:min-h-[520px]")} />
        </div>
      </div>
    </article>
  );
}
