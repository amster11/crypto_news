import { TestimonialCard } from "@/components/TestimonialCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="py-24 lg:py-36">
      <Container>
        <SectionHeading id="testimonials-title" eyebrow="Отзывы" title="Что говорят наши клиенты" />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
