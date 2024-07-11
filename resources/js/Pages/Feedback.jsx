import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Feedback({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome, User</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-black font-bold">Feedback Section</div>
          </div>
          <div className="card flex items-center justify-center bg-indigo-200 text-black w-full h-full mt-6">
            <div className="card-body">
              <h2 className="card-title justify-center">Send a feedback</h2>
              <p className="text-black justify-center">How was your experience selecting the star emoticons.</p>
              <div className="rating rating-lg flex items-center justify-center my-2">
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-indigo-700" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-indigo-700" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-indigo-700" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-indigo-700" />
                <input type="radio" name="rating-8" className="mask mask-star-2 bg-indigo-700" />
              </div>
              <textarea
                className="textarea textarea-bordered bg-white h-60 my-4"
                placeholder="Encountered any bugs or issues, send a report here..."
              ></textarea>
              <div className="card-actions justify-center">
                <button className="btn btn-primary w-full text-white">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
