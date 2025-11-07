import api from "./client";

// Helper to read current user/admin/business
const getSession = () => JSON.parse(localStorage.getItem("user") || "null");

// ---- Visitor ----
export const fetchBusinesses = () => api.get("/api/visitor/businesses");

// ---- Packages ----
export const fetchPackagesByBusiness = (businessId) =>
  api.get(`/api/admin/packages/${businessId}`);

export const fetchPackagesByAdmin = (adminId) =>
  api.get(`/api/admin/package/${adminId}`);

export const createPackage = (adminId, payload) =>
  api.post(`/api/admin/package/${adminId}`, payload);

export const updatePackage = (adminId, payload) =>
  api.put(`/api/admin/package/${adminId}`, payload);

export const deletePackage = (id) =>
  api.delete(`/api/admin/packages/${id}`);

// ---- Products ----
export const fetchProductsByAdmin = (adminId) =>
  api.get(`/api/admin/products/${adminId}`);

export const createProduct = (adminId, payload) =>
  api.post(`/api/admin/products/${adminId}`, payload);

export const updateProduct = (adminId, payload) =>
  api.put(`/api/admin/products/${adminId}`, payload);

export const deleteProduct = (id) =>
  api.delete(`/api/admin/products/${id}`);

// ---- Bookings (examples; adjust to your backend) ----
export const fetchBookings = (adminId) =>
  api.get(`/api/admin/bookings/${adminId}`);

export const fetchRevenueSummary = (adminId, params) =>
  api.get(`/api/admin/analytics/revenue/${adminId}`, { params });
