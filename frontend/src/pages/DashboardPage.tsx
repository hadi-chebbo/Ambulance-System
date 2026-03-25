import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Welcome back, {user?.firstName}!
        </h2>
        <p className="text-gray-500 text-sm">Role: {user?.role}</p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;