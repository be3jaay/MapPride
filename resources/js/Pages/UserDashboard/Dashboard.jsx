import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { DashboardOverview } from '@/Components/DashboardOverview/DashboardOverview';
import { ForumModal } from '@/Components/Modal/Forms/ForumModal';
import { AdminModalMap } from '@/Components/Modal/Forms/AdminModalMap';

export default function Dashboard({ auth }) {
  const user = auth.user;
  return (
    <AuthenticatedLayout
      user={user}
      header={
        <header>
          <div className="mx-auto w-full lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="text-start sm:text-left">
                <h1 className="text-lg  font-bold text-indigo-700 sm:text-3xl">Hello, {user.name}! 👋</h1>
                <p className="mt-1.5 text-sm text-slate-600">
                  I hope this message finds you well. Wishing you the best of luck in all your endeavors—let&apos;s make
                  great things happen!"
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-4 lg:mt-0 sm:flex-row sm:items-center">
                <AdminModalMap auth={auth} />
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
