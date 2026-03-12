import NextLink from "next/link";

interface BreadcrumbsProps {
  items: Array<{ label: string; href: string }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap gap-2 text-xs text-muted">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            <NextLink href={item.href} className="transition-colors duration-180 hover:text-ink">
              {item.label}
            </NextLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}
