import { ReactNode, useLayoutEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { token, user } = useUser();
  const { refreshToken } = useAuth();

  useLayoutEffect(() => {
    const userId = Number(localStorage.getItem("userId"));

    if (userId) {
      refreshToken(userId);
    }
  }, [token]);

  if (token === null || user === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
