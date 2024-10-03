import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import Dropdown from '@/Components/Dropdown';
import { FaChevronDown } from 'react-icons/fa6';

export const CollapsedSidebar = ({ auth, getProfilePictureUrl }) => {
  return (
    <div className="mt-5 px-8 flex items-center h-14 flex-col gap-4">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <Link href={route('profile.edit')}>
            <img src={getProfilePictureUrl()} aria-hidden alt="No-PFP" />
          </Link>
        </div>
      </div>
      <Dropdown>
        <Dropdown.Trigger>
          <span className="inline-flex rounded-md">
            <button
              type="button"
              className="inline-flex text-indigo-700 items-center  py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-white hover:text-gray-400 focus:outline-none transition ease-in-out duration-150"
            >
              {auth.user.name}
              <FaChevronDown className="ms-2 me-6.5 h-4 w-3" />
            </button>
          </span>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
          <Dropdown.Link href={route('logout')} method="post" as="button">
            Log Out
          </Dropdown.Link>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
};
