import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AvatarUI } from "@/components/ui/avatar";
import { User } from "lucide-react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";
export type AvatarShape = "circle" | "square";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center font-medium transition-all select-none border ring-2 ring-surface dark:ring-zinc-800/80",
  {
    variants: {
      variant: {
        default: "bg-surface-soft text-ink-secondary border-hairline-soft dark:border-white/20 dark:bg-surface-soft/80",
        vibrant: "bg-vibrant-purple/15 text-vibrant-purple-dark dark:text-vibrant-purple-dark border-vibrant-purple/30 dark:border-vibrant-purple-dark/40 font-bold",
        brand: "bg-brand-purple/15 text-brand-purple dark:text-vibrant-purple-dark border-brand-purple/30 dark:border-vibrant-purple-dark/40 font-bold",
        success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 dark:border-emerald-400/40 font-bold",
        warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 dark:border-amber-400/40 font-bold",
        danger: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 dark:border-red-400/40 font-bold",
        info: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30 dark:border-sky-400/40 font-bold",
      },
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "circle",
    },
  }
);

const statusDotVariants = cva(
  "absolute bottom-0 right-0 rounded-full ring-2 ring-surface dark:ring-zinc-900 shrink-0 z-10",
  {
    variants: {
      status: {
        online: "bg-emerald-500",
        offline: "bg-slate-400",
        busy: "bg-red-500",
        away: "bg-amber-500",
      },
      size: {
        xs: "h-1.5 w-1.5",
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3 w-3",
        xl: "h-4 w-4",
        "2xl": "h-5 w-5",
      },
    },
    defaultVariants: {
      status: "online",
      size: "md",
    },
  }
);

export function getInitials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface AvatarAppProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  id?: string;
  src?: string;
  alt?: string;
  name?: string;
  fallback?: React.ReactNode;
  icon?: React.ReactNode;
  status?: AvatarStatus;
  showStatus?: boolean;
}

export function AvatarApp({
  id,
  src,
  alt,
  name,
  fallback,
  icon,
  variant = "default",
  size = "md",
  shape = "circle",
  status,
  showStatus = false,
  className,
  ...props
}: AvatarAppProps) {
  const computedFallback = React.useMemo(() => {
    if (fallback) return fallback;
    if (icon) return icon;
    if (name) return getInitials(name);
    if (alt) return getInitials(alt);
    return <User className="w-[55%] h-[55%] opacity-70" />;
  }, [fallback, icon, name, alt]);

  const activeStatus = status || (showStatus ? "online" : undefined);

  return (
    <div id={id} data-ui-id={id} className="relative inline-flex shrink-0">
      <AvatarUI
        src={src}
        alt={alt || name || "User avatar"}
        fallback={computedFallback}
        className={cn(avatarVariants({ variant, size, shape, className }))}
        {...props}
      />

      {activeStatus && (
        <span
          className={cn(statusDotVariants({ status: activeStatus, size }))}
          title={`Status: ${activeStatus}`}
        />
      )}
    </div>
  );
}

// Group Avatar Component
export interface AvatarGroupAppItem extends Omit<AvatarAppProps, "size" | "shape"> {
  id: string;
}

export interface AvatarGroupAppProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  items?: AvatarGroupAppItem[];
  max?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: VariantProps<typeof avatarVariants>["variant"];
  totalCount?: number;
  spacing?: "tight" | "normal" | "loose";
  children?: React.ReactNode;
}

const spacingClasses = {
  tight: "-space-x-3",
  normal: "-space-x-2.5",
  loose: "-space-x-1.5",
};

export function AvatarGroupApp({
  id,
  items,
  max = 4,
  size = "md",
  shape = "circle",
  variant = "default",
  totalCount,
  spacing = "normal",
  children,
  className,
  ...props
}: AvatarGroupAppProps) {
  if (items && items.length > 0) {
    const visibleItems = items.slice(0, max);
    const hiddenCount = (totalCount !== undefined ? totalCount : items.length) - visibleItems.length;

    return (
      <div
        id={id}
        data-ui-id={id}
        className={cn("flex items-center flex-nowrap", spacingClasses[spacing], className)}
        {...props}
      >
        {visibleItems.map((item) => {
          const { nameOnly, ...restItem } = item as any;
          return (
            <AvatarApp
              key={item.id}
              size={size}
              shape={shape}
              variant={variant}
              {...restItem}
              className={cn("hover:z-20 hover:scale-105 transition-transform cursor-pointer", item.className)}
            />
          );
        })}

        {hiddenCount > 0 && (
          <div
            className={cn(
              avatarVariants({ variant: "vibrant", size, shape }),
              "z-10 font-bold shadow-xs text-xs flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            )}
            title={`+${hiddenCount} pengguna lainnya`}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    );
  }

  // Children mode with layout stacking
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const hiddenCount = (totalCount !== undefined ? totalCount : childrenArray.length) - visibleChildren.length;

  return (
    <div
      id={id}
      data-ui-id={id}
      className={cn("flex items-center flex-nowrap", spacingClasses[spacing], className)}
      {...props}
    >
      {visibleChildren.map((child, index) => {
        if (React.isValidElement<AvatarAppProps>(child)) {
          return React.cloneElement(child, {
            size: child.props.size || size,
            shape: child.props.shape || shape,
            className: cn("hover:z-20 hover:scale-105 transition-transform cursor-pointer", child.props.className),
          });
        }
        return <div key={index}>{child}</div>;
      })}

      {hiddenCount > 0 && (
        <div
          className={cn(
            avatarVariants({ variant: "vibrant", size, shape }),
            "z-10 font-bold shadow-xs text-xs flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          )}
          title={`+${hiddenCount} pengguna lainnya`}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
}
