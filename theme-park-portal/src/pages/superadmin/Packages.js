import { useEffect, useState } from "react";

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/superadmin/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error("Error loading packages:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">All Packages (Across Businesses)</h1>
      <table className="w-full bg-white border rounded-2xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Package Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Business</th>
           
          </tr>
        </thead>
        <tbody>
          {packages.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">₹{p.price}</td>
              <td className="p-2 border">{p.description}</td>
              <td className="p-2 border">{p.businessName}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
