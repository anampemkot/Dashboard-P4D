import * as React from "react";
import { cn } from "@/lib/utils";

export type AIOrbSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<AIOrbSize, string> = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
};

export interface AIOrbAppProps {
  id: string;
  size?: AIOrbSize;
  /** Slowly rotates & pulses to read as a "thinking" AI indicator. */
  animated?: boolean;
  className?: string;
}

// A soft, rotating conic-gradient blob behind a frosted glass center — used as
// the "AI is here / thinking" visual anchor for chat empty-states and loading
// moments, matching the blurred multi-color orb pattern common to AI chat UIs.
export function AIOrbApp({ id, size = "md", animated = true, className }: AIOrbAppProps) {
  return (
    <div id={id} data-ui-id={id} className={cn("relative shrink-0 rounded-full", sizeClasses[size], className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full blur-md",
          animated && "animate-spin motion-reduce:animate-none [animation-duration:6s]"
        )}
        style={{
          background: "conic-gradient(from 0deg, #7dd3fc, #f9a8d4, #c4b5fd, #a5b4fc, #7dd3fc)",
        }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full opacity-70 blur-lg",
          animated && "animate-pulse motion-reduce:animate-none"
        )}
        style={{
          background: "radial-gradient(circle at 35% 35%, #f9a8d4, transparent 60%)",
        }}
      />
      <div className="absolute inset-[3px] rounded-full bg-surface/70 backdrop-blur-xl" />
    </div>
  );
}
