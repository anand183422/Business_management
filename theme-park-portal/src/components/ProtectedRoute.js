// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // or use context

  if (!token) {
    // 🚫 Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → show the page
  return children;
}
