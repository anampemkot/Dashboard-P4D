import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import type { Role } from "@/constants/roles";

interface AuthorizationProps {
  role: Role | Role[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/** Gate per-komponen: sembunyikan children jika role tidak sesuai */
export function Authorization({
  role,
  fallback = null,
  children,
}: AuthorizationProps) {
  const activeRole = useAuthStore((s) => s.role);
  const allowed = Array.isArray(role) ? role : [role];
  if (!activeRole || !allowed.includes(activeRole)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}

interface RequireAuthProps {
  children: React.ReactNode;
}

/** Guard route: redirect ke /login jika belum memilih akun */
export function RequireAuth({ children }: RequireAuthProps) {
  const activeRole = useAuthStore((s) => s.role);
  if (!activeRole) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
}
