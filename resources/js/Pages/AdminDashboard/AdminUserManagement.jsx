import { Alert } from '@/Components/Alert';
import AdminUserTable from '@/Components/Tables/AdminUserTable';
import { FeedbackTable } from '@/Components/Tables/FeedbackTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';

export default function AdminFeedback({ auth }) {
  const user = auth.user;

  return (
    <AdminAuthenticated user={user}>
      <div className="py-12 px-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="User Access Management"
              description="In this section, the administrator will see all the user's feedback regarding the web application, then check all the bugs or issues found."
            />
          </div>
          <div className="w-full mb-4">
            <AdminUserTable />
          </div>
        </div>
      </div>
      <Head title="User Management" />
    </AdminAuthenticated>
  );
}
