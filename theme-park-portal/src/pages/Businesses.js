// src/pages/SuperAdmin/Businesses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [availableAdmins, setAvailableAdmins] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [newBusiness, setNewBusiness] = useState({
    name: '',
    description: '',
    location: '',
    imageUrl: '',
    email: '',
    phone: '',
    adminId: ''
  });
const CLOUD_NAME = "dtqrcteni"; // From Cloudinary dashboard
  const UPLOAD_PRESET = "unsigned_preset"; 
  const API = 'http://localhost:8080/api/superadmin';

  useEffect(() => {
    fetchBusinesses();
    fetchAvailableAdmins();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get(`${API}/business`);
      setBusinesses(res.data);
    } catch (err) {
      console.error('Error fetching businesses:', err);
    }
  };

  const fetchAvailableAdmins = async () => {
    try {
      const res = await axios.get(`${API}/admins_no_business`);
      setAvailableAdmins(res.data);
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  // 📌 Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset'); // replace with your Cloudinary preset

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, // replace with your Cloudinary cloud name
        formData
      );
      setNewBusiness({ ...newBusiness, imageUrl: res.data.secure_url });
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
    }
  };

  const createBusiness = async () => {
    if (!newBusiness.adminId) return;
    try {
      await axios.post(`${API}/business`, newBusiness);
      setNewBusiness({
        name: '',
        description: '',
        location: '',
        imageUrl: '',
        email: '',
        phone: '',
        adminId: ''
      });
      fetchBusinesses();
      fetchAvailableAdmins();
    } catch (err) {
      console.error('Error creating business:', err);
    }
  };

  const deleteBusiness = async (id) => {
    try {
      await axios.delete(`${API}/business/${id}`);
      fetchBusinesses();
      fetchAvailableAdmins();
    } catch (err) {
      console.error('Error deleting business:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Add Business</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Business Name"
          value={newBusiness.name}
          onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newBusiness.description}
          onChange={(e) => setNewBusiness({ ...newBusiness, description: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={newBusiness.location}
          onChange={(e) => setNewBusiness({ ...newBusiness, location: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newBusiness.email}
          onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newBusiness.phone}
          onChange={(e) => setNewBusiness({ ...newBusiness, phone: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={newBusiness.adminId}
          onChange={(e) => setNewBusiness({ ...newBusiness, adminId: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Admin</option>
          {availableAdmins.map((admin) => (
            <option key={admin.id} value={admin.id}>
              {admin.name} ({admin.email})
            </option>
          ))}
        </select>

        {/* Image upload */}
        <div className="col-span-2 md:col-span-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 rounded w-full"
          />
          {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
          {newBusiness.imageUrl && (
            <img
              src={newBusiness.imageUrl}
              alt="Business"
              className="mt-2 w-40 h-40 object-cover rounded"
            />
          )}
        </div>
      </div>

      <button
        onClick={createBusiness}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>

      {/* Business list */}
      <table className="w-full table-auto bg-white shadow rounded mt-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Admin</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((biz) => (
            <tr key={biz.id}>
              <td className="p-3">{biz.id}</td>
              <td className="p-3">
                {biz.imageUrl && (
                  <img
                    src={biz.imageUrl}
                    alt={biz.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-3">{biz.name}</td>
              <td className="p-3">{biz.description}</td>
              <td className="p-3">{biz.admin?.name || 'N/A'}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteBusiness(biz.id)}
                  className="text-red-600 hover:underline"
                >
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

export default Businesses;
