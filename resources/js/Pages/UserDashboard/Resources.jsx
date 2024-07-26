import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ResourcesTabs } from '../../../core/constant/Tabs/ResourcesTabs';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';
import { Alert } from '@/Components/Alert';

export default function Resources({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Resources" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Resources Module"
              description="In this section, you will be able to see all the available resources that will help you develop and understand more about LGBTQ+."
            />
          </div>
          <div className="mt-4">
            <CustomTabs tabs={ResourcesTabs} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
