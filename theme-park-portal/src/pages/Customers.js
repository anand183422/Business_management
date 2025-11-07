import React, { useEffect, useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const businessId = user.business.id;

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/customers/${businessId}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setLoading(false);
      });
  }, [businessId]);

  const handleBlockUnblock = async (id, status) => {
    try {
      const newStatus = status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
      await fetch(`http://localhost:8080/api/customers/${id}/status?status=${newStatus}`, {
        method: "PUT",
      });
      setCustomers(
        customers.map((c) =>
          c.id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await fetch(`http://localhost:8080/api/customers/${id}`, { method: "DELETE" });
      setCustomers(customers.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  if (loading) return <p className="text-center p-4">Loading customers...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">First Visit</th>
            <th className="p-2 border">Last Visit</th>
            <th className="p-2 border">Total Bookings</th>
            <th className="p-2 border">Total Payments</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2 border">{c.id}</td>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.firstVisit || "—"}</td>
              <td className="p-2 border">{c.lastVisit || "—"}</td>
              <td className="p-2 border">{c.totalBookings}</td>
              <td className="p-2 border">₹{c.totalPayments}</td>
              <td className="p-2 border">
                {c.status === "ACTIVE" ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600 font-semibold">Blocked</span>
                )}
              </td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => alert("Viewing " + c.name)}
                >
                  View
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => handleBlockUnblock(c.id, c.status)}
                >
                  {c.status === "ACTIVE" ? "Block" : "Unblock"}
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center p-4">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
