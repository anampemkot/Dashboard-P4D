import * as React from "react";
import { Outlet } from "react-router-dom";
import { SidebarApp, HeaderApp, ScrollProgressApp } from "@/packages/design-system";
import { useUiStore } from "@/stores/useUiStore";

export default function AdminLayout() {
  const { sidebarOpen, theme } = useUiStore();
  const contentRef = React.useRef<HTMLElement>(null);

  // Initialize theme on mount
  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      id="layout-admin-root"
      data-ui-id="layout-admin-root"
      className="min-h-screen bg-canvas text-ink transition-colors duration-200 flex flex-col"
    >
      {/* Sidebar (Fixed position) */}
      <SidebarApp id="layout-sidebar" />

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "pl-[68px]" : "pl-0"
        }`}
      >
        <div className="flex-1 flex flex-col bg-canvas min-h-screen">
          {/* Header */}
          <HeaderApp id="layout-header" />

          {/* Scroll Container */}
          <main
            ref={contentRef}
            id="layout-content"
            data-ui-id="layout-content"
            className="flex-1 overflow-y-auto bg-canvas relative p-4 sm:p-6 md:p-8 h-[calc(100vh-56px)]"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Scroll progress & Dot Indicator */}
            <ScrollProgressApp
              id="scroll-progress-root"
              containerRef={contentRef}
            />

            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
