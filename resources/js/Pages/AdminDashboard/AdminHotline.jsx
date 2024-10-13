import { Alert } from '@/Components/Alert';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { AdminHotlineTable } from '../../Components/Tables/AdminHotlineTable';
import { AdminHotlineModal } from '../../Components/Modal/Forms/AdminHotlineModal';
export default function AdminHotline({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated user={user}>
      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Hotline Content Management"
              description="In this section, the administrator will add/create hotline card that will be shown for user hotline resources."
            />
          </div>
          <div className="my-4 flex gap-1">
            <AdminHotlineModal />
          </div>

          <div className="w-full mb-4">
            <AdminHotlineTable />
          </div>
        </div>
      </div>
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
