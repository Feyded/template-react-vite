import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (isAuthenticated && user?.role === "user") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
