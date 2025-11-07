import { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    admins: 0,
    businesses: 0,
    users: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Use full backend URL if frontend runs on different port
        const response = await fetch("http://localhost:8080/api/dashboard");

        if (!response.ok) throw new Error("Failed to fetch dashboard stats");
        const data = await response.json();

        // Update state
        setStats({
          admins: data.admins,
          businesses: data.businesses,
          users: data.users,
          revenue: data.revenue,
        });

        console.log("Dashboard stats fetched:", data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Admins" value={stats.admins} />
          <StatCard title="Businesses" value={stats.businesses} />
          <StatCard title="Users" value={stats.users} />
          {/* <StatCard
            title="Revenue"
            value={`₹${Number(stats.revenue).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}`}
          /> */}
        </div>
      )}
    </div>
  );
}
