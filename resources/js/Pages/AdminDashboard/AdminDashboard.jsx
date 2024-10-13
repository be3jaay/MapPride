import React from 'react';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { AdminDashboardOverview } from '@/Components/DashboardOverview/AdminDashboardOverview';

export default function AdminDashboard({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated user={user}>
      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Admin Dashboard"
              description="In this section, admin will be able to see the data analytics of the web application"
            />
          </div>
        </div>
      </div>
      <Head title="Dashboard" />
      <AdminDashboardOverview />
    </AdminAuthenticated>
  );
}
