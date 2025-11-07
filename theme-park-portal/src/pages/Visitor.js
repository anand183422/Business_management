import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Visitor = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/visitor/businesses")
      .then((res) => res.json())
      .then((data) => {
        setBusinesses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching businesses:", err);
        setLoading(false);
      });
  }, []);

  const loadPackages = (businessId) => {
    setSelectedBusinessId(businessId);
    setLoadingPackages(true);
    fetch(`http://localhost:8080/api/visitor/packages/${businessId}`)
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoadingPackages(false);
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
        setLoadingPackages(false);
      });
  };

  const handleBook = (pkg, business) => {
    navigate("/book", { state: { package: pkg, business } });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-indigo-600 font-semibold">Loading businesses...</span>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700">
         Discover Exciting Theme Parks
      </h1>

      {/* Business Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {businesses.map((business) => (
          <div
            key={business.id}
            onClick={() => loadPackages(business.id)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            {business.imageUrl ? (
              <img
                src={business.imageUrl}
                alt={business.name}
                className="h-48 w-full object-cover rounded-t-2xl"
              />
            ) : (
              <div className="h-48 bg-indigo-100 rounded-t-2xl flex items-center justify-center text-indigo-500 font-semibold">
                No Image
              </div>
            )}
            <div className="p-5">
              <h2 className="text-2xl font-bold text-indigo-700">{business.name}</h2>
              <p className="text-gray-500 text-sm mb-2">{business.location || "Location N/A"}</p>
              <p className="text-gray-700 text-sm line-clamp-2">
                {business.description || "No description provided."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Packages Section */}
      {selectedBusinessId && (
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-indigo-600 animate-fadeIn">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">
            🎟 Packages for Selected Park
          </h2>

          {loadingPackages ? (
            <div className="text-gray-500 text-center py-10">Loading packages...</div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-indigo-50 rounded-xl border border-indigo-100 p-5 shadow-sm hover:shadow-md hover:bg-indigo-100 transition duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-indigo-700">{pkg.name}</h3>
                    <span className="text-lg font-bold text-indigo-600">
                      ₹{pkg.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                    {pkg.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleBook(pkg)}
                    className="w-full mt-2 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-center">No packages available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Visitor;
