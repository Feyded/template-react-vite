import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  admin: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  admin: false,
  loading: true,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tokenStr = localStorage.getItem("token");
    if (tokenStr) {
      try {
        const parsedUser = JSON.parse(tokenStr);
        setUser(parsedUser);
        setAdmin(parsedUser.role === "admin");
      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
    }
  }, []);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    admin,
    loading,
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
