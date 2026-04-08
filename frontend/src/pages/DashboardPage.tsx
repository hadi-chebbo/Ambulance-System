import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

// Add more role-specific dashboards here as you build them:
// import AdminDashboard from './AdminDashboard';
// import ManagerDashboard from '../manager/ManagerDashboard';
// import TeacherDashboard from '../teacher/TeacherDashboard';

const DefaultDashboard: React.FC<{ name?: string; role?: string }> = ({ name, role }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome back, {name}!</h2>
    <p className="text-gray-500 text-sm">Role: {role}</p>
  </div>
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'super_admin':
        return <Navigate to = "/super-admin/dashboard" replace />;

      // Uncomment and add as you build each dashboard:
      // case 'admin':
      //   return <AdminDashboard />;

      // case 'manager':
      //   return <ManagerDashboard />;

      // case 'teacher':
      //   return <TeacherDashboard />;

      default:
        return <DefaultDashboard name={user?.name} role={user?.role} />;
    }
  };

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
};

export default DashboardPage;