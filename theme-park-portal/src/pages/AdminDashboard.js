// components/AdminDashboardLayout.jsx
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => (
  <div className="flex h-screen">
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <nav className="space-y-2">
        <Link to="products" className="block p-2 hover:bg-gray-700 rounded">Products</Link>
        <Link to="packages" className="block p-2 hover:bg-gray-700 rounded">Packages</Link>
      </nav>
    </aside>
    <main className="flex-1 p-6 bg-gray-100 overflow-auto">
      <Outlet />
    </main>
  </div>
);

export default AdminDashboard;
