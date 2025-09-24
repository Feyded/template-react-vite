import { useAuthContext } from "@/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ role }: { role: string[] }) {
  const { isAuthenticated, user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || (user?.role && !role.includes(user?.role))) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
