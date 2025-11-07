import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // package + business passed from Visitor.js
  const selectedPackage = location.state?.package;
  const selectedBusiness = location.state?.business;

  const [form, setForm] = useState({
    userId: 1, // TODO: Replace with logged-in userId from auth context
    packageId: selectedPackage?.id,
    businessId: selectedBusiness?.id,
    visitDate: "",
    numberOfPeople: 1,
    paymentMethod: "UPI",
    specialRequest: "",
  });

  const totalAmount =
    (selectedPackage?.price || 0) * (form.numberOfPeople || 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/bookings", {
        ...form,
        totalAmount,
      });
      alert("🎉 Booking confirmed! Confirmation email sent.");
      navigate("/visitor");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("⚠️ Failed to book package");
    }
  };

  if (!selectedPackage) {
    return (
      <div className="p-6 text-center text-red-600">
        No package selected. Go back to Visitor page.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Book Package
      </h1>

      <div className="mb-6 border rounded-lg p-4 bg-indigo-50">
        <h2 className="text-xl font-semibold">{selectedPackage.name}</h2>
        <p className="text-gray-600">{selectedPackage.description}</p>
        <p className="mt-2 font-bold text-indigo-800">
          Price: ₹{selectedPackage.price}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Visit Date */}
        <div>
          <label className="block text-sm font-medium">Visit Date</label>
          <input
            type="date"
            name="visitDate"
            value={form.visitDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Number of People */}
        <div>
          <label className="block text-sm font-medium">Number of People</label>
          <input
            type="number"
            name="numberOfPeople"
            min="1"
            value={form.numberOfPeople}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="UPI">UPI</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="DEBIT_CARD">Debit Card</option>
            <option value="NET_BANKING">Net Banking</option>
            <option value="CASH">Cash</option>
          </select>
        </div>

        {/* Special Request */}
        <div>
          <label className="block text-sm font-medium">Special Request</label>
          <textarea
            name="specialRequest"
            value={form.specialRequest}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            rows="3"
          />
        </div>

        {/* Total */}
        <div className="bg-gray-100 p-3 rounded-lg font-semibold text-lg">
          Total Amount: ₹{totalAmount}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Book;
