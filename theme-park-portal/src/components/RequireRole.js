// src/components/RequireRole.js
import React from "react";
import { Navigate } from "react-router-dom";

const RequireRole = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user")); // from login

  if (!user) {
    // ❌ Not logged in → redirect
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    // ❌ Wrong role → redirect
    return <Navigate to="/" replace />;
  }

  // ✅ Correct role → allow
  return children;
};

export default RequireRole;
