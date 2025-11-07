import React, { useEffect, useState } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("ALL"); // filter state
  const user = JSON.parse(localStorage.getItem("user"));
  const adminId = user?.id;

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/bookings/${adminId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
          console.error("Unexpected API response:", data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        setBookings([]);
      });
  }, [adminId]);

  // Apply filter
  const filteredBookings =
    filter === "ALL"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Bookings</h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        {["ALL", "PENDING", "CONFIRMED", "CANCELLED"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg border ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border p-5 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Package</th>
              <th className="border p-2">Visit Date</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td className="border p-2">{b.id}</td>
                  <td className="border p-2">{b.customerName}</td>
                  <td className="border p-2">{b.customerEmail}</td>
                  <td className="border p-2">{b.packageName }</td>
                  <td className="border p-2">{b.visitDate }</td>
                  <td className="border p-2">₹{b.totalAmount ?? 0}</td>
                  <td className="border p-2">{b.status}</td>
                  <td className="border p-2">{b.paymentStatus}</td>
                  <td className="border p-2">
                    {b.status === "CONFIRMED" && (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                          const reason = prompt("Enter cancellation reason:");
                          if (reason) {
                            fetch(
                              `http://localhost:8080/api/admin/bookings/cancel/${b.id}`,
                              { method: "PUT" }
                            ).then(() => {
                              alert("Booking cancelled: " + reason);
                              window.location.reload();
                            });
                          }
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-3">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
