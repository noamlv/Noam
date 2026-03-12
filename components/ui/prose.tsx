import { cn } from "@/lib/utils";

interface ProseProps {
  className?: string;
  children: React.ReactNode;
}

export function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none prose-headings:text-ink prose-headings:tracking-[-0.02em] prose-p:text-ink/85 prose-a:text-accent prose-li:text-ink/85",
        className
      )}
    >
      {children}
    </div>
  );
}
