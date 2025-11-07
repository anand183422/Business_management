import { useState } from "react";
import { Outlet } from "react-router-dom"; // ✅ important
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Main */}
        <main className="flex-1 p-6 overflow-y-auto bg-white shadow-inner rounded-tl-2xl">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* ✅ renders nested pages like /admin/packages */}
          </div>
        </main>
      </div>
    </div>
  );
}
