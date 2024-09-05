import { Alert } from '@/Components/Alert';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { AdminSupportModal } from '@/Components/Modal/Forms/AdminSupportModal';
import { SupportTable } from '@/Components/Tables/AdminSupportTable';

export default function AdminSupport({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated user={user}>
      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Support Content Management"
              description="In this section, the administrator will add/create training platform that will be shown for user training platform."
            />
          </div>
          <div className="my-4 flex gap-1">
            <AdminSupportModal />
          </div>

          <div className="w-full mb-4">
            <SupportTable />
          </div>
        </div>
      </div>
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
