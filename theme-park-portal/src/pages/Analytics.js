import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8","#82ca9d","#ffc658","#ff7f50","#8dd1e1"];

export default function AnalyticsDashboard() {
  const [monthly, setMonthly] = useState([]);
  const [packages, setPackages] = useState([]);
  const [last7, setLast7] = useState([]);
  const [product,setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [mRes, pRes, lRes, prodRes] = await Promise.all([
        fetch("http://localhost:8000/analytics/monthly"),
        fetch("http://localhost:8000/analytics/packages"),
        fetch("http://localhost:8000/analytics/last7days"),
        fetch("http://localhost:8000/analytics/products"),

      ]);
      setMonthly(await mRes.json());

      const pData = await pRes.json();
      setPackages(pData.map(p => ({ name: `Package ${p.package_id}`, value: p.bookings })));

      setLast7(await lRes.json());
      setProduct(await prodRes.json());
    };
    fetchData();
  }, []);

  return (
   <div style={{ padding: 24, background: "#f9fafb", minHeight: "100vh" }}>
  <h2 style={{ fontSize: 24, fontWeight: "600", marginBottom: 24 }}>📊 Analytics Dashboard</h2>

  {/* Row 1: Monthly Revenue & Package-wise Bookings */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
    
    {/* Monthly Revenue */}
    <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <h3 style={{ fontSize: 18, fontWeight: "500", marginBottom: 12 }}>Monthly Revenue</h3>
      <ResponsiveContainer width="60%" height={280}>
        <BarChart data={monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_amount" fill="#6366f1" barSize={45} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Package-wise Bookings */}
    <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <h3 style={{ fontSize: 18, fontWeight: "500", marginBottom: 12 }}>Package-wise Bookings</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={packages}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {packages.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

  </div>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
  {/* Row 2: Last 7 Days Revenue */}
  <div style={{ marginTop: 40, background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
    <h3 style={{ fontSize: 18, fontWeight: "500", marginBottom: 12 }}>Last 7 Days Revenue</h3>
   <ResponsiveContainer width="60%" height={280}>
  <BarChart data={last7} barCategoryGap="30%">
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Bar
      dataKey="total_amount"
      fill="#34d399"
      barSize={80}
      radius={[6, 6, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>

  </div>
 
  <div style={{ marginTop: 40,background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      <h3 style={{ fontSize: 18, fontWeight: "500", marginBottom: 12 }}>Product</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={product}
            dataKey="booking_count"
            nameKey="product_name"
            outerRadius={90}
            label
          >
            {packages.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

  </div>
</div>

  );
}
