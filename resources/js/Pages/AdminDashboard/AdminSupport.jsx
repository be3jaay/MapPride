import { Alert } from '@/Components/Alert';
import { TrainingTable } from '@/Components/Tables/TrainingTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { AdminTrainingTabs } from '@/Components/Tabs/AdminTrainingTabs';
import { AdminTrainingModal } from '@/Components/Modal/AdminTrainingModal';
import { AdminSupportModal } from '@/Components/Modal/AdminSupportModal';

export default function AdminSupport({ auth }) {
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
                  message="Support Content Management"
                  description="In this section, the administrator will add/create training platform that will be shown for user training platform."
                />
                <div className="my-4 flex gap-1">
                  <div>
                    <AdminSupportModal />
                  </div>
                  <AdminTrainingTabs />
                </div>
              </div>
            </div>
            <TrainingTable />
          </div>
        </header>
      }
    >
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
