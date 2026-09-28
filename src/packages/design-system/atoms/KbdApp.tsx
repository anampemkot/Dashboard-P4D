import * as React from "react";
import { cn } from "@/lib/utils";

export type KbdSize = "sm" | "md" | "lg";

const sizeClasses: Record<KbdSize, string> = {
  sm: "min-w-[20px] h-5 px-1.5 text-[10px]",
  md: "min-w-[24px] h-6 px-2 text-xs",
  lg: "min-w-[28px] h-7 px-2.5 text-sm",
};

const separatorSizeClasses: Record<KbdSize, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
};

export interface KbdAppProps {
  id: string;
  keys: string[];
  size?: KbdSize;
  separator?: string;
  className?: string;
}

export function KbdApp({ id, keys, size = "md", separator = "+", className }: KbdAppProps) {
  return (
    <span id={id} data-ui-id={id} className={cn("inline-flex items-center gap-1 select-none", className)}>
      {keys.map((key, index) => (
        <React.Fragment key={`${id}-key-${index}`}>
          <kbd
            id={`${id}-key-${index}`}
            className={cn(
              "inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-hairline-hard bg-surface-soft font-mono font-semibold leading-none text-ink",
              "shadow-[0_2px_0_0_var(--color-border-hairline-hard)] transition-all active:translate-y-px active:shadow-none",
              sizeClasses[size]
            )}
          >
            {key}
          </kbd>
          {index < keys.length - 1 && (
            <span className={cn("text-ink-muted", separatorSizeClasses[size])}>{separator}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
