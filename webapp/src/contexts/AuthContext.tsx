import { createContext, ReactNode, useState } from "react";
import { User } from "../utils/types/user";

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
