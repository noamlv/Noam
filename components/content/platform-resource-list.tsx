import { ArrowUpRight, Download, FileText } from "lucide-react";
import type { ManagedPlatformResource, ManagedPlatformProduct } from "@/types/platform";

const kindLabels = {
  dataset: "Dataset",
  methodology: "Metodología",
  toolkit: "Guía",
  report: "Informe",
  template: "Plantilla",
  explorer: "Explorador"
} as const;

function isDownloadUrl(url: string) {
  return url.startsWith("/downloads/") || /\.(csv|geojson|json|pdf|xlsx|zip)$/i.test(url);
}

export function PlatformResourceList({ resources, products = [] }: { resources: ManagedPlatformResource[]; products?: ManagedPlatformProduct[] }) {
  const productNames = new Map(products.map((product) => [product.slug, product.name]));

  return (
    <div className="border-t border-border">
      {resources.map((resource) => {
        const download = isDownloadUrl(resource.url);
        const external = resource.url.startsWith("https://");
        return (
          <a
            key={resource.slug}
            href={resource.url}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            download={download && !external ? true : undefined}
            data-analytics-event={download ? "resource_download" : "cta_click"}
            data-analytics-target={`resource:${resource.slug}`}
            className="group grid gap-5 border-b border-border py-7 transition-colors hover:bg-panel/55 md:grid-cols-[8.5rem_1fr_auto] md:items-center md:px-5"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rust">{kindLabels[resource.kind]}</span>
              {resource.format ? <span className="mt-2 block text-xs text-muted">{resource.format}</span> : null}
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.02em] text-ink md:text-xl">{resource.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/62">{resource.description}</p>
              <p className="mt-3 text-[11px] text-muted">{[resource.sourceLabel, resource.period, resource.productSlug ? productNames.get(resource.productSlug) : null].filter(Boolean).join(" · ")}</p>
            </div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-canvas text-ink transition-all group-hover:-translate-y-0.5 group-hover:border-border-strong" aria-hidden>
              {download ? <Download className="h-4 w-4" /> : external ? <ArrowUpRight className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
            </span>
          </a>
        );
      })}
    </div>
  );
}
