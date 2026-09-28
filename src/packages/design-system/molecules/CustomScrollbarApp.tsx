import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const customScrollbarAppVariants = cva(
  "group/scrollbar w-full bg-surface border border-hairline-soft p-4 font-sans transition-all [&::-webkit-scrollbar-track]:transition-opacity [&::-webkit-scrollbar-track]:duration-200 [&::-webkit-scrollbar-track]:ease-out [&::-webkit-scrollbar-thumb]:transition-opacity [&::-webkit-scrollbar-thumb]:duration-200 [&::-webkit-scrollbar-thumb]:ease-out [&::-webkit-scrollbar-track]:opacity-0 [&::-webkit-scrollbar-thumb]:opacity-0 group-hover/scrollbar:[&::-webkit-scrollbar-track]:opacity-100 group-hover/scrollbar:[&::-webkit-scrollbar-thumb]:opacity-100",
  {
    variants: {
      variant: {
        purple:
          "[&::-webkit-scrollbar-track]:bg-vibrant-purple/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vibrant-purple-dark/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-vibrant-purple-dark",
        subtle:
          "[&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-slate-800/60 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-400 dark:[&::-webkit-scrollbar-thumb:hover]:bg-slate-500",
        dark:
          "[&::-webkit-scrollbar-track]:bg-slate-950/80 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500",
        yellow:
          "[&::-webkit-scrollbar-track]:bg-vibrant-yellow/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vibrant-yellow/80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-vibrant-yellow",
        blue:
          "[&::-webkit-scrollbar-track]:bg-vibrant-blue/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vibrant-blue/80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-vibrant-blue",
      },
      thickness: {
        thin: "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1",
        default: "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2",
        thick: "[&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-3",
      },
      orientation: {
        vertical: "overflow-y-auto overflow-x-hidden",
        horizontal: "overflow-x-auto overflow-y-hidden whitespace-nowrap",
        both: "overflow-auto",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "purple",
      thickness: "default",
      orientation: "vertical",
      rounded: "xl",
    },
  }
);

export type CustomScrollbarVariant = "purple" | "subtle" | "dark" | "yellow" | "blue";
export type CustomScrollbarThickness = "thin" | "default" | "thick";
export type CustomScrollbarOrientation = "vertical" | "horizontal" | "both";

export interface CustomScrollbarAppProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof customScrollbarAppVariants> {
  id: string;
  maxHeight?: string | number;
  maxWidth?: string | number;
  variant?: CustomScrollbarVariant;
  thickness?: CustomScrollbarThickness;
  orientation?: CustomScrollbarOrientation;
  children: React.ReactNode;
  className?: string;
}

export function CustomScrollbarApp({
  id,
  maxHeight = "240px",
  maxWidth,
  variant = "purple",
  thickness = "default",
  orientation = "vertical",
  rounded = "xl",
  children,
  className,
  style,
  ...props
}: CustomScrollbarAppProps) {
  return (
    <div
      id={id}
      data-ui-id={id}
      style={{
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        ...style,
      }}
      className={cn(
        customScrollbarAppVariants({ variant, thickness, orientation, rounded }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
