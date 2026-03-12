import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

interface CtaBlockProps {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
}

export function CtaBlock({ title, description, href, buttonLabel }: CtaBlockProps) {
  return (
    <Card className="border-ink bg-ink text-panel">
      <Heading className="mb-3 text-panel">{title}</Heading>
      <p className="mb-6 max-w-2xl text-sm text-panel/80">{description}</p>
      <Button href={href} variant="secondary" className="border-panel bg-panel text-ink hover:border-panel/80">
        {buttonLabel}
      </Button>
    </Card>
  );
}
