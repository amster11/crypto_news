import { ProcessStep } from "@/components/ProcessStep";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/content";
import { primaryCta } from "@/data/navigation";
import { cn } from "@/lib/utils";

type Step = { title: string; text: string };

export function ProcessSection({
  title = "Как всё происходит",
  eyebrow = "Процесс",
  steps = processSteps,
  showCta = true,
  className,
}: {
  title?: string;
  eyebrow?: string;
  steps?: Step[];
  showCta?: boolean;
  className?: string;
}) {
  return (
    <section aria-labelledby="process-title" className={cn("py-24 lg:py-36", className)}>
      <Container>
        <SectionHeading id="process-title" eyebrow={eyebrow} title={title} />
        <ol className="mt-16 grid lg:mt-20 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.title}
              number={String(index + 1).padStart(2, "0")}
              title={step.title}
              text={step.text}
              index={index}
            />
          ))}
        </ol>
        {showCta && (
          <div data-reveal className="mt-16 lg:mt-20">
            <Button href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
