import { cn } from "@/lib/utils";

interface HeadingProps {
  as?: "h1" | "h2" | "h3";
  size?: "display" | "xl" | "lg" | "md";
  className?: string;
  children: React.ReactNode;
}

const sizes = {
  display: "text-4xl leading-[1.03] tracking-[-0.03em] md:text-6xl lg:text-7xl",
  xl: "text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl",
  lg: "text-2xl leading-[1.14] tracking-[-0.02em] md:text-4xl",
  md: "text-xl leading-[1.2] tracking-[-0.015em] md:text-2xl"
} as const;

export function Heading({ as: Tag = "h2", size = "lg", className, children }: HeadingProps) {
  return (
    <Tag className={cn("text-balance font-medium text-ink", sizes[size], className)}>
      {children}
    </Tag>
  );
}
