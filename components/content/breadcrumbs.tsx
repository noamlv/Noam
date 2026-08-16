import NextLink from "next/link";

interface BreadcrumbsProps {
  items: Array<{ label: string; href: string }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex min-w-0 flex-nowrap gap-2 overflow-hidden text-xs text-muted">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
          <li key={item.href} className={isCurrent ? "flex min-w-0 items-center gap-2" : "flex shrink-0 items-center gap-2"}>
            {index > 0 ? <span aria-hidden>/</span> : null}
            <NextLink href={item.href} aria-current={isCurrent ? "page" : undefined} className={isCurrent ? "block truncate transition-colors duration-180 hover:text-ink" : "transition-colors duration-180 hover:text-ink"}>
              {item.label}
            </NextLink>
          </li>
          );
        })}
      </ol>
    </nav>
  );
}
