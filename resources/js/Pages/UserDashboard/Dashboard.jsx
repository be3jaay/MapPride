import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { DashboardOverview } from '@/Components/DashboardOverview/DashboardOverview';
import { ForumModal } from '@/Components/Modal/Forms/ForumModal';

export default function Dashboard({ auth }) {
  const user = auth.user;
  return (
    <AuthenticatedLayout
      user={user}
      header={
        <header>
          <div className="mx-auto w-full lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-start sm:text-left">
                <h1 className="text-lg  font-bold text-indigo-700 sm:text-3xl">Welcome Back, {user.name}</h1>
                <p className="mt-1.5 text-md text-gray-600">I hope you&apos;re doing good, best of luck! 🎉</p>
              </div>
              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <ForumModal />
              </div>
            </div>
          </div>
        </header>
      }
    >
      <Head title="Dashboard" />
      <DashboardOverview />
    </AuthenticatedLayout>
  );
}
