import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ role }: { role: string[] }) {
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || (user?.role && !role.includes(user?.role))) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
