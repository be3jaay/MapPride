import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TrainingTabs } from '../../../core/constant/Tabs/TrainingTabs';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';
import { Alert } from '@/Components/Alert';

export default function Training({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Training" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Training Platform"
              description="Help the application to grow, add a feedback on where/what can we improve, and if you found issues/bugs feel free to reach."
            />
          </div>
          <div className="my-4">
            <CustomTabs tabs={TrainingTabs} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
