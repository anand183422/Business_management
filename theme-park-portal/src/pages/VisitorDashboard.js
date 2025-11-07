import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VisitorDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/visitor/businesses")
      .then((res) => {
        setBusinesses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching businesses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading businesses...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
         Explore Businesses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {businesses.map((business) => (
          <div
            key={business.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden border"
            onClick={() => navigate(`/businesses/${business.id}`)}
          >
            {/* Image */}
            <img
              src={business.imageUrl || "https://via.placeholder.com/300x200"}
              alt={business.name}
              className="w-full h-48 object-cover"
            />

            {/* Info */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-indigo-700 mb-1">
                {business.name}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                {business.location || "Location not provided"}
              </p>
              <p className="text-gray-600 text-sm line-clamp-3">
                {business.description || "No description available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorDashboard;
