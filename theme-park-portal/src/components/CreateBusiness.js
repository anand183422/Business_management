import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateBusiness= () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch all admins
    axios.get('http://localhost:8080/api/superadmin/admins_no_business')
      .then((res) => setAdmins(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/superadmin/business', {
      name,
      location,
      ownerId
    })
    .then(() => {
      alert('Business created successfully');
      setName('');
      setLocation('');
      setOwnerId('');
    })
    .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 w-full max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Create Business</h2>

      <input
        type="text"
        placeholder="Business Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <select
        value={ownerId}
        onChange={(e) => setOwnerId(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Admin as Owner</option>
        {admins.map((admin) => (
          <option key={admin.id} value={admin.id}>
            {admin.name} ({admin.email})
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
        Create Business
      </button>
    </form>
  );
};

export default CreateBusiness;
