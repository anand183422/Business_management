import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [activeTab, setActiveTab] = useState("upcoming");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/visitor/my-bookings/${userId}`);
      setBookings(res.data || { upcoming: [], past: [] });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const upcoming = bookings.upcoming || [];
  const past = bookings.past || [];

  const renderBookingCard = (booking) => (
    <div
      key={booking.id}
      className="bg-white shadow-md rounded-xl p-4 mb-4 border hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold text-gray-800">{booking.packageName}</h3>
      <p className="text-gray-500 text-sm">
        Visit Date: {new Date(booking.visitDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600">Total Amount: ₹{booking.totalAmount}</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        My Bookings
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-l-md border ${
            activeTab === "upcoming"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-r-md border ${
            activeTab === "past"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Past
        </button>
      </div>

      {/* Content */}
      {activeTab === "upcoming" && (
        <div>
          {upcoming.length > 0 ? (
            upcoming.map(renderBookingCard)
          ) : (
            <p className="text-center text-gray-500">No upcoming bookings.</p>
          )}
        </div>
      )}

      {activeTab === "past" && (
        <div>
          {past.length > 0 ? (
            past.map(renderBookingCard)
          ) : (
            <p className="text-center text-gray-500">No past bookings.</p>
          )}
        </div>
      )}
    </div>
  );
}
