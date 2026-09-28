import * as React from "react";
import { cva } from "class-variance-authority";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelRightClose,
  Menu,
  X,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TextApp } from "../atoms/TextApp";
import { AvatarApp } from "../atoms/AvatarApp";
import { BadgeApp } from "../atoms/BadgeApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { CardApp } from "../atoms/CardApp";

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  path?: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode | string | number;
  badgeVariant?: "solidPurple" | "neutral" | "danger" | "success" | "warning";
  children?: MenuItem[];
  onClick?: (e?: React.MouseEvent) => void;
}

export interface MenuGroup {
  id?: string;
  heading?: string;
  items: MenuItem[];
}

export type SidebarPosition = "left" | "right";
export type SidebarVariant = "default" | "dark" | "glassmorphism";
export type SidebarSize = "sm" | "md" | "lg";
export type SidebarRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface SidebarUserProfile {
  name: string;
  role: string;
  avatarUrl?: string;
  avatarInitials?: string;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export interface SidebarBrand {
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export interface SidebarAppProps {
  id?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  position?: SidebarPosition;
  variant?: SidebarVariant;
  size?: SidebarSize;
  rounded?: SidebarRounded;
  menuGroups?: MenuGroup[];
  userProfile?: SidebarUserProfile;
  brand?: SidebarBrand;
  embedded?: boolean;
  className?: string;
  ariaLabel?: string;
}

const roundedMap: Record<SidebarRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const widthMap: Record<SidebarSize, { expanded: string; collapsed: string }> = {
  sm: { expanded: "w-[220px]", collapsed: "w-[60px]" },
  md: { expanded: "w-[260px]", collapsed: "w-[72px]" },
  lg: { expanded: "w-[290px]", collapsed: "w-[80px]" },
};

export function SidebarApp({
  id = "sidebar-app",
  isCollapsed: propIsCollapsed,
  onToggleCollapse,
  position = "left",
  variant = "default",
  size = "md",
  rounded = "md",
  menuGroups = [],
  userProfile,
  brand = {
    title: "BPKAD Kota Jogja",
    subtitle: "P4D Monitoring System",
    logo: <Building2 className="w-5 h-5 text-vibrant-purple-dark" />,
  },
  embedded = false,
  className,
  ariaLabel = "Main Sidebar Navigation",
}: SidebarAppProps) {
  // Internal state if isCollapsed prop is omitted
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const isCollapsed = propIsCollapsed !== undefined ? propIsCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  // State for accordion sub-menus expanded state
  const [expandedSubMenus, setExpandedSubMenus] = React.useState<Record<string, boolean>>({});

  // Auto-expand sub-menus if child is active
  React.useEffect(() => {
    const nextState: Record<string, boolean> = { ...expandedSubMenus };
    let changed = false;

    menuGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const hasActiveChild = item.children.some((child) => child.active);
          if (hasActiveChild && !nextState[item.id]) {
            nextState[item.id] = true;
            changed = true;
          }
        }
      });
    });

    if (changed) {
      setExpandedSubMenus(nextState);
    }
  }, [menuGroups]);

  const toggleSubMenu = (menuId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedSubMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // Hover state for collapsed popover previews
  const [hoveredMenuId, setHoveredMenuId] = React.useState<string | null>(null);

  // Variant class mapping
  const variantClasses = React.useMemo(() => {
    switch (variant) {
      case "dark":
        return "bg-slate-900 text-slate-100 border-slate-800 shadow-xl";
      case "glassmorphism":
        return "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-white/30 dark:border-slate-800/60 shadow-xl text-ink";
      case "default":
      default:
        return "bg-surface text-ink border-hairline-soft shadow-sm";
    }
  }, [variant]);

  const roundedClass = roundedMap[rounded];
  const sizeWidths = widthMap[size];

  // Helper to render single menu item
  const renderMenuItem = (item: MenuItem, isSub = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSubExpanded = !!expandedSubMenus[item.id];
    const isHovered = hoveredMenuId === item.id;

    const isActive = item.active || (hasChildren && item.children?.some((c) => c.active));

    return (
      <div
        key={item.id}
        className="relative flex flex-col gap-1"
        onMouseEnter={() => isCollapsed && setHoveredMenuId(item.id)}
        onMouseLeave={() => isCollapsed && setHoveredMenuId(null)}
      >
        <button
          id={`${id}-item-${item.id}`}
          type="button"
          onClick={(e) => {
            if (hasChildren && !isCollapsed) {
              toggleSubMenu(item.id, e);
            } else if (item.onClick) {
              item.onClick(e);
            }
          }}
          className={cn(
            "group relative flex items-center justify-between w-full p-2 transition-all cursor-pointer outline-none select-none text-left",
            roundedClass,
            isSub ? "py-1.5 px-3 text-xs" : "py-2 px-3 text-sm",
            isActive
              ? variant === "dark"
                ? "bg-vibrant-purple-dark text-white font-bold shadow-xs"
                : "bg-vibrant-purple/15 text-vibrant-purple-dark dark:text-vibrant-purple-light font-bold"
              : variant === "dark"
              ? "text-slate-300 hover:bg-slate-800 hover:text-white"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
          )}
        >
          {/* Active left indicator line */}
          {isActive && !isSub && (
            <span
              className={cn(
                "absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-vibrant-purple-dark dark:bg-vibrant-purple-light",
                rounded === "full" && "left-1"
              )}
            />
          )}

          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {item.icon && (
              <span
                className={cn(
                  "shrink-0 flex items-center justify-center transition-colors",
                  size === "sm" ? "w-4 h-4" : size === "lg" ? "w-5 h-5" : "w-4 h-4",
                  isActive
                    ? variant === "dark"
                      ? "text-white"
                      : "text-vibrant-purple-dark dark:text-vibrant-purple-light"
                    : "text-slate-500 dark:text-slate-400 group-hover:text-current"
                )}
              >
                {item.icon}
              </span>
            )}

            {!isCollapsed && (
              <TextApp
                id={`${id}-label-${item.id}`}
                variant={isSub ? "caption" : "body"}
                weight={isActive ? "bold" : "medium"}
                className={cn(
                  "truncate leading-none",
                  isSub ? "text-xs" : size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
                  isActive
                    ? variant === "dark"
                      ? "text-white"
                      : "text-vibrant-purple-dark dark:text-vibrant-purple-light"
                    : ""
                )}
              >
                {item.label}
              </TextApp>
            )}
          </div>

          {/* Badge or Accordion Arrow */}
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              {item.badge !== undefined && (
                typeof item.badge === "object" ? (
                  item.badge
                ) : (
                  <BadgeApp
                    id={`${id}-badge-${item.id}`}
                    variant={item.badgeVariant || (isActive ? "solidPurple" : "neutral")}
                    size="sm"
                    rounded="pill"
                  >
                    {String(item.badge)}
                  </BadgeApp>
                )
              )}

              {hasChildren && (
                <span
                  onClick={(e) => toggleSubMenu(item.id, e)}
                  className="p-0.5 rounded hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-transform cursor-pointer"
                >
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      isSubExpanded && "rotate-180"
                    )}
                  />
                </span>
              )}
            </div>
          )}
        </button>

        {/* Accordion Sub-menu when expanded */}
        {hasChildren && isSubExpanded && !isCollapsed && (
          <div className="pl-4 ml-3 border-l-2 border-vibrant-purple/20 flex flex-col gap-1 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
            {item.children!.map((child) => renderMenuItem(child, true))}
          </div>
        )}

        {/* Hover Popover preview when Collapsed Mini */}
        {isCollapsed && isHovered && (
          <div
            className={cn(
              "absolute z-50 min-w-[180px] p-2 bg-surface dark:bg-slate-900 rounded-xl border border-hairline shadow-xl text-left animate-in fade-in-50 zoom-in-95",
              position === "left" ? "left-full ml-2 top-0" : "right-full mr-2 top-0"
            )}
          >
            <div className="flex items-center justify-between border-b border-hairline-soft pb-1.5 mb-1.5">
              <TextApp id={`${id}-pop-title-${item.id}`} variant="caption" weight="bold" className="text-xs truncate">
                {item.label}
              </TextApp>
              {item.badge !== undefined && (
                <BadgeApp id={`${id}-pop-badge-${item.id}`} variant="solidPurple" size="sm">
                  {String(item.badge)}
                </BadgeApp>
              )}
            </div>

            {hasChildren ? (
              <div className="flex flex-col gap-1">
                {item.children!.map((child) => (
                  <button
                    key={child.id}
                    id={`${id}-pop-child-${child.id}`}
                    type="button"
                    onClick={child.onClick}
                    className={cn(
                      "flex items-center gap-2 p-1.5 rounded-lg text-xs font-medium text-left transition-colors",
                      child.active
                        ? "bg-vibrant-purple/10 text-vibrant-purple-dark dark:text-vibrant-purple-light font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {child.icon}
                    <TextApp id={`${id}-pop-child-lbl-${child.id}`} variant="body" className="text-xs truncate">
                      {child.label}
                    </TextApp>
                  </button>
                ))}
              </div>
            ) : (
              <TextApp id={`${id}-pop-desc-${item.id}`} variant="caption" className="text-[11px] text-ink-muted">
                Klik untuk membuka {item.label}
              </TextApp>
            )}
          </div>
        )}
      </div>
    );
  };

  const containerClasses = cn(
    "flex flex-col select-none transition-all duration-300 ease-in-out font-sans",
    variantClasses,
    embedded
      ? cn("relative h-full border rounded-card-custom overflow-hidden", isCollapsed ? sizeWidths.collapsed : sizeWidths.expanded)
      : cn(
          "fixed top-0 bottom-0 z-40 h-screen border-r border-hairline-soft",
          position === "left" ? "left-0" : "right-0 border-l border-r-0",
          isCollapsed ? sizeWidths.collapsed : sizeWidths.expanded
        ),
    className
  );

  return (
    <aside id={id} data-ui-id={id} aria-label={ariaLabel} className={containerClasses}>
      {/* 1. Header Section (P4: 16px / p-4) */}
      <div
        id={`${id}-header`}
        className={cn(
          "p-4 border-b border-hairline-soft flex items-center shrink-0 transition-all",
          isCollapsed ? "justify-center px-2" : "justify-between gap-3"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {brand.logo && <span className="shrink-0">{brand.logo}</span>}
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 text-left leading-tight">
              {brand.title && (
                <TextApp
                  id={`${id}-brand-title`}
                  variant="body"
                  weight="bold"
                  className={cn(
                    "truncate",
                    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
                    variant === "dark" ? "text-white" : "text-slate-900 dark:text-slate-100"
                  )}
                >
                  {brand.title}
                </TextApp>
              )}
              {brand.subtitle && (
                <TextApp
                  id={`${id}-brand-subtitle`}
                  variant="caption"
                  className={cn(
                    "truncate text-[10px] uppercase tracking-wider mt-0.5",
                    variant === "dark" ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
                  )}
                >
                  {brand.subtitle}
                </TextApp>
              )}
            </div>
          )}
        </div>

        <button
          id={`${id}-toggle-btn`}
          type="button"
          onClick={handleToggle}
          aria-label={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
          className={cn(
            "p-1.5 rounded-lg transition-colors cursor-pointer shrink-0",
            variant === "dark"
              ? "text-slate-400 hover:text-white hover:bg-slate-800"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          {isCollapsed ? (
            position === "left" ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
          ) : position === "left" ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelRightClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 2. Menu Item List Section (P4: gap-4 between menu groups, P2: gap-2 inside items) */}
      <div
        id={`${id}-menu-body`}
        className={cn(
          "flex-1 overflow-y-auto p-3 space-y-4 custom-sidebar-scrollbar text-left",
          isCollapsed && "px-2"
        )}
      >
        {menuGroups.map((group, groupIdx) => (
          <div key={group.id || `group-${groupIdx}`} className="space-y-1">
            {group.heading && !isCollapsed && (
              <TextApp
                id={`${id}-group-heading-${groupIdx}`}
                variant="caption"
                weight="bold"
                className={cn(
                  "px-3 text-[10px] uppercase tracking-wider block mb-1 select-none",
                  variant === "dark" ? "text-slate-400" : "text-slate-400 dark:text-slate-500"
                )}
              >
                {group.heading}
              </TextApp>
            )}

            <div className="flex flex-col gap-1">
              {group.items.map((item) => renderMenuItem(item))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. User Profile & Footer Section (P3: p-3 padding) */}
      {userProfile && (
        <div
          id={`${id}-footer-profile`}
          className={cn(
            "p-3 border-t border-hairline-soft shrink-0 transition-all",
            variant === "dark" ? "bg-slate-900/90" : "bg-surface-soft/60 dark:bg-slate-800/40"
          )}
        >
          <CardApp
            id={`${id}-user-card`}
            variant="flat"
            className={cn(
              "p-2 bg-surface dark:bg-slate-800 border border-hairline-soft flex items-center transition-all",
              roundedClass,
              isCollapsed ? "justify-center p-1.5" : "justify-between gap-2.5"
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <AvatarApp
                id={`${id}-user-avatar`}
                size={size === "sm" ? "xs" : "sm"}
                variant="vibrant"
                src={userProfile.avatarUrl}
                name={userProfile.name}
              />

              {!isCollapsed && (
                <div className="flex flex-col min-w-0 text-left leading-tight">
                  <TextApp
                    id={`${id}-user-name`}
                    variant="caption"
                    weight="bold"
                    className={cn(
                      "truncate text-xs",
                      variant === "dark" ? "text-white" : "text-slate-900 dark:text-slate-100"
                    )}
                  >
                    {userProfile.name}
                  </TextApp>
                  <TextApp
                    id={`${id}-user-role`}
                    variant="caption"
                    className={cn(
                      "truncate text-[10px]",
                      variant === "dark" ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {userProfile.role}
                  </TextApp>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div className="flex items-center gap-1 shrink-0">
                {userProfile.onSettingsClick && (
                  <ButtonApp
                    id={`${id}-btn-settings`}
                    variant="ghost"
                    size="icon-xs"
                    onClick={userProfile.onSettingsClick}
                    aria-label="Pengaturan Profil"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  </ButtonApp>
                )}
                {userProfile.onLogoutClick && (
                  <ButtonApp
                    id={`${id}-btn-logout`}
                    variant="ghost"
                    size="icon-xs"
                    onClick={userProfile.onLogoutClick}
                    aria-label="Logout Account"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500 hover:text-red-600" />
                  </ButtonApp>
                )}
              </div>
            )}
          </CardApp>
        </div>
      )}
    </aside>
  );
}
