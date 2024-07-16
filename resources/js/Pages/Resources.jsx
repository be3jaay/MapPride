import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ResourcesData } from '../../core/constant/ResourcesData/ResourcesData';
import { Tabs } from '@/Components/Tabs/Tabs';

export default function Resources({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Resources" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-black font-bold">Resources Module</div>
          </div>
          <Tabs />
          <div class="grid grid-cols-3 gap-4 mt-4">
            {ResourcesData.map(item => (
              <div className="card bg-base-100 w-96 shadow-md">
                <div className="card-body bg-indigo-200 text-black">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="text-gray-500">{item.description}</p>
                  <div className="card-actions justify-center">
                    <button className="btn btn-primary w-full text-white">{item.button}</button>
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
