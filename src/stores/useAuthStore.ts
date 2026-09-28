import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "@/constants/roles";

type AuthState = {
  role: Role | null;
  userName: string | null;
  login: (role: Role, userName: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      userName: null,
      login: (role, userName) => set({ role, userName }),
      logout: () => set({ role: null, userName: null }),
    }),
    { name: "p4d-auth" }
  )
);
