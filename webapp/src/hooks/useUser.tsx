import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../utils/types/user";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const user = useContext(AuthContext);
  if (!user) throw new Error("useUser must be used within a AuthProvider");

  return user;
}
