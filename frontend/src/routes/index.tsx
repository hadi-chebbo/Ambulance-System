import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CentersPage from '../pages/super-admin/centersPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

      <Route
        path = "super-admin/centers"
        element = {
          <ProtectedRoute>
            <CentersPage />
          </ProtectedRoute>
        }
       />
    </Routes>
  );
};

export default AppRoutes;