import { useState } from "react";
import Sidebar from "../components/Sidebar";

// Pages
import Dashboard from "../pages/superadmin/Dashboard";
import Admins from "../pages/superadmin/Admins";
import Businesses from "../pages/superadmin/Businesses";
import Users from "../pages/superadmin/Users";
import Products from "../pages/superadmin/Products";
import Packages from "../pages/superadmin/Packages";
import Bookings from "../pages/superadmin/Bookings";
import Payments from "../pages/superadmin/Payments";
import Analytics from "../pages/superadmin/Analytics";

export default function SuperAdminDashboard() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 p-6 overflow-y-auto">
        {active === "dashboard" && <Dashboard />}
        {active === "admins" && <Admins />}
        {active === "businesses" && <Businesses />}
        {active === "users" && <Users />}
        {active === "products" && <Products />}
        {active === "packages" && <Packages />}
        {active === "bookings" && <Bookings />}
        {active === "payments" && <Payments />}
        {active === "analytics" && <Analytics />}
      </main>
    </div>
  );
}
