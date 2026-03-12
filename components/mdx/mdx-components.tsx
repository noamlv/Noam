import NextLink from "next/link";
import { DataSources, Downloads, Findings, Implications, Method, Problem, ArticleCta } from "@/components/mdx/content-blocks";
import { Badge } from "@/components/ui/badge";

export const mdxComponents = {
  Problem,
  DataSources,
  Method,
  Findings,
  Implications,
  Downloads,
  CTA: ArticleCta,
  a: ({ href = "", children }: { href?: string; children: React.ReactNode }) => (
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
