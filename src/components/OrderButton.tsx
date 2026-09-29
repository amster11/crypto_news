"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { FORM_ANCHOR } from "@/data/navigation";

export const SELECT_SERVICE_EVENT = "lead:select-service";

/**
 * "Заказать": scrolls to the lead form on the current page and preselects
 * the service. Without JavaScript it is a plain anchor link.
 */
export function OrderButton({
  service,
  children = "Заказать",
  variant = "secondary",
  className,
}: {
  service: string;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
}) {
  return (
    <Button
      href={`#${FORM_ANCHOR}`}
      variant={variant}
      arrow
      className={className}
      aria-label={`Заказать: ${service}`}
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service }))}
    >
      {children}
    </Button>
  );
}
