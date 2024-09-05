import { Alert } from '@/Components/Alert';
import { ExperienceTable } from '@/Components/Tables/ExperienceTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';

export default function AdminExperience({ auth }) {
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
          <div className="w-full mb-4">
            <ExperienceTable />
          </div>
        </div>
      </div>
      <Head title="Experience" />
    </AdminAuthenticated>
  );
}
