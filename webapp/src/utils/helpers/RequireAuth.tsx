import { ReactNode, useLayoutEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { token, user, isAuthInitialized, setIsAuthInitialized } = useUser();
  const { refreshToken } = useAuth();

  useLayoutEffect(() => {
    const init = async () => {
      const userId = Number(localStorage.getItem("userId"));
      if (userId) {
        await refreshToken(userId);
      }
      setIsAuthInitialized(true);
    };

    init();
  }, []);

  if (!isAuthInitialized) return <div>Loading...</div>;

  if (token === null || user === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
