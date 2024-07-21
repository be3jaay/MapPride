import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TrainingTabs } from '../../core/constant/ResourcesTabs/TrainingTabs';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';

export default function Training({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Training" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-black font-bold">Training Platform</div>
          </div>
          <div className="my-4">
            <CustomTabs tabs={TrainingTabs} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
