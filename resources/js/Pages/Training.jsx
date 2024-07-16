import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TrainingData } from '../../core/constant';
import { Tabs } from '@/Components/Tabs/Tabs';
export default function Training({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Training" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-black font-bold">Training Platform</div>
          </div>
          <Tabs />
          <div class="grid grid-cols-3 gap-4 mt-4">
            {TrainingData.map(item => (
              <div className="cursor-pointer hover:opacity-90 hover:scale-90 transition-all ">
                <div className="card bg-base-100 w-full shadow-md h-60">
                  <div className="card-body bg-indigo-200 text-black text-center">
                    <h2 className="card-title justify-center bg-indigo-600 text-white rounded-lg p-3 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
