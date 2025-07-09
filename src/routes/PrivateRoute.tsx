import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}