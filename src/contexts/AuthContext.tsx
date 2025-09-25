import type { User } from "@/types/user";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  wallet: number;
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
  setUser: (user: User) => void;
  setWallet: (amount: number) => void;
  login: (user: User) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  wallet: 0,
  isAdmin: false,
  loading: true,
  logout: () => {},
  setUser: () => {},
  setWallet: () => {},
  login: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setWallet(0);
    localStorage.removeItem("token");
  };

  const login = (currentUser: User) => {
    setUser(currentUser);
    setWallet(currentUser.wallet);
    setIsAdmin(currentUser.role === "admin");
    localStorage.setItem("token", JSON.stringify(currentUser));
  };

  useEffect(() => {
    const tokenStr = localStorage.getItem("token");
    if (tokenStr) {
      try {
        const parsedUser = JSON.parse(tokenStr);
        setUser(parsedUser);
        setWallet(parsedUser.wallet);
        setIsAdmin(parsedUser.role === "admin");
      } catch {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    setUser,
    user,
    setWallet,
    wallet,
    isAdmin,
    loading,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
