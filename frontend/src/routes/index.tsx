import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CentersPage from '../pages/super-admin/centersPage';
import SuperAdminPage from '../pages/super-admin/SuperAdminDashboard';
import ForbiddenPage from '../pages/ForbiddenPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
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
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <CentersPage />
          </ProtectedRoute>
        }
       />
      <Route
        path = "super-admin/dashboard"
        element = {
          <ProtectedRoute allowedRoles={["super_admin"]}>
            <SuperAdminPage />
          </ProtectedRoute>
        }
       />
    </Routes>
  );
};

export default AppRoutes;