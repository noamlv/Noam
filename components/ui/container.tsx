import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
  size?: "default" | "narrow" | "wide";
  children: React.ReactNode;
}

const sizes = {
  default: "max-w-site",
  narrow: "max-w-site-sm",
  wide: "max-w-site-lg"
} as const;

export function Container({ className, as: Tag = "div", size = "default", children }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full px-gutter", sizes[size], className)}>{children}</Tag>;
}
