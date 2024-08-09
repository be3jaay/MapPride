import { Alert } from '@/Components/Alert';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';
import { AdminModalMap } from '@/Components/Modal/Forms/AdminModalMap';

export default function AdminMap({ auth }) {
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
                  message="Map Content Management"
                  description="In this section, the administrator will add/create map that will be shown for user map content."
                />
                <div className="my-4 gap-1">
                  <AdminModalMap />
                </div>
              </div>
            </div>
          </div>
        </header>
      }
    >
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
