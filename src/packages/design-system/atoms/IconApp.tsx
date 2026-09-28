import * as React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconStrokeWidth = 1.5 | 1.75 | 2;

// Foundation Iconography scale (16/20/24/32px) validated in the "01 - Foundations" section.
const iconSizePx: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

// Maps ButtonApp/InputApp/etc. "size" tiers to the matching IconApp size, so an
// icon passed into a "sm" control auto-shrinks instead of needing a manual className.
export function resolveIconSizeForControlSize(controlSize?: string | null): IconSize {
  switch (controlSize) {
    case "sm":
    case "iconSm":
      return "sm";
    case "lg":
    case "iconLg":
      return "lg";
    case "md":
    case "iconMd":
    default:
      return "md";
  }
}

export interface IconAppProps extends Omit<LucideProps, "ref" | "size" | "strokeWidth"> {
  id?: string;
  icon: LucideIcon;
  size?: IconSize;
  strokeWidth?: IconStrokeWidth;
}

export const IconApp = React.forwardRef<SVGSVGElement, IconAppProps>(
  ({ id, icon: Icon, size = "md", strokeWidth = 2, className, ...props }, ref) => (
    <Icon
      ref={ref}
      data-ui-id={id}
      size={iconSizePx[size]}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
);

IconApp.displayName = "IconApp";

// Clones an IconApp element to inherit `size` from its parent control (Button/Input/etc.)
// unless the caller already set an explicit size. Non-IconApp nodes pass through untouched.
export function withInheritedIconSize(node: React.ReactNode, inheritedSize: IconSize): React.ReactNode {
  if (React.isValidElement(node) && node.type === IconApp) {
    const element = node as React.ReactElement<IconAppProps>;
    return React.cloneElement(element, { size: element.props.size ?? inheritedSize });
  }
  return node;
}
