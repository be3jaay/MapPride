import { Alert } from '@/Components/Alert';
import { TrainingTable } from '@/Components/Tables/TrainingTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { AdminTrainingTabs } from '@/Components/Tabs/AdminTrainingTabs';
import { AdminTrainingModal } from '@/Components/Modal/Forms/AdminTrainingModal';

export default function AdminTraining({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated user={user}>
      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Training Content Management"
              description="In this section, the administrator will add/create training platform that will be shown for user training platform."
            />
          </div>
          <div className="my-4 flex gap-1">
            <AdminTrainingModal />
            <AdminTrainingTabs />
          </div>
          <div className="w-full mb-4">
            <TrainingTable />
          </div>
        </div>
      </div>
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
