import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Minus, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextApp } from "./TextApp";

export type CheckboxVariant = "default" | "brand" | "vibrant" | "success" | "error";
export type CheckboxSize = "sm" | "md" | "lg";

const checkboxBoxVariants = cva(
  "rounded-md border border-slate-400 dark:border-slate-500 bg-surface text-white transition-all duration-150 flex items-center justify-center select-none shrink-0 cursor-pointer pointer-events-none hover:border-vibrant-purple-dark",
  {
    variants: {
      variant: {
        default: "border-slate-400 dark:border-slate-500 bg-surface text-white peer-checked:bg-vibrant-purple-dark peer-checked:border-vibrant-purple-dark peer-focus-visible:ring-2 peer-focus-visible:ring-vibrant-purple-dark/40 peer-focus-visible:ring-offset-1",
        brand: "border-slate-400 dark:border-slate-500 bg-surface text-white peer-checked:bg-vibrant-purple-dark peer-checked:border-vibrant-purple-dark peer-focus-visible:ring-2 peer-focus-visible:ring-vibrant-purple-dark/40 peer-focus-visible:ring-offset-1",
        vibrant: "border-slate-400 dark:border-slate-500 bg-surface text-white peer-checked:bg-vibrant-purple-dark peer-checked:border-vibrant-purple-dark peer-focus-visible:ring-2 peer-focus-visible:ring-vibrant-purple-dark/40 peer-focus-visible:ring-offset-1",
        success: "border-slate-400 dark:border-slate-500 bg-surface text-white peer-checked:bg-emerald-600 peer-checked:border-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/40 peer-focus-visible:ring-offset-1",
        error: "border-red-400 bg-surface text-white peer-checked:bg-red-500 peer-checked:border-red-500 peer-focus-visible:ring-2 peer-focus-visible:ring-red-500/40 peer-focus-visible:ring-offset-1",
      },
      size: {
        sm: "w-3.5 h-3.5",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface CheckboxAppProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: string;
  errorMessage?: string;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  containerClassName?: string;
}

export const CheckboxApp = React.forwardRef<HTMLInputElement, CheckboxAppProps>(
  (
    {
      id,
      variant = "default",
      size = "md",
      label,
      description,
      helperText,
      error,
      errorMessage,
      indeterminate = false,
      disabled = false,
      checked,
      defaultChecked,
      onChange,
      onCheckedChange,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    const [isChecked, setIsChecked] = React.useState<boolean>(
      checked !== undefined ? !!checked : defaultChecked !== undefined ? !!defaultChecked : false
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(!!checked);
      }
    }, [checked]);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    const isCheckedOrIndeterminate = isChecked || indeterminate;
    const finalError = error || errorMessage;

    // Determine state variant
    const computedVariant: CheckboxVariant = finalError ? "error" : variant;

    const descText = description || helperText;

    return (
      <div className={cn("inline-flex flex-col gap-1 text-left", containerClassName)}>
        <label
          htmlFor={id}
          className={cn(
            "inline-flex items-start gap-2 select-none cursor-pointer group", // Step 2 Spacing (8px / gap-2)
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <div className="relative inline-flex items-center shrink-0 mt-0.5">
            <input
              ref={inputRef}
              type="checkbox"
              id={id}
              data-ui-id={id}
              checked={isChecked}
              disabled={disabled}
              onChange={handleChange}
              className="peer absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10 disabled:cursor-not-allowed"
              {...props}
            />
            <div
              className={cn(
                checkboxBoxVariants({ variant: computedVariant, size }),
                isCheckedOrIndeterminate &&
                  (computedVariant === "error"
                    ? "bg-red-500 border-red-500 text-white"
                    : computedVariant === "success"
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-vibrant-purple-dark border-vibrant-purple-dark text-white"),
                disabled && "opacity-50 cursor-not-allowed bg-vibrant-grey-bg/60 border-slate-300 dark:border-slate-700",
                className
              )}
            >
              {indeterminate ? (
                <Minus
                  className={cn(
                    "stroke-[3]",
                    size === "sm" ? "w-2.5 h-2.5" : size === "lg" ? "w-3.5 h-3.5" : "w-3 h-3"
                  )}
                />
              ) : isChecked ? (
                <Check
                  className={cn(
                    "stroke-[3]",
                    size === "sm" ? "w-2.5 h-2.5" : size === "lg" ? "w-3.5 h-3.5" : "w-3 h-3"
                  )}
                />
              ) : null}
            </div>
          </div>

          {(label || descText) && (
            <div className="flex flex-col text-left">
              {label && (
                typeof label === "string" ? (
                  <TextApp
                    id={`${id}-label`}
                    variant={size === "sm" ? "caption" : "body"}
                    weight="semibold"
                    className={cn(
                      "text-ink group-hover:text-vibrant-purple-dark transition-colors leading-snug",
                      disabled && "group-hover:text-ink text-ink-muted"
                    )}
                  >
                    {label}
                  </TextApp>
                ) : (
                  label
                )
              )}

              {descText && (
                typeof descText === "string" ? (
                  <TextApp
                    id={`${id}-desc`}
                    variant="caption"
                    className="text-ink-muted leading-tight mt-0.5"
                  >
                    {descText}
                  </TextApp>
                ) : (
                  descText
                )
              )}
            </div>
          )}
        </label>

        {finalError && (
          <div className="flex items-center gap-1 pl-6">
            <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
            <TextApp id={`${id}-error`} variant="caption" className="font-medium text-red-500">
              {finalError}
            </TextApp>
          </div>
        )}
      </div>
    );
  }
);

CheckboxApp.displayName = "CheckboxApp";

export interface CheckboxGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupAppProps {
  id: string;
  name?: string;
  label?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  options: CheckboxGroupOption[];
  direction?: "vertical" | "horizontal" | "col" | "row";
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  disabled?: boolean;
  className?: string;
}

export function CheckboxGroupApp({
  id,
  name,
  label,
  helperText,
  errorMessage,
  value,
  defaultValue = [],
  onChange,
  options,
  direction = "vertical",
  variant = "default",
  size = "md",
  disabled = false,
  className,
}: CheckboxGroupAppProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    value !== undefined ? value : defaultValue
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
  }, [value]);

  const handleToggleOption = (optionValue: string, isChecked: boolean) => {
    let next: string[];
    if (isChecked) {
      next = [...selectedValues, optionValue];
    } else {
      next = selectedValues.filter((v) => v !== optionValue);
    }

    if (value === undefined) {
      setSelectedValues(next);
    }
    onChange?.(next);
  };

  const isRow = direction === "horizontal" || direction === "row";

  return (
    <div className={cn("flex flex-col gap-2 w-full text-left", className)}>
      {label && (
        typeof label === "string" ? (
          <TextApp id={`${id}-group-label`} variant="caption" weight="bold" className="text-ink uppercase tracking-wider">
            {label}
          </TextApp>
        ) : (
          label
        )
      )}

      {/* Options Container: Step 3 Spacing (12px / gap-3) */}
      <div className={cn(isRow ? "flex flex-wrap gap-3" : "flex flex-col gap-3")}>
        {options.map((opt, idx) => {
          const optId = `${id}-opt-${opt.value || idx}`;
          const isChecked = selectedValues.includes(opt.value);
          const optDisabled = disabled || opt.disabled;

          return (
            <CheckboxApp
              key={opt.value}
              id={optId}
              name={name}
              variant={variant}
              size={size}
              label={opt.label}
              description={opt.description}
              checked={isChecked}
              indeterminate={opt.indeterminate}
              disabled={optDisabled}
              onCheckedChange={(checked) => handleToggleOption(opt.value, checked)}
            />
          );
        })}
      </div>

      {(errorMessage || helperText) && (
        <div className="mt-0.5">
          {errorMessage ? (
            <TextApp id={`${id}-group-error`} variant="caption" className="text-red-500 font-medium">
              {errorMessage}
            </TextApp>
          ) : (
            <TextApp id={`${id}-group-helper`} variant="caption" className="text-ink-muted">
              {helperText}
            </TextApp>
          )}
        </div>
      )}
    </div>
  );
}
