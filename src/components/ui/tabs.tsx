import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within a <Tabs /> provider");
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
}

export function Tabs({
  value: valueProp,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");

  const isControlled = valueProp !== undefined;
  const activeValue = isControlled ? valueProp : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (!isControlled) {
        setUncontrolledValue(val);
      }
      onValueChange?.(val);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider
      value={{
        value: activeValue,
        onValueChange: handleValueChange,
        orientation,
      }}
    >
      <div
        data-orientation={orientation}
        className={cn(
          "w-full max-w-full overflow-hidden",
          orientation === "vertical" ? "flex flex-col sm:flex-row gap-4 sm:gap-6" : "flex flex-col gap-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, children, ...props }: TabsListProps) {
  const { orientation } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "inline-flex items-center justify-start rounded-lg bg-surface-soft p-1 text-ink-muted border border-hairline-soft max-w-full overflow-x-auto no-scrollbar scroll-smooth",
        orientation === "vertical" && "flex-col items-stretch justify-start w-full sm:w-48 shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({
  value,
  className,
  disabled,
  children,
  onClick,
  ...props
}: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        if (!disabled) {
          onValueChange(value);
        }
      }}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        isActive
          ? "bg-surface text-ink shadow-sm font-semibold"
          : "text-ink-secondary hover:text-ink hover:bg-action-hover",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      data-state={isActive ? "active" : "inactive"}
      tabIndex={0}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
