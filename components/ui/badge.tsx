import { cn } from "@/lib/utils";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export function Badge({ className, children }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-border px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-muted", className)}>
      {children}
    </span>
  );
}
