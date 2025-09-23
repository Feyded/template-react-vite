import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
  login: (user: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  loading: true,
  logout: () => {},
  login: (_user: any) => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
  };

  const login = (currentUser: any) => {
    setUser(currentUser);
    setIsAdmin(currentUser.role === "admin");
    localStorage.setItem("token", JSON.stringify(currentUser));
  };

  useEffect(() => {
    const tokenStr = localStorage.getItem("token");
    if (tokenStr) {
      try {
        const parsedUser = JSON.parse(tokenStr);
        setUser(parsedUser);
        setIsAdmin(parsedUser.role === "admin");
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
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
