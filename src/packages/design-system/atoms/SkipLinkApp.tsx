import * as React from "react";
import { cn } from "@/lib/utils";

export type SkipLinkVariant = "hidden" | "visible-on-focus";
export type SkipLinkPosition = "top-left" | "top-center" | "top-right";

const positionClasses: Record<SkipLinkPosition, string> = {
  "top-left": "left-3",
  "top-center": "left-1/2 -translate-x-1/2",
  "top-right": "right-3",
};

export interface SkipLinkAppProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  id: string;
  targetId: string;
  label?: string;
  variant?: SkipLinkVariant;
  position?: SkipLinkPosition;
}

export function SkipLinkApp({
  id,
  targetId,
  label = "Lewati ke konten utama",
  variant = "hidden",
  position = "top-left",
  className,
  ...props
}: SkipLinkAppProps) {
  const forceVisible = variant === "visible-on-focus" && props["aria-hidden"] !== "true";

  return (
    <a
      id={id}
      data-ui-id={id}
      href={`#${targetId}`}
      className={cn(
        "absolute top-3 z-50 rounded-[var(--radius-md)] border border-hairline bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-vibrant-soft outline-none transition-transform",
        "focus-visible:ring-[2px] focus-visible:ring-vibrant-purple-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        positionClasses[position],
        forceVisible ? "translate-y-0 opacity-100" : "sr-only focus:not-sr-only",
        className
      )}
      {...props}
    >
      {label}
    </a>
  );
}
