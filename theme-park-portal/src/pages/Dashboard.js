import React, { useEffect, useState } from "react";
import StatCard from "../components/UI/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    packages: 0,
    products: 0,
    bookings: 0,
    revenue: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const businessId = user?.business?.id;

  useEffect(() => {
    if (!businessId) return;

    // Helper to update a single field without overwriting others
    const updateStat = (key, value) =>
      setStats((prev) => ({ ...prev, [key]: value }));

    // Fetch packages
    fetch(`http://localhost:8080/api/admin/packages/count/${businessId}`)
      .then((res) => res.json())
      .then((data) => updateStat("packages", data.count))
      .catch(() => console.error("Failed to load packages count"));

    // Fetch products
    fetch(`http://localhost:8080/api/admin/products/count/${businessId}`)
      .then((res) => res.json())
      .then((data) => updateStat("products", data.count))
      .catch(() => console.error("Failed to load products count"));

    // Fetch bookings
    fetch(`http://localhost:8080/api/admin/bookings/count/${businessId}`)
      .then((res) => res.json())
      .then((data) => updateStat("bookings", data.count))
      .catch(() => console.error("Failed to load bookings count"));

    // Fetch revenue
    fetch(`http://localhost:8080/api/admin/revenue/${businessId}`)
      .then((res) => res.json())
      .then((data) => updateStat("revenue", data.totalRevenue ?? 0))
      .catch(() => console.error("Failed to load revenue"));
  }, [businessId]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Packages" value={stats.packages}  />
        <StatCard title="Total Products" value={stats.products} />
        <StatCard title="Bookings" value={stats.bookings} />
        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          
        />
      </div>
      {/* <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border p-5">Bookings Trend (hook up a chart)</div>
        <div className="bg-white rounded-2xl border p-5">Top Packages / Products</div>
      </div> */}
    </>
  );
}
