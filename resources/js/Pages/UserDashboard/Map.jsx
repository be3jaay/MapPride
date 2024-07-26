import { Alert } from '@/Components/Alert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Map({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Mapping Content"
              description="In this section, you will be able to see all inclusive environments, such as safe spaces, health care services, government services, etc."
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
