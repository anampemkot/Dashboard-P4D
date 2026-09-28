import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, indeterminate, disabled, id, onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const isCheckedOrIndeterminate = checked || indeterminate;

    return (
      <div className="relative inline-flex items-center shrink-0 w-4 h-4">
        <input
          type="checkbox"
          id={id}
          ref={inputRef}
          checked={checked}
          disabled={disabled}
          onChange={onChange || (() => {})}
          className="peer absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10 disabled:cursor-not-allowed"
          {...props}
        />
        <div
          className={cn(
            "w-4 h-4 rounded border transition-all duration-150 flex items-center justify-center select-none pointer-events-none",
            "border-hairline-soft bg-surface text-white",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-vibrant-purple/40 peer-focus-visible:ring-offset-1",
            isCheckedOrIndeterminate &&
              "bg-vibrant-purple border-vibrant-purple text-white dark:bg-vibrant-purple-dark dark:border-vibrant-purple-dark",
            disabled && "opacity-50 cursor-not-allowed bg-surface-soft border-hairline-soft",
            className
          )}
        >
          {indeterminate ? (
            <Minus className="w-3 h-3 stroke-[3]" />
          ) : checked ? (
            <Check className="w-3 h-3 stroke-[3]" />
          ) : null}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
