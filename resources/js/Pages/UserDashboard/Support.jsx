import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { SupportOverview } from '@/Components/DashboardOverview/SupportOverview';

export default function Support({ auth }) {
  const user = auth.user;
  return (
    // for improvement
    <AuthenticatedLayout
      user={user}
      header={
        <header>
          <div className="mx-auto max-w-screen-xl">
            <div className="sm:flex sm:items-center sm:justify-between"></div>
          </div>
        </header>
      }
    >
      <Head title="Dashboard" />
      <SupportOverview />
    </AuthenticatedLayout>
  );
}
