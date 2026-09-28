import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, checked, disabled, id, onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="relative inline-flex items-center shrink-0 w-4 h-4">
        <input
          type="radio"
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
            "w-4 h-4 rounded-full border transition-all duration-150 flex items-center justify-center select-none pointer-events-none",
            "border-hairline-soft bg-surface",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-vibrant-purple/40 peer-focus-visible:ring-offset-1",
            checked && "border-vibrant-purple text-vibrant-purple dark:border-vibrant-purple-dark",
            disabled && "opacity-50 cursor-not-allowed bg-surface-soft border-hairline-soft",
            className
          )}
        >
          {checked && (
            <span className="w-2 h-2 rounded-full bg-vibrant-purple dark:bg-vibrant-purple-dark" />
          )}
        </div>
      </div>
    );
  }
);
Radio.displayName = "Radio";

export { Radio };
