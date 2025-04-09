import { ReactNode } from "react";
import { useUser } from "../../hooks/useUser";
import { Navigate } from "react-router";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useUser();

  if (user === null || undefined) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
