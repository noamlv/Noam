import { cn } from "@/lib/utils";

interface BlockProps {
  title?: string;
  children: React.ReactNode;
}

function BaseBlock({ title, children, className }: BlockProps & { className?: string }) {
  return (
    <section className={cn("my-10 rounded-md border border-border bg-panel p-6", className)}>
      {title ? <h2 className="mb-3 text-2xl font-medium tracking-[-0.03em] text-ink">{title}</h2> : null}
      <div className="space-y-4 text-sm leading-relaxed text-ink/85">{children}</div>
    </section>
  );
}

export function Problem({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Problema">{children}</BaseBlock>;
}

export function DataSources({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Datos y Fuentes">{children}</BaseBlock>;
}

export function Method({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Método">{children}</BaseBlock>;
}

export function Scope({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Alcance del encargo">{children}</BaseBlock>;
}

export function Deliverables({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Productos entregados">{children}</BaseBlock>;
}

export function Findings({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Hallazgos">{children}</BaseBlock>;
}

export function Implications({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Implicancias">{children}</BaseBlock>;
}

export function Downloads({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Descargas y Recursos">{children}</BaseBlock>;
}

export function Disclosure({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="Criterio de divulgación" className="border-rust/30 bg-rust/[0.04]">{children}</BaseBlock>;
}

export function ArticleCta({ children }: { children: React.ReactNode }) {
  return <BaseBlock title="CTA" className="border-ink bg-ink text-panel [&_*]:text-panel">{children}</BaseBlock>;
}
