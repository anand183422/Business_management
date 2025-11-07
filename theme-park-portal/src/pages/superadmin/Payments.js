import React, { useEffect, useState } from "react";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:8080/superadmin/all")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch payments");
        return res.json();
      })
      .then((data) => {
        setPayments(data);
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">💰 All Payments</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading payments...</div>
      ) : payments.length === 0 ? (
        <div className="text-center text-gray-500">No payments found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b text-left">#</th>
                <th className="p-3 border-b text-left">Customer</th>
                <th className="p-3 border-b text-left">Email</th>
                <th className="p-3 border-b text-left">Package (Business)</th>
                <th className="p-3 border-b text-left">Amount (₹)</th>
                <th className="p-3 border-b text-left">Status</th>
               
                <th className="p-3 border-b text-left">Transaction ID</th>
                <th className="p-3 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b font-medium">{payment.customerName}</td>
                  <td className="p-3 border-b">{payment.customerEmail}</td>
                  <td className="p-3 border-b">{payment.packageName || "—"}</td>
                  <td className="p-3 border-b">₹{payment.totalAmount?.toFixed(2)}</td>
                  <td
                    className={`p-3 border-b font-semibold ${
                      payment.status === "SUCCESS"
                        ? "text-green-600"
                        : payment.status === "FAILED"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="p-3 border-b text-sm text-gray-700">
                    {payment.transactionId || "—"}
                  </td>
                  <td className="p-3 border-b text-sm text-gray-700">
                    {new Date(payment.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
