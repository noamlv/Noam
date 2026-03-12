import { cn } from "@/lib/utils";

interface GridProps {
  className?: string;
  children: React.ReactNode;
}

export function Grid({ className, children }: GridProps) {
  return <div className={cn("grid gap-6 md:gap-8", className)}>{children}</div>;
}
