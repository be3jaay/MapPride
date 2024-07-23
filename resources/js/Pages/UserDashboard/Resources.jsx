import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ResourcesTabs } from '../../../core/constant/Tabs/ResourcesTabs';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';

export default function Resources({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Resources" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-black font-bold">Resources Module</div>
          </div>
          <div className="mt-4">
            <CustomTabs tabs={ResourcesTabs} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
