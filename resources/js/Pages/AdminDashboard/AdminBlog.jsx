import React from 'react';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { AdminDashboardOverview } from '@/Components/DashboardOverview/AdminDashboardOverview';
import { AdminBlogTable } from '@/Components/Tables/AdminMapTable';

export default function AdminBlog({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated user={user}>
      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Blog Management"
              description="In this section, you will be able to see the user's discussion"
            />
          </div>
          <AdminBlogTable />
        </div>
      </div>
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
