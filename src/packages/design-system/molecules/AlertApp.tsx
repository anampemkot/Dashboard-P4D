import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertAppVariants = cva(
  "relative w-full border flex items-center gap-3 transition-all text-left",
  {
    variants: {
      variant: {
        default: "border-hairline bg-surface text-ink",
        info: "border-vibrant-blue/40 bg-vibrant-blue/5 text-ink dark:text-white",
        success: "border-success/40 bg-success/5 text-success dark:text-green-400",
        warning: "border-warning/40 bg-warning/5 text-warning dark:text-amber-400",
        error: "border-red-500/40 bg-red-500/5 text-red-600 dark:text-red-400",
        brand: "border-vibrant-purple-dark/40 bg-vibrant-purple/5 text-ink dark:text-white",
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-5 py-3 text-sm",
        lg: "px-6 py-3.5 text-base",
      },
      rounded: {
        default: "rounded-full",
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
        pill: "rounded-full",
        card: "rounded-card-custom",
      },
      theme: {
        default: "",
        playful: "font-display shadow-vibrant-soft",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
      theme: "default",
    },
  }
);

export interface AlertAppProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertAppVariants> {
  id: string;
}

export function AlertApp({
  id,
  variant,
  size,
  rounded,
  theme,
  className,
  children,
  ...props
}: AlertAppProps) {
  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn(alertAppVariants({ variant, size, rounded, theme, className }))}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
}

// Sub-components for full composite control
export interface AlertIconProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function AlertIconApp({ id, className, children, ...props }: AlertIconProps) {
  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn("flex-shrink-0 mt-0.5 inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  id: string;
}

export function AlertTitleApp({ id, className, children, ...props }: AlertTitleProps) {
  return (
    <h5
      id={id}
      data-ui-id={id}
      className={cn("font-bold font-display tracking-tight text-ink", className)}
      {...props}
    >
      {children}
    </h5>
  );
}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  id: string;
}

export function AlertDescriptionApp({ id, className, children, ...props }: AlertDescriptionProps) {
  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn("text-xs text-ink-secondary leading-relaxed mt-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface AlertActionProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function AlertActionApp({ id, className, children, ...props }: AlertActionProps) {
  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn("sm:ml-auto flex flex-wrap items-center gap-2 mt-3 sm:mt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
