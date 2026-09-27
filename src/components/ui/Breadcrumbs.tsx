import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ name: "Главная", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Хлебные крошки" className="mb-10">
        <ol
          className={`flex flex-wrap items-center gap-2 text-[0.8rem] ${
            tone === "dark" ? "text-mist" : "text-muted"
          }`}
        >
          {all.map((item, index) => {
            const last = index === all.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <>
                    <Link href={item.path} className="link-underline hover:text-current">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
