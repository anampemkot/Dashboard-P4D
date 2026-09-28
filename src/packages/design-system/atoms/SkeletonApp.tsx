import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonAppVariants = cva(
  "animate-pulse bg-slate-200/45 dark:bg-zinc-800/45",
  {
    variants: {
      variant: {
        rect: "rounded-sm",
        circle: "rounded-full",
        text: "rounded-xs h-3 w-full",
      },
      size: {
        sm: "h-3",
        md: "h-5",
        lg: "h-8",
      },
    },
    defaultVariants: {
      variant: "rect",
      size: "md",
    },
  }
);

export interface SkeletonAppProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonAppVariants> {
  id: string;
}

export function SkeletonApp({
  id,
  variant,
  size,
  className,
  ...props
}: SkeletonAppProps) {
  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn(skeletonAppVariants({ variant, size, className }))}
      {...props}
    />
  );
}
