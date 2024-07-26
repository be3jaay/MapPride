import React from 'react';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { DashboardOverview } from '@/Components/DashboardOverview/DashboardOverview';
import { AdminCreateTabs } from '@/Components/Modal/AdminCreateTabs';
import { Alert } from '@/Components/Alert';

export default function AdminDashboard({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated
      user={user}
      header={
        <header>
          <div className="mx-auto max-w-screen-xl">
            <div className="sm:flex sm:items-center sm:justify-between w-full">
              <div className="bg-indigo-200 w-full overflow-hidden shadow-sm sm:rounded-lg">
                <Alert
                  type="info"
                  message="Dashboard"
                  description="In this section, you will be able to see the data analytics of the web application"
                />
              </div>
              {/* <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <AdminCreateTabs />
              </div> */}
            </div>
          </div>
        </header>
      }
    >
      <Head title="Dashboard" />
      <DashboardOverview />
    </AdminAuthenticated>
  );
}
