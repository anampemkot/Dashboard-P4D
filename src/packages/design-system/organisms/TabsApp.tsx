import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  useTabsContext,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from "@/components/ui/tabs";
import { TextApp } from "../atoms/TextApp";
import { BadgeApp, BadgeAppProps } from "../atoms/BadgeApp";

export type TabsVariant = "underline" | "pills" | "enclosed" | "default" | "vibrant";
export type TabsOrientation = "horizontal" | "vertical";
export type TabsSize = "sm" | "md" | "lg";
export type TabsRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  badgeVariant?: BadgeAppProps["variant"];
  content?: React.ReactNode;
}

const roundedClasses: Record<TabsRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

// Variant definitions for TabsList
const tabsListVariants = cva(
  "inline-flex items-center transition-all max-w-full overflow-x-auto no-scrollbar scroll-smooth shrink-0",
  {
    variants: {
      variant: {
        underline: "bg-transparent p-0 border-b border-slate-200 dark:border-slate-800 rounded-none gap-2 w-full justify-start",
        pills: "bg-slate-100 dark:bg-slate-800/70 p-1.5 gap-1.5 border border-slate-200 dark:border-slate-700/80",
        enclosed: "bg-slate-100/80 dark:bg-slate-900 p-1 gap-1 border border-slate-200 dark:border-slate-800",
        default: "bg-slate-100 dark:bg-slate-800/80 p-1 gap-1 border border-slate-200 dark:border-slate-700",
        vibrant: "bg-vibrant-purple/10 p-1.5 gap-1.5 border border-vibrant-purple/20",
      },
      size: {
        sm: "text-xs p-1",
        md: "text-sm p-1.5",
        lg: "text-base p-2",
      },
      orientation: {
        horizontal: "flex-row flex-nowrap w-full justify-start",
        vertical: "flex-col items-stretch w-full sm:w-60 border-r-0 sm:border-r border-b sm:border-b-0 justify-start shrink-0 space-y-1",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "md",
      orientation: "horizontal",
    },
  }
);

// Variant definitions for TabsTrigger
const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all font-medium cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        underline:
          "rounded-none px-4 py-2.5 text-slate-600 dark:text-slate-400 border-b-2 border-transparent -mb-px hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700 data-[state=active]:border-vibrant-purple-dark dark:data-[state=active]:border-vibrant-purple-light data-[state=active]:text-vibrant-purple-dark dark:data-[state=active]:text-vibrant-purple-light data-[state=active]:font-bold",
        pills:
          "px-4 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 data-[state=active]:bg-vibrant-purple-dark dark:data-[state=active]:bg-vibrant-purple-dark data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-sm",
        enclosed:
          "px-3.5 py-1.5 text-slate-600 dark:text-slate-400 border border-transparent hover:text-slate-900 dark:hover:text-slate-100 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 data-[state=active]:shadow-2xs data-[state=active]:font-bold",
        default:
          "px-3.5 py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 data-[state=active]:shadow-2xs data-[state=active]:font-semibold",
        vibrant:
          "px-4 py-2 text-vibrant-purple-dark/80 dark:text-vibrant-purple-light/80 hover:bg-vibrant-purple/20 data-[state=active]:bg-vibrant-purple-dark dark:data-[state=active]:bg-vibrant-purple-dark data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-md",
      },
      size: {
        sm: "text-xs px-2.5 py-1 min-h-[30px]",
        md: "text-sm px-3.5 py-1.5 min-h-[36px]",
        lg: "text-base px-4 py-2 min-h-[42px]",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "md",
    },
  }
);

export interface TabsAppProps extends Omit<TabsProps, "orientation" | "children"> {
  id?: string;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  size?: TabsSize;
  rounded?: TabsRounded;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  items?: TabItem[];
  children?: React.ReactNode;
  className?: string;
  listClassName?: string;
  contentClassName?: string;
}

export function TabsApp({
  id = "tabs-app",
  variant = "underline",
  orientation = "horizontal",
  size = "md",
  rounded = "lg",
  value,
  defaultValue,
  onValueChange,
  items,
  children,
  className,
  listClassName,
  contentClassName,
  ...props
}: TabsAppProps) {
  const initialValue =
    value !== undefined
      ? value
      : defaultValue || (items && items.length > 0 ? items[0].id : undefined);

  if (items && items.length > 0) {
    return (
      <Tabs
        id={id}
        data-ui-id={id}
        value={value}
        defaultValue={initialValue}
        onValueChange={onValueChange}
        orientation={orientation}
        className={cn(
          "w-full text-left",
          orientation === "vertical" ? "flex flex-col sm:flex-row gap-4" : "flex flex-col gap-3",
          className
        )}
        {...props}
      >
        <TabsListApp
          id={`${id}-list`}
          variant={variant}
          size={size}
          rounded={rounded}
          orientation={orientation}
          className={listClassName}
        >
          {items.map((item) => (
            <TabsTriggerApp
              key={item.id}
              id={`${id}-trigger-${item.id}`}
              value={item.id}
              variant={variant}
              size={size}
              rounded={rounded}
              icon={item.icon}
              badge={item.badge}
              badgeVariant={item.badgeVariant}
              disabled={item.disabled}
            >
              {item.label}
            </TabsTriggerApp>
          ))}
        </TabsListApp>

        {items.map((item) =>
          item.content ? (
            <TabsContentApp
              key={item.id}
              id={`${id}-content-${item.id}`}
              value={item.id}
              className={cn(
                "w-full flex-1",
                orientation === "vertical" ? "sm:p-2" : "",
                contentClassName
              )}
            >
              {item.content}
            </TabsContentApp>
          ) : null
        )}
      </Tabs>
    );
  }

  return (
    <Tabs
      id={id}
      data-ui-id={id}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      className={cn("w-full text-left", className)}
      {...props}
    >
      {children}
    </Tabs>
  );
}

export interface TabsListAppProps
  extends TabsListProps,
    VariantProps<typeof tabsListVariants> {
  id?: string;
  rounded?: TabsRounded;
  fitContent?: boolean;
}

export function TabsListApp({
  id,
  variant = "underline",
  size = "md",
  rounded = "lg",
  fitContent = false,
  className,
  children,
  ...props
}: TabsListAppProps) {
  const { orientation } = useTabsContext();
  const roundedClass = variant === "underline" ? "rounded-none" : roundedClasses[rounded || "lg"];

  return (
    <TabsList
      id={id}
      data-ui-id={id}
      className={cn(
        tabsListVariants({ variant, size, orientation }),
        roundedClass,
        fitContent && "w-fit shrink-0 max-w-none",
        className
      )}
      {...props}
    >
      {children}
    </TabsList>
  );
}

export interface TabsTriggerAppProps
  extends Omit<TabsTriggerProps, "variant" | "size">,
    VariantProps<typeof tabsTriggerVariants> {
  id?: string;
  rounded?: TabsRounded;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: BadgeAppProps["variant"];
  activeBadgeVariant?: BadgeAppProps["variant"];
  activeBadgeClassName?: string;
}

export function TabsTriggerApp({
  id,
  value,
  variant = "underline",
  size = "md",
  rounded = "lg",
  icon,
  badge,
  badgeVariant = "neutral",
  activeBadgeVariant,
  activeBadgeClassName,
  className,
  children,
  ...props
}: TabsTriggerAppProps) {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;

  const currentBadgeVariant = isActive && activeBadgeVariant ? activeBadgeVariant : badgeVariant;

  const isFilledVariant = variant === "pills" || variant === "vibrant";

  const activeBadgeStyle = isFilledVariant
    ? "bg-white text-vibrant-purple-dark font-bold shadow-2xs border-transparent"
    : "bg-vibrant-purple/15 text-vibrant-purple-dark dark:text-vibrant-purple-light font-bold border-vibrant-purple/30";

  const badgeClasses = cn(
    "ml-1 px-1.5 py-0 text-[10px] transition-all duration-200",
    isActive && (activeBadgeClassName || activeBadgeStyle)
  );

  const roundedClass = variant === "underline" ? "rounded-none" : roundedClasses[rounded || "lg"];

  return (
    <TabsTrigger
      id={id}
      data-ui-id={id}
      value={value}
      className={cn(tabsTriggerVariants({ variant, size }), roundedClass, className)}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "shrink-0 transition-colors flex items-center justify-center gap-1.5",
            isActive
              ? variant === "pills" || variant === "vibrant"
                ? "text-white dark:text-white"
                : "text-vibrant-purple-dark dark:text-vibrant-purple-light"
              : "text-slate-500 dark:text-slate-400"
          )}
        >
          {icon}
        </span>
      )}

      {typeof children === "string" ? (
        <TextApp
          id={`${id || value}-text`}
          variant="body"
          weight={isActive ? "bold" : "medium"}
          className={cn(
            "leading-none transition-colors",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base",
            isActive && (variant === "pills" || variant === "vibrant") && "text-white dark:text-white"
          )}
        >
          {children}
        </TextApp>
      ) : (
        children
      )}

      {badge !== undefined && (
        <BadgeApp
          id={`${id || value}-badge`}
          variant={currentBadgeVariant}
          size="sm"
          rounded="pill"
          className={badgeClasses}
        >
          <TextApp id={`${id || value}-badge-text`} variant="caption" className="text-[10px] font-bold leading-none">
            {badge}
          </TextApp>
        </BadgeApp>
      )}
    </TabsTrigger>
  );
}

export interface TabsContentAppProps extends TabsContentProps {
  id?: string;
  animated?: boolean;
}

export function TabsContentApp({
  id,
  value,
  animated = true,
  className,
  children,
  ...props
}: TabsContentAppProps) {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive) return null;

  if (!animated) {
    return (
      <TabsContent id={id} data-ui-id={id} value={value} className={className} {...props}>
        {children}
      </TabsContent>
    );
  }

  return (
    <TabsContent id={id} data-ui-id={id} value={value} className={className} {...props}>
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.99 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TabsContent>
  );
}
