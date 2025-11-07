import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SuperAdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-6">
        <Outlet /> {/* Child pages will render here */}
      </div>
    </div>
  );
};

export default SuperAdminLayout;
