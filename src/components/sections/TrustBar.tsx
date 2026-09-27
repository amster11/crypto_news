import { Clock, KeyRound, ReceiptText, UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { trustBar } from "@/data/content";
import { revealDelay } from "@/lib/utils";

const icons = { receipt: ReceiptText, key: KeyRound, clock: Clock, user: UserRound };

export function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="border-y border-line bg-white">
      <Container className="grid gap-8 py-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-14">
        <h2 id="trust-title" data-reveal className="font-serif text-[1.55rem] leading-snug text-ink lg:col-span-4 lg:pr-8">
          {trustBar.title}
        </h2>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:col-span-8">
          {trustBar.items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.label}
                data-reveal
                style={revealDelay(index * 80)}
                className="flex flex-col gap-3 md:border-l md:border-line md:pl-6"
              >
                <Icon aria-hidden="true" className="size-5 text-gold-deep" strokeWidth={1.25} />
                <span className="text-[0.95rem] font-medium text-ink">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
