import React, { useEffect, useState } from "react";

export default function Users() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/superadmin/visitors")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);

        // Handle both array and object responses safely
        if (Array.isArray(data)) {
          setVisitors(data);
        } else if (data.visitors && Array.isArray(data.visitors)) {
          setVisitors(data.visitors);
        } else {
          setVisitors([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching visitors:", err);
        setLoading(false);
      });
  }, []);
  console.log(visitors);
  if (loading) return <p>Loading visitors...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">All Visitors</h1>
      <div className="bg-white rounded-2xl border p-5 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length > 0 ? (
              visitors.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{v.id}</td>
                  <td className="p-3 border">{v.name}</td>
                  <td className="p-3 border">{v.email}</td>
                  <td className="p-3 border">{v.phone || "N/A"}</td>
                  <td className="p-3 border">
                    {v.createdAt
                      ? new Date(v.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No visitors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
