import { useEffect, useState } from "react";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("ALL"); // NEW: sorting filter

  const user = JSON.parse(localStorage.getItem("user"));
  const adminId = user?.id;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/payments/${adminId}`);
        if (!res.ok) throw new Error("Failed to fetch payments");
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [adminId]);

  // ✅ Filter / sort payments by paymentStatus
  const filteredPayments =
    sortOrder === "ALL"
      ? payments
      : payments.filter((p) => p.status === sortOrder);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Payments</h1>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Sort by Status:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="ALL">All</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
          <option value="CREATED">Created</option>
          <option value="REFUNDED">Refunded</option>

        </select>
      </div>

      <div className="bg-white rounded-2xl border p-5">
        {loading ? (
          <p>Loading...</p>
        ) : filteredPayments.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Package</th>
                <th className="p-3 border">Amount (₹)</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Method</th>
                <th className="p-3 border">Transaction ID</th>
                <th className="p-3 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{p.id}</td>
                  <td className="p-3 border">{p.customerName}</td>
                  <td className="p-3 border">{p.customerEmail}</td>
                  <td className="p-3 border">{p.packageName}</td>
                  <td className="p-3 border">{p.totalAmount.toFixed(2)}</td>
                
                  <td
                    className={`p-3 border font-semibold ${
                      p.paymentStatus === "SUCCESS"
                        ? "text-green-600"
                        : p.status === "FAILED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="p-3 border">{p.paymentMethod || "—"}</td>
                  <td className="p-3 border">{p.transactionId || "—"}</td>
                  <td className="p-3 border">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
