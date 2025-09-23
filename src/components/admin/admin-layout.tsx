import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./admin-sidebar";
import AdminNavbar from "./admin-navbar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">
        <AdminNavbar />
        <div className="container mx-auto px-5 py-2">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
