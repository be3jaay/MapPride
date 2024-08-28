import { Alert } from '@/Components/Alert';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { AdminModalMap } from '@/Components/Modal/Forms/AdminModalMap';
import { AdminMapTable } from '@/Components/Tables/AdminMapTable';

export default function AdminMap({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated user={user}>
      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Map Content Management"
              description="In this section, the administrator will add/create map that will be shown for user map content."
            />
          </div>
          <div className="mt-4">
            <AdminModalMap />
          </div>
          <div className="w-full h-[44rem] mt-4">
            <AdminMapTable />
          </div>
        </div>
      </div>
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
