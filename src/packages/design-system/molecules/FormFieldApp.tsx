import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const formFieldAppVariants = cva("flex", {
  variants: {
    variant: {
      default: "flex-col gap-1.5",
      inline: "flex-row items-center gap-4 justify-between",
    },
    size: {
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const labelVariants = cva("font-semibold uppercase tracking-wider text-ink-secondary select-none", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface FormFieldAppProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldAppVariants> {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormFieldApp({
  id,
  variant,
  size,
  label,
  error,
  children,
  className,
  ...props
}: FormFieldAppProps) {
  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn(formFieldAppVariants({ variant, size, className }))}
      {...props}
    >
      <label
        id={`${id}-label`}
        data-ui-id={`${id}-label`}
        className={cn(labelVariants({ size }))}
      >
        {label}
      </label>
      <div className="relative flex flex-col flex-1 w-full">
        {children}
        {error && (
          <span
            id={`${id}-error`}
            data-ui-id={`${id}-error`}
            className="text-xs text-red-500 dark:text-red-400 font-semibold mt-1"
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
