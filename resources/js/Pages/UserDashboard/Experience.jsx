import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ExperienceData } from '../../../core/constant/ExperienceData/ExperienceData';
import { FaUserCheck } from 'react-icons/fa';
import { Alert } from '@/Components/Alert';

export default function Experience({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Experience" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Map-Pride Freedom Wall"
              description="This is a freedom wall - These posted below are the shared experiences of the user."
            />
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            {ExperienceData.map(item => (
              <article className="rounded-xl border-2 border-gray-100 bg-indigo-200 cursor-pointer hover:opacity-90 hover:scale-90 transition-all">
                <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl text-indigo-800">{item.location}</h3>
                      <p className="bg-indigo-500 rounded-full text-white px-4 py-2">{item.type}</p>
                    </div>
                    <p className="line-clamp-2 text-md text-gray-800">{item.description}</p>
                    <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                      <p className="text-gray-600">
                        Posted by:
                        <a href="#" className="font-medium text-gray-600 underline hover:text-gray-700">
                          {' '}
                          John{' '}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
                    <FaUserCheck />
                    <span className="text-[10px] font-medium sm:text-xs">Posted!</span>
                  </strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
