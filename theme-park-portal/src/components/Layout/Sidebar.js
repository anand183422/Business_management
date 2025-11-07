import { NavLink } from "react-router-dom";

const linkClass = "flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-indigo-50 transition";
const active = "bg-indigo-100 text-indigo-700 font-semibold";

export default function Sidebar() {

  const items = [
    { to: "/admin", label: "Dashboard", emoji: "📊" },
    { to: "/admin/packages", label: "Packages", emoji: "🎁" },
    { to: "/admin/products", label: "Products", emoji: "🛒" },
    { to: "/admin/bookings", label: "Bookings", emoji: "🧾" },
    { to: "/admin/customers", label: "Customers", emoji: "👥" },
    { to: "/admin/payments", label: "Payments", emoji: "💳" },
    { to: "/admin/analytics", label: "Analytics", emoji: "📈" },
  ];
  
  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0 p-4 overflow-y-auto">
      <div className="text-2xl font-black text-indigo-700 px-2 mb-6">Admin Dashboard</div>
      <nav className="space-y-1">
        {items.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.to === "/admin"}  // exact match only for dashboard
            className={({ isActive }) =>
              `${linkClass} ${isActive ? active : "text-gray-700"}`
            }
          >
            <span>{i.emoji}</span>
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
