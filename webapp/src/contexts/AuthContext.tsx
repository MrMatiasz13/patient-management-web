import { createContext, ReactNode, useLayoutEffect, useState } from "react";
import { User } from "../utils/types/models/user";
import axiosClient from "../api/axiosClient";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthInitialized: boolean;
  setIsAuthInitialized: (val: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false);

  useLayoutEffect(() => {
    const authInterceptor = axiosClient.interceptors.request.use(
      (config: any) => {
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;

        return config;
      }
    );

    return () => {
      axiosClient.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
          try {
            const userId = localStorage.getItem("userId");
            const response = await axiosClient.post("auth/refresh", {
              userId: userId,
            });

            setToken(response.data.token);
            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            originalRequest._retry = true;

            return axiosClient(originalRequest);
          } catch (error) {
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthInitialized,
        setIsAuthInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
