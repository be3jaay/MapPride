import { Alert } from '@/Components/Alert';
import { AdminResourcesModal } from '@/Components/Modal/AdminResourcesModal';
import { ResourcesTable } from '@/Components/Tables/ResourcesTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';

export default function AdminTraining({ auth }) {
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
                  message="Training Content Management"
                  description="In this section, the administrator will add/create training platform that will be shown for user training platform."
                />
                <div className="my-4">
                  <AdminResourcesModal />
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
