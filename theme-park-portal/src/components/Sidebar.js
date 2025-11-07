import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Building,
  ShoppingBag,
  Package,
  Calendar,
  CreditCard,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { to: "/superadmin", label: "Dashboard", icon: <Home size={20} />, end: true },
    { to: "/superadmin/admins", label: "Manage Admins", icon: <Users size={20} /> },
    { to: "/superadmin/businesses", label: "Businesses", icon: <Building size={20} /> },
    { to: "/superadmin/users", label: "Users", icon: <Users size={20} /> },
    { to: "/superadmin/products", label: "Products", icon: <ShoppingBag size={20} /> },
    { to: "/superadmin/packages", label: "Packages", icon: <Package size={20} /> },
    { to: "/superadmin/bookings", label: "Bookings", icon: <Calendar size={20} /> },
    { to: "/superadmin/payments", label: "Payments", icon: <CreditCard size={20} /> },
    { to: "/superadmin/analytics", label: "Analytics", icon: <BarChart size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-5 text-xl font-bold border-b">Super Admin</div>

      <nav className="flex-1 p-3 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Optional footer section */}
      {/* 
      <div className="p-3 border-t">
        <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
          <Settings size={20} /> Settings
        </button>
        <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg mt-2">
          <LogOut size={20} /> Logout
        </button>
      </div>
      */}
    </aside>
  );
}
