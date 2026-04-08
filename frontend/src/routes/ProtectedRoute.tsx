import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthLoader from "../components/ui/AuthLoader";

interface props {
  children : React.ReactNode;
  allowedRoles ?: string[];
}

const ProtectedRoute: React.FC<props> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <AuthLoader />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if(allowedRoles && !allowedRoles.includes(user?.role ?? '')) {
    return <Navigate to ="/forbidden" replace />
  }

  return <>{children}</>;
};

export default ProtectedRoute;