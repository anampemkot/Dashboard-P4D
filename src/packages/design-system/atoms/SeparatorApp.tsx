import * as React from "react";
import { cn } from "@/lib/utils";

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorStyle = "solid" | "dashed" | "dotted";
export type SeparatorThickness = "1px" | "2px" | "4px" | "sm" | "md" | "lg";
export type SeparatorVariant =
  | "subtle"
  | "soft"
  | "hard"
  | "vibrant"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "info";
export type SeparatorLabelAlign = "start" | "center" | "end";

export interface SeparatorAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  orientation?: SeparatorOrientation;
  styleType?: SeparatorStyle;
  thickness?: SeparatorThickness;
  variant?: SeparatorVariant;
  label?: React.ReactNode;
  labelAlign?: SeparatorLabelAlign;
  decorative?: boolean;
}

const variantBorderClasses: Record<SeparatorVariant, string> = {
  subtle: "border-hairline",
  soft: "border-hairline-soft",
  hard: "border-hairline-hard",
  vibrant: "border-vibrant-purple/40",
  brand: "border-brand-purple/40",
  success: "border-emerald-500/40",
  warning: "border-amber-500/40",
  error: "border-rose-500/40",
  info: "border-sky-500/40",
};

const styleTypeClasses: Record<SeparatorStyle, string> = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

const horizontalThicknessClasses: Record<SeparatorThickness, string> = {
  "1px": "border-t",
  sm: "border-t",
  "2px": "border-t-2",
  md: "border-t-2",
  "4px": "border-t-4",
  lg: "border-t-4",
};

const verticalThicknessClasses: Record<SeparatorThickness, string> = {
  "1px": "border-l",
  sm: "border-l",
  "2px": "border-l-2",
  md: "border-l-2",
  "4px": "border-l-4",
  lg: "border-l-4",
};

export const SeparatorApp = React.forwardRef<HTMLDivElement, SeparatorAppProps>(
  (
    {
      id,
      orientation = "horizontal",
      styleType = "solid",
      thickness = "1px",
      variant = "subtle",
      label,
      labelAlign = "center",
      decorative = true,
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal";
    const borderVariantClass = variantBorderClasses[variant] || variantBorderClasses.subtle;
    const borderStyleClass = styleTypeClasses[styleType] || styleTypeClasses.solid;

    if (isHorizontal) {
      const lineThicknessClass = horizontalThicknessClasses[thickness] || horizontalThicknessClasses["1px"];

      if (!label) {
        return (
          <div
            ref={ref}
            id={id}
            role={decorative ? "none" : "separator"}
            aria-orientation="horizontal"
            className={cn(
              "w-full my-3 border-b-0 border-r-0 border-l-0",
              lineThicknessClass,
              borderStyleClass,
              borderVariantClass,
              className
            )}
            {...props}
          />
        );
      }

      // Horizontal with Label
      const getLineFlexClasses = () => {
        if (labelAlign === "start") {
          return { left: "w-6 shrink-0", right: "flex-1" };
        }
        if (labelAlign === "end") {
          return { left: "flex-1", right: "w-6 shrink-0" };
        }
        return { left: "flex-1", right: "flex-1" };
      };

      const lineFlex = getLineFlexClasses();

      return (
        <div
          ref={ref}
          id={id}
          role={decorative ? "none" : "separator"}
          aria-orientation="horizontal"
          className={cn("flex items-center w-full my-4 gap-3 select-none", className)}
          {...props}
        >
          <div className={cn(lineFlex.left, lineThicknessClass, borderStyleClass, borderVariantClass)} />
          <div className="shrink-0 text-xs font-semibold text-ink-muted uppercase tracking-wider px-1">
            {label}
          </div>
          <div className={cn(lineFlex.right, lineThicknessClass, borderStyleClass, borderVariantClass)} />
        </div>
      );
    }

    // Vertical Orientation
    const lineThicknessClass = verticalThicknessClasses[thickness] || verticalThicknessClasses["1px"];

    if (!label) {
      return (
        <div
          ref={ref}
          id={id}
          role={decorative ? "none" : "separator"}
          aria-orientation="vertical"
          className={cn(
            "inline-block self-stretch mx-3 border-t-0 border-b-0 border-r-0 min-h-[1.25rem]",
            lineThicknessClass,
            borderStyleClass,
            borderVariantClass,
            className
          )}
          {...props}
        />
      );
    }

    // Vertical with Label
    const getVerticalLineFlexClasses = () => {
      if (labelAlign === "start") {
        return { top: "h-4 shrink-0", bottom: "flex-1" };
      }
      if (labelAlign === "end") {
        return { top: "flex-1", bottom: "h-4 shrink-0" };
      }
      return { top: "flex-1", bottom: "flex-1" };
    };

    const vertFlex = getVerticalLineFlexClasses();

    return (
      <div
        ref={ref}
        id={id}
        role={decorative ? "none" : "separator"}
        aria-orientation="vertical"
        className={cn("inline-flex flex-col items-center self-stretch mx-3 my-1 gap-2 select-none min-h-[4rem]", className)}
        {...props}
      >
        <div className={cn(vertFlex.top, lineThicknessClass, borderStyleClass, borderVariantClass)} />
        <div className="shrink-0 text-[10px] font-bold text-ink-muted uppercase tracking-wider px-0.5 whitespace-nowrap">
          {label}
        </div>
        <div className={cn(vertFlex.bottom, lineThicknessClass, borderStyleClass, borderVariantClass)} />
      </div>
    );
  }
);

SeparatorApp.displayName = "SeparatorApp";

// Alias export DividerApp
export const DividerApp = SeparatorApp;
export type DividerAppProps = SeparatorAppProps;
