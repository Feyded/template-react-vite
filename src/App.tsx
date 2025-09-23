import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import DashboardPage from "./pages/admin/dashboard";
import ProductsPage from "./pages/admin/products";
import AdminLayout from "./components/admin/admin-layout";
import UsersPage from "./pages/admin/users";
import LoginPage from "./pages/login";
import ProtectedRoute from "./components/protected-route";
import GuestRoute from "./components/guest-route";
import RootLayout from "./components/root-layout";
import CartPage from "./pages/cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* CUSTOMER LINKS */}
          <Route element={<ProtectedRoute role={["user"]} />}>
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Route>

        {/* ADMIN LINKS */}
        <Route path="admin" element={<ProtectedRoute role={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
