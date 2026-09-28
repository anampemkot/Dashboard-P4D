import * as React from "react";
import { useUiStore } from "@/stores/useUiStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { MENU } from "@/constants/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Sun, Moon, LogOut, Search, ChevronDown, User } from "lucide-react";
import { ROLES } from "@/constants/roles";

export interface HeaderAppProps {
  id: string;
}

export function HeaderApp({ id }: HeaderAppProps) {
  const { theme, toggleTheme, toggleSidebar } = useUiStore();
  const { role, userName, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeRoleObj = ROLES.find((r) => r.id === role);
  const activeRoleLabel = activeRoleObj ? activeRoleObj.label : "User";

  // Compute active menu label based on path
  let activeMenuLabel = "Dashboard Utama";
  
  const findActiveMenu = (items: typeof MENU): string | null => {
    for (const item of items) {
      if (location.pathname === item.path) {
        return item.label;
      }
      if (item.children) {
        for (const child of item.children) {
          if (location.pathname === child.path) {
            return `${item.label} / ${child.label}`;
          }
        }
      }
    }
    return null;
  };
  
  const computedMenu = findActiveMenu(MENU);
  if (computedMenu) {
    activeMenuLabel = computedMenu;
  } else if (location.pathname.includes("/admin/menu-1/sub-1")) {
    activeMenuLabel = "Menu 1 / Menu 1.1";
  } else if (location.pathname.includes("/admin/menu-1/sub-2")) {
    activeMenuLabel = "Menu 1 / Menu 1.2";
  } else if (location.pathname.includes("/admin/menu-3/sub-1")) {
    activeMenuLabel = "Menu 3 / Menu 3.1";
  } else if (location.pathname.includes("/admin/menu-5/sub-1")) {
    activeMenuLabel = "Menu 5 / Menu 5.1";
  } else if (location.pathname.includes("/admin/menu-5/sub-2")) {
    activeMenuLabel = "Menu 5 / Menu 5.2";
  } else if (location.pathname.includes("/admin/menu-9/sub-1")) {
    activeMenuLabel = "Menu 9 / Menu 9.1";
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      id={id}
      data-ui-id={id}
      className="h-[56px] border-b border-hairline bg-surface px-3 sm:px-4 flex items-center justify-between sticky top-0 z-30 select-none whitespace-nowrap"
    >
      {/* Left section: Collapse button + Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-hidden">
        <button
          id="header-collapse-btn"
          data-ui-id="header-collapse-btn"
          onClick={toggleSidebar}
          className="text-ink-secondary hover:text-ink hover:bg-action-hover p-2 rounded-full transition-colors cursor-pointer shrink-0"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          id="header-breadcrumb"
          data-ui-id="header-breadcrumb"
          className="text-xs text-ink-secondary font-medium tracking-tight flex items-center gap-1.5 sm:gap-2 font-display bg-surface-soft px-2.5 sm:px-3 py-1 rounded-full border border-hairline-soft min-w-0 overflow-hidden"
        >
          <span className="font-bold text-vibrant-purple-dark uppercase tracking-wider shrink-0 text-[10px] sm:text-xs">
            {activeRoleLabel}
          </span>
          <span className="text-hairline shrink-0">/</span>
          <span className="text-ink font-normal truncate max-w-[100px] xs:max-w-[140px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[420px]">
            {activeMenuLabel}
          </span>
        </div>
      </div>

      {/* Right section: Search + Theme + User Menu */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Search Input (visual placeholder) */}
        <div className="relative hidden lg:block w-36 xl:w-48">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Cari menu..."
            disabled={true}
            className="w-full bg-vibrant-grey-bg text-xs text-ink-secondary border border-transparent rounded-full pl-9 pr-3 py-1.5 focus:outline-none opacity-80 font-display"
          />
        </div>

        {/* Theme Toggle */}
        <button
          id="header-theme-toggle"
          data-ui-id="header-theme-toggle"
          onClick={toggleTheme}
          className="text-ink-secondary hover:text-ink hover:bg-action-hover p-2 rounded-full transition-colors cursor-pointer shrink-0"
          aria-label="Toggle Dark/Light Mode"
        >
          {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* User Account Dropdown */}
        <div className="relative shrink-0">
          <button
            id="header-user-menu"
            data-ui-id="header-user-menu"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 hover:bg-action-hover px-2 sm:px-2.5 py-1.5 rounded-full transition-colors cursor-pointer border border-hairline-soft"
          >
            <div className="w-7 h-7 rounded-full bg-vibrant-purple text-vibrant-purple-ink flex items-center justify-center font-bold text-xs shadow-vibrant-purple font-display shrink-0">
              {userName ? userName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <div className="hidden md:flex flex-col items-start leading-none text-left font-display max-w-[90px] lg:max-w-[130px]">
              <span className="text-xs font-semibold text-ink truncate w-full">{userName || "Administrator"}</span>
              <span className="text-[10px] text-ink-muted mt-0.5 truncate w-full">{activeRoleLabel}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-ink-secondary shrink-0" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-1.5 w-48 bg-surface border border-hairline-soft shadow-vibrant-heavy rounded-2xl py-2 z-20 animate-in fade-in slide-in-from-top-1 duration-100 font-display">
                <div className="px-4 py-2 border-b border-hairline-soft">
                  <p className="text-xs font-semibold text-ink truncate">{userName}</p>
                  <p className="text-[10px] text-ink-muted truncate mt-0.5">{activeRoleLabel}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs text-accent hover:bg-action-hover flex items-center gap-2 transition-colors cursor-pointer font-medium rounded-xl my-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
