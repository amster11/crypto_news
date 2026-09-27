"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PhotoProps = Omit<ImageProps, "onLoad" | "onError"> & { frameClassName?: string };

/**
 * next/image with a soft fade-in and an elegant fallback when the source
 * cannot be loaded (e.g. before real photos are provided).
 */
export function Photo({ frameClassName, className, alt, ...props }: PhotoProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className={cn("relative overflow-hidden bg-navy-900", frameClassName)}>
      {status === "error" ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-navy-900),var(--color-navy-700))]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-6 border border-gold/30 [background:repeating-linear-gradient(90deg,transparent_0,transparent_47px,rgb(184_154_98/0.08)_47px,rgb(184_154_98/0.08)_48px)]"
          />
        </div>
      ) : (
        <Image
          alt={alt}
          {...props}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "object-cover transition-[opacity,transform] duration-[1.2s] ease-[var(--ease-premium)]",
            status !== "loaded" && "[html.js_&]:scale-[1.03] [html.js_&]:opacity-0",
            className,
          )}
        />
      )}
    </div>
  );
}
