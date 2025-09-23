import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const tokenStr = localStorage.getItem("token");

  if (tokenStr) {
    try {
      const token = JSON.parse(tokenStr);
      if (token.role === "admin") return <Navigate to="/admin" replace />;
      return <Navigate to="/" replace />;
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  return <Outlet />;
}
