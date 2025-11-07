// src/pages/SuperAdmin/Admins.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });

  const API = 'http://localhost:8080/api/superadmin';

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const res = await axios.get(`${API}/admins`);
    setAdmins(res.data);
  };

  const createAdmin = async () => {
    await axios.post(`${API}/create-admin`, newAdmin);
    setNewAdmin({ name: '', email: '', password: '' });
    fetchAdmins();
  };

  const deleteAdmin = async (id) => {
    await axios.delete(`${API}/admin/${id}`);
    fetchAdmins();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Add Admin</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          className="border p-2 rounded w-1/4"
        />
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          className="border p-2 rounded w-1/4"
        />
        <input
          type="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          className="border p-2 rounded w-1/4"
        />
        <button onClick={createAdmin} className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="w-full table-auto bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="p-3">{admin.id}</td>
              <td className="p-3">{admin.name}</td>
              <td className="p-3">{admin.email}</td>
              <td className="p-3">
                <button onClick={() => deleteAdmin(admin.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admins;
