import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ExperienceData } from '../../core/constant/ExperienceData/ExperienceData';

export default function Experience({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Experience" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-indigo-800 font-bold">User Experiences</div>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>

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
