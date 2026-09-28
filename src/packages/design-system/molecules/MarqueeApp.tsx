import * as React from "react";
import { cn } from "@/lib/utils";

export type MarqueeOrientation = "horizontal" | "vertical";
export type MarqueeDirection = "left" | "right" | "up" | "down";
export interface MarqueeAppProps extends React.HTMLAttributes<HTMLDivElement> { id: string; orientation?: MarqueeOrientation; direction?: MarqueeDirection; duration?: number; pauseOnHover?: boolean; children: React.ReactNode; }

export function MarqueeApp({ id, orientation = "horizontal", direction = orientation === "horizontal" ? "left" : "up", duration = 24, pauseOnHover = true, children, className, ...props }: MarqueeAppProps) {
  const vertical = orientation === "vertical";
  const resolvedDirection = vertical
    ? direction === "down" ? "down" : "up"
    : direction === "right" ? "right" : "left";
  const reverse = resolvedDirection === "right" || resolvedDirection === "down";
  return <div id={id} className={cn("group overflow-hidden", vertical && "h-52", className)} {...props}>
    <div className={cn("flex w-max", vertical ? "flex-col" : "flex-row", pauseOnHover && "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]")} style={{ animationName: vertical ? "ds-marquee-y" : "ds-marquee-x", animationDuration: `${duration}s`, animationTimingFunction: "linear", animationIterationCount: "infinite", animationDirection: reverse ? "reverse" : "normal" }}>
      <div className={cn("flex shrink-0", vertical ? "flex-col" : "flex-row")} aria-hidden="false">{children}</div>
      <div className={cn("flex shrink-0", vertical ? "flex-col" : "flex-row")} aria-hidden="true">{children}</div>
    </div>
  </div>;
}
