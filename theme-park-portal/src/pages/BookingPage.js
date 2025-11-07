import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [form, setForm] = useState({
    visitDate: "",
    numberOfPeople: 1,
    customerName: "",
    customerEmail: ""
  });

  const [calculatedPrice, setCalculatedPrice] = useState(0);
const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/visitor/packages/${packageId}`)
      .then((res) => {
        setPkg(res.data);
        setCalculatedPrice(res.data.price); // initial price
      })
      .catch((err) => console.error("Error loading package:", err));
  }, [packageId]);

  // Parse group discount string
  const getDiscountPercent = (str) => {
    if (!str) return 0;
    const match = str.match(/(\d+)%/);
    return match ? parseFloat(match[1]) : 0;
  };

  const getMinPeople = (str) => {
    if (!str) return 0;
    const match = str.match(/for (\d+) or more/);
    return match ? parseInt(match[1]) : 0;
  };

  // Update price dynamically
  useEffect(() => {
    if (!pkg) return;

    const discountPercent = getDiscountPercent(pkg.groupDiscount);
    const minPeople = getMinPeople(pkg.groupDiscount);

    let price = pkg.price * form.numberOfPeople;
    if (form.numberOfPeople >= minPeople) {
      price = price - (price * discountPercent) / 100;
    }

    setCalculatedPrice(price.toFixed(2));
  }, [form.numberOfPeople, pkg]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
  // --- Razorpay Payment Flow ---
  const handleSubmit = async () => {
     const res = await loadRazorpayScript();
  if (!res) {
    alert("Failed to load Razorpay SDK. Please check your connection.");
    return;
  }
    try {
      // 1️⃣ Create Razorpay Order from backend
      console.log(pkg.business?.id);
        const payload = {
    packageId: packageId,                   // backend → package_id
    businessId: pkg.business?.id,            // backend → business_id
    userId: userId,                         // backend → user_id
         // Razorpay → amount in paise
    receipt: "receipt_" + new Date().getTime(),
    totalAmount: Number(calculatedPrice),          // backend → total_amount

    // form fields
    customerName: form.customerName,
    customerEmail: form.customerEmail,
    visitDate: form.visitDate,
    numberOfPeople: form.numberOfPeople,
    specialRequest: form.specialRequest,
  };

  // 2️⃣ Log payload (so you can see everything being sent)
  console.log("📤 Sending booking payload to backend:", JSON.stringify(payload, null, 2));

  // 3️⃣ Send payload to backend
  const orderRes = await axios.post("http://localhost:8080/api/create-order", payload);


      const { razorpayOrderId, amountPaise, currency, amount } = orderRes.data;

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: "rzp_test_RI8iKYXnkChQo8", // use your Razorpay test key
        amount: amountPaise, 
        currency,
        name: pkg.name,
        description: "Booking Payment",
        order_id: razorpayOrderId,
handler: async function (response) {
  try {
    await axios.post("http://localhost:8080/api/verify", {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      bookingDetails: {
        packageId,
        ...form,
        totalPrice: calculatedPrice
      }
    });
    alert("Payment Success! Booking Confirmed 🎉");
    navigate("/visitor/my-bookings");
  } catch (err) {
    console.error(err);
    alert("Payment verification failed!");
  }
}
,        prefill: {
          name: form.customerName,
          email: form.customerEmail
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
    }
  };

  if (!pkg) return <p className="p-6">Loading package details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-indigo-700">Booking: {pkg.name}</h1>
      <p>Price per person: ₹{pkg.price}</p>
      {pkg.discount > 0 && <p>Discount: {pkg.discount}%</p>}
      {pkg.groupDiscount && <p>Group Offer: {pkg.groupDiscount}</p>}

      <p className="text-lg font-semibold">Total Price: ₹{calculatedPrice}</p>

      {/* Booking Form */}
      <div className="space-y-2">
        <label className="block">
          Visit Date:
          <input
            type="date"
            name="visitDate"
            value={form.visitDate}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </label>

        <label className="block">
          Number of Visitors:
          <input
            type="number"
            name="numberOfPeople"
            min="1"
            value={form.numberOfPeople}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </label>

        <label className="block">
          Your Name:
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </label>

        <label className="block">
          Your Email:
          <input
            type="email"
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Confirm & Pay
      </button>
    </div>
  );
};

export default BookingPage;
