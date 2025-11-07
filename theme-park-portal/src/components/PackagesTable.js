import React from "react";

const PackagesTable = () => {
  return (
    <div className="p-4 border rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Packages</h2>
      {/* Replace with actual packages list */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Features</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample row */}
          <tr>
            <td className="border p-2">1</td>
            <td className="border p-2">Super Sunday</td>
            <td className="border p-2">Roller Coaster, Water Slide</td>
            <td className="border p-2">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PackagesTable;
