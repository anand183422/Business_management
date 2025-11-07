import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PackagePage = () => {
  const [packages, setPackages] = useState([]);
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    ageLimit: "",
    // discount: "",
    startDate: "",
    endDate: "",
    validity: "",
    status: "ACTIVE",
    features: "",
    groupDiscount: "",
    productIds: [],
    imageUrl: ""
  });

  const CLOUD_NAME = "dtqrcteni"; // From Cloudinary dashboard
  const UPLOAD_PRESET = "unsigned_preset"; // Your Cloudinary unsigned preset name

  const [editingId, setEditingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const adminId = user?.id;
  const businessId = user?.business?.id;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const uploadedUrl = response.data.secure_url;
      // ✅ store in form so it gets sent to backend
      setForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));

      console.log("Image uploaded:", uploadedUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  function formatDate(dateStr) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  }

  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/admin/packages/${businessId}`
      );
      setPackages(res.data.reverse());
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/admin/products/${adminId}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (adminId) {
      fetchPackages();
      fetchProducts();
    }
  }, [adminId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: parseFloat(form.price),
      discount: parseFloat(form.discount) || 0,
      validity: parseInt(form.validity),
      businessId: businessId
    };

    const url = `http://localhost:8080/api/admin/package/${adminId}`;
    const method = editingId ? axios.put : axios.post;

    try {
      await method(url, payload);

      setForm({
        name: "",
        description: "",
        price: "",
        ageLimit: "",
        // discount: "",
        startDate: "",
        endDate: "",
        validity: "",
        status: "ACTIVE",
        features: "",
        groupDiscount: "",
        productIds: [],
        imageUrl: ""
      });

      setEditingId(null);
      fetchPackages();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (pkg) => {
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      ageLimit: pkg.ageLimit,
      // discount: pkg.discount,
      startDate: pkg.startDate,
      endDate: pkg.endDate,
      validity: pkg.validity,
      status: pkg.status,
      features: pkg.features,
      groupDiscount: pkg.groupDiscount,
      imageUrl: pkg.imageUrl,
      productIds: pkg.products?.map((p) => p.id) || []
    });
    setEditingId(pkg.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/packages/${id}`);
      fetchPackages();
    } catch (err) {
      console.error("Error deleting package:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Packages</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Package Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
          required
        />

        {/* <input
          type="number"
          placeholder="Discount"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="border p-2 rounded"
        /> */}

        <input
          type="text"
          placeholder="Age Limit"
          value={form.ageLimit}
          onChange={(e) => setForm({ ...form, ageLimit: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Group Discount"
          value={form.groupDiscount}
          onChange={(e) =>
            setForm({ ...form, groupDiscount: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Features (comma-separated)"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Validity (days)"
          value={form.validity}
          onChange={(e) => setForm({ ...form, validity: e.target.value })}
          className="border p-2 rounded"
        />

       <DatePicker
  selected={form.startDate}
  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
  placeholderText="Start Date"
   className="border p-2 rounded"
/>
<DatePicker
  selected={form.endDate}
  onChange={(e) => setForm({ ...form,  endDate: e.target.value })}
  placeholderText="end Date"
   className="border p-2 rounded"
/>
       

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-full h-auto rounded mt-2"
          />
        )}

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Select Products
          </label>
          <select
            multiple
            value={form.productIds}
            onChange={(e) =>
              setForm({
                ...form,
                productIds: Array.from(
                  e.target.selectedOptions,
                  (option) => parseInt(option.value)
                )
              })
            }
            className="border p-2 rounded w-full h-24 overflow-auto text-sm"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ₹{product.price}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded col-span-full"
        >
          {editingId ? "Update Package" : "Add Package"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="w-full max-w-sm shadow-md rounded-xl p-4 border space-y-2"
          >
            <img
              src={pkg.imageUrl}
              alt={pkg.name}
              className="w-full h-auto rounded-md"
            />

            <h2 className="text-xl font-bold">{pkg.name}</h2>
            <p className="text-sm text-gray-600">{pkg.description}</p>

            {/* <div className="flex items-center justify-between text-sm mt-2">
              <span>
                💰 <b>₹{pkg.price}</b>
              </span>
              <span>🎟️ {pkg.discount}% OFF</span>
            </div> */}

            <div className="text-sm text-gray-700">
              <p>👥 Group Discount: {pkg.groupDiscount || "N/A"}</p>
              <p>🎂 Age Limit: {pkg.ageLimit || "All Ages"}</p>
              <p>🗓️ Valid: {pkg.validity} days</p>
              <p>
                🗓️ {formatDate(pkg.startDate)} → {formatDate(pkg.endDate)}
              </p>
              <p>
                ⚙️ Status:{" "}
                <span
                  className={`font-semibold ${
                    pkg.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
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

            <div className="flex justify-between pt-3">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleEdit(pkg)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(pkg.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagePage;
