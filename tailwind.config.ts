import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        panel: "var(--color-panel)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        accent: "var(--color-accent)",
        "accent-ink": "var(--color-accent-ink)",
        rust: "var(--color-rust)",
        moss: "var(--color-moss)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)"
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        visual: "var(--shadow-visual)"
      },
      maxWidth: {
        "site-sm": "var(--max-width-sm)",
        site: "var(--max-width)",
        "site-lg": "var(--max-width-lg)"
      },
      spacing: {
        section: "var(--space-section)",
        gutter: "var(--space-gutter)",
        block: "var(--space-block)"
      },
      transitionDuration: {
        180: "180ms",
        220: "220ms"
      }
    }
  },
  plugins: [typography]
};

export default config;
