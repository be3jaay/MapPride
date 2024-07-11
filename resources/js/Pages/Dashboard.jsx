import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, user }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome, User</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-black font-bold">Dashboard</div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="card bg-base-100 w-96 shadow-xl mt-4">
              <figure>
                <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">LGBTQ Rights</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto veniam illo quis incidunt
                  asperiores quam est, esse odit accusantium repellat dolore doloremque at earum corrupti tempore nihil
                  aut. Dolores, neque.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary w-full">View All</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl mt-4">
              <figure>
                <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">LGBTQ Rights</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto veniam illo quis incidunt
                  asperiores quam est, esse odit accusantium repellat dolore doloremque at earum corrupti tempore nihil
                  aut. Dolores, neque.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary w-full">View All</button>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl mt-4">
              <figure>
                <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">LGBTQ Rights</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto veniam illo quis incidunt
                  asperiores quam est, esse odit accusantium repellat dolore doloremque at earum corrupti tempore nihil
                  aut. Dolores, neque.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary w-full">View All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
