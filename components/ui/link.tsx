import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function Link({ href, className, children }: LinkProps) {
  return (
    <NextLink href={href} className={cn("text-sm font-medium tracking-[-0.01em] text-ink transition-colors duration-220 hover:text-accent", className)}>
      {children}
    </NextLink>
  );
}
