import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface NavItemAppProps {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  badge?: React.ReactNode;
  subtitle?: string;
  isSub?: boolean;
  isCollapsed?: boolean;
  className?: string;
  key?: React.Key;
}

export function NavItemApp({
  id,
  label,
  path,
  icon,
  active,
  onClick,
  badge,
  subtitle,
  isSub = false,
  isCollapsed = false,
  className,
}: NavItemAppProps) {
  const location = useLocation();

  // Custom exact or subpath matching
  const isActive = active !== undefined
    ? active
    : (path === "/admin"
        ? location.pathname === "/admin"
        : location.pathname.startsWith(path));

  // Sub link active vs inactive style (subtle light purple active indicator)
  if (isSub) {
    return (
      <Link
        id={id}
        data-ui-id={id}
        data-active={isActive ? "true" : "false"}
        to={path}
        onClick={onClick}
        title={isCollapsed ? label : undefined}
        className={cn(
          "group flex items-center gap-2.5 rounded-xl transition-all duration-150 cursor-pointer select-none font-display",
          isCollapsed ? "w-8 h-8 mx-auto justify-center px-0 py-0" : "w-full text-xs py-2 px-3.5",
          isActive
            ? "bg-vibrant-purple/15 text-vibrant-purple-dark dark:bg-vibrant-purple/25 dark:text-purple-300 font-semibold border border-vibrant-purple/20"
            : "text-ink-secondary hover:bg-action-hover hover:text-ink font-normal",
          className
        )}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all",
            isActive
              ? "bg-vibrant-purple-dark dark:bg-purple-300 scale-125 shadow-xs"
              : "bg-ink-muted/35 group-hover:bg-vibrant-purple-dark/60 opacity-100"
          )}
        />
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="leading-tight truncate">{label}</div>
            {subtitle && (
              <div
                className={cn(
                  "text-[10px] truncate font-normal leading-none mt-0.5",
                  isActive ? "text-vibrant-purple-dark/80 dark:text-purple-300/80" : "text-ink-muted"
                )}
              >
                {subtitle}
              </div>
            )}
          </div>
        )}
        {!isCollapsed && badge && <div className="flex-shrink-0">{badge}</div>}
      </Link>
    );
  }

  // Top-level NavLink active vs inactive style (solid purpleDark with white text & icon)
  return (
    <Link
      id={id}
      data-ui-id={id}
      data-active={isActive ? "true" : "false"}
      to={path}
      onClick={onClick}
      title={isCollapsed ? label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-xl transition-all duration-150 cursor-pointer select-none font-display",
        isCollapsed ? "w-10 h-10 mx-auto justify-center px-0 py-0" : "w-full text-sm py-2.5 px-3.5",
        isActive
          ? "bg-vibrant-purple-dark text-white font-semibold shadow-xs border border-vibrant-purple-dark"
          : "text-ink-secondary hover:bg-action-hover hover:text-ink font-medium",
        className
      )}
    >
      {icon ? (
        <div className={cn("flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4", isActive ? "text-white [&>svg]:text-white" : "text-ink-secondary")}>
          {icon}
        </div>
      ) : (
        <span className={cn("w-2 h-2 rounded-full flex-shrink-0", isActive ? "bg-white" : "bg-ink-secondary")} />
      )}
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <div className="leading-tight truncate">{label}</div>
          {subtitle && (
            <div
              className={cn(
                "text-[10px] truncate font-normal leading-none mt-0.5",
                isActive ? "text-white/80" : "text-ink-muted"
              )}
            >
              {subtitle}
            </div>
          )}
        </div>
      )}
      {!isCollapsed && badge && <div className="flex-shrink-0">{badge}</div>}
    </Link>
  );
}
