import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";

// Utility to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const BusinessDetails = () => {
  const { id } = useParams();
    const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/visitor/businesses")
      .then((res) => {
        const foundBusiness = res.data.find(
          (b) => String(b.id) === String(id)
        );
        setBusiness(foundBusiness);
        setLoading(false);

        if (foundBusiness?.adminId) {
          axios
            .get(`http://localhost:8080/api/admin/packages/${foundBusiness.id}`)
            .then((pkgRes) => {
              setPackages(pkgRes.data);
              setLoadingPackages(false);
            })
            .catch((err) => {
              console.error("Error loading packages:", err);
              setLoadingPackages(false);
            });
        } else {
          setLoadingPackages(false);
        }
      })
      .catch((err) => {
        console.error("Error loading business:", err);
        setLoading(false);
        setLoadingPackages(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading business info...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Business Info */}
      <h1 className="text-4xl font-bold text-indigo-800 mb-4">{business?.name}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Description:</strong> {business?.description}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {business?.location || "Not provided"}
      </p>
      {/* <p className="text-gray-600 mb-4">
        <strong>Admin:</strong> {business?.admin?.name} ({business?.admin?.email})
      </p> */}

      {/* Packages */}
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🎁 Packages</h2>
      {loadingPackages ? (
        <p>Loading packages...</p>
      ) : packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="w-full max-w-sm shadow-md rounded-xl p-4 border space-y-2"
            >
              {/* Image clickable */}
              <a
                href={pkg.imageUrl || "https://via.placeholder.com/300"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={pkg.imageUrl }
                  alt={pkg.name}
                  className="w-full h-auto rounded-md cursor-pointer"
                />
              </a>

              <h2 className="text-xl font-bold">{pkg.name}</h2>
              <p className="text-sm text-gray-600">{pkg.description}</p>

              <div className="flex items-center justify-between text-sm mt-2">
                <span>💰 <b>₹{pkg.price}</b></span>
                {pkg.discount > 0 && <span>🎟️ {pkg.discount}% OFF</span>}
              </div>

              <div className="text-sm text-gray-700">
                <p>👥 Group Discount: {pkg.groupDiscount || "N/A"}</p>
                <p>🎂 Age Limit: {pkg.ageLimit || "All Ages"}</p>
                <p>🗓️ Valid: {pkg.validity} days</p>
                <p>🗓️ {formatDate(pkg.startDate)} → {formatDate(pkg.endDate)}</p>
                <p>
                  ⚙️ Status:{" "}
                  <span
                    className={`font-semibold ${
                      pkg.status === "ACTIVE" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {pkg.status}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {(pkg.features?.split(",") || []).map((feat, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                  >
                    {feat.trim()}
                  </span>
                ))}
              </div>

              <p className="text-sm mt-2">
                🧩 <b>Products:</b>{" "}
                {(pkg.products || []).map((p) => p.name).join(", ") || "None"}
              </p>

              {/* Book Now */}
              <button
    onClick={() => navigate(`/booking/${pkg.id}`)}
    className="w-full px-4 py-2 mt-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
  > Book Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No packages available for this business.</p>
      )}
    </div>
  );
};

export default BusinessDetails;
