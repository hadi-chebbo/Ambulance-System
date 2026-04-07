import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface props {
  children : React.ReactNode;
  allowedRoles ?: string[];
}

const ProtectedRoute: React.FC<props> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-400 text-sm animate-pulse">Loading...</span>
      </div>
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