import { Alert } from '@/Components/Alert';
import { FeedbackTable } from '@/Components/Tables/FeedbackTable';
import AdminAuthenticated from '@/Layouts/AdminAuthLayout';
import { Head } from '@inertiajs/react';

export default function AdminFeedback({ auth }) {
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
                  message="User Access Management"
                  description="In this section, the administrator will see all the user's feedback regarding the web application, then check all the bugs or issues found."
                />
              </div>
            </div>
            <FeedbackTable />
          </div>
        </header>
      }
    >
      <Head title="Dashboard" />
    </AdminAuthenticated>
  );
}
