import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { SupportOverview } from '@/Components/DashboardOverview/SupportOverview';

export default function Support({ auth }) {
  const user = auth.user;
  return (
    <AuthenticatedLayout user={user}>
      <Head title="Dashboard" />
      <SupportOverview />
    </AuthenticatedLayout>
  );
}
