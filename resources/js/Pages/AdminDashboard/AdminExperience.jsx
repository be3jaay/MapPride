import { Alert } from '@/Components/Alert';
import { ExperienceTable } from '@/Components/Tables/ExperienceTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';

export default function AdminExperience({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated
      user={user}
      header={
        <header>
          <div className="mx-auto max-w-screen-xl">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="w-full mb-4">
                <Alert
                  type="info"
                  message="Experience Content Management"
                  description="In this section, the administrator will approve/decline user's experience that will be shown for experience module."
                />
              </div>
            </div>
            <ExperienceTable />
          </div>
        </header>
      }
    >
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
