import { useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ role }: { role: string[] }) {
  const tokenStr = localStorage.getItem("token");

  const isAuthorized = useMemo(() => {
    if (!tokenStr) return false;
    try {
      const token = JSON.parse(tokenStr);
      return token.role && role.includes(token.role);
    } catch (error) {
      localStorage.removeItem("token");
      return false;
    }
  }, [tokenStr, role]);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
