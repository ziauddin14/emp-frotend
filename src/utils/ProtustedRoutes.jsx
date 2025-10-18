import React from "react";
import { useAuth } from "../context/authContex";
import { Navigate } from "react-router-dom";

const ProtustedRoutes = ({ children, requiredRole = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading.....</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtustedRoutes;