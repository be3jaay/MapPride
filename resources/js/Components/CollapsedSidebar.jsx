import { useCallback } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { MdExitToApp } from 'react-icons/md';
import Swal from 'sweetalert2';

export const CollapsedSidebar = ({ getProfilePictureUrl }) => {
  const { post } = useForm();

  const handleLogout = useCallback(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    }).then(result => {
      if (result.isConfirmed) {
        post(route('logout'));
      }
    });
  }, [post]);

  return (
    <div className="mt-5 px-8 flex items-center h-14 flex-col gap-4">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <Link href={route('profile.edit')}>
            <img src={getProfilePictureUrl()} aria-hidden alt="No-PFP" />
          </Link>
        </div>
      </div>
      <div className="inline-flex text-indigo-700 items-center py-2 border border-transparent text-sm leading-4 font-medium rounded-md cursor-pointer bg-white hover:text-indigo-400 focus:outline-none transition ease-in-out duration-150">
        <Link href={route('profile.edit')}>Profile</Link>
      </div>
      <div className="cursor-pointer" onClick={handleLogout} aria-hidden="true" role="button">
        <MdExitToApp className="text-indigo-700 text-start text-xl font-bold" />
      </div>
    </div>
  );
};
