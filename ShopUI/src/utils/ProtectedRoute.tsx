import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  loggedIn?: boolean;
}

const ProtectedRoute = ({
  children,
  requiredRole,
  loggedIn,
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (loggedIn === true && !user) {
    return <Navigate to="/login" />;
  }

  if (loggedIn === false && user) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
