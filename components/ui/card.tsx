import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-md border border-border bg-panel p-6 shadow-subtle transition-all duration-220 hover:-translate-y-0.5 hover:border-border-strong",
        className
      )}
    >
      {children}
    </article>
  );
}
