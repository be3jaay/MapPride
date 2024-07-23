import React from 'react';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { DashboardOverview } from '@/Components/DashboardOverview/DashboardOverview';
import { AdminResourcesModal } from '@/Components/Modal/AdminResourcesModal';
import { ResourcesTable } from '@/Components/Tables/ResourcesTable';

export default function AdminDashboard({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated
      user={user}
      header={
        <header>
          <div className="mx-auto max-w-screen-xl">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, {user.name}</h1>
                <p className="mt-1.5 text-sm text-gray-500">I hope you're doing good, best of luck! 🎉</p>
              </div>
              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <AdminResourcesModal />
              </div>
            </div>
            <ResourcesTable />
          </div>
        </header>
      }
    >
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
