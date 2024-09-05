import { Alert } from '@/Components/Alert';
import { AdminCreateTabs } from '@/Components/Tabs/AdminCreateTabs';
import { AdminResourcesModal } from '@/Components/Modal/Forms/AdminResourcesModal';
import { ResourcesTable } from '@/Components/Tables/ResourcesTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated user={user}>
      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Experience Content Management"
              description="In this section, the administrator will approve/decline user's experience that will be shown for experience module."
            />
          </div>
          <div className="my-4 flex gap-1">
            <AdminResourcesModal />
            <AdminCreateTabs />
          </div>
          <div className="w-full mb-4">
            <ResourcesTable />
          </div>
        </div>
      </div>
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
