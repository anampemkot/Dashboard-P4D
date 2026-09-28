import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const selectAppVariants = cva(
  "w-full transition-all text-ink border duration-150 outline-none focus:outline-none focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-vibrant-grey-bg/60 disabled:text-ink-muted focus:ring-1 appearance-none cursor-pointer pr-10",
  {
    variants: {
      variant: {
        default: "bg-surface border-hairline focus:border-focus focus:ring-focus",
        filled: "bg-surface-soft border-transparent focus:bg-surface focus:border-focus focus:ring-focus",
        error: "bg-surface border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400",
      },
      size: {
        sm: "pl-3 pr-8 py-1.5 text-xs min-h-[34px]",
        md: "pl-4 pr-10 py-2.5 text-sm min-h-[42px]",
        lg: "pl-5 pr-12 py-3.5 text-body min-h-[50px]",
      },
      theme: {
        default: "",
        playful: "bg-surface border-hairline shadow-[inset_0_0_0_1px_rgba(0,0,0,.04)] focus:border-vibrant-purple-dark focus:ring-vibrant-purple-dark font-display",
      },
      rounded: {
        default: "rounded-sm",
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
        pill: "rounded-full",
        card: "rounded-card-custom",
        input: "rounded-input-custom",
      },
    },
    compoundVariants: [
      {
        theme: "playful",
        variant: "error",
        className: "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400",
      },
      {
        theme: "playful",
        variant: "filled",
        className: "bg-surface-soft border-transparent focus:bg-surface",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "pill",
      theme: "playful",
    },
  }
);

export interface SelectAppOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectAppProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectAppVariants> {
  id: string;
  options?: SelectAppOption[];
  placeholder?: string;
  error?: string;
}

export const SelectApp = React.forwardRef<HTMLSelectElement, SelectAppProps>(
  ({ id, variant = "default", size = "md", rounded = "pill", theme = "playful", className, options, placeholder, error, disabled, children, ...props }, ref) => {
    return (
      <div className="relative w-full text-left">
        <select
          id={id}
          data-ui-id={id}
          ref={ref}
          disabled={disabled}
          className={cn(
            selectAppVariants({ variant, size, rounded, theme }),
            error && "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden={props.value !== ""}>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-ink-muted">
          <ChevronDown className="w-4 h-4 shrink-0" />
        </div>
        {error && <span className="text-[11px] font-medium text-rose-500 block mt-1">{error}</span>}
      </div>
    );
  }
);

SelectApp.displayName = "SelectApp";
