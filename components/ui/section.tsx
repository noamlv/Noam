import { cn } from "@/lib/utils";

interface SectionProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export function Section({ className, id, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-section", className)}>
      {children}
    </section>
  );
}
