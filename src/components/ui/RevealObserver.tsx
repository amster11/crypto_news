"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds a gentle fade-up to every element with `data-reveal` when it enters
 * the viewport. Pure CSS handles the animation; reduced motion disables it.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible='true'])"),
    );
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => (el.dataset.visible = "true"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
