import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Resources({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome, User</h2>}
    >
      <Head title="Resources" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-black font-bold">Resources Module</div>
          </div>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
              </figure>
              <div className="card-body bg-indigo-200 text-black">
                <h2 className="card-title">LGBTQ Rights</h2>
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quibusdam iure perspiciatis
                  officia dicta fugiat, explicabo corrupti quod facere sapiente dolorum maiores fuga porro minus ipsa
                  illo cum, error nam.
                </p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary w-full text-white">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
