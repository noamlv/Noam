import NextLink from "next/link";
import { ArticleCta, DataSources, Deliverables, Disclosure, Downloads, Findings, Implications, Method, Problem, Scope } from "@/components/mdx/content-blocks";
import { Badge } from "@/components/ui/badge";

export const mdxComponents = {
  Problem,
  DataSources,
  Method,
  Scope,
  Deliverables,
  Findings,
  Implications,
  Downloads,
  Disclosure,
  CTA: ArticleCta,
  a: ({ href = "", children }: { href?: string; children: React.ReactNode }) => href.startsWith("/downloads/") ? (
    <a href={href} download className="underline decoration-border underline-offset-4 transition-colors duration-180 hover:text-accent">
      {children}
    </a>
  ) : (
    <NextLink href={href} className="underline decoration-border underline-offset-4 transition-colors duration-180 hover:text-accent">
      {children}
    </NextLink>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l border-accent pl-4 text-ink/85">{children}</blockquote>
  ),
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-md border border-accent/30 bg-accent/5 p-4">
      <Badge className="mb-2">Nota</Badge>
      <div className="text-sm text-ink/85">{children}</div>
    </div>
  )
};
