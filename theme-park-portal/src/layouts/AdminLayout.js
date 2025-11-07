// src/layouts/AdminLayout.js
import { useState } from "react";
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart3, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Products", icon: ShoppingBag, path: "/admin/products" },
    { name: "Packages", icon: Package, path: "/admin/packages" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    // clear auth data (example: localStorage)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <h1 className={`text-xl font-bold text-blue-600 ${!isSidebarOpen && "hidden"}`}>
            Admin Panel
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
          >
            ☰
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {sidebarItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 m-2 text-red-600 hover:bg-red-100 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-700">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
