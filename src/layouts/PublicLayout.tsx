import * as React from "react";
import { Outlet } from "react-router-dom";
import { useUiStore } from "@/stores/useUiStore";

export default function PublicLayout() {
  const { theme } = useUiStore();

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
      id="layout-public-root"
      data-ui-id="layout-public-root"
      className="min-h-screen bg-canvas text-ink transition-colors duration-200"
    >
      <Outlet />
    </div>
  );
}
