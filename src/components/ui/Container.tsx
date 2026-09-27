import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "default" | "narrow";
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-10",
        size === "default" ? "max-w-[82rem]" : "max-w-[52rem]",
        className,
      )}
      {...props}
    />
  );
}
