import NextLink from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const styles: Record<ButtonVariant, string> = {
  primary:
    "border border-accent bg-accent px-5 py-2.5 text-sm font-medium tracking-[-0.01em] text-accent-ink shadow-subtle transition-all duration-220 hover:-translate-y-px hover:bg-accent/95",
  secondary:
    "border border-border bg-panel px-5 py-2.5 text-sm font-medium tracking-[-0.01em] text-ink transition-all duration-220 hover:border-border-strong hover:bg-canvas",
  ghost: "text-sm font-medium tracking-[-0.01em] text-muted transition-colors duration-220 hover:text-ink"
};

export function Button(props: ButtonProps) {
  const className = cn("inline-flex items-center justify-center rounded-sm", styles[props.variant ?? "primary"], props.className);

  if (props.href) {
    return (
      <NextLink href={props.href} className={className} target={props.target} rel={props.rel}>
        {props.children}
      </NextLink>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={className}>
      {props.children}
    </button>
  );
}
