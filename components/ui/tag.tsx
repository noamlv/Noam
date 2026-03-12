import { cn } from "@/lib/utils";

interface TagProps {
  className?: string;
  children: React.ReactNode;
}

export function Tag({ className, children }: TagProps) {
  return <span className={cn("inline-flex items-center rounded-sm bg-canvas px-2 py-1 text-xs text-muted", className)}>{children}</span>;
}
