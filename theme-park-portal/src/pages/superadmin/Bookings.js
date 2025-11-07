import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuperAdminBookings() {
  const [bookings, setBookings] = useState({});
  const [activeTab, setActiveTab] = useState("CONFIRMED");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/superadmin/bookings");
      setBookings(res.data || {});
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const statusTabs = Object.keys(bookings);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        All Bookings
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6 flex-wrap gap-2">
        {statusTabs.length > 0 ? (
          statusTabs.map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-2 rounded-md border transition ${
                activeTab === status
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        {bookings[activeTab] && bookings[activeTab].length > 0 ? (
          <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Booking ID</th>
                <th className="py-3 px-4 text-left">User ID</th>
                <th className="py-3 px-4 text-left">Business ID</th>
                <th className="py-3 px-4 text-left">Package ID</th>
                <th className="py-3 px-4 text-left">Visit Date</th>
                <th className="py-3 px-4 text-left">People</th>
                <th className="py-3 px-4 text-left">Amount (₹)</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings[activeTab].map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{b.id}</td>
                  <td className="py-2 px-4">{b.userName}</td>
                  <td className="py-2 px-4">{b.businessName}</td>
                  <td className="py-2 px-4">{b.packageName}</td>
                  <td className="py-2 px-4">
                    {new Date(b.visitDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{b.numberOfPeople}</td>
                  <td className="py-2 px-4">{b.totalAmount}</td>
                  <td className="py-2 px-4">
                    {b.paymentStatus ? b.paymentStatus : "-"}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        b.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : b.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
