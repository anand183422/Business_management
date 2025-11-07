import axios from "axios";

const api = axios.create({
  baseURL:  "http://localhost:8080",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  // If you store token, attach here
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default api;
