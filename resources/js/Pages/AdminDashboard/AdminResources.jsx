import { Alert } from '@/Components/Alert';
import { AdminCreateTabs } from '@/Components/Tabs/AdminCreateTabs';
import { AdminResourcesModal } from '@/Components/Modal/Forms/AdminResourcesModal';
import { ResourcesTable } from '@/Components/Tables/ResourcesTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated
      user={user}
      header={
        <header>
          <div className="mx-auto max-w-screen-xl">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="w-full">
                <Alert
                  type="info"
                  message="Resources Content Management"
                  description="In this section, the administrator will add/create resources that will be shown for user resources module."
                />
                <div className="my-4 flex gap-1">
                  <AdminResourcesModal />
                  <AdminCreateTabs />
                </div>
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
