import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function RootLayout() {
  return (
    <div>
      <main className="w-full">
        <Navbar />
        <div>
          <div className="px-2 py-3">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
