import { cn } from "@/lib/utils";

interface EyebrowProps {
  className?: string;
  children: React.ReactNode;
}

export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p className={cn("mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted/90", className)}>
      {children}
    </p>
  );
}
