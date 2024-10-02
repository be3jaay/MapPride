import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { UserHeaderData } from '../../core/constant';
import { FaChevronDown, FaBars } from 'react-icons/fa6';
import ally from '../../core/images/ally.png';

export default function Authenticated({ header, children }) {
  const { auth } = usePage().props;
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getProfilePictureUrl = () => {
    if (auth.user.profile_picture) {
      return `/storage/${auth.user.profile_picture}`;
    }
    return '../../core/images/about.png';
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex bg-indigo-50">
      <aside
        className={`bg-white border-r border-gray-200 drop-shadow-md fixed h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="px-6 py-7 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <Link href="/">
              <img src={ally} alt="" className="w-14 h-14" />
            </Link>
          )}
        </div>
        <hr />

        <nav className="mt-5 flex items-start justify-center flex-col px-6 gap-10">
          <button
            onClick={toggleSidebar}
            className="text-indigo-700 focus:outline-none flex items-center justify-end w-full"
          >
            <FaBars />
          </button>
          {UserHeaderData.map((item, index) => (
            <NavLink href={route(item.path)} active={route().current(item.path)} key={index}>
              {isSidebarCollapsed ? (
                <span>
                  <span className="text-indigo-700 focus:outline-none text-start w-full text-lg">
                    {item.icon}
                    <span className="hidden text-indigo-700 text-start text-md font-bold">{item.title}</span>
                  </span>
                </span>
              ) : (
                <div className="flex">
                  <span className="text-indigo-700 text-start text-md font-bold mr-4 text-lg">{item.icon}</span>
                  <span className="text-indigo-700 text-start text-md font-bold">{item.title}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="mt-5 px-8 flex items-end h-14">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <Link href={route('profile.edit')}>
                <img src={getProfilePictureUrl()} alt="No-PFP" />
              </Link>
            </div>
          </div>
          {!isSidebarCollapsed && (
            <Dropdown>
              <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                  <button
                    type="button"
                    className="inline-flex text-indigo-700 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-white hover:text-gray-400 focus:outline-none transition ease-in-out duration-150"
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
          )}
        </div>
      </aside>

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {header && (
          <header className="bg-indigo-50 border-b border-gray-200">
            <div className="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
          </header>
        )}

        <main className="flex-1">
          <div className="w-full mx-auto h-auto sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
