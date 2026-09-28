import { create } from "zustand";
import { persist } from "zustand/middleware";

type UiState = {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "light",
      sidebarOpen: true,
      toggleTheme: () =>
        set((state) => {
          const nextTheme = state.theme === "light" ? "dark" : "light";
          if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { theme: nextTheme };
        }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: "p4d-ui",
    }
  )
);
